import './sentry';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';

// Design tokens / typography shipped by the ai-lab package.
import '@luxrobo/ai-lab/typography.css';
import './index.css';

import App from './App';
import ErrorFallback from './ErrorFallback';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Sentry.ErrorBoundary
    fallback={<ErrorFallback />}
    onError={(error, componentStack) =>
      console.error('루트 렌더링 에러:', error, componentStack)
    }
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Sentry.ErrorBoundary>,
);
