import { Fragment, useState, useEffect } from 'react';

import Label from '@components/ui_old/form/label';
import InputWrapper from '@components/ui_old/form/input-wrapper';
import InputUI from '@components/ui/Input/InputUI';
import { useDisclosure } from '@nextui-org/react';

import useTranslator from '@hooks/useTranslator';
import { useUpdateProfileController } from '@src/pages/my-page/hooks/useUpdateProfileController';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';

interface UserNicknameInputProps {
  nickname: string;
}

export function UserNicknameInput({ nickname }: UserNicknameInputProps) {
  const { t } = useTranslator();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [newNickname, setNewNickname] = useState(nickname);
  const [errorMsg, setErrorMsg] = useState('');
  const { onSubmit } = useUpdateProfileController();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isValidationErr, setIsValidationErr] = useState(true);

  useEffect(() => {
    setIsButtonEnabled(
      newNickname !== nickname &&
        errorMsg === '' &&
        !isValidationErr &&
        newNickname !== '',
    );
  }, [newNickname, nickname, errorMsg, isValidationErr]);

  const handleOpen = (event) => {
    setNewNickname(nickname);
    event.preventDefault();
    onOpen();
    setErrorMsg('');
  };

  const handleNicknameChange = (event) => {
    const inputValue = event.target.value;
    setErrorMsg('');

    if (
      /^[a-zA-Z0-9]*$/.test(inputValue) &&
      inputValue.length >= 2 &&
      inputValue.length <= 20
    ) {
      setNewNickname(inputValue);
      setIsValidationErr(false);
    } else {
      setErrorMsg(t('ENTER_INPUT_2TO20'));
      setIsValidationErr(true);
    }
  };

  const handleSave = async () => {
    if (!errorMsg) {
      await onSubmit({
        nickname: newNickname,
        onCompleted: onClose,
        onError: setErrorMsg,
      });
    }
  };

  return (
    <>
      <Fragment>
        <InputWrapper className="flex items-center justify-between my-14 sm:my-6 sm:items-start">
          <div className="flex items-center sm:flex-col sm:justify-start sm:items-start">
            <Label htmlFor="name" className="w-[130px] p3-b sm:mb-4">
              {t('NICKNAME')}
              <span className="text-brand">*</span>
            </Label>
            <p className="text-15 text-font-sub_1 w-[250px]">
              {nickname ? nickname : '-'}
            </p>
          </div>
          <button onClick={handleOpen}>
            <img src="/assets/mypage/edit.svg"></img>
          </button>
        </InputWrapper>
        <CModalOneButton
          innerLayout="left"
          isOpen={isOpen}
          title={t('CHAGNE_NICKNAME')}
          subTitle={t('ENTER_NICKNAME')}
          onClickOk={handleSave}
          onOpenChange={onOpenChange}
          isDisabled={!isButtonEnabled}
          okLabel={t('CHANGE')}
        >
          <div className="mt-[78px] mb-[50px]">
            <InputUI
              isRequired
              placeholder={nickname}
              defaultValue={nickname}
              maxLength={20}
              onChange={handleNicknameChange}
              className="w-full"
              errorMessage={errorMsg}
              onClear={() => setNewNickname('')}
            />
          </div>
        </CModalOneButton>
      </Fragment>
    </>
  );
}

export default UserNicknameInput;
