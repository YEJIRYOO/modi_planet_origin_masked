import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';

import {
  Errorhandler,
  parseServerError,
  parseServerErrorMsg,
} from '@src/lib/utils/error';

describe('[유틸] 서버 에러 처리', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('JSON 문자열로 전달된 서버 에러 메시지와 코드를 파싱한다.', () => {
    // Given
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // When
    const result = parseServerErrorMsg(
      JSON.stringify({ message: 'NO_MATCHING_CODE', errorCode: 10004 }),
    );

    // Then
    expect(result).toEqual({ message: 'NO_MATCHING_CODE', code: 10004 });
    expect(console.error).toHaveBeenCalledWith('ERROR CODE:', 10004);
  });

  test('정의되지 않은 에러 문자열은 undefined를 반환한다.', () => {
    expect(parseServerErrorMsg('plain error')).toBeUndefined();
  });

  test('GraphQL 에러 목록에서 메시지만 추출한다.', () => {
    const errors = [
      new GraphQLError('FIRST_ERROR'),
      new GraphQLError('SECOND_ERROR'),
    ];

    expect(parseServerError(errors)).toEqual([
      'FIRST_ERROR',
      'SECOND_ERROR',
    ]);
  });

  test('GraphQL 에러 코드를 메시지와 함께 조회한다.', () => {
    const errorHandler = new Errorhandler(
      new ApolloError({
        graphQLErrors: [
          new GraphQLError('INVALID_EMAIL', {
            extensions: { code: 10002 },
          }),
          new GraphQLError('UNKNOWN_ERROR'),
        ],
      }),
    );

    expect(errorHandler.getCodes()).toEqual([10002, 9999]);
    expect(errorHandler.getMessages()).toEqual([
      'INVALID_EMAIL',
      'UNKNOWN_ERROR',
    ]);
    expect(errorHandler.getErrors()).toEqual([
      [10002, 'INVALID_EMAIL'],
      [9999, 'UNKNOWN_ERROR'],
    ]);
  });
});
