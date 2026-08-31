import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EmailVerifyButtonUI from '@src/components/ui/Button/EmailVerifyButtonUI';
import FixedHeightButtonUI from '@src/components/ui/Button/FixedHeightButtonUI';

describe('[공통 UI] 버튼', () => {
  test('고정 높이 버튼을 클릭하면 클릭 함수를 실행한다.', () => {
    // Given
    const onClick = vi.fn();

    render(
      <FixedHeightButtonUI size="lg" rounded onClick={onClick}>
        NEXT
      </FixedHeightButtonUI>,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'NEXT' }));

    // Then
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'NEXT' })).toHaveClass(
      'h-[60px]',
      'pl-[46px]',
      'pr-[46px]',
    );
  });

  test('고정 높이 버튼이 비활성화되면 클릭 함수를 실행하지 않는다.', () => {
    // Given
    const onClick = vi.fn();

    render(
      <FixedHeightButtonUI isDisabled onClick={onClick}>
        NEXT
      </FixedHeightButtonUI>,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'NEXT' }));

    // Then
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'NEXT' })).toBeDisabled();
  });

  test('이메일 인증 버튼은 크기와 비활성화 스타일을 적용한다.', () => {
    // Given
    const onClick = vi.fn();

    render(
      <EmailVerifyButtonUI size="sm" isDisabled onClick={onClick}>
        SEND
      </EmailVerifyButtonUI>,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'SEND' }));

    // Then
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'SEND' })).toHaveClass(
      'h-[32px]',
      'pl-[12px]',
      'pr-[12px]',
      'bg-form-disable',
    );
  });

  test('이메일 인증 버튼은 bordered 옵션으로 테두리형 버튼을 사용할 수 있다.', () => {
    // Given
    const onClick = vi.fn();

    render(
      <EmailVerifyButtonUI bordered rounded onClick={onClick}>
        RE_SEND
      </EmailVerifyButtonUI>,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'RE_SEND' }));

    // Then
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'RE_SEND' })).toHaveClass(
      'h-[46px]',
      'pl-0',
      'pr-0',
      'flex-center',
    );
  });
});
