import { TModelSelectViewType } from '@src/pages/training/components/training-select-section/index';
import RadioGroup from '@components/ui_old/radio/radio-group';
import Radio from '@components/ui_old/radio/radio';
import React from 'react';
import useTranslator from '@hooks/useTranslator';

interface ITrainingSelectRadio {
  currentViewType: TModelSelectViewType;
  onClickRadio: (type: TModelSelectViewType) => void;
}

function TrainingSelectRadio({
  currentViewType,
  onClickRadio,
}: ITrainingSelectRadio) {
  const { t } = useTranslator();
  const items: Array<{
    label: string;
    value: TModelSelectViewType;
  }> = [
    {
      label: t('NEW'),
      value: 'category',
    },
    {
      label: t('MY_MODELS'),
      value: 'my-model',
    },
    {
      label: t('MY_MODI_DATA'),
      value: 'modi-data',
    },
  ];

  const handleOnClick = (type: TModelSelectViewType) => onClickRadio(type);

  return (
    <div className="flex mb-[36px]">
      <RadioGroup value={currentViewType} onChange={handleOnClick as any}>
        {items.map(({ value, label }) => {
          return (
            <Radio name="label" value={value} key={label}>
              {label}
            </Radio>
          );
        })}
      </RadioGroup>
    </div>
  );
}

export default TrainingSelectRadio;
