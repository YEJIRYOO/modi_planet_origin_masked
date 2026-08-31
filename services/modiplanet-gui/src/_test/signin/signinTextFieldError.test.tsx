import userEvent from '@testing-library/user-event';

import { screen } from '@testing-library/react';

import { SignInComponent } from '@src/pages/sign-in/SignInComponent';
import { EStorageKey } from '@src/lib/constants/enums';
import { useLocation } from 'react-router-dom';
import { SignUpType } from '@src/services/gen/gen';

import {
  renderSigninWrapper,
  SiginErrorMock,
} from '@src/_test/signin/util/wrapper';

const CURRENT_PATH_TEST_ID = 'CURRENT_PATH';

function CurrentPath() {
  const location = useLocation();

  return <div data-testid={CURRENT_PATH_TEST_ID}>{location.pathname}</div>;
}

const getEmailInput = () => screen.getByPlaceholderText('ENTER_EMAIL');
const getPasswordInput = () => screen.getByPlaceholderText('ENTER_PW');
const getSignInButton = () => screen.getByRole('button', { name: 'SIGN_IN' });

beforeEach(() => {
  SiginErrorMock.reset();
  localStorage.clear();
});

describe('[로그인 페이지] 로그인 요청 관련 에러 핸들링', () => {
  //   /*
  //     유저의 로그인 정보라고 가정하고 시나리오 작성
  //    */
  test('이메일 입력 창에 아무것도 입력하지 않은 채로 로그인 요청 시 "이메일을 입력해 주세요."라는 메시지가 나온다.', async () => {
    // Given
    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // When
    userEvent.click(getSignInButton());

    // Then
    expect(await screen.findByText('ENTER_EMAIL')).toBeVisible();
  });

  test('비밀번호 입력 창에 아무것도 입력하지 않은 채로 로그인 요청 시 "비밀번호를 입력해주세요."라는 메시지가 나온다.', async () => {
    // Given
    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // When
    userEvent.click(getSignInButton());

    // Then
    expect(await screen.findByText('ENTER_PW')).toBeVisible();
  });

  test('이메일만 입력한 채로 로그인 요청 시 "비밀번호를 입력해주세요."라는 메시지가 나온다.', async () => {
    // Given
    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // When
    userEvent.type(getEmailInput(), 'poomaneoung1@gmail.com');
    userEvent.click(getSignInButton());

    // Then
    expect(await screen.findByText('ENTER_PW')).toBeVisible();
  });

  test('비밀번호만 입력한 채로 로그인 요청 시 "이메일을 입력해 주세요."라는 메시지가 나온다.', async () => {
    // Given
    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // When
    userEvent.type(getPasswordInput(), '');
    userEvent.click(getSignInButton());

    // Then
    expect(await screen.findByText('ENTER_EMAIL')).toBeVisible();
  });

  test('email: poomaneoung1@gmail, pw: js입력 후 로그인 요청 시 NOT_REGISTED_EMAIL 라는 메세지가 나온다.', async () => {
    // Given
    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // When
    userEvent.type(getEmailInput(), '');
    userEvent.type(getPasswordInput(), 'js');

    userEvent.click(getSignInButton());

    // Then
    expect(await screen.findByText('NOT_REGISTED_EMAIL')).toBeVisible();
  });

  test('email: poomaneoung1@gmail.com, pw: js입력 후 로그인 요청 시 ENTER_INPUT_8TO20 라는 메세지가 나온다.', async () => {
    // Given
    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // When
    userEvent.type(getEmailInput(), '');
    userEvent.type(getPasswordInput(), 'js');

    userEvent.click(getSignInButton());

    expect(await screen.findByText('ENTER_INPUT_8TO20')).toBeVisible();
  });

  test('email: mask, pw: mask 입력 후 로그인 요청 시 NO_MATCHING_PW 라는 메세지가 나온다.', async () => {
    // Given
    const email = '';
    const password = '';

    SiginErrorMock.set({
      errorCode: 10007,
      errorMessage: 'password not match',
    });

    renderSigninWrapper({
      component: <SignInComponent />,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    // When
    userEvent.type(getEmailInput(), email);
    userEvent.type(getPasswordInput(), password);

    userEvent.click(getSignInButton());

    // Then
    expect(await screen.findByText('NO_MATCHING_PW')).toBeVisible();
  });

  test('email: poomaneoung1@gmail.com(간편 로그인으로 회원가입한 메일일 경우), pw: js12345678!입력 후 로그인 요청 시 ALREADY_SIGNED_EMAIL2 라는 메세지가 나온다.', async () => {
    // Given
    const email = '';
    const password = '';

    SiginErrorMock.set({
      errorCode: 10012,
      errorMessage: 'sign in failed: not matched sign up type',
    });

    renderSigninWrapper({
      component: <SignInComponent />,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    // When
    userEvent.type(getEmailInput(), email);
    userEvent.type(getPasswordInput(), password);

    userEvent.click(getSignInButton());

    // Then
    expect(await screen.findByText('ALREADY_SIGNED_EMAIL2')).toBeVisible();
  });

  test('email: 올바른 이메일과 비밀번호 입력 후 로그인 요청 시 서버 에러가 발생해 COMMON_ERROR_MSG 라는 메세지가 나온다.', async () => {
    const email = '';
    const password = '';

    SiginErrorMock.set({
      errorCode: 500,
      errorMessage: 'Internal server error',
    });

    renderSigninWrapper({
      component: <SignInComponent />,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    userEvent.type(getEmailInput(), email);
    userEvent.type(getPasswordInput(), password);

    userEvent.click(getSignInButton());

    // Then
    expect(await screen.findByText('COMMON_ERROR_MSG')).toBeVisible();
  });

  test('email: mask(등록되지 않은 이메일), pw: mask입력 후 로그인 요청 시 NOT_MATCHING_ID 라는 메세지가 나온다.', async () => {
    // Given
    const email = '';
    const password = '';

    SiginErrorMock.set({
      errorCode: 404,
      errorMessage: 'user not found',
    });

    renderSigninWrapper({
      component: <SignInComponent />,
      variables: {
        input: {
          email,
          password,
        },
      },
    });

    // When
    userEvent.type(getEmailInput(), email);
    userEvent.type(getPasswordInput(), password);

    userEvent.click(getSignInButton());

    // Then
    expect(await screen.findByText('NO_MATCHING_ID')).toBeVisible();
  });
});

describe('[로그인 페이지] 화면 동작', () => {
  test('저장된 이메일이 없으면 아이디 저장 체크박스는 선택되어 있지 않다.', async () => {
    // Given
    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // Then
    expect(getEmailInput()).toHaveValue('');
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  test('저장된 이메일이 있으면 이메일 입력 창에 저장된 이메일이 보여진다.', async () => {
    // Given
    const savedEmail = 'luxrobo@luxrobo.com';
    localStorage.setItem(EStorageKey.SAVED_EMAIL, savedEmail);

    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // Then
    expect(screen.getByDisplayValue(savedEmail)).toBeVisible();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('아이디 저장 체크박스를 클릭하면 선택 상태가 변경된다.', async () => {
    // Given
    renderSigninWrapper({
      component: <SignInComponent />,
    });

    const saveIdCheckbox = screen.getByRole('checkbox');

    // When
    userEvent.click(saveIdCheckbox);

    // Then
    expect(saveIdCheckbox).toBeChecked();

    // When
    userEvent.click(saveIdCheckbox);

    // Then
    expect(saveIdCheckbox).not.toBeChecked();
  });

  test('최근 카카오 로그인 이력이 있으면 최근 로그인 안내가 보여진다.', async () => {
    // Given
    localStorage.setItem(EStorageKey.RECENT_SIGN_IN_TYPE, SignUpType.Kakao);

    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // Then
    expect(screen.getByRole('button', { name: /KAKAO_LOGIN/ })).toBeVisible();
    expect(
      await screen.findByRole('tooltip', { name: 'PREV_LOGIN' }),
    ).toBeInTheDocument();
  });

  test('최근 Google 로그인 이력이 있으면 최근 로그인 안내가 보여진다.', async () => {
    // Given
    localStorage.setItem(EStorageKey.RECENT_SIGN_IN_TYPE, SignUpType.Google);

    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // Then
    expect(screen.getByRole('button', { name: /GOOGLE_LOGIN/ })).toBeVisible();
    expect(
      await screen.findByRole('tooltip', { name: 'PREV_LOGIN' }),
    ).toBeInTheDocument();
  });

  test('최근 Apple 로그인 이력이 있으면 최근 로그인 안내가 보여진다.', async () => {
    // Given
    localStorage.setItem(EStorageKey.RECENT_SIGN_IN_TYPE, SignUpType.Apple);

    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // Then
    expect(screen.getByRole('button', { name: /APPLE_LOGIN/ })).toBeVisible();
    expect(
      await screen.findByRole('tooltip', { name: 'PREV_LOGIN' }),
    ).toBeInTheDocument();
  });

  test('최근 로그인 이력이 없으면 최근 로그인 안내가 보여지지 않는다.', async () => {
    // Given
    renderSigninWrapper({
      component: <SignInComponent />,
    });

    // Then
    expect(
      screen.queryByRole('tooltip', { name: 'PREV_LOGIN' }),
    ).not.toBeInTheDocument();
  });

  test('비밀번호 변경 버튼 클릭 시 비밀번호 변경 페이지로 이동한다.', async () => {
    // Given
    renderSigninWrapper({
      component: (
        <>
          <SignInComponent />
          <CurrentPath />
        </>
      ),
    });

    // When
    userEvent.click(screen.getByRole('button', { name: 'CHANGE_PW' }));

    // Then
    expect(screen.getByTestId(CURRENT_PATH_TEST_ID)).toHaveTextContent(
      '/change-password',
    );
  });

  test('비밀번호 변경 버튼 클릭 시 전달받은 닫기 함수가 실행된다.', async () => {
    // Given
    const onClose = vi.fn();

    renderSigninWrapper({
      component: <SignInComponent onClose={onClose} />,
    });

    // When
    userEvent.click(screen.getByRole('button', { name: 'CHANGE_PW' }));

    // Then
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('회원가입 버튼 클릭 시 회원가입 페이지로 이동한다.', async () => {
    // Given
    renderSigninWrapper({
      component: (
        <>
          <SignInComponent />
          <CurrentPath />
        </>
      ),
    });

    // When
    userEvent.click(screen.getByRole('button', { name: 'GNB_SIGN_UP' }));

    // Then
    expect(screen.getByTestId(CURRENT_PATH_TEST_ID)).toHaveTextContent(
      '/signup',
    );
  });

  test('회원가입 버튼 클릭 시 전달받은 닫기 함수가 실행된다.', async () => {
    // Given
    const onClose = vi.fn();

    renderSigninWrapper({
      component: <SignInComponent onClose={onClose} />,
    });

    // When
    userEvent.click(screen.getByRole('button', { name: 'GNB_SIGN_UP' }));

    // Then
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
