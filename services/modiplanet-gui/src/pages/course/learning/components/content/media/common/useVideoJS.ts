import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface UseVideoJSOptions {
  sources: {
    src: string;
    type: string;
  }[];
  stepId?: string;
  autoplay?: boolean;
  responsive?: boolean;
  fluid?: boolean;
  onReady?: (player: videojs.Player) => void;
}

export default function useVideoJS(options: UseVideoJSOptions) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<videojs.Player | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<{ code: number; message: string } | null>(
    null,
  );
  const onReadyRef = useRef(options.onReady);

  useEffect(() => {
    onReadyRef.current = options.onReady;
  }, [options.onReady]);

  const sourceUrl = options.sources[0]?.src;
  const sourcesRef = useRef(options.sources);
  sourcesRef.current = options.sources;

  // 플레이어 초기화 (마운트 시)
  useEffect(() => {
    if (!videoRef.current) return;

    const player = videojs(
      videoRef.current,
      {
        autoplay: options.autoplay ?? false,
        responsive: options.responsive ?? true,
        fluid: options.fluid ?? true,
        controls: false,
        sources: sourcesRef.current,
      },
      () => {
        setIsReady(true);
        onReadyRef.current?.(player);
      },
    );

    player.on('error', () => {
      const err = player.error();
      if (err) {
        console.error('[VideoJS] error:', err.code, err.message);
        setError({ code: err.code ?? 0, message: err.message ?? '' });
      }
    });

    playerRef.current = player;

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
        setIsReady(false);
      }
    };
  }, []);

  // 소스 변경 시 기존 플레이어 재사용
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (playerRef.current && sourceUrl) {
      setError(null);
      playerRef.current.src(sourcesRef.current);
      onReadyRef.current?.(playerRef.current);
    }
  }, [sourceUrl, options.stepId]);

  return {
    videoRef,
    player: playerRef.current,
    isReady,
    error,
  };
}
