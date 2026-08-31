import React, { Fragment } from 'react';
import ThumbnailImage from '@src/pages/training/image/components/classfier-card/image-viewer/thumbnail-image';

interface IImageViewer {
  isGridView: boolean;
  dataset: Array<string>;
  deleteImageUrl: (itemIndex: number) => void;
}

function ImageViewer({ isGridView, dataset, deleteImageUrl }: IImageViewer) {
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
        {dataset.map((url, index) => (
          <ThumbnailImage
            key={url + index}
            isGridView={isGridView}
            url={url}
            deleteImageUrl={handleDeleteImageUrl(index)}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default ImageViewer;
