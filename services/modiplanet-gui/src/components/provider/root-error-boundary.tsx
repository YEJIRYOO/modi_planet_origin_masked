import type { ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from 'react-error-boundary';

interface RootErrorBoundaryProps {
  children: ReactNode;
}

function handleRootError(error: unknown, errorInfo: ErrorInfo) {
  console.error('루트 렌더링 에러:', error, errorInfo);

  Sentry.withScope((scope) => {
    scope.setContext('react', {
      componentStack: errorInfo.componentStack,
    });
    Sentry.captureException(error);
  });
}

//TODO: 추후 fallback 페이지 추가 필요
function RootErrorBoundary({ children }: RootErrorBoundaryProps) {
  return (
    <ErrorBoundary fallback={null} onError={handleRootError}>
      {children}
    </ErrorBoundary>
  );
}

export default RootErrorBoundary;
