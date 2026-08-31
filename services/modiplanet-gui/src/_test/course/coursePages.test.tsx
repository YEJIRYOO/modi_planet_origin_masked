import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CourseDetailPage from '@src/pages/course';
import LessonLearningPage from '@src/pages/course/learning';
import {
  ActivityCodingType,
  CourseStepDType,
  CourseVisibilityStatus,
  ProgressStatus,
} from '@src/services/gen/gen';

import {
  clearProfile,
  createCourseDetail,
  createCourseLesson,
  createCourseStep,
  renderWithCourseRoute,
  signInWithProfile,
} from './courseTestUtils';

const mockGetMyCourseDetail = vi.fn();
const mockGetCourse = vi.fn();
const mockGetCourseLesson = vi.fn();
const mockStartStep = vi.fn();
const mockCompleteStep = vi.fn();
const mockUpdateStepProgress = vi.fn();
const mockCreateFeedback = vi.fn();

let mockMyCourseDetailResult: any;
let mockCourseResult: any;
let mockCourseLessonResult: any;

vi.mock('react-device-detect', () => ({
  isDesktop: true,
}));

vi.mock('@services/api/course/course/useMyCourseDetail', () => ({
  useMyCourseDetail: () => mockMyCourseDetailResult,
}));

vi.mock('@services/api/course/course/useCourse', () => ({
  useCourse: () => mockCourseResult,
}));

vi.mock('@services/api/course/lesson/useCourseLesson', () => ({
  useCourseLesson: () => mockCourseLessonResult,
}));

vi.mock('@services/api/course/step/useStartStep', () => ({
  useStartStep: () => ({
    startStep: mockStartStep,
    loading: false,
    error: undefined,
    stepDetail: null,
  }),
}));

vi.mock('@services/api/course/step/useCompleteStep', () => ({
  useCompleteStep: () => ({
    completeStep: mockCompleteStep,
    loading: false,
    error: undefined,
    stepDetail: null,
  }),
}));

vi.mock('@services/api/course/step/useUpdateStepProgress', () => ({
  UseUpdateStepProgress: () => ({
    updateStepProgress: mockUpdateStepProgress,
    loading: false,
    error: undefined,
    result: null,
  }),
}));

vi.mock(
  '@services/api/course/lesson/useCreateCourseParticipantLessonFeedback',
  () => ({
    useCreateCourseParticipantLessonFeedback: () => ({
      createFeedback: mockCreateFeedback,
      loading: false,
      error: undefined,
    }),
  }),
);

const learningRoutePath =
  '/course-group/:courseGroupId/course/:courseId/lesson/:lessonId/step/:stepId';

const installMatchMedia = () => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

const createLearningFixture = () => {
  const summarySteps = [
    createCourseStep({
      stepId: 'step-1',
      stepName: '코딩 실습',
      idx: 1,
      status: ProgressStatus.NotStarted,
      stepType: CourseStepDType.Coding,
      progressRate: 0,
    } as any),
    createCourseStep({
      stepId: 'step-2',
      stepName: '영상 보기',
      idx: 2,
      status: ProgressStatus.NotStarted,
      stepType: CourseStepDType.Coding,
      progressRate: 0,
    } as any),
  ];

  const course = createCourseDetail({
    lessons: [
      createCourseLesson({
        lessonId: 'lesson-1',
        lessonName: '첫 번째 차시',
        idx: 1,
        completedSteps: 0,
        totalSteps: 2,
        status: ProgressStatus.InProgress,
        steps: summarySteps,
      }),
      createCourseLesson({
        lessonId: 'lesson-2',
        lessonName: '두 번째 차시',
        idx: 2,
        completedSteps: 0,
        totalSteps: 0,
        status: ProgressStatus.NotStarted,
        steps: [],
      }),
    ],
  });

  const lesson = {
    lessonId: 'lesson-1',
    steps: [
      {
        idx: 1,
        effectiveStatus: CourseVisibilityStatus.Public,
        step: {
          id: 'step-1',
          dType: CourseStepDType.Coding,
          coding: {
            learningObjective: '<p>반복문 목표</p>',
            activity: '<p>반복문 활동</p>',
            codingType: ActivityCodingType.Block,
          },
        },
      },
      {
        idx: 2,
        effectiveStatus: CourseVisibilityStatus.Public,
        step: {
          id: 'step-2',
          dType: CourseStepDType.Coding,
          coding: {
            learningObjective: '<p>영상 보기 목표</p>',
            activity: '<p>영상 보기 활동</p>',
            codingType: ActivityCodingType.AiBlock,
          },
        },
      },
    ],
  };

  return { course, lesson };
};

