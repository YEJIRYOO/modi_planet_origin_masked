import { ModalBody } from '@nextui-org/react';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import React, { useState } from 'react';
import { useMyModelModiClassifier } from '@src/store/zustand';
import useTranslator from '@hooks/useTranslator';

import {
  ActiveButton,
  ActiveDial,
  ActiveEnvironment,
  ActiveIMU,
  ActiveJoystick,
  ActiveTof,
  ButtonModule,
  DialModule,
  EnvironmentModule,
  IMUModule,
  JoystickModule,
  TofModule,
} from '@lib/newAssets';

interface ModiTypeModalProps {
  defaultValue: string | null | undefined;
  onSubmit: (modiType: string | undefined | null) => void;
  onClose: () => void;
}

const MODULE_NAMES = [
  'BUTTON',
  'DIAL',
  'TOF',
  'JOYSTICK',
  'ENVIRONMENT',
  'IMU',
] as const;

export default function ModiTypeModal({
  defaultValue,
  onSubmit,
  onClose,
}: ModiTypeModalProps) {
  const [selectedModule, setSelectedModule] = useState<
    string | null | undefined
  >(defaultValue);
  const { t } = useTranslator();

  const moduleIcons = {
    BUTTON: ButtonModule,
    DIAL: DialModule,
    TOF: TofModule,
    JOYSTICK: JoystickModule,
    ENVIRONMENT: EnvironmentModule,
    IMU: IMUModule,
  };

  const activeModuleIcons = {
    BUTTON: ActiveButton,
    DIAL: ActiveDial,
    TOF: ActiveTof,
    JOYSTICK: ActiveJoystick,
    ENVIRONMENT: ActiveEnvironment,
    IMU: ActiveIMU,
  };

  const handleIconClick = (moduleName: string) => {
    setSelectedModule(moduleName);
  };

  const handleSubmit = () => {
    onSubmit(selectedModule);
  };

  return (
    <CModalOneButton
      isOpen
      onClose={onClose}
      title={t('MODI_MODEL_CHANGE')}
      onClickOk={handleSubmit}
      isDisabled={!selectedModule}
      okLabel={t('CHANGE')}
    >
      <ModalBody>
        <div className="grid grid-cols-3 grid-rows-2 gap-x-[48.28px] gap-y-[25.83px] items-center justify-items-center w-full mb-5">
          {MODULE_NAMES.map((name, index) => {
            const Icon = moduleIcons[name];
            const ActiveIcon = activeModuleIcons[name];
            const isActive = selectedModule === name;

            return (
              <div
                key={index}
                onClick={() => handleIconClick(name)}
                className="cursor-pointer"
              >
                {isActive ? (
                  <ActiveIcon className="w-[72px] h-[72px]" />
                ) : (
                  <Icon className="w-[72px] h-[72px] [&_rect]:stroke-[#DDDDDD] [&_path]:fill-[#DDDDDD]" />
                )}
              </div>
            );
          })}
        </div>
        <div className="p6-r text-brand mb-[60px]">
          * {t('MODULE_SELECT_DESC')}
        </div>
      </ModalBody>
    </CModalOneButton>
  );
}
