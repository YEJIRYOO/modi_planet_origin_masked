import { Button, Tooltip } from '@nextui-org/react';
import useTranslator from '@hooks/useTranslator';
import { useNavigate } from 'react-router-dom';
import { APPLE_0AUTH_ID, APPLE_REDIRECT_URL } from '@lib/constants/urls';

interface AppleSignInButtonProps {
  isLastSigned: boolean;
}

export default function AppleSignInButton({
  isLastSigned,
}: AppleSignInButtonProps) {
  const { t } = useTranslator();
  const navigate = useNavigate();

  const handleAppleClick = () => {
    const params = new URLSearchParams({
      response_type: 'code',
      response_mode: 'query',
      client_id: APPLE_0AUTH_ID || '',
      redirect_uri:
        APPLE_REDIRECT_URL || `${window.location.origin}/auth/apple/signin`,
      state: 'apple-signin',
    });
    window.location.href = `https://appleid.apple.com/auth/authorize?${params.toString()}`;
  };

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
          onClick={handleAppleClick}
          variant="bordered"
          className="relative rounded-[10px] bg-black border-[#747775] w-[318px]
  h-[46px] mb-[33.5px]"
        >
          <div className="flex items-center justify-center">
            <img
              src="/assets/sns/apple-logo.svg"
              alt="apple-logo"
              className="pr-1"
            />
            <div className="p6-r text-white">{t('APPLE_LOGIN')}</div>
          </div>
        </Button>
      </Tooltip>
    </>
  );
}
