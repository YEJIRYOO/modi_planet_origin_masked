import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Close } from '@src/lib/newAssets';
import { useWaveSurferStore } from '@src/store/zustand/ai/useWavesurferStore';
import { getUuid } from '@src/lib/utils/utils';

function ThumbnailVoice({
  classifierId,
  url,
  isGridView,
  deleteVoiceUrl,
  durations,
  onDurationChange,
  handleContainerClick,
  editableVoiceUrl,
  handleStopClick,
  handlePlayClick,
}) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [thumbnailId] = useState(getUuid());

  const { addWaveSurfer, removeWaveSurfer, stop, playingWsId } =
    useWaveSurferStore();

  const isPlaying = playingWsId === thumbnailId;

  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'black',
        progressColor: 'black',
        cursorColor: 'transparent',
        height: 70,
        url: url,
      });

      wavesurfer.on('finish', () => {
        stop(thumbnailId);
      });

      wavesurfer.on('ready', () => {
        const duration = wavesurfer.getDuration();
        onDurationChange(formatDuration(duration));
      });

      addWaveSurfer(classifierId, thumbnailId, wavesurfer);

      wavesurferRef.current = wavesurfer;

      return () => {
        wavesurfer?.destroy();
        removeWaveSurfer(thumbnailId);
      };
    }
  }, [url]);

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    stop(thumbnailId);
    deleteVoiceUrl();
  };

  const formatDuration = (duration: any) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.ceil(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div
        className={`relative flex-[0_0_auto] w-[70px] h-[70px] ${
          isGridView ? 'mr-[28px]' : ''
        }`}
      >
        <div
          className="object-cover rounded-16 w-[70px] h-[70px] bg-white border border-form-border overflow-hidden"
          ref={waveformRef}
        />
        {isGridView && (
          <button
            onClick={onClickDelete}
            className="absolute -top-[7px] -right-[11px] w-[24px] h-[24px] rounded-full border flex-center bg-white"
            style={{ zIndex: 3 }}
          >
            <Close className="w-[15px] h-[15px] [&_path]:stroke-black" />
          </button>
        )}
      </div>
      <div
        className={`absolute inset-0 flex justify-center items-center rounded-16 border ${
          editableVoiceUrl === url
            ? 'border-[#FF4547] bg-[#FFB1A3] bg-opacity-10 opacity-100'
            : 'group-hover:border-[#FF4547] group-hover:opacity-100'
        }`}
        style={{ zIndex: 2 }}
        onClick={(e) => handleContainerClick(url, e)}
      >
        <div className="opacity-0 group-hover:opacity-100 flex justify-center items-center w-full h-full rounded-16">
          {isPlaying ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStopClick(thumbnailId);
              }}
            >
              <img
                src="/assets/audio-stop.svg"
                alt="Stop"
                className="h-4 transition-opacity duration-300 ease-in-out object-cover"
              />
            </button>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayClick(classifierId, thumbnailId);
                }}
              >
                <img
                  src="/assets/audio-play.svg"
                  alt="Play"
                  className="h-4 transition-opacity duration-300 ease-in-out object-cover"
                />
              </button>
              <div className="absolute bottom-0 w-full text-center p8-sb text-font-main">
                {durations[url]}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ThumbnailVoice;
