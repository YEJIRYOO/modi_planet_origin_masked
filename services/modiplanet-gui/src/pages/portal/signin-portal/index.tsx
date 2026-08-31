import { useEffect } from 'react';
import { storeIsPortal } from '@lib/utils/utils';
import { useQs } from '@hooks/useQs';
import i18n from '@lib/i18n';
import { SignInComponent } from '@src/pages/sign-in/SignInComponent';
import { LocaleHandler } from '@lib/utils/locale';

function SignInPortalPage() {
  const {
    path: { locale },
  } = useQs();

  storeIsPortal(true);

  useEffect(() => {
    if (locale) {
      LocaleHandler.applyLocale(i18n, locale);
      LocaleHandler.cleanLocaleFromUrl();
    }
  }, [locale]);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center overflow-y-auto">
      <SignInComponent />
    </div>
  );
}

export default SignInPortalPage;
