import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Badge from '@src/components/ui_old/badge/badge';
import Button from '@src/components/ui_old/button/button';
import SubButton from '@src/components/ui_old/button/sub-button';
import InputWrapper from '@src/components/ui_old/form/input-wrapper';
import Label from '@src/components/ui_old/form/label';
import Loading from '@src/components/ui_old/loading/loading';
import LogoSpinnerLoader from '@src/components/ui_old/loading/logo-spinner-loader';
import SpinnerLoader from '@src/components/ui_old/loading/spinner-loader';

describe('[ui_old] 기본 컴포넌트', () => {
  test('배지는 색상과 테두리 옵션에 맞는 클래스를 적용한다.', () => {
    // Given
    render(<Badge content="출석" color="amber" hasBorder />);

    // Then
    expect(screen.getByText('출석')).toHaveClass('border-amber');
    expect(screen.getByText('출석')).toHaveClass('text-amber');
  });

  test('배지는 숨김 상태이면 hidden 클래스를 적용한다.', () => {
    // Given
    render(<Badge content="숨김" isView />);

    // Then
    expect(screen.getByText('숨김')).toHaveClass('hidden');
  });

  test('기본 버튼은 클릭 이벤트를 전달하고 버튼 타입을 유지한다.', () => {
    // Given
    const onClick = vi.fn();

    render(<Button onClick={onClick}>저장</Button>);

    // When
    userEvent.click(screen.getByRole('button', { name: '저장' }));

    // Then
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: '저장' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  test('버튼은 mini와 round 옵션 클래스를 적용한다.', () => {
    // Given
    render(
      <Button isMini isRound color="dark-line">
        더보기
      </Button>,
    );

    // Then
    expect(screen.getByRole('button', { name: '더보기' })).toHaveClass(
      'rounded-full',
    );
    expect(screen.getByRole('button', { name: '더보기' })).toHaveClass(
      'h-[46px]',
    );
    expect(screen.getByRole('button', { name: '더보기' })).toHaveClass(
      'border-font-main',
    );
  });

  test('서브 버튼은 타입별 스타일과 클릭 이벤트를 적용한다.', () => {
    // Given
    const onClick = vi.fn();

    render(
      <SubButton type="red-border" onClick={onClick}>
        삭제
      </SubButton>,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: '삭제' }));

    // Then
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: '삭제' })).toHaveClass(
      'border-brand',
    );
    expect(screen.getByRole('button', { name: '삭제' })).toHaveClass(
      'text-brand',
    );
  });

  test('라벨은 필수 표시와 너비 옵션 클래스를 적용한다.', () => {
    // Given
    render(
      <Label width="md" isRequired>
        이메일
      </Label>,
    );

    // Then
    expect(screen.getByText('이메일')).toHaveClass('min-w-[160px]');
    expect(screen.getByText('*')).toBeVisible();
  });

  test('입력 래퍼는 전달받은 클래스를 함께 적용한다.', () => {
    // Given
    render(
      <InputWrapper className="gap-2">
        <input aria-label="이름" />
      </InputWrapper>,
    );

    // Then
    expect(screen.getByLabelText('이름').parentElement).toHaveClass('flex');
    expect(screen.getByLabelText('이름').parentElement).toHaveClass('gap-2');
  });

  test('로딩 컴포넌트는 로고 스피너를 표시한다.', () => {
    // Given
    render(<Loading className="fixed" />);

    // Then
    expect(screen.getByAltText('spinner')).toHaveAttribute(
      'src',
      '/assets/loading/logo-spinner-loading.gif',
    );
    expect(
      screen.getByAltText('spinner').parentElement?.parentElement,
    ).toHaveClass('fixed');
  });

  test('스피너 이미지는 전달받은 클래스와 이미지 경로를 적용한다.', () => {
    // Given
    render(
      <>
        <LogoSpinnerLoader className="logo-size" />
        <SpinnerLoader className="plain-size" />
      </>,
    );

    // Then
    expect(screen.getAllByAltText('spinner')[0]).toHaveClass('logo-size');
    expect(screen.getAllByAltText('spinner')[0]).toHaveAttribute(
      'src',
      '/assets/loading/logo-spinner-loading.gif',
    );
    expect(screen.getAllByAltText('spinner')[1]).toHaveClass('plain-size');
    expect(screen.getAllByAltText('spinner')[1]).toHaveAttribute(
      'src',
      '/assets/loading/spinner-loading.gif',
    );
  });
});
