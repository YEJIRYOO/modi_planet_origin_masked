import ButtonUI from '@src/components/ui/Button/ButtonUI';
import ProgressUI from '@src/components/ui/Progress/ProgressUI';
import Chevron from '@src/lib/newAssets/chevron';
import useTranslator from '@src/components/hooks/useTranslator';

interface LearningPageHeaderProps {
  lessonName: string;
  lessonIndex: number;
  stepName: string;
  completedSteps: number;
  totalSteps: number;
  onExit: () => void;
  onLessonClick?: () => void;
  onFeedbackClick?: () => void;
  hideStepInfo?: boolean;
}

export default function LearningPageHeader({
  lessonName,
  lessonIndex,
  stepName,
  completedSteps,
  totalSteps,
  onExit,
  onLessonClick,
  onFeedbackClick,
  hideStepInfo,
}: LearningPageHeaderProps) {
  const { t } = useTranslator();
  const progressRate = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <header className="h-[60px] border-b bg-white flex items-center justify-between px-[24px] shrink-0">
      <div className="flex-1 min-w-0 flex items-center gap-[8px]">
        <button
          onClick={onLessonClick}
          className="p3-r text-font-sub_2 hover:text-font-main transition-colors truncate shrink min-w-0 p-0"
        >
          {lessonIndex}. {lessonName}
        </button>
        {!hideStepInfo && (
          <>
            <Chevron.ChevronRight className="w-[24px] h-[24px] text-[#D9D9D9] shrink-0" />
            <span className="p3-r truncate shrink min-w-[200px]">
              {stepName}
            </span>
          </>
        )}
      </div>

      <div className="flex shrink-0 pl-2 items-center gap-[40px] lg:gap-[8px]">
        {!hideStepInfo && (
          <div className="flex items-center gap-3 max-w-[360px]">
            <span className="p6-m text-font-sub whitespace-nowrap">
              {completedSteps}/{totalSteps}
            </span>
            <ProgressUI
              aria-label="Course progress"
              value={progressRate}
              variant="brand"
              indicatorColor="#FF7F6D"
              className="w-[300px] lg:w-[100px]"
              size="sm"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          {!hideStepInfo && (
            <ButtonUI
              variant="bordered"
              color="secondary"
              size="sm"
              onClick={onFeedbackClick}
              startContent={
                <img src="/assets/course/curriculum/feedback.svg" />
              }
              className="lg:!h-[32px] lg:!w-[32px] lg:!min-w-0 lg:!px-0"
            >
              <span className="lg:hidden p5-sb">{t('SEND_FEEDBACK')}</span>
            </ButtonUI>
          )}
          <ButtonUI size="sm" onClick={onExit} className="px-[22px]">
            <p className="p5-sb">{t('END_LEARNING')}</p>
          </ButtonUI>
        </div>
      </div>
    </header>
  );
}
