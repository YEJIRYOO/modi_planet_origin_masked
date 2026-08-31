import { useNavigate } from 'react-router-dom';
import { Divider } from '@nextui-org/divider';
import WelcomeHeader from './components/WelcomeHeader';
import DashboardSection from './components/DashboardSection';
import CoursesSection from './components/CoursesSection';
import CourseCuration from './components/CourseCuration';
import { useMyCourseDashboard } from '@services/api/course/course/useMyCourseDashboard';
import { useLearningSpaceErrorHandler } from '@hooks/useLearningSpaceErrorHandler';
import { useEffect } from 'react';

export default function MyCourse() {
  const navigate = useNavigate();
  const handleLearningSpaceError = useLearningSpaceErrorHandler();
  const { getMyCourseDashboard, dashboard, loading } = useMyCourseDashboard({
    onError: (error) => handleLearningSpaceError(error),
  });

  useEffect(() => {
    getMyCourseDashboard();
  }, []);

  const handleStartChallenge = () => {
    navigate(`/learning-space/courses`);
  };

  const fromState = { state: { from: '/learning-space/my-course' } };

  const buildLearningPath = (
    courseId: string,
    courseGroupId: string,
    learning?: { lessonId: string; stepId?: string | null } | null,
  ) => {
    if (!learning?.lessonId) {
      return `/course-group/${courseGroupId}/course/${courseId}`;
    }
    const basePath = `/course-group/${courseGroupId}/course/${courseId}/lesson/${learning.lessonId}`;
    return learning.stepId ? `${basePath}/step/${learning.stepId}` : basePath;
  };

  const handleContinueCourse = (
    courseId: string,
    courseGroupId: string,
    nextLearning?: {
      lessonId: string;
      stepId?: string | null;
    } | null,
  ) => {
    navigate(
      buildLearningPath(courseId, courseGroupId, nextLearning),
      fromState,
    );
  };

  const handleReviewCourse = (
    courseId: string,
    courseGroupId: string,
    firstLearning?: {
      lessonId: string;
      stepId?: string | null;
    } | null,
  ) => {
    navigate(
      buildLearningPath(courseId, courseGroupId, firstLearning),
      fromState,
    );
  };

  const handleCardClick = (courseId: string, courseGroupId: string) => {
    // 카드 클릭: 코스 ID로만 이동
    navigate(`/course-group/${courseGroupId}/course/${courseId}`, fromState);
  };

  const learningStatus = dashboard?.learningStatus
    ? {
        enrolledCourseCount: dashboard.learningStatus.enrolledCourseCount,
        completedCourseCount: dashboard.learningStatus.completedCourseCount,
        inProgressCourseCount: dashboard.learningStatus.inProgressCourseCount,
      }
    : undefined;

  return (
    <div className="w-full py-[30px] sm:py-[20px]">
      <div className="px-[60px]">
        <div className="max-w-[1660px] w-[1280px] lg:w-[900px] mx-auto">
          <WelcomeHeader />
          <DashboardSection
            onStartChallenge={handleStartChallenge}
            dashboard={dashboard}
            loading={loading}
          />
        </div>
      </div>

      <Divider />

      <div className="px-[60px]">
        <div className="max-w-[1660px] w-[1280px] lg:w-[900px] mx-auto">
          <CoursesSection
            onContinueCourse={handleContinueCourse}
            onReviewCourse={handleReviewCourse}
            onCardClick={handleCardClick}
            learningStatus={learningStatus}
          />
        </div>
      </div>

      <CourseCuration />
    </div>
  );
}
