import TrainingParamsSetting from '@src/pages/training/modi/components/TrainingArea/TrainingOptions/training-params-setting';
import TrainingLogGraph from '@src/pages/training/modi/components/TrainingArea/TrainingOptions/training-log-graph';
import { useState } from 'react';
import {
  TMyModelParams,
  useMyModelModiClassifier,
} from '@src/store/zustand/ai/my-model-modi-classifier';
import useTranslator from '@hooks/useTranslator';

interface ITrainingOptionsContainer {
  isOptionView: boolean;

  isRunning: boolean;
}
export type TTrainOption = 'setting' | 'graph';

function TrainingOptionsContainer({
  isOptionView,
  isRunning,
}: ITrainingOptionsContainer) {
  const [trainOption, setTrainOption] = useState<TTrainOption>('setting');
  const { modelParams, updateModelParams } = useMyModelModiClassifier(
    (state) => ({
      modelParams: state.modelParams,
      updateModelParams: state.updateModelParams,
    }),
  );
  const { t } = useTranslator();

  const onChangeParams = (
    key: keyof TMyModelParams,
    value: number | undefined,
  ) => {
    updateModelParams(key, value);
  };

  const onClickOption = (option: TTrainOption) => {
    return () => setTrainOption(option);
  };

  return (
    <div
      className={`${
        isOptionView
          ? 'max-h-[500px] mt-[20px] mb-[30px]'
          : 'max-h-[0px] overflow-hidden'
      } h-auto`}
    >
      <div className="flex items-center gap-[8px] mb-[20px]">
        <button
          className={`${trainOption === 'setting' ? 'p4-b text-brand' : ''} `}
          onClick={onClickOption('setting')}
        >
          {t('TRAINING_CONDITIONS')}
        </button>
        <span className="text-form-gray">|</span>
        <button
          className={`${trainOption === 'graph' ? 'p4-b text-brand' : ''} `}
          onClick={onClickOption('graph')}
        >
          {t('TRAINING_CHART')}
        </button>
      </div>

      <div>
        {trainOption === 'setting' && (
          <TrainingParamsSetting
            modelParams={modelParams}
            isRunning={isRunning}
            onChangeParams={onChangeParams}
          />
        )}

        {trainOption === 'graph' && <TrainingLogGraph />}
      </div>
    </div>
  );
}

export default TrainingOptionsContainer;
