import InputUI from '@components/ui/Input/InputUI';
// import ButtonUI from '@components/ui/Button/ButtonUI';
import EmailVerifyButtonUI from '../../Button/EmailVerifyButtonUI';
import { Validator } from '@src/pages/sign-up/shared/validator';
import { Input } from '@nextui-org/react';
import Timer from '@src/pages/sign-up/shared/timer';
import { useState } from 'react';
import { AuthType } from '@services/gen/gen';
import useTranslator from '@hooks/useTranslator';
import { useEmailController } from '@hooks/user/useEmailController';

interface EmailVerifyProps {
  title: React.ReactNode;
  authType: AuthType;
  onVerifyCompleted: (isCompleted: boolean, email: string, authCode?: string) => void;
  notAllowedEmail?: string;
}

export default function EmailVerify({
  title,
  authType,
  onVerifyCompleted,
  notAllowedEmail,
}: EmailVerifyProps) {
  const { t } = useTranslator();

  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');

  const [disabledSendButton, setDisabledSendButton] = useState(false);
  const [disabledVerifyButton, setDisabledVerifyButton] = useState(true);
  const [isViewTimer, setIsViewTimer] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSent, setIsSent] = useState(false);
  const { onConfirmCode, onSendEmail } = useEmailController();

  const handleCodeSendButton = async () => {
    if (notAllowedEmail === email) {
      setErrorMsg(t('ENTER_GUARDIAN_EMAIL'));
      return;
    }

    await onSendEmail({
      authType: authType,
      email: email,
      onCompleted: () => {
        setDisabledSendButton(true);
        setDisabledVerifyButton(false);
        setIsViewTimer(true);
        setIsSent(true);
        setErrorMsg('');
      },
      onError: (msg) => {
        setErrorMsg(msg);
      },
    });
  };

  const handleCodeVerifyButton = async () => {
    await onConfirmCode({
      authType: authType,
      email: email,
      authCode: authCode,
      onCompleted: onCompletedCodeVerifyButton,
      onError: onErrorCodeVerifyButton,
    });
  };

  const onCompletedCodeVerifyButton = async () => {
    onVerifyCompleted(true, email, authCode);
    setDisabledSendButton(true);
    setDisabledVerifyButton(true);
    setIsViewTimer(false);
    setErrorMsg('');
    setSuccessMsg(t('AUTH_COMPLETED'));
  };

  const onErrorCodeVerifyButton = async () => {
    setErrorMsg(t('NO_MATCHING_CODE'));
  };

  const onFinishTimer = () => {
    setDisabledVerifyButton(true);
    setDisabledSendButton(false);
    setIsViewTimer(false);
  };

  return (
    <>
      <div className="flex justify-start w-full mb-5 text-font-sub p3-b">
        {title}
      </div>
      <div className="w-full flex justify-center gap-3">
        <InputUI
          isRequired
          placeholder={
            authType === AuthType.SignUpProtector
              ? t('ENTER_GUARDIAN_EMAIL')
              : t('ENTER_EMAIL')
          }
          value={email}
          onValueChange={setEmail}
          className="mb-2"
          style={{
            color: !disabledVerifyButton ? '#DFDFDF' : undefined,
          }}
          disabled={!disabledVerifyButton}
          isClearable={disabledVerifyButton}
        />

        <div className="w-[73px] shrink-0">
          <EmailVerifyButtonUI
            fullWidth
            color="secondary"
            size="md"
            onClick={handleCodeSendButton}
            isDisabled={!Validator.validateEmail(email) || disabledSendButton}
          >
            {isSent ? t('RE_SEND') : t('SEND')}
          </EmailVerifyButtonUI>
        </div>
      </div>
      <div className="w-full flex justify-center gap-3">
        <Input
          isRequired
          placeholder={t('ENTER_AUTH_CODE')}
          value={authCode}
          onValueChange={setAuthCode}
          errorMessage={errorMsg || successMsg}
          classNames={{
            inputWrapper:
              'bg-white border border-[#DDDDDD] shadow-none h-[46px] data-[hover=true]:bg-white group-data-[focus=true]:bg-white',
            errorMessage: successMsg && 'text-sub2_green',
          }}
          className="mb-12"
          endContent={
            isViewTimer ? <Timer onFinishTimer={onFinishTimer} /> : null
          }
          disabled={disabledSendButton && disabledVerifyButton}
          maxLength={6}
        />
        <div className="w-[73px] shrink-0">
          <EmailVerifyButtonUI
            fullWidth
            isDisabled={disabledVerifyButton}
            color="secondary"
            size="md"
            onClick={handleCodeVerifyButton}
          >
            {t('OK')}
          </EmailVerifyButtonUI>
        </div>
      </div>
    </>
  );
}
