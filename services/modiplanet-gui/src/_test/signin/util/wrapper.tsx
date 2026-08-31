import { render } from '@testing-library/react';

import { MockedProvider } from '@apollo/client/testing';

import { MemoryRouter } from 'react-router-dom';

import FirebaseProvider from '@src/components/provider/firebase-provider';
import GoogleAuthProvider from '@src/components/provider/GoogleAuthProvider';

import { SignInDocument } from '@src/services/gen/gen';

import ErrorMock from '../../common/errorMock';

interface ISigninInputParams {
  input: {
    email: string;
    password: string;
  };
}

interface IrenderSigninWrapperParams {
  component: React.ReactNode;
  variables?: ISigninInputParams;
}

export const SiginErrorMock = new ErrorMock('signin');

export const renderSigninWrapper = ({
  component,
  variables,
}: IrenderSigninWrapperParams) => {
  const mockData = SiginErrorMock.get({
    gqlReqeust: {
      query: SignInDocument,
      variables: { ...variables },
    },
  });

  return render(
    <MemoryRouter>
      <FirebaseProvider>
        <MockedProvider mocks={[mockData]}>
          <GoogleAuthProvider>{component}</GoogleAuthProvider>
        </MockedProvider>
      </FirebaseProvider>
    </MemoryRouter>,
  );
};
