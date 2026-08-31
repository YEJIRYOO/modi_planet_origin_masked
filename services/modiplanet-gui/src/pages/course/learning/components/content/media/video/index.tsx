import { useState, useCallback } from 'react';
import VideoViewer from './VideoViewer';
import VideoPlayerControls from '../common/VideoPlayerControls';
import LearningPageFooter from '../../../LearningPageFooter';
import StepNavButtons from '../../../StepNavButtons';
import type { MediaPlayer } from '../common/types';

interface VideoContentProps {
  contentUrl: string;
  stepId?: string;
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

export default function VideoContent({
  contentUrl,
  stepId,
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
}: VideoContentProps) {
  const [player, setPlayer] = useState<MediaPlayer | null>(null);

  const handlePlayerReady = useCallback((p: MediaPlayer) => {
    setPlayer(p);
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <VideoViewer
          contentUrl={contentUrl}
          stepId={stepId}
          onToggleFullscreen={onToggleFullscreen}
          isFullscreen={isFullscreen}
          showControls={!isFullscreen}
          onPlayerReady={handlePlayerReady}
        />
      </div>

      {isFullscreen ? (
        <footer className="shrink-0 h-[60px] flex items-center justify-between px-[24px] border-t border-[#EEEEEE] bg-white">
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
              <VideoPlayerControls
                player={player}
                onToggleFullscreen={onToggleFullscreen}
                isFullscreen={isFullscreen}
                className="flex-1 h-full px-[40px]"
                stepId={stepId}
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
