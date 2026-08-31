import { useEffect, useState } from 'react';
import SignUpTerms from '../shared/SignUpTerms';
import calculateAge from '../shared/calculate-age';
import SignUpFormSocial from '@src/pages/sign-up/social/SignUpFormSocial';
import { useSocialSignUpController } from '@hooks/user/useSocialSignUpController';
import {
  getIsPortal,
  getSignUpEmail,
  getSignUpSocialId,
  getSignUpSocialType,
  removeSignUpSocialId,
  removeSignUpSocialType,
} from '@lib/utils/utils';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import { useNavigate } from 'react-router-dom';

export default function SignUpSocialPage() {
  const [ageType, setAgeType] = useState<'adult' | 'child' | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [birthdate, setBirtdate] = useState('');

  const { onSignUpSocial, errorMsg } = useSocialSignUpController();
  const socialType = getSignUpSocialType();
  const socialId = getSignUpSocialId();
  const socialEmail = getSignUpEmail();
  const navigate = useNavigate();
  const isPortal = getIsPortal();

  const onClickOk = () => {
    navigate(isPortal ? '/portal/signin' : '/signin');
  };

  const handleFormSubmit = (birthdate: string) => {
    const age = calculateAge(birthdate);
    setAgeType(age);
    setBirtdate(birthdate);
    setCurrentPageIndex(1);
  };

  const handleTermsSubmit = async ({
    privacyPolicyConsent,
    termsOfServiceConsent,
    personalInfoConsent,
    emailMarketingConsent,
    protectorEmail,
    protectorAuthCode,
  }: {
    privacyPolicyConsent: boolean;
    termsOfServiceConsent: boolean;
    personalInfoConsent: boolean;
    emailMarketingConsent: boolean;
    protectorEmail: string;
    protectorAuthCode: string;
  }) => {
    const signUpInput = {
      privacyPolicyConsent,
      termsOfServiceConsent,
      personalInfoConsent,
      emailMarketingConsent,
      socialId: socialId || '',
      signUpType: socialType as any,
      birthdate: birthdate,
      ...(ageType === 'child' && {
        protector: {
          email: protectorEmail,
          authCode: protectorAuthCode,
        },
      }),
    };

    await onSignUpSocial(signUpInput);
  };

  useEffect(() => {
    return () => {
      removeSignUpSocialType();
      removeSignUpSocialId();
    };
  }, []);

  return (
    <>
      {currentPageIndex === 0 ? (
        <SignUpFormSocial onClickNext={handleFormSubmit} />
      ) : (
        <SignUpTerms
          ageType={ageType}
          onSubmit={handleTermsSubmit}
          notAllowedEmail={socialEmail}
        />
      )}

      <CModalOneButton
        isOpen={!!errorMsg}
        onClickOk={onClickOk}
        hideCloseButton
      >
        <div className="mt-[30px] mb-[60px] sm:mt-[20px] sm:mb-[40px]">
          {errorMsg}
        </div>
      </CModalOneButton>
    </>
  );
}
