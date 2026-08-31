import type { MediaPlayer } from './types';

interface YTPlayerOptions {
  videoId: string;
  width?: string | number;
  height?: string | number;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: () => void;
    onStateChange?: (e: { data: number }) => void;
    onError?: (e: { data: number }) => void;
    onApiChange?: () => void;
  };
}

interface YTPlayerInstance {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getVolume(): number;
  setVolume(volume: number): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  setPlaybackRate(rate: number): void;
  getPlaybackRate(): number;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
}

interface YTStatic {
  Player: new (element: HTMLElement, options: YTPlayerOptions) => YTPlayerInstance;
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    YT: YTStatic;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

type EventHandler = () => void;

export class YouTubePlayerAdapter implements MediaPlayer {
  private ytPlayer: YTPlayerInstance | null = null;
  private listeners = new Map<string, Set<EventHandler>>();
  private timeupdateInterval: ReturnType<typeof setInterval> | null = null;
  private _duration = 0;
  private _volume = 1;
  private _muted = false;
  private _paused = true;
  private _captionsEnabled = false;

  constructor(
    element: HTMLDivElement,
    videoId: string,
    onReady?: () => void,
  ) {
    const loadAPI = () => {
      if (window.YT?.Player) {
        this.initPlayer(element, videoId, onReady);
        return;
      }

      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        this.initPlayer(element, videoId, onReady);
      };

      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      }
    };

    loadAPI();
  }

  private initPlayer(element: HTMLDivElement, videoId: string, onReady?: () => void) {
    this.ytPlayer = new window.YT.Player(element, {
      videoId,
      width: '100%',
      height: '100%',
      playerVars: {
        rel: 0,
        modestbranding: 1,
        controls: 0,
        disablekb: 1,
        iv_load_policy: 3,
        playsinline: 1,
      },
      events: {
        onReady: () => {
          const iframe = this.ytPlayer?.getIframe();
          if (iframe) {
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.display = 'block';
            iframe.style.border = 'none';
          }
          this._duration = this.ytPlayer?.getDuration() ?? 0;
          this.emit('loadedmetadata');
          this.startTimeupdatePolling();
          onReady?.();
        },
        onStateChange: (e) => {
          const state = window.YT.PlayerState;
          switch (e.data) {
            case state.PLAYING:
              this._paused = false;
              this.emit('play');
              break;
            case state.PAUSED:
              this._paused = true;
              this.emit('pause');
              break;
            case state.ENDED:
              this._paused = true;
              this.emit('pause');
              this.emit('ended');
              break;
          }
        },
        onError: (e) => {
          console.error('[YouTube] error:', e.data);
          this.emit('error');
        },
        onApiChange: () => {
          if (!this._captionsEnabled) {
            try { (this.ytPlayer as any).unloadModule('captions'); } catch { /* noop */ }
          }
        },
      },
    });
  }

  private startTimeupdatePolling() {
    this.timeupdateInterval = setInterval(() => {
      if (this.ytPlayer && !this._paused) {
        this.emit('timeupdate');
      }
    }, 250);
  }

  private emit(event: string) {
    this.listeners.get(event)?.forEach((handler) => handler());
  }

  play(): void {
    this.ytPlayer?.playVideo();
  }

  pause(): void {
    this.ytPlayer?.pauseVideo();
  }

  paused(): boolean {
    return this._paused;
  }

  currentTime(): number;
  currentTime(time: number): void;
  currentTime(time?: number): number | void {
    if (time !== undefined) {
      this.ytPlayer?.seekTo(time, true);
    } else {
      return this.ytPlayer?.getCurrentTime() ?? 0;
    }
  }

  duration(): number {
    return this.ytPlayer?.getDuration() ?? this._duration;
  }

  volume(): number;
  volume(val: number): void;
  volume(val?: number): number | void {
    if (val !== undefined) {
      this._volume = val;
      this.ytPlayer?.setVolume(val * 100);
      if (val > 0) this._muted = false;
      this.emit('volumechange');
    } else {
      return this._volume;
    }
  }

  muted(): boolean;
  muted(val: boolean): void;
  muted(val?: boolean): boolean | void {
    if (val !== undefined) {
      this._muted = val;
      if (val) {
        this.ytPlayer?.mute();
      } else {
        this.ytPlayer?.unMute();
      }
      this.emit('volumechange');
    } else {
      return this._muted;
    }
  }

  playbackRate(): number;
  playbackRate(rate: number): void;
  playbackRate(rate?: number): number | void {
    if (rate !== undefined) {
      this.ytPlayer?.setPlaybackRate(rate);
    } else {
      return this.ytPlayer?.getPlaybackRate() ?? 1;
    }
  }

  setCaptionsEnabled(enabled: boolean): void {
    if (!this.ytPlayer) return;
    const player = this.ytPlayer as any;
    this._captionsEnabled = enabled;

    try {
      if (enabled) {
        player.loadModule('captions');
        const applyTrack = (retries = 10) => {
          try {
            const tracks = player.getOption('captions', 'tracklist');
            if (Array.isArray(tracks) && tracks.length > 0) {
              player.setOption('captions', 'track', tracks[0]);
              return;
            }
          } catch { /* noop */ }
          if (retries > 0 && this._captionsEnabled) {
            setTimeout(() => applyTrack(retries - 1), 200);
          }
        };
        setTimeout(() => applyTrack(), 300);
      } else {
        player.unloadModule('captions');
      }
    } catch {
      console.warn('Captions not available for this video');
    }
  }

  on(event: string, handler: EventHandler): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  off(event: string, handler: EventHandler): void {
    this.listeners.get(event)?.delete(handler);
  }

  dispose(): void {
    if (this.timeupdateInterval) {
      clearInterval(this.timeupdateInterval);
      this.timeupdateInterval = null;
    }
    this.listeners.clear();
    this.ytPlayer?.destroy();
    this.ytPlayer = null;
  }
}
