import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { TRAINING_AREA_ARROW_ENDPOINT_ID } from '@src/pages/training/image/components/training-area';
import ArrowLine from '@components/ui_old/arrow-line/arrow-line';
import { Close } from '@src/lib/newAssets';
import ImageUploadButtons from '@src/pages/training/image/components/classfier-card/image-upload-buttons';
import ImageUploadInputs from '@src/pages/training/image/components/classfier-card/image-upload-inputs';
import ImageViewer from '@src/pages/training/image/components/classfier-card/image-viewer';
import { useXarrow } from 'react-xarrows';
import ClassifierLabel from '@src/pages/training/image/components/classfier-card/classifier-label';
import useClickElementDetection from '@components/hooks/useClickElementDetection';
import useTranslator from '@hooks/useTranslator';

interface IClassifierCard {
  index: number;
  onClickDelete: () => void;
  dataset: Array<string>;
  addImageUrls: (imgUrls: Array<string>) => void;
  label: string;
  updateLabel: (label: string) => void;
  deleteImageUrl: (itemIndex: number) => void;
}

export type TUploadWay = 'file' | 'camera';

const DATASET_MAX_COUNT = 50;

function ClassifierCard({
  index,
  onClickDelete,
  addImageUrls,
  dataset,
  label,
  updateLabel,
  deleteImageUrl,
}: IClassifierCard) {
  const startpointRef = useRef<HTMLDivElement | null>(null);
  const classifierCardRef = useRef<HTMLDivElement | null>(null);
  const updateXarrow = useXarrow();
  const { t } = useTranslator();
  const { isClicked } = useClickElementDetection(classifierCardRef);
  const [isFocused, setIsFocused] = useState(false);
  const [uploadWay, setUploadWay] = useState<TUploadWay | null>(null);

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

  const handleAddImageUrls = (urls: Array<string>) => {
    addImageUrls(urls);
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
          <ImageUploadButtons
            uploadWay={uploadWay}
            onClickFile={onClickUploadWayButton('file')}
            onClickCamera={onClickUploadWayButton('camera')}
          />
        </div>

        <div
          className={`flex gap-[20px] ${
            uploadWay === 'file' ? 'max-h-[180px]' : 'max-h-[270px]'
          } ${uploadWay !== null && 'pr-[30px]'}
          `}
        >
          {uploadWay !== null && (
            <div className="w-[50%] shrink mb-[30px]">
              <ImageUploadInputs
                uploadWay={uploadWay}
                addImageUrls={handleAddImageUrls}
                isDatasetMaxCount={isDatasetMaxCount}
              />
            </div>
          )}

          <div
            className={`shrink -mt-[10px] ${
              uploadWay === null ? 'w-full mb-[30px]' : 'w-[50%]'
            }`}
          >
            <ImageViewer
              isGridView={!!uploadWay}
              dataset={dataset}
              deleteImageUrl={deleteImageUrl}
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
