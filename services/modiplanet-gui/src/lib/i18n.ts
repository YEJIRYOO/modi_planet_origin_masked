import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationKo from '@src/locales/ko-KR/translation.json';
import translationEn from '@src/locales/en-US/translation.json';
import translationEs from '@src/locales/es/translation.json';
import translationPl from '@src/locales/pl/translation.json';
import { ELangType, EStorageKey } from './constants/enums';

const resource = {
  ko: {
    translation: {
      ...translationKo,
    },
  },
  en: {
    translation: {
      ...translationEn,
    },
  },
  es: {
    translation: {
      ...translationEs,
    },
  },
  pl: {
    translation: {
      ...translationPl,
    },
  },
};

export const langType = Object.values(ELangType);

const getLanguage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const localeParam = urlParams.get('locale');

  if (localeParam) {
    switch (localeParam.toLowerCase()) {
      case 'ko':
      case 'kr':
        return ELangType.KO;
      case 'en':
        return ELangType.EN;
      case 'es':
        return ELangType.ES;
      case 'pl':
        return ELangType.PL;
    }
  }

  const storageLang = localStorage.getItem(EStorageKey.LANG);

  if (storageLang) {
    return storageLang;
  }

  const browserLang = navigator.language;

  switch (browserLang) {
    case 'ko': {
      return ELangType.KO;
    }
    case 'ko-KR': {
      return ELangType.KO;
    }
    case 'es': {
      return ELangType.ES;
    }
    case 'pl': {
      return ELangType.PL;
    }
    default: {
      return ELangType.EN;
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // react: { useSuspense: false },
    resources: resource,
    lng: getLanguage(),
    fallbackLng: langType,
    debug: false,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      prefix: '%{',
      suffix: '}',
      escapeValue: false, // react already safes from xss
    },
  });

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

// Set initial HTML lang attribute
document.documentElement.lang = i18n.language;

export default i18n;
