import { useDisclosure } from '@nextui-org/react';

import InputUI from '@src/components/ui/Input/InputUI';
import useTranslator from '@hooks/useTranslator';
import { AuthType } from '@services/gen/gen';
import { useState } from 'react';
import { Validator } from '@src/pages/sign-up/shared/validator';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import { useNavigate } from 'react-router-dom';
import { useEmailController } from '@hooks/user/useEmailController';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';
import { getIsPortal } from '@lib/utils/utils';

export default function ChangePassword() {
  const { onSendEmail } = useEmailController();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { t } = useTranslator();
  const navigate = useNavigate();
  const isPortal = getIsPortal();
  const [errorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState('');

  const onClickSend = async () => {
    await onSendEmail({
      authType: AuthType.ResetPassword,
      email: email,
      onCompleted: () => onOpen(),
      onError: onError,
    });
  };

  const onError = (msg: string) => {
    setErrorMsg(msg);
  };

  const onClickOk = () => {
    onClose();
    navigate(isPortal ? '/portal/signin' : '/signin');
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-[432px] sm:w-[350px] flex flex-col items-center mt-[70px]">
          <div className="h2-b mb-[38px]">{t('CHANGE_PW')}</div>
          <div className="text-font-sub sm:p3-b p1-b mb-[20px]">
            {t('ENTER_EMAIL_FOR_RESET_PW')}
          </div>
          <div className="text-center text-font-sub p4-r mb-[164px] sm:mb-[50px]">
            <span>{t('CHANGE_ID_PW_SOCIAL_LOGIN')}</span>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-[432px] sm:w-[350px] flex-col items-center">
              <div className="flex justify-start mb-5 text-font-sub p3-b">
                {t('EMAIL')}
              </div>
              <div className="flex justify-center mb-[70px] w-full sm:mb-[40px]">
                <InputUI
                  onValueChange={setEmail}
                  isRequired
                  placeholder={t('ENTER_EMAIL')}
                  errorMessage={errorMsg}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-[160px]">
              <ButtonUI
                fullWidth
                isDisabled={!Validator.validateEmail(email)}
                onClick={onClickSend}
              >
                {t('SEND')}
              </ButtonUI>
            </div>
          </div>
          <CModalOneButton
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            hideCloseButton
            onClickOk={onClickOk}
            title={t('CHANGE_PW')}
            subTitle={t('SEND_EMAIL')}
          >
            <div className="w-[1px] h-[60px]" />
          </CModalOneButton>
        </div>
      </div>
    </>
  );
}
