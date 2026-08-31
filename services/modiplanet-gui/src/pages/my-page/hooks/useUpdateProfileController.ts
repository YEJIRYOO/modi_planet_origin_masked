import { useUpdateProfile } from '@services/api/user/useUpdateProfile';
import { useProfileLazy } from '@services/api';
import { useProfileStore } from '@src/store/zustand';
import { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';
import { ProfileModel } from '@services/client-model/user';
import { Errorhandler } from '@lib/utils/error';
import useTranslator from '@hooks/useTranslator';
import { ApolloError } from '@apollo/client';

export const useUpdateProfileController = () => {
  const { updateProfile } = useUpdateProfile();
  const { getProfile } = useProfileLazy();
  const setProfile = useProfileStore((state) => state.setProfile);
  const { t } = useTranslator();
  const [nicknameErrorMsg, setNicknameErrorMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = useCallback(
    debounce(
      (input: {
        birthdate?: string;
        name?: string;
        nickname?: string;
        phoneNumber?: string;
        countryCallingCode?: string;
        thumbnailUrl?: string;
        codingExperienceTypeList?: string[];
        onCompleted?: () => void;
        onError?: (msg: string) => void;
      }) => {
        updateProfile({
          ...input,
          onCompleted: () => onCompletedUpdateProfile(input.onCompleted),
          onError: (error) => {
            const msg = onErrorUpdateProfile(error);
            input.onError && input.onError(msg);
          },
        });
      },
      300,
    ),
    [],
  );

  const onCompletedUpdateProfile = (onCompleted?: () => void) => {
    getProfile({
      onCompleted: (profile: ProfileModel) => {
        onCompletedGetProfile(profile, onCompleted);
      },
      onError: onErrorGetProfile,
    });
  };

  const onCompletedGetProfile = (
    profile: ProfileModel,
    onCompleted?: () => void,
  ) => {
    setProfile(profile);
    if (onCompleted) {
      onCompleted();
    }
  };

  const onErrorUpdateProfile = (error: ApolloError) => {
    const handler = new Errorhandler(error);
    const codes = handler.getCodes();
    let msg = t('COMMON_ERROR_MSG');

    switch (codes[0]) {
      case 409: {
        msg = t('ALREADY_NICKNAME');
        setNicknameErrorMsg(t('ALREADY_NICKNAME'));
        break;
      }
      default: {
        setErrorMsg(t('COMMON_ERROR_MSG'));
        break;
      }
    }

    return msg;
  };

  const onErrorGetProfile = (error: ApolloError) => {
    console.error('프로필 fetch 에러:', error);
  };

  return { onSubmit, nicknameErrorMsg, errorMsg };
};
