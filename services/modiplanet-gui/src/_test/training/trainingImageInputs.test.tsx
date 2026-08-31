import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import type { MockInstance } from 'vitest';

import ImageUploadInputs from '@src/pages/training/image/components/classfier-card/image-upload-inputs';
import CameraCaptureUploader from '@src/pages/training/image/components/classfier-card/image-upload-inputs/camera-capture-uploader';
import ImageFileUploader from '@src/pages/training/image/components/classfier-card/image-upload-inputs/image-file-uploader';
import CameraCapture from '@src/pages/training/image/components/test-area/test-data-inputs/camera-capture';
import ImageCapture from '@src/pages/training/image/components/test-area/test-data-inputs/image-capture';
import { useProfileStore } from '@src/store/zustand';

const mockDrawCanvasByImageFile = vi.fn();
const mockDrawCanvasByVideoCapture = vi.fn();
const mockOnUploadMultiFile = vi.fn();
const mockOnUploadSingleFile = vi.fn();
const mockSelectCamera = vi.fn();
const mockRefreshCameraInfos = vi.fn();
const mockImageData = {
  width: 150,
  height: 150,
  data: new Uint8ClampedArray(150 * 150 * 4),
} as ImageData;

let mockCameraStreamState: any;

vi.mock('@src/pages/training/image/hooks/useDrawCanvas', () => ({
  __esModule: true,
  default: () => ({
    drawCanvasByImageFile: mockDrawCanvasByImageFile,
    drawCanvasByVideoCapture: mockDrawCanvasByVideoCapture,
  }),
}));

vi.mock('@src/pages/training/image/hooks/useCameraStream', () => ({
  __esModule: true,
  default: () => mockCameraStreamState,
}));

vi.mock('@hooks/upload/useMultiFileUploader', () => ({
  useMultiFileUploader: () => ({
    onUploadMultiFile: mockOnUploadMultiFile,
  }),
}));

vi.mock('@hooks/upload/useSingleFileUploader', () => ({
  useSingleFileUploader: () => ({
    onUploadSingleFile: mockOnUploadSingleFile,
  }),
}));

const profile = {
  id: 'profile-1',
  userId: 'user-1',
  birthdate: '',
  name: '모디',
  nickname: '모디',
  countryCallingCode: '+82',
  phoneNumber: '',
  thumbnailUrl: '',
  codingExperienceTypeList: [],
  contactEmail: '',
};

const setFileInputFiles = (input: HTMLInputElement, files: File[]) => {
  fireEvent.change(input, {
    target: {
      files,
    },
  });
};

