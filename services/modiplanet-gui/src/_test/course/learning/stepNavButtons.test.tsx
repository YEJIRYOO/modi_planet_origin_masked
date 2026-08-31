import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import StepNavButtons from '@src/pages/course/learning/components/StepNavButtons';

describe('[학습 페이지] 단계 이동 버튼', () => {
  test('이전/다음 단계 버튼을 클릭하면 각각의 함수를 실행한다.', () => {
    // Given
    const onPrevStep = vi.fn();
    const onNextStep = vi.fn();

    render(
      <StepNavButtons
        hasPrevStep
        hasNextStep
        onPrevStep={onPrevStep}
        onNextStep={onNextStep}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'PREV_STEP' }));
    userEvent.click(screen.getByRole('button', { name: 'NEXT_STEP' }));

    // Then
    expect(onPrevStep).toHaveBeenCalledTimes(1);
    expect(onNextStep).toHaveBeenCalledTimes(1);
  });

  test('이동할 단계가 없으면 단계 이동 버튼이 비활성화된다.', () => {
    // Given
    const onPrevStep = vi.fn();
    const onNextStep = vi.fn();

    render(
      <StepNavButtons
        hasPrevStep={false}
        hasNextStep={false}
        onPrevStep={onPrevStep}
        onNextStep={onNextStep}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'PREV_STEP' }));
    userEvent.click(screen.getByRole('button', { name: 'NEXT_STEP' }));

    // Then
    expect(screen.getByRole('button', { name: 'PREV_STEP' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'NEXT_STEP' })).toBeDisabled();
    expect(onPrevStep).not.toHaveBeenCalled();
    expect(onNextStep).not.toHaveBeenCalled();
  });

  test('첫 단계에서는 이전 수업 버튼을 표시하고 클릭 함수를 실행한다.', () => {
    // Given
    const onPrevLesson = vi.fn();

    render(
      <StepNavButtons
        isFirstStep
        hasPrevLesson
        hasPrevStep={false}
        hasNextStep
        onPrevLesson={onPrevLesson}
        onPrevStep={vi.fn()}
        onNextStep={vi.fn()}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'PREV_LESSON' }));

    // Then
    expect(screen.queryByRole('button', { name: 'PREV_STEP' })).toBeNull();
    expect(onPrevLesson).toHaveBeenCalledTimes(1);
  });

  test('마지막 단계에서는 다음 수업 버튼을 표시하고 클릭 함수를 실행한다.', () => {
    // Given
    const onNextLesson = vi.fn();

    render(
      <StepNavButtons
        isLastStep
        hasNextLesson
        hasPrevStep
        hasNextStep={false}
        onPrevStep={vi.fn()}
        onNextStep={vi.fn()}
        onNextLesson={onNextLesson}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'NEXT_LESSON' }));

    // Then
    expect(screen.queryByRole('button', { name: 'NEXT_STEP' })).toBeNull();
    expect(onNextLesson).toHaveBeenCalledTimes(1);
  });
});
