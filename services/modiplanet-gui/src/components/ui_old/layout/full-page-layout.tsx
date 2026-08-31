import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import FullPageHeader from '@components/ui_old/header/full-page-header';
import AuthProvider from '@src/components/provider/AuthProvider';

interface FullPageLayoutProps {
  title?: string;
  titleKey?: string;
  titleLink?: string;
}

export function FullPageLayout({ title = '', titleKey, titleLink }: FullPageLayoutProps) {
  const { t } = useTranslation();
  const displayTitle = titleKey ? t(titleKey) : title;

  return (
    <AuthProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        <FullPageHeader title={displayTitle} titleLink={titleLink} />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}

export default FullPageLayout;
