import { Button, Tooltip } from '@nextui-org/react';
import React from 'react';
import { KAKAO_AUTH_URL } from '@lib/constants/urls';
import useTranslator from '@hooks/useTranslator';

interface KakaoSignInButtonProps {
  isLastSigned: boolean;
}

export default function KakaoSignInButton({
  isLastSigned,
}: KakaoSignInButtonProps) {
  const { t, i18n } = useTranslator();

  const handleKakaoClick = () => {
    window.location.replace(`${KAKAO_AUTH_URL}&lang=${i18n.language}`);
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
          onClick={handleKakaoClick}
          className="rounded-[10px] bg-[#FEE500] w-[318px] h-[46px] mb-4"
        >
          <img
            src="/assets/sns/kakao-logo.svg"
            alt="kakao-logo"
            className="w-[22px] h-[22px]"
          />
          <div className="p6-r">{t('KAKAO_LOGIN')}</div>
        </Button>
      </Tooltip>
    </>
  );
}
