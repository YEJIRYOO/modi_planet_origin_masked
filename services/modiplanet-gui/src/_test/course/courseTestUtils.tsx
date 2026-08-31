import { act, render } from '@testing-library/react';
import i18next from 'i18next';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import type { ProfileModel } from '@src/services/client-model/user';
import {
  ActivityCodingType,
  CourseDifficulty,
  CourseStepDType,
  type MyCourseDetailQuery,
  ProgressStatus,
} from '@src/services/gen/gen';
import { useProfileStore } from '@src/store/zustand/user';

if (!i18next.isInitialized) {
  i18next.init({
    lng: 'ko',
    fallbackLng: 'ko',
    resources: {
      ko: {
        translation: {},
      },
    },
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
  });
}

export type CourseDetail = NonNullable<MyCourseDetailQuery['myCourseDetail']>;
export type CourseLesson = NonNullable<CourseDetail['lessons']>[number];
export type CourseStep = NonNullable<CourseLesson['steps']>[number];

export const profileFixture: ProfileModel = {
  id: 'profile-1',
  userId: 'user-1',
  birthdate: '2010-01-01',
  name: '모디',
  nickname: '루미',
  countryCallingCode: '+82',
  phoneNumber: '01012345678',
  thumbnailUrl: '/assets/profiles/default-profile.svg',
  codingExperienceTypeList: [],
  contactEmail: 'modi@example.com',
};

export const signInWithProfile = (profile: ProfileModel = profileFixture) => {
  act(() => {
    useProfileStore.getState().setProfile(profile);
  });
};

export const clearProfile = () => {
  act(() => {
    useProfileStore.getState().clearProfile();
  });
};

export const createCourseStep = (
  overrides: Partial<CourseStep> = {},
): CourseStep =>
  ({
    stepId: 'step-1',
    stepName: '영상으로 개념 이해하기',
    idx: 1,
    status: ProgressStatus.NotStarted,
    stepType: CourseStepDType.Vod,
    ...overrides,
  } as CourseStep);

export const createCourseLesson = (
  overrides: Partial<CourseLesson> = {},
): CourseLesson =>
  ({
    lessonId: 'lesson-1',
    lessonName: '기본 개념',
    description: '기본 개념을 배우는 차시입니다.',
    idx: 1,
    status: ProgressStatus.NotStarted,
    completedSteps: 0,
    totalSteps: 1,
    steps: [createCourseStep()],
    ...overrides,
  } as CourseLesson);

export const createCourseDetail = (
  overrides: Partial<CourseDetail> = {},
): CourseDetail =>
  ({
    courseGroupName: '모디 스쿨',
    name: '블록 코딩 기초',
    description: '블록 코딩을 처음 배우는 코스입니다.',
    difficulty: CourseDifficulty.Beginner,
    codeEditorType: ActivityCodingType.Block,
    status: ProgressStatus.InProgress,
    displayProgress: {
      completedLessons: 1,
      totalLessons: 3,
    },
    actualProgress: {
      completedLessons: 1,
      totalLessons: 3,
    },
    completedAt: null,
    firstLearning: {
      lessonId: 'lesson-1',
      stepId: 'step-1',
      lessonIdx: 1,
    },
    nextLearning: {
      lessonId: 'lesson-2',
      stepId: 'step-3',
      lessonIdx: 2,
    },
    teachingMaterials: null,
    educationalPlan: null,
    lessons: [
      createCourseLesson({
        lessonId: 'lesson-1',
        lessonName: '기본 개념',
        idx: 1,
      }),
      createCourseLesson({
        lessonId: 'lesson-2',
        lessonName: '반복문 실습',
        idx: 2,
      }),
    ],
    ...overrides,
  } as CourseDetail);

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

type RenderWithCourseRouteOptions = {
  initialEntries?: React.ComponentProps<typeof MemoryRouter>['initialEntries'];
  routePath?: string;
};

export const renderWithCourseRoute = (
  ui: React.ReactElement,
  {
    initialEntries = ['/course-group/group-1/course/course-1'],
    routePath = '/course-group/:courseGroupId/course/:courseId',
  }: RenderWithCourseRouteOptions = {},
) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path={routePath} element={ui} />
        <Route path="*" element={<span data-testid="route-fallback" />} />
      </Routes>
      <CurrentLocation />
    </MemoryRouter>,
  );
