import useTranslator from '@hooks/useTranslator';

interface ITrainingGuide {
  isEnabledTraining: boolean;
  isRunning: boolean;
  isCompleted: boolean;
}

function TrainingGuide({
  isEnabledTraining,
  isRunning,
  isCompleted,
}: ITrainingGuide) {
  const { t } = useTranslator();

  if (isRunning) {
    return <span>{t('TRAINING_IN_PROGRESS')}</span>;
  }

  if (isEnabledTraining && isCompleted) {
    return <span>{t('TRAINING_COMPLETE')}</span>;
  }

  if (isEnabledTraining) {
    return <span>{t('READY_TO_TRAIN')}</span>;
  } else {
    return <span>{t('ENTER_DATA_FIRST')}</span>;
  }
}

export default TrainingGuide;
