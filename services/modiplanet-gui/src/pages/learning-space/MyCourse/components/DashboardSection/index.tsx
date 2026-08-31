import BannerSection from './BannerSection';
import StatsSection from './StatsSection';

interface DashboardSectionProps {
  onStartChallenge?: () => void;
  dashboard?: {
    learningStatus?: {
      enrolledCourseCount: number;
      completedCourseCount: number;
      inProgressCourseCount: number;
      totalLearningTimeSeconds: number;
      learningTimeByType?: {
        stepType: string;
        totalActiveSeconds: number;
        totalDurationSeconds: number;
        sessionCount: number;
      }[];
    };
    recentLearning?: any;
  } | null;
  loading?: boolean;
}

export default function DashboardSection({
  onStartChallenge,
  dashboard,
  loading = false,
}: DashboardSectionProps) {
  const learningStatus = dashboard?.learningStatus;
  const recentLearning = dashboard?.recentLearning;

  const completedCourseCount = learningStatus?.completedCourseCount ?? 0;
  const inProgressCourseCount = learningStatus?.inProgressCourseCount ?? 0;
  const codingLearningTimeSeconds =
    learningStatus?.learningTimeByType?.find((t) => t.stepType === 'CODING')
      ?.totalActiveSeconds ?? 0;

  const isInitialLoading = !loading && !dashboard;

  return (
    <div className="flex justify-between mb-[30px] lg:flex-col lg:gap-[20px]">
      <BannerSection
        inProgressCourseCount={inProgressCourseCount}
        recentLearning={recentLearning}
        onStartChallenge={onStartChallenge}
        loading={loading || isInitialLoading}
      />
      <StatsSection
        completedCourseCount={completedCourseCount}
        inProgressCourseCount={inProgressCourseCount}
        totalLearningTimeSeconds={codingLearningTimeSeconds}
        loading={loading || isInitialLoading}
      />
    </div>
  );
}
