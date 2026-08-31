import { useCallback } from 'react';
import { useSessionOnetimeCode } from './useSessionOnetimeCode';
import { useTokenManager } from './useTokenManager';
import {
  getSubscriptionAccessToken,
  useTokenStore,
} from '@src/store/zustand/user/token';

/**
 * 토큰 초기화 훅
 * - 토큰 없음 → 재발급
 * - 토큰 만료 → 갱신
 * - 토큰 유효 → 스킵
 */
export const useTokenInit = () => {
  const { sessionOnetimeCode } = useSessionOnetimeCode();
  const { exchangeToken, refreshAccessToken } = useTokenManager();
  const isAccessTokenExpired = useTokenStore(
    (state) => state.isAccessTokenExpired,
  );

  /** 토큰 재발급 (sessionOnetimeCode → exchangeToken) */
  const issueNewToken = useCallback(async (): Promise<boolean> => {
    try {
      const code = await new Promise<string | null>((resolve) => {
        sessionOnetimeCode({
          onCompleted: (data) => {
            resolve(data?.sessionOnetimeCode?.code ?? null);
          },
          onError: () => resolve(null),
        });
      });

      if (!code) return false;

      await exchangeToken(code);
      return true;
    } catch {
      return false;
    }
  }, [sessionOnetimeCode, exchangeToken]);

  /**
   * 토큰 초기화
   * - 토큰 없음 → 재발급
   * - 토큰 만료 → 갱신 (실패 시 재발급)
   * - 토큰 유효 → 스킵
   */
  const initToken = useCallback(async (): Promise<boolean> => {
    const currentToken = getSubscriptionAccessToken();
    const isExpired = isAccessTokenExpired();

    // 토큰 없음 → 재발급
    if (!currentToken) {
      return issueNewToken();
    }

    // 토큰 만료 → 갱신
    if (isExpired) {
      try {
        await refreshAccessToken();
        return true;
      } catch {
        return issueNewToken();
      }
    }

    // 토큰 유효 → 스킵
    return true;
  }, [isAccessTokenExpired, refreshAccessToken, issueNewToken]);

  return { initToken };
};
