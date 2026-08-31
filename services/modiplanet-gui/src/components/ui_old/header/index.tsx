import React from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';
import NavMobile from '@components/ui_old/header/component/nav-mobile';
import Logo from '@components/ui_old/header/component/logo';
import NavDesktop from '@components/ui_old/header/component/nav-desktop';
import NavUtility from '@src/components/ui_old/header/component/nav-utility';

export function Header() {
  const { pathname } = useLocation();

  return (
    <header
      id="modiplanet-gnb"
      className={classnames([
        'shrink-0 bg-white fixed top-0 left-0 w-full z-50',
      ])}
    >
      <div className="h-[64px] flex items-center justify-between max-w-[1200px] mx-auto -mb-[1px] sd:px-[20px] tb:px-[20px] mb:px-[20px] tb:h-[60px] mb:h-[60px]">
        <NavMobile pathname={pathname} />

        <Logo />

        <NavDesktop />

        <NavUtility />
      </div>

      <hr className="border-form-border" />
    </header>
  );
}

export default Header;
