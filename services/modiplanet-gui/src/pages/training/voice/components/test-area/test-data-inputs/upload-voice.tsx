import React, { Fragment, useRef, useState, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Upload } from '@src/lib/newAssets';
import { validateFileSize } from '@src/lib/utils/utils';
import useTranslator from '@hooks/useTranslator';
import { ACCEPT_VOICE_FILES_AI_UPLOAD } from '@src/lib/constants/etc';
import { createRegion } from '../../classfier-card/voice-upload-inputs/createRegion';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import useAudioCropper from '../../classfier-card/voice-upload-inputs/useAudioCropper';
import useDrawWaveform from '../../../hooks/useDrawWaveform';
import { useDisclosure } from '@nextui-org/react';
import InvalidFileModal from '@components/ui/common/Modal/InvalidFileModal';

interface UploadVoiceProps {
  onPredict: (data: ImageData) => void;
}

interface Region {
  start: number;
  end: number;
  id: string;
  [key: string]: any;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function UploadVoice({ onPredict }: UploadVoiceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [updatedRegion, setUpdatedRegion] = useState<Region | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const { t } = useTranslator();
  const {
    isOpen: isInvalidFileModalOpen,
    onOpen: onInvalidFileModalOpen,
    onClose: onInvalidFileModalClose,
  } = useDisclosure();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { cropAudio } = useAudioCropper(waveformRef);
  const { getImageUrlFromWaveSurfer } = useDrawWaveform();

  const handlePlayClick = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.stop();
        setIsPlaying(false);
      } else {
        if (updatedRegion) {
          const ws = wavesurferRef.current;
          ws.setTime(updatedRegion.start);
          ws.play();
          const handleTimeUpdate = (currentTime: number) => {
            if (currentTime >= updatedRegion.end) {
              ws.pause();
              ws.setTime(updatedRegion.start);
              ws.un('timeupdate', handleTimeUpdate);
              setIsPlaying(false);
            }
          };

          ws.on('timeupdate', handleTimeUpdate);
        } else {
          wavesurferRef.current.play();
        }
        setIsPlaying(true);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    try {
      const file = files[0];
      validateFileSize([file], MAX_FILE_SIZE);

      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }

      if (waveformRef.current) {
        wavesurferRef.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: 'black',
          progressColor: 'black',
          cursorColor: 'red',
          height: 150,
        });

        const reader = new FileReader();

        reader.onload = () => {
          const src = `${reader.result}`;
          setAudioUrl(src);
          wavesurferRef.current?.load(src);
        };

        reader.readAsDataURL(file);

        createRegion(wavesurferRef.current, setUpdatedRegion);

        wavesurferRef.current.on('ready', () => {
          setIsLoading(false);
          setIsUploaded(true);
        });

        wavesurferRef.current.on('play', () => {
          setIsPlaying(true);
        });

        wavesurferRef.current.on('pause', () => {
          setIsPlaying(false);
        });

        wavesurferRef.current.on('finish', () => {
          setIsPlaying(false);
        });
      }
    } catch (err) {
      onInvalidFileModalOpen();
      console.error('파일 에러', err);
    }
  };

  const handleCrop = async () => {
    const croppedUrl = await cropAudio(updatedRegion, audioUrl);
    console.log(croppedUrl);
    if (croppedUrl) {
      const imageData = await getImageUrlFromWaveSurfer(croppedUrl);
      onPredict(imageData);
    }
  };

  const handleUpload = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, []);

  return (
    <Fragment>
      <label
        style={{
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
        className={`overflow-hidden block w-[150px] h-[150px] relative border rounded-20 aspect-square bg-white flex-col items-center pt-[13px] text-brand ${
          isLoading
            ? 'bg-form-bg'
            : 'border-brand cursor-pointer text-brand bg-white'
        }`}
      >
        <p className="mb-[8px] flex-center">
          <Upload className="w-[40px] h-[40px] [&_path]:stroke-brand" />
        </p>

        <p className="p5-sb text-center whitespace-pre-wrap">
          {isLoading ? '처리중' : t('VOICE_SIZE_GUIDE')}
        </p>

        <div
          ref={waveformRef}
          className={`absolute inset-0 group ${isUploaded ? 'bg-white' : ''}`}
        >
          {isUploaded && (
            <button
              onClick={handlePlayClick}
              className="absolute top-2 right-2 z-10 group-hover:opacity-100 opacity-0"
            >
              <img
                src={
                  isPlaying
                    ? '/assets/audio-stop.svg'
                    : '/assets/audio-play.svg'
                }
                alt={isPlaying ? 'Stop' : 'Play'}
                className="h-6 object-cover"
              />
            </button>
          )}
        </div>
        <input
          className="hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={ACCEPT_VOICE_FILES_AI_UPLOAD}
        />
      </label>
      <div className="flex w-[150px] justify-center gap-1 mt-[8px]">
        <ButtonUI size="sm" onClick={handleUpload}>
          {t('UPLOAD')}
        </ButtonUI>
        <ButtonUI
          isDisabled={!audioUrl}
          size="sm"
          color="secondary"
          onClick={handleCrop}
        >
          {t('OK')}
        </ButtonUI>
      </div>
      <InvalidFileModal
        isOpen={isInvalidFileModalOpen}
        onClose={onInvalidFileModalClose}
      />
    </Fragment>
  );
}

export default UploadVoice;
