import React, { Fragment, useEffect, useRef, useState } from 'react';
import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import useTranslator from '@hooks/useTranslator';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';
import { createRegion } from './createRegion';
import useAudioCropper from './useAudioCropper';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import { useSingleFileUploader } from '@hooks/upload/useSingleFileUploader';
import { useProfileStore } from '@src/store/zustand';
import { useInterval } from '../../../hooks/useInterval';
import { getUuid } from '@src/lib/utils/utils';
import { useWaveSurferStore } from '@src/store/zustand/ai/useWavesurferStore';

interface MicUploader {
  addVoiceUrls: (urls: Array<string>) => void;
  isDatasetMaxCount: boolean;
  time: string;
  setIsTimeDisabled: (value: boolean) => void;
  classifierId: string;
}

function MicUploader({
  time,
  addVoiceUrls,
  isDatasetMaxCount,
  setIsTimeDisabled,
  classifierId,
}: MicUploader) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<undefined | string>();
  const [hasMicAccessError, setHasMicAccessError] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const recordingsRef = useRef<HTMLDivElement>(null);
  const micRef = useRef<HTMLDivElement>(null);
  const { cropAudio } = useAudioCropper(recordingsRef);
  const wavesurferRef = useRef<any>(null);
  const recordRef = useRef<any>(null);
  const { t } = useTranslator();
  const { onUploadSingleFile } = useSingleFileUploader();
  const profile = useProfileStore((state) => state.profile);
  const [updatedRegion, setUpdatedRegion] = useState<any>(null);
  const [count, setCount] = useState<number | undefined>();
  const { startInterval, stopInterval } = useInterval(() => {
    const next = count! - 100;

    if (next <= 0) {
      setCount(undefined);
      stopInterval();
    } else {
      setCount(next);
    }
  }, 100);
  const [recordId] = useState(getUuid());
  const { addWaveSurfer, removeWaveSurfer, play, stop, playingWsId } =
    useWaveSurferStore();
  const isPlaying = playingWsId === recordId;

  useEffect(() => {
    createWaveSurfer();
    return () => {
      wavesurferRef.current?.destroy();
      removeWaveSurfer(recordId);
    };
  }, []);

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

  const handleRecordClick = async () => {
    if (!recordRef.current) return;

    if (recordRef.current.isRecording() || recordRef.current.isPaused()) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordRef.current.startRecording(stream);
      setIsRecording(true);
      setIsTimeDisabled(true);
      setHasMicAccessError(false);

      const recordingTime = parseFloat(time) * 1000;
      setCount(Number(time) * 1000);
      startInterval();
      setTimeout(() => {
        if (recordRef.current.isRecording()) {
          recordRef.current.stopRecording();
          setIsRecording(false);
          setIsTimeDisabled(false);
        }
      }, recordingTime);
    } catch (err) {
      console.error('마이크 접근 에러', err);
      setHasMicAccessError(true);
      window.confirm(
        `${t('CHANGE_MIC_PERMISSION')}\n\n${t('CHANGE_MIC_PERMISSION_DESC')}`,
      );
      setCount(undefined);
      stopInterval();
    }
  };

  const createWaveSurfer = () => {
    if (!micRef.current) return;

    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    wavesurferRef.current = WaveSurfer.create({
      container: micRef.current,
      waveColor: 'black',
      progressColor: 'black',
      cursorColor: 'red',
      height: 150,
    });

    recordRef.current = wavesurferRef.current.registerPlugin(
      RecordPlugin.create({
        scrollingWaveform: true,
        renderRecordedAudio: true,
        scrollingWaveformWindow: 3.5,
      }),
    );

    recordRef.current.on('record-end', (blob: Blob) => {
      if (!recordingsRef.current) return;

      recordingsRef.current.innerHTML = '';

      const recordedUrl = URL.createObjectURL(blob);
      setRecordedUrl(recordedUrl);
      const wavesurfer = WaveSurfer.create({
        container: recordingsRef.current,
        waveColor: 'black',
        progressColor: 'black',
        cursorColor: 'red',
        height: 150,
        url: recordedUrl,
      });

      wavesurfer.on('finish', () => {
        stop(recordId);
      });

      addWaveSurfer(classifierId, recordId, wavesurfer);

      createRegion(wavesurfer, setUpdatedRegion);
      wavesurferRef.current = wavesurfer;
    });
  };

  const handlePlayClick = () => {
    if (wavesurferRef.current) {
      if (playingWsId === recordId) {
        stop(recordId);
      } else {
        // Region이 있으면 해당 범위 내에서만 재생
        if (updatedRegion) {
          const ws = wavesurferRef.current;

          // 시작 지점으로 이동 후 재생
          ws.setTime(updatedRegion.start);
          ws.play();

          // timeupdate 이벤트로 끝 지점 체크
          const handleTimeUpdate = (currentTime: number) => {
            if (currentTime >= updatedRegion.end) {
              ws.pause();
              ws.setTime(updatedRegion.start);
              ws.un('timeupdate', handleTimeUpdate);
              stop(recordId); // 재생 상태 업데이트
            }
          };

          ws.on('timeupdate', handleTimeUpdate);
        } else {
          wavesurferRef.current.play();
        }

        // playingWsId 상태만 업데이트
        play(classifierId, recordId);
      }
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

  return (
    <Fragment>
      <div
        style={{
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
        className={`overflow-hidden block w-[150px] h-[150px] relative border rounded-20 aspect-square bg-white flex-col items-center text-brand ${
          isLoading
            ? 'bg-form-bg'
            : 'border-brand cursor-pointer text-brand bg-white'
        } group`}
      >
        {!recordedUrl && !isRecording && !hasMicAccessError && (
          <div
            className={`${
              recordedUrl && isRecording ? 'hidden' : ''
            } flex items-center justify-center h-full`}
            style={{ zIndex: recordedUrl && isRecording ? -1 : 1 }}
          >
            <p className="p6-m text-center whitespace-pre-wrap">
              {isRecording ? '' : t('RECORDING_SOUND')}
            </p>
          </div>
        )}
        {hasMicAccessError && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black opacity-70">
            <p className="p6-m text-center whitespace-pre-wrap text-white">
              {t('REQUIRE_MIC')}
            </p>
          </div>
        )}
        <div
          ref={micRef}
          id="mic"
          className="absolute justify-center w-full h-full bg-white"
          style={{ zIndex: isRecording ? 2 : 1 }}
        ></div>
        <div
          ref={recordingsRef}
          id="recordings"
          className="absolute justify-center w-full h-full bg-white"
          style={{ zIndex: isRecording ? 1 : 2 }}
        ></div>
        {recordedUrl && !isRecording && (
          <button
            onClick={handlePlayClick}
            className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100"
          >
            <img
              src={
                playingWsId === recordId
                  ? '/assets/audio-stop.svg'
                  : '/assets/audio-play.svg'
              }
              alt={isPlaying ? 'Stop' : 'Play'}
              className="h-6 object-cover"
            />
          </button>
        )}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-black/70 flex-center">
            <SpinnerLoader className="w-[90px] h-[90px]" />
          </div>
        )}
      </div>
      <div className="flex w-[150px] justify-center gap-1 mt-[8px]">
        <ButtonUI
          size="sm"
          onClick={handleRecordClick}
          disabled={isLoading || isRecording}
          isDisabled={!isDatasetMaxCount || isPlaying}
        >
          {count === undefined ? t('RECORD') : (count / 1000).toFixed(1)}
        </ButtonUI>
        <ButtonUI
          isDisabled={!recordedUrl || !isDatasetMaxCount || isPlaying}
          disabled={isCropping}
          size="sm"
          color="secondary"
          onClick={handleCrop}
        >
          {t('ADD')}
        </ButtonUI>
      </div>
    </Fragment>
  );
}

export default MicUploader;
