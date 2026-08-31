import React, { useRef } from 'react';
import { Upload } from '@src/lib/newAssets';
import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import useTranslator from '@hooks/useTranslator';
import { useFileUploader } from '../../../hooks/useFileUploader';
import { ModiRecordedData } from '@src/lib/types/modi-data';
import { useDisclosure } from '@nextui-org/react';
import InvalidFileModal from '@components/ui/common/Modal/InvalidFileModal';

interface ModiDataUploader {
  addModiData: (data: ModiRecordedData[]) => void;
  isDatasetMaxCount: boolean;
  onOpen: () => void;
}

function ModiDataUploader({
  addModiData,
  isDatasetMaxCount,
  onOpen,
}: ModiDataUploader) {
  const { t } = useTranslator();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isOpen: isInvalidFileModalOpen,
    onOpen: onInvalidFileModalOpen,
    onClose: onInvalidFileModalClose,
  } = useDisclosure();
  const { isLoading, handleFileChange } = useFileUploader({
    onInvalidFile: onInvalidFileModalOpen,
  });

  const handleClick = () => {
    if (isDatasetMaxCount) {
      onOpen();
    }
  };

  return (
    <>
      <div className="w-[50%] shrink mb-[30px]">
        <label
          onClick={handleClick}
          style={{
            pointerEvents: isLoading ? 'none' : 'auto',
          }}
          className={`border relative rounded-20 overflow-hidden w-[150px] h-[150px] flex flex-col items-center pt-[13px] ${
            isDatasetMaxCount
              ? 'bg-white text-brand border-brand'
              : 'bg-[#DDDDDD] text-white border-form-disable'
          }`}
        >
          <p className="mb-[8px]">
            <Upload
              className={`w-[40px] h-[40px] ${
                isDatasetMaxCount
                  ? '[&_path]:stroke-brand'
                  : '[&_path]:stroke-white'
              }`}
            />
          </p>

          <p className="p6-m text-center whitespace-pre-wrap">
            {t('CAN_LOAD_MODI_DATA')}
          </p>

          {isLoading && (
            <div className="absolute inset-0 z-10 bg-black/70 flex-center">
              <SpinnerLoader className="w-[90px] h-[90px]" />
            </div>
          )}
        </label>
      </div>
      <input
        className="hidden"
        type="file"
        multiple
        disabled={!isDatasetMaxCount}
        ref={fileInputRef}
        onChange={(event) => handleFileChange(event, addModiData)}
        accept=".modi"
      />
      <InvalidFileModal
        isOpen={isInvalidFileModalOpen}
        onClose={onInvalidFileModalClose}
      />
    </>
  );
}

export default ModiDataUploader;
