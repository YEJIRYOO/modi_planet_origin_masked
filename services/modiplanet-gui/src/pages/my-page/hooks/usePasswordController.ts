import { useState } from 'react';
import { useChangePassword } from '@src/services/api/user/useChangePassword';
import { useProfileLazy } from '@services/api';
import { useProfileStore } from '@src/store/zustand';
import { Errorhandler } from '@lib/utils/error';
import useTranslator from '@hooks/useTranslator';
import { debounce } from 'lodash';

export const usePasswordController = () => {
  const { changePassword } = useChangePassword();
  const { getProfile } = useProfileLazy();
  const setProfile = useProfileStore((state) => state.setProfile);
  const [errorMsg, setErrorMsg] = useState('');
  const [prevPWErrorMsg, setPrevPWErrorMsg] = useState('');
  const { t } = useTranslator();

  const onSubmit = debounce(
    (
      currentPassword: string,
      newPassword: string,
      onCompleted?: () => void,
    ) => {
      changePassword({
        currentPassword,
        newPassword,
        onCompleted: () => {
          onCompletedUpdateProfile();
          onCompleted && onCompleted();
        },
        onError: onErrorUpdateProfile,
      });
    },
    300,
  );

  const onCompletedUpdateProfile = () => {
    getProfile({
      onCompleted: setProfile,
      onError: onErrorGetProfile,
    });
  };

  const onErrorUpdateProfile = (error) => {
    const handler = new Errorhandler(error);

    const codes = handler.getCodes();

    switch (codes[0]) {
      case 10007: {
        setErrorMsg('');
        setPrevPWErrorMsg(t('NO_MATCHING_PREV_PW'));
        break;
      }
      case 10015: {
        setErrorMsg(t('ALREADY_USED_PW'));
        break;
      }
      default: {
        setErrorMsg(t('COMMON_ERROR_MSG'));
        break;
      }
    }
  };

  const onErrorGetProfile = (error) => {
    console.error('프로필 fetch 에러:', error);
  };

  const onClearErrorMsg = () => {
    setErrorMsg('');
    setPrevPWErrorMsg('');
  };

  return { onSubmit, errorMsg, prevPWErrorMsg, onClearErrorMsg };
};
