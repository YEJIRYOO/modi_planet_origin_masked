import {
  socialSignUpArg,
  useProfileLazy,
  useSocialSignUp,
} from '@services/api';
import { useProfileStore } from '@src/store/zustand';
import { useNavigate } from 'react-router-dom';
import { ProfileModel } from '@services/client-model/user';
import { SignUpType } from '@src/services/gen/gen';
import {
  getIsPortal,
  isModiApp,
  redirectToAppScheme,
  storeRecentSignInType,
} from '@lib/utils/utils';
import useTranslator from '../useTranslator';
import PostMessageSender from '@src/lib/utils/PostMessageSender';
import { useSessionOnetimeCode } from '@src/services/api/user/useSessionOnetimeCode';
import { useState } from 'react';
import { ApolloError } from '@apollo/client';
import { Errorhandler } from '@lib/utils/error';

export const useSocialSignUpController = () => {
  const navigate = useNavigate();

  const { socialSignUp } = useSocialSignUp();
  const { getProfile } = useProfileLazy();
  const setProfile = useProfileStore((state) => state.setProfile);
  const isPortal = getIsPortal();
  const postMessageSender = PostMessageSender.getInstance();
  const { t } = useTranslator();
  const { sessionOnetimeCode } = useSessionOnetimeCode();
  const [errorMsg, setErrorMsg] = useState('');

  const onSignUpSocial = async (input: socialSignUpArg['input']) => {
    await socialSignUp({
      input,
      onCompleted: () => onCompletedSignUpSocial(input.signUpType),
      onError: onErrorSignUpSocial,
    });
  };

  const onCompletedSessionOnetimeCodeForApp = (data: any) => {
    const code = data?.sessionOnetimeCode?.code;

    if (code) {
      redirectToAppScheme(`letsmodi://auth/login#code=${code}`);
    }
  };

  const onCompletedSignUpSocial = async (signUpType: SignUpType) => {
    storeRecentSignInType(signUpType);

    await getProfile({
      onCompleted: onCompletedGetProfile,
      onError: onErrorGetProfile,
    });
  };

  const onCompletedGetProfile = async (profile: ProfileModel) => {
    setProfile({
      ...profile,
    });

    if (isModiApp()) {
      await sessionOnetimeCode({
        onCompleted: onCompletedSessionOnetimeCodeForApp,
        onError: (error) => {
          console.error('Failed to get session onetime code:', error);
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

  const onErrorSignUpSocial = (error: ApolloError) => {
    console.error('소셜 회원가입 에러:', error);

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
    onSignUpSocial,
    errorMsg,
  };
};
