export const KAKAO_AUTH_URL =
  process.env.REACT_APP_ENV === 'production'
    ? `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY_PROD}&redirect_uri=${window.location.origin}/auth/kakao/signin&response_type=code`
    : `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${window.location.origin}/auth/kakao/signin&response_type=code`;

export const GOOGLE_0AUTH_ID =
  process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_GOOGLE_OAUTH_ID_PROD
    : process.env.REACT_APP_GOOGLE_OAUTH_ID_DEV;

export const APPLE_0AUTH_ID =
  process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_APPLE_OAUTH_ID_PROD
    : process.env.REACT_APP_APPLE_OAUTH_ID_DEV;

export const APPLE_REDIRECT_URL = `${window.location.origin}/auth/apple/signin`;

export const LETSMODI_GOOGLEPLAY_URL =
  'https://play.google.com/store/apps/details?id=com.luxrobo.lets_modi_aos&hl=ko&gl=US';

export const LETSMODI_APPSTORE_URL =
  'https://apps.apple.com/kr/app/lets-modi/id6443715792';

export const MODI_MALL_URL = 'https://korea.luxrobo.com/';

export const MODITOR_URL =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://moditor.modiplanet.com/'
    : 'https://test-moditor.modiplanet.com/';

export const MOCKLY_URL =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://rel-moditor.modiplanet.com/'
    : process.env.REACT_APP_ENV === 'test'
    ? 'https://modiflutter.vercel.app/'
    : 'https://dev-moditor.modiplanet.com/';

export const PYTHON_EDITOR_URL = 'https://dev-monaco.modiplanet.com?mode=1';

export const KAKAO_REDIRECT_URL = `${window.location.origin}/auth/kakao/signin`;

export const API_HTTP_ADDRESS =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://apiv1.modiplanet.com/graphql'
    : 'https://dev-apiv1.modiplanet.com/graphql';

export const API_WS_ADDRESS =
  process.env.REACT_APP_ENV === 'production'
    ? 'wss://apiv1.luxrobo.com/gateway/graphql'
    : 'wss://dev-apiv1.luxrobo.com/gateway/graphql';

export const LIVE_SERVER_ADDRESS =
  process.env.REACT_APP_ENV === 'production'
    ? 'wss://live.luxrobo.com'
    : 'wss://dev-live.luxrobo.com';

export const CHAT_WS_ADDRESS =
  process.env.REACT_APP_ENV === 'production'
    ? 'wss://chat.luxrobo.com/ws'
    : 'wss://dev-chat.luxrobo.com/ws';

export const CLASS_LOG_WS_ADDRESS =
  process.env.REACT_APP_ENV === 'production'
    ? 'wss://analyzer.luxrobo.com/ws'
    : 'wss://dev-analyzer.luxrobo.com/ws';

export const NOTIFICATION_WS_ADDRESS =
  process.env.REACT_APP_ENV === 'production'
    ? 'wss://apiv1.modiplanet.com/notification/query'
    : 'wss://dev-apiv1.modiplanet.com/notification/query';

export const LUXROBO_TERMS_OF_SERVICE_URL_KO =
  'https://luxrobo.notion.site/2026-1-30-2e8f54f3f04081e1b8e0e144714ca359';
export const LUXROBO_TERMS_OF_SERVICE_URL_EN =
  'https://luxrobo.notion.site/Service-Terms-of-Use-JAN-01-2026-2e8f54f3f040819e968fd7b602f6cedd';

export const LUXROBO_PRIVACY_POLICY_KO =
  'https://luxrobo.notion.site/2026-1-30-2e8f54f3f040803299d1d8cf55bdbe67';
export const LUXROBO_PRIVACY_POLICY_EN =
  'https://luxrobo.notion.site/Privacy-Policy-JAN-30-2026-2e8f54f3f040811283ece08141fdd9f0';

export const LUXROBO_SUPPORT_EMAIL = 'support@luxrobo.com';
