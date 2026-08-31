import React from 'react';
import useTranslator from '@hooks/useTranslator';
import ButtonUI from '@src/components/ui/Button/ButtonUI';

interface IPopupContent {
  onClickContent: () => void;
}

function PopupContent({ onClickContent }: IPopupContent) {
  const { t } = useTranslator();

  return (
    <div className="pb-[24px]">
      <p className="pt-[16px] pb-[40px] h5-b white-space-prewarp">
        {t('PRIVACY_POLICY_POPUP_TITLE')}
      </p>
      <div className="text-font-sub pb-[24px]">
        <p className="p3-b pb-[8px]">{t('EFFECTIVE_DATE')}</p>
        <p className="p3-m">{t('EFFECTIVE_DATE_CONTENT')}</p>
      </div>
      <div className="text-font-sub pb-[24px]">
        <p className="p3-b pb-[8px]">{t('KEY_UPDATES')}</p>
        <p className="p3-m">{t('PRIVACY_POLICY_POPUP_CONTENTS')}</p>
      </div>
      <div className="text-font-sub pb-[60px] sm:pb-[40px]">
        <p className="p3-b pb-[8px]">{t('POSTING_PERIOD')}</p>
        <p className="p3-m">{t('POSTING_PERIOD_CONTENT')}</p>
      </div>
      <ButtonUI size="lg" className="w-full" onClick={onClickContent}>
        {t('VIEW_DETAILS')}
      </ButtonUI>
    </div>
  );
}

export default PopupContent;
