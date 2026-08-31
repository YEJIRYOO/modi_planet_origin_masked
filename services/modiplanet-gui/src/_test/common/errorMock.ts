import { GraphQLError } from 'graphql';

import { GraphQLRequest } from '@apollo/client';
import { MockedResponse } from '@apollo/client/testing';

interface IMockRequestParams {
  gqlReqeust: GraphQLRequest;
}

/* https://luxrobo-web-team-docs.vercel.app/error/account */
interface IMockSetParams {
  errorMessage: string;
  errorCode: number;
}

class ErrorMock {
  #type: string;
  #errors: GraphQLError[] = [];

  constructor(type: string) {
    this.#type = type;
  }

  private getQuery(
    request: GraphQLRequest,
  ): MockedResponse<Record<string, any>> {
    return {
      request: {
        query: request.query,
        variables: request.variables,
      },
    };
  }

  private makeErrorData(errorMessage: string, errorCode: number) {
    return new GraphQLError(errorMessage, {
      path: [this.#type],
      extensions: {
        code: errorCode,
      },
    });
  }

  reset() {
    this.#errors = [];
  }

  set({ errorMessage, errorCode }: IMockSetParams) {
    this.#errors = [this.makeErrorData(errorMessage, errorCode)];
  }

  get({ gqlReqeust }: IMockRequestParams): MockedResponse<Record<string, any>> {
    const returnData: MockedResponse<Record<string, any>> = {
      ...this.getQuery(gqlReqeust),
      result: {
        errors: this.#errors,
      },
    };

    return returnData;
  }
}

export default ErrorMock;
