import { useCallback } from 'react';
import { useTokenExchange } from './useTokenExchange';
import { useRefreshToken } from './useRefreshToken';
import { useTokenStore } from '@src/store/zustand/user/token';

/**
 * 토큰 관리 훅
 * - WebSocket subscription 인증용
 */
export const useTokenManager = () => {
  const { tokenExchange } = useTokenExchange();
  const { refreshToken } = useRefreshToken();
  const { setTokenData, clearTokenData, isRefreshTokenExpired } =
    useTokenStore();

  /** onetimeSessionCode로 토큰 교환 */
  const exchangeToken = useCallback(
    async (onetimeSessionCode: string) => {
      return new Promise<void>((resolve, reject) => {
        tokenExchange({
          input: { code: onetimeSessionCode },
          onComplete: (data) => {
            const result = data?.tokenExchange;
            if (result) {
              setTokenData({
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
                expiresIn: result.expiresIn,
                refreshExpiresIn: result.refreshExpiresIn,
              });
            }
            resolve();
          },
          onError: reject,
        });
      });
    },
    [tokenExchange, setTokenData],
  );

  /** accessToken 만료 시 갱신 */
  const refreshAccessToken = useCallback(async () => {
    const currentRefreshToken =
      useTokenStore.getState().tokenData?.refreshToken;

    if (!currentRefreshToken || isRefreshTokenExpired()) {
      clearTokenData();
      throw new Error('Refresh token unavailable or expired');
    }

    return new Promise<void>((resolve, reject) => {
      refreshToken({
        input: { refreshToken: currentRefreshToken },
        onComplete: (data) => {
          const result = data?.refreshToken;
          if (result) {
            setTokenData({
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
              expiresIn: result.expiresIn,
              refreshExpiresIn: result.refreshExpiresIn,
            });
          }
          resolve();
        },
        onError: (error) => {
          clearTokenData();
          reject(error);
        },
      });
    });
  }, [refreshToken, setTokenData, clearTokenData, isRefreshTokenExpired]);

  return { exchangeToken, refreshAccessToken };
};
