import { fireEvent, render, screen } from '@testing-library/react';

import ImageModelNameInput from '@src/pages/training/image/components/ModelName/ModelNameInput';
import ModiModelNameInput from '@src/pages/training/modi/components/ModelName/ModelNameInput';
import VoiceModelNameInput from '@src/pages/training/voice/components/ModelName/ModelNameInput';
import { MAX_LENGTH_MODEL_NAME } from '@src/lib/constants/etc';

const modelNameInputs = [
  ['이미지', ImageModelNameInput],
  ['모디', ModiModelNameInput],
  ['음성', VoiceModelNameInput],
] as const;

describe('[트레이닝] 모델명 입력', () => {
  test.each(modelNameInputs)(
    '%s 모델명 입력은 현재 이름과 최대 길이를 표시하고 변경 값을 전달한다.',
    (_, ModelNameInput) => {
      const onChange = vi.fn();

      render(<ModelNameInput name="기존 모델" onChange={onChange} />);

      const input = screen.getByDisplayValue('기존 모델');
      fireEvent.change(input, { target: { value: '새 모델' } });

      expect(input).toHaveAttribute('maxLength', `${MAX_LENGTH_MODEL_NAME}`);
      expect(onChange).toHaveBeenCalledWith('새 모델');
    },
  );
});
