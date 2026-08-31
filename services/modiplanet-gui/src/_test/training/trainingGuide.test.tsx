import { render, screen } from '@testing-library/react';

import ImageTrainingGuide from '@src/pages/training/image/components/training-area/training-guide';
import ModiTrainingGuide from '@src/pages/training/modi/components/TrainingArea/TrainingGuide';
import VoiceTrainingGuide from '@src/pages/training/voice/components/training-area/training-guide';

const trainingGuides = [
  ['이미지', ImageTrainingGuide],
  ['모디', ModiTrainingGuide],
  ['음성', VoiceTrainingGuide],
] as const;

const guideCases = [
  {
    props: {
      isEnabledTraining: true,
      isRunning: true,
      isCompleted: false,
    },
    text: 'TRAINING_IN_PROGRESS',
  },
  {
    props: {
      isEnabledTraining: true,
      isRunning: false,
      isCompleted: true,
    },
    text: 'TRAINING_COMPLETE',
  },
  {
    props: {
      isEnabledTraining: true,
      isRunning: false,
      isCompleted: false,
    },
    text: 'READY_TO_TRAIN',
  },
  {
    props: {
      isEnabledTraining: false,
      isRunning: false,
      isCompleted: false,
    },
    text: 'ENTER_DATA_FIRST',
  },
] as const;

describe('[트레이닝] 학습 안내 문구', () => {
  test.each(trainingGuides)('%s 학습 안내는 상태에 맞는 문구를 표시한다.', (_, TrainingGuide) => {
    guideCases.forEach(({ props, text }) => {
      const { unmount } = render(<TrainingGuide {...props} />);

      expect(screen.getByText(text)).toBeVisible();

      unmount();
    });
  });
});
