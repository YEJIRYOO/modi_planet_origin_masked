import { useState, useEffect, useRef } from 'react';
import type { MediaPlayer } from './types';
import useTranslator from '@src/components/hooks/useTranslator';

interface VideoPlayerControlsProps {
  player: MediaPlayer | null;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  className?: string;
  stepId?: string;
}

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

export default function VideoPlayerControls({
  player,
  onToggleFullscreen,
  isFullscreen,
  className = 'absolute bottom-0 left-0 right-0 h-[48px] bg-form-border px-[24px]',
  stepId,
}: VideoPlayerControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isCaptionActive, setIsCaptionActive] = useState(false);
  const [prevVolume, setPrevVolume] = useState(1);
  const speedListRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslator();

  useEffect(() => {
    if (!showSpeedMenu) return;
    requestAnimationFrame(() => {
      const container = speedListRef.current;
      if (!container) return;
      const index = PLAYBACK_SPEEDS.indexOf(playbackSpeed);
      if (index === -1) return;
      const child = container.children[index] as HTMLElement;
      if (!child) return;
      const containerHeight = container.clientHeight;
      const childTop = child.offsetTop - container.offsetTop;
      const childHeight = child.offsetHeight;
      container.scrollTop = childTop - (containerHeight - childHeight) / 2;
    });
  }, [showSpeedMenu, playbackSpeed]);

  // stepId 변경 시 상태 초기화
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackSpeed(1);
    setShowSpeedMenu(false);
    setShowVolumeSlider(false);
  }, [stepId]);

  useEffect(() => {
    if (!player) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(player.currentTime() || 0);
    const handleLoadedMetadata = () => setDuration(player.duration() || 0);
    const handleVolumeChange = () => {
      try {
        const vol = player.volume();
        const muted = player.muted();

        if (typeof vol === 'number') {
          setVolume((prev) => (Math.abs(prev - vol) > 0.001 ? vol : prev));
        }
        setIsMuted((prev) => (prev !== muted ? muted : prev));
      } catch (error) {
        console.warn('Volume error:', error);
      }
    };

    player.on('play', handlePlay);
    player.on('pause', handlePause);
    player.on('timeupdate', handleTimeUpdate);
    player.on('loadedmetadata', handleLoadedMetadata);
    player.on('volumechange', handleVolumeChange);

    // 초기값 설정
    setCurrentTime(player.currentTime() || 0);
    setDuration(player.duration() || 0);
    setIsPlaying(!player.paused());
    try {
      setPlaybackSpeed(player.playbackRate() || 1);
      const vol = player.volume();
      if (typeof vol === 'number') setVolume(vol);
      setIsMuted(player.muted());
    } catch (error) {
      console.warn('Init volume error:', error);
    }

    return () => {
      player.off('play', handlePlay);
      player.off('pause', handlePause);
      player.off('timeupdate', handleTimeUpdate);
      player.off('loadedmetadata', handleLoadedMetadata);
      player.off('volumechange', handleVolumeChange);
    };
  }, [player]);

  const togglePlay = () => {
    if (player) {
      if (player.paused()) {
        const playPromise = player.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Error playing video:', error);
          });
        }
      } else {
        player.pause();
      }
    }
  };

  const skip = (amount: number) => {
    if (player) {
      const newTime = (player.currentTime() || 0) + amount;
      player.currentTime(newTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (player) {
      const time = parseFloat(e.target.value);
      player.currentTime(time);
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (player) {
      try {
        if (isMuted || volume === 0) {
          // 이전 볼륨으로 되돌리기
          const targetVolume = prevVolume > 0 ? prevVolume : 1;
          player.muted(false);
          player.volume(targetVolume);
          // volumechange 이벤트가 state를 업데이트하므로 여기서는 하지 않음
        } else {
          // 뮤트
          setPrevVolume(volume);
          player.muted(true);
          player.volume(0);
          // volumechange 이벤트가 state를 업데이트하므로 여기서는 하지 않음
        }
      } catch (error) {
        console.warn('Error toggling mute:', error);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (player) {
      try {
        player.volume(val);
        const muted = val === 0;
        player.muted(muted);
        // volumechange 이벤트가 state를 업데이트하므로 여기서는 하지 않음
        if (!muted) {
          setPrevVolume(val);
        }
      } catch (error) {
        console.warn('Error changing volume:', error);
      }
    }
  };

  const changeSpeed = (speed: number) => {
    if (player) {
      player.playbackRate(speed);
      setPlaybackSpeed(speed);
      setShowSpeedMenu(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div
      className={`flex items-center gap-[16px] z-20 video-controls ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 재생 컨트롤*/}
      <div className="flex items-center gap-[12px]">
        <button
          onClick={() => skip(-10)}
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src="/assets/course/curriculum/video/skip-back.svg"
            alt="Skip Back"
            className="w-[24px] h-[24px]"
          />
        </button>
        <button
          onClick={togglePlay}
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src={
              isPlaying
                ? '/assets/course/curriculum/video/pause.svg'
                : '/assets/course/curriculum/video/play.svg'
            }
            alt={isPlaying ? 'Pause' : 'Play'}
            className="w-[24px] h-[24px]"
          />
        </button>
        <button
          onClick={() => skip(10)}
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src="/assets/course/curriculum/video/skip-next.svg"
            alt="Skip Next"
            className="w-[24px] h-[24px]"
          />
        </button>
      </div>

      {/* 현재 시간 / 전체 시간 */}
      <div className="flex items-center gap-[4px] p6-m whitespace-nowrap min-w-[85px]">
        <span>{formatTime(currentTime)}</span>
        <span>/</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* 진행 바 */}
      <div className="flex-1 relative h-[4px] bg-font-non rounded-[2px] group cursor-pointer">
        <div
          className="absolute left-0 top-0 h-full bg-brand_1 rounded-[2px]"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[16px] h-[16px] bg-brand rounded-full pointer-events-none"
          style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)` }}
        />
        <input
          type="range"
          min="0"
          max={duration || 100}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
        />
      </div>

      {/* 오른쪽 컨트롤 */}
      <div className="flex items-center gap-[16px]">
        {/* 볼륨 */}
        <div
          className="relative flex flex-col items-center group/volume"
          onMouseEnter={() => {
            setShowVolumeSlider(true);
            setShowSpeedMenu(false);
          }}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button
            onClick={toggleMute}
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src={
                isMuted || volume === 0
                  ? '/assets/course/curriculum/video/mute.svg'
                  : '/assets/course/curriculum/video/speaker.svg'
              }
              alt="Volume"
              className="w-[24px] h-[24px]"
            />
          </button>
          {showVolumeSlider && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-[12px]">
              <div className="w-[52px] h-[148px] bg-[#2B2929CC] rounded-[12px] flex flex-col items-center py-6">
                <div className="relative flex-1 w-[4px] bg-form-gray rounded-[2px]">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-brand_1 rounded-[2px]"
                    style={{ height: `${volume * 100}%` }}
                  />
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-[24px] h-[24px] bg-white rounded-full shadow-md pointer-events-none"
                    style={{ bottom: `calc(${volume * 100}% - 12px)` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="absolute top-1/2 left-1/2 -rotate-90 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[56px] opacity-0 cursor-pointer origin-center z-10"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 배속 */}
        <div className="relative flex flex-col items-center">
          <button
            onClick={() => {
              setShowSpeedMenu(!showSpeedMenu);
              setShowVolumeSlider(false);
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src={
                showSpeedMenu
                  ? '/assets/course/curriculum/video/speed-active.svg'
                  : '/assets/course/curriculum/video/speed.svg'
              }
              alt="Speed"
              className="w-[24px] h-[24px]"
            />
          </button>
          {showSpeedMenu && (
            <div
              className="absolute bottom-[calc(100%+12px)] right-[-20px] bg-font-sub rounded-[12px] min-w-[120px] p-[12px] flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.1)] z-50 cursor-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p8-r text-white mb-[8px] px-[4px]">
                {t('PLAYBACK_SPEED')}
              </div>
              <div className="w-full h-[1px] bg-white/20 mb-[8px] flex-shrink-0" />
              <div
                ref={speedListRef}
                className="h-[100px] flex flex-col overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-font-sub_1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-font-sub_2 [&::-webkit-scrollbar-thumb]:rounded-full gap-[4px] pr-[2px]"
              >
                {PLAYBACK_SPEEDS.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => changeSpeed(speed)}
                    className={`min-w-[80px] w-full h-[23px] flex items-center justify-start flex-shrink-0 px-[4px] p8-r text-white transition-colors rounded-[8px] ${
                      playbackSpeed === speed
                        ? 'bg-font-sub_2'
                        : 'bg-transparent hover:bg-font-sub_1'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 자막 */}
        <button
          onClick={() => {
            const next = !isCaptionActive;
            setIsCaptionActive(next);
            player?.setCaptionsEnabled?.(next);
            setShowVolumeSlider(false);
            setShowSpeedMenu(false);
          }}
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src={
              isCaptionActive
                ? '/assets/course/curriculum/video/caption-active.svg'
                : '/assets/course/curriculum/video/caption.svg'
            }
            alt="Caption"
            className="w-[24px] h-[24px]"
          />
        </button>

        {/* 전체화면 */}
        <button
          onClick={() => {
            onToggleFullscreen();
            setShowVolumeSlider(false);
            setShowSpeedMenu(false);
          }}
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src={
              isFullscreen
                ? '/assets/course/curriculum/minscreen.svg'
                : '/assets/course/curriculum/fullscreen.svg'
            }
            className="w-[24px] h-[24px]"
          />
        </button>
      </div>
    </div>
  );
}
