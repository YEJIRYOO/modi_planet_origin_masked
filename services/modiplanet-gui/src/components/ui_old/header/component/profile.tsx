import React, { Fragment } from 'react';

import AlarmPopover from '@src/components/ui_old/header/component/AlarmPopover';

import useTranslator from '@hooks/useTranslator';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfilePopover from '@components/ui/Popover/ProfilePopover';
import { useProfileStore } from '@src/store/zustand';

interface ProfileProps {
  redirectUrlOnSignOut?: string;
}

export function Profile({ redirectUrlOnSignOut }: ProfileProps) {
  const { t, i18n } = useTranslator();
  const navigate = useNavigate();
  const location = useLocation();
  const profile = useProfileStore((state) => state.profile);

  const onClickSignin = () => {
    navigate('/signin', { state: { from: location.pathname + location.search } });
  };

  return (
    <>
      <ul className="flex	items-center tb:hidden mb:hidden ">
        {profile ? (
          <Fragment>
            <li className="mr-[1.125rem]">
              <AlarmPopover />
            </li>
            <li className="mr-[30px]">
              <ProfilePopover
                thumbnail={profile.thumbnailUrl}
                name={profile.nickname}
                redirectUrlOnSignOut={redirectUrlOnSignOut}
              />
            </li>
          </Fragment>
        ) : (
          <li className="text-18 mr-[30px]">
            <div className="px-[23px] tb:p2-r mb:p2-r" role="button">
              <span className="whitespace-nowrap" onClick={onClickSignin}>
                {t('SIGN_IN')}
              </span>
            </div>
          </li>
        )}
      </ul>
    </>
  );
}

export default Profile;
