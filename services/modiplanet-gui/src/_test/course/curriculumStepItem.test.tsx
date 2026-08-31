import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CurriculumStepItem from '@src/pages/course/components/CurriculumStepItem';
import { CourseStepDType, ProgressStatus } from '@src/services/gen/gen';

import { createCourseStep, renderWithCourseRoute } from './courseTestUtils';

describe('[코스 상세] 커리큘럼 단계 아이템', () => {
  test('단계명과 진행 상태 아이콘을 표시한다.', () => {
    // Given
    const step = createCourseStep({
      stepId: 'step-2',
      stepName: '진행 중인 영상',
      status: ProgressStatus.InProgress,
      stepType: CourseStepDType.Youtube,
    });

    renderWithCourseRoute(
      <CurriculumStepItem
        lessonId="lesson-1"
        step={step}
        index={1}
        isSignedIn
        onRequireLogin={() => undefined}
      />,
    );

    // Then
    expect(screen.getByText('진행 중인 영상')).toBeVisible();
    expect(screen.getByAltText('IN_PROGRESS')).toHaveAttribute(
      'src',
      '/assets/course/curriculum/progress.svg',
    );
  });

  test('로그인한 상태에서 단계를 누르면 해당 학습 단계로 이동한다.', () => {
    // Given
    const step = createCourseStep({
      stepId: 'step-2',
      stepName: '실습 시작하기',
      status: ProgressStatus.NotStarted,
      stepType: CourseStepDType.Coding,
    });

    renderWithCourseRoute(
      <CurriculumStepItem
        lessonId="lesson-1"
        step={step}
        index={0}
        isSignedIn
        onRequireLogin={() => undefined}
      />,
    );

    // When
    userEvent.click(screen.getByText('실습 시작하기'));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/course-group/group-1/course/course-1/lesson/lesson-1/step/step-2',
    );
  });

  test('로그인하지 않은 상태에서 단계를 누르면 로그인 필요 콜백을 실행하고 이동하지 않는다.', () => {
    // Given
    let requiredLogin = false;
    const step = createCourseStep({
      stepId: 'step-2',
      stepName: '로그인이 필요한 실습',
    });

    renderWithCourseRoute(
      <CurriculumStepItem
        lessonId="lesson-1"
        step={step}
        index={0}
        isSignedIn={false}
        onRequireLogin={() => {
          requiredLogin = true;
        }}
      />,
    );

    // When
    userEvent.click(screen.getByText('로그인이 필요한 실습'));

    // Then
    expect(requiredLogin).toBe(true);
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/course-group/group-1/course/course-1',
    );
  });
});
