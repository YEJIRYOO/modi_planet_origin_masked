import React, { useEffect, useRef, useState } from 'react';
import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import { ACCEPT_VOICE_FILES_AI_UPLOAD } from '@src/lib/constants/etc';
import useTranslator from '@hooks/useTranslator';
import { validateFileSize } from '@src/lib/utils/utils';
import WaveSurfer from 'wavesurfer.js';
import { createRegion } from './createRegion';
import useAudioCropper from './useAudioCropper';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import { useSingleFileUploader } from '@hooks/upload/useSingleFileUploader';
import { useProfileStore } from '@src/store/zustand';
import { useMultiFileUploader } from '@src/components/hooks/upload/useMultiFileUploader';
import { getUuid } from '@src/lib/utils/utils';
import { useWaveSurferStore } from '@src/store/zustand/ai/useWavesurferStore';
import { useDisclosure } from '@nextui-org/react';
import InvalidFileModal from '@components/ui/common/Modal/InvalidFileModal';

interface VoiceFileUploader {
  addVoiceUrls: (urls: Array<string>) => void;
  isDatasetMaxCount: boolean;
  editableVoiceUrl: string;
  classifierId: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILE_COUNT = 50;

function VoiceFileUploader({
  addVoiceUrls,
  isDatasetMaxCount,
  editableVoiceUrl,
  classifierId,
}: VoiceFileUploader) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingsRef = useRef<HTMLDivElement>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [updatedRegion, setUpdatedRegion] = useState<any>(null);
  const [recordedUrl, setRecordedUrl] = useState<undefined | string>();
  const {
    isOpen: isInvalidFileModalOpen,
    onOpen: onInvalidFileModalOpen,
    onClose: onInvalidFileModalClose,
  } = useDisclosure();
  const { t } = useTranslator();
  const { cropAudio } = useAudioCropper(recordingsRef);
  const { onUploadSingleFile } = useSingleFileUploader();
  const profile = useProfileStore((state) => state.profile);
  const { onUploadMultiFile } = useMultiFileUploader();
  const [editableVoiceId] = useState(getUuid());
  const { addWaveSurfer, removeWaveSurfer, play, stop, playingWsId } =
    useWaveSurferStore();
  const isPlaying = playingWsId === editableVoiceId;

  useEffect(() => {
    if (editableVoiceUrl && recordingsRef.current) {
      if (playingWsId === editableVoiceId) {
        stop(editableVoiceId);
      }

      setIsUploaded(false);

      waveSurferRef.current?.destroy();
      const wavesurfer = WaveSurfer.create({
        container: recordingsRef.current,
        waveColor: 'black',
        progressColor: 'black',
        cursorColor: 'red',
        height: 150,
        url: editableVoiceUrl,
      });

      waveSurferRef.current = wavesurfer;

      setRecordedUrl(editableVoiceUrl);

      createRegion(wavesurfer, setUpdatedRegion);

      wavesurfer.on('ready', () => {
        setIsUploaded(true);
      });

      wavesurfer.on('finish', () => {
        stop(editableVoiceId);
      });

      addWaveSurfer(classifierId, editableVoiceId, wavesurfer);
    }
    return () => {
      if (waveSurferRef.current) {
        removeWaveSurfer(editableVoiceId);
        waveSurferRef.current.destroy();
      }
    };
  }, [editableVoiceUrl]);

  const uploadFiles = async (files: Array<File>) => {
    try {
      if (files.length === 0 || !profile?.userId) return;
      setIsLoading(true);

      await onUploadMultiFile({
        files,
        userId: profile.userId,
        onCompleted: ({ fileUrl }) => {
          addVoiceUrls([fileUrl]);
        },
        onError: (err) => {
          console.error(err);
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    try {
      await onUploadSingleFile({
        file: file,
        userId: profile?.userId || '',
        onCompleted: (result) => {
          setIsLoading(false);
          addVoiceUrls([result.fileUrl]);
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const convertUrlToFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], filename, { type: blob.type });
      return file;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleUpload = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCrop = async () => {
    setIsCropping(true);
    const croppedUrl = await cropAudio(updatedRegion, recordedUrl);
    if (croppedUrl) {
      const file = await convertUrlToFile(croppedUrl, 'croppedAudio.mp3');
      if (file) {
        uploadFile(file);
      }
    }
    setIsCropping(false);
  };

  const handlePlayClick = () => {
    if (waveSurferRef.current) {
      if (playingWsId === editableVoiceId) {
        stop(editableVoiceId);
      } else {
        // Region이 있으면 해당 범위 내에서만 재생
        if (updatedRegion) {
          const ws = waveSurferRef.current;

          // 시작 지점으로 이동 후 재생
          ws.setTime(updatedRegion.start);
          ws.play();

          // timeupdate 이벤트로 끝 지점 체크
          const handleTimeUpdate = (currentTime: number) => {
            if (currentTime >= updatedRegion.end) {
              ws.pause();
              ws.setTime(updatedRegion.start);
              ws.un('timeupdate', handleTimeUpdate);
              stop(editableVoiceId); // 재생 상태 업데이트
            }
          };

          ws.on('timeupdate', handleTimeUpdate);
        } else {
          waveSurferRef.current.play();
        }

        // playingWsId 상태만 업데이트
        play(classifierId, editableVoiceId);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;

      if (!files) return;

      const newSelectedFiles: File[] = Array.from(files);
      const invalidFile = newSelectedFiles.find((file) => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        return !['wav', 'mp3'].includes(fileExtension || '');
      });

      if (invalidFile) {
        onInvalidFileModalOpen();
        event.target.value = '';
        return;
      }

      validateFileSize(files, MAX_FILE_SIZE);
      uploadFiles(newSelectedFiles.slice(0, MAX_FILE_COUNT));

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      onInvalidFileModalOpen();
    }
  };

  return (
    <>
      <label
        style={{
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
        className={`border relative rounded-20 overflow-hidden w-[150px] h-[150px] bg-white flex items-center justify-center ${
          isDatasetMaxCount
            ? 'bg-white text-brand border-brand'
            : 'bg-form-disable text-white border-form-disable'
        }`}
      >
        <div
          className="absolute justify-center w-full h-full group"
          ref={recordingsRef}
          id="recordings"
          style={{ zIndex: isUploaded ? 1 : -1 }}
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

        {!isUploaded && (
          <div className="flex items-center justify-center h-full">
            <p className="p6-m text-center whitespace-pre-wrap text-black">
              {t('VOICE_SIZE_GUIDE')}
            </p>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 z-10 bg-black/70 flex-center">
            <SpinnerLoader className="w-[90px] h-[90px]" />
          </div>
        )}
      </label>

      <input
        className="hidden"
        type="file"
        multiple
        disabled={!isDatasetMaxCount}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={ACCEPT_VOICE_FILES_AI_UPLOAD}
      />

      <div className="flex w-[150px] justify-center gap-1 mt-[8px]">
        <ButtonUI
          size="sm"
          isDisabled={isPlaying || !isDatasetMaxCount}
          onClick={handleUpload}
        >
          {t('UPLOAD')}
        </ButtonUI>
        <ButtonUI
          isDisabled={isPlaying || !recordedUrl || !isDatasetMaxCount}
          disabled={isCropping}
          size="sm"
          color="secondary"
          onClick={handleCrop}
        >
          {t('ADD')}
        </ButtonUI>
      </div>
      <InvalidFileModal
        isOpen={isInvalidFileModalOpen}
        onClose={onInvalidFileModalClose}
      />
    </>
  );
}

export default VoiceFileUploader;
