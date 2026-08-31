import TrainingStartButton from '@src/pages/training/modi/components/TrainingArea/TrainingStartButton/TrainingStartButton';

interface ITrainingStartButtonContainer {
  onClick: () => void;
  isRunning: boolean;
  currentEpoch: number;
  totalEpoch: number;
  isEnabledTraining: boolean;
}

function TrainingStartButtonContainer({
  isRunning,
  currentEpoch,
  totalEpoch,
  onClick,
  isEnabledTraining,
}: ITrainingStartButtonContainer) {
  return (
    <TrainingStartButton
      currentEpoch={currentEpoch}
      totalEpoch={totalEpoch}
      isRunning={isRunning}
      onClick={onClick}
      isEnabledTraining={isEnabledTraining}
    />
  );
}

export default TrainingStartButtonContainer;
