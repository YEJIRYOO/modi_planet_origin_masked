import React, { Fragment, useEffect, useState } from 'react';
import useLearningModiModel from '../../../hooks/useLearingModiModel';
import ChartImage from '../../ClassfierCard/ModiViewer/ChartImage';
import useTranslator from '@hooks/useTranslator';
import { useModiDataHandler } from '@src/store/zustand/ai/ModiDataHandler';
import { shallow } from 'zustand/shallow';
import { ModiRecordedData } from '@src/lib/types/modi-data';
import { useDisclosure } from '@nextui-org/react';
import InvalidFileModal from '@components/ui/common/Modal/InvalidFileModal';

interface ModiDataCapture {
  onPredict: (data: ImageData) => void;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

function ModiDataCapture({ onPredict }: ModiDataCapture) {
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<ModiRecordedData | null>(null);
  const {
    isOpen: isInvalidFileModalOpen,
    onOpen: onInvalidFileModalOpen,
    onClose: onInvalidFileModalClose,
  } = useDisclosure();
  const { generateChartImageData } = useLearningModiModel();
  const { t } = useTranslator();
  const { id, data, removeData } = useModiDataHandler((state) => {
    return {
      id: state.id,
      data: state.data,
      removeData: state.removeData,
    };
  }, shallow);

  useEffect(() => {
    if (data && id === 'test') {
      handleDataChange(data);
    }
  }, [data]);

  const handleDataChange = async (newData: any) => {
    setChartData(newData);
    try {
      setIsLoading(true);
      const imageData = await generateChartImageData(newData, 'chart');
      onPredict(imageData);
      removeData();
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      onInvalidFileModalOpen();
    }
  };

  return (
    <Fragment>
      <label
        style={{
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
        className={`overflow-hidden block w-[150px] h-[150px] relative border rounded-20 aspect-square bg-white flex flex-col items-center justify-center pt-[13px] text-brand ${
          isLoading
            ? 'bg-form-bg'
            : 'border-brand cursor-pointer text-brand bg-white'
        }`}
      >
        {chartData ? (
          <div className="w-full h-full flex-center">
            <ChartImage cardData={chartData} width={150} height={75} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="p6-m text-center whitespace-pre-wrap">
              {isLoading ? (
                '처리중'
              ) : (
                <>
                  <p className="p6-m text-center whitespace-pre-wrap">
                    {t('RECORD_AND_CHECK_RESULT')}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </label>
      <InvalidFileModal
        isOpen={isInvalidFileModalOpen}
        onClose={onInvalidFileModalClose}
      />
    </Fragment>
  );
}

export default ModiDataCapture;
