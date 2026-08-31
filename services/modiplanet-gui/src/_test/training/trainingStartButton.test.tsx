import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ImageTrainingStartButton from '@src/pages/training/image/components/training-area/training-start-button/training-start-button';
import ImageTrainingStartButtonContainer from '@src/pages/training/image/components/training-area/training-start-button/training-start-button-container';
import ModiTrainingStartButton from '@src/pages/training/modi/components/TrainingArea/TrainingStartButton/TrainingStartButton';
import ModiTrainingStartButtonContainer from '@src/pages/training/modi/components/TrainingArea/TrainingStartButton/TrainingStartButtonContainer';
import VoiceTrainingStartButton from '@src/pages/training/voice/components/training-area/training-start-button/training-start-button';
import VoiceTrainingStartButtonContainer from '@src/pages/training/voice/components/training-area/training-start-button/training-start-button-container';

const trainingStartButtonContainers = [
  ['이미지', ImageTrainingStartButtonContainer],
  ['모디', ModiTrainingStartButtonContainer],
  ['음성', VoiceTrainingStartButtonContainer],
] as const;

describe('[트레이닝] 학습 시작 버튼', () => {
  test('이미지 학습 버튼은 학습 가능 상태에서 클릭을 전달한다.', () => {
    const onClick = vi.fn();

    render(
      <ImageTrainingStartButton
        onClick={onClick}
        isRunning={false}
        currentEpoch={0}
        totalEpoch={10}
        isEnabledTraining
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'TRAIN_MODEL' }));

    expect(screen.getByRole('button', { name: 'TRAIN_MODEL' })).not.toBeDisabled();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('모디 학습 버튼은 실행 중일 때 진행 epoch와 진행률을 표시하고 클릭을 막는다.', () => {
    const onClick = vi.fn();
    const { container } = render(
      <ModiTrainingStartButton
        onClick={onClick}
        isRunning
        currentEpoch={3}
        totalEpoch={10}
        isEnabledTraining
      />,
    );

    userEvent.click(screen.getByRole('button', { name: '3/10' }));

    expect(screen.getByRole('button', { name: '3/10' })).toBeDisabled();
    expect(container.querySelector('[style]')).toHaveStyle({ width: '30%' });
    expect(onClick).not.toHaveBeenCalled();
  });

  test('음성 학습 버튼은 학습 조건을 만족하지 않으면 비활성화된다.', () => {
    const onClick = vi.fn();

    render(
      <VoiceTrainingStartButton
        onClick={onClick}
        isRunning={false}
        currentEpoch={0}
        totalEpoch={10}
        isEnabledTraining={false}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'TRAIN_MODEL' }));

    expect(screen.getByRole('button', { name: 'TRAIN_MODEL' })).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  test.each(trainingStartButtonContainers)(
    '%s 학습 시작 버튼 컨테이너는 버튼 props를 전달한다.',
    (_, TrainingStartButtonContainer) => {
      const onClick = vi.fn();

      render(
        <TrainingStartButtonContainer
          onClick={onClick}
          isRunning={false}
          currentEpoch={0}
          totalEpoch={5}
          isEnabledTraining
        />,
      );

      userEvent.click(screen.getByRole('button', { name: 'TRAIN_MODEL' }));

      expect(onClick).toHaveBeenCalledTimes(1);
    },
  );
});
