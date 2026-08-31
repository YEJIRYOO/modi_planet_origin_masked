import React, { useMemo } from 'react';
import {
  LUXROBO_PRIVACY_POLICY_EN,
  LUXROBO_PRIVACY_POLICY_KO,
  LUXROBO_TERMS_OF_SERVICE_URL_EN,
  LUXROBO_TERMS_OF_SERVICE_URL_KO,
} from '@src/lib/constants/urls';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@components/ui_old/button/button';
import { SNS } from '@src/lib/newAssets';
import useTranslator from '@hooks/useTranslator';
import { LocaleHandler } from '@lib/utils/locale';

interface IIcon {
  name: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  link: string;
}

export function Footer() {
  const navigate = useNavigate();

  const { t, i18n, isKorean } = useTranslator();

  const icons: Array<IIcon> = [
    {
      name: 'facebook',
      icon: SNS.FaceBook,
      link:
        i18n.language === 'ko'
          ? 'https://www.facebook.com/luxrobo'
          : 'https://www.facebook.com/luxrobo.global',
    },
    {
      name: 'insta',
      icon: SNS.Instagram,
      link:
        i18n.language === 'ko'
          ? 'https://www.instagram.com/luxrobo_modi/'
          : 'https://www.instagram.com/luxrobo_global/',
    },
    ...(isKorean
      ? [
          {
            name: 'kakao',
            icon: SNS.Kakao,
            link: 'https://pf.kakao.com/_BxixiUK',
          },
        ]
      : []),
    {
      name: 'youtube',
      icon: SNS.Youtube,
      link: 'https://www.youtube.com/@Luxrobo',
    },
    {
      name: 'luxrobo',
      icon: SNS.Luxrobo,
      link: 'https://luxrobo.com/',
    },
    ...(isKorean
      ? [
          {
            name: 'blog',
            icon: SNS.Blog,
            link: 'https://blog.naver.com/luxrobo_modimodi',
          },
        ]
      : []),
  ];

  const onClickTerms = () => {
    const lang = LocaleHandler.getLocale(i18n.language);
    switch (lang) {
      case 'ko': {
        window.open(LUXROBO_TERMS_OF_SERVICE_URL_KO, '_blank');
        break;
      }
      default: {
        window.open(LUXROBO_TERMS_OF_SERVICE_URL_EN, '_blank');
      }
    }
  };

  const onClickPrivacy = () => {
    const lang = LocaleHandler.getLocale(i18n.language);
    switch (lang) {
      case 'ko': {
        window.open(LUXROBO_PRIVACY_POLICY_KO, '_blank');
        break;
      }
      default: {
        window.open(LUXROBO_PRIVACY_POLICY_EN, '_blank');
      }
    }
  };
  const onClickLink = (path: string) => {
    return () => {
      navigate(path);
    };
  };

  return (
    <footer className="bg-white py-[80px] sd:pt-[60px] sd:pb-[144px] tb:pt-[60px] tb:pb-[144px] mb:pt-[60px] mb:pb-[144px] px-[20px]">
      <div className="max-w-[1280px] mx-auto sd:w-full tb:w-full mb:w-full text-font-sub_2 flex justify-between relative sd:flex-col tb:flex-col mb:flex-col">
        <div
          className={`flex flex-col sd:w-full tb:w-full mb:w-full shrink-0 p4-sb sd:mr-0 tb:mr-0 mb:mr-0 ${
            isKorean ? 'mr-[150px] w-[360px]' : 'mr-[100px] w-[480px]'
          }`}
        >
          <div className="h-[44px] mb-[10px]">
            <img className="w-[144px]" src="/assets/logo.svg" alt="logo" />
          </div>

          <div className="flex flex-col mb-[20px]">
            <p className="whitespace-nowrap">{t('SERVICE_CENTER_NUMBER')}</p>
            <p className="whitespace-nowrap">
              {t('SERVICE_CENTER_OPERATING_HOUR')}
            </p>
            <p className="whitespace-nowrap">
              {t('SERVICE_CENTER_LUNCH_HOUR')}
            </p>
            <p className="whitespace-nowrap">{t('CLOSED_DAY')}</p>
          </div>

          <Button
            className="w-[360px] sd:w-full tb:w-full mb:w-full"
            color="dark"
            isMini
            onClick={onClickLink('/cs')}
          >
            {t('SERVICE_CENTER')}
          </Button>
        </div>

        <div className="w-[740px] sd:w-full tb:w-full mb:w-full pt-[54px] sd:pt-[40px] tb:pt-[40px] mb:pt-[40px]">
          <div className="p4-sb mb-[20px]">
            <p
              className="inline-block p4-r"
              role="button"
              onClick={onClickTerms}
            >
              {t('TERMS_OF_USE')}
            </p>
            <span className="mx-[4px]">ㅣ</span>
            <p
              className="inline-block underline text-font-main"
              role="button"
              onClick={onClickPrivacy}
            >
              {t('PRIVACY_POLICY')}
            </p>
            <span className="mx-[4px]">ㅣ</span>
            <p
              className="inline-block p4-r"
              role="button"
              onClick={onClickLink('/cs')}
            >
              {t('NOTICE')}
            </p>
            <span className="mx-[4px]">ㅣ</span>
            <p
              className="inline-block p4-r"
              role="button"
              onClick={onClickLink('/cs?tab=1')}
            >
              {t('FAQ')}
            </p>
          </div>

          <div className="p4-r">
            <p>
              <span className="whitespace-nowrap">{t('LUXROBO_LTD')}</span> ㅣ{' '}
              <span className="whitespace-nowrap">{t('CEO_NAME')}</span> ㅣ{' '}
              <span className="whitespace-nowrap">
                {t('INFO_MANAGER_NAME')}
              </span>
            </p>
            <p>{t('LUXROBO_ADDRESS')}</p>
            <p>
              <span className="whitespace-nowrap">{t('LUXROBO_EMAIL')}</span> ㅣ{' '}
              <span className="whitespace-nowrap">{t('LUXROBO_PHONE')}</span>
            </p>
            <p>
              <span className="whitespace-nowrap">
                {t('LUXROBO_MAIL_ORDER')}
              </span>{' '}
              ㅣ{' '}
              <span className="whitespace-nowrap">
                {t('LUXROBO_COMPANY_REGISTRATION_NUMBER')}
              </span>
            </p>
          </div>
        </div>

        <div className="sociel-icons flex absolute top-0 right-0 sd:-bottom-[84px] sd:left-0 sd:top-auto tb:-bottom-[84px] tb:left-0 tb:top-auto mb:-bottom-[84px] mb:left-0 mb:top-auto">
          {icons.map(({ icon: Icon, link, name }, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              className="inline-block mr-[10px]"
            >
              <Icon className="w-[44px] h-[44px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
