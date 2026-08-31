import React from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';
import FullPageNavUtility from './component/nav-utility/full-page-nav-utility';

interface FullPageHeaderProps {
  title: string;
  titleLink?: string;
}

export function FullPageHeader({ title, titleLink }: FullPageHeaderProps) {
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('/', '_blank');
  };

  const handleTitleClick = () => {
    if (titleLink) navigate(titleLink);
  };

  return (
    <header
      id="modiplanet-gnb"
      className={classnames(['overflow-hidden shrink-0 bg-white'])}
    >
      <div className="h-[64px] flex items-center justify-between max-w-[1920px] mx-auto -mb-[1px] px-[24px]">
        {/* 로고 + 페이지 제목 */}
        <div className="flex items-center gap-[20px]">
          <a href="/" onClick={handleLogoClick} className="shrink-0">
            <img className="w-[189px]" src="/assets/logo.svg" alt="logo" />
          </a>
          {/* <div className="h-[24px] w-[1px] bg-form-border sm:hidden" /> */}
          <h1
            className={classnames(
              'p1-r text-font-main sm:hidden',
              titleLink && 'cursor-pointer hover:text-font-sub_1',
            )}
            onClick={handleTitleClick}
          >
            {title}
          </h1>
        </div>

        {/* 우측 유틸리티 (알림, 프로필, 언어) */}
        <FullPageNavUtility />
      </div>

      <hr className="border-form-border" />
    </header>
  );
}

export default FullPageHeader;
