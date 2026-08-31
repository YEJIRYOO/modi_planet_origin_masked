import React, { lazy } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MODIPlanetLayout from '@components/ui_old/layout/modiplanet-layout';
import FullPageLayout from '@components/ui_old/layout/full-page-layout';
import { t } from 'i18next';
import { useProfileStore } from '@src/store/zustand/user';
import { useProfile } from '@services/api/user/useProfile';

function AuthGuard() {
  const profile = useProfileStore((state) => state.profile);
  const { loading } = useProfile();
  if (loading) return null;
  if (!profile) return <Navigate to="/learning-space" replace />;
  return <Outlet />;
}

const TestPage = lazy(() => import('@src/pages/test'));
const TestAuthPage = lazy(() => import('@src/pages/test/auth'));

const MyPageLayout = lazy(
  () => import('@components/ui_old/layout/my-page-layout'),
);

// 메인, 로그인, 가입
const MainPage = lazy(() => import('@src/pages/main'));

const KakaoSignInPage = lazy(() => import('@src/pages/auth/kakao/signin'));
const GoogleSignInPage = lazy(() => import('@src/pages/auth/google/signin'));
const AppleSignInPage = lazy(() => import('@src/pages/auth/apple/signin'));

const SignInPage = lazy(() => import('@src/pages/sign-in'));
const SignUpEmailPage = lazy(() => import('@src/pages/sign-up/email'));
const SignUpSocialPage = lazy(() => import('@src/pages/sign-up/social'));
const ChangePassword = lazy(
  () => import('@src/pages/password/change-password'),
);
const ResetPassword = lazy(
  () => import('@src/pages/password/reset-pw/ResetPwPage'),
);

// 고객센터
const CSPage = lazy(() => import('@src/pages/cs'));
const NoticeDetailsPage = lazy(() => import('@src/pages/cs/notice/details'));
const MaterialsPage = lazy(() => import('@src/pages/materials'));
const MaterialDetailsPage = lazy(() => import('@src/pages/materials/details'));

// 학습 공간
const LearningSpacePage = lazy(() => import('@src/pages/learning-space'));
const CourseDetailPage = lazy(() => import('@src/pages/course'));
const LessonLearningPage = lazy(() => import('@src/pages/course/learning'));

// 코딩하기
const ModitorPage = lazy(() => import('@src/pages/moditor'));
const CodeEditorPage = lazy(() => import('@src/pages/code-editor'));

// 마이페이지
const InquiryPage = lazy(() => import('@src/pages/contact'));
const InquiryCreatePage = lazy(() => import('@src/pages/contact/create'));
const MyPage = lazy(() => import('@src/pages/my-page'));
const MyProject = lazy(() => import('@src/pages/my-project'));

// 통합 로그인
const SignInPortalPage = lazy(() => import('@src/pages/portal/signin-portal'));
const SignupPortalPage = lazy(() => import('@src/pages/portal/signup-portal'));
const SignupPortalCompletePage = lazy(
  () => import('@src/pages/portal/signup-portal/complete'),
);

const WithdrawalPortalPage = lazy(
  () => import('@src/pages/portal/withdrawal-portal'),
);

const AlarmPortalPage = lazy(() => import('@src/pages/portal/alarm-portal'));

// 에러페이지 ,리다이렉트
const ErrorPage = lazy(() => import('@src/pages/error'));
const RedirectPage = lazy(() => import('@src/pages/redirect'));

const ExpiredPage = lazy(
  () => import('@src/pages/password/reset-pw/ExpiredPage'),
);

// 머신러닝 모델 학습 페이지
const TrainingPage = lazy(() => import('@src/pages/training'));

function Routers() {
  return (
    <Routes>
      {/* with layout */}
      <Route path="/" element={<MODIPlanetLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpEmailPage />} />
        <Route path="/signup/social" element={<SignUpSocialPage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />

        <Route path="cs">
          <Route index element={<CSPage />} />
          <Route path="notice/:id" element={<NoticeDetailsPage />} />
        </Route>
        <Route path="materials" element={<MaterialsPage />} />
        <Route path="materials/:id" element={<MaterialDetailsPage />} />
        <Route path="expired" element={<ExpiredPage />} />

        <Route element={<MyPageLayout />}>
          <Route path="my-project" element={<MyProject />} />
        </Route>

        {/* 작업중 */}
        <Route element={<MyPageLayout />}>
          <Route path="contact">
            <Route index element={<InquiryPage />} />
            <Route path="create" element={<InquiryCreatePage />} />
          </Route>
          <Route path="/my-page" element={<MyPage />} />
        </Route>
      </Route>

      {/* without layout */}
      <Route path="/">
        <Route path="error/:code" element={<ErrorPage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="test/auth" element={<TestAuthPage />} />

        <Route path="moditor" element={<ModitorPage />} />
        <Route path="portal/signin" element={<SignInPortalPage />} />
        <Route path="portal/signup" element={<SignupPortalPage />} />
        <Route
          path="portal/signup/complete"
          element={<SignupPortalCompletePage />}
        />
        <Route path="portal/withdrawal" element={<WithdrawalPortalPage />} />
        <Route path="portal/alarm" element={<AlarmPortalPage />} />
        <Route path="editor" element={<CodeEditorPage />} />

        <Route path="training" element={<TrainingPage />} />
      </Route>

      {/* Full page layout (새 창용) */}
      <Route
        element={
          <FullPageLayout
            titleKey="LEARNING_SPACE"
            titleLink="/learning-space"
          />
        }
      >
        <Route path="learning-space" element={<LearningSpacePage />}>
          <Route element={<AuthGuard />}>
            <Route path="my-course" element={<div />} />
          </Route>
          <Route path="courses" element={<div />} />
        </Route>
        <Route
          path="course-group/:courseGroupId/course/:courseId"
          element={<CourseDetailPage />}
        />
        <Route element={<AuthGuard />}>
          <Route
            path="course-group/:courseGroupId/course/:courseId/lesson/:lessonId/step/:stepId"
            element={<LessonLearningPage />}
          />
          <Route
            path="course-group/:courseGroupId/course/:courseId/lesson/:lessonId"
            element={<LessonLearningPage />}
          />
        </Route>
      </Route>

      <Route path="/*" element={<RedirectPage />} />
      <Route path="auth/kakao/signin" element={<KakaoSignInPage />} />
      <Route path="auth/google/signin" element={<GoogleSignInPage />} />
      <Route path="auth/apple/signin" element={<AppleSignInPage />} />
    </Routes>
  );
}
export default Routers;
