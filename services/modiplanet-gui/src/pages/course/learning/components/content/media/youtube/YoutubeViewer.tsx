import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { getYoutubeVideoId } from '../common/youtubeUtils';
import useYoutubePlayer from '../common/useYoutubePlayer';
import type { MediaPlayer } from '../common/types';
import useTranslator from '@src/components/hooks/useTranslator';

interface YoutubeViewerProps {
  contentUrl: string;
  onPlayerReady?: (player: MediaPlayer) => void;
  stepId?: string;
}

export default function YoutubeViewer({
  contentUrl,
  onPlayerReady,
  stepId,
}: YoutubeViewerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoId = useMemo(() => getYoutubeVideoId(contentUrl), [contentUrl]);
  const { t } = useTranslator();

  const handleReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  const { containerRef, player, isReady, error } = useYoutubePlayer({
    videoId: videoId ?? '',
    stepId,
    onReady: handleReady,
  });

  useEffect(() => {
    setIsLoading(true);
  }, [stepId]);

  useEffect(() => {
    if (isReady && player) {
      onPlayerReady?.(player);
    }
  }, [isReady, player, onPlayerReady]);

  const togglePlay = useCallback(() => {
    if (!player) return;
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  }, [player]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
          player.currentTime(player.currentTime() - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          player.currentTime(player.currentTime() + 10);
          break;
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.setAttribute('tabindex', '0');
      wrapper.addEventListener('keydown', handleKeyDown);
      wrapper.focus();
    }

    return () => wrapper?.removeEventListener('keydown', handleKeyDown);
  }, [player, togglePlay]);

  if (!videoId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <p className="p4-sb text-white">유효하지 않은 유튜브 URL입니다.</p>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full bg-black relative flex items-center justify-center outline-none"
      onClick={handleClick}
    >
      <div
        key={`${videoId}-${stepId}`}
        ref={containerRef}
        className="w-full aspect-video max-h-full relative"
      />

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
