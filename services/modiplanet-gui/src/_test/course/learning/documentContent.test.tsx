import { act, fireEvent, render, screen } from '@testing-library/react';

import PdfContent from '@src/pages/course/learning/components/content/document/pdf';
import PdfViewer from '@src/pages/course/learning/components/content/document/pdf/PdfViewer';
import PptContent from '@src/pages/course/learning/components/content/document/ppt';
import PptViewer from '@src/pages/course/learning/components/content/document/ppt/PptViewer';

vi.mock('react-pdf', () => {
  const React = require('react');

  return {
    pdfjs: {
      version: '3.0.0',
      GlobalWorkerOptions: {},
    },
    Document: ({
      children,
      onLoadSuccess,
      onLoadProgress,
      onLoadError,
      file,
    }: {
      children: React.ReactNode;
      onLoadSuccess: (payload: { numPages: number }) => void;
      onLoadProgress: (payload: { loaded: number; total: number }) => void;
      onLoadError: (error: Error) => void;
      file: string;
    }) => {
      React.useEffect(() => {
        if (!file) {
          onLoadError(new Error('missing file'));
          return;
        }
        onLoadProgress({ loaded: 50, total: 100 });
        onLoadSuccess({ numPages: 4 });
      }, [file, onLoadError, onLoadProgress, onLoadSuccess]);

      return <div data-testid="pdf-document">{children}</div>;
    },
    Page: ({
      pageNumber,
      onLoadSuccess,
      onRenderSuccess,
    }: {
      pageNumber: number;
      onLoadSuccess: (payload: {
        originalWidth: number;
        originalHeight: number;
      }) => void;
      onRenderSuccess: () => void;
    }) => {
      React.useEffect(() => {
        onLoadSuccess({ originalWidth: 800, originalHeight: 600 });
        onRenderSuccess();
      }, [onLoadSuccess, onRenderSuccess]);

      return (
        <div data-testid={`pdf-page-${pageNumber}`}>page {pageNumber}</div>
      );
    },
  };
});

class ResizeObserverMock {
  constructor(private callback: ResizeObserverCallback) {}

  observe(target: Element) {
    this.callback(
      [
        {
          target,
          contentRect: {
            width: 800,
            height: 600,
          },
        } as ResizeObserverEntry,
      ],
      this as unknown as ResizeObserver,
    );
  }

  disconnect() {}
}

const defaultDocumentProps = {
  stepId: 'step-1',
  onPrevStep: vi.fn(),
  onNextStep: vi.fn(),
  hasPrevStep: true,
  hasNextStep: true,
  onToggleFullscreen: vi.fn(),
  isFullscreen: false,
};

