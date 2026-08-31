import Loading from '@components/ui_old/loading/loading';
import { useQs } from '@hooks/useQs';
import { useSocialSignInController } from '@hooks/user/useSocialSignInController';
import { SignUpType } from '@services/gen/gen';
import { useEffect } from 'react';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import { useNavigate } from 'react-router-dom';
import { getIsPortal } from '@lib/utils/utils';

function GoogleSignInPage() {
  const { path } = useQs();
  const { code, error } = path;
  const { onSignIn, errorMsg } = useSocialSignInController();
  const navigate = useNavigate();
  const isPortal = getIsPortal();

  const loginSocialUser = async () => {
    if (error && error === 'access_denied') {
      navigate('/signin');
      return;
    }
    if (code === undefined) {
      return;
    }
    await onSignIn({
      socialType: SignUpType.Google,
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

export default GoogleSignInPage;
