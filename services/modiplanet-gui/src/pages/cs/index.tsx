import { useEffect } from 'react';

import FAQContainer from './faq';
import Tab from '@components/ui_old/tab/tab';
import NoticeContainer from './notice';
import { useFirebaseEvent } from '@components/provider/firebase-provider';
import useTranslator from '@hooks/useTranslator';
import { useQs } from '@hooks/useQs';

export function CSPage() {
  const { path } = useQs();
  const { t } = useTranslator();
  const { viewCsPageLog } = useFirebaseEvent();

  const defaultTabId = path.tab === '1' ? 1 : 0;

  useEffect(() => {
    viewCsPageLog();
  }, []);

  return (
    <div className="bg-form-bg sm:pt-[40px]">
      <div className="container sm:max-w-[390px] pt-[90px] pb-[120px] sm:pt-0 sm:pb-10">
        <div className="mb-[30px] sm:mb-[30px]">
          <h1 className="text-40 font-bold sm:text-26">
            {t('SERVICE_CENTER')}
          </h1>
        </div>

        <div className="flex flex-col text-font-sub text-18 mb-[60px] sm:text-16 sm:mb-[30px]">
          <div className="flex items-center sm:flex-col sm:items-start">
            <CSPhoneNumber />

            <div className="flex items-center shrink-0">
              <div className="w-[37px] mr-[10px] sm:w-[29px]">
                <img
                  className="w-full h-full"
                  src="/assets/email.svg"
                  alt="email"
                />
              </div>
              <span className="p3-b mr-[13px]">{t('EMAIL_TEXT')}</span>
              <span className="p3-r">{t('SERVICE_EMAIL')}</span>
            </div>
          </div>

          <div className="text-font-sub_1 mt-[12px] sm:mt-[10px] sm:flex sm:flex-col sm:gap-[4px]">
            <span>
              <span className="p6-sb">{t('BUSINESS_HOURS_TITLE')}</span>{' '}
              <span className="p6-r">{t('BUSINESS_HOURS')}</span>
            </span>
            <span className="mx-[8px] p6-r sm:hidden">|</span>
            <span>
              <span className="p6-sb">{t('LUNCH_BREAK_TITLE')}</span>{' '}
              <span className="p6-r">{t('LUNCH_BREAK')}</span>
            </span>
            <span className="mx-[8px] p6-r sm:hidden">|</span>
            <span className="p6-r">{t('CLOSED_DAY')}</span>
          </div>
        </div>

        <Tab
          defaultId={defaultTabId}
          data={[
            {
              id: 0,
              label: t('NOTICE'),
              content: <NoticeContainer />,
            },
            { id: 1, label: 'FAQ', content: <FAQContainer /> },
          ]}
          className="sm:text-18 sm:mb-5"
          labelClassName="sm:pb-[14px]"
        />
      </div>
    </div>
  );
}

export default CSPage;

function CSPhoneNumber() {
  const { t } = useTranslator();

  return (
    <div className="flex items-center mr-[53px] shrink-0 sm:mb-[10px]">
      <div className="w-[37px] mr-[10px] sm:w-[29px]">
        <img className="w-full h-full" src="/assets/tel.svg" alt="tel" />
      </div>
      <span className="p3-b mr-[13px]">{t('PHONE_NUMBER')}</span>
      <span className="p3-r">{t('SERVICE_PHONE')}</span>
    </div>
  );
}
