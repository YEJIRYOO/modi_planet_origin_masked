import React, { Fragment, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';
import useDrawWaveform from '../../../hooks/useDrawWaveform';
import useTranslator from '@src/components/hooks/useTranslator';

interface MicVoiceProps {
  onPredict: (data: ImageData) => void;
  time: string;
}

function MicVoice({ onPredict, time }: MicVoiceProps) {
  const { getImageUrlFromWaveSurfer } = useDrawWaveform();
  const recordRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordPluginRef = useRef<any>(null);
  const [hasMicAccessError, setHasMicAccessError] = useState(false);
  const { t } = useTranslator();

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    const handleRecordEnd = async (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      try {
        const imageData = await getImageUrlFromWaveSurfer(url);
        onPredict(imageData);
      } catch (error) {
        console.error('Failed to extract image data:', error);
      }
    };

    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }

    if (recordRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: recordRef.current,
        waveColor: 'black',
        progressColor: 'black',
        cursorColor: 'transparent',
        height: 150,
      });

      recordPluginRef.current = RecordPlugin.create({
        scrollingWaveform: true,
        scrollingWaveformWindow: 3.5,
        renderRecordedAudio: true,
      });

      wavesurferRef.current.registerPlugin(recordPluginRef.current);

      recordPluginRef.current.on('record-end', handleRecordEnd);

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setHasMicAccessError(false);
          recordPluginRef.current.startRecording(stream);
          let count = 0;
          const intervalTime = parseInt(time, 10);

          timer = setInterval(() => {
            count++;
            if (count % intervalTime === 0) {
              recordPluginRef.current.stopRecording();

              const tmp = setTimeout(() => {
                recordPluginRef.current.startRecording(stream);
                clearTimeout(tmp);
              }, 200);
            }
          }, 1000);
        })
        .catch((error) => {
          console.error('마이크 접근 에러', error);
          setHasMicAccessError(true);
        });
    }
    return () => {
      recordPluginRef.current?.destroy();
      wavesurferRef.current?.destroy();
      clearInterval(timer);
    };
  }, [time]);

  return (
    <Fragment>
      <div className="aspect-square overflow-hidden rounded-20 mb-[16px] relative">
        {hasMicAccessError ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black opacity-70">
            <p className="p6-m text-center whitespace-pre-wrap text-white">
              {t('REQUIRE_MIC')}
            </p>
          </div>
        ) : (
          <div ref={recordRef} className="w-full h-full bg-white" />
        )}
      </div>
    </Fragment>
  );
}

export default MicVoice;
