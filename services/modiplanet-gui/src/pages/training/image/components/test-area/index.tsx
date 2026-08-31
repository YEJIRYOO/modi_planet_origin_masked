import ImageUploadButtons from '@src/pages/training/image/components/classfier-card/image-upload-buttons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TUploadWay } from '@src/pages/training/image/components/classfier-card';
import TestDataInputs from '@src/pages/training/image/components/test-area/test-data-inputs';
import { useLearningModel } from '@src/store/zustand';
import TestClassifierResult from '@src/pages/training/image/components/test-area/test-classifier-result';
import useClickElementDetection from '@hooks/useClickElementDetection';
import useTranslator from '@hooks/useTranslator';

export const TEST_AREA_ARROW_ENDPOINT_ID = 'test-area-arrow-endpoint';

function TestArea() {
  const [uploadWay, setUploadWay] = useState<TUploadWay | null>(null);
  const [predictResult, setPredictResult] = useState<Array<[string, number]>>(
    [],
  );

  const testCardRef = useRef<HTMLDivElement | null>(null);
  const { model } = useLearningModel();
  const { isClicked } = useClickElementDetection(testCardRef);
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslator();

  useEffect(() => {
    setIsFocused(isClicked);
  }, [isClicked]);

  useEffect(() => {
    setPredictResult([]);
  }, [uploadWay]);

  useEffect(() => {
    setUploadWay(null);
    setPredictResult([]);
  }, [model]);

  const onClickUploadWayButton = (state: TUploadWay) => {
    return () => {
      setUploadWay(state);
    };
  };

  const predictResultToArrayType = (data: Map<string, number>) => {
    return Array.from(data);
  };

  const onPredict = async (data: ImageData) => {
    if (!model) return;

    try {
      const result = await model?.infer(data);
      setPredictResult(predictResultToArrayType(result));
    } catch (err) {
      console.error('infer failed', err);
    }
  };

  const isEnabledTest = useMemo(() => {
    return !!model;
  }, [model]);

  return (
    <div className="w-[397px] shrink-0">
      <h2 className="p2-b mb-[20px]">{t('CHECK_RESULT')}</h2>

      <div
        ref={testCardRef}
        className={`min-h-[150px] px-[30px] pt-[46px] border rounded-20 relative duration-200 ${
          isFocused ? 'bg-brand_4 border-brand' : 'bg-white'
        }`}
      >
        <div className="absolute left-0 top-[75px] flex-center">
          <div id={TEST_AREA_ARROW_ENDPOINT_ID} />
        </div>
        <p className="mb-[20px] text-center">
          {isEnabledTest
            ? t('CHECK_RESULT_USING_MODEL')
            : t('TRAIN_MODEL_FIRST')}
        </p>

        <div className="flex-center mb-[30px]">
          <ImageUploadButtons
            uploadWay={uploadWay}
            isEnabledTest={isEnabledTest}
            onClickFile={onClickUploadWayButton('file')}
            onClickCamera={onClickUploadWayButton('camera')}
          />
        </div>

        <div
          className={`flex gap-[18px] ${
            uploadWay !== null ? 'max-h-[196px]' : 'max-h-0'
          }
          `}
        >
          {uploadWay !== null && (
            <div className="w-[150px] shrink-0 mb-[30px]">
              <TestDataInputs uploadWay={uploadWay} onPredict={onPredict} />
            </div>
          )}

          <div
            className={`shrink-0 -mt-[10px] overflow-y-auto pr-[12px] ${
              uploadWay === null ? 'w-full mb-[30px]' : 'w-[50%]'
            }`}
          >
            <TestClassifierResult predictResult={predictResult} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TestArea);
