import NumberInput from '@components/ui_old/input/number-input';
import { NumberFormatValues } from 'react-number-format';
import { Fragment } from 'react';
import { TMyModelParams } from '@src/store/zustand/ai/my-model-image-classifier';
import useTranslator from '@hooks/useTranslator';
import TooltipUI from '@components/ui/Tooltip/TooltipUI';
import {
  BatchSize,
  Epoch,
  LearningRate,
  ValidationDateRate,
} from '@src/lib/newAssets';
import { Divider } from '@nextui-org/react';

interface ITrainingParamsSetting {
  modelParams: TMyModelParams;
  onChangeParams: (
    key: keyof TMyModelParams,
    value: number | undefined,
  ) => void;
  isRunning: boolean;
}

function TrainingParamsSetting({
  onChangeParams,
  modelParams,
  isRunning,
}: ITrainingParamsSetting) {
  const { epoch, batchSize, learningRate, validationDataRate } = modelParams;
  const { t } = useTranslator();
  const handleChange = (key: keyof TMyModelParams) => {
    return (values: NumberFormatValues) => {
      const { floatValue } = values;

      onChangeParams(key, floatValue);
    };
  };

  const handleRateBlur = (
    key: keyof TMyModelParams,
    currentValue: number | undefined,
  ) => {
    return (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      // .만 입력된 경우 0으로 변환
      if (inputValue === '.') {
        onChangeParams(key, 0);
        return;
      }
      // 입력값이 5글자를 초과하는 경우 (예: 0.1234 -> 0.123)
      if (currentValue !== undefined && inputValue.length > 5) {
        // 소수점 포함 총 5글자로 제한 (0.xxx)
        const truncated = parseFloat(currentValue.toFixed(3));
        onChangeParams(key, truncated);
      }
    };
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-[20px]">
        <div className="flex items-center gap-[8px]">
          <TooltipUI
            placement="left"
            closeDelay={0}
            content={
              <div className="px-[25px] py-[29px] max-w-[300px]">
                <p className="p3-b mb-3 pl-[15px]">{t('TIP_EPOCH_TITLE')}</p>
                <Epoch />
                <Divider className="mt-[11px] mb-[13px]" />
                <p className="p5-r text-font-sub_1 whitespace-pre-line">
                  {t('TIP_EPOCH_DESC')}
                </p>
              </div>
            }
          >
            <img
              src="/assets/help.svg"
              alt="help"
              className="w-[18px] h-[18px] cursor-pointer"
            />
          </TooltipUI>
          <span className="p5-r text-font-sub">{t('EPOCH')}</span>
        </div>
        <NumberInput
          onValueChange={handleChange('epoch')}
          value={epoch}
          disabled={isRunning}
          isAllowed={({ floatValue, value }) => {
            if (value && value.startsWith('.')) return false;
            return floatValue === undefined || floatValue >= 0;
          }}
          className="input w-[80px] text-right ml-[8px]"
          maxLength={5}
        />
      </div>

      <div className="flex justify-between items-center mb-[20px]">
        <div className="flex items-center gap-[8px]">
          <TooltipUI
            placement="left"
            closeDelay={0}
            content={
              <div className="px-[25px] py-[29px] max-w-[300px]">
                <p className="p3-b mb-3 pl-[15px]">{t('TIP_BATCH_TITLE')}</p>
                <BatchSize />
                <Divider className="mt-[11px] mb-[13px]" />
                <p className="p5-r text-font-sub_1 whitespace-pre-line">
                  {t('TIP_BATCH_DESC')}
                </p>
              </div>
            }
          >
            <img
              src="/assets/help.svg"
              alt="help"
              className="w-[18px] h-[18px] cursor-pointer"
            />
          </TooltipUI>
          <span className="p5-r text-font-sub">{t('BATCH_SIZE')}</span>
        </div>
        <NumberInput
          onValueChange={handleChange('batchSize')}
          value={batchSize}
          disabled={isRunning}
          isAllowed={({ floatValue, value }) => {
            if (value && value.startsWith('.')) return false;
            return floatValue === undefined || floatValue >= 0;
          }}
          className="input w-[80px] text-right ml-[8px]"
          maxLength={5}
        />
      </div>

      <div className="flex justify-between items-center mb-[20px]">
        <div className="flex items-center gap-[8px]">
          <TooltipUI
            placement="left"
            closeDelay={0}
            content={
              <div className="px-[25px] py-[29px] max-w-[300px]">
                <p className="p3-b mb-3 pl-[15px]">
                  {t('TIP_LEARNING_RATE_TITLE')}
                </p>
                <LearningRate />
                <Divider className="mt-[11px] mb-[13px]" />
                <p className="p5-r text-font-sub_1 whitespace-pre-line">
                  {t('TIP_LEARNING_RATE_DESC')}
                </p>
              </div>
            }
          >
            <img
              src="/assets/help.svg"
              alt="help"
              className="w-[18px] h-[18px] cursor-pointer"
            />
          </TooltipUI>
          <span className="p5-r text-font-sub">{t('LEARNING_RATE')}</span>
        </div>
        <NumberInput
          onValueChange={handleChange('learningRate')}
          onBlur={handleRateBlur('learningRate', learningRate)}
          value={learningRate}
          maxLength={5}
          disabled={isRunning}
          isAllowed={({ floatValue }) =>
            floatValue === undefined || (floatValue <= 1 && floatValue >= 0)
          }
          className="input w-[80px] text-right ml-[8px]"
        />
      </div>

      <div className="flex justify-between items-center mb-[16px]">
        <div className="flex items-center gap-[8px]">
          <TooltipUI
            placement="left"
            closeDelay={0}
            content={
              <div className="px-[25px] py-[29px] max-w-[300px]">
                <p className="p3-b mb-3 pl-[15px]">
                  {t('TIP_VALIDATION_RATE_TITLE')}
                </p>
                <ValidationDateRate />

                <Divider className="mt-[11px] mb-[13px]" />
                <p className="p5-r text-font-sub_1 whitespace-pre-line">
                  {t('TIP_VALIDATION_RATE_DESC')}
                </p>
              </div>
            }
          >
            <img
              src="/assets/help.svg"
              alt="help"
              className="w-[18px] h-[18px] cursor-pointer"
            />
          </TooltipUI>
          <span className="p5-r text-font-sub">{t('VALIDATION_RATE')}</span>
        </div>
        <NumberInput
          onValueChange={handleChange('validationDataRate')}
          onBlur={handleRateBlur('validationDataRate', validationDataRate)}
          value={validationDataRate}
          maxLength={5}
          disabled={isRunning}
          isAllowed={({ floatValue }) =>
            floatValue === undefined || (floatValue <= 1 && floatValue >= 0)
          }
          className="input w-[80px] text-right ml-[8px]"
        />
      </div>
    </Fragment>
  );
}

export default TrainingParamsSetting;
