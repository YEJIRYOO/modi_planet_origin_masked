import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LearningPageHeader from '@src/pages/course/learning/components/LearningPageHeader';

const renderLearningPageHeader = (
  props?: Partial<React.ComponentProps<typeof LearningPageHeader>>,
) => {
  const defaultProps: React.ComponentProps<typeof LearningPageHeader> = {
    lessonName: '반복문 배우기',
    lessonIndex: 2,
    stepName: 'for 문으로 반복하기',
    completedSteps: 3,
    totalSteps: 5,
    onExit: vi.fn(),
    onLessonClick: vi.fn(),
    onFeedbackClick: vi.fn(),
  };

  return render(<LearningPageHeader {...defaultProps} {...props} />);
};

describe('[학습 페이지] 헤더', () => {
  test('수업명, 단계명, 진행률을 표시한다.', () => {
    // Given
    renderLearningPageHeader();

    // Then
    expect(
      screen.getByRole('button', { name: '2. 반복문 배우기' }),
    ).toBeVisible();
    expect(screen.getByText('for 문으로 반복하기')).toBeVisible();
    expect(screen.getByText('3/5')).toBeVisible();
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '60',
    );
  });

  test('수업명, 피드백, 학습 종료 버튼 클릭을 처리한다.', () => {
    // Given
    const onLessonClick = vi.fn();
    const onFeedbackClick = vi.fn();
    const onExit = vi.fn();

    renderLearningPageHeader({
      onLessonClick,
      onFeedbackClick,
      onExit,
    });

    // When
    userEvent.click(screen.getByRole('button', { name: '2. 반복문 배우기' }));
    userEvent.click(screen.getByRole('button', { name: 'SEND_FEEDBACK' }));
    userEvent.click(screen.getByRole('button', { name: 'END_LEARNING' }));

    // Then
    expect(onLessonClick).toHaveBeenCalledTimes(1);
    expect(onFeedbackClick).toHaveBeenCalledTimes(1);
    expect(onExit).toHaveBeenCalledTimes(1);
  });

  test('단계 정보를 숨기면 단계명과 진행률, 피드백 버튼을 표시하지 않는다.', () => {
    // Given
    renderLearningPageHeader({ hideStepInfo: true });

    // Then
    expect(screen.queryByText('for 문으로 반복하기')).toBeNull();
    expect(screen.queryByText('3/5')).toBeNull();
    expect(screen.queryByRole('progressbar')).toBeNull();
    expect(
      screen.queryByRole('button', { name: 'SEND_FEEDBACK' }),
    ).toBeNull();
    expect(screen.getByRole('button', { name: 'END_LEARNING' })).toBeVisible();
  });

  test('전체 단계 수가 0이면 진행률을 0으로 표시한다.', () => {
    // Given
    renderLearningPageHeader({
      completedSteps: 0,
      totalSteps: 0,
    });

    // Then
    expect(screen.getByText('0/0')).toBeVisible();
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
  });
});
