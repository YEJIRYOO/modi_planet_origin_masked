import InputUI from '@components/ui/Input/InputUI';
import EmailVerifyButtonUI from '../../Button/EmailVerifyButtonUI';
import { Validator } from '@src/pages/sign-up/shared/validator';
import { Input } from '@nextui-org/react';
import Timer from '@src/pages/sign-up/shared/timer';
import { useState } from 'react';
import { AuthType } from '@services/gen/gen';
import useTranslator from '@hooks/useTranslator';
import { useEmailController } from '@hooks/user/useEmailController';

interface LabeledEmailVerifyProps {
  emailLabel: string;
  codeLabel: string;
  authType: AuthType;
  onVerifyCompleted: (
    isCompleted: boolean,
    email: string,
    authCode: string,
  ) => void;
  notAllowedEmail?: string;
  emailPlaceholder?: string;
  codePlaceholder?: string;
}

export default function LabeledEmailVerify({
  emailLabel,
  codeLabel,
  authType,
  onVerifyCompleted,
  notAllowedEmail,
  emailPlaceholder,
  codePlaceholder,
}: LabeledEmailVerifyProps) {
  const { t } = useTranslator();

  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');

  const [disabledSendButton, setDisabledSendButton] = useState(false);
  const [disabledVerifyButton, setDisabledVerifyButton] = useState(true);
  const [isViewTimer, setIsViewTimer] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [emailFormatErrorMsg, setEmailFormatErrorMsg] = useState('');
  const [emailSuccessMsg, setEmailSuccessMsg] = useState('');
  const [codeInvalidEmailMsg, setCodeInvalidEmailMsg] = useState('');
  const [codeMatchingErrorMsg, setCodeMatchingErrorMsg] = useState('');
  const [codeSuccessMsg, setCodeSuccessMsg] = useState('');
  const [isSent, setIsSent] = useState(false);
  const { onConfirmCode, onSendEmail } = useEmailController();

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value && !Validator.validateEmail(value)) {
      setEmailFormatErrorMsg(t('INVALID_EMAIL_FORMAT'));
    } else {
      setEmailFormatErrorMsg('');
    }
  };

  const handleCodeSendButton = async () => {
    if (notAllowedEmail === email) {
      setEmailErrorMsg(t('ENTER_GUARDIAN_EMAIL'));
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
        setEmailErrorMsg('');
        setEmailSuccessMsg(t('AUTH_CODE_SENDED'));
      },
      onError: (msg, code) => {
        if (code === 10002) {
          setEmailErrorMsg(t('INVALID_EMIAL'));
        } else {
          setEmailErrorMsg(t('CODE_SEND_FAILED'));
        }
        setEmailSuccessMsg('');
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
    setCodeInvalidEmailMsg('');
    setCodeMatchingErrorMsg('');
    setCodeSuccessMsg(t('AUTH_COMPLETED'));
  };

  const onErrorCodeVerifyButton = async (_msg: string, code?: number) => {
    if (code === 10002) {
      setCodeInvalidEmailMsg(t('INVALID_EMIAL'));
      setCodeMatchingErrorMsg('');
    } else if (code === 10004) {
      setCodeMatchingErrorMsg(t('NO_MATCHING_CODE'));
    } else {
      setCodeMatchingErrorMsg(t('NO_MATCHING_CODE'));
    }
  };

  const onFinishTimer = () => {
    setDisabledVerifyButton(true);
    setDisabledSendButton(false);
    setIsViewTimer(false);
  };

  const getEmailPlaceholder = () => {
    if (emailPlaceholder) return emailPlaceholder;
    return authType === AuthType.SignUpProtector
      ? t('ENTER_GUARDIAN_EMAIL')
      : t('ENTER_EMAIL');
  };

  const getCodePlaceholder = () => {
    if (codePlaceholder) return codePlaceholder;
    return t('ENTER_AUTH_CODE');
  };

  return (
    <>
      <div className="mb-[21px]">
        <p className="p3-r mb-[10px]">{emailLabel}</p>
        <div className="w-full flex justify-center gap-3">
          <InputUI
            isRequired
            placeholder={getEmailPlaceholder()}
            value={email}
            onValueChange={handleEmailChange}
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
        {emailErrorMsg && (
          <p className="text-danger text-12 mt-1">{emailErrorMsg}</p>
        )}
        {emailFormatErrorMsg && (
          <p className="text-danger text-12 mt-1">{emailFormatErrorMsg}</p>
        )}
        {emailSuccessMsg && (
          <p className="text-sub2 text-12 mt-1">{emailSuccessMsg}</p>
        )}
      </div>
      <div className="mb-[50px]">
        <p className="p3-r mb-[10px]">{codeLabel}</p>
        <div className="w-full flex justify-center gap-3">
          <Input
            isRequired
            placeholder={getCodePlaceholder()}
            value={authCode}
            onValueChange={setAuthCode}
            onFocus={() => {
              setEmailSuccessMsg('');
              setCodeMatchingErrorMsg('');
            }}
            classNames={{
              inputWrapper:
                'bg-white border border-[#DDDDDD] shadow-none h-[46px] data-[hover=true]:bg-white group-data-[focus=true]:bg-white',
            }}
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
        {codeInvalidEmailMsg && (
          <p className="text-danger text-12 mt-1">{codeInvalidEmailMsg}</p>
        )}
        {codeMatchingErrorMsg && (
          <p className="text-danger text-12 mt-1">{codeMatchingErrorMsg}</p>
        )}
        {codeSuccessMsg && (
          <p className="text-sub2 text-12 mt-1">{codeSuccessMsg}</p>
        )}
      </div>
    </>
  );
}
