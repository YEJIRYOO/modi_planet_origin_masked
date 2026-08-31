import { useState } from 'react';
import SignUpForm from './SignUpFormEmail';
import SignUpTerms from '../shared/SignUpTerms';
import calculateAge from '../shared/calculate-age';
import { useSignUpController } from '@hooks/user/useSignUpController';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import { useNavigate } from 'react-router-dom';
import { getIsPortal } from '@lib/utils/utils';

export default function SignUpEmailPage() {
  const [ageType, setAgeType] = useState<'adult' | 'child' | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    birthdate: '',
    privacyPolicyConsent: false,
    termsOfServiceConsent: false,
    personalInfoConsent: false,
    emailMarketingConsent: false,
  });
  const { onSubmit, errorMsg } = useSignUpController();
  const navigate = useNavigate();
  const isPortal = getIsPortal();

  const onClickOk = () => {
    navigate(isPortal ? '/portal/signin' : '/signin');
  };

  const handleCalculateAge = (birth: string) => {
    const age = calculateAge(birth);
    setAgeType(age);
  };

  const handleFormSubmit = (newData: {
    email: string;
    password: string;
    birthdate: string;
  }) => {
    setFormData((prev) => ({ ...prev, ...newData }));
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
    setFormData((prev) => ({
      ...prev,
      privacyPolicyConsent,
      termsOfServiceConsent,
      personalInfoConsent,
      emailMarketingConsent,
    }));

    const signUpInput = {
      ...formData,
      privacyPolicyConsent,
      termsOfServiceConsent,
      personalInfoConsent,
      emailMarketingConsent,
      ...(ageType === 'child' && {
        protector: {
          email: protectorEmail,
          authCode: protectorAuthCode,
        },
      }),
    };

    await onSubmit(signUpInput);
  };

  return (
    <>
      {currentPageIndex === 0 ? (
        <SignUpForm
          handleCalculateAge={handleCalculateAge}
          setCurrentPage={setCurrentPageIndex}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <SignUpTerms
          ageType={ageType}
          onSubmit={handleTermsSubmit}
          notAllowedEmail={formData.email}
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
