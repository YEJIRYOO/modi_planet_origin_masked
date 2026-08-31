import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { TRAINING_AREA_ARROW_ENDPOINT_ID } from '@src/pages/training/modi/components/TrainingArea';
import ArrowLine from '@components/ui_old/arrow-line/arrow-line';
import { Close } from '@src/lib/newAssets';
import ModiUploadButtons from '@src/pages/training/modi/components/ClassfierCard/ModiUploadButtons';
import ModiViewer from '@src/pages/training/modi/components/ClassfierCard/ModiViewer';
import { useXarrow } from 'react-xarrows';
import ClassifierLabel from '@src/pages/training/modi/components/ClassfierCard/ClassifierLabel';
import useClickElementDetection from '@components/hooks/useClickElementDetection';
import useTranslator from '@hooks/useTranslator';
import { useDisclosure } from '@nextui-org/react';
import ModiUploadModal from './ModiUploadInputs/ModiUploadModal';
import ModiUploadInputs from './ModiUploadInputs';
import { useModiDataHandler } from '@src/store/zustand/ai/ModiDataHandler';

import { ModiRecordedData } from '@src/lib/types/modi-data';

interface ClassifierCard {
  uuid: string;
  index: number;
  onClickDelete: () => void;
  dataset: ModiRecordedData[];
  addModiData: (data: ModiRecordedData[]) => void;
  label: string;
  updateLabel: (label: string) => void;
  deleteModiUrl: (itemIndex: number) => void;
  isDimmed: boolean;
}

export type TUploadWay = 'file' | 'live';

const DATASET_MAX_COUNT = 50;

function ClassifierCard({
  uuid,
  index,
  onClickDelete,
  addModiData,
  dataset,
  label,
  updateLabel,
  deleteModiUrl,
  isDimmed,
}: ClassifierCard) {
  const startpointRef = useRef<HTMLDivElement | null>(null);
  const classifierCardRef = useRef<HTMLDivElement | null>(null);
  const updateXarrow = useXarrow();
  const { t } = useTranslator();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isClicked } = useClickElementDetection(
    classifierCardRef,
    isOpen || isDimmed,
  );
  const [isFocused, setIsFocused] = useState(false);
  const [uploadWay, setUploadWay] = useState<TUploadWay | null>(null);
  const { addId, removeId } = useModiDataHandler();

  const onClickUploadWayButton = (state: TUploadWay) => {
    return () => {
      setUploadWay(state);
    };
  };

  useEffect(() => {
    if (isClicked) {
    } else {
      setUploadWay(null);
    }

    setIsFocused(isClicked);
    updateXarrow();
  }, [isClicked]);

  useEffect(() => {
    if (isClicked && uploadWay === 'live') {
      addId(uuid);
    } else {
      removeId(uuid);
    }
  }, [isClicked, uploadWay]);

  const handleAddModiData = (data: ModiRecordedData[]) => {
    addModiData(data);
  };

  const isDatasetMaxCount = useMemo(() => {
    return dataset.length < DATASET_MAX_COUNT;
  }, [dataset]);

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

        <div className="mb-[16px]">
          <ModiUploadButtons
            uploadWay={uploadWay}
            onClickFile={onClickUploadWayButton('file')}
            onClickCamera={onClickUploadWayButton('live')}
          />
        </div>

        <div
          className={`flex gap-[20px] max-h-[250px] ${
            uploadWay !== null && 'pr-[30px]'
          }
          `}
        >
          <ModiUploadInputs
            uploadWay={uploadWay}
            onOpen={onOpen}
            addModiData={handleAddModiData}
            isDatasetMaxCount={isDatasetMaxCount}
            uuid={uuid}
          />

          <div
            className={`shrink -mt-[10px] ${
              uploadWay === null ? 'w-full mb-[30px]' : 'w-[50%]'
            }`}
          >
            <ModiViewer
              isGridView={!!uploadWay}
              dataset={dataset}
              deleteImageUrl={deleteModiUrl}
            />
          </div>
        </div>

        <div className="absolute right-0 top-[75px] flex-center">
          <div className="arrow-startpoint" ref={startpointRef} />
        </div>
      </div>

      {isOpen && (
        <ModiUploadModal
          onClose={onClose}
          addModiData={handleAddModiData}
          multiUpload={true}
        />
      )}
      <ArrowLine start={startpointRef} end={TRAINING_AREA_ARROW_ENDPOINT_ID} />
    </Fragment>
  );
}

export default React.memo(ClassifierCard);
