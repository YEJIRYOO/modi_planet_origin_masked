import { Outlet } from 'react-router-dom';

import Footer from '@components/ui_old/footer';
import Header from '@components/ui_old/header';
import AuthProvider from '@src/components/provider/AuthProvider';
import { getIsPortal } from '@lib/utils/utils';

/**
 * MODIPlanet 레이아웃
 */
export function MODIPlanetLayout() {
  const isPortal = getIsPortal();
  return (
    <AuthProvider>
      <div className="relative flex flex-col h-full">
        {!isPortal ? <Header /> : null}
        <main className={`flex-grow-[1] bg-form-bg text-font-main min-h-[80vh] ${!isPortal ? 'pt-[64px] tb:pt-[60px] mb:pt-[60px]' : ''}`}>
          <Outlet />
        </main>
        {!isPortal ? <Footer /> : null}
      </div>
    </AuthProvider>
  );
}

export default MODIPlanetLayout;
