import React, { useState } from 'react';
import { useMyModelModiClassifier } from '@src/store/zustand';
import {
  ButtonModule,
  DialModule,
  EnvironmentModule,
  IMUModule,
  JoystickModule,
  TofModule,
} from '@lib/newAssets';
import { useDisclosure } from '@nextui-org/react';
import useTranslator from '@hooks/useTranslator';
import OneButtonModiTypeModal from '../../components/ModiTypeModal/OneButtonModiTypeModal';

interface ModelModuleBadge {}

function ModelModuleBadge({}: ModelModuleBadge) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { modiType, updateModiType } = useMyModelModiClassifier((state) => ({
    modiType: state.modiType,
    updateModiType: state.updateModiType,
  }));
  const { t } = useTranslator();

  const moduleIcons = {
    BUTTON: ButtonModule,
    DIAL: DialModule,
    ENVIRONMENT: EnvironmentModule,
    IMU: IMUModule,
    JOYSTICK: JoystickModule,
    TOF: TofModule,
  };

  const ModuleIcon = modiType ? moduleIcons[modiType] : null;

  const onSubmit = (modiType: string | null | undefined) => {
    updateModiType(modiType);
    onClose();
  };

  return (
    <>
      {ModuleIcon && (
        <div className="mb-[16px] mr-4">
          <ModuleIcon
            className="w-[45px] h-[45px] cursor-pointer"
            onClick={onOpen}
          />
        </div>
      )}

      {isOpen && (
        <OneButtonModiTypeModal
          defaultValue={modiType}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}

export default ModelModuleBadge;
