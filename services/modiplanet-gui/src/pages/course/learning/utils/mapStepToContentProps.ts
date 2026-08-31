import {
  ActivityCodingType,
  CourseStepDType,
  CourseStepVideoOverlay,
} from '@services/gen/gen';

type ContentType = 'CODING' | 'PDF' | 'VOD' | 'YOUTUBE';

export interface MappedStepContent {
  contentType: ContentType;
  contentUrl?: string;
  slideCount?: number;
  learningObjective?: string;
  activity?: string;
  codeEditorType?: ActivityCodingType;
  videoOverlays?: CourseStepVideoOverlay[];
}

const TYPENAME_TO_DTYPE: Record<string, CourseStepDType> = {
  CourseStepCoding: CourseStepDType.Coding,
  CourseStepPdf: CourseStepDType.Pdf,
  CourseStepPpt: CourseStepDType.Ppt,
  CourseStepVod: CourseStepDType.Vod,
  CourseStepYoutube: CourseStepDType.Youtube,
};

export function mapStepToContentProps(
  step: Record<string, any>,
): MappedStepContent | null {
  const dType = step.dType || TYPENAME_TO_DTYPE[step.__typename];

  switch (dType) {
    case CourseStepDType.Ppt:
      const pdfUrl = step.ppt?.convertedPdfUrl;
      if (!pdfUrl) {
        console.error('❌ PPT PDF 변환 실패:', {
          analysisStatus: step.ppt?.analysisStatus,
          originalFile: step.ppt?.file?.url,
        });
      }
      return {
        contentType: 'PDF',
        contentUrl: pdfUrl ?? undefined,
        slideCount: step.ppt?.slideCount ?? undefined,
        videoOverlays: step.ppt?.videoOverlays ?? [],
      };
    case CourseStepDType.Pdf:
      return {
        contentType: 'PDF',
        contentUrl: step.pdf?.file?.url,
        slideCount: step.pdf?.totalCount ?? undefined,
      };
    case CourseStepDType.Coding:
      return {
        contentType: 'CODING',
        learningObjective: step.coding?.learningObjective ?? undefined,
        activity: step.coding?.activity ?? undefined,
        codeEditorType: step.coding?.codingType ?? undefined,
      };
    case CourseStepDType.Vod:
      return {
        contentType: 'VOD',
        contentUrl: step.vod?.url ?? undefined,
      };
    case CourseStepDType.Youtube:
      return {
        contentType: 'YOUTUBE',
        contentUrl: step.youtube?.url ?? undefined,
      };
    default:
      return null;
  }
}
