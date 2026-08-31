import {
  act,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordVerify from '@src/components/ui/common/PasswordVerify';
import { BirthdateSelector } from '@src/pages/sign-up/shared/BirthdateSelector';
import calculateAge from '@src/pages/sign-up/shared/calculate-age';
import Timer from '@src/pages/sign-up/shared/timer';
import { Validator } from '@src/pages/sign-up/shared/validator';

const renderPasswordVerify = (props?: { errMessage?: string }) => {
  const onVerifyPw = vi.fn();

  render(
    <PasswordVerify
      onVerifyPw={onVerifyPw}
      mismatchErrMsg="NO_MATCHING_PW"
      errMessage={props?.errMessage}
    />,
  );

  onVerifyPw.mockClear();

  return { onVerifyPw };
};

const getPasswordInput = () => screen.getByPlaceholderText('ENTER_INPUT_8TO20');
const getPasswordConfirmInput = () => screen.getByPlaceholderText('CHECK_PW');

describe('[회원가입 페이지] 입력값 검증', () => {
  test('이메일 형식이 올바른지 검증한다.', () => {
    expect(Validator.validateEmail('student@example.com')).toBe(true);
    expect(Validator.validateEmail('student')).toBe(false);
    expect(Validator.validateEmail('student@example')).toBe(false);
  });

  test('비밀번호 형식이 올바른지 검증한다.', () => {
    expect(Validator.validatePasswordError('abc12345')).toBe(true);
    expect(Validator.validatePasswordError('abcdefgh')).toBe(false);
    expect(Validator.validatePasswordError('abc12')).toBe(false);
  });

  test('비밀번호와 비밀번호 확인 값이 같은지 검증한다.', () => {
    expect(Validator.validatePasswordConfirm('abc12345', 'abc12345')).toBe(
      true,
    );
    expect(Validator.validatePasswordConfirm('abc12345', 'abc123456')).toBe(
      false,
    );
  });

  test('성인과 어린이 회원가입 필수 약관 동의 여부를 검증한다.', () => {
    expect(Validator.validateTerms(['terms', 'privacy', 'adult'])).toBe(true);
    expect(Validator.validateTerms(['terms', 'privacy', 'agent'])).toBe(true);
    expect(Validator.validateTerms(['terms', 'privacy'])).toBe(false);
  });

  test('인증 코드가 6자리 숫자인지 검증한다.', () => {
    expect(Validator.validateAuthCode('123456')).toBe(true);
    expect(Validator.validateAuthCode('12345')).toBe(false);
    expect(Validator.validateAuthCode('abcdef')).toBe(false);
  });
});

describe('[회원가입 페이지] 비밀번호 입력', () => {
  test('짧은 비밀번호를 입력하면 비밀번호 형식 에러가 보여진다.', async () => {
    // Given
    const { onVerifyPw } = renderPasswordVerify();

    // When
    userEvent.type(getPasswordInput(), 'abc12');

    // Then
    expect(await screen.findByText('ENTER_INPUT_8TO20')).toBeVisible();
    expect(onVerifyPw).toHaveBeenLastCalledWith(false, 'abc12');
  });

  test('비밀번호와 비밀번호 확인 값이 다르면 불일치 에러가 보여진다.', async () => {
    // Given
    const { onVerifyPw } = renderPasswordVerify();

    // When
    userEvent.type(getPasswordInput(), 'abc12345');
    userEvent.type(getPasswordConfirmInput(), 'abc12346');

    // Then
    expect(await screen.findByText('NO_MATCHING_PW')).toBeVisible();
    expect(onVerifyPw).toHaveBeenLastCalledWith(false, 'abc12345');
  });

  test('올바른 비밀번호를 동일하게 입력하면 검증 완료 상태를 전달한다.', async () => {
    // Given
    const { onVerifyPw } = renderPasswordVerify();

    // When
    userEvent.type(getPasswordInput(), 'abc12345');
    userEvent.type(getPasswordConfirmInput(), 'abc12345');

    // Then
    await waitFor(() => {
      expect(onVerifyPw).toHaveBeenLastCalledWith(true, 'abc12345');
    });
    expect(screen.queryByText('NO_MATCHING_PW')).not.toBeInTheDocument();
  });

  test('외부에서 전달된 비밀번호 에러 메시지가 있으면 해당 메시지가 보여진다.', async () => {
    // Given
    renderPasswordVerify({ errMessage: 'SERVER_PW_ERROR' });

    // Then
    expect(await screen.findByText('SERVER_PW_ERROR')).toBeVisible();
  });
});

describe('[회원가입 페이지] 나이 계산', () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(new Date('2026-05-06T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('만 16세 이상이면 성인으로 판단한다.', () => {
    expect(calculateAge('2010-05-06')).toBe('adult');
  });

  test('만 16세 생일이 지나지 않았으면 어린이로 판단한다.', () => {
    expect(calculateAge('2010-05-07')).toBe('child');
  });

  test('만 16세 미만이면 어린이로 판단한다.', () => {
    expect(calculateAge('2011-05-06')).toBe('child');
  });
});

describe('[회원가입 페이지] 인증 타이머', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('처음에는 5분으로 표시된다.', () => {
    render(<Timer />);

    expect(screen.getByText('05 : 00')).toBeInTheDocument();
  });

  test('1초가 지나면 남은 시간이 줄어든다.', () => {
    render(<Timer />);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('04 : 59')).toBeInTheDocument();
  });

  test('시간이 만료되면 완료 콜백을 실행하고 타이머를 숨긴다.', async () => {
    const onFinishTimer = vi.fn();

    render(<Timer onFinishTimer={onFinishTimer} />);

    act(() => {
      vi.advanceTimersByTime(5 * 60 * 1000);
    });

    expect(onFinishTimer).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/\d{2} : \d{2}/)).not.toBeInTheDocument();
  });
});

describe('[회원가입 페이지] 생년월일 선택', () => {
  test('연도, 월, 일 선택 영역을 보여주고 초기 값을 전달한다.', async () => {
    const onChange = vi.fn();

    render(<BirthdateSelector onChange={onChange} />);

    expect(screen.getByLabelText('year')).toBeInTheDocument();
    expect(screen.getByLabelText('month')).toBeInTheDocument();
    expect(screen.getByLabelText('day')).toBeInTheDocument();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith({
        year: '',
        month: '',
        day: '',
      });
    });
  });
});
