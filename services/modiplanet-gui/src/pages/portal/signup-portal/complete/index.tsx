import Button from '@components/ui_old/button/button';
import { useNavigate } from 'react-router-dom';
import useTranslator from '@hooks/useTranslator';
import React from 'react';

function SignupPortalCompletePage() {
  const navigate = useNavigate();
  const { t } = useTranslator();
  const onClick = () => {
    navigate('/portal/signin');
  };
  return (
    <div className="h-full flex-center py-[200px]">
      <div className="flex-center flex-col text-center">
        <div className="w-[144px] h-[144px] mb-12 sm:w-[68px] sm:h-[68px] sm:mb-5">
          <img
            className="w-full h-full align-top"
            src="/assets/course/complete/check.svg"
            alt="check"
          />
        </div>

        <div className="mb-[60px] text-26 font-semibold sm:text-18 sm:mb-10">
          <p>{t('THANKS_FOR_SIGNUP')}</p>
        </div>

        <Button
          isRound
          onClick={onClick}
          className="group sm:w-[174px] w-[230px]"
          color="primary"
        >
          <span className="text-18 sm:text-16 whitespace-nowrap sm:mr-[10px]">
            {t('SIGN_IN')}
          </span>
        </Button>
      </div>
    </div>
  );
}

export default SignupPortalCompletePage;
