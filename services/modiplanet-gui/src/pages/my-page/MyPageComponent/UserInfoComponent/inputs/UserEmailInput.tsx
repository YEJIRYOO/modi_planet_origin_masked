import Label from '@components/ui_old/form/label';
import InputWrapper from '@components/ui_old/form/input-wrapper';

import useTranslator from '@hooks/useTranslator';
import { maskUserInfo } from '../maskUserInfo';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';
import { useDisclosure } from '@nextui-org/react';
import LabeledEmailVerify from '@src/components/ui/common/LabeledEmailVerify';
import { AuthType, useUserQuery } from '@services/gen/gen';
import { useState } from 'react';
import { useConfirmContactEmailChange } from '@services/api/user/useConfirmContactEmailChange';
import { useConfirmProtectorEmailChange } from '@services/api/user/useConfirmProtectorEmailChange';
import { useProfileStore } from '@src/store/zustand';

interface UserEmailInputProps {
  email: string;
  emailType: 'user' | 'protector';
  externalOpen?: boolean;
  onExternalOpenChange?: (isOpen: boolean) => void;
  userEmailId?: string;
}

export function UserEmailInput({
  email,
  emailType,
  externalOpen,
  onExternalOpenChange,
  userEmailId,
}: UserEmailInputProps) {
  const { t } = useTranslator();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const actualIsOpen = externalOpen !== undefined ? externalOpen : isOpen;
  const actualOnOpenChange = onExternalOpenChange || onOpenChange;
  const [isVerified, setIsVerified] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [authCode, setAuthCode] = useState('');

  const { confirmContactEmailChange, loading: contactLoading } =
    useConfirmContactEmailChange();
  const { confirmProtectorEmailChange, loading: protectorLoading } =
    useConfirmProtectorEmailChange();
  const { refetch: refetchUser } = useUserQuery();
  const setProfile = useProfileStore((state) => state.setProfile);

  const isProtector = emailType === 'protector';

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsVerified(false);
    setNewEmail('');
    setAuthCode('');
    if (onExternalOpenChange) {
      onExternalOpenChange(true);
    } else {
      onOpen();
    }
  };

  const handleVerifyCompleted = (
    isCompleted: boolean,
    verifiedEmail: string,
    verifiedAuthCode: string,
  ) => {
    setIsVerified(isCompleted);
    setNewEmail(verifiedEmail);
    setAuthCode(verifiedAuthCode);
  };

  const handleSave = async () => {
    if (isVerified && newEmail && authCode) {
      if (isProtector) {
        await confirmProtectorEmailChange({
          newEmail,
          authCode,
          onCompleted: async (protector) => {
            await refetchUser();
            if (onExternalOpenChange) {
              onExternalOpenChange(false);
            } else {
              onClose();
            }
          },
          onError: (err) => {
            console.error('Error changing protector email:', err);
          },
        });
      } else {
        await confirmContactEmailChange({
          newEmail,
          authCode,
          onCompleted: (profile) => {
            setProfile(profile);
            if (onExternalOpenChange) {
              onExternalOpenChange(false);
            } else {
              onClose();
            }
          },
          onError: (err) => {
            console.error('Error changing contact email:', err);
          },
        });
      }
    }
  };

  const emailLabel = isProtector ? t('PROTECTOR_EMAIL') : t('EMAIL');

  const isEmailEmpty = !email || email === '';

  const modalTitle = isProtector
    ? isEmailEmpty
      ? t('ENTER_PROTECTOR_EMAIL')
      : t('CHANGE_PROTECTOR_EMAIL')
    : isEmailEmpty
    ? t('REGISTER_EMAIL')
    : t('CHANGE_EMAIL');

  const okLabel = isEmailEmpty ? t('REGISTER') : t('CHANGE');

  return (
    <>
      <div className="my-14 sm:my-6">
        <InputWrapper className="flex items-center justify-between sm:items-start">
          <div className="flex items-center sm:flex-col sm:justify-start sm:items-start">
            <Label htmlFor="email" className="w-[130px] p3-b sm:mb-4">
              {emailLabel}
            </Label>
            <p className="text-15 text-font-sub_1">
              {email ? maskUserInfo.maskEmail(email) : '-'}
            </p>
          </div>
          <button onClick={handleOpen} className="shrink-0">
            <img src="/assets/mypage/edit.svg"></img>
          </button>
        </InputWrapper>
        <div className="ml-[130px] sm:ml-0 max-w-[504px] mt-[14px] sm:mt-[9px]">
          <p className="text-font-sub_1 p8-r">{t('USECASE_EMAIL')}</p>
        </div>
      </div>
      <CModalOneButton
        isOpen={actualIsOpen}
        onOpenChange={actualOnOpenChange}
        innerLayout="left"
        title={modalTitle}
        onClickOk={handleSave}
        isDisabled={!isVerified || contactLoading || protectorLoading}
        okLabel={okLabel}
      >
        <div className="mt-[20px]">
          <LabeledEmailVerify
            emailLabel={t('NEW_EMAIL')}
            codeLabel={t('AUTH_CODE')}
            authType={
              isProtector
                ? AuthType.ProtectorEmailChange
                : AuthType.ContactEmail
            }
            onVerifyCompleted={handleVerifyCompleted}
            notAllowedEmail={isProtector ? userEmailId : undefined}
            emailPlaceholder={
              isEmailEmpty ? t('ENTER_REGISTER_EMAIL') : t('ENTER_CHANGE_EMAIL')
            }
            codePlaceholder={t('ENTER_AUTH_CODE')}
          />
        </div>
      </CModalOneButton>
    </>
  );
}

export default UserEmailInput;
