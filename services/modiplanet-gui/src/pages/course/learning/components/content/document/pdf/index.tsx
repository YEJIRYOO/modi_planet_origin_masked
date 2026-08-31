import { useState, useCallback, useEffect } from 'react';
import PdfViewer from './PdfViewer';
import LearningPageFooter from '../../../LearningPageFooter';
import StepNavButtons from '../../../StepNavButtons';
import FullscreenToggle from '../../../FullscreenToggle';
import PaginationControls from '../../../PaginationControls';
import { CourseStepVideoOverlay } from '@services/gen/gen';

interface PdfContentProps {
  contentUrl: string;
  nextContentUrl?: string;
  stepId?: string;
  slideCount?: number;
  videoOverlays?: CourseStepVideoOverlay[];
  onPrevStep: () => void;
  onNextStep: () => void;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  hasPrevLesson?: boolean;
  hasNextLesson?: boolean;
  onPrevLesson?: () => void;
  onNextLesson?: () => void;
}

export default function PdfContent({
  contentUrl,
  nextContentUrl,
  stepId,
  slideCount,
  videoOverlays,
  onPrevStep,
  onNextStep,
  hasPrevStep,
  hasNextStep,
  onToggleFullscreen,
  isFullscreen,
  isFirstStep,
  isLastStep,
  hasPrevLesson,
  hasNextLesson,
  onPrevLesson,
  onNextLesson,
}: PdfContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(slideCount ?? 1);

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(slideCount ?? 1);
  }, [stepId, slideCount]);

  const handlePageChange = useCallback((page: number, total: number) => {
    setCurrentPage(page);
    setTotalPages(total);
  }, []);

  const handlePageChangeRequest = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <PdfViewer
          key={stepId}
          contentUrl={contentUrl}
          nextContentUrl={nextContentUrl}
          stepId={stepId}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPageChangeRequest={handlePageChangeRequest}
          videoOverlays={videoOverlays}
        />
      </div>

      {isFullscreen ? (
        <footer className="shrink-0 h-[60px] flex items-center px-[24px] border-t border-[#EEEEEE] bg-white">
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
            between={
              <>
                <div className="w-[56px]" />
                <div className="flex-1 flex items-center justify-center">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                    onPageChange={handlePageChangeRequest}
                  />
                </div>
              </>
            }
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onPageChange={handlePageChangeRequest}
          onPrevStep={onPrevStep}
          onNextStep={onNextStep}
          hasPrevStep={hasPrevStep}
          hasNextStep={hasNextStep}
          onToggleFullscreen={onToggleFullscreen}
          isFullscreen={isFullscreen}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          hasPrevLesson={hasPrevLesson}
          hasNextLesson={hasNextLesson}
          onPrevLesson={onPrevLesson}
          onNextLesson={onNextLesson}
        />
      )}
    </div>
  );
}
