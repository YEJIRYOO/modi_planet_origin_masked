import { GraphQLErrors } from '@apollo/client/errors';
import { ApolloError } from '@apollo/client';
import { ErrorResponse } from '@apollo/client/link/error';

interface IError {
  errorCode: number; // 에러 고유 번호
  errorMessage: string; // 서버에서 발생한 에러 메세지
  message: string;
}

export const parseServerErrorMsg = (error: string) => {
  try {
    const { message, errorCode } = JSON.parse(error) as IError;
    console.error('ERROR CODE:', errorCode);
    return { message: message, code: errorCode };
  } catch (error) {
    // 정의되지 않은 에러
    return undefined;
  }
};

export const parseServerError = (error: GraphQLErrors) => {
  const result = error.map(({ message }) => message);
  return result;
};

export class Errorhandler {
  errorMap = new Map<number, string>();

  constructor(errors: ApolloError | ErrorResponse) {
    errors.graphQLErrors?.forEach((err) => {
      if (err.extensions && err.extensions.code) {
        this.errorMap.set(Number(err.extensions.code), err.message);
      } else {
        this.errorMap.set(9999, err.message);
      }
    });
  }

  getErrors() {
    return Array.from(this.errorMap.entries());
  }

  getCodes() {
    return Array.from(this.errorMap.keys());
  }

  getMessages() {
    return Array.from(this.errorMap.values());
  }
}
