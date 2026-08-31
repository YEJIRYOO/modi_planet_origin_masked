import { render, screen } from '@testing-library/react';

import ImageClassifierResult from '@src/pages/training/image/components/test-area/test-classifier-result';
import ModiClassifierResult from '@src/pages/training/modi/components/TestArea/TestClassifierResult';
import VoiceClassifierResult from '@src/pages/training/voice/components/test-area/test-classifier-result';

const classifierResults = [
  ['이미지', ImageClassifierResult],
  ['모디', ModiClassifierResult],
  ['음성', VoiceClassifierResult],
] as const;

describe('[트레이닝] 테스트 분류 결과', () => {
  test.each(classifierResults)(
    '%s 분류 결과는 확률을 퍼센트로 반올림해 표시한다.',
    (_, ClassifierResult) => {
      const { container } = render(
        <ClassifierResult
          predictResult={[
            ['cat', 0.77777],
            ['dog', 0.12345],
          ]}
        />,
      );

      expect(screen.getByText('cat')).toBeVisible();
      expect(screen.getByText('77.78%')).toBeVisible();
      expect(screen.getByText('dog')).toBeVisible();
      expect(screen.getByText('12.35%')).toBeVisible();
      expect(container.querySelector('[style]')).toHaveStyle({
        width: '77.78%',
      });
    },
  );
});
