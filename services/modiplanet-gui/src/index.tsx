import React from 'react';
import './sentry';
import './style/index.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

import 'cleave.js/dist/addons/cleave-phone.kr';
import 'swiper/css';

import '@src/lib/i18n';
import App from './App';

import '@toast-ui/editor/dist/toastui-editor.css';
import FirebaseProvider from '@components/provider/firebase-provider';
import ScrollToTop from '@components/ui_old/scroll/scroll-to-top';
import Apollo from './components/provider/apollo';
import GoogleAuthProvider from '@components/provider/GoogleAuthProvider';
import NavigationProvider from '@components/provider/navigation-provider';
import RootErrorBoundary from '@components/provider/root-error-boundary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <RootErrorBoundary>
    <BrowserRouter>
      <NavigationProvider>
        <FirebaseProvider>
          <GoogleAuthProvider>
            <ScrollToTop />
            <Apollo>
              <NextUIProvider>
                <App />
              </NextUIProvider>
            </Apollo>
          </GoogleAuthProvider>
        </FirebaseProvider>
      </NavigationProvider>
    </BrowserRouter>
  </RootErrorBoundary>,
);
