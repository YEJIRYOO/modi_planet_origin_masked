import useTranslator from '@src/components/hooks/useTranslator';
import StepNavButtons from '../../StepNavButtons';

interface NoContentProps {
  hasPrevLesson?: boolean;
  hasNextLesson?: boolean;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
}

export default function NoContent({
  hasPrevLesson,
  hasNextLesson,
  onPrevLesson,
  onNextLesson,
}: NoContentProps) {
  const { t } = useTranslator();

  return (
    <>
      <div className="flex-1 flex flex-col items-center justify-center">
        <img
          src="/assets/error/no-data.svg"
          alt="no data"
          className="w-[120px] h-[120px] mb-[12px]"
        />
        <p className="text-white p3-r">{t('NO_MATERIAL')}</p>
      </div>
      <footer className="shrink-0 flex flex-col border-t border-[#EEEEEE] bg-white">
        <div className="h-[60px] flex items-center justify-between px-[24px]">
          <StepNavButtons
            onPrevStep={() => {}}
            onNextStep={() => {}}
            hasPrevStep={false}
            hasNextStep={false}
            isFirstStep
            isLastStep
            hasPrevLesson={!!hasPrevLesson}
            hasNextLesson={!!hasNextLesson}
            onPrevLesson={onPrevLesson}
            onNextLesson={onNextLesson}
          />
        </div>
      </footer>
    </>
  );
}
