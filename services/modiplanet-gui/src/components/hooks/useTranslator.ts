import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const useTranslator = () => {
  const { t, i18n } = useTranslation();

  const isKorean = useMemo(() => {
    return i18n.language.toLowerCase() === 'ko';
  }, [i18n, i18n.language]);

  return { t, i18n, isKorean };
};

export default useTranslator;
