import { useEffect, useRef, useState } from 'react';
import { YouTubePlayerAdapter } from './YouTubePlayerAdapter';
import type { MediaPlayer } from './types';

interface UseYoutubePlayerOptions {
  videoId: string;
  stepId?: string;
  onReady?: () => void;
}

export default function useYoutubePlayer({ videoId, stepId, onReady }: UseYoutubePlayerOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayerAdapter | null>(null);
  const [player, setPlayer] = useState<MediaPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(false);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    if (!containerRef.current || !videoId) return;

    playerRef.current?.dispose();

    const targetEl = document.createElement('div');
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(targetEl);

    const adapter = new YouTubePlayerAdapter(targetEl, videoId, () => {
      setPlayer(adapter);
      setIsReady(true);
      onReadyRef.current?.();
    });

    adapter.on('error', () => setError(true));

    playerRef.current = adapter;

    return () => {
      adapter.dispose();
      playerRef.current = null;
      setPlayer(null);
      setIsReady(false);
      setError(false);
    };
  }, [videoId, stepId]);

  return { containerRef, player, isReady, error };
}
