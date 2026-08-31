import React from 'react';
import CheckboxUI from '@src/components/ui/Checkbox/CheckboxUI';
import {
  ButtonModule,
  DialModule,
  EnvironmentModule,
  IMUModule,
  JoystickModule,
  TofModule,
} from '@src/lib/newAssets';
import ChartImage from '../ModiViewer/ChartImage';
import useTranslator from '@src/components/hooks/useTranslator';
import { functionOptions } from '@src/lib/constants/select-options';

interface DataCardProps {
  data: any;
  onSelect: () => void;
  isSelected: boolean;
}

const getFunctionLabel = (moduleType, functionType) => {
  const options = functionOptions[moduleType];
  if (options) {
    const option = options.find((opt) => opt.value === functionType);
    return option ? option.label : '';
  }
  return '';
};

function DataCard({ data: cardData, onSelect, isSelected }: DataCardProps) {
  const moduleIcons = {
    BUTTON: ButtonModule,
    DIAL: DialModule,
    ENVIRONMENT: EnvironmentModule,
    IMU: IMUModule,
    JOYSTICK: JoystickModule,
    TOF: TofModule,
  };
  const ModuleIcon = moduleIcons[cardData.moduleType] || null;
  const { t } = useTranslator();
  const functionLabel = getFunctionLabel(
    cardData.moduleType,
    cardData.functionType,
  );

  return (
    <div
      className={`w-full max-w-[224px] p-[20px] border rounded-[20px] flex items-center bg-white cursor-pointer`}
      onClick={onSelect}
    >
      <div className="flex-1">
        <div className="flex justify-end mb-2">
          <CheckboxUI
            onValueChange={onSelect}
            isSelected={isSelected}
            className="-mr-4"
          />
        </div>
        <div className="flex items-center mb-2">
          {ModuleIcon && <ModuleIcon className="w-[24px] h-[24px] mr-2" />}
          <div className="p8-r text-font-main truncate whitespace-nowrap overflow-hidden text-ellipsis flex-1">
            {t(functionLabel)}
          </div>
        </div>

        <div className="h-[62px] w-full flex items-center justify-center mb-2 bg-gray-50">
          <ChartImage cardData={cardData.data} />
        </div>
        <div className="p5-sb text-font-main max-w-[184px] truncate whitespace-nowrap overflow-hidden text-ellipsis flex-1">
          {cardData.name}
        </div>
        <div className="p8-r text-font-sub_2">{cardData.createdAt}</div>
      </div>
    </div>
  );
}

export default DataCard;
