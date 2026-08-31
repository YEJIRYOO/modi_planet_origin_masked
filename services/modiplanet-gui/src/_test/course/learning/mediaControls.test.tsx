import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import VideoPlayerControls from '@src/pages/course/learning/components/content/media/common/VideoPlayerControls';
import type { MediaPlayer } from '@src/pages/course/learning/components/content/media/common/types';
import {
  getYoutubeUrl,
  getYoutubeVideoId,
  isYoutubeUrl,
} from '@src/pages/course/learning/components/content/media/common/youtubeUtils';

type HandlerMap = Record<string, Set<() => void>>;

function createMediaPlayer() {
  const handlers: HandlerMap = {};
  let currentTime = 30;
  let duration = 120;
  let paused = true;
  let volume = 1;
  let muted = false;
  let playbackRate = 1;

  const emit = (event: string) => {
    handlers[event]?.forEach((handler) => handler());
  };

  const player: MediaPlayer = {
    play: vi.fn(() => {
      paused = false;
      emit('play');
      return Promise.resolve();
    }),
    pause: vi.fn(() => {
      paused = true;
      emit('pause');
    }),
    paused: vi.fn(() => paused),
    currentTime: vi.fn((time?: number) => {
      if (time !== undefined) {
        currentTime = time;
        emit('timeupdate');
        return undefined;
      }
      return currentTime;
    }) as MediaPlayer['currentTime'],
    duration: vi.fn(() => duration),
    volume: vi.fn((value?: number) => {
      if (value !== undefined) {
        volume = value;
        emit('volumechange');
        return undefined;
      }
      return volume;
    }) as MediaPlayer['volume'],
    muted: vi.fn((value?: boolean) => {
      if (value !== undefined) {
        muted = value;
        emit('volumechange');
        return undefined;
      }
      return muted;
    }) as MediaPlayer['muted'],
    playbackRate: vi.fn((value?: number) => {
      if (value !== undefined) {
        playbackRate = value;
        return undefined;
      }
      return playbackRate;
    }) as MediaPlayer['playbackRate'],
    on: vi.fn((event: string, handler: () => void) => {
      handlers[event] ??= new Set();
      handlers[event].add(handler);
    }),
    off: vi.fn((event: string, handler: () => void) => {
      handlers[event]?.delete(handler);
    }),
    setCaptionsEnabled: vi.fn(),
  };

  return { player, emit, setDuration: (value: number) => (duration = value) };
}

describe('[학습 페이지] 미디어 컨트롤', () => {
  test('유튜브 URL 유틸은 여러 형식의 비디오 ID를 처리한다.', () => {
    expect(
      getYoutubeVideoId('https://www.youtube.com/watch?v=abcdefghijk'),
    ).toBe('abcdefghijk');
    expect(getYoutubeVideoId('https://youtu.be/abcdefghijk')).toBe(
      'abcdefghijk',
    );
    expect(getYoutubeVideoId('https://www.youtube.com/embed/abcdefghijk')).toBe(
      'abcdefghijk',
    );
    expect(getYoutubeVideoId('abcdefghijk')).toBe('abcdefghijk');
    expect(getYoutubeVideoId('https://example.com/video')).toBeNull();
    expect(getYoutubeUrl('abcdefghijk')).toBe(
      'https://www.youtube.com/watch?v=abcdefghijk',
    );
    expect(isYoutubeUrl('abcdefghijk')).toBe(true);
    expect(isYoutubeUrl('invalid-url!')).toBe(false);
  });

  test('비디오 컨트롤은 재생, 탐색, 음량, 배속, 자막, 전체화면을 제어한다.', () => {
    // Given
    const { player, emit } = createMediaPlayer();
    const onToggleFullscreen = vi.fn();

    render(
      <VideoPlayerControls
        player={player}
        onToggleFullscreen={onToggleFullscreen}
        isFullscreen={false}
        stepId="step-1"
      />,
    );

    // Then
    expect(screen.getByText('00:30')).toBeVisible();
    expect(screen.getByText('02:00')).toBeVisible();

    // When
    userEvent.click(screen.getByAltText('Play'));
    userEvent.click(screen.getByAltText('Skip Next'));
    userEvent.click(screen.getByAltText('Skip Back'));
    fireEvent.change(screen.getByDisplayValue('30'), {
      target: { value: '45' },
    });
    userEvent.click(screen.getByAltText('Volume'));

    const volumeGroup = screen.getByAltText('Volume').closest('div')!;
    fireEvent.mouseEnter(volumeGroup);
    fireEvent.change(screen.getByDisplayValue('0'), {
      target: { value: '0.5' },
    });

    userEvent.click(screen.getByAltText('Speed'));
    userEvent.click(screen.getByRole('button', { name: '1.5' }));
    userEvent.click(screen.getByAltText('Caption'));
    userEvent.click(document.querySelector('img[src$="fullscreen.svg"]')!);

    // Then
    expect(player.play).toHaveBeenCalledTimes(1);
    expect(player.currentTime).toHaveBeenCalledWith(40);
    expect(player.currentTime).toHaveBeenCalledWith(30);
    expect(player.currentTime).toHaveBeenCalledWith(45);
    expect(player.muted).toHaveBeenCalledWith(true);
    expect(player.volume).toHaveBeenCalledWith(0.5);
    expect(player.playbackRate).toHaveBeenCalledWith(1.5);
    expect(player.setCaptionsEnabled).toHaveBeenCalledWith(true);
    expect(onToggleFullscreen).toHaveBeenCalledTimes(1);

    expect(screen.getByAltText('Caption')).toHaveAttribute(
      'src',
      '/assets/course/curriculum/video/caption-active.svg',
    );
  });

  test('비디오 컨트롤은 stepId가 바뀌면 재생 상태와 시간을 초기화한다.', () => {
    // Given
    const { player } = createMediaPlayer();

    const { rerender } = render(
      <VideoPlayerControls
        player={player}
        onToggleFullscreen={vi.fn()}
        isFullscreen={false}
        stepId="step-1"
      />,
    );

    // When
    fireEvent.change(screen.getByDisplayValue('30'), {
      target: { value: '60' },
    });
    rerender(
      <VideoPlayerControls
        player={player}
        onToggleFullscreen={vi.fn()}
        isFullscreen={false}
        stepId="step-2"
      />,
    );

    // Then
    expect(screen.getAllByText('00:00').length).toBeGreaterThan(0);
  });
});
