import PasswordInputUI from '@components/ui/Input/PasswordInputUI';
import useTranslator from '@hooks/useTranslator';
import { useEffect, useState } from 'react';
import { Validator } from '@src/pages/sign-up/shared/validator';

interface PasswordVerifyProps {
  onVerifyPw: (isVerified: boolean, pw: string) => void;
  errMessage?: string;
  mismatchErrMsg: string;
}

export default function PasswordVerify({
  onVerifyPw,
  errMessage,
  mismatchErrMsg,
}: PasswordVerifyProps) {
  const { t } = useTranslator();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordSectionError, setPasswordSectionError] = useState('');

  useEffect(() => {
    if (password && !Validator.validatePasswordError(password)) {
      setPasswordSectionError(t('ENTER_INPUT_8TO20'));
    } else if (passwordConfirm && password !== passwordConfirm) {
      setPasswordSectionError(mismatchErrMsg);
    } else if (errMessage) {
      setPasswordSectionError(errMessage);
    } else {
      setPasswordSectionError('');
    }
  }, [password, passwordConfirm, errMessage]);

  useEffect(() => {
    if (!Validator.validatePasswordError(password)) {
      onVerifyPw(false, password);
      return;
    }
    if (!Validator.validatePasswordError(passwordConfirm)) {
      onVerifyPw(false, password);
      return;
    }
    if (!password || !passwordConfirm || password !== passwordConfirm) {
      onVerifyPw(false, password);
      return;
    } else {
      onVerifyPw(true, password);
      return;
    }
  }, [password, passwordConfirm]);

  return (
    <>
      <div className="w-full flex justify-center">
        <PasswordInputUI
          maxLength={20}
          isRequired
          placeholder={t('ENTER_INPUT_8TO20')}
          value={password}
          isVisibleToggle
          onValueChange={setPassword}
          classNames={{
            inputWrapper:
              'bg-white border border-[#DDDDDD] shadow-none sm:w-[318px] sm:h-[46px]',
          }}
          className="mb-2"
        />
      </div>
      <div className="w-full flex justify-center gap-4">
        <PasswordInputUI
          isRequired
          maxLength={20}
          placeholder={t('CHECK_PW')}
          value={passwordConfirm}
          isVisibleToggle
          onValueChange={setPasswordConfirm}
          errorMessage={passwordSectionError}
          classNames={{
            inputWrapper:
              'bg-white border border-[#DDDDDD] shadow-none sm:w-[318px] sm:h-[46px]',
          }}
          className="mb-12"
        />
      </div>
    </>
  );
}
