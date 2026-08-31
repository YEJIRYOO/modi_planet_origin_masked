import React, { useEffect, useRef } from 'react';
import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import useTranslator from '@hooks/useTranslator';
import { useFileUploader } from '../../../hooks/useFileUploader';
import { useModiDataHandler } from '@src/store/zustand/ai/ModiDataHandler';
import { shallow } from 'zustand/shallow';
import { ModiRecordedData } from '@src/lib/types/modi-data';
import { useDisclosure } from '@nextui-org/react';
import InvalidFileModal from '@components/ui/common/Modal/InvalidFileModal';

interface ModiLiveUploader {
  addModiData: (data: ModiRecordedData[]) => void;
  isDatasetMaxCount: boolean;
  uuid: string | null;
}

function ModiLiveUploader({
  addModiData,
  isDatasetMaxCount,
  uuid,
}: ModiLiveUploader) {
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
  const { id, data, removeData } = useModiDataHandler((state) => {
    return {
      id: state.id,
      data: state.data,
      removeData: state.removeData,
    };
  }, shallow);

  useEffect(() => {
    if (data && id === uuid) {
      addModiData([data]);
      removeData();
    }
  }, [data, id, uuid, addModiData, removeData]);

  return (
    <>
      <div className="w-[50%] shrink mb-[30px]">
        <label
          style={{
            pointerEvents: isLoading ? 'none' : 'auto',
          }}
          className={`border relative rounded-20 overflow-hidden w-[150px] h-[150px] flex flex-col items-center ${
            isDatasetMaxCount
              ? 'bg-white text-brand border-brand'
              : 'bg-[#DDDDDD] text-white border-form-disable'
          }`}
        >
          <div className="flex items-center justify-center h-full">
            <p className="p6-m text-center whitespace-pre-wrap">
              {t('RECORDING_MODI_GUIDE')}
            </p>
          </div>

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

export default ModiLiveUploader;
