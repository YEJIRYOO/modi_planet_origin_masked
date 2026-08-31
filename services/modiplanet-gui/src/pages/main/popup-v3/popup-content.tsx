import React, { useMemo } from 'react';
import useTranslator from '@hooks/useTranslator';

interface IPopupContent {
  onClickContent: () => void;
  onLoaded: () => void;
}

function PopupContent({ onClickContent, onLoaded }: IPopupContent) {
  const { i18n } = useTranslator();
  const mdImageUrl = useMemo(() => {
    switch (i18n.language.toLowerCase()) {
      case 'ko': {
        return '/assets/popup/Popup3_KOR_md.jpg';
      }
      case 'en': {
        return '/assets/popup/Popup3_ENG_md.jpg';
      }
      case 'es': {
        return '/assets/popup/Popup3_ES_md.jpg';
      }
      case 'pl': {
        return '/assets/popup/Popup3_PL_md.jpg';
      }
      default: {
        return '/assets/popup/Popup3_KOR_md.jpg';
      }
    }
  }, [i18n.language]);

  const smImageUrl = useMemo(() => {
    switch (i18n.language.toLowerCase()) {
      case 'ko': {
        return '/assets/popup/Popup3_KOR_sm.jpg';
      }
      case 'en': {
        return '/assets/popup/Popup3_ENG_sm.jpg';
      }
      case 'es': {
        return '/assets/popup/Popup3_ES_sm.jpg';
      }
      case 'pl': {
        return '/assets/popup/Popup3_PL_sm.jpg';
      }
      default: {
        return '/assets/popup/Popup3_KOR_sm.jpg';
      }
    }
  }, [i18n.language]);

  return (
    <div role="button" onClick={onClickContent}>
      <img
        onLoad={onLoaded}
        src={mdImageUrl}
        className="max-h-[calc(100vh-32px-72px)] w-auto object-contain tb:hidden mb:hidden pointer-events-none"
      />
      <img
        onLoad={onLoaded}
        src={smImageUrl}
        className="max-h-[calc(100vh-32px-48px)] w-auto object-contain hidden tb:block mb:block pointer-events-none"
      />
    </div>
  );
}

export default PopupContent;
