import { More } from '@src/lib/newAssets';
import CustomPopover from '@components/ui_old/popover/custom-popover';
import MyModelPopoverContent from '@src/pages/training/components/training-select-section/my-model-list/my-model-popover-content';
import { useState, useMemo } from 'react';
import { useDisclosure } from '@nextui-org/react';
import CModalTwoButton from '@src/components/ui/Modal/CModalTwoButton';
import { MAX_LENGTH_MODEL_NAME } from '@src/lib/constants/etc';
import useTranslator from '@hooks/useTranslator';
import { useCheckAIModelNameDuplicateLazy } from '@services/api/ai/useCheckAIModelNameDuplicateLazy';
import { debounce } from 'lodash';
import InputUI from '@src/components/ui/Input/InputUI';

interface IMyModelCard {
  name: string;
  isActive: boolean;
  imageUrl: string;
  onClickCard: () => void;
  onClickDelete: () => Promise<void>;
  onClickRename: (newName: string) => Promise<void>;
}

function MyModelCard({
  name,
  isActive,
  imageUrl,
  onClickCard,
  onClickDelete,
  onClickRename,
}: IMyModelCard) {
  const { t } = useTranslator();
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
  const [newName, setNewName] = useState('');
  const [lengthError, setLengthError] = useState('');
  const [duplicateError, setDuplicateError] = useState('');
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);

  const { checkAIModelNameDuplicate } = useCheckAIModelNameDuplicateLazy();

  const checkDuplicateName = async (modelName: string) => {
    if (!modelName.trim() || modelName === name) {
      setDuplicateError('');
      setIsCheckingDuplicate(false);
      return;
    }

    setIsCheckingDuplicate(true);
    const exists = await checkAIModelNameDuplicate({
      name: modelName,
    });

    if (exists) {
      setDuplicateError(t('ALREADY_USED_NAME2'));
    } else {
      setDuplicateError('');
    }
    setIsCheckingDuplicate(false);
  };

  const debouncedCheckDuplicate = useMemo(
    () => debounce(checkDuplicateName, 500),
    [checkAIModelNameDuplicate, t, name],
  );

  const handleRenameOpen = () => {
    setNewName(name);
    setLengthError('');
    setDuplicateError('');
    onRenameModalOpen();
  };

  const handleRenameConfirm = async () => {
    if (lengthError || duplicateError) {
      return;
    }
    try {
      await onClickRename(newName);
      handleRenameClose();
    } catch (err) {
      window.alert('모델 이름 변경에 실패 했습니다. 다시 시도해 주세요.');
      throw err;
    }
  };

  const handleRenameClose = () => {
    setLengthError('');
    setDuplicateError('');
    setIsCheckingDuplicate(false);
    debouncedCheckDuplicate.cancel();
    onRenameModalClose();
  };

  const handleDeleteConfirm = async () => {
    try {
      await onClickDelete();
      onDeleteModalClose();
    } catch (err) {
      window.alert('모델 삭제를 실패 했습니다. 다시 시도해 주세요.');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewName(value);

    // 길이 체크
    if (value.length > MAX_LENGTH_MODEL_NAME) {
      setLengthError(t('MODEL_NAME_LENGTH'));
    } else {
      setLengthError('');
    }

    // 중복 체크 (debounced)
    debouncedCheckDuplicate(value);
  };

  const isButtonDisabled = useMemo(() => {
    return (
      !newName.trim() ||
      newName === name ||
      newName.length > MAX_LENGTH_MODEL_NAME ||
      !!lengthError ||
      !!duplicateError ||
      isCheckingDuplicate
    );
  }, [newName, name, lengthError, duplicateError, isCheckingDuplicate]);

  return (
    <>
      <div
        role="button"
        className={`w-[290px] border rounded-20 p-[18px] duration-200 ${
          isActive ? 'bg-brand text-white' : 'bg-white'
        }`}
        onClick={onClickCard}
      >
        <div className="flex justify-end mb-[16px]">
          <CustomPopover
            content={
              <MyModelPopoverContent
                onClickRename={handleRenameOpen}
                onClickDelete={onDeleteModalOpen}
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

        <div className="rounded-10 borrder bg-[#EBF3FB] h-[210px] flex-center mb-[16px]">
          <img src={imageUrl} alt={name} />
        </div>

        <p className="p3-b overflow-hidden text-ellipsis whitespace-nowrap w-full">
          {name}
        </p>
      </div>

      <CModalTwoButton
        isOpen={isRenameModalOpen}
        hideCloseButton
        onClickCancel={handleRenameClose}
        onClickOk={handleRenameConfirm}
        isDisabledOk={isButtonDisabled}
      >
        <div className="w-full mb-[50px]">
          <InputUI
            autoFocus
            placeholder={name}
            maxLength={31}
            value={newName}
            onChange={handleNameChange}
            onClear={() => {
              setNewName('');
              setLengthError('');
              setDuplicateError('');
              debouncedCheckDuplicate.cancel();
            }}
          />
          {lengthError && (
            <div className="text-tiny text-brand text-start mt-1">
              {lengthError}
            </div>
          )}
          {duplicateError && (
            <div className="text-tiny text-brand text-start mt-1">
              {duplicateError}
            </div>
          )}
        </div>
      </CModalTwoButton>

      <CModalTwoButton
        isOpen={isDeleteModalOpen}
        okLabel={t('YES')}
        cancelLabel={t('NO')}
        onClickOk={handleDeleteConfirm}
        onClickCancel={onDeleteModalClose}
        onClose={onDeleteModalClose}
      >
        <div className="pb-5 text-center">
          <p className="flex-center mb-[40px] text-font-sub p3-m">
            {t('DELETE_CUSTOM_MODEL', { NAME: name })}
          </p>
        </div>
      </CModalTwoButton>
    </>
  );
}

export default MyModelCard;
