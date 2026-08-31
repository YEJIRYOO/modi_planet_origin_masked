import { Fragment, useState, useEffect } from 'react';

import Label from '@components/ui_old/form/label';
import InputWrapper from '@components/ui_old/form/input-wrapper';
import InputUI from '@components/ui/Input/InputUI';
import { useDisclosure } from '@nextui-org/react';

import useTranslator from '@hooks/useTranslator';
import { useUpdateProfileController } from '@src/pages/my-page/hooks/useUpdateProfileController';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import { maskUserInfo } from '../maskUserInfo';

interface UserNameInputProps {
  name: string;
}

export function UserNameInput({ name }: UserNameInputProps) {
  const { t } = useTranslator();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [newName, setNewName] = useState(name);
  const [errorMsg, setErrorMsg] = useState('');
  const { onSubmit } = useUpdateProfileController();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(newName !== name && errorMsg === '' && newName !== '');
  }, [newName, name, errorMsg]);

  const handleOpen = (event) => {
    setNewName(name);
    setErrorMsg('');
    event.preventDefault();
    onOpen();
  };

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
    if (/^[\p{L}\s]*$/u.test(inputValue)) {
      setNewName(inputValue);
      setErrorMsg('');
    } else {
      setErrorMsg(t('ENTER_INPUT_CHAR'));
    }
  };

  const handleSave = async () => {
    if (!errorMsg) {
      await onSubmit({ name: newName });
      onClose();
    }
  };

  return (
    <Fragment>
      <InputWrapper className="flex items-center justify-between my-14 sm:my-6 sm:items-start">
        <div className="flex items-center sm:flex-col sm:justify-start sm:items-start">
          <Label htmlFor="name" className="w-[130px] p3-b sm:mb-4">
            {t('NAME')}
          </Label>
          <p className="text-15 text-font-sub_1 w-[250px]">
            {name ? maskUserInfo.maskName(name) : '-'}
          </p>
        </div>
        <button onClick={handleOpen}>
          <img src="/assets/mypage/edit.svg"></img>
        </button>
      </InputWrapper>
      <CModalOneButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        innerLayout="left"
        title={t('CHANGE_NAME')}
        subTitle={t('ENTER_CHANGE_NAME')}
        onClickOk={handleSave}
        isDisabled={!isButtonEnabled}
        okLabel={t('CHANGE')}
      >
        <div className="mt-[78px] mb-[50px]">
          <InputUI
            maxLength={20}
            isRequired
            placeholder={t('ENTER_NAME')}
            defaultValue={name}
            onChange={handleNameChange}
            onClear={() => setNewName('')}
            className="w-full"
            errorMessage={errorMsg}
          />
        </div>
      </CModalOneButton>
    </Fragment>
  );
}

export default UserNameInput;
