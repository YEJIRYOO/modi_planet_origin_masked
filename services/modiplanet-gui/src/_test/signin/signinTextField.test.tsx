import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputUI from '@src/components/ui/Input/InputUI';
import PasswordInputUI from '@src/components/ui/Input/PasswordInputUI';

import { SIGNIN_TEST_ID } from '@src/_test/signin/util/testId';

describe('[로그인 페이지] 이메일 TextField 테스트', () => {
  test('사용자가 이메일 TextField에 텍스트를 한 글자 입력 시 X버튼이 보여진다.', async () => {
    render(<InputUI defaultValue="" />);
    // Given
    const emailInputElement = screen.getByRole('textbox');

    // when
    userEvent.type(emailInputElement, 'w');

    // then ( 라이브러리의 기능 )
    expect(emailInputElement.getAttribute('data-filled')).toBeTruthy();
  });

  test('사용자가 이메일 TextField에 텍스트를 입력했을 때 X버튼을 클릭하면 입력된 모든 텍스트가 사라지고, 이메일 입력 필드가 Focus 상태로 변경된다.', async () => {
    // 라이브러리의 기능 Next UI의 기능
    render(<InputUI defaultValue="" />);

    // Given
    const emailInputElement = screen.getByRole<HTMLInputElement>('textbox');
    userEvent.type(emailInputElement, 'w');

    // when
    const clearBtn = await screen.findByRole('button');
    userEvent.click(clearBtn);

    // then ( 라이브러리의 기능 )
    expect(emailInputElement.value.length).toEqual(0);
    expect(emailInputElement).toHaveFocus();
  });
});

describe('[로그인 페이지] 비밀번호 - TextField 테스트', () => {
  test('사용자가 비밀번호 TextField에 텍스트를 한 글자 입력 시 비활성화된 눈 버튼과 X버튼이 보여진다.', async () => {
    render(<PasswordInputUI />);

    // Given
    const passwordInputElement = screen.getByRole<HTMLInputElement>('textbox');

    // when
    userEvent.type(passwordInputElement, 'w');

    // then
    expect(
      await screen.findByTestId(SIGNIN_TEST_ID.EYE_OPENED_BUTTON),
    ).toBeVisible();

    expect(
      await screen.findByTestId(SIGNIN_TEST_ID.INPUT_RESET_BUTTON),
    ).toBeVisible();
  });

  test('비활성화된 눈 버튼을 누를 시 활성화된 눈 버튼으로 변경되고 TextField 내 모든 텍스트가 표출됩니다.', async () => {
    render(<PasswordInputUI />);

    // Given
    const typedPassword = '';

    const passwordInputElement = screen.getByRole<HTMLInputElement>('textbox');

    userEvent.type(passwordInputElement, typedPassword);

    const activeBtn = await screen.findByTestId(
      SIGNIN_TEST_ID.EYE_OPENED_BUTTON,
    );

    // when
    userEvent.click(activeBtn);

    // then
    expect(
      await screen.findByTestId(SIGNIN_TEST_ID.EYE_SLASHED_BUTTON),
    ).toBeVisible();

    expect(passwordInputElement.value).toEqual(typedPassword);
  });

  test('X 버튼 클릭 시 TextField 내 모든 텍스트가 사라지며 TextField Focus 상태가 된다.', async () => {
    // 라이브러리의 기능 Next UI의 기능
    render(<PasswordInputUI />);

    // Given
    const passwordInputElement = screen.getByRole<HTMLInputElement>('textbox');
    userEvent.type(passwordInputElement, 'w');

    // when
    const clearBtn = (await screen.findAllByRole('button'))[1];

    userEvent.click(clearBtn);

    // then ( 라이브러리의 기능 )
    expect(passwordInputElement.value.length).toEqual(0);
    expect(passwordInputElement).toHaveFocus();
  });
});
