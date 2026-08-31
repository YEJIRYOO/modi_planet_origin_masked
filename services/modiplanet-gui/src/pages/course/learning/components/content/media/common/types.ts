export interface MediaPlayer {
  play(): Promise<void> | void;
  pause(): void;
  paused(): boolean;
  currentTime(): number;
  currentTime(time: number): void;
  duration(): number;
  volume(): number;
  volume(val: number): void;
  muted(): boolean;
  muted(val: boolean): void;
  playbackRate(): number;
  playbackRate(rate: number): void;
  on(event: string, handler: () => void): void;
  off(event: string, handler: () => void): void;
  setCaptionsEnabled?(enabled: boolean): void;
}
