import { Fragment, useState } from 'react';

import Label from '@components/ui_old/form/label';
import InputWrapper from '@components/ui_old/form/input-wrapper';
import { useDisclosure } from '@nextui-org/react';
import PasswordVerify from '@components/ui/common/PasswordVerify';
import { usePasswordController } from '@src/pages/my-page/hooks/usePasswordController';

import useTranslator from '@hooks/useTranslator';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';
import PasswordCompletedModal from './PasswordCompletedModal';
import PasswordInputUI from '@src/components/ui/Input/PasswordInputUI';

export function UserPasswordInput() {
  const { t } = useTranslator();

  const handleOpen = (event) => {
    event.preventDefault();
    onClearErrorMsg();
    onOpen();
  };
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenComplete,
    onOpen: onOpenComplete,
    onClose: onCloseComplete,
  } = useDisclosure();
  const { onSubmit, prevPWErrorMsg, errorMsg, onClearErrorMsg } =
    usePasswordController();

  const [currentPassword, setCurrentPassword] = useState('');
  const [verifiedPw, setVerifiedPw] = useState('');
  const [isVerifiedPw, setIsVerifiedPw] = useState(false);

  const onVerifyPw = (isVerified: boolean, pw: string) => {
    console.log('@@onVerifyPw', isVerified);
    setVerifiedPw(pw);
    setIsVerifiedPw(isVerified);
  };

  const onOkClick = () => {
    onSubmit(currentPassword, verifiedPw, () => {
      onClose();
      onOpenComplete();
      setCurrentPassword('');
    });
  };

  const onClickCompletedModal = () => {
    onCloseComplete();
  };

  return (
    <>
      <Fragment>
        <InputWrapper className="flex items-center justify-between my-14 sm:my-6 sm:items-start">
          <div className="flex items-center sm:flex-col sm:justify-start sm:items-start">
            <Label htmlFor="name" className="w-[130px] p3-b sm:mb-4">
              {t('PASSWORD')}
              <span className="text-[#FF4547]">*</span>
            </Label>
            <p className="text-15 text-font-sub_1 w-[250px]">********</p>
          </div>
          <button onClick={handleOpen}>
            <img src="/assets/mypage/edit.svg"></img>
          </button>
        </InputWrapper>
        <CModalOneButton
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          innerLayout="left"
          title={t('CHANGE_PW')}
          okLabel={t('CHANGE')}
          onClickOk={onOkClick}
          isDisabled={!verifiedPw || !isVerifiedPw}
        >
          <div>
            <div className="p3-r mb-2.5">{t('CURRENT_PW')}</div>
            <PasswordInputUI
              isRequired
              maxLength={20}
              placeholder={t('ENTER_PW')}
              value={currentPassword}
              isVisibleToggle
              onValueChange={setCurrentPassword}
              className="w-full mb-10"
              errorMessage={prevPWErrorMsg}
            />
            <div className="p3-r mb-2.5">{t('NEW_PW')}</div>
            <PasswordVerify
              errMessage={errorMsg}
              mismatchErrMsg={t('NO_MATCHING_NEW_PW')}
              onVerifyPw={onVerifyPw}
            />
          </div>
        </CModalOneButton>

        <PasswordCompletedModal
          isOpen={isOpenComplete}
          onClick={onClickCompletedModal}
        />
      </Fragment>
    </>
  );
}

export default UserPasswordInput;
