import { Camera, Mic, Upload } from '@src/lib/newAssets';
import { UploadWay } from '@src/pages/training/voice/components/classfier-card/index';

interface VoiceUploadButtons {
  uploadWay: null | UploadWay;
  onClickMic: () => void;
  onClickFile: () => void;
  isEnabledTest?: boolean;
}

function VoiceUploadButtons({
  uploadWay,
  onClickFile,
  onClickMic,
  isEnabledTest = true,
}: VoiceUploadButtons) {
  const handleClickMic = () => {
    onClickMic();
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
        onClick={handleClickMic}
        className={`overflow-hidden rounded-10 duration-200 ${
          uploadWay === 'mic' ? 'bg-brand [&_path]:fill-white' : 'bg-form-form'
        } ${!isEnabledTest && '[&_path]:fill-white'}`}
      >
        <Mic className="w-[40px] h-[40px]" />
      </button>
    </div>
  );
}

export default VoiceUploadButtons;
