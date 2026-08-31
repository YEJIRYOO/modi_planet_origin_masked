import useTranslator from '@hooks/useTranslator';

export default function ExpiredPage() {
  const { t } = useTranslator();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src="assets/error/error-img.svg" alt="error" />
      <p className="p1-b mt-4 text-font-sub">{t('EXPIRED_PAGE')}</p>
    </div>
  );
}
