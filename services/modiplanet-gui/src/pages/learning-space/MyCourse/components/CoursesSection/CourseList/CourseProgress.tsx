import useTranslator from '@src/components/hooks/useTranslator';
import ProgressUI from '@src/components/ui/Progress/ProgressUI';

interface CourseProgressProps {
  current: number;
  total: number;
}

export default function CourseProgress({
  current,
  total,
}: CourseProgressProps) {
  const { t } = useTranslator();
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  const isComplete = percentage === 100;

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-end mb-2">
        <span className={`p4-sb ${isComplete ? 'text-font-sub_2' : ''}`}>
          {t('PROGRESS_STATUS', { CURRENT: current, TOTAL: total })}
        </span>
      </div>
      <ProgressUI
        aria-label="Course progress"
        value={percentage}
        variant="brand"
        indicatorColor={percentage === 100 ? '#FFB1A3' : undefined}
        className="w-full"
        size="sm"
        disableAnimation
      />
    </div>
  );
}
