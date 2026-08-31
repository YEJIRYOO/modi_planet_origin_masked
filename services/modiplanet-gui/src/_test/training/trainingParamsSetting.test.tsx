import { fireEvent, render, screen } from '@testing-library/react';

import ImageTrainingParamsSetting from '@src/pages/training/image/components/training-area/training-options/training-params-setting';
import ModiTrainingParamsSetting from '@src/pages/training/modi/components/TrainingArea/TrainingOptions/training-params-setting';
import VoiceTrainingParamsSetting from '@src/pages/training/voice/components/training-area/training-options/training-params-setting';

const paramsSettings = [
  ['이미지', ImageTrainingParamsSetting],
  ['모디', ModiTrainingParamsSetting],
  ['음성', VoiceTrainingParamsSetting],
] as const;

const modelParams = {
  epoch: 50,
  batchSize: 16,
  learningRate: 0.1234,
  validationDataRate: 0.15,
};

describe('[트레이닝] 학습 파라미터 설정', () => {
  test.each(paramsSettings)(
    '%s 파라미터 설정은 기본 항목과 값을 표시한다.',
    (_, TrainingParamsSetting) => {
      render(
        <TrainingParamsSetting
          modelParams={modelParams}
          onChangeParams={vi.fn()}
          isRunning={false}
        />,
      );

      expect(screen.getByText('EPOCH')).toBeVisible();
      expect(screen.getByText('BATCH_SIZE')).toBeVisible();
      expect(screen.getByText('LEARNING_RATE')).toBeVisible();
      expect(screen.getByText('VALIDATION_RATE')).toBeVisible();
      expect(screen.getAllByAltText('help')).toHaveLength(4);
      expect(screen.getByDisplayValue('50')).toBeVisible();
      expect(screen.getByDisplayValue('16')).toBeVisible();
      expect(screen.getByDisplayValue('0.1234')).toBeVisible();
      expect(screen.getByDisplayValue('0.15')).toBeVisible();
    },
  );

  test.each(paramsSettings)(
    '%s 파라미터 설정은 값 변경과 비율 값 blur 보정을 전달한다.',
    (_, TrainingParamsSetting) => {
      const onChangeParams = vi.fn();

      render(
        <TrainingParamsSetting
          modelParams={modelParams}
          onChangeParams={onChangeParams}
          isRunning={false}
        />,
      );

      fireEvent.change(screen.getByDisplayValue('50'), {
        target: { value: '80' },
      });
      fireEvent.blur(screen.getByDisplayValue('0.1234'), {
        target: { value: '0.1234' },
      });

      expect(onChangeParams).toHaveBeenCalledWith('epoch', 80);
      expect(onChangeParams).toHaveBeenCalledWith('learningRate', 0.123);
    },
  );

  test.each(paramsSettings)(
    '%s 파라미터 설정은 실행 중일 때 입력을 비활성화한다.',
    (_, TrainingParamsSetting) => {
      render(
        <TrainingParamsSetting
          modelParams={modelParams}
          onChangeParams={vi.fn()}
          isRunning
        />,
      );

      screen.getAllByRole('textbox').forEach((input) => {
        expect(input).toBeDisabled();
      });
    },
  );
});
