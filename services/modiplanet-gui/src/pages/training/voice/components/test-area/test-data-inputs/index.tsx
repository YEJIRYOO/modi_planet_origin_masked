import { Fragment, useState } from 'react';
import { UploadWay } from '@src/pages/training/voice/components/classfier-card';
import MicVoice from '@src/pages/training/voice/components/test-area/test-data-inputs/mic-voice';
import UploadVoice from '@src/pages/training/voice/components/test-area/test-data-inputs/upload-voice';

interface TestDataInputs {
  uploadWay: UploadWay;
  onPredict: (data: ImageData) => void;
  time: string;
}

function TestDataInputs({ uploadWay, onPredict, time }: TestDataInputs) {
  if (uploadWay === 'mic')
    return <MicVoice time={time} onPredict={onPredict} />;

  if (uploadWay === 'file') return <UploadVoice onPredict={onPredict} />;

  return <Fragment />;
}

export default TestDataInputs;
