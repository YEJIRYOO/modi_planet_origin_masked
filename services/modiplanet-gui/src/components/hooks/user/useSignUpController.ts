import { useNavigate } from 'react-router-dom';
import { useSignIn } from '@services/api';
import { emailSignUpArg, useSignUp } from '@services/api/user/useSignUp';
import { useProfileLazy } from '@services/api';
import { useProfileStore } from '@src/store/zustand';
import { ProfileModel } from '@services/client-model/user';
import { getIsPortal, isModiApp, redirectToAppScheme } from '@lib/utils/utils';
import PostMessageSender from '@src/lib/utils/PostMessageSender';
import { useSessionOnetimeCode } from '@src/services/api/user/useSessionOnetimeCode';
import { useState } from 'react';
import { ApolloError } from '@apollo/client';
import { Errorhandler } from '@lib/utils/error';
import useTranslator from '../useTranslator';

export const useSignUpController = () => {
  const navigate = useNavigate();
  const { t } = useTranslator();

  const { emailSignUp } = useSignUp();
  const { getProfile } = useProfileLazy();
  const setProfile = useProfileStore((state) => state.setProfile);
  const isPortal = getIsPortal();
  const postMessageSender = PostMessageSender.getInstance();
  const { sessionOnetimeCode } = useSessionOnetimeCode();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (signUpInput: emailSignUpArg['input']) => {
    await emailSignUp({
      input: signUpInput,
      onCompleted: onCompletedSignUp,
      onError: onErrorSignUp,
    });
  };

  const onCompletedSessionOnetimeCodeForApp = (data: any) => {
    const code = data?.sessionOnetimeCode?.code;

    if (code) {
      redirectToAppScheme(`letsmodi://auth/login#code=${code}`);
    }
  };

  const onCompletedSignUp = async () => {
    await getProfile({
      onCompleted: onCompletedGetProfile,
      onError: onErrorGetProfile,
    });
  };

  const onCompletedGetProfile = async (profile: ProfileModel) => {
    setProfile({ ...profile });

    if (isModiApp()) {
      await sessionOnetimeCode({
        onCompleted: onCompletedSessionOnetimeCodeForApp,
        onError: (error) => {
          console.error('세션 코드 가져오기 실패:', error);
        },
      });

      return;
    }

    if (isPortal) {
      postMessageSender.sendProfile({
        profile: profile,
        targetWindow: window.opener,
      });
      window.close();

      return;
    }

    navigate('/');
  };

  const onErrorSignUp = (error: ApolloError) => {
    console.error('회원가입 에러:', error);

    const handler = new Errorhandler(error);
    const codes = handler.getCodes();
    const messages = handler.getMessages();

    switch (codes[0]) {
      case 10021: {
        setErrorMsg(t('DELETED_ACCOUNT_MSG'));
        break;
      }
      default: {
        setErrorMsg(messages[0] || t('COMMON_ERROR_MSG'));
        break;
      }
    }
  };

  const onErrorGetProfile = (error) => {
    console.error('프로필 fetch 에러:', error);
  };

  return {
    onSubmit,
    errorMsg,
  };
};
