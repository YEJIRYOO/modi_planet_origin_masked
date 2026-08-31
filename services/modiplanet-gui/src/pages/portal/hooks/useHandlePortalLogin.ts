import { getIsPortal } from '@lib/utils/utils';
import { useEffect } from 'react';
import { EStorageKey } from '@lib/constants/enums';

const useHandlePortalLogin = () => {
  const isPortal = getIsPortal();

  useEffect(() => {
    if (!window.opener) {
      sessionStorage.removeItem(EStorageKey.IS_PORTAL);
    }
  }, []);

  return {
    isPortal,
  };
};

export default useHandlePortalLogin;
