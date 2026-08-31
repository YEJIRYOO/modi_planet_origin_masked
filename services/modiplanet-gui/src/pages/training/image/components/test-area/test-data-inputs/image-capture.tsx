import React, { Fragment, useRef, useState } from 'react';
import { Upload } from '@src/lib/newAssets';
import useDrawCanvas from '@src/pages/training/image/hooks/useDrawCanvas';
import { ACCEPT_IMAGE_FILES_AI_UPLOAD } from '@src/lib/constants/etc';
import useTranslator from '@hooks/useTranslator';
import { validateFileSize } from '@src/lib/utils/utils';
import { useDisclosure } from '@nextui-org/react';
import InvalidFileModal from '@components/ui/common/Modal/InvalidFileModal';

interface IImageCapture {
  onPredict: (data: ImageData) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function ImageCapture({ onPredict }: IImageCapture) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { drawCanvasByImageFile } = useDrawCanvas();
  const { t } = useTranslator();
  const {
    isOpen: isInvalidFileModalOpen,
    onOpen: onInvalidFileModalOpen,
    onClose: onInvalidFileModalClose,
  } = useDisclosure();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      if (!event.target.files || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const file = event.target.files[0];

      if (!file) return;

      validateFileSize([file], MAX_FILE_SIZE);

      await drawCanvasByImageFile({
        file,
        canvas,
      });

      const context = canvas.getContext('2d');
      if (!context) return;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      onPredict(imageData);
      setIsFileUploaded(true);
      event.target.value = '';
    } catch (err) {
      onInvalidFileModalOpen();
      console.error('handle file error', err);
    }
  };

  return (
    <Fragment>
      <label
        style={{
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
        className={`overflow-hidden block w-[150px] h-[150px] relative border rounded-20 aspect-square flex-col items-center pt-[13px] text-brand ${
          isLoading
            ? 'bg-form-bg'
            : 'border-brand cursor-pointer text-brand bg-white'
        }`}
      >
        <input
          className="hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={ACCEPT_IMAGE_FILES_AI_UPLOAD} // 원하는 파일 형식 지정
        />
        <canvas
          className={`absolute inset-0 ${isFileUploaded ? 'bg-white' : ''}`}
          ref={canvasRef}
        />
        {isFileUploaded && (
          <div className="absolute inset-0 flex items-center justify-center group">
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
              <p className="mb-[8px] flex-center">
                <Upload className="w-[40px] h-[40px] [&_path]:stroke-brand" />
              </p>
              <p className="p5-sb text-center whitespace-pre-wrap text-brand">
                {t('IMAGE_SIZE_GUIDE')}
              </p>
            </div>
          </div>
        )}
        <p className="mb-[8px] flex-center">
          <Upload className="w-[40px] h-[40px] [&_path]:stroke-brand" />
        </p>
        <p className="p5-sb text-center whitespace-pre-wrap">
          {isLoading ? '처리중' : <>{t('IMAGE_SIZE_GUIDE')}</>}
        </p>
      </label>
      <InvalidFileModal
        isOpen={isInvalidFileModalOpen}
        onClose={onInvalidFileModalClose}
      />
    </Fragment>
  );
}

export default ImageCapture;
