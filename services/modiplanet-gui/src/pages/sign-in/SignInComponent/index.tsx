import { MouseEventHandler, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@nextui-org/react';
import ButtonUI from '@components/ui/Button/ButtonUI';
import CheckboxUI from '@components/ui/Checkbox/CheckboxUI';

import useTranslator from '@hooks/useTranslator';
import GoogleSignInButton from '@src/pages/sign-in/SignInComponent/GoogleSignInButton';
import KakaoSignInButton from '@src/pages/sign-in/SignInComponent/KakaoSignInButton';
import { useSignInController } from '@hooks/user/useSignInController';
import InputUI from '@src/components/ui/Input/InputUI';
import {
  getRecentSignInType,
  getSavedEmail,
  storeSavedEmail,
  removeSavedEmail,
  isModiApp,
} from '@lib/utils/utils';
import { SignUpType } from '@services/gen/gen';
import PasswordInputUI from '@src/components/ui/Input/PasswordInputUI';

import { SIGNIN_TEST_ID } from '@src/_test/signin/util/testId';
import { ELangType } from '@lib/constants/enums';
import AppleSignInButton from './AppleSignInButton';

interface SignInComponentProps {
  onSignInSuccess?: () => void;
  onClose?: () => void;
  noMargin?: boolean;
}

export function SignInComponent({
  onSignInSuccess,
  onClose,
  noMargin,
}: SignInComponentProps) {
  const { onSubmit, errorMsg, isSignInSuccess, errorPwMsg } =
    useSignInController({ onSuccess: onSignInSuccess });
  const navigate = useNavigate();
  const { t, i18n } = useTranslator();
  const savedEmail = getSavedEmail();
  const [email, setEmail] = useState(savedEmail || '');
  const [password, setPassword] = useState('');
  const [isSaveIdChecked, setIsSaveIdChecked] = useState(
    savedEmail ? true : false,
  );
  const [recentSignInType, setRecentSignInType] = useState<
    SignUpType | undefined
  >(undefined);
  // 폴란드 로케일 + 앱 접근일 때만 카카오 로그인을 숨긴다
  const hideKakaoSignIn =
    isModiApp() && i18n.language.toLowerCase() === ELangType.PL;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePasswordClick = () => {
    onClose?.();
    navigate('/change-password');
  };
  const handleSignUpClick = () => {
    onClose?.();
    navigate('/signup');
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    await onSubmit(email, password);
  };

  useEffect(() => {
    if (isSignInSuccess) {
      if (isSaveIdChecked) {
        storeSavedEmail(email);
      } else {
        removeSavedEmail();
      }
    }
  }, [isSignInSuccess, isSaveIdChecked, email]);

  useEffect(() => {
    const signUpType = getRecentSignInType();
    setRecentSignInType(signUpType);
  }, []);

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center w-[318px] mx-auto${
          noMargin ? '' : ' mt-[58px]'
        }`}
      >
        <form className="w-full">
          <div className="h5-b mb-10">{t('SIGN_IN')}</div>
          <div className="justify-start">
            <div className="p3-r mb-2.5">{t('ID')}</div>
            <InputUI
              type="text"
              defaultValue={email}
              onChange={handleEmailChange}
              errorMessage={errorMsg}
              placeholder={t('ENTER_EMAIL')}
              data-testid={SIGNIN_TEST_ID.EMAIL_INPUT}
            />
          </div>
          <div className="h-7" />
          <div className="justify-start  mb-7">
            <div className="p3-r mb-2.5">{t('PASSWORD')}</div>
            <PasswordInputUI
              value={password}
              isRequired
              isVisibleToggle
              onValueChange={setPassword}
              errorMessage={errorPwMsg}
              placeholder={t('ENTER_PW')}
              data-testid={SIGNIN_TEST_ID.PW_INPUT}
            />
          </div>
          <CheckboxUI
            isSelected={isSaveIdChecked}
            onValueChange={setIsSaveIdChecked}
          >
            <div className="p6-r">{t('SAVE_ID')}</div>
          </CheckboxUI>
          <div className="h-5" />
          <ButtonUI
            size="lg"
            className="w-full h-[46px]"
            type="submit"
            color="primary"
            onClick={handleSubmit}
            data-testid={SIGNIN_TEST_ID.LOGIN_BUTTON}
          >
            <div className="p3-b">{t('SIGN_IN')}</div>
          </ButtonUI>
        </form>
        <div className="flex items-center my-7 w-full">
          <div className="flex-grow">
            <Divider className="w-full" />
          </div>
          <div className="p5-r text-font-sub_2 mx-[32px] whitespace-nowrap">
            {t('OR')}
          </div>
          <div className="flex-grow">
            <Divider className="w-full" />
          </div>
        </div>

        <div className="flex-col">
          {!hideKakaoSignIn && (
            <KakaoSignInButton
              isLastSigned={recentSignInType === SignUpType.Kakao}
            />
          )}

          <div className="w-[28px]" />

          <GoogleSignInButton
            isLastSigned={recentSignInType === SignUpType.Google}
            onSuccess={onClose}
          />

          <AppleSignInButton
            isLastSigned={recentSignInType === SignUpType.Apple}
          />
        </div>

        <div className="flex items-center justify-center gap-[57px]">
          <button onClick={handleChangePasswordClick}>
            <div className="p5-r">{t('CHANGE_PW')}</div>
          </button>
          <div className="bg-gray-300 w-[1px] h-[14px]"></div>
          <button onClick={handleSignUpClick}>
            <div className="p5-r">{t('GNB_SIGN_UP')}</div>
          </button>
        </div>
      </div>
    </>
  );
}
