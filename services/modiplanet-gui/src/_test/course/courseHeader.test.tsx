import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CourseHeader from '@src/pages/course/components/CourseHeader';
import { CourseDifficulty, ProgressStatus } from '@src/services/gen/gen';

import {
  clearProfile,
  createCourseDetail,
  createCourseLesson,
  profileFixture,
  renderWithCourseRoute,
  signInWithProfile,
} from './courseTestUtils';

describe('[코스 상세] 헤더', () => {
  afterEach(() => {
    clearProfile();
  });

  test('코스 정보와 현재 진행 상태에 맞는 이어 학습 버튼을 표시한다.', () => {
    // Given
    signInWithProfile();

    const course = createCourseDetail({
      difficulty: CourseDifficulty.Beginner,
      displayProgress: {
        completedLessons: 1,
        totalLessons: 3,
      },
    });

    renderWithCourseRoute(<CourseHeader course={course} />);

    // Then
    expect(
      screen.getByRole('heading', { name: '블록 코딩 기초' }),
    ).toBeVisible();
    expect(
      screen.getByText('블록 코딩을 처음 배우는 코스입니다.'),
    ).toBeVisible();
    expect(screen.getByAltText('블록 코딩 기초')).toBeVisible();
    expect(screen.getByText('BEGINNER')).toBeVisible();
    expect(screen.getByText('Block')).toBeVisible();
    expect(
      screen.getByText(
        (_, node) =>
          node?.tagName.toLowerCase() === 'span' &&
          node.textContent === '3COURSE_LESSON',
      ),
    ).toBeVisible();
    expect(screen.getByText(/DURING_LEARNING_MSG/)).toBeVisible();
    expect(screen.getByText('33%')).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'CONTINUE_LESSON' }),
    ).toBeVisible();
  });

  test('이어 학습을 누르면 다음 학습 단계로 이동하고 이전 화면 상태를 유지한다.', () => {
    // Given
    signInWithProfile();

    renderWithCourseRoute(<CourseHeader course={createCourseDetail()} />, {
      initialEntries: [
        {
          pathname: '/course-group/group-1/course/course-1',
          state: { from: '/learning-space/my-course' },
        },
      ],
    });

    // When
    userEvent.click(screen.getByRole('button', { name: 'CONTINUE_LESSON' }));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/course-group/group-1/course/course-1/lesson/lesson-2/step/step-3',
    );
    expect(screen.getByTestId('current-state')).toHaveTextContent(
      '{"from":"/learning-space/my-course"}',
    );
  });

  test('로그인하지 않은 사용자가 학습 시작을 누르면 로그인 안내를 표시한다.', () => {
    // Given
    const course = createCourseDetail({
      status: ProgressStatus.NotStarted,
      displayProgress: {
        completedLessons: 0,
        totalLessons: 2,
      },
      lessons: [
        createCourseLesson({
          lessonId: 'lesson-1',
          idx: 1,
        }),
      ],
    });

    renderWithCourseRoute(<CourseHeader course={course} />);

    // When
    userEvent.click(screen.getByRole('button', { name: 'START_STUDY' }));

    // Then
    expect(screen.getByText('NEED_TO_SIGN_IN')).toBeVisible();
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/course-group/group-1/course/course-1',
    );
  });

  test('수료 조건을 만족하면 수료증 모달을 열 수 있다.', () => {
    // Given
    signInWithProfile(profileFixture);

    const course = createCourseDetail({
      status: ProgressStatus.Completed,
      completedAt: '2026-05-01T00:00:00.000Z',
      displayProgress: {
        completedLessons: 2,
        totalLessons: 2,
      },
      actualProgress: {
        completedLessons: 2,
        totalLessons: 2,
      },
    });

    renderWithCourseRoute(<CourseHeader course={course} />);

    // When
    userEvent.click(screen.getByRole('button', { name: 'VIEW_CERT' }));

    // Then
    expect(
      screen.getByRole('heading', { name: 'CONGRATS_MSG_COMPLETED' }),
    ).toBeVisible();
    expect(screen.getByText('루미')).toBeVisible();
    expect(screen.getByRole('button', { name: 'SAVE_IMAGE' })).toBeVisible();
  });
});
