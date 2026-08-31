import React, { Fragment } from 'react';
import Button from '@components/ui_old/button/button';
import useTranslator from '@hooks/useTranslator';
import {
  useMyModelConnectionStore,
  useMyModelModiClassifier,
} from '@src/store/zustand';
import { useDisclosure } from '@nextui-org/react';
import { AiModelCategoryType } from '@services/old/generated/graphql';
import ModelMaxAlertModal from '@src/pages/training/components/ModelMaxAlertModal';
import { TModelSelectViewType } from '@src/pages/training/components/training-select-section';
import TwoButtonModiTypeModal from '../../ModiTypeModal/TwoButtonModiTypeModal';

interface ICategoryTabButtons {
  disabled: boolean;
  onCreateMyModel: () => void;
  selectedModelCategoryType: AiModelCategoryType | null;
  changeView: (value: TModelSelectViewType) => void;
}

function CategoryTabButtons({
  disabled,
  onCreateMyModel,
  selectedModelCategoryType,
  changeView,
}: ICategoryTabButtons) {
  const { t } = useTranslator();
  const { updateModiType } = useMyModelModiClassifier((state) => ({
    updateModiType: state.updateModiType,
  }));
  const myModelConnection = useMyModelConnectionStore(
    (state) => state.modelConnection,
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const onSubmit = (modiType: string | null | undefined) => {
    updateModiType(modiType);
    onClose();
    onCreateMyModel();
  };

  const handleClick = () => {
    if (myModelConnection && myModelConnection.length >= 20) {
      onOpenAlert();
      return;
    }

    // 모디데이터 카드 활성화 상태에서 클릭 했을 때
    if (selectedModelCategoryType === AiModelCategoryType.NumberClassifier) {
      onOpen();
    } else {
      onCreateMyModel();
    }
  };
  return (
    <>
      <Button onClick={handleClick} disabled={disabled} className="w-[174px]">
        {t('TRAIN')}
      </Button>

      {isOpen && (
        <TwoButtonModiTypeModal
          defaultValue={null}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      )}

      {isOpenAlert && (
        <ModelMaxAlertModal
          onClose={onCloseAlert}
          onOK={() => {
            onCloseAlert();
            changeView('my-model');
          }}
        />
      )}
    </>
  );
}

export default CategoryTabButtons;
