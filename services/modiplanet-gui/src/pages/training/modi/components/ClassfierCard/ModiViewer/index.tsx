import React, { Fragment } from 'react';
import ThumbnailImage from '@src/pages/training/modi/components/ClassfierCard/ModiViewer/ThumbnailIImage';
import { ModiRecordedData } from '@src/lib/types/modi-data';

interface ModiViewer {
  isGridView: boolean;
  dataset: Array<ModiRecordedData>;
  deleteImageUrl: (itemIndex: number) => void;
}

function ModiViewer({ isGridView, dataset, deleteImageUrl }: ModiViewer) {
  const handleDeleteImageUrl = (itemIndex: number) => () =>
    deleteImageUrl(itemIndex);

  return (
    <Fragment>
      <div
        className={`overflow-auto custom-grey-scroll ${
          isGridView
            ? 'grid grid-cols-2 gap-y-[23px] gap-x-[16px] auto-rows-min pt-[10px] pr-[20px] mr-[-25px] h-[calc(100%+50px)] relative top-[-50px]'
            : 'flex gap-[16px] flex-nowrap pb-[15px] -mb-[15px] overflow-y-hidden'
        }`}
      >
        {dataset.map((data, index) => (
          <ThumbnailImage
            key={index}
            isGridView={isGridView}
            data={data}
            deleteImageUrl={handleDeleteImageUrl(index)}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default ModiViewer;
