import { UploadWay } from '@src/pages/training/voice/components/classfier-card';
import VoiceFileUploader from '@src/pages/training/voice/components/classfier-card/voice-upload-inputs/voice-file-uploader';
import MicUploader from '@src/pages/training/voice/components/classfier-card/voice-upload-inputs/mic-uploader';

interface VoiceUploadInputs {
  uploadWay: null | UploadWay;
  addVoiceUrls: (urls: Array<string>) => void;
  isDatasetMaxCount: boolean;
  time: string;
  setIsTimeDisabled: (value: boolean) => void;
  editableVoiceUrl: string;
  classifierId: string;
}

function VoiceUploadInputs({
  time,
  uploadWay,
  addVoiceUrls,
  isDatasetMaxCount,
  setIsTimeDisabled,
  editableVoiceUrl,
  classifierId,
}: VoiceUploadInputs) {
  if (!uploadWay) return null;

  if (uploadWay === 'mic')
    return (
      <MicUploader
        addVoiceUrls={addVoiceUrls}
        isDatasetMaxCount={isDatasetMaxCount}
        time={time}
        setIsTimeDisabled={setIsTimeDisabled}
        classifierId={classifierId}
      />
    );

  if (uploadWay === 'file')
    return (
      <VoiceFileUploader
        addVoiceUrls={addVoiceUrls}
        isDatasetMaxCount={isDatasetMaxCount}
        editableVoiceUrl={editableVoiceUrl}
        classifierId={classifierId}
      />
    );

  return null;
}

export default VoiceUploadInputs;
