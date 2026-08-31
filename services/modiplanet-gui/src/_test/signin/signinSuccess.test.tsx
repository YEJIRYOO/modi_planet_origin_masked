import { fireEvent, screen, waitFor } from '@testing-library/react';

import { SignInComponent } from '@src/pages/sign-in/SignInComponent';
import { EStorageKey } from '@src/lib/constants/enums';

import {
  renderSigninWrapper,
  SiginErrorMock,
} from '@src/_test/signin/util/wrapper';

const mockSignIn = vi.fn();
const mockGetProfile = vi.fn();

vi.mock('@services/api', async () => {
  const actual = await vi.importActual<typeof import('@services/api')>(
    '@services/api',
  );

  return {
    ...actual,
    useSignIn: () => ({
      signIn: mockSignIn,
      loading: false,
    }),
    useProfileLazy: () => ({
      getProfile: mockGetProfile,
      loading: false,
    }),
  };
});

const getEmailInput = () => screen.getByPlaceholderText('ENTER_EMAIL');
const getPasswordInput = () => screen.getByPlaceholderText('ENTER_PW');
const getSignInButton = () => screen.getByRole('button', { name: 'SIGN_IN' });

const profile = {
  id: 'profile-id',
  userId: 'user-id',
  name: 'modi',
  nickname: 'modi',
  birthdate: '',
  phoneNumber: '',
  countryCallingCode: '',
  thumbnailUrl: '',
  codingExperienceTypeList: [],
  contactEmail: '',
};

beforeEach(() => {
  SiginErrorMock.reset();
  localStorage.clear();

  mockSignIn.mockReset();
  mockGetProfile.mockReset();

  mockSignIn.mockImplementation(({ onCompleted }) => {
    return onCompleted?.();
  });

  mockGetProfile.mockImplementation(({ onCompleted }) => {
    return onCompleted?.(profile);
  });
});

describe('[로그인 페이지] 로그인 성공 처리', () => {
  test('아이디 저장을 선택한 상태에서 로그인 성공 시 이메일을 저장한다.', async () => {
    // Given
    const email = 'poomaneoung1@gmail.com';
    const password = '';
    const onSignInSuccess = vi.fn();

    renderSigninWrapper({
      component: <SignInComponent onSignInSuccess={onSignInSuccess} />,
    });

    // When
    fireEvent.change(getEmailInput(), { target: { value: email } });
    fireEvent.change(getPasswordInput(), { target: { value: password } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(getSignInButton());

    // Then
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        expect.objectContaining({
          email,
          password,
        }),
      );
      expect(mockGetProfile).toHaveBeenCalledTimes(1);
      expect(onSignInSuccess).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem(EStorageKey.SAVED_EMAIL)).toBe(email);
    });
  });

  test('저장된 이메일을 체크 해제한 상태에서 로그인 성공 시 저장된 이메일을 삭제한다.', async () => {
    // Given
    const savedEmail = 'luxrobo@luxrobo.com';
    const password = '';
    const onSignInSuccess = vi.fn();

    localStorage.setItem(EStorageKey.SAVED_EMAIL, savedEmail);

    renderSigninWrapper({
      component: <SignInComponent onSignInSuccess={onSignInSuccess} />,
    });

    // When
    fireEvent.change(getPasswordInput(), { target: { value: password } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(getSignInButton());

    // Then
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        expect.objectContaining({
          email: savedEmail,
          password,
        }),
      );
      expect(mockGetProfile).toHaveBeenCalledTimes(1);
      expect(onSignInSuccess).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem(EStorageKey.SAVED_EMAIL)).toBeNull();
    });
  });
});