describe('[학습 페이지] 문서 컨텐츠', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => 800,
    });
    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
      configurable: true,
      get: () => 600,
    });
    window.ResizeObserver =
      ResizeObserverMock as unknown as typeof ResizeObserver;
  });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('PPT 뷰어는 Office iframe 주소를 만들고 최소 로딩 시간 뒤 로딩을 끝낸다.', () => {
    // Given
    const onLoadingChange = vi.fn();

    render(
      <PptViewer
        contentUrl="https://cdn.example.com/lesson.pptx"
        title="PPT 자료"
        stepId="step-1"
        onLoadingChange={onLoadingChange}
      />,
    );

    const iframe = screen.getByTitle('PPT 자료');

    // When
    fireEvent.load(iframe);
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    // Then
    expect(iframe).toHaveAttribute(
      'src',
      'https://view.officeapps.live.com/op/embed.aspx?src=https%3A%2F%2Fcdn.example.com%2Flesson.pptx',
    );
    expect(screen.queryByAltText('Loading')).toBeNull();
    expect(onLoadingChange).toHaveBeenLastCalledWith(false);
  });

  test('PPT 뷰어는 stepId가 바뀌면 로딩 상태를 다시 시작한다.', () => {
    // Given
    const { rerender } = render(
      <PptViewer
        contentUrl="https://cdn.example.com/lesson.pptx"
        title="PPT 자료"
        stepId="step-1"
      />,
    );

    // When
    fireEvent.load(screen.getByTitle('PPT 자료'));
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    // Then
    expect(screen.queryByAltText('Loading')).toBeNull();

    // When
    rerender(
      <PptViewer
        contentUrl="https://cdn.example.com/lesson.pptx"
        title="PPT 자료"
        stepId="step-2"
      />,
    );

    // Then
    expect(screen.getByAltText('Loading')).toBeVisible();
    expect(screen.getByText('LESSON_LOADING')).toBeVisible();
  });

  test('PPT 컨텐츠는 일반 모드와 전체화면 모드의 푸터를 렌더링한다.', () => {
    // Given
    const onToggleFullscreen = vi.fn();
    const { rerender } = render(
      <PptContent
        {...defaultDocumentProps}
        contentUrl="https://cdn.example.com/lesson.pptx"
        title="PPT 자료"
        onToggleFullscreen={onToggleFullscreen}
      />,
    );

    // Then
    expect(screen.getByRole('button', { name: 'PREV_STEP' })).toBeVisible();

    // When
    rerender(
      <PptContent
        {...defaultDocumentProps}
        contentUrl="https://cdn.example.com/lesson.pptx"
        title="PPT 자료"
        onToggleFullscreen={onToggleFullscreen}
        isFullscreen
      />,
    );
    fireEvent.click(screen.getByAltText('Fullscreen').closest('button')!);

    // Then
    expect(onToggleFullscreen).toHaveBeenCalledTimes(1);
    expect(screen.getByAltText('Fullscreen')).toHaveAttribute(
      'src',
      '/assets/course/curriculum/minscreen.svg',
    );
  });

  test('PDF 뷰어는 문서 페이지, 진행률, 영상 오버레이를 표시한다.', () => {
    // Given
    const onPageChange = vi.fn();

    render(
      <PdfViewer
        contentUrl="https://cdn.example.com/lesson.pdf"
        nextContentUrl="https://cdn.example.com/next.pdf"
        stepId="step-1"
        currentPage={1}
        onPageChange={onPageChange}
        videoOverlays={[
          {
            page: 1,
            x: 0.1,
            y: 0.2,
            width: 0.3,
            height: 0.4,
            videoUrl: 'https://cdn.example.com/clip.mp4',
            mediaFile: 'clip.mp4',
          },
        ]}
      />,
    );

    // When
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Then
    expect(screen.getByTestId('pdf-document')).toBeVisible();
    expect(screen.getByTestId('pdf-page-1')).toBeVisible();
    expect(onPageChange).toHaveBeenCalledWith(1, 4);
    expect(document.querySelector('video')).toHaveAttribute(
      'src',
      'https://cdn.example.com/clip.mp4',
    );
  });

  test('PDF 뷰어는 빈 주소를 로딩 실패로 표시한다.', () => {
    // Given
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<PdfViewer contentUrl="" stepId="step-empty" />);

    // Then
    expect(screen.getByAltText('Loading Failed')).toBeVisible();
    expect(screen.getByText('LESSON_LOAD_ERROR')).toBeVisible();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'PDF Load Error:',
      expect.any(Error),
    );
  });

  test('PDF 컨텐츠는 단계 버튼을 렌더링하고 페이지 이동을 처리한다.', () => {
    // Given
    const onPrevStep = vi.fn();
    const onNextStep = vi.fn();

    render(
      <PdfContent
        {...defaultDocumentProps}
        contentUrl="https://cdn.example.com/lesson.pdf"
        slideCount={4}
        onPrevStep={onPrevStep}
        onNextStep={onNextStep}
      />,
    );

    // When
    const [, nextPageButton] = screen.getAllByRole('button');
    fireEvent.click(nextPageButton);

    // Then
    expect(screen.getByRole('button', { name: 'NEXT_STEP' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'PREV_STEP' })).toBeVisible();
    expect(screen.getByDisplayValue('2')).toBeVisible();
  });
});
