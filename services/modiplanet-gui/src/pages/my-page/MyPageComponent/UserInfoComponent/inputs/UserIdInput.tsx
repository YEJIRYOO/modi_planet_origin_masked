import Label from '@components/ui_old/form/label';
import InputWrapper from '@components/ui_old/form/input-wrapper';

import useTranslator from '@hooks/useTranslator';
import { maskUserInfo } from '../maskUserInfo';
import { SignUpTypeModel } from '@services/client-model/user';

interface UserIdInputProps {
  id: string;
  signupType: SignUpTypeModel;
}

export function UserIdInput({ id, signupType }: UserIdInputProps) {
  const { t } = useTranslator();

  const renderSignupIcon = () => {
    switch (signupType) {
      case 'GOOGLE':
        return (
          <img
            className="inline-block w-[24px] mr-2"
            src="/assets/mypage/google-icon.png"
            alt="Google"
          />
        );
      case 'KAKAO':
        return (
          <img
            className="inline-block w-[24px] mr-2"
            src="/assets/mypage/kakao-icon.png"
            alt="Kakao"
          />
        );
      case 'APPLE':
        return (
          <img
            className="inline-block w-[24px] mr-2"
            src="/assets/mypage/apple-icon.png"
            alt="Apple"
          />
        );
      default:
        return null;
    }
  };

  return (
    <InputWrapper className="flex items-center justify-between my-14 sm:my-6">
      <div className="flex items-start sm:flex-col sm:justify-start sm:items-start">
        <Label htmlFor="id" className="w-[130px] p3-b sm:mb-4">
          {t('ID')}
        </Label>
        <p className="text-15 text-font-sub_1 w-[250px] flex items-center">
          {renderSignupIcon()}
          {id ? maskUserInfo.maskEmail(id) : '-'}
        </p>
      </div>
    </InputWrapper>
  );
}

export default UserIdInput;
