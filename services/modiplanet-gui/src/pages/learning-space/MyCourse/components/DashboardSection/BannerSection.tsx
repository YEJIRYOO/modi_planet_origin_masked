import useTranslator from '@src/components/hooks/useTranslator';
import { useNavigate } from 'react-router-dom';
import {
  ActivityCodingType,
  CourseDifficulty,
  ProgressStatus,
} from '@services/gen/gen';
import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';
import {
  getCourseBanner,
  getCourseThumbnail,
  isLightThumbnail,
} from '@src/lib/utils/courseThumbnail';

interface BannerSectionProps {
  inProgressCourseCount: number;
  recentLearning?: {
    course: {
      id: string;
      courseGroupId?: string | null;
      courseGroupName?: string | null;
      name: string;
      difficulty?: CourseDifficulty | null;
      codeEditorType?: ActivityCodingType | null;
      firstLearning?: {
        courseGroupId?: string | null;
        courseId: string;
        lessonId: string;
        stepId?: string | null;
      } | null;
    };
    progress: {
      status: ProgressStatus;
      progressRate: number;
      totalLessons: number;
      completedLessons: number;
      displayProgress?: {
        progressRate?: number | null;
        completedLessons: number;
        totalLessons: number;
      } | null;
      nextLearning?: {
        courseGroupId?: string | null;
        courseId: string;
        lessonId: string;
        lessonIdx: number;
        stepId?: string | null;
      } | null;
    };
    courseGroupId?: string | null;
  } | null;
  onStartChallenge?: () => void;
  loading?: boolean;
}

export function BannerSkeleton() {
  return (
    <div className="rounded-[24px] overflow-hidden w-[700px] lg:w-full h-[248px]">
      <Skeleton className="w-full h-full rounded-[24px]" />
    </div>
  );
}

