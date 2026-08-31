import PptViewer from './PptViewer';
import LearningPageFooter from '../../../LearningPageFooter';
import StepNavButtons from '../../../StepNavButtons';
import FullscreenToggle from '../../../FullscreenToggle';

interface PptContentProps {
  contentUrl: string;
  title: string;
  stepId?: string;
  onPrevStep: () => void;
  onNextStep: () => void;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export default function PptContent({
  contentUrl,
  title,
  stepId,
  onPrevStep,
  onNextStep,
  hasPrevStep,
  hasNextStep,
  onToggleFullscreen,
  isFullscreen,
}: PptContentProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <PptViewer contentUrl={contentUrl} title={title} stepId={stepId} />
      </div>

      {isFullscreen ? (
        <footer className="shrink-0 h-[60px] flex items-center justify-between px-[24px] border-t border-[#EEEEEE] bg-white">
          <StepNavButtons
            onPrevStep={onPrevStep}
            onNextStep={onNextStep}
            hasPrevStep={hasPrevStep}
            hasNextStep={hasNextStep}
            between={<div className="flex-1" />}
            beforeNext={
              <FullscreenToggle
                isFullscreen={isFullscreen}
                onToggle={onToggleFullscreen}
              />
            }
          />
        </footer>
      ) : (
        <LearningPageFooter
          currentPage={1}
          totalPages={1}
          onPrevPage={() => {}}
          onNextPage={() => {}}
          onPrevStep={onPrevStep}
          onNextStep={onNextStep}
          hasPrevStep={hasPrevStep}
          hasNextStep={hasNextStep}
          onToggleFullscreen={onToggleFullscreen}
          isFullscreen={isFullscreen}
          showPagination={false}
        />
      )}
    </div>
  );
}
