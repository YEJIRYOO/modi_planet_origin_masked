import React, { Fragment } from 'react';
import { TUploadWay } from '@src/pages/training/image/components/classfier-card';
import CameraCapture from '@src/pages/training/image/components/test-area/test-data-inputs/camera-capture';
import ImageCapture from '@src/pages/training/image/components/test-area/test-data-inputs/image-capture';

interface ITestDataInputs {
  uploadWay: TUploadWay;
  onPredict: (data: ImageData) => void;
}

function TestDataInputs({ uploadWay, onPredict }: ITestDataInputs) {
  if (uploadWay === 'camera') return <CameraCapture onPredict={onPredict} />;

  if (uploadWay === 'file') return <ImageCapture onPredict={onPredict} />;

  return <Fragment />;
}

export default TestDataInputs;
