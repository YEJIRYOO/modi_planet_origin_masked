import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YouTubePlayerAdapter } from '@src/pages/course/learning/components/content/media/common/YouTubePlayerAdapter';
import VideoContent from '@src/pages/course/learning/components/content/media/video';
import VideoViewer from '@src/pages/course/learning/components/content/media/video/VideoViewer';
import YoutubeContent from '@src/pages/course/learning/components/content/media/youtube';
import YoutubeViewer from '@src/pages/course/learning/components/content/media/youtube/YoutubeViewer';

type HandlerMap = Record<string, Set<() => void>>;

let mockVideoError: { code: number; message: string } | null = null;
const mockVideoHandlers: HandlerMap = {};
const mockVideoPlayer = {
  on: vi.fn((event: string, handler: () => void) => {
    mockVideoHandlers[event] ??= new Set();
    mockVideoHandlers[event].add(handler);
  }),
  one: vi.fn((event: string, handler: () => void) => {
    mockVideoHandlers[event] ??= new Set();
    mockVideoHandlers[event].add(handler);
    if (event === 'loadedmetadata') handler();
  }),
  off: vi.fn((event: string, handler: () => void) => {
    mockVideoHandlers[event]?.delete(handler);
  }),
  emit: (event: string) => {
    mockVideoHandlers[event]?.forEach((handler) => handler());
  },
  paused: vi.fn(() => true),
  play: vi.fn(() => Promise.resolve()),
  pause: vi.fn(),
  currentTime: vi.fn((time?: number) => (time === undefined ? 0 : undefined)),
  duration: vi.fn(() => 90),
  volume: vi.fn(() => 1),
  muted: vi.fn(() => false),
  playbackRate: vi.fn(() => 1),
  setCaptionsEnabled: vi.fn(),
};

vi.mock(
  '@src/pages/course/learning/components/content/media/common/useVideoJS',
  async () => {
    const React = await vi.importActual<typeof import('react')>('react');

    return {
      __esModule: true,
      default: (options: {
        onReady?: (player: typeof mockVideoPlayer) => void;
      }) => {
        const videoRef = React.useRef<HTMLVideoElement>(null);

        React.useEffect(() => {
          options.onReady?.(mockVideoPlayer);
        }, [options]);

        return {
          videoRef,
          player: mockVideoPlayer,
          isReady: true,
          error: mockVideoError,
        };
      },
    };
  },
);

vi.mock('video.js', () => {
  const mockVideojs = vi.fn();
  return Object.assign(mockVideojs, { default: mockVideojs });
});

const defaultMediaProps = {
  stepId: 'step-1',
  onPrevStep: vi.fn(),
  onNextStep: vi.fn(),
  hasPrevStep: true,
  hasNextStep: true,
  onToggleFullscreen: vi.fn(),
  isFullscreen: false,
};

function getVideoJsPlayer() {
  return mockVideoPlayer;
}

function installYoutubeApi() {
  let latestOptions: any;
  const fakePlayer = {
    playVideo: vi.fn(),
    pauseVideo: vi.fn(),
    seekTo: vi.fn(),
    getCurrentTime: vi.fn(() => 15),
    getDuration: vi.fn(() => 120),
    getVolume: vi.fn(() => 80),
    setVolume: vi.fn(),
    mute: vi.fn(),
    unMute: vi.fn(),
    isMuted: vi.fn(() => false),
    setPlaybackRate: vi.fn(),
    getPlaybackRate: vi.fn(() => 1),
    getIframe: vi.fn(() => document.createElement('iframe')),
    destroy: vi.fn(),
    loadModule: vi.fn(),
    unloadModule: vi.fn(),
    getOption: vi.fn(() => [{ languageCode: 'ko' }]),
    setOption: vi.fn(),
  };

  window.YT = {
    Player: vi.fn((element: HTMLElement, options: any) => {
      latestOptions = options;
      return fakePlayer;
    }),
    PlayerState: {
      UNSTARTED: -1,
      ENDED: 0,
      PLAYING: 1,
      PAUSED: 2,
      BUFFERING: 3,
      CUED: 5,
    },
  } as unknown as typeof window.YT;

  return {
    fakePlayer,
    getOptions: () => latestOptions,
  };
}

