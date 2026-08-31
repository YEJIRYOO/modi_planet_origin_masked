import { useRef, useEffect, useState, useCallback } from 'react';
import useVideoJS from '../common/useVideoJS';
import VideoPlayerControls from '../common/VideoPlayerControls';
import type { MediaPlayer } from '../common/types';
import useTranslator from '@src/components/hooks/useTranslator';

interface VideoViewerProps {
  contentUrl: string;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onLoadingChange?: (isLoading: boolean) => void;
  stepId?: string;
  showControls?: boolean;
  onPlayerReady?: (player: MediaPlayer) => void;
}

export default function VideoViewer({
  contentUrl,
  onToggleFullscreen,
  isFullscreen,
  onLoadingChange,
  stepId,
  showControls = true,
  onPlayerReady,
}: VideoViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslator();

  const handleReady = useCallback((player: any) => {
    player.one('loadedmetadata', () => setIsLoading(false));
  }, []);

  const { videoRef, player, isReady, error } = useVideoJS({
    sources: [{ src: contentUrl, type: 'video/mp4' }],
    stepId,
    onReady: handleReady,
  });

  useEffect(() => {
    if (isReady && player) {
      onPlayerReady?.(player as unknown as MediaPlayer);
    }
  }, [isReady, player, onPlayerReady]);

  // stepId 변경 시 로딩 상태 리셋
  useEffect(() => {
    setIsLoading(true);
  }, [stepId]);

  // 로딩 상태 전파
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  const togglePlay = useCallback(() => {
    if (!player) return;

    if (player.paused()) {
      player.play()?.catch((error: any) => console.error('Play error:', error));
    } else {
      player.pause();
    }
  }, [player]);

  const handleVideoClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('.video-controls')) return;
      e.preventDefault();
      togglePlay();
    },
    [togglePlay],
  );

  useEffect(() => {
    if (!player) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          player.currentTime((player.currentTime() || 0) - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          player.currentTime((player.currentTime() || 0) + 10);
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.setAttribute('tabindex', '0');
      container.addEventListener('keydown', handleKeyDown);
      container.focus();
    }

    return () => container?.removeEventListener('keydown', handleKeyDown);
  }, [player, togglePlay]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-black relative flex items-center justify-center outline-none"
      onClick={handleVideoClick}
    >
      <div data-vjs-player className="w-full h-full">
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered w-full h-full"
        />
      </div>

      {isReady && showControls && (
        <VideoPlayerControls
          player={player as unknown as MediaPlayer}
          onToggleFullscreen={onToggleFullscreen}
          isFullscreen={isFullscreen}
          stepId={stepId}
        />
      )}

      {/* 비디오 에러 */}
      {error && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ background: '#000000CC' }}
        >
          <div className="flex flex-col items-center justify-center gap-[24px] p-[40px]">
            <img
              src="/assets/course/curriculum/loading-failed.svg"
              alt="Loading Failed"
              className="w-[120px] h-[120px]"
            />
            <p className="p4-sb text-white">{t('LESSON_LOAD_ERROR')}</p>
          </div>
        </div>
      )}

      {/* 비디오 로딩 */}
      {!error && isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ background: '#000000CC' }}
        >
          <div className="flex flex-col items-center justify-center gap-[24px] p-[40px]">
            <img
              src="/assets/course/curriculum/loading.gif"
              alt="Loading"
              className="w-[120px] h-[120px]"
            />
            <p className="p4-sb text-white">{t('LESSON_LOADING')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
