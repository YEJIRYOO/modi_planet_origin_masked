import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import MyCourse from '@src/pages/learning-space/MyCourse';
import CourseCuration from '@src/pages/learning-space/MyCourse/components/CourseCuration';
import CourseList from '@src/pages/learning-space/MyCourse/components/CoursesSection/CourseList';
import CoursesSection from '@src/pages/learning-space/MyCourse/components/CoursesSection';
import DashboardSection from '@src/pages/learning-space/MyCourse/components/DashboardSection';
import type { MyCourseItemModel } from '@src/services/client-model/course';
import {
  ActivityCodingType,
  CourseConnectionOrderFieldType,
  CourseDifficulty,
  CourseRecommendKind,
  MyCourseProgressFilterStatus,
  OrderDirectionType,
  ProgressStatus,
} from '@src/services/gen/gen';

import { clearProfile, signInWithProfile } from '../course/courseTestUtils';

const mockGetMyCourseDashboard = vi.fn();
const mockGetCourseRecommends = vi.fn();

let mockDashboardResult: any;
let mockConnectionResult: any;
let mockRecommendsResult: any;

vi.mock('@services/api/course/course/useMyCourseDashboard', () => ({
  useMyCourseDashboard: () => mockDashboardResult,
}));

vi.mock('@services/api/course/course/useMyCourseConnection', () => ({
  useMyCourseConnection: (options: any) => mockConnectionResult(options),
}));

vi.mock('@services/api/course/course/useCourseRecommends', () => ({
  useCourseRecommends: () => mockRecommendsResult,
}));

function CurrentLocation() {
  const location = useLocation();

  return (
    <>
      <span data-testid="current-path">{location.pathname}</span>
      <span data-testid="current-state">
        {JSON.stringify(location.state ?? null)}
      </span>
    </>
  );
}

function renderWithLearningSpace(ui: React.ReactElement) {
  return render(
    <MemoryRouter initialEntries={['/learning-space/my-course']}>
      <Routes>
        <Route path="/learning-space/my-course" element={ui} />
        <Route path="*" element={null} />
      </Routes>
      <CurrentLocation />
    </MemoryRouter>,
  );
}

const installMatchMedia = (matches = false) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

const createCourse = (
  overrides: Partial<MyCourseItemModel> = {},
): MyCourseItemModel => ({
  id: 'course-ongoing',
  courseGroupId: 'group-1',
  courseGroupName: '모디 스쿨',
  title: '진행 중인 과정',
  description: '현재 학습 중인 과정입니다.',
  status: 'ongoing',
  totalLessons: 4,
  completedLessons: 1,
  currentLesson: 2,
  difficulty: CourseDifficulty.Beginner,
  codeEditorType: ActivityCodingType.Block,
  firstLearning: {
    courseGroupId: 'group-1',
    courseId: 'course-ongoing',
    lessonId: 'lesson-1',
    stepId: 'step-1',
  },
  nextLearning: {
    courseGroupId: 'group-1',
    courseId: 'course-ongoing',
    courseName: '진행 중인 과정',
    totalLessonsInCourse: 4,
    lessonId: 'lesson-2',
    lessonName: '두 번째 차시',
    lessonIdx: 2,
    stepId: 'step-9',
    stepName: '다음 단계',
    stepIdx: 1,
    totalStepsInLesson: 3,
  },
  ...overrides,
});

const createDashboard = () => ({
  learningStatus: {
    enrolledCourseCount: 3,
    completedCourseCount: 1,
    inProgressCourseCount: 2,
    totalLearningTimeSeconds: 3900,
    learningTimeByType: [
      {
        stepType: 'CODING',
        totalActiveSeconds: 3900,
        totalDurationSeconds: 7200,
        sessionCount: 3,
      },
    ],
  },
  recentLearning: {
    courseGroupId: 'group-1',
    course: {
      id: 'course-ongoing',
      courseGroupId: 'group-1',
      courseGroupName: '모디 스쿨',
      name: '최근 학습 과정',
      difficulty: CourseDifficulty.Beginner,
      codeEditorType: ActivityCodingType.Block,
      firstLearning: {
        courseGroupId: 'group-1',
        courseId: 'course-ongoing',
        lessonId: 'lesson-1',
        stepId: 'step-1',
      },
    },
    progress: {
      status: ProgressStatus.InProgress,
      progressRate: 25,
      totalLessons: 4,
      completedLessons: 1,
      displayProgress: {
        completedLessons: 1,
        totalLessons: 4,
      },
      nextLearning: {
        courseGroupId: 'group-1',
        courseId: 'course-ongoing',
        lessonId: 'lesson-2',
        lessonIdx: 2,
        stepId: 'step-9',
      },
    },
  },
});

