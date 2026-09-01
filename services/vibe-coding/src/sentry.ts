import * as Sentry from '@sentry/react';

const dsn = process.env.REACT_APP_SENTRY_DSN;
const release = process.env.REACT_APP_SENTRY_RELEASE;
const environment =
  process.env.REACT_APP_ENV ?? (import.meta.env.DEV ? 'development' : undefined);

if (dsn && !import.meta.env.DEV) {
  Sentry.init({
    dsn,
    release,
    environment,
  });
}
