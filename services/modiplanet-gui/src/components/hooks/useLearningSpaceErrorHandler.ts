import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ApolloError } from '@apollo/client';
import { parseServerErrorMsg } from '@lib/utils/error';

interface HandleLearningSpaceErrorOptions {
  /**
   * 이미 구체적으로 처리한 비즈니스 에러 코드.
   * 포함된 코드가 매칭되면 공통 라우팅 로직을 건너뜀.
   */
  skipCodes?: number[];
}

const ERROR_400 = '/error/400';
const ERROR_500 = '/error/500';

const getBusinessCode = (gqlErr: {
  extensions?: { code?: unknown };
  message?: string;
}): number | undefined => {
  const extCode = gqlErr?.extensions?.code;
  if (typeof extCode === 'number') return extCode;
  const parsedCode = parseServerErrorMsg(gqlErr?.message ?? '')?.code;
  return typeof parsedCode === 'number' ? parsedCode : undefined;
};

const resolveErrorPath = (
  error: ApolloError,
  skipCodes?: number[],
): string | null => {
  // 1) 비즈니스 에러 (GraphQL extensions.code 또는 message JSON)
  for (const gqlErr of error.graphQLErrors ?? []) {
    const code = getBusinessCode(gqlErr);
    if (typeof code !== 'number') continue;
    if (skipCodes?.includes(code)) return null;
    if (code >= 60000 && code < 70000) return ERROR_400;
  }

  // 2) HTTP 상태 (networkError)
  const statusCode = (error.networkError as { statusCode?: number } | null)
    ?.statusCode;
  if (typeof statusCode === 'number') {
    if (statusCode >= 500 && statusCode < 600) return ERROR_500;
    if (statusCode >= 400 && statusCode < 500) return ERROR_400;
  }

  // 3) 분류 불가 — 기본 400 페이지
  return ERROR_400;
};

/**
 * 학습 공간 전반에서 발생하는 GraphQL/네트워크 에러를
 * 일관된 에러 페이지로 라우팅하기 위한 훅.
 *
 * - 60000번대 비즈니스 에러 → /error/400
 * - HTTP 4xx              → /error/400
 * - HTTP 5xx              → /error/500
 * - 그 외 알 수 없는 에러  → /error/400
 */
export function useLearningSpaceErrorHandler() {
  const navigate = useNavigate();

  return useCallback(
    (
      error: ApolloError | Error | undefined | null,
      options?: HandleLearningSpaceErrorOptions,
    ) => {
      if (!error) return;

      const targetPath = resolveErrorPath(
        error as ApolloError,
        options?.skipCodes,
      );
      if (!targetPath) return;

      console.error(`[LearningSpace] ${targetPath} 이동:`, error);
      navigate(targetPath);
    },
    [navigate],
  );
}
