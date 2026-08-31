import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CurriculumModal from '@src/pages/course/learning/components/CurriculumModal';
import FeedbackModal from '@src/pages/course/learning/components/FeedbackModal';
import FullscreenToggle from '@src/pages/course/learning/components/FullscreenToggle';
import LearningPageFooter from '@src/pages/course/learning/components/LearningPageFooter';
import { ProgressStatus } from '@src/services/gen/gen';

describe('[학습 페이지] 기본 컴포넌트', () => {
  test('전체화면 토글은 상태에 맞는 아이콘을 보여주고 클릭을 전달한다.', () => {
    // Given
    const onToggle = vi.fn();

    const { rerender } = render(
      <FullscreenToggle isFullscreen={false} onToggle={onToggle} />,
    );

    // When
    userEvent.click(screen.getByRole('button'));

    // Then
    expect(screen.getByAltText('Fullscreen')).toHaveAttribute(
      'src',
      '/assets/course/curriculum/fullscreen.svg',
    );
    expect(onToggle).toHaveBeenCalledTimes(1);

    // When
    rerender(<FullscreenToggle isFullscreen onToggle={onToggle} />);

    // Then
    expect(screen.getByAltText('Fullscreen')).toHaveAttribute(
      'src',
      '/assets/course/curriculum/minscreen.svg',
    );
  });

  test('푸터는 페이지네이션, 전체화면, 단계 이동 버튼을 함께 렌더링한다.', () => {
    // Given
    const onPrevPage = vi.fn();
    const onNextPage = vi.fn();
    const onPrevStep = vi.fn();
    const onNextStep = vi.fn();
    const onToggleFullscreen = vi.fn();

    render(
      <LearningPageFooter
        currentPage={2}
        totalPages={3}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        onPrevStep={onPrevStep}
        onNextStep={onNextStep}
        hasPrevStep
        hasNextStep
        onToggleFullscreen={onToggleFullscreen}
        isFullscreen={false}
      />,
    );

    const [prevPageButton, nextPageButton] = screen.getAllByRole('button');

    // When
    userEvent.click(prevPageButton);
    userEvent.click(nextPageButton);
    userEvent.click(screen.getByAltText('Fullscreen'));
    userEvent.click(screen.getByRole('button', { name: 'PREV_STEP' }));
    userEvent.click(screen.getByRole('button', { name: 'NEXT_STEP' }));

    // Then
    expect(screen.getByDisplayValue('2')).toBeVisible();
    expect(onPrevPage).toHaveBeenCalledTimes(1);
    expect(onNextPage).toHaveBeenCalledTimes(1);
    expect(onToggleFullscreen).toHaveBeenCalledTimes(1);
    expect(onPrevStep).toHaveBeenCalledTimes(1);
    expect(onNextStep).toHaveBeenCalledTimes(1);
  });

  test('푸터는 페이지네이션을 숨기고 수업 이동 버튼만 표시할 수 있다.', () => {
    // Given
    const onPrevLesson = vi.fn();
    const onNextLesson = vi.fn();

    render(
      <LearningPageFooter
        currentPage={1}
        totalPages={1}
        onPrevPage={vi.fn()}
        onNextPage={vi.fn()}
        onPrevStep={vi.fn()}
        onNextStep={vi.fn()}
        hasPrevStep={false}
        hasNextStep={false}
        onToggleFullscreen={vi.fn()}
        isFullscreen
        showPagination={false}
        isFirstStep
        isLastStep
        hasPrevLesson
        hasNextLesson
        onPrevLesson={onPrevLesson}
        onNextLesson={onNextLesson}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'PREV_LESSON' }));
    userEvent.click(screen.getByRole('button', { name: 'NEXT_LESSON' }));

    // Then
    expect(screen.queryByDisplayValue('1')).toBeNull();
    expect(onPrevLesson).toHaveBeenCalledTimes(1);
    expect(onNextLesson).toHaveBeenCalledTimes(1);
  });

  test('커리큘럼 모달은 선택한 차시로 이동하고 닫기 함수를 실행한다.', () => {
    // Given
    const onClose = vi.fn();
    const onSelectLesson = vi.fn();

    render(
      <CurriculumModal
        isOpen
        onClose={onClose}
        courseName="블록 코딩 기초"
        currentLessonId="lesson-1"
        lessons={[
          {
            id: 'lesson-1',
            name: '기본 개념',
            completedSteps: 1,
            totalSteps: 2,
            status: ProgressStatus.InProgress,
          },
          {
            id: 'lesson-2',
            name: '조건문 실습',
            completedSteps: 2,
            totalSteps: 2,
            status: ProgressStatus.Completed,
          },
        ]}
        onSelectLesson={onSelectLesson}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: /2. 조건문 실습/ }));
    userEvent.click(screen.getByRole('button', { name: 'MOVE_TO' }));

    // Then
    expect(screen.getByText('블록 코딩 기초')).toBeVisible();
    expect(screen.getByText('STUDY_IN_PROGRESS')).toBeVisible();
    expect(screen.getByText('STUDY_COMPLETED')).toBeVisible();
    expect(onSelectLesson).toHaveBeenCalledWith('lesson-2');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('피드백 모달은 내용을 입력하면 기본 카테고리와 함께 전송한다.', async () => {
    // Given
    const onClose = vi.fn();
    const onSendFeedback = vi.fn().mockResolvedValue(undefined);

    render(
      <FeedbackModal
        isOpen
        onClose={onClose}
        courseName="블록 코딩 기초"
        lessonName="기본 개념"
        onSendFeedback={onSendFeedback}
      />,
    );

    const sendButton = screen.getByRole('button', { name: 'SEND_FEEDBACK' });

    // When
    userEvent.type(
      screen.getByPlaceholderText('LESSON_FEEDBACK'),
      '자료가 좋아요',
    );
    userEvent.click(sendButton);

    // Then
    await waitFor(() =>
      expect(onSendFeedback).toHaveBeenCalledWith({
        category: 'SERVICE_ERROR',
        description: '자료가 좋아요',
      }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
