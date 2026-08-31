import StepNavButtons from './StepNavButtons';
import FullscreenToggle from './FullscreenToggle';
import PaginationControls from './PaginationControls';

interface LearningPageFooterProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageChange?: (page: number) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  showPagination?: boolean;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  hasPrevLesson?: boolean;
  hasNextLesson?: boolean;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
}

export default function LearningPageFooter({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onPageChange,
  onPrevStep,
  onNextStep,
  hasPrevStep,
  hasNextStep,
  onToggleFullscreen,
  isFullscreen,
  showPagination = true,
  isFirstStep,
  isLastStep,
  hasPrevLesson,
  hasNextLesson,
  onPrevLesson,
  onNextLesson,
}: LearningPageFooterProps) {
  return (
    <footer className="shrink-0 flex flex-col border-t border-[#EEEEEE] bg-white">
      {showPagination && (
        <div className="h-[48px] flex items-center justify-center relative border-b border-[#F2F2F2]">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onPageChange={onPageChange}
          />
          <FullscreenToggle
            isFullscreen={isFullscreen}
            onToggle={onToggleFullscreen}
            className="absolute right-[24px]"
          />
        </div>
      )}

      <div className="h-[60px] flex items-center justify-between px-[24px]">
        <StepNavButtons
          onPrevStep={onPrevStep}
          onNextStep={onNextStep}
          hasPrevStep={hasPrevStep}
          hasNextStep={hasNextStep}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          hasPrevLesson={hasPrevLesson}
          hasNextLesson={hasNextLesson}
          onPrevLesson={onPrevLesson}
          onNextLesson={onNextLesson}
        />
      </div>
    </footer>
  );
}
