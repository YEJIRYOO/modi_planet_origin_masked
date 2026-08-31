import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { TRAINING_AREA_ARROW_ENDPOINT_ID } from '@src/pages/training/voice/components/training-area';
import ArrowLine from '@components/ui_old/arrow-line/arrow-line';
import { Close } from '@src/lib/newAssets';
import VoiceUploadButtons from '@src/pages/training/voice/components/classfier-card/voice-upload-buttons';
import VoiceUploadInputs from '@src/pages/training/voice/components/classfier-card/voice-upload-inputs';
import VoiceViewer from '@src/pages/training/voice/components/classfier-card/voice-viewer';
import { useXarrow } from 'react-xarrows';
import ClassifierLabel from '@src/pages/training/voice/components/classfier-card/classifier-label';
import useClickElementDetection from '@components/hooks/useClickElementDetection';
import useTranslator from '@hooks/useTranslator';
import { useWaveSurferStore } from '@src/store/zustand/ai/useWavesurferStore';

interface ClassifierCard {
  classifierId: string;
  index: number;
  onClickDelete: () => void;
  dataset: Array<string>;
  addVoiceUrls: (voiceUrls: Array<string>) => void;
  label: string;
  updateLabel: (label: string) => void;
  deleteVoiceUrl: (itemIndex: number) => void;
  updateEditVoiceUrl: (voiceUrl: string) => void;
  editableVoiceUrl: string;
}

export type UploadWay = 'file' | 'mic';

const DATASET_MAX_COUNT = 50;

function ClassifierCard({
  classifierId,
  index,
  onClickDelete,
  addVoiceUrls,
  dataset,
  label,
  updateLabel,
  deleteVoiceUrl,
  updateEditVoiceUrl,
  editableVoiceUrl,
}: ClassifierCard) {
  const startpointRef = useRef<HTMLDivElement | null>(null);
  const classifierCardRef = useRef<HTMLDivElement | null>(null);
  const updateXarrow = useXarrow();
  const { t } = useTranslator();
  const { isClicked } = useClickElementDetection(classifierCardRef);
  const [isFocused, setIsFocused] = useState(false);
  const [uploadWay, setUploadWay] = useState<UploadWay | null>(null);
  const [time, setTime] = useState<string>('3');
  const [isTimeDisabled, setIsTimeDisabled] = useState<boolean>(false);

  const onClickUploadWayButton = (state: UploadWay) => {
    return () => {
      setUploadWay(state);
    };
  };

  useEffect(() => {
    if (isClicked) {
    } else {
      setUploadWay(null);
      updateEditVoiceUrl('');
    }

    setIsFocused(isClicked);
    updateXarrow();
  }, [isClicked]);

  useEffect(() => {
    if (uploadWay !== 'file') {
      updateEditVoiceUrl('');
    }
  }, [uploadWay]);

  const handleAddVoiceUrls = (urls: Array<string>) => {
    addVoiceUrls(urls);
  };

  const isDatasetMaxCount = useMemo(() => {
    return dataset.length < DATASET_MAX_COUNT;
  }, [dataset]);

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

  return (
    <Fragment>
      <div
        className={`min-h-[260px] max-h-[600px] p-[30px_0_0_30px] border rounded-20 relative duration-200 ${
          isFocused ? 'border-brand bg-brand_4' : 'bg-white'
        }`}
        ref={classifierCardRef}
      >
        <div className="flex justify-end pr-[25px]">
          <button onClick={onClickDelete}>
            <Close />
          </button>
        </div>

        <div className="mb-[20px] flex justify-between items-center mr-[24px]">
          <ClassifierLabel
            index={index}
            label={label}
            updateLabel={updateLabel}
          />
          <span
            className={`${dataset.length === 0 && 'text-form-disable'} p3-r`}
          >
            {dataset.length}
          </span>
        </div>

        <p className="p3-r text-font-sub mb-[38px]">{t('ADD_NEW_DATA')}</p>

        <div className="mb-[16px] flex gap-[90px]">
          <VoiceUploadButtons
            uploadWay={uploadWay}
            onClickFile={onClickUploadWayButton('file')}
            onClickMic={onClickUploadWayButton('mic')}
          />
        </div>
        {isClicked && uploadWay === 'mic' && (
          <div className="flex items-center mb-2.5">
            <div className="flex items-center">
              <div>{t('TIME')}</div>
              <input
                className="w-[42px] h-[34px] mx-2 border border-[#DDDDDD] text-center p5-m rounded"
                value={time}
                onChange={handleTimeChange}
                onBlur={handleTimeBlur}
                disabled={isTimeDisabled}
              />
              <div>{t('SECOND')}</div>
            </div>
          </div>
        )}
        <div
          className={`flex gap-[20px] ${
            uploadWay === 'file' ? 'max-h-[250px]' : 'max-h-[250px]'
          } ${uploadWay !== null && 'pr-[30px]'}
          `}
        >
          {uploadWay !== null && (
            <div className="w-[50%] shrink mb-[30px]">
              <VoiceUploadInputs
                uploadWay={uploadWay}
                addVoiceUrls={handleAddVoiceUrls}
                isDatasetMaxCount={isDatasetMaxCount}
                time={time}
                setIsTimeDisabled={setIsTimeDisabled}
                editableVoiceUrl={editableVoiceUrl}
                classifierId={classifierId}
              />
            </div>
          )}

          <div
            className={`shrink -mt-[10px] ${
              uploadWay === null ? 'w-full mb-[30px]' : 'w-[50%]'
            }`}
          >
            <VoiceViewer
              classifierId={classifierId}
              isGridView={!!uploadWay}
              uploadWay={uploadWay}
              dataset={dataset}
              deleteVoiceUrl={deleteVoiceUrl}
              updateEditVoiceUrl={updateEditVoiceUrl}
              editableVoiceUrl={editableVoiceUrl}
            />
          </div>
        </div>

        <div className="absolute right-0 top-[75px] flex-center">
          <div className="arrow-startpoint" ref={startpointRef} />
        </div>
      </div>

      <ArrowLine start={startpointRef} end={TRAINING_AREA_ARROW_ENDPOINT_ID} />
    </Fragment>
  );
}

export default React.memo(ClassifierCard);
