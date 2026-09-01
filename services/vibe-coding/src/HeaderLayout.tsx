import { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';

function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
    </div>
  );
}

// Logo-only public header shell. No auth, no profile, no language/notification
// utilities — this app is fully unauthenticated.
export default function HeaderLayout() {
  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-white">
      <header className="shrink-0 bg-white border-b border-form-border">
        <div className="h-[64px] flex items-center px-[24px] w-full max-w-[2560px] mx-auto">
          <Link to="/" className="shrink-0">
            <img
              className="w-[189px]"
              src="/assets/logo.svg"
              alt="MODI Planet"
            />
          </Link>
        </div>
      </header>
      <main className="flex-1 min-h-0 overflow-auto w-full">
        {/* Keeps the header while the lazy ModuleDetail chunk loads */}
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
