import { Fragment } from 'react';

import Label from '@components/ui_old/form/label';
import InputWrapper from '@components/ui_old/form/input-wrapper';

import useTranslator from '@hooks/useTranslator';
import { SignUpTypeModel } from '@services/client-model/user';

interface UserSignupTypeProps {
  signupType: SignUpTypeModel;
}
export function UserSignupType({ signupType }: UserSignupTypeProps) {
  const { t } = useTranslator();

  const renderSignupType = () => {
    switch (signupType) {
      case 'EMAIL':
        return t('REGULAR_MEMBER');
      case 'GOOGLE':
        return (
          <img
            className="inline-block w-[24px]"
            src="/assets/mypage/google-icon.png"
            alt="Google"
          />
        );
      case 'KAKAO':
        return (
          <img
            className="inline-block w-[24px]"
            src="/assets/mypage/kakao-icon.png"
            alt="Kakao"
          />
        );
      case 'APPLE':
        return (
          <img
            className="inline-block w-[24px]"
            src="/assets/mypage/apple-icon.png"
            alt="Apple"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <InputWrapper className="flex items-center justify-between my-14 sm:my-6 sm:items-start">
        <div className="flex items-center sm:flex-col sm:justify-start sm:items-start">
          <Label htmlFor="phone" className="w-[130px] p3-b sm:mb-4">
            {t('SIGN_UP2')}
          </Label>
          {renderSignupType()}
        </div>
      </InputWrapper>
    </Fragment>
  );
}

export default UserSignupType;
