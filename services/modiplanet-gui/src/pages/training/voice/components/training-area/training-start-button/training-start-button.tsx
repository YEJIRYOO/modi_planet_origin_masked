import useTranslator from '@hooks/useTranslator';

interface ITrainingStartButton {
  onClick: () => void;
  isRunning: boolean;
  currentEpoch: number;
  isEnabledTraining: boolean;
  totalEpoch: number;
}

function TrainingStartButton({
  onClick,
  isRunning,
  currentEpoch,
  totalEpoch,
  isEnabledTraining,
}: ITrainingStartButton) {
  const { t } = useTranslator();
  const percentage = (currentEpoch / totalEpoch) * 100;
  return (
    <div className="relative h-[60px] overflow-hidden rounded-10">
      <div className="absolute inset-0 bg-form-disable" />
      <div
        style={{
          width: isRunning ? `${percentage}%` : 0,
        }}
        className="absolute bg-brand h-full inset-0 z-[10] rounded-10"
      />

      <button
        disabled={isRunning || !isEnabledTraining}
        onClick={onClick}
        className={`absolute z-[20] w-[full] h-[60px] flex-center text-white inset-0 ${
          isEnabledTraining
            ? isRunning
              ? 'bg-transparent'
              : 'bg-brand'
            : 'bg-transparent'
        }`}
      >
        <span className="p3-b">
          {isRunning ? `${currentEpoch}/${totalEpoch}` : `${t('TRAIN_MODEL')}`}
        </span>
      </button>
    </div>
  );
}

export default TrainingStartButton;
