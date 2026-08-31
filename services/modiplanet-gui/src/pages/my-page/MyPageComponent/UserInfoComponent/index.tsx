import UserEmailInput from '@src/pages/my-page/MyPageComponent/UserInfoComponent/inputs/UserEmailInput';
import UserPhoneInput from '@src/pages/my-page/MyPageComponent/UserInfoComponent/inputs/UserPhoneInput';
import UserNicknameInput from '@src/pages/my-page/MyPageComponent/UserInfoComponent/inputs/UserNicknameInput';
import UserNameInput from '@src/pages/my-page/MyPageComponent/UserInfoComponent/inputs/UserNameInput';
import UserPasswordInput from '@src/pages/my-page/MyPageComponent/UserInfoComponent/inputs/UserPasswordInput';
import UserBirthInput from '@src/pages/my-page/MyPageComponent/UserInfoComponent/inputs/UserBirthInput';
import UserCodingEdit from '@src/pages/my-page/MyPageComponent/UserInfoComponent/inputs/UserCodingEdit';
import UserIdInput from '@src/pages/my-page/MyPageComponent/UserInfoComponent/inputs/UserIdInput';

import { ProfileModel, UserModel } from '@services/client-model/user';

interface UserInfoComponentProps {
  user: UserModel;
  profile: ProfileModel;
  emailModalOpen?: boolean;
  onEmailModalOpenChange?: (isOpen: boolean) => void;
  phoneModalOpen?: boolean;
  onPhoneModalOpenChange?: (isOpen: boolean) => void;
}

export default function UserInfoComponent({
  user,
  profile,
  emailModalOpen,
  onEmailModalOpenChange,
  phoneModalOpen,
  onPhoneModalOpenChange,
}: UserInfoComponentProps) {
  const isMinor = user.isMinor;
  const email = isMinor ? user.protector?.email || '' : profile.contactEmail;

  return (
    <div className="w-full">
      <UserIdInput id={user.email} signupType={user.signUpType} />
      {user.signUpType === 'EMAIL' && <UserPasswordInput />}
      <UserNameInput name={profile.name} />
      <UserNicknameInput nickname={profile.nickname} />
      <UserBirthInput birth={profile.birthdate} />
      <UserCodingEdit coding={profile.codingExperienceTypeList} />
      <UserEmailInput
        email={email}
        emailType={isMinor ? 'protector' : 'user'}
        externalOpen={emailModalOpen}
        onExternalOpenChange={onEmailModalOpenChange}
        userEmailId={user.email}
      />
      <UserPhoneInput
        countryCode={profile.countryCallingCode}
        phone={profile.phoneNumber}
        externalOpen={phoneModalOpen}
        onExternalOpenChange={onPhoneModalOpenChange}
      />
    </div>
  );
}
