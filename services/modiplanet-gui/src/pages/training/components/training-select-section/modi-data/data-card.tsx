import React, { useEffect, useState } from 'react';
import { More } from '@src/lib/newAssets';
import CustomPopover from '@components/ui_old/popover/custom-popover';
import DataCardPopoverContent from './data-card-popover-content';
import CModalTwoButton from '@src/components/ui/Modal/CModalTwoButton';
import { useDisclosure } from '@nextui-org/react';
import InputUI from '@src/components/ui/Input/InputUI';
import { useUpdateModiDataController } from '@src/pages/training/hooks/useUpdateModiDataController';
import { useDeleteModidata } from '@src/services/api/modi/useDeleteModiData';
import useTranslator from '@src/components/hooks/useTranslator';

import {
  ButtonModule,
  DialModule,
  EnvironmentModule,
  IMUModule,
  JoystickModule,
  TofModule,
} from '@src/lib/newAssets';

import ChartImage from '@src/pages/training/modi/components/ClassfierCard/ModiViewer/ChartImage';
import { functionOptions } from '@src/lib/constants/select-options';
import CheckboxUI from '@src/components/ui/Checkbox/CheckboxUI';
import { ModiData } from '@src/lib/types/modi-data';

const getFunctionLabel = (moduleType: string, functionType: string): string => {
  const options = functionOptions[moduleType];
  if (options) {
    const option = options.find((opt) => opt.value === functionType);
    return option ? option.label : '';
  }
  return '';
};

interface DataCardProps {
  data: ModiData;
  deleteModiData: (id: string) => void;
  renameModiData: (id: string, name: string) => void;
  onSelect: () => void;
  isSelected: boolean;
  existingNames: string[];
}

const DataCard = ({
  data,
  renameModiData,
  deleteModiData,
  onSelect,
  isSelected,
  existingNames,
}: DataCardProps) => {
  const [cardData, setCardData] = useState(data);
  const {
    isOpen: isRenameModalOpen,
    onOpen: onRenameModalOpen,
    onClose: onRenameModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const [newName, setNewName] = useState(cardData.name);
  const { deleteModiDataMutation } = useDeleteModidata();
  const { onSubmit, nameErrorMsg, loading, resetErrorMsg, setNameErrorMsg } =
    useUpdateModiDataController();
  const { t } = useTranslator();

  useEffect(() => {
    setCardData(data);
  }, [data]);

  const handleRenameOpen = () => {
    setNewName(cardData.name);
    onRenameModalOpen();
    resetErrorMsg();
  };

  const handleRenameConfirm = () => {
    onSubmit({
      id: cardData.id,
      name: newName,
      onCompleted: () => {
        renameModiData(data.id, newName);
        onRenameModalClose();
      },
      onError: (msg) => {
        console.error(msg);
      },
    });
  };

  const handleDeleteOpen = () => {
    onDeleteModalOpen();
    resetErrorMsg();
  };

  const handleDeleteConfirm = async () => {
    await deleteModiDataMutation({
      id: data.id,
      onCompleted: () => {
        deleteModiData(data.id);
        onDeleteModalClose();
      },
      onError(err) {
        console.log('에러', err);
      },
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi;
    const value = event.target.value.replace(regex, '');
    setNewName(value);

    // 실시간 중복 검증
    const currentNameWithoutExt = cardData.name.replace('.modi', '');
    if (value && value !== currentNameWithoutExt) {
      const existingNamesWithoutExt = existingNames.map(name => name.replace('.modi', ''));

      if (existingNamesWithoutExt.includes(value)) {
        setNameErrorMsg(t('ALREADY_USED_NAME'));
      } else {
        setNameErrorMsg('');
      }
    } else {
      setNameErrorMsg('');
    }
  };

  const moduleIcons = {
    BUTTON: ButtonModule,
    DIAL: DialModule,
    ENVIRONMENT: EnvironmentModule,
    IMU: IMUModule,
    JOYSTICK: JoystickModule,
    TOF: TofModule,
  };
  const ModuleIcon = moduleIcons[cardData.moduleType] || null;
  const functionLabel = getFunctionLabel(
    cardData.moduleType,
    cardData.functionType,
  );

  return (
    <div className="w-[224px] h-[209px] rounded-xl p-5 bg-white relative">
      <div className="flex justify-between items-center">
        <CheckboxUI onValueChange={onSelect} isSelected={isSelected} />
        <CustomPopover
          content={
            <DataCardPopoverContent
              data={cardData}
              onRenameClick={handleRenameOpen}
              onDeleteClick={handleDeleteOpen}
            />
          }
          props={{
            align: 'start',
            reposition: true,
            positions: ['left'],
            padding: -24,
            containerStyle: {
              top: '24px',
            },
          }}
        >
          <span role="button">
            <More />
          </span>
        </CustomPopover>
      </div>
      <div className="flex items-center mt-2 mb-2">
        {ModuleIcon && <ModuleIcon className="w-[24px] h-[24px] mr-2" />}
        <div className="p8-r text-font-main truncate whitespace-nowrap overflow-hidden text-ellipsis">
          {t(functionLabel)}
        </div>
      </div>
      <div className="mt-2">
        <div className="h-[62px] w-full flex items-center justify-center mb-2 bg-gray-50">
          <ChartImage cardData={cardData.data} width={184} height={62} />
        </div>
        <div className="p5-sb text-font-main max-w-[184px] truncate">
          {cardData.name}
        </div>
        <div className="p8-r mt-2 text-font-sub_2">{cardData.createdAt}</div>
      </div>
      <CModalTwoButton
        isOpen={isRenameModalOpen}
        hideCloseButton
        onClickCancel={onRenameModalClose}
        onClickOk={handleRenameConfirm}
        isDisabledOk={newName === '' || newName === cardData.name.replace('.modi', '') || loading || !!nameErrorMsg}
      >
        <InputUI
          autoFocus
          isRequired
          placeholder={cardData.name}
          maxLength={30}
          value={newName}
          onChange={handleNameChange}
          onBlur={() => {
            if (!newName) {
              setNewName(cardData.name);
            }
          }}
          onClear={() => setNewName('')}
          className="w-full mb-[50px]"
          errorMessage={nameErrorMsg}
        />
      </CModalTwoButton>
      <CModalTwoButton
        isOpen={isDeleteModalOpen}
        hideCloseButton
        onClickCancel={onDeleteModalClose}
        onClickOk={handleDeleteConfirm}
        okLabel={t('YES')}
        cancelLabel={t('NO')}
      >
        <div className="mb-[60px] p3-m">
          {t('DELETE_CUSTOM_MODEL', { NAME: cardData.name })}
        </div>
      </CModalTwoButton>
    </div>
  );
};

export default DataCard;
