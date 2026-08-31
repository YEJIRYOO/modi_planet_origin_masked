import React, { Fragment, useState } from 'react';
import { Upload } from '@src/lib/newAssets';
import useTranslator from '@hooks/useTranslator';
import ModiUploadModal from '../../ClassfierCard/ModiUploadInputs/ModiUploadModal';
import { useDisclosure } from '@nextui-org/react';
import ChartImage from '../../ClassfierCard/ModiViewer/ChartImage';
import useLearningModiModel from '../../../hooks/useLearingModiModel';
import { ModiRecordedData } from '@src/lib/types/modi-data';
import InvalidFileModal from '@components/ui/common/Modal/InvalidFileModal';

interface IImageCapture {
  onPredict: (data: ImageData) => void;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

function FileCapture({ onPredict }: IImageCapture) {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<ModiRecordedData | null>(null);
  const { t } = useTranslator();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isInvalidFileModalOpen,
    onOpen: onInvalidFileModalOpen,
    onClose: onInvalidFileModalClose,
  } = useDisclosure();
  const { generateChartImageData } = useLearningModiModel();

  const handleFileChange = async (data: ModiRecordedData) => {
    try {
      setIsLoading(true);
      setChartData(data);
      const imageData = await generateChartImageData(data, 'chart');
      setIsLoading(false);
      onPredict(imageData);
    } catch (err) {
      setIsLoading(false);
      onInvalidFileModalOpen();
      console.error('파일 처리 오류', err);
    }
  };

  return (
    <Fragment>
      <label
        style={{
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
        className={`overflow-hidden block w-[150px] h-[150px] relative border rounded-20 aspect-square bg-white flex-col items-center justify-center text-brand ${
          isLoading
            ? 'bg-form-bg'
            : 'border-brand cursor-pointer text-brand bg-white'
        }`}
        onClick={onOpen}
      >
        {chartData ? (
          <div className="relative w-full h-full flex items-center justify-center group">
            <ChartImage cardData={chartData} width={150} height={75} />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="mb-[8px] flex-center">
                <Upload className="w-[40px] h-[40px] [&_path]:stroke-brand" />
              </div>
              <div className="p6-m text-center whitespace-pre-wrap text-brand">
                {isLoading ? (
                  '처리중'
                ) : (
                  <>
                    <p className="p6-m text-center whitespace-pre-wrap">
                      {t('CAN_LOAD_MODI_DATA')}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-[13px]">
            <div className="mb-[8px] flex-center">
              <Upload className="w-[40px] h-[40px] [&_path]:stroke-brand" />
            </div>

            <div className="p6-m text-center whitespace-pre-wrap text-brand">
              {isLoading ? (
                '처리중'
              ) : (
                <>
                  <p className="p6-m text-center whitespace-pre-wrap">
                    {t('CAN_LOAD_MODI_DATA')}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </label>

      {isOpen && (
        <ModiUploadModal onClose={onClose} onFileChange={handleFileChange} />
      )}
      <InvalidFileModal
        isOpen={isInvalidFileModalOpen}
        onClose={onInvalidFileModalClose}
      />
    </Fragment>
  );
}

export default FileCapture;
