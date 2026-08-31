import { useCallback, useState } from 'react';
import { useUpdateUser } from '@src/services/api/user/useUpdateUser';
import { useProfileLazy } from '@services/api';
import { useProfileStore } from '@src/store/zustand';
import { ProfileModel } from '@services/client-model/user';

import debounce from 'lodash/debounce';

export const useMarketingController = () => {
  const { updateUser } = useUpdateUser();
  const { getProfile } = useProfileLazy();
  const setProfile = useProfileStore((state) => state.setProfile);
  const [updatedAt, setUpdatedAt] = useState(null);

  const onSubmit = useCallback(
    debounce((smsMarketingConsent: boolean, emailMarketingConsent: boolean) => {
      updateUser({
        smsMarketingConsent,
        emailMarketingConsent,
        onCompleted: onCompletedUpdateUser,
        onError: onErrorUpdateUser,
      });
    }, 300),
    [],
  );

  const onCompletedUpdateUser = async (data) => {
    if (data && data.updateUser) {
      setUpdatedAt(data.updateUser.marketingConsentUpdatedAt);
    }

    getProfile({
      onCompleted: onCompletedGetProfile,
      onError: onErrorGetProfile,
    });
  };

  const onCompletedGetProfile = (profile: ProfileModel) => {
    setProfile(profile);
  };

  const onErrorUpdateUser = (error) => {
    console.error('유저 업데이트 에러:', error);
  };

  const onErrorGetProfile = (error) => {
    console.error('프로필 fetch 에러:', error);
  };

  return { onSubmit, updatedAt };
};
