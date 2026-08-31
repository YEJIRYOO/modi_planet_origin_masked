import React, { Fragment } from 'react';
import { TUploadWay } from '@src/pages/training/modi/components/ClassfierCard';
import ModiDataCapture from '@src/pages/training/modi/components/TestArea/TestDataInputs/ModiDataCapture';
import FileCapture from './FileCapture';

interface ITestDataInputs {
  uploadWay: TUploadWay;
  onPredict: (data: ImageData) => void;
}

function TestDataInputs({ uploadWay, onPredict }: ITestDataInputs) {
  if (uploadWay === 'live') return <ModiDataCapture onPredict={onPredict} />;

  if (uploadWay === 'file') return <FileCapture onPredict={onPredict} />;

  return <Fragment />;
}

export default TestDataInputs;
