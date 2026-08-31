import { fireEvent, render, screen } from '@testing-library/react';

import ImageClassifierLabel from '@src/pages/training/image/components/classfier-card/classifier-label';
import ModiClassifierLabel from '@src/pages/training/modi/components/ClassfierCard/ClassifierLabel';
import VoiceClassifierLabel from '@src/pages/training/voice/components/classfier-card/classifier-label';

const classifierLabels = [
  ['이미지', ImageClassifierLabel],
  ['모디', ModiClassifierLabel],
  ['음성', VoiceClassifierLabel],
] as const;

describe('[트레이닝] 분류 라벨 입력', () => {
  test.each(classifierLabels)(
    '%s 분류 라벨은 비어 있으면 기본 라벨을 설정한다.',
    (_, ClassifierLabel) => {
      const updateLabel = vi.fn();

      render(<ClassifierLabel index={1} label="" updateLabel={updateLabel} />);

      expect(updateLabel).toHaveBeenCalledWith('DEFAULT_CLASS_LABEL2');
    },
  );

  test.each(classifierLabels)(
    '%s 분류 라벨은 입력 변경 값을 전달한다.',
    (_, ClassifierLabel) => {
      const updateLabel = vi.fn();

      render(
        <ClassifierLabel
          index={0}
          label="DEFAULT_CLASS_LABEL1"
          updateLabel={updateLabel}
        />,
      );

      fireEvent.change(screen.getByDisplayValue('DEFAULT_CLASS_LABEL1'), {
        target: { value: '커스텀 라벨' },
      });

      expect(screen.getByDisplayValue('DEFAULT_CLASS_LABEL1')).toHaveAttribute(
        'maxLength',
        '20',
      );
      expect(updateLabel).toHaveBeenCalledWith('커스텀 라벨');
    },
  );
});
