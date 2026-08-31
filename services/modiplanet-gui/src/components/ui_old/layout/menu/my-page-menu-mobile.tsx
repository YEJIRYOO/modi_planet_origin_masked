import { EMypageMenu } from '@src/lib/constants/enums';
import { useLocation } from 'react-router-dom';

import MyPageMenuItem from './my-page-menu-item';
import useTranslator from '@hooks/useTranslator';
import { useUser } from '@services/api';
import { RoleTypeEnum } from '@src/services/client-model/user';

export default function MyPageMenuMobile() {
  const { pathname } = useLocation();
  const { t } = useTranslator();
  const { user } = useUser();

  const isGuest = user?.roleType === RoleTypeEnum.GUEST;

  return (
    <div className="w-full sm:min-w-[350px] h-max hidden sm:block">
      <ul className="flex mb-[30px] gap-[7px] sm:mb-10">
        {!isGuest && (
          <MyPageMenuItem
            label={t('ACCOUNT')}
            menu={EMypageMenu.MYPAGE}
            isActive={pathname.startsWith('/' + EMypageMenu.MYPAGE)}
          />
        )}
        <MyPageMenuItem
          label={t('MY_PROJECTS')}
          menu={EMypageMenu.MYPROJECT}
          isActive={pathname.startsWith('/' + EMypageMenu.MYPROJECT)}
        />
        {!isGuest && (
          <MyPageMenuItem
            label={t('CONTACT')}
            menu={EMypageMenu.CONTACT}
            isActive={pathname.startsWith('/' + EMypageMenu.CONTACT)}
          />
        )}
      </ul>
    </div>
  );
}
