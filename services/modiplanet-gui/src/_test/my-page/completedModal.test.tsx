import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PasswordCompletedModal from '@src/pages/my-page/MyPageComponent/UserInfoComponent/inputs/PasswordCompletedModal';
import WithdrawalCompletedModal from '@src/pages/my-page/MyPageComponent/WithdrawalComponent/WithdrawalCompletedModal';

describe('[마이페이지] 완료 모달', () => {
  test('비밀번호 변경 완료 모달에서 확인 버튼 클릭을 처리한다.', () => {
    // Given
    const onClick = vi.fn();

    render(<PasswordCompletedModal isOpen onClick={onClick} />);

    // When
    userEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    expect(
      screen.getByRole('heading', { name: 'CHANGE_PW_COMPLETED' }),
    ).toBeVisible();
    expect(screen.getByText('CHANGE_PW_COMPLETED_DESC')).toBeVisible();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('회원 탈퇴 완료 모달에서 확인 버튼 클릭을 처리한다.', () => {
    // Given
    const onClick = vi.fn();

    render(<WithdrawalCompletedModal isOpen onClick={onClick} />);

    // When
    userEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    expect(
      screen.getByRole('heading', { name: 'WITHDRAWAL_COMPLETED' }),
    ).toBeVisible();
    expect(screen.getByText('WITHDRAWAL_COMPLETED_DESC')).toBeVisible();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
