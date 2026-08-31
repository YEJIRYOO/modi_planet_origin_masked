import { mapStepToContentProps } from '@src/pages/course/learning/utils/mapStepToContentProps';
import {
  ActivityCodingType,
  CourseStepDType,
} from '@src/services/gen/gen';

describe('[학습 페이지] 단계 컨텐츠 매핑', () => {
  test('PPT 단계는 변환된 PDF 주소와 슬라이드 정보를 반환한다.', () => {
    // Given
    const videoOverlays = [
      {
        page: 1,
        x: 0.1,
        y: 0.2,
        width: 0.3,
        height: 0.4,
        videoUrl: 'https://cdn.example.com/video.mp4',
        mediaFile: 'video.mp4',
      },
    ];

    // When
    const result = mapStepToContentProps({
      dType: CourseStepDType.Ppt,
      ppt: {
        convertedPdfUrl: 'https://cdn.example.com/lesson.pdf',
        slideCount: 12,
        videoOverlays,
      },
    });

    // Then
    expect(result).toEqual({
      contentType: 'PDF',
      contentUrl: 'https://cdn.example.com/lesson.pdf',
      slideCount: 12,
      videoOverlays,
    });
  });

  test('PPT 변환 PDF 주소가 없으면 에러를 기록하고 빈 주소로 매핑한다.', () => {
    // Given
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // When
    const result = mapStepToContentProps({
      dType: CourseStepDType.Ppt,
      ppt: {
        analysisStatus: 'FAILED',
        file: { url: 'https://cdn.example.com/original.pptx' },
      },
    });

    // Then
    expect(result).toEqual({
      contentType: 'PDF',
      contentUrl: undefined,
      slideCount: undefined,
      videoOverlays: [],
    });
    expect(consoleError).toHaveBeenCalledWith('❌ PPT PDF 변환 실패:', {
      analysisStatus: 'FAILED',
      originalFile: 'https://cdn.example.com/original.pptx',
    });

    consoleError.mockRestore();
  });

  test('__typename으로 PDF 단계를 판단해 파일 주소와 페이지 수를 반환한다.', () => {
    // When
    const result = mapStepToContentProps({
      __typename: 'CourseStepPdf',
      pdf: {
        file: { url: 'https://cdn.example.com/document.pdf' },
        totalCount: 8,
      },
    });

    // Then
    expect(result).toEqual({
      contentType: 'PDF',
      contentUrl: 'https://cdn.example.com/document.pdf',
      slideCount: 8,
    });
  });

  test('코딩 단계는 학습 목표와 액티비티 정보를 반환한다.', () => {
    // When
    const result = mapStepToContentProps({
      dType: CourseStepDType.Coding,
      coding: {
        learningObjective: '반복문을 이해한다.',
        activity: '블록으로 반복 실행하기',
        codingType: ActivityCodingType.Block,
      },
    });

    // Then
    expect(result).toEqual({
      contentType: 'CODING',
      learningObjective: '반복문을 이해한다.',
      activity: '블록으로 반복 실행하기',
      codeEditorType: ActivityCodingType.Block,
    });
  });

  test('영상과 유튜브 단계는 각각의 컨텐츠 타입과 주소를 반환한다.', () => {
    expect(
      mapStepToContentProps({
        dType: CourseStepDType.Vod,
        vod: { url: 'https://cdn.example.com/lesson.mp4' },
      }),
    ).toEqual({
      contentType: 'VOD',
      contentUrl: 'https://cdn.example.com/lesson.mp4',
    });

    expect(
      mapStepToContentProps({
        dType: CourseStepDType.Youtube,
        youtube: { url: 'https://youtube.com/watch?v=modi' },
      }),
    ).toEqual({
      contentType: 'YOUTUBE',
      contentUrl: 'https://youtube.com/watch?v=modi',
    });
  });

  test('지원하지 않는 단계 유형은 null을 반환한다.', () => {
    expect(
      mapStepToContentProps({
        dType: CourseStepDType.Quiz,
      }),
    ).toBeNull();
  });
});
