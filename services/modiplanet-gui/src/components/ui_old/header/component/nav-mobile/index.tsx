import { Fragment, MouseEvent, useEffect, useState } from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

import ChevRight from '@src/lib/assets/chevron-right.svg?react';
import MobileMenu from '@src/lib/newAssets/menu-mobile.svg?react';

import { MODI_MALL_URL } from '@src/lib/constants/urls';
import useTranslator from '@hooks/useTranslator';
import useLinkValidation from '@hooks/useLinkValidation';
import DimArea from '@components/ui_old/header/component/nav-mobile/dim-area';
import { useProfileStore } from '@src/store/zustand';
import { useSignOutController } from '@src/components/hooks/user/useSignOutController';
import { useUser } from '@src/services/api';
import { RoleTypeEnum } from '@src/services/client-model/user';
import { DEFAULT_PROFILE_IMAGE } from '@src/lib/constants/etc';
import { Badge } from '../badge';
import OnlyPCWarningModal from '@components/ui/common/Modal/OnlyPCWarningModal';

interface IMobileNav {
  pathname: string;
}

export function NavMobile({ pathname }: IMobileNav) {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const profile = useProfileStore((state) => state.profile);
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { onClickCodeEditor, onClickLearningSpace, warningModalProps } =
    useLinkValidation();
  const { onSignOut } = useSignOutController();

  useEffect(() => {
    // 주소가 바뀌면 모바일 헤더 상태 초기화
    if (isOpen) {
      setIsOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    // 네비영역이 보일땐 스크롤 블록
    const body = document.querySelector('body') as HTMLElement;

    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.removeProperty('overflow');
    }
  }, [isOpen]);

  useEffect(() => {
    // 창크기가 850 넘으면 모바일 헤더 상태 초기화
    const resizeCallback = (_: UIEvent) => {
      const clientWidth = document.documentElement.clientWidth;
      if (clientWidth > 1024) {
        setIsOpen(false);
      }
    };

    addEventListener('resize', resizeCallback);

    return () => {
      removeEventListener('resize', resizeCallback);
    };
  }, []);

  const onMenuClose = () => {
    setIsOpen(false);
  };

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const onLinkClick = (path: string) => {
    toggleIsOpen();
    navigate(path);
  };

  const onCompletedSignout = () => {
    setIsOpen(false);
    navigate('/');
  };

  const onClickSignout = async (event: MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault();
    try {
      await onSignOut({
        onCompleted: onCompletedSignout,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onClick = () => {
    navigate('/signin');
  };

  return (
    <Fragment>
      {/*모바일 메뉴 버튼 */}
      <div
        className="hidden h-full tb:flex tb:items-center tb:min-w-[100px] mb:flex mb:items-center mb:min-w-[100px]"
        onClick={toggleIsOpen}
        role="button"
      >
        <MobileMenu className="fill-font-main" />
      </div>

      {/*모바일 딤, 클로즈 버튼*/}
      <DimArea onClick={toggleIsOpen} isOpen={isOpen} />

      <nav
        className={classnames([
          'fixed w-[308px] top-0 left-0 bottom-0 bg-white duration-200 z-[15000] flex flex-col text-font-main',
          isOpen ? 'translate-x-0' : 'translate-x-[-100%]',
        ])}
      >
        {/* 로그인 , 프로필 */}
        <div className="h-[60px] px-5 flex items-center border-b border-form-border">
          {profile ? (
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-[40px] h-[40px] mr-4 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full align-top object-cover"
                    src={profile?.thumbnailUrl || DEFAULT_PROFILE_IMAGE}
                    alt="user"
                  />
                </div>
                <span className="max-w-[120px] overflow-hidden overflow-ellipsis p2-b">
                  {profile?.nickname}
                </span>
              </div>
              <div
                role="button"
                onClick={() => onLinkClick('/my-page')}
                className="rounded-10 px-[12px] h-[32px] tb:h-[30px] mb:h-[30px] p8-sb flex-center duration-300 bg-form-disable hover:bg-font-non active:text-font-sub_1"
              >
                <p>{t('MY_PAGE')}</p>
              </div>
            </div>
          ) : (
            <div className="px-[23px] tb:p2-r mb:p2-r" role="button">
              <span className="whitespace-nowrap" onClick={onClick}>
                {t('SIGN_IN')}
              </span>
            </div>
          )}
        </div>

        {/* 링크 */}
        <ul className="flex-1 flex flex-col p-[16px] p2-r gap-[16px]">
          <li
            className="flex justify-between items-center px-[16px] h-[57px] rounded-10 active:bg-brand_3 active:text-brand group"
            role="button"
            onClick={onClickCodeEditor}
          >
            <p>{t('GNB_CODE_EDITOR')}</p>
            <span>
              <ChevRight className="fill-font-main group-active:fill-brand" />
            </span>
          </li>

          <li
            className="flex justify-between items-center px-[16px] h-[57px] rounded-10 active:bg-brand_3 active:text-brand group"
            role="button"
            onClick={onClickLearningSpace}
          >
            <div className="flex items-center gap-[4px]">
              <Badge className={undefined} />
              <p>{t('LEARNING_SPACE')}</p>
            </div>
            <span>
              <ChevRight className="fill-font-main group-active:fill-brand" />
            </span>
          </li>
          <li
            className="flex justify-between items-center px-[16px] h-[57px] rounded-10 active:bg-brand_3 active:text-brand group"
            role="button"
            onClick={() => onLinkClick('/materials')}
          >
            <p>{t('EDU_RESOURCES')}</p>
            <span>
              <ChevRight className="fill-font-main group-active:fill-brand" />
            </span>
          </li>
          <li
            className="flex justify-between items-center px-[16px] h-[57px] rounded-10 active:bg-brand_3 active:text-brand group"
            role="button"
            onClick={() => onLinkClick('/cs')}
          >
            <p>{t('NOTICE')}</p>
            <span>
              <ChevRight className="fill-font-main group-active:fill-brand" />
            </span>
          </li>
          <li
            className="flex justify-between items-center px-[16px] h-[57px] rounded-10 active:bg-brand_3 active:text-brand group"
            role="button"
            onClick={() => {
              window.open(MODI_MALL_URL, '_blank');
            }}
          >
            <p>{t('GNB_MODI_MALL')}</p>
            <span>
              <ChevRight className="fill-font-main group-active:fill-brand" />
            </span>
          </li>
        </ul>
        {profile && (
          <div className="h-[60px] flex-center">
            <span
              role="button"
              onClick={onClickSignout}
              className="p3-m shrink-0"
            >
              {t('SIGN_OUT')}
            </span>
          </div>
        )}
      </nav>
      <OnlyPCWarningModal {...warningModalProps} />
    </Fragment>
  );
}

export default NavMobile;