describe('[트레이닝] 이미지 업로드 입력', () => {
  let getContextSpy: MockInstance<any>;
  let toBlobSpy: MockInstance<any>;
  let requestAnimationFrameSpy: MockInstance<any> | undefined;
  let cancelAnimationFrameSpy: MockInstance<any> | undefined;
  let pauseSpy: MockInstance<any>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCameraStreamState = {
      isVideoReady: true,
      hasCameraAccessError: false,
      cameraInfos: [
        {
          deviceId: 'front-camera',
          label: 'Front Camera',
          kind: 'videoinput',
          groupId: 'group-id',
          toJSON: () => ({}),
        },
      ],
      activeCameraId: 'front-camera',
      selectCamera: mockSelectCamera,
      refreshCameraInfos: mockRefreshCameraInfos,
    };
    mockDrawCanvasByImageFile.mockImplementation(async ({ canvas }) => {
      canvas.width = 150;
      canvas.height = 150;
      return true;
    });
    mockOnUploadMultiFile.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.({
        fileUrl: 'https://cdn.example.com/uploaded.png',
        fileName: 'uploaded.png',
      });
    });
    mockOnUploadSingleFile.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.({
        fileUrl: 'https://cdn.example.com/camera.png',
        fileName: 'camera.png',
      });
    });
    mockRefreshCameraInfos.mockResolvedValue([]);

    act(() => {
      useProfileStore.getState().setProfile(profile);
    });

    getContextSpy = vi
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue({
        drawImage: vi.fn(),
        getImageData: vi.fn(() => mockImageData),
        scale: vi.fn(),
      } as any);
    toBlobSpy = vi
      .spyOn(HTMLCanvasElement.prototype, 'toBlob')
      .mockImplementation((callback: BlobCallback) => {
        callback(new Blob(['image'], { type: 'image/jpeg' }));
      });
    pauseSpy = vi
      .spyOn(HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    getContextSpy.mockRestore();
    toBlobSpy.mockRestore();
    pauseSpy.mockRestore();
    requestAnimationFrameSpy?.mockRestore();
    cancelAnimationFrameSpy?.mockRestore();
  });

  test('업로드 방식에 맞는 파일/카메라 입력을 렌더링한다.', () => {
    // Given
    const addImageUrls = vi.fn();
    const { container, rerender } = render(
      <ImageUploadInputs
        uploadWay={null}
        addImageUrls={addImageUrls}
        isDatasetMaxCount
      />,
    );

    // Then
    expect(container).toBeEmptyDOMElement();

    // When
    rerender(
      <ImageUploadInputs
        uploadWay="file"
        addImageUrls={addImageUrls}
        isDatasetMaxCount
      />,
    );

    // Then
    expect(container.querySelector('input[type="file"]')).toBeInTheDocument();

    // When
    rerender(
      <ImageUploadInputs
        uploadWay="camera"
        addImageUrls={addImageUrls}
        isDatasetMaxCount
      />,
    );

    // Then
    expect(screen.getByRole('button', { name: 'SHOOTING' })).toBeVisible();
  });

  test('이미지 파일 업로더는 유효한 파일 업로드 결과를 데이터셋에 추가한다.', async () => {
    // Given
    const addImageUrls = vi.fn();
    const { container } = render(
      <ImageFileUploader addImageUrls={addImageUrls} isDatasetMaxCount />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(['image'], 'cat.png', { type: 'image/png' });

    // When
    setFileInputFiles(input, [file]);

    // Then
    await waitFor(() => {
      expect(mockOnUploadMultiFile).toHaveBeenCalledWith(
        expect.objectContaining({
          files: [file],
          userId: 'user-1',
        }),
      );
      expect(addImageUrls).toHaveBeenCalledWith([
        'https://cdn.example.com/uploaded.png',
      ]);
    });
  });

  test('이미지 파일 업로더는 잘못된 확장자와 비활성 상태를 처리한다.', () => {
    // Given
    const addImageUrls = vi.fn();
    const { container, rerender } = render(
      <ImageFileUploader addImageUrls={addImageUrls} isDatasetMaxCount />,
    );
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    // When
    setFileInputFiles(input, [
      new File(['text'], 'invalid.txt', { type: 'text/plain' }),
    ]);

    // Then
    expect(mockOnUploadMultiFile).not.toHaveBeenCalled();
    expect(addImageUrls).not.toHaveBeenCalled();

    // When
    rerender(
      <ImageFileUploader
        addImageUrls={addImageUrls}
        isDatasetMaxCount={false}
      />,
    );

    // Then
    expect(
      container.querySelector('input[type="file"]') as HTMLInputElement,
    ).toBeDisabled();
  });

  test('카메라 캡처 업로더는 캡처 파일을 업로드하고 결과 URL을 추가한다.', async () => {
    // Given
    const addImageUrls = vi.fn();

    render(
      <CameraCaptureUploader addImageUrls={addImageUrls} isDatasetMaxCount />,
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: 'SHOOTING' }));

    // Then
    await waitFor(() => {
      expect(mockDrawCanvasByVideoCapture).toHaveBeenCalledWith(
        expect.objectContaining({
          drawHeight: 70,
          drawWidth: 70,
          isFlip: true,
        }),
      );
      expect(mockOnUploadSingleFile).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
        }),
      );
      expect(addImageUrls).toHaveBeenCalledWith([
        'https://cdn.example.com/camera.png',
      ]);
    });
  });

  test('카메라 접근 에러가 있으면 촬영 버튼을 비활성화한다.', () => {
    // Given
    mockCameraStreamState = {
      ...mockCameraStreamState,
      isVideoReady: false,
      hasCameraAccessError: true,
    };

    render(
      <CameraCaptureUploader addImageUrls={vi.fn()} isDatasetMaxCount />,
    );

    // Then
    expect(screen.getByText('REQUIRE_CAMERA')).toBeVisible();
    expect(screen.getByRole('button', { name: 'SHOOTING' })).toBeDisabled();
  });

  test('테스트 이미지 캡처는 파일을 캔버스에 그린 뒤 이미지 데이터를 예측으로 전달한다.', async () => {
    // Given
    const onPredict = vi.fn();
    const { container } = render(<ImageCapture onPredict={onPredict} />);
    const input = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(['image'], 'test.png', { type: 'image/png' });

    // When
    setFileInputFiles(input, [file]);

    // Then
    await waitFor(() => {
      expect(mockDrawCanvasByImageFile).toHaveBeenCalledWith(
        expect.objectContaining({
          file,
        }),
      );
      expect(onPredict).toHaveBeenCalledWith(mockImageData);
    });
  });

  test('테스트 카메라 캡처는 일정 프레임마다 이미지 데이터를 예측으로 전달한다.', async () => {
    // Given
    const onPredict = vi.fn();
    const rafQueue: FrameRequestCallback[] = [];
    let rafId = 0;
    requestAnimationFrameSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        rafQueue.push(callback);
        rafId += 1;
        return rafId;
      });
    cancelAnimationFrameSpy = vi
      .spyOn(window, 'cancelAnimationFrame')
      .mockImplementation(() => {});
    const { container, unmount } = render(
      <CameraCapture onPredict={onPredict} />,
    );
    const video = container.querySelector('video') as HTMLVideoElement;

    // When
    fireEvent(video, new Event('play'));
    for (let i = 0; i < 22; i += 1) {
      const callback = rafQueue.shift();
      act(() => {
        callback?.(i);
      });
    }

    // Then
    await waitFor(() => {
      expect(mockDrawCanvasByVideoCapture).toHaveBeenCalled();
      expect(onPredict).toHaveBeenCalledWith(mockImageData);
    });

    // When
    unmount();

    // Then
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();
  });
});
