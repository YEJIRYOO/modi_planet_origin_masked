import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PaginationControls from '@src/pages/course/learning/components/PaginationControls';

describe('[학습 페이지] 페이지네이션 컨트롤', () => {
  test('현재 페이지와 전체 페이지를 입력 필드에 표시한다.', () => {
    // Given
    render(
      <PaginationControls
        currentPage={2}
        totalPages={5}
        onPrevPage={vi.fn()}
        onNextPage={vi.fn()}
      />,
    );

    // Then
    expect(screen.getByDisplayValue('2')).toBeVisible();
    expect(screen.getByDisplayValue('5')).toBeDisabled();
  });

  test('이전/다음 버튼 클릭 시 전달받은 함수를 실행한다.', () => {
    // Given
    const onPrevPage = vi.fn();
    const onNextPage = vi.fn();

    render(
      <PaginationControls
        currentPage={2}
        totalPages={5}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />,
    );

    const [prevButton, nextButton] = screen.getAllByRole('button');

    // When
    userEvent.click(prevButton);
    userEvent.click(nextButton);

    // Then
    expect(onPrevPage).toHaveBeenCalledTimes(1);
    expect(onNextPage).toHaveBeenCalledTimes(1);
  });

  test('첫 페이지에서는 이전 버튼이 비활성화된다.', () => {
    // Given
    const onPrevPage = vi.fn();

    render(
      <PaginationControls
        currentPage={1}
        totalPages={5}
        onPrevPage={onPrevPage}
        onNextPage={vi.fn()}
      />,
    );

    const [prevButton] = screen.getAllByRole('button');

    // When
    userEvent.click(prevButton);

    // Then
    expect(prevButton).toBeDisabled();
    expect(onPrevPage).not.toHaveBeenCalled();
  });

  test('마지막 페이지에서는 다음 버튼이 비활성화된다.', () => {
    // Given
    const onNextPage = vi.fn();

    render(
      <PaginationControls
        currentPage={5}
        totalPages={5}
        onPrevPage={vi.fn()}
        onNextPage={onNextPage}
      />,
    );

    const [, nextButton] = screen.getAllByRole('button');

    // When
    userEvent.click(nextButton);

    // Then
    expect(nextButton).toBeDisabled();
    expect(onNextPage).not.toHaveBeenCalled();
  });

  test('유효한 페이지를 입력하고 Enter를 누르면 페이지 변경 함수를 실행한다.', () => {
    // Given
    const onPageChange = vi.fn();

    render(
      <PaginationControls
        currentPage={2}
        totalPages={5}
        onPrevPage={vi.fn()}
        onNextPage={vi.fn()}
        onPageChange={onPageChange}
      />,
    );

    const currentPageInput = screen.getByDisplayValue('2');

    // When
    userEvent.clear(currentPageInput);
    userEvent.type(currentPageInput, '4{enter}');

    // Then
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  test('범위를 벗어난 페이지 입력은 기존 페이지로 되돌린다.', () => {
    // Given
    const onPageChange = vi.fn();

    render(
      <PaginationControls
        currentPage={2}
        totalPages={5}
        onPrevPage={vi.fn()}
        onNextPage={vi.fn()}
        onPageChange={onPageChange}
      />,
    );

    const currentPageInput = screen.getByDisplayValue('2');

    // When
    userEvent.clear(currentPageInput);
    userEvent.type(currentPageInput, '9{enter}');

    // Then
    expect(onPageChange).not.toHaveBeenCalled();
    expect(screen.getByDisplayValue('2')).toBeVisible();
  });
});