describe('[코스] 페이지', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    installMatchMedia();
    clearProfile();
    mockGetMyCourseDetail.mockResolvedValue({});
    mockGetCourse.mockResolvedValue({});
    mockGetCourseLesson.mockResolvedValue({});
    mockStartStep.mockResolvedValue({});
    mockCompleteStep.mockResolvedValue({});
    mockUpdateStepProgress.mockResolvedValue({});
    mockCreateFeedback.mockResolvedValue({});
    mockMyCourseDetailResult = {
      getMyCourseDetail: mockGetMyCourseDetail,
      detail: createCourseDetail(),
      loading: false,
      error: undefined,
    };
    mockCourseResult = {
      getCourse: mockGetCourse,
      detail: createCourseDetail(),
      loading: false,
      error: undefined,
    };
    mockCourseLessonResult = {
      getCourseLesson: mockGetCourseLesson,
      lesson: null,
      loading: false,
      error: undefined,
    };
  });

  test('코스 상세 페이지는 로그인 상태이면 내 코스 상세를 조회한다.', async () => {
    // Given
    signInWithProfile();

    renderWithCourseRoute(<CourseDetailPage />);

    // Then
    await waitFor(() =>
      expect(mockGetMyCourseDetail).toHaveBeenCalledWith({
        courseId: 'course-1',
        courseGroupId: 'group-1',
      }),
    );
    expect(mockGetCourse).not.toHaveBeenCalled();
    expect(
      screen.getAllByRole('heading', { name: '블록 코딩 기초' })[0],
    ).toBeVisible();
  });

  test('코스 상세 페이지는 비로그인 상태이면 공개 코스 상세를 조회한다.', async () => {
    // Given
    renderWithCourseRoute(<CourseDetailPage />);

    // Then
    await waitFor(() => expect(mockGetCourse).toHaveBeenCalledWith('course-1'));
    expect(mockGetMyCourseDetail).not.toHaveBeenCalled();
    expect(screen.getAllByText('CURRICULUM')[0]).toBeVisible();
  });

  test('코스 상세 페이지는 단계 에러 상태를 모달로 보여준다.', () => {
    // Given
    renderWithCourseRoute(<CourseDetailPage />, {
      initialEntries: [
        {
          pathname: '/course-group/group-1/course/course-1',
          state: { stepErrorCode: 62002 },
        },
      ],
    });

    // Then
    expect(screen.getByText('PRIVATE_MATERIAL')).toBeVisible();
  });

  test('학습 페이지는 코스와 차시를 조회하고 현재 코딩 단계를 렌더링한다.', async () => {
    // Given
    const { course, lesson } = createLearningFixture();
    mockMyCourseDetailResult.detail = course;
    mockCourseLessonResult = {
      getCourseLesson: mockGetCourseLesson,
      lesson,
      loading: false,
      error: undefined,
    };

    renderWithCourseRoute(<LessonLearningPage />, {
      initialEntries: [
        '/course-group/group-1/course/course-1/lesson/lesson-1/step/step-1',
      ],
      routePath: learningRoutePath,
    });

    // Then
    await waitFor(() =>
      expect(mockGetCourseLesson).toHaveBeenCalledWith('lesson-1', 'course-1'),
    );
    expect(mockStartStep).toHaveBeenCalledWith({
      courseGroupId: 'group-1',
      courseId: 'course-1',
      lessonId: 'lesson-1',
      stepId: 'step-1',
    });
    expect(screen.getByText('반복문 목표')).toBeVisible();
    expect(screen.getByText('반복문 활동')).toBeVisible();
  });

  test('학습 페이지는 단축키와 버튼으로 다음 단계 및 종료를 처리한다.', async () => {
    // Given
    const { course, lesson } = createLearningFixture();
    mockMyCourseDetailResult.detail = course;
    mockCourseLessonResult = {
      getCourseLesson: mockGetCourseLesson,
      lesson,
      loading: false,
      error: undefined,
    };

    renderWithCourseRoute(<LessonLearningPage />, {
      initialEntries: [
        {
          pathname:
            '/course-group/group-1/course/course-1/lesson/lesson-1/step/step-1',
          state: { from: '/learning-space/my-course' },
        },
      ],
      routePath: learningRoutePath,
    });

    // When
    userEvent.keyboard('{Control>}{ArrowDown}{/Control}');

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/course-group/group-1/course/course-1/lesson/lesson-1/step/step-2',
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'END_LEARNING' }));

    // Then
    await waitFor(() =>
      expect(mockUpdateStepProgress).toHaveBeenCalledWith(
        expect.objectContaining({
          courseGroupId: 'group-1',
          courseId: 'course-1',
          lessonId: 'lesson-1',
          stepId: 'step-1',
          forceFlush: true,
        }),
      ),
    );
    expect(mockCompleteStep).toHaveBeenCalledWith({
      courseGroupId: 'group-1',
      courseId: 'course-1',
      lessonId: 'lesson-1',
      stepId: 'step-1',
    });
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/course-group/group-1/course/course-1',
    );
  });

  test('학습 페이지는 피드백 모달에서 내용을 전송한다.', async () => {
    // Given
    const { course, lesson } = createLearningFixture();
    mockMyCourseDetailResult.detail = course;
    mockCourseLessonResult = {
      getCourseLesson: mockGetCourseLesson,
      lesson,
      loading: false,
      error: undefined,
    };

    renderWithCourseRoute(<LessonLearningPage />, {
      initialEntries: [
        '/course-group/group-1/course/course-1/lesson/lesson-1/step/step-1',
      ],
      routePath: learningRoutePath,
    });

    // When
    userEvent.click(screen.getByRole('button', { name: 'SEND_FEEDBACK' }));
    userEvent.type(
      screen.getByPlaceholderText('LESSON_FEEDBACK'),
      '좋은 차시예요',
    );
    userEvent.click(screen.getByRole('button', { name: 'SEND_FEEDBACK' }));

    // Then
    await waitFor(() =>
      expect(mockCreateFeedback).toHaveBeenCalledWith({
        courseId: 'course-1',
        lessonId: 'lesson-1',
        feedbackType: 'SERVICE_ERROR',
        feedback: '좋은 차시예요',
      }),
    );
  });

  test('학습 페이지는 자료 없는 차시를 표시한다.', async () => {
    // Given
    const emptyCourse = createCourseDetail({
      lessons: [
        createCourseLesson({
          lessonId: 'lesson-1',
          lessonName: '빈 차시',
          idx: 1,
          completedSteps: 0,
          totalSteps: 0,
          steps: [],
        }),
      ],
    });
    mockMyCourseDetailResult.detail = emptyCourse;
    mockCourseLessonResult = {
      getCourseLesson: mockGetCourseLesson,
      lesson: { lessonId: 'lesson-1', steps: [] },
      loading: false,
      error: undefined,
    };

    renderWithCourseRoute(<LessonLearningPage />, {
      initialEntries: [
        '/course-group/group-1/course/course-1/lesson/lesson-1/step/undefined',
      ],
      routePath: learningRoutePath,
    });

    // Then
    expect(screen.getByText('NO_MATERIAL')).toBeVisible();
    expect(screen.queryByRole('button', { name: 'SEND_FEEDBACK' })).toBeNull();
  });
});
