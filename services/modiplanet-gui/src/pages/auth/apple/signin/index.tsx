import React, { useEffect } from 'react';

import Loading from '@components/ui_old/loading/loading';

import { useQs } from '@components/hooks/useQs';

import { SignUpType } from '@services/gen/gen';
import { useSocialSignInController } from '@src/components/hooks/user/useSocialSignInController';
import { useNavigate } from 'react-router-dom';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import { getIsPortal } from '@lib/utils/utils';

function AppleSignInPage() {
  const {
    path: { code },
  } = useQs();
  const { onSignIn, errorMsg } = useSocialSignInController();
  const navigate = useNavigate();
  const isPortal = getIsPortal();

  const loginSocialUser = async () => {
    await onSignIn({
      socialType: SignUpType.Apple,
      code: code,
    });
  };

  const onClickOk = () => {
    navigate(isPortal ? '/portal/signin' : '/signin');
  };

  useEffect(() => {
    loginSocialUser();
  }, []);

  return (
    <>
      <Loading />

      <CModalOneButton
        isOpen={!!errorMsg}
        onClickOk={onClickOk}
        hideCloseButton
      >
        <div className="mt-[30px] mb-[60px]">{errorMsg}</div>
      </CModalOneButton>
    </>
  );
}

export default AppleSignInPage;
