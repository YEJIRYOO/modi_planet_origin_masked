import { EMypageMenu } from '@src/lib/constants/enums';
import React from 'react';
import { useLocation } from 'react-router-dom';

import MyPageMenuItem from './my-page-menu-item';

import useTranslator from '@hooks/useTranslator';
import { useUser } from '@services/api';
import { RoleTypeEnum } from '@src/services/client-model/user';

export default function MyPageMenu() {
  const { pathname } = useLocation();
  const { t } = useTranslator();
  const { user } = useUser();

  const isGuest = user?.roleType === RoleTypeEnum.GUEST;

  return (
    <div className="min-w-[300px] w-[300px] h-max bg-white border border-form-border p-7 rounded-20 shadow-sm sm:p-[40px_20px] sm:hidden">
      <div className="font-bold text-18 mb-4">{t('MY_PAGE')}</div>
      <div className="flex flex-col gap-[5px]">
        {!isGuest && (
          <MyPageMenuItem
            label={t('ACCOUNT')}
            menu={EMypageMenu.MYPAGE}
            isActive={pathname === '/' + EMypageMenu.MYPAGE}
          />
        )}
        <MyPageMenuItem
          label={t('MY_PROJECTS')}
          menu={EMypageMenu.MYPROJECT}
          isActive={pathname === '/' + EMypageMenu.MYPROJECT}
        />
        {!isGuest && (
          <MyPageMenuItem
            label={t('CONTACT')}
            menu={EMypageMenu.CONTACT}
            isActive={pathname === '/' + EMypageMenu.CONTACT}
          />
        )}
      </div>
    </div>
  );
}
