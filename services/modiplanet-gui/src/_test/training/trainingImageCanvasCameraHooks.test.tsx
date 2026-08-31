import { act, render, waitFor } from '@testing-library/react';
import { RefObject, useEffect, useRef } from 'react';
import type { MockInstance } from 'vitest';

import useCameraStream from '@src/pages/training/image/hooks/useCameraStream';
import useDrawCanvas from '@src/pages/training/image/hooks/useDrawCanvas';

function HookHarness<T>({
  useHook,
  onReady,
}: {
  useHook: () => T;
  onReady: (value: T) => void;
}) {
  const value = useHook();

  useEffect(() => {
    onReady(value);
  }, [value, onReady]);

  return null;
}

const renderHookHarness = <T,>(useHook: () => T) => {
  let hookValue: T | undefined;

  render(
    <HookHarness
      useHook={useHook}
      onReady={(value) => {
        hookValue = value;
      }}
    />,
  );

  return {
    get current() {
      if (!hookValue) {
        throw new Error('hook is not ready');
      }
      return hookValue;
    },
  };
};

function CameraHarness({
  onReady,
  onCameraError,
}: {
  onReady: (value: ReturnType<typeof useCameraStream>) => void;
  onCameraError?: (error: unknown) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const value = useCameraStream(
    videoRef as RefObject<HTMLVideoElement | null>,
    {
      onCameraError,
    },
  );

  useEffect(() => {
    onReady(value);
  }, [value, onReady]);

  return <video ref={videoRef} />;
}

const createCamera = (deviceId: string, label: string): MediaDeviceInfo =>
  ({
    deviceId,
    label,
    kind: 'videoinput',
    groupId: 'group-id',
    toJSON: () => ({}),
  } as MediaDeviceInfo);

const createStream = (deviceId: string, label: string) => {
  const track = {
    label,
    stop: vi.fn(),
    getSettings: () => ({ deviceId }),
  };

  return {
    track,
    stream: {
      getTracks: () => [track],
      getVideoTracks: () => [track],
    } as any,
  };
};

describe('[트레이닝] 이미지 캔버스/카메라 hook', () => {
  let getContextSpy: MockInstance<any>;
  let playSpy: MockInstance<any>;
  let pauseSpy: MockInstance<any>;
  let consoleErrorSpy: MockInstance<any> | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    playSpy = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockResolvedValue(undefined);
    pauseSpy = vi
      .spyOn(HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    getContextSpy?.mockRestore();
    playSpy.mockRestore();
    pauseSpy.mockRestore();
    consoleErrorSpy?.mockRestore();
  });

  test('비디오 프레임을 캔버스 크기에 맞춰 그리고 좌우 반전을 처리한다.', () => {
    // Given
    const contexts: Array<{
      drawImage: MockInstance<any>;
      scale: MockInstance<any>;
    }> = [];
    getContextSpy = vi
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockImplementation(() => {
        const context = {
          drawImage: vi.fn(),
          scale: vi.fn(),
        };
        contexts.push(context);
        return context as any;
      });
    const hook = renderHookHarness(useDrawCanvas);
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');

    Object.defineProperty(video, 'videoWidth', {
      value: 320,
      configurable: true,
    });
    Object.defineProperty(video, 'videoHeight', {
      value: 240,
      configurable: true,
    });

    // When
    hook.current.drawCanvasByVideoCapture({
      video,
      canvas,
      drawWidth: 80,
      drawHeight: 70,
      isFlip: true,
    });

    // Then
    expect(canvas.width).toBe(80);
    expect(canvas.height).toBe(70);
    expect(contexts[0].scale).toHaveBeenCalledWith(-1, 1);
    expect(contexts[0].drawImage).toHaveBeenCalledWith(
      video,
      -320,
      0,
      320,
      240,
    );
    expect(contexts[1].drawImage).toHaveBeenCalled();
  });

  test('카메라 스트림을 시작하고 사용 가능한 카메라 목록과 활성 카메라를 갱신한다.', async () => {
    // Given
    const front = createStream('front', 'Front Camera');
    const back = createStream('back', 'Back Camera');
    const getUserMedia = vi
      .fn()
      .mockResolvedValueOnce(front.stream)
      .mockResolvedValueOnce(back.stream);
    const enumerateDevices = vi
      .fn()
      .mockResolvedValue([
        createCamera('front', 'Front Camera'),
        createCamera('back', 'Back Camera'),
      ]);
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    let latest: ReturnType<typeof useCameraStream> | undefined;

    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: {
        getUserMedia,
        enumerateDevices,
        addEventListener,
        removeEventListener,
      },
    });

    // When
    const { container, unmount } = render(
      <CameraHarness
        onReady={(value) => {
          latest = value;
        }}
      />,
    );
    const video = container.querySelector('video') as HTMLVideoElement;

    await waitFor(() => {
      expect(getUserMedia).toHaveBeenCalledTimes(1);
      expect(enumerateDevices).toHaveBeenCalledTimes(1);
    });
    act(() => {
      video.onloadedmetadata?.({} as Event);
    });

    // Then
    await waitFor(() => {
      expect(latest?.isVideoReady).toBe(true);
      expect(latest?.activeCameraId).toBe('front');
      expect(latest?.cameraInfos).toHaveLength(2);
    });

    // When
    await act(async () => {
      await latest?.selectCamera('back');
    });

    // Then
    expect(front.track.stop).toHaveBeenCalledTimes(1);
    expect(getUserMedia).toHaveBeenLastCalledWith(
      expect.objectContaining({
        video: expect.objectContaining({
          deviceId: { exact: 'back' },
        }),
      }),
    );
    await waitFor(() => {
      expect(latest?.activeCameraId).toBe('back');
    });

    // When
    unmount();

    // Then
    expect(back.track.stop).toHaveBeenCalledTimes(1);
    expect(removeEventListener).toHaveBeenCalledWith(
      'devicechange',
      expect.any(Function),
    );
  });

  test('MediaDevices API를 사용할 수 없으면 카메라 에러 상태를 표시한다.', async () => {
    // Given
    const onCameraError = vi.fn();
    let latest: ReturnType<typeof useCameraStream> | undefined;
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: undefined,
    });

    // When
    render(
      <CameraHarness
        onCameraError={onCameraError}
        onReady={(value) => {
          latest = value;
        }}
      />,
    );

    // Then
    await waitFor(() => {
      expect(onCameraError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'MediaDevices API is not available.',
        }),
      );
      expect(latest?.hasCameraAccessError).toBe(true);
    });
  });
});
