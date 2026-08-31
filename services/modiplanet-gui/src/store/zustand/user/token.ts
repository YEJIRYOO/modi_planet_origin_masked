import { create } from 'zustand';

export type TokenData = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  issuedAt: number;
};

type TokenStore = {
  tokenData: TokenData | null;
  setTokenData: (data: Omit<TokenData, 'issuedAt'>) => void;
  clearTokenData: () => void;
  /** accessToken 만료 여부 확인 (버퍼 시간 고려) */
  isAccessTokenExpired: () => boolean;
  /** refreshToken 만료 여부 확인 */
  isRefreshTokenExpired: () => boolean;
};

/** 만료 체크 시 버퍼 시간 (초) - 만료 1분 전에 갱신 */
const EXPIRY_BUFFER_SECONDS = 60;

export const useTokenStore = create<TokenStore>((set, get) => ({
  tokenData: null,

  setTokenData: (data) => {
    set({
      tokenData: {
        ...data,
        issuedAt: Date.now(),
      },
    });
  },

  clearTokenData: () => set({ tokenData: null }),

  isAccessTokenExpired: () => {
    const { tokenData } = get();
    if (!tokenData) return true;

    const { issuedAt, expiresIn } = tokenData;
    const expiryTime = issuedAt + expiresIn * 1000;
    const now = Date.now();

    return now >= expiryTime - EXPIRY_BUFFER_SECONDS * 1000;
  },

  isRefreshTokenExpired: () => {
    const { tokenData } = get();
    if (!tokenData) return true;

    const { issuedAt, refreshExpiresIn } = tokenData;
    const expiryTime = issuedAt + refreshExpiresIn * 1000;
    const now = Date.now();

    return now >= expiryTime;
  },
}));

/** subscription 연결 시 사용하는 메모리 access token getter */
export const getSubscriptionAccessToken = () => {
  return useTokenStore.getState().tokenData?.accessToken;
};
