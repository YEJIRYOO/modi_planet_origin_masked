import { TUploadWay } from '@src/pages/training/image/components/classfier-card';
import ImageFileUploader from '@src/pages/training/image/components/classfier-card/image-upload-inputs/image-file-uploader';
import CameraCaptureUploader from '@src/pages/training/image/components/classfier-card/image-upload-inputs/camera-capture-uploader';

interface IImageUploadInputs {
  uploadWay: null | TUploadWay;
  addImageUrls: (urls: Array<string>) => void;
  isDatasetMaxCount: boolean;
}

function ImageUploadInputs({
  uploadWay,
  addImageUrls,
  isDatasetMaxCount,
}: IImageUploadInputs) {
  if (!uploadWay) return null;

  if (uploadWay === 'camera')
    return (
      <CameraCaptureUploader
        addImageUrls={addImageUrls}
        isDatasetMaxCount={isDatasetMaxCount}
      />
    );

  if (uploadWay === 'file')
    return (
      <ImageFileUploader
        addImageUrls={addImageUrls}
        isDatasetMaxCount={isDatasetMaxCount}
      />
    );

  return null;
}

export default ImageUploadInputs;