export default function BannerSection({
  inProgressCourseCount,
  recentLearning,
  onStartChallenge,
  loading = false,
}: BannerSectionProps) {
  const navigate = useNavigate();
  const { t } = useTranslator();

  if (loading) {
    return <BannerSkeleton />;
  }

  const handleStartChallenge = () => {
    if (onStartChallenge) {
      onStartChallenge();
    }
    navigate('/learning-space/courses');
  };

  // recentLearning이 없거나 NotStarted이면 새로운 도전 배너 표시
  const showNewChallengeBanner =
    !loading &&
    (!recentLearning ||
      recentLearning.progress.status === ProgressStatus.NotStarted);

  const bannerBackground = getCourseBanner(
    recentLearning?.course?.difficulty,
    recentLearning?.course?.codeEditorType,
  );

  if (showNewChallengeBanner) {
    return (
      <div className="relative rounded-[24px] overflow-hidden w-[700px] lg:w-full h-[248px] flex flex-col justify-center p-[40px]">
        <img
          src="/assets/learning-space/bg-start.svg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10">
          <h3
            className="h2-b mb-[30px] text-white"
            style={{ textShadow: '0px 2px 12px rgba(138, 0, 0, 0.5)' }}
          >
            {t('NEW_CHALLENGE_MSG')}
          </h3>
          <button
            onClick={handleStartChallenge}
            className="bg-brand text-white px-[31px] py-[19px] rounded-full p3-b hover:bg-brand_1 transition-colors self-start"
            style={{ boxShadow: '0px 2px 12px rgba(138, 0, 0, 0.5)' }}
          >
            {t('CHOOSE_COURSE')} →
          </button>
        </div>
      </div>
    );
  }

  const progress = recentLearning?.progress;
  const displayProgress = progress?.displayProgress;
  const completedLessons =
    displayProgress?.completedLessons ?? progress?.completedLessons ?? 0;
  const totalLessons =
    displayProgress?.totalLessons ?? progress?.totalLessons ?? 0;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const status = progress?.status;
  const isCompleted = status === ProgressStatus.Completed;
  const nextLearning = progress?.nextLearning;
  const firstLearning = recentLearning?.course?.firstLearning;
  const nextLesson =
    nextLearning?.lessonIdx !== undefined
      ? nextLearning.lessonIdx
      : completedLessons + 1;

  return (
    <div
      className="rounded-[24px] overflow-hidden w-[700px] lg:w-full h-[248px] bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerBackground})` }}
    >
      <div className="p-3 h-full">
        <div className="bg-white/30 ring-1 ring-white/50 ring-inset rounded-[20px] h-full flex">
          {/* 왼쪽 썸네일 */}
          <div className="w-[302px] h-full flex-shrink-0 p-[8px] relative">
            <div className="relative w-full h-full rounded-[14px] overflow-hidden px-4 py-5 flex flex-col justify-end">
              <img
                src={getCourseThumbnail(
                  recentLearning?.course?.difficulty,
                  recentLearning?.course?.codeEditorType,
                )}
                alt={recentLearning?.course?.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {recentLearning?.course?.courseGroupName && (
                <span
                  className={`relative p1-b ${
                    isLightThumbnail(
                      recentLearning.course.difficulty,
                      recentLearning.course.codeEditorType,
                    )
                      ? 'text-white'
                      : ''
                  }`}
                >
                  {recentLearning.course.courseGroupName}
                </span>
              )}
            </div>
          </div>

          {/* 오른쪽 정보 영역 */}
          <div className="flex-1 flex flex-col py-[20px] px-[24px]">
            {/* 과정명 */}
            <h3 className="p1-b text-black line-clamp-2 h-[58px]">
              {recentLearning?.course?.name || t('CONTINUE_LEARNING')}
            </h3>
            <Divider className="mt-[9px] mb-[12px]" />

            {/* 완료 상태 */}
            <div className="flex justify-end mb-1">
              <span className="p4-sb">
                {t('PROGRESS_STATUS', {
                  CURRENT: completedLessons,
                  TOTAL: totalLessons,
                })}
              </span>
            </div>

            {/* 프로그레스 바 */}
            <div className="w-full h-[8px] bg-form-border rounded-full overflow-hidden mb-[12px]">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* 학습하기 버튼 */}
            <button
              onClick={() => {
                const groupId =
                  recentLearning?.courseGroupId ||
                  recentLearning?.course?.courseGroupId ||
                  '';
                const navOptions = {
                  state: { from: '/learning-space/my-course' },
                };
                // Completed: firstLearning으로 이동 (복습하기)
                if (isCompleted && firstLearning) {
                  const basePath = `/course-group/${
                    firstLearning.courseGroupId || groupId
                  }/course/${firstLearning.courseId}/lesson/${
                    firstLearning.lessonId
                  }`;
                  navigate(
                    firstLearning.stepId
                      ? `${basePath}/step/${firstLearning.stepId}`
                      : basePath,
                    navOptions,
                  );
                }
                // InProgress: nextLearning으로 이동
                else if (nextLearning?.lessonId) {
                  const basePath = `/course-group/${
                    nextLearning.courseGroupId || groupId
                  }/course/${nextLearning.courseId}/lesson/${
                    nextLearning.lessonId
                  }`;
                  navigate(
                    nextLearning.stepId
                      ? `${basePath}/step/${nextLearning.stepId}`
                      : basePath,
                    navOptions,
                  );
                } else {
                  navigate(
                    `/course-group/${groupId}/course/${recentLearning?.course?.id}`,
                    navOptions,
                  );
                }
              }}
              className="w-full lg:w-[240px] lg:self-start bg-brand text-white py-[19px] rounded-full p3-b hover:bg-brand_1 transition-colors"
              style={{ boxShadow: '0px 2px 12px rgba(138, 0, 0, 0.3)' }}
            >
              {isCompleted
                ? t('REVIEW')
                : `${t('CONTINUE_LESSON', { LESSON: nextLesson })} →`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
