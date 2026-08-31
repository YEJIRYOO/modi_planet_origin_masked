import React, { useRef, useState } from 'react';
import { Upload } from '@src/lib/newAssets';
import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import { ACCEPT_IMAGE_FILES_AI_UPLOAD } from '@src/lib/constants/etc';
import useTranslator from '@hooks/useTranslator';
import { validateFileSize } from '@src/lib/utils/utils';
import { useProfileStore } from '@src/store/zustand';
import { useMultiFileUploader } from '@hooks/upload/useMultiFileUploader';
import { useDisclosure } from '@nextui-org/react';
import InvalidFileModal from '@components/ui/common/Modal/InvalidFileModal';

interface IImageFileUploader {
  addImageUrls: (urls: Array<string>) => void;
  isDatasetMaxCount: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILE_COUNT = 10;

function ImageFileUploader({
  addImageUrls,
  isDatasetMaxCount,
}: IImageFileUploader) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isOpen: isInvalidFileModalOpen,
    onOpen: onInvalidFileModalOpen,
    onClose: onInvalidFileModalClose,
  } = useDisclosure();
  const { t } = useTranslator();
  const profile = useProfileStore((state) => state.profile);
  const { onUploadMultiFile } = useMultiFileUploader();

  const uploadFiles = async (files: Array<File>) => {
    try {
      if (files.length === 0 || !profile?.userId) return;
      setIsLoading(true);
      const fileArray: File[] = Array.from(files);

      await onUploadMultiFile({
        files: fileArray,
        userId: profile.userId,
        onCompleted: ({ fileUrl, fileName }) => {
          addImageUrls([fileUrl]);
        },
        onError: (err) => {
          console.error(err);
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;

      if (!files) return;

      const newSelectedFiles: File[] = Array.from(files);
      const invalidFile = newSelectedFiles.find((file) => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        return !['jpg', 'jpeg', 'png', 'bmp'].includes(fileExtension || '');
      });

      if (invalidFile) {
        onInvalidFileModalOpen();
        event.target.value = '';
        return;
      }

      const oversizedFile = newSelectedFiles.find(
        (file) => file.size > MAX_FILE_SIZE,
      );

      if (oversizedFile) {
        onInvalidFileModalOpen();
        event.target.value = '';
        return;
      }

      uploadFiles(newSelectedFiles.slice(0, MAX_FILE_COUNT));
    } catch (err) {
      onInvalidFileModalOpen();
      event.target.value = '';
    }
  };

  return (
    <>
      <label
        style={{
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
        className={`border relative rounded-20 overflow-hidden w-[150px] h-[150px] flex flex-col items-center pt-[13px] ${
          isDatasetMaxCount
            ? 'bg-white text-brand border-brand'
            : 'bg-form-disable text-white border-form-disable'
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

        <p className="p5-sb text-center whitespace-pre-wrap">
          {t('IMAGE_SIZE_GUIDE')}
        </p>

        <input
          className="hidden"
          type="file"
          multiple
          disabled={!isDatasetMaxCount}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={ACCEPT_IMAGE_FILES_AI_UPLOAD} // 원하는 파일 형식 지정
        />

        {isLoading && (
          <div className="absolute inset-0 z-10 bg-black/70 flex-center">
            <SpinnerLoader className="w-[90px] h-[90px]" />
          </div>
        )}
      </label>
      <InvalidFileModal
        isOpen={isInvalidFileModalOpen}
        onClose={onInvalidFileModalClose}
      />
    </>
  );
}

export default ImageFileUploader;
