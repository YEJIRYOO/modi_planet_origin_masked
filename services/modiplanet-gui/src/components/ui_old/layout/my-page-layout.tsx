import { Outlet } from 'react-router-dom';

import MyPageMenu from './menu/my-page-menu';
import MyPageMenuMobile from './menu/my-page-menu-mobile';
import AuthProvider from '@src/components/provider/AuthProvider';

export default function MyPageLayout() {
  return (
    <AuthProvider accessOnlySigned={true}>
      <div className="container py-[70px] text-16 sm:px-5 sm:py-10 sm:min-h-[70vh]">
        <div className="flex sm:flex-col justify-between">
          {/* 메뉴 */}
          <MyPageMenu />
          <MyPageMenuMobile />

          {/* 컨텐츠 */}
          <div className="pl-[36px] w-full sm:pl-0">
            <Outlet />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