describe('[학습 페이지] 미디어 뷰어', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockVideoError = null;
    Object.keys(mockVideoHandlers).forEach((key) => {
      mockVideoHandlers[key].clear();
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    delete (window as any).YT;
    window.onYouTubeIframeAPIReady = undefined;
  });

  test('VideoViewer는 플레이어 준비 후 컨트롤을 표시하고 키보드 탐색을 처리한다.', () => {
    // Given
    const onPlayerReady = vi.fn();

    render(
      <VideoViewer
        contentUrl="https://cdn.example.com/video.mp4"
        stepId="step-1"
        onToggleFullscreen={vi.fn()}
        isFullscreen={false}
        onPlayerReady={onPlayerReady}
      />,
    );

    // When
    act(() => {
      vi.runOnlyPendingTimers();
    });
    const player = getVideoJsPlayer();
    fireEvent.keyDown(document.querySelector('[tabindex="0"]')!, {
      key: 'ArrowRight',
    });

    // Then
    expect(screen.getByAltText(/Play|Pause/)).toBeVisible();
    expect(onPlayerReady).toHaveBeenCalledWith(player);
    expect(player.currentTime).toHaveBeenCalledWith(10);
  });

  test('VideoViewer는 플레이어 에러를 실패 오버레이로 표시한다.', () => {
    // Given
    mockVideoError = { code: 4, message: 'not found' };

    render(
      <VideoViewer
        contentUrl="https://cdn.example.com/video.mp4"
        stepId="step-1"
        onToggleFullscreen={vi.fn()}
        isFullscreen={false}
      />,
    );

    // When
    act(() => {
      vi.runOnlyPendingTimers();
    });
    // Then
    expect(screen.getByAltText('Loading Failed')).toBeVisible();
    expect(screen.getByText('LESSON_LOAD_ERROR')).toBeVisible();
  });

  test('VideoContent는 일반 모드와 전체화면 모드 푸터를 렌더링한다.', () => {
    // Given
    const onToggleFullscreen = vi.fn();
    const { rerender } = render(
      <VideoContent
        {...defaultMediaProps}
        contentUrl="https://cdn.example.com/video.mp4"
        onToggleFullscreen={onToggleFullscreen}
      />,
    );

    // When
    act(() => {
      vi.runOnlyPendingTimers();
    });
    userEvent.click(
      document.querySelector(
        'img[src="/assets/course/curriculum/fullscreen.svg"]',
      )!,
    );

    // Then
    expect(onToggleFullscreen).toHaveBeenCalledTimes(1);

    // When
    rerender(
      <VideoContent
        {...defaultMediaProps}
        contentUrl="https://cdn.example.com/video.mp4"
        isFullscreen
      />,
    );
    act(() => {
      vi.runOnlyPendingTimers();
    });

    // Then
    expect(screen.getByAltText(/Play|Pause/)).toBeVisible();
    expect(screen.getByRole('button', { name: 'PREV_STEP' })).toBeVisible();
  });

  test('YouTubePlayerAdapter는 API 이벤트를 공통 미디어 플레이어 인터페이스로 변환한다.', () => {
    // Given
    const { fakePlayer, getOptions } = installYoutubeApi();
    const onReady = vi.fn();
    const onPlay = vi.fn();
    const onPause = vi.fn();
    const onVolumeChange = vi.fn();
    const element = document.createElement('div');

    const adapter = new YouTubePlayerAdapter(element, 'abcdefghijk', onReady);
    adapter.on('play', onPlay);
    adapter.on('pause', onPause);
    adapter.on('volumechange', onVolumeChange);

    // When
    getOptions().events.onReady();
    getOptions().events.onStateChange({ data: window.YT.PlayerState.PLAYING });
    adapter.currentTime(35);
    adapter.volume(0.5);
    adapter.muted(true);
    adapter.playbackRate(1.5);
    adapter.setCaptionsEnabled(true);
    getOptions().events.onStateChange({ data: window.YT.PlayerState.PAUSED });
    adapter.dispose();

    // Then
    expect(onReady).toHaveBeenCalledTimes(1);
    expect(onPlay).toHaveBeenCalledTimes(1);
    expect(onPause).toHaveBeenCalledTimes(1);
    expect(fakePlayer.seekTo).toHaveBeenCalledWith(35, true);
    expect(fakePlayer.setVolume).toHaveBeenCalledWith(50);
    expect(fakePlayer.mute).toHaveBeenCalledTimes(1);
    expect(fakePlayer.setPlaybackRate).toHaveBeenCalledWith(1.5);
    expect(fakePlayer.loadModule).toHaveBeenCalledWith('captions');
    expect(onVolumeChange).toHaveBeenCalledTimes(2);
    expect(fakePlayer.destroy).toHaveBeenCalledTimes(1);
  });

  test('YoutubeViewer는 유효하지 않은 URL을 안내하고 유효한 URL은 플레이어 준비를 전달한다.', () => {
    // Given
    const { fakePlayer, getOptions } = installYoutubeApi();
    const onPlayerReady = vi.fn();

    const { rerender } = render(
      <YoutubeViewer contentUrl="https://example.com/video" />,
    );

    // Then
    expect(screen.getByText('유효하지 않은 유튜브 URL입니다.')).toBeVisible();

    // When
    rerender(
      <YoutubeViewer
        contentUrl="https://youtu.be/abcdefghijk"
        stepId="step-1"
        onPlayerReady={onPlayerReady}
      />,
    );
    act(() => {
      getOptions().events.onReady();
    });
    userEvent.click(document.querySelector('.bg-black')!);

    // Then
    expect(screen.queryByAltText('Loading')).toBeNull();
    expect(onPlayerReady).toHaveBeenCalledTimes(1);
    expect(fakePlayer.getIframe).toHaveBeenCalledTimes(1);
  });

  test('YoutubeContent는 컨트롤과 단계 이동 푸터를 렌더링한다.', () => {
    // Given
    const { getOptions } = installYoutubeApi();

    render(
      <YoutubeContent
        {...defaultMediaProps}
        contentUrl="https://youtu.be/abcdefghijk"
      />,
    );

    // When
    act(() => {
      getOptions()?.events?.onReady?.();
    });

    // Then
    expect(screen.getByRole('button', { name: 'PREV_STEP' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'NEXT_STEP' })).toBeVisible();
  });
});
