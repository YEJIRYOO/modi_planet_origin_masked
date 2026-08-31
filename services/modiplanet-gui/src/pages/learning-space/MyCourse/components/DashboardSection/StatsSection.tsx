import useTranslator from '@src/components/hooks/useTranslator';
import { Skeleton } from '@nextui-org/skeleton';

interface StatsSectionProps {
  completedCourseCount: number;
  inProgressCourseCount: number;
  totalLearningTimeSeconds: number;
  loading?: boolean;
}

export function StatsSkeleton() {
  return (
    <div className="flex w-[540px] lg:w-full justify-between ring-1 ring-form-border ring-inset rounded-[24px] p-6">
      {/* 학습 완료한 과정 */}
      <div className="w-[164px] lg:w-[284px] h-[200px] flex flex-col items-center justify-center">
        <Skeleton className="w-[60px] h-[60px] rounded-full mb-[28px]" />
        <Skeleton className="w-[120px] h-[16px] rounded-lg mb-1" />
        <div className="h-[48px] flex items-center justify-center">
          <Skeleton className="w-[80px] h-[20px] rounded-lg" />
        </div>
      </div>

      {/* 학습 중인 과정 */}
      <div className="w-[164px] lg:w-[284px] h-[200px] flex flex-col items-center justify-center">
        <Skeleton className="w-[60px] h-[60px] rounded-full mb-[28px]" />
        <Skeleton className="w-[120px] h-[16px] rounded-lg mb-1" />
        <div className="h-[48px] flex items-center justify-center">
          <Skeleton className="w-[80px] h-[20px] rounded-lg" />
        </div>
      </div>

      {/* 코딩한 시간 */}
      <div className="w-[164px] lg:w-[284px] h-[200px] flex flex-col items-center justify-center">
        <Skeleton className="w-[60px] h-[60px] rounded-full mb-[28px]" />
        <Skeleton className="w-[120px] h-[16px] rounded-lg mb-1" />
        <div className="h-[48px] flex items-center justify-center">
          <Skeleton className="w-[80px] h-[20px] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function StatsSection({
  completedCourseCount,
  inProgressCourseCount,
  totalLearningTimeSeconds,
  loading = false,
}: StatsSectionProps) {
  const { t } = useTranslator();

  if (loading) {
    return <StatsSkeleton />;
  }

  // 학습 시간을 시간과 분으로 변환
  const formatLearningTime = (seconds: number) => {
    if (seconds === 0) return { zero: true, hours: 0, minutes: 0 };
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { zero: false, hours, minutes };
  };

  return (
    <div className="grid grid-cols-3 w-[540px] lg:w-full grid-rows-[auto_auto_auto] ring-1 ring-form-border ring-inset rounded-[24px] p-6">
      {/* 학습 완료한 과정 */}
      <div className="grid grid-rows-subgrid row-span-3 items-center justify-items-center py-4">
        <img
          className="w-[60px] h-[60px] mb-[28px]"
          src="/assets/learning-space/success.svg"
        />
        <p className="p3-m text-font-sub_1 mb-1 text-center self-center">
          {t('COMPLETED_COURSES')}
        </p>
        <p className="h-[48px] flex items-center text-font-main p2-b">
          <span>{completedCourseCount}</span>
          <span>{t('ITEMS')}</span>
        </p>
      </div>

      {/* 학습 중인 과정 */}
      <div className="grid grid-rows-subgrid row-span-3 items-center justify-items-center py-4">
        <img
          className="w-[60px] h-[60px] mb-[28px]"
          src="/assets/learning-space/in-progress.svg"
        />
        <p className="p3-m text-font-sub_1 mb-1 text-center self-center">
          {t('COURSES_IN_PROGRESS')}
        </p>
        <p className="h-[48px] flex items-center text-font-main p2-b">
          <span>{inProgressCourseCount}</span>
          <span>{t('ITEMS')}</span>
        </p>
      </div>

      {/* 코딩한 시간 */}
      <div className="grid grid-rows-subgrid row-span-3 items-center justify-items-center py-4">
        <img
          className="w-[60px] h-[60px] mb-[28px]"
          src="/assets/learning-space/time.svg"
        />
        <p className="p3-m text-font-sub_1 mb-1 text-center self-center lg:whitespace-nowrap">
          {t('CODING_TIME')}
        </p>
        {(() => {
          const { zero, hours, minutes } = formatLearningTime(
            totalLearningTimeSeconds,
          );
          if (zero) {
            return (
              <div className="h-[48px] flex items-center justify-center">
                <p className="p3-b text-font-main text-center lg:whitespace-nowrap">
                  {t('FILL_FIRST_MINUTE')}
                </p>
              </div>
            );
          }
          if (hours > 0 && minutes > 0) {
            return (
              <div className="h-[48px] flex items-center justify-center">
                <p className="p2-b text-font-main leading-none mr-1">{`${hours}${t(
                  'HOUR',
                )}`}</p>
                <p className="p2-b text-font-main leading-none">{`${minutes}${t(
                  'MIN',
                )}`}</p>
              </div>
            );
          }
          return (
            <div className="h-[48px] flex items-center justify-center">
              <p className="p2-b text-font-main text-center">
                {hours > 0 ? `${hours}${t('HOUR')}` : `${minutes}${t('MIN')}`}
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
