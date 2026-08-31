import Profile from '@components/ui_old/header/component/profile';
import ArrowRight from '@src/lib/newAssets/chevron/chevron-right.svg?react';
import LangSelect from '@components/ui_old/header/component/lang-select';
import { MODI_MALL_URL } from '@src/lib/constants/urls';
import useTranslator from '@hooks/useTranslator';

interface INavUtility {}

export function NavUtility({}: INavUtility) {
  const { t, i18n } = useTranslator();

  return (
    <div className="tb:min-w-[100px] mb:min-w-[100px] flex justify-end items-center">
      {/** 모디몰 */}
      {i18n.language === 'ko' && (
        <div
          className="p3-m mr-[35px] tb:hidden mb:hidden whitespace-nowrap"
          role="button"
        >
          <a className="flex items-center" href={MODI_MALL_URL} target="_blank">
            <span className="mr-[10px]">{t('GNB_MODI_MALL')}</span>
            <ArrowRight className="fill-font-main" />
          </a>
        </div>
      )}

      <Profile />

      <LangSelect />
    </div>
  );
}

export default NavUtility;
