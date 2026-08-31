import { useState } from 'react';
import classNames from 'classnames';
import { ProfileModel, UserModel } from '@services/client-model/user';
import useTranslator from '@hooks/useTranslator';
import UserInfoComponent from '@src/pages/my-page/MyPageComponent/UserInfoComponent';
import ThumbnailComponent from '@src/pages/my-page/MyPageComponent/ThumbnailComponent';
import MarketingComponent from '@src/pages/my-page/MyPageComponent/MarketingComponent';
import WithdrawalComponent from './WithdrawalComponent';

interface MyPageComponentProps {
  user: UserModel;
  profile: ProfileModel;
}

export function MyPageComponent({ user, profile }: MyPageComponentProps) {
  const { t } = useTranslator();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);

  return (
    <>
      <div className="mb-10">
        <h1 className="h4-b mb-7 sm:text-26">{t('ACCOUNT')}</h1>
      </div>

      <div className="flex mb-5 justify-between">
        <h2 className="p2-b">{t('MY_INFO')}</h2>
      </div>
      <div
        className={classNames(
          'rounded-30 bg-white p-[30px_46px_30px_30px] mb-[60px] text-font-sub_1',
          'sm:rounded-10 sm:p-[30px_20px] sm:min-w-[350px]',
        )}
      >
        <div className="flex justify-center sm:flex-col sm:gap-5">
          <ThumbnailComponent
            userId={profile.userId}
            thumbnail={profile.thumbnailUrl}
          />

          <div className="flex-1 sm:w-full sm:text-14">
            <UserInfoComponent
              user={user}
              profile={profile}
              emailModalOpen={emailModalOpen}
              onEmailModalOpenChange={setEmailModalOpen}
              phoneModalOpen={phoneModalOpen}
              onPhoneModalOpenChange={setPhoneModalOpen}
            />
          </div>
        </div>
      </div>

      <MarketingComponent
        user={user}
        profile={profile}
        onOpenEmailModal={() => setEmailModalOpen(true)}
        onOpenPhoneModal={() => setPhoneModalOpen(true)}
      />
      <WithdrawalComponent
        user={user}
        profile={profile}
        isSocialUser={user.signUpType !== 'EMAIL'}
      />
    </>
  );
}
