import { Button, Tooltip } from '@nextui-org/react';
import React from 'react';
import { SignUpType } from '@services/gen/gen';
import { useSocialSignInController } from '@hooks/user/useSocialSignInController';
import { useGoogleAuth } from '@src/components/hooks/useGoogleAuth';
import useTranslator from '@hooks/useTranslator';
import { useNavigate } from 'react-router-dom';
import { getIsPortal } from '@lib/utils/utils';

interface GoogleSignInButtonProps {
  isLastSigned: boolean;
  onSuccess?: () => void;
}

export default function GoogleSignInButton({
  isLastSigned,
  onSuccess,
}: GoogleSignInButtonProps) {
  const { onSignIn } = useSocialSignInController({ onSuccess });
  const { t } = useTranslator();
  const navigate = useNavigate();
  const isPortal = getIsPortal();

  const { googleSignIn } = useGoogleAuth({
    onSuccess: onSuccessSignInAuthcode,
    onError: onErrorSignInAuthcode,
  });

  const handleGoogleClick = () => {
    googleSignIn();
  };

  function onSuccessSignInAuthcode(code: string) {
    onSignIn({
      code: code,
      socialType: SignUpType.Google,
    });
  }

  function onErrorSignInAuthcode() {
    alert(t('COMMON_ERROR_MSG'));
  }

  return (
    <>
      <Tooltip
        isOpen={isLastSigned}
        showArrow={true}
        placement="top-end"
        offset={-15}
        content={
          <div className="px-1 py-2">
            <div className="p8-r text-font-sub">{t('PREV_LOGIN')}</div>
          </div>
        }
      >
        <Button
          onClick={handleGoogleClick}
          variant="bordered"
          className="rounded-[10px] bg-[white] border-[#747775] w-[318px] h-[46px] mb-4"
        >
          <img src="/assets/sns/google-logo.svg" alt="google-logo" />
          <div className="p6-r">{t('GOOGLE_LOGIN')}</div>
        </Button>
      </Tooltip>
    </>
  );
}
