import useTranslator from '@src/components/hooks/useTranslator';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import Chevron from '@src/lib/newAssets/chevron';

interface StepNavButtonsProps {
  onPrevStep: () => void;
  onNextStep: () => void;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  between?: React.ReactNode;
  beforeNext?: React.ReactNode;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  hasPrevLesson?: boolean;
  hasNextLesson?: boolean;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
}

export default function StepNavButtons({
  onPrevStep,
  onNextStep,
  hasPrevStep,
  hasNextStep,
  between,
  beforeNext,
  isFirstStep = false,
  isLastStep = false,
  hasPrevLesson = false,
  hasNextLesson = false,
  onPrevLesson,
  onNextLesson,
}: StepNavButtonsProps) {
  const { t } = useTranslator();

  const showPrevLesson = isFirstStep;
  const showNextLesson = isLastStep;

  return (
    <>
      {showPrevLesson ? (
        <ButtonUI
          color="secondary"
          size="sm"
          isDisabled={!hasPrevLesson}
          onClick={onPrevLesson}
          className="px-[12px]"
          startContent={
            <Chevron.ChevronLeft className="w-[20px] h-[20px] text-white" />
          }
        >
          <p className="p5-sb mr-1">{t('PREV_LESSON')}</p>
        </ButtonUI>
      ) : (
        <ButtonUI
          color="secondary"
          size="sm"
          isDisabled={!hasPrevStep}
          onClick={onPrevStep}
          className="px-[12px]"
          startContent={
            <Chevron.ChevronLeft className="w-[20px] h-[20px] text-white" />
          }
        >
          <p className="p5-sb mr-1">{t('PREV_STEP')}</p>
        </ButtonUI>
      )}
      {between}
      <div className="flex items-center gap-[16px]">
        {beforeNext}
        {showNextLesson ? (
          <ButtonUI
            color="secondary"
            size="sm"
            isDisabled={!hasNextLesson}
            onClick={onNextLesson}
            className="px-[12px]"
            endContent={
              <Chevron.ChevronRight className="w-[20px] h-[20px] text-white" />
            }
          >
            <p className="p5-sb ml-1">{t('NEXT_LESSON')}</p>
          </ButtonUI>
        ) : (
          <ButtonUI
            color="secondary"
            size="sm"
            isDisabled={!hasNextStep}
            onClick={onNextStep}
            className="px-[12px]"
            endContent={
              <Chevron.ChevronRight className="w-[20px] h-[20px] text-white" />
            }
          >
            <p className="p5-sb ml-1">{t('NEXT_STEP')}</p>
          </ButtonUI>
        )}
      </div>
    </>
  );
}
