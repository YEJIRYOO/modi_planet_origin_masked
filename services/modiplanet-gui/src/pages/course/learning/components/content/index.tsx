import { useMemo } from 'react';
import VideoContent from './media/video';
import YoutubeContent from './media/youtube';
import PdfContent from './document/pdf';
import CodingContent from './coding';
import { ActivityCodingType, CourseStepVideoOverlay } from '@services/gen/gen';

interface ContentProps {
  contentType: 'CODING' | 'PDF' | 'VOD' | 'YOUTUBE';
  contentUrl?: string;
  nextContentUrl?: string;
  slideCount?: number;
  learningObjective?: string;
  activity?: string;
  codeEditorType?: ActivityCodingType;
  videoOverlays?: CourseStepVideoOverlay[];
  stepId?: string;
  title?: string;
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

export default function Content({
  contentType,
  contentUrl,
  nextContentUrl,
  slideCount,
  learningObjective,
  activity,
  codeEditorType,
  videoOverlays,
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
}: ContentProps) {
  const commonProps = useMemo(
    () => ({
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
    }),
    [
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
    ],
  );

  const contentComponents = useMemo(
    () => ({
      VOD: <VideoContent {...commonProps} contentUrl={contentUrl || ''} />,
      YOUTUBE: (
        <YoutubeContent {...commonProps} contentUrl={contentUrl || ''} />
      ),
      PDF: (
        <PdfContent
          {...commonProps}
          contentUrl={contentUrl || ''}
          nextContentUrl={nextContentUrl}
          slideCount={slideCount}
          videoOverlays={videoOverlays}
        />
      ),
      CODING: (
        <CodingContent
          {...commonProps}
          learningObjective={learningObjective || ''}
          activity={activity || ''}
          codeEditorType={codeEditorType}
        />
      ),
    }),
    [commonProps, contentUrl, learningObjective, activity, videoOverlays],
  );

  return (
    contentComponents[contentType] || (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">
          지원하지 않는 컨텐츠 형식입니다: {contentType}
        </p>
      </div>
    )
  );
}
