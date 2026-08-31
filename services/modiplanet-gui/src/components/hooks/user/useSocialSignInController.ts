import {
  SocialSignInRes,
  useProfileLazy,
  useSocialSignIn,
} from '@services/api';
import { SignUpType } from '@services/gen/gen';
import { useNavigate } from 'react-router-dom';
import useTranslator from '@hooks/useTranslator';
import {
  getIsPortal,
  isModiApp,
  redirectToAppScheme,
  storeRecentSignInType,
  storeSignUpEmail,
  storeSignUpSocialId,
  storeSignUpSocialType,
} from '@lib/utils/utils';
import { ApolloError } from '@apollo/client';
import { Errorhandler } from '@lib/utils/error';
import { ProfileModel } from '@services/client-model/user';
import { useProfileStore } from '@src/store/zustand';
import { useState } from 'react';
import PostMessageSender from '@src/lib/utils/PostMessageSender';
import { useSessionOnetimeCode } from '@src/services/api/user/useSessionOnetimeCode';

export const useSocialSignInController = (options?: {
  onSuccess?: () => void;
}) => {
  const { onSocialSignIn, error } = useSocialSignIn();
  const { t } = useTranslator();
  const navigate = useNavigate();
  const { getProfile } = useProfileLazy();
  const setProfile = useProfileStore((state) => state.setProfile);
  const [errorMsg, setErrorMsg] = useState('');
  const postMessageSender = PostMessageSender.getInstance();
  const { sessionOnetimeCode } = useSessionOnetimeCode();
  const isPortal = getIsPortal();

  const onSignIn = async ({
    socialType,
    code,
  }: {
    socialType: SignUpType;
    code: string;
  }) => {
    await onSocialSignIn({
      code: code,
      socialType: socialType,
      onCompleted: (res) => onCompletedSocialSignIn(res, socialType),
      onError: onError,
    });
  };

  async function onCompletedSocialSignIn(
    res: SocialSignInRes,
    socialType: SignUpType,
  ) {
    if (res.success) {
      /** 기존 유저 */
      await getProfile({
        onCompleted: (res) => onCompletedGetProfile(res, socialType),
        onError: onError,
      });
    } else {
      /** 미가입 유저 */
      storeSignUpSocialType(socialType);
      storeSignUpSocialId(res.userInfo?.userId);
      storeSignUpEmail(res.userInfo?.email);
      options?.onSuccess?.();
      navigate('/signup/social');
    }
  }

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

  async function onCompletedGetProfile(
    profile: ProfileModel,
    socialType: SignUpType,
  ) {
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
    storeRecentSignInType(socialType);
    options?.onSuccess?.();
    navigate('/');
  }

  function onError(error: ApolloError) {
    // TODO :중복된 이메일, invalid 토큰 등등 에러

    const handler = new Errorhandler(error);

    const codes = handler.getCodes();
    const messages = handler.getMessages();

    switch (codes[0]) {
      case 10012: {
        setErrorMsg(
          t('ALREADY_SIGNED_EMAIL') + '\n' + t('ALREADY_SIGNED_EMAIL2'),
        );
        break;
      }
      case 10021: {
        setErrorMsg(t('DELETED_ACCOUNT_MSG'));
        break;
      }
      default: {
        setErrorMsg(messages[0]);
        break;
      }
    }
  }

  return {
    onSignIn,
    error,
    errorMsg,
  };
};
