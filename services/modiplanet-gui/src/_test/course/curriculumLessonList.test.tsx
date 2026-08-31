import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CurriculumLessonList from '@src/pages/course/components/CurriculumLessonList';
import { CourseStepDType, ProgressStatus } from '@src/services/gen/gen';

import {
  clearProfile,
  createCourseDetail,
  createCourseLesson,
  createCourseStep,
  renderWithCourseRoute,
  signInWithProfile,
} from './courseTestUtils';

const courseWithCurriculum = createCourseDetail({
  lessons: [
    createCourseLesson({
      lessonId: 'lesson-1',
      lessonName: '기본 개념',
      description: '기본 개념 설명입니다.',
      idx: 1,
      status: ProgressStatus.InProgress,
      completedSteps: 1,
      totalSteps: 3,
      steps: [
        createCourseStep({
          stepId: 'step-1',
          stepName: '완료한 영상',
          idx: 1,
          status: ProgressStatus.Completed,
          stepType: CourseStepDType.Vod,
        }),
        createCourseStep({
          stepId: 'step-2',
          stepName: '먼저 진행한 실습',
          idx: 2,
          status: ProgressStatus.InProgress,
          stepType: CourseStepDType.Coding,
        }),
        createCourseStep({
          stepId: 'step-3',
          stepName: '마지막 진행 실습',
          idx: 3,
          status: ProgressStatus.InProgress,
          stepType: CourseStepDType.Coding,
        }),
      ],
    }),
    createCourseLesson({
      lessonId: 'lesson-2',
      lessonName: '조건문 실습',
      description: '조건문 설명입니다.',
      idx: 2,
      status: ProgressStatus.NotStarted,
      completedSteps: 0,
      totalSteps: 2,
      steps: [
        createCourseStep({
          stepId: 'step-4',
          stepName: '조건문 이론',
          idx: 1,
          status: ProgressStatus.NotStarted,
          stepType: CourseStepDType.Ppt,
        }),
      ],
    }),
    createCourseLesson({
      lessonId: 'lesson-3',
      lessonName: '자료 없는 차시',
      description: '아직 자료가 없습니다.',
      idx: 3,
      status: ProgressStatus.NotStarted,
      completedSteps: 0,
      totalSteps: 0,
      steps: [],
    }),
  ],
});

describe('[코스 상세] 커리큘럼 목록', () => {
  afterEach(() => {
    clearProfile();
  });

  test('차시 목록과 상태를 표시하고 펼치면 단계 목록을 보여준다.', () => {
    // Given
    renderWithCourseRoute(
      <CurriculumLessonList
        courseId="course-1"
        course={courseWithCurriculum}
      />,
    );

    // When
    userEvent.click(screen.getAllByAltText('drop')[0]);

    // Then
    expect(screen.getByText('CURRICULUM')).toBeVisible();
    expect(screen.getByRole('button', { name: '1. 기본 개념' })).toBeVisible();
    expect(screen.getByText('1/3')).toBeVisible();
    expect(screen.getAllByText('STUDY_IN_PROGRESS').length).toBeGreaterThan(0);
    expect(screen.getByText('기본 개념 설명입니다.')).toBeVisible();
    expect(screen.getByText('완료한 영상')).toBeVisible();
    expect(screen.getByText('먼저 진행한 실습')).toBeVisible();
    expect(screen.getByText('마지막 진행 실습')).toBeVisible();
  });

  test('진행 중인 단계가 여러 개 있으면 idx가 가장 큰 단계로 이동한다.', () => {
    // Given
    signInWithProfile();

    renderWithCourseRoute(
      <CurriculumLessonList
        courseId="course-1"
        course={courseWithCurriculum}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: '1. 기본 개념' }));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/course-group/group-1/course/course-1/lesson/lesson-1/step/step-3',
    );
  });

  test('진행 중인 단계가 없으면 첫 번째 미시작 단계로 이동한다.', () => {
    // Given
    signInWithProfile();

    renderWithCourseRoute(
      <CurriculumLessonList
        courseId="course-1"
        course={courseWithCurriculum}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: '2. 조건문 실습' }));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/course-group/group-1/course/course-1/lesson/lesson-2/step/step-4',
    );
  });

  test('단계가 없는 차시는 차시 경로로 이동한다.', () => {
    // Given
    signInWithProfile();

    renderWithCourseRoute(
      <CurriculumLessonList
        courseId="course-1"
        course={courseWithCurriculum}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: '3. 자료 없는 차시' }));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/course-group/group-1/course/course-1/lesson/lesson-3',
    );
  });

  test('로그인하지 않고 차시를 누르면 로그인 안내를 표시하고 현재 경로를 유지한다.', () => {
    // Given
    renderWithCourseRoute(
      <CurriculumLessonList
        courseId="course-1"
        course={courseWithCurriculum}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: '1. 기본 개념' }));

    // Then
    expect(screen.getByText('NEED_TO_SIGN_IN')).toBeVisible();
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/course-group/group-1/course/course-1',
    );
  });
});
