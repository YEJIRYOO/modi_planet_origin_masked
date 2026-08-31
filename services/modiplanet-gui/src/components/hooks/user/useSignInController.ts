import { useNavigate, useLocation } from 'react-router-dom';
import { useFirebaseEvent } from '@components/provider/firebase-provider';
import { useProfileLazy, useSignIn } from '@services/api';
import { useProfileStore } from '@src/store/zustand';
import { ProfileModel } from '@services/client-model/user';
import { useState } from 'react';
import { ApolloError } from '@apollo/client';
import { Errorhandler } from '@lib/utils/error';
import useTranslator from '@hooks/useTranslator';
import { getIsPortal, isModiApp, redirectToAppScheme } from '@lib/utils/utils';
import PostMessageSender from '@src/lib/utils/PostMessageSender';
import { Validator } from '@src/pages/sign-up/shared/validator';
import { useSessionOnetimeCode } from '@src/services/api/user/useSessionOnetimeCode';

export const useSignInController = (options?: { onSuccess?: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslator();
  const { signInCompleteLog } = useFirebaseEvent();
  const { sessionOnetimeCode } = useSessionOnetimeCode();
  const { signIn } = useSignIn();
  const { getProfile } = useProfileLazy();
  const setProfile = useProfileStore((state) => state.setProfile);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorPwMsg, setErrorPwMsg] = useState('');
  const [isSignInSuccess, setIsSignInSuccess] = useState(false);
  const isPortal = getIsPortal();
  const postMessageSender = PostMessageSender.getInstance();

  const onSubmit = async (email: string, password: string) => {
    if (!validateIdAndPw(email, password)) return;

    await signIn({
      email: email,
      password: password,
      onCompleted: onCompletedSignin,
      onError: onErrorSignin,
    });
  };

  const onCompletedSignin = async () => {
    signInCompleteLog();
    setIsSignInSuccess(true);

    await getProfile({
      onCompleted: onCompletedGetProfile,
      onError: onErrorSignin,
    });
  };

  const onCompletedSessionOnetimeCodeForApp = (data: any) => {
    const code = data?.sessionOnetimeCode?.code;
    if (code) {
      redirectToAppScheme(`letsmodi://auth/login#code=${code}`);
    }
  };

  const createOnCompletedSessionOnetimeCodeForPortal = (
    profile: ProfileModel,
  ) => {
    return (data: any) => {
      const code = data?.sessionOnetimeCode?.code;
      if (code && window.opener) {
        postMessageSender.sendProfile({
          profile: profile,
          targetWindow: window.opener,
          code: code,
        });
        window.close();
      }
    };
  };

  const onCompletedGetProfile = async (profile: ProfileModel) => {
    // 앱에서 요청한 경우
    if (isModiApp()) {
      await sessionOnetimeCode({
        onCompleted: onCompletedSessionOnetimeCodeForApp,
        onError: (error) => {
          console.error('Failed to get session onetime code:', error);
        },
      });
      return;
    }

    // Portal에서 요청한 경우 (postMessage로 전송)
    if (isPortal) {
      await sessionOnetimeCode({
        onCompleted: createOnCompletedSessionOnetimeCodeForPortal(profile),
        onError: (error) => {
          console.error('Failed to get session onetime code:', error);
        },
      });
      return;
    }

    // 일반 웹 로그인: AlarmPopover에서 자동으로 토큰 초기화 수행
    setProfile({
      ...profile,
    });
    if (options?.onSuccess) {
      options.onSuccess();
      return;
    }
    const from = (location.state as { from?: string })?.from;
    navigate(from || '/');
  };

  const onErrorSignin = (error: ApolloError) => {
    /** 로그인 , 프로필 에러처리 */

    const handler = new Errorhandler(error);
    setIsSignInSuccess(false);

    const codes = handler.getCodes();

    switch (codes[0]) {
      case 10007: {
        setErrorMsg('');
        setErrorPwMsg(t('NO_MATCHING_PW'));
        break;
      }
      case 10012: {
        setErrorMsg(t('ALREADY_SIGNED_EMAIL2'));
        setErrorPwMsg('');
        break;
      }
      case 404:
      case 400: {
        setErrorMsg(t('NO_MATCHING_ID'));
        setErrorPwMsg('');
        break;
      }
      default: {
        setErrorMsg(t('COMMON_ERROR_MSG'));
        setErrorPwMsg('');
        break;
      }
    }
  };

  const validateIdAndPw = (id: string, pw: string) => {
    const isEmptyEmail = !id;
    const isEmptyPW = !pw;

    switch (true) {
      case isEmptyEmail && isEmptyPW:
        setErrorMsg(t('ENTER_EMAIL'));
        setErrorPwMsg(t('ENTER_PW'));
        return false;
      case isEmptyPW:
        setErrorPwMsg(t('ENTER_PW'));
        setErrorMsg('');
        return false;
      case isEmptyEmail:
        setErrorMsg(t('ENTER_EMAIL'));
        setErrorPwMsg('');
        return false;
      case !Validator.validateEmail(id):
        setErrorMsg(t('NOT_REGISTED_EMAIL'));
        setErrorPwMsg('');
        return false;
      case !Validator.validatePasswordError(pw):
        setErrorMsg('');
        setErrorPwMsg(t('ENTER_INPUT_8TO20'));
        return false;
      default:
        return true;
    }
  };

  return {
    onSubmit,
    errorMsg,
    errorPwMsg,
    isSignInSuccess,
  };
};
