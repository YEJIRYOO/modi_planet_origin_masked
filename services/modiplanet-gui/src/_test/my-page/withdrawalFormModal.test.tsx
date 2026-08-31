import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WithdrawalFormModal from '@src/pages/my-page/MyPageComponent/WithdrawalComponent/WithdrawalFormModal';

const getDefaultProps = (): React.ComponentProps<typeof WithdrawalFormModal> => ({
  isOpen: true,
  onClose: vi.fn(),
  isSocialUser: false,
  onSubmit: vi.fn(),
  errorMsg: '',
  onClearErrorMsg: vi.fn(),
});

const renderWithdrawalFormModal = (
  props?: Partial<React.ComponentProps<typeof WithdrawalFormModal>>,
) => {
  const defaultProps = getDefaultProps();

  return render(<WithdrawalFormModal {...defaultProps} {...props} />);
};

describe('[마이페이지] 회원 탈퇴 폼 모달', () => {
  test('탈퇴 사유, 약관 동의, 비밀번호가 없으면 탈퇴 버튼을 비활성화한다.', () => {
    // Given
    renderWithdrawalFormModal();

    // Then
    expect(screen.getByRole('button', { name: 'WITHDRAWAL2' })).toBeDisabled();
  });

  test('이메일 가입자는 사유와 약관, 비밀번호를 입력하면 탈퇴 요청을 전달한다.', () => {
    // Given
    const onSubmit = vi.fn();

    renderWithdrawalFormModal({ onSubmit });

    // When
    userEvent.click(screen.getByRole('checkbox', { name: 'LOW_FREQUENCY' }));
    userEvent.type(screen.getByPlaceholderText('ENTER_PW'), 'password123!');
    userEvent.click(
      screen.getByRole('checkbox', { name: 'CHECK_AND_ALL_AGREE' }),
    );
    userEvent.click(screen.getByRole('button', { name: 'WITHDRAWAL2' }));

    // Then
    expect(onSubmit).toHaveBeenCalledWith('password123!', ['사용 빈도 낮음']);
  });

  test('소셜 가입자는 기타 사유와 약관 동의만으로 탈퇴 요청을 전달한다.', () => {
    // Given
    const onSubmit = vi.fn();

    renderWithdrawalFormModal({ isSocialUser: true, onSubmit });

    // When
    userEvent.click(screen.getByRole('checkbox', { name: 'ETC' }));
    userEvent.type(screen.getByPlaceholderText('ENTER_REASON'), '사용하지 않음');
    userEvent.click(
      screen.getByRole('checkbox', { name: 'CHECK_AND_ALL_AGREE' }),
    );
    userEvent.click(screen.getByRole('button', { name: 'WITHDRAWAL2' }));

    // Then
    expect(onSubmit).toHaveBeenCalledWith('', ['사용하지 않음']);
  });

  test('여러 탈퇴 사유를 선택하면 서버에 전달할 문구로 변환한다.', () => {
    // Given
    const onSubmit = vi.fn();

    renderWithdrawalFormModal({ onSubmit });

    // When
    userEvent.click(screen.getByRole('checkbox', { name: 'LOW_FREQUENCY' }));
    userEvent.click(screen.getByRole('checkbox', { name: 'NO_CONTENT' }));
    userEvent.click(screen.getByRole('checkbox', { name: 'USE_HARD' }));
    userEvent.click(screen.getByRole('checkbox', { name: 'SERVICE_ERR' }));
    userEvent.type(screen.getByPlaceholderText('ENTER_PW'), 'password123!');
    userEvent.click(
      screen.getByRole('checkbox', { name: 'CHECK_AND_ALL_AGREE' }),
    );
    userEvent.click(screen.getByRole('button', { name: 'WITHDRAWAL2' }));

    // Then
    expect(onSubmit).toHaveBeenCalledWith('password123!', [
      '사용 빈도 낮음',
      '즐길 콘텐츠 부족',
      '이용의 어려움',
      '서비스 장애',
    ]);
  });

  test('기타 사유는 선택했을 때만 입력할 수 있고 선택 해제하면 입력값을 초기화한다.', () => {
    // Given
    renderWithdrawalFormModal();

    // Then
    expect(screen.getByPlaceholderText('ENTER_REASON')).toBeDisabled();

    // When
    userEvent.click(screen.getByRole('checkbox', { name: 'ETC' }));
    userEvent.type(screen.getByPlaceholderText('ENTER_REASON'), '직접 입력');

    // Then
    expect(screen.getByPlaceholderText('ENTER_REASON')).not.toBeDisabled();
    expect(screen.getByPlaceholderText('ENTER_REASON')).toHaveValue(
      '직접 입력',
    );

    // When
    userEvent.click(screen.getByRole('checkbox', { name: 'ETC' }));

    // Then
    expect(screen.getByPlaceholderText('ENTER_REASON')).toBeDisabled();
    expect(screen.getByPlaceholderText('ENTER_REASON')).toHaveValue('');
  });

  test('모달이 닫히면 입력 상태와 에러 메시지를 초기화한다.', () => {
    // Given
    const props = getDefaultProps();
    const onClearErrorMsg = vi.fn();
    const { rerender } = renderWithdrawalFormModal({
      ...props,
      onClearErrorMsg,
    });

    userEvent.click(screen.getByRole('checkbox', { name: 'LOW_FREQUENCY' }));
    userEvent.type(screen.getByPlaceholderText('ENTER_PW'), 'password123!');
    userEvent.click(
      screen.getByRole('checkbox', { name: 'CHECK_AND_ALL_AGREE' }),
    );

    // When
    rerender(
      <WithdrawalFormModal
        {...props}
        isOpen={false}
        onClearErrorMsg={onClearErrorMsg}
      />,
    );
    rerender(
      <WithdrawalFormModal
        {...props}
        isOpen
        onClearErrorMsg={onClearErrorMsg}
      />,
    );

    // Then
    expect(onClearErrorMsg).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'WITHDRAWAL2' })).toBeDisabled();
  });

  test('취소 버튼을 클릭하면 닫기 함수를 실행한다.', () => {
    // Given
    const onClose = vi.fn();

    renderWithdrawalFormModal({ onClose });

    // When
    userEvent.click(screen.getByRole('button', { name: 'CANCEL' }));

    // Then
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
