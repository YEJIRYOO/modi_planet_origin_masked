import { Camera, Upload } from '@src/lib/newAssets';
import { TUploadWay } from '@src/pages/training/image/components/classfier-card/index';

interface IImageUploadButtons {
  uploadWay: null | TUploadWay;
  onClickCamera: () => void;
  onClickFile: () => void;
  isEnabledTest?: boolean;
}

function ImageUploadButtons({
  uploadWay,
  onClickFile,
  onClickCamera,
  isEnabledTest = true,
}: IImageUploadButtons) {
  const handleClickCamera = () => {
    onClickCamera();
  };

  const handleClickFile = () => {
    onClickFile();
  };

  return (
    <div className="flex gap-[8px]">
      <button
        disabled={!isEnabledTest}
        onClick={handleClickFile}
        className={`overflow-hidden rounded-10 duration-200 ${
          uploadWay === 'file'
            ? 'bg-brand [&_path]:stroke-white'
            : 'bg-form-form'
        } ${!isEnabledTest && '[&_path]:stroke-white'}`}
      >
        <Upload className="w-[40px] h-[40px]" />
      </button>

      <button
        disabled={!isEnabledTest}
        onClick={handleClickCamera}
        className={`overflow-hidden rounded-10 duration-200 ${
          uploadWay === 'camera'
            ? 'bg-brand [&_path]:fill-white'
            : 'bg-form-form'
        } ${!isEnabledTest && '[&_path]:fill-white'}`}
      >
        <Camera className="w-[40px] h-[40px]" />
      </button>
    </div>
  );
}

export default ImageUploadButtons;
