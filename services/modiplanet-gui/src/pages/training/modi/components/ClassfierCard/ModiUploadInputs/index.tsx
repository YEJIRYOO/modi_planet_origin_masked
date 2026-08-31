import { TUploadWay } from '@src/pages/training/modi/components/ClassfierCard';
import ModiDataUploader from './ModiDataUploader';
import ModiLiveUploader from './ModiLiveUploader';
import { ModiRecordedData } from '@src/lib/types/modi-data';

interface ModiUploadInputs {
  uploadWay: null | TUploadWay;
  addModiData: (data: ModiRecordedData[]) => void;
  isDatasetMaxCount: boolean;
  onOpen: () => void;
  uuid: string | null;
}

function ModiUploadInputs({
  uploadWay,
  addModiData,
  isDatasetMaxCount,
  onOpen,
  uuid,
}: ModiUploadInputs) {
  if (!uploadWay) return null;

  if (uploadWay === 'live')
    return (
      <ModiLiveUploader
        addModiData={addModiData}
        isDatasetMaxCount={isDatasetMaxCount}
        uuid={uuid}
      />
    );

  if (uploadWay === 'file')
    return (
      <ModiDataUploader
        addModiData={addModiData}
        isDatasetMaxCount={isDatasetMaxCount}
        onOpen={onOpen}
      />
    );

  return null;
}

export default ModiUploadInputs;
