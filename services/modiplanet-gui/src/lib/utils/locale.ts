import { ELangType } from '@lib/constants/enums';
import i18n from 'i18next';

export const LocaleHandler = {
  getLocale(lng: string) {
    switch (lng) {
      case ELangType.KO: {
        return 'ko';
      }
      case ELangType.EN: {
        return 'en';
      }
      case ELangType.ES: {
        return 'es';
      }
      case ELangType.PL: {
        return 'pl';
      }
      default: {
        return 'en';
      }
    }
  },

  cleanLocaleFromUrl() {
    const url = new URL(window.location.href);
    url.searchParams.delete('locale');
    window.history.replaceState(null, '', url.toString());
  },

  applyLocale(i: typeof i18n, lng: string) {
    if (!lng) {
      i.changeLanguage(ELangType.KO);
      return;
    }

    switch (lng.toLowerCase()) {
      case 'ko': {
        i.changeLanguage(ELangType.KO);
        break;
      }
      case 'en': {
        i.changeLanguage(ELangType.EN);
        break;
      }
      case 'es': {
        i.changeLanguage(ELangType.ES);
        break;
      }
      case 'pl': {
        i.changeLanguage(ELangType.PL);
        break;
      }
      default: {
        i.changeLanguage(ELangType.KO);
      }
    }
  },
};
