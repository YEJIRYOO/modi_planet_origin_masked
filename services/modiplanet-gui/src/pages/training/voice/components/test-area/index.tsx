import VoiceUploadButtons from '@src/pages/training/voice/components/classfier-card/voice-upload-buttons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UploadWay } from '@src/pages/training/voice/components/classfier-card';
import TestDataInputs from '@src/pages/training/voice/components/test-area/test-data-inputs';
import { useVoiceModel } from '@src/store/zustand';
import TestClassifierResult from '@src/pages/training/voice/components/test-area/test-classifier-result';
import useClickElementDetection from '@hooks/useClickElementDetection';
import useTranslator from '@hooks/useTranslator';

export const TEST_AREA_ARROW_ENDPOINT_ID = 'test-area-arrow-endpoint';

function TestArea() {
  const [uploadWay, setUploadWay] = useState<UploadWay | null>(null);
  const [predictResult, setPredictResult] = useState<Array<[string, number]>>(
    [],
  );

  const testCardRef = useRef<HTMLDivElement | null>(null);
  const { model } = useVoiceModel();
  const { isClicked } = useClickElementDetection(testCardRef);
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslator();
  const [time, setTime] = useState<string>('3');

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

  const onClickUploadWayButton = (state: UploadWay) => {
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

  const handleTimeBlur = () => {
    let value = parseFloat(time);

    if (isNaN(value)) {
      value = 3;
    } else if (value < 1) {
      value = 1;
    } else if (value > 3) {
      value = 3;
    }
    setTime(value % 1 === 0 ? value.toString() : value.toFixed(1));
  };

  // 실제 모델 여부 확인
  const isEnabledTest = useMemo(() => {
    return !!model;
  }, [model]);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }
    if (value === '.') {
      value = '1.';
    }
    setTime(value);
  };

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
          <VoiceUploadButtons
            uploadWay={uploadWay}
            isEnabledTest={isEnabledTest}
            onClickFile={onClickUploadWayButton('file')}
            onClickMic={onClickUploadWayButton('mic')}
          />
        </div>

        <div
          className={`flex gap-[18px] ${
            uploadWay !== null ? 'max-h-[215px]' : 'max-h-0'
          }
          `}
        >
          {uploadWay !== null && (
            <div className="w-[150px] shrink-0 -mt-[10px] mb-[30px]">
              {uploadWay === 'mic' && (
                <div className="flex items-center justify-center mb-2.5">
                  <div>{t('TIME')}</div>
                  <input
                    className="w-[42px] h-[34px] mx-2 border border-[#DDDDDD] text-center p5-m rounded"
                    value={time}
                    onChange={handleTimeChange}
                    onBlur={handleTimeBlur}
                  />
                  <div>{t('SECOND')}</div>
                </div>
              )}
              <TestDataInputs
                uploadWay={uploadWay}
                onPredict={onPredict}
                time={time}
              />
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