const createRecommendCourse = (index: number) => ({
  id: `recommend-${index}`,
  courseGroupId: `recommend-group-${index}`,
  courseGroupName: `추천 그룹 ${index}`,
  name: `추천 과정 ${index}`,
  description: `추천 과정 ${index} 설명`,
  difficulty: CourseDifficulty.Beginner,
  codeEditorType: ActivityCodingType.Block,
  lessonCount: index,
});

describe('[러닝스페이스] 내 과정', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    installMatchMedia(false);
    clearProfile();
    signInWithProfile();
    Element.prototype.scrollIntoView = vi.fn();
    mockGetMyCourseDashboard.mockResolvedValue({});
    mockGetCourseRecommends.mockResolvedValue({});
    mockDashboardResult = {
      getMyCourseDashboard: mockGetMyCourseDashboard,
      dashboard: createDashboard(),
      loading: false,
      error: undefined,
    };
    mockConnectionResult = vi.fn(() => ({
      courses: [
        createCourse(),
        createCourse({
          id: 'course-complete',
          title: '완료한 과정',
          status: 'complete',
          completedLessons: 3,
          totalLessons: 3,
        }),
      ],
      loading: false,
    }));
    mockRecommendsResult = {
      getCourseRecommends: mockGetCourseRecommends,
      recommends: [
        {
          kind: CourseRecommendKind.Trending,
          courses: Array.from({ length: 5 }, (_, index) =>
            createRecommendCourse(index + 1),
          ),
        },
        {
          kind: CourseRecommendKind.New,
          courses: [createRecommendCourse(6)],
        },
      ],
      loading: false,
      error: undefined,
    };
  });

  test('MyCourse는 대시보드, 내 과정, 추천 과정을 렌더링하고 최근 학습으로 이동한다.', async () => {
    // Given
    renderWithLearningSpace(<MyCourse />);

    // Then
    await waitFor(() => expect(mockGetMyCourseDashboard).toHaveBeenCalled());
    expect(mockConnectionResult).toHaveBeenCalledWith(
      expect.objectContaining({
        first: 10,
        offset: 0,
        where: {
          status: MyCourseProgressFilterStatus.All,
          keyword: undefined,
        },
        orderBy: {
          field: CourseConnectionOrderFieldType.LastAccessedAt,
          direction: OrderDirectionType.Desc,
        },
      }),
    );
    expect(mockGetCourseRecommends).toHaveBeenCalledWith(
      [CourseRecommendKind.Trending, CourseRecommendKind.New],
      4,
    );
    expect(screen.getByText('WELCOME_MSG_NEW')).toBeVisible();
    expect(screen.getByText('최근 학습 과정')).toBeVisible();
    expect(screen.getByText('진행 중인 과정')).toBeVisible();
    expect(screen.getByText('RECOMMEND_COURSE_MSG')).toBeVisible();

    // When
    userEvent.click(
      screen.getAllByRole('button', { name: /CONTINUE_LESSON/ })[0],
    );

    // Then
    expect(screen.getAllByTestId('current-path')[0]).toHaveTextContent(
      '/course-group/group-1/course/course-ongoing/lesson/lesson-2/step/step-9',
    );
    expect(screen.getAllByTestId('current-state')[0]).toHaveTextContent(
      '{"from":"/learning-space/my-course"}',
    );
  });

  test('DashboardSection은 새 도전 배너와 완료 과정 복습 이동을 처리한다.', () => {
    // Given
    const onStartChallenge = vi.fn();
    const { unmount } = renderWithLearningSpace(
      <DashboardSection
        onStartChallenge={onStartChallenge}
        dashboard={{
          learningStatus: {
            enrolledCourseCount: 0,
            completedCourseCount: 0,
            inProgressCourseCount: 0,
            totalLearningTimeSeconds: 0,
          },
          recentLearning: null,
        }}
      />,
    );

    // When
    userEvent.click(screen.getByRole('button', { name: 'CHOOSE_COURSE →' }));

    // Then
    expect(onStartChallenge).toHaveBeenCalledTimes(1);
    expect(screen.getAllByTestId('current-path')[0]).toHaveTextContent(
      '/learning-space/courses',
    );

    // When
    unmount();
    renderWithLearningSpace(
      <DashboardSection
        dashboard={{
          learningStatus: {
            enrolledCourseCount: 1,
            completedCourseCount: 1,
            inProgressCourseCount: 0,
            totalLearningTimeSeconds: 0,
          },
          recentLearning: {
            courseGroupId: 'group-review',
            course: {
              id: 'course-review',
              courseGroupId: 'group-review',
              courseGroupName: '복습 그룹',
              name: '복습할 과정',
              difficulty: CourseDifficulty.Intermediate,
              codeEditorType: ActivityCodingType.AiBlock,
              firstLearning: {
                courseGroupId: 'group-review',
                courseId: 'course-review',
                lessonId: 'lesson-review',
                stepId: 'step-review',
              },
            },
            progress: {
              status: ProgressStatus.Completed,
              progressRate: 100,
              totalLessons: 2,
              completedLessons: 2,
            },
          },
        }}
      />,
    );
    expect(screen.getByText('복습할 과정')).toBeVisible();
    userEvent.click(screen.getByRole('button', { name: 'REVIEW' }));

    // Then
    expect(screen.getAllByTestId('current-path')[0]).toHaveTextContent(
      '/course-group/group-review/course/course-review/lesson/lesson-review/step/step-review',
    );
  });

  test('CoursesSection은 상태 필터와 검색어를 조회 조건에 반영한다.', () => {
    // Given
    vi.useFakeTimers();
    render(
      <MemoryRouter>
        <CoursesSection
          onContinueCourse={vi.fn()}
          onReviewCourse={vi.fn()}
          onCardClick={vi.fn()}
          learningStatus={{
            enrolledCourseCount: 3,
            inProgressCourseCount: 1,
            completedCourseCount: 1,
          }}
        />
      </MemoryRouter>,
    );

    // When
    userEvent.click(
      screen.getByRole('button', { name: 'STUDY_IN_PROGRESS(1)' }),
    );

    // Then
    expect(mockConnectionResult).toHaveBeenLastCalledWith(
      expect.objectContaining({
        offset: 0,
        where: {
          status: MyCourseProgressFilterStatus.InProgress,
          keyword: undefined,
        },
      }),
    );

    // When
    fireEvent.change(screen.getByPlaceholderText('COURSE_SEARCH_MSG'), {
      target: { value: 'robot' },
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Then
    expect(mockConnectionResult).toHaveBeenLastCalledWith(
      expect.objectContaining({
        where: {
          status: MyCourseProgressFilterStatus.InProgress,
          keyword: 'robot',
        },
      }),
    );
    vi.useRealTimers();
  });

  test('CourseList는 상태별 액션과 페이지 이동을 처리한다.', () => {
    // Given
    const onContinue = vi.fn();
    const onReview = vi.fn();
    const onCardClick = vi.fn();
    const courses = [
      createCourse({
        id: 'course-start',
        title: '처음 시작 과정',
        status: 'not_started',
        completedLessons: 0,
        totalLessons: 2,
      }),
      createCourse({
        id: 'course-ongoing',
        title: '계속 학습 과정',
        status: 'ongoing',
      }),
      createCourse({
        id: 'course-complete',
        title: '완료 과정',
        status: 'complete',
        completedLessons: 4,
        totalLessons: 4,
      }),
      createCourse({ id: 'course-4', title: '네 번째 과정' }),
      createCourse({ id: 'course-5', title: '다섯 번째 과정' }),
      createCourse({ id: 'course-6', title: '여섯 번째 과정' }),
    ];

    render(
      <MemoryRouter>
        <CourseList
          courses={courses}
          onContinueCourse={onContinue}
          onReviewCourse={onReview}
          onCardClick={onCardClick}
        />
      </MemoryRouter>,
    );

    // When
    userEvent.click(screen.getByText('처음 시작 과정'));
    userEvent.click(screen.getByRole('button', { name: 'START_STUDY →' }));
    userEvent.click(
      screen.getAllByRole('button', { name: 'CONTINUE_LESSON →' })[0],
    );
    userEvent.click(screen.getByRole('button', { name: 'REVIEW' }));
    userEvent.click(screen.getByRole('link', { name: 'Go to page number 2' }));

    // Then
    expect(onCardClick).toHaveBeenCalledWith('course-start', 'group-1');
    expect(onContinue).toHaveBeenCalledWith(
      'course-start',
      'group-1',
      courses[0].firstLearning,
    );
    expect(onContinue).toHaveBeenCalledWith(
      'course-ongoing',
      'group-1',
      courses[1].nextLearning,
    );
    expect(onReview).toHaveBeenCalledWith(
      'course-complete',
      'group-1',
      courses[2].firstLearning,
    );
    expect(screen.getByText('여섯 번째 과정')).toBeVisible();
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      block: 'nearest',
    });
  });

  test('CourseCuration은 추천 과정을 슬라이더로 보여주고 카드 클릭 시 상세로 이동한다.', async () => {
    // Given
    renderWithLearningSpace(<CourseCuration />);

    // Then
    await waitFor(() =>
      expect(mockGetCourseRecommends).toHaveBeenCalledWith(
        [CourseRecommendKind.Trending, CourseRecommendKind.New],
        4,
      ),
    );
    expect(screen.getByText('TRANDING_COURSES')).toBeVisible();
    expect(screen.getByText('NEW_COURSES')).toBeVisible();
    expect(screen.getByText('추천 과정 1')).toBeVisible();

    // When
    userEvent.click(screen.getByAltText('추천 과정 1'));

    // Then
    expect(screen.getAllByTestId('current-path')[0]).toHaveTextContent(
      '/course-group/recommend-group-1/course/recommend-1',
    );
  });
});
