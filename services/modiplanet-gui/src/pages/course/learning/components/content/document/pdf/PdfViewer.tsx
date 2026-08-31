import { useState, useEffect, useRef, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import DocumentLoadingOverlay from '../common/DocumentLoadingOverlay';
import { CourseStepVideoOverlay } from '@services/gen/gen';

if (typeof window !== 'undefined' && 'Worker' in window) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

// 모듈 레벨 PDF 프리로드 캐시 (컴포넌트 언마운트 후에도 유지)
const pdfPreloadCache = new Map<string, ArrayBuffer>();
const preloadingUrls = new Set<string>();

async function preloadPdf(url: string): Promise<void> {
  if (!url || pdfPreloadCache.has(url) || preloadingUrls.has(url)) return;
  preloadingUrls.add(url);
  try {
    const response = await fetch(url);
    if (!response.ok) return;
    pdfPreloadCache.set(url, await response.arrayBuffer());
  } catch {
    // 프리로드 실패 시 무시 - 이동 시 정상 로드
  } finally {
    preloadingUrls.delete(url);
  }
}

interface PdfViewerProps {
  contentUrl: string;
  nextContentUrl?: string;
  stepId?: string;
  currentPage?: number;
  onPageChange?: (currentPage: number, totalPages: number) => void;
  onPageChangeRequest?: (page: number) => void;
  videoOverlays?: CourseStepVideoOverlay[];
}

interface VideoOverlayItemProps {
  overlay: CourseStepVideoOverlay;
}

function VideoOverlayItem({ overlay }: VideoOverlayItemProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${(overlay.x * 100).toFixed(4)}%`,
        top: `${(overlay.y * 100).toFixed(4)}%`,
        width: `${(overlay.width * 100).toFixed(4)}%`,
        height: `${(overlay.height * 100).toFixed(4)}%`,
        zIndex: 10,
        overflow: 'hidden',
        borderRadius: 4,
      }}
    >
      <video
        src={overlay.videoUrl}
        controls
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          background: '#000',
          display: 'block',
        }}
      />
    </div>
  );
}

export default function PdfViewer({
  contentUrl,
  nextContentUrl,
  stepId,
  currentPage: externalCurrentPage,
  onPageChange,
  onPageChangeRequest,
  videoOverlays,
}: PdfViewerProps) {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const currentPage = externalCurrentPage ?? internalCurrentPage;
  const setCurrentPage = onPageChangeRequest
    ? (page: number | ((prev: number) => number)) => {
        const newPage = typeof page === 'function' ? page(currentPage) : page;
        onPageChangeRequest(newPage);
      }
    : setInternalCurrentPage;
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [renderedWidth, setRenderedWidth] = useState(0);
  const [pageAspectRatio, setPageAspectRatio] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [renderedPages, setRenderedPages] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingStartTimeRef = useRef<number>(0);
  const hadProgressRef = useRef(false);

  useEffect(() => {
    setCurrentPage(1);
    setNumPages(null);
    setLoadingProgress(0);
    setRenderedPages(new Set());
    hadProgressRef.current = false;
    if (!contentUrl) {
      setHasError(true);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setHasError(false);
      loadingStartTimeRef.current = Date.now();
    }
  }, [stepId, contentUrl]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { clientWidth: w, clientHeight: h } = container;
    if (w > 0 && h > 0) {
      setContainerSize({ width: w, height: h });
      setRenderedWidth(w);
    }

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setContainerSize({ width, height });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (numPages) {
      onPageChange?.(currentPage, numPages);
    }
  }, [currentPage, numPages, onPageChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentPage((prev: number) => Math.max(1, prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentPage((prev: number) => Math.min(numPages || prev, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [numPages, setCurrentPage]);

  // 현재 PDF 로드 완료 후 다음 PDF 프리로드
  useEffect(() => {
    if (!isLoading && nextContentUrl) {
      preloadPdf(nextContentUrl);
    }
  }, [isLoading, nextContentUrl]);

  // contentUrl이 바뀔 때 캐시된 데이터 사용 (URL 변경 시 재계산)
  const documentFile = useMemo(() => {
    const cached = pdfPreloadCache.get(contentUrl);
    return cached ? { data: cached } : contentUrl;
  }, [contentUrl]);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoadingProgress(100);

    const TRANSITION_BUFFER = 550;

    if (!hadProgressRef.current) {
      setTimeout(() => setIsLoading(false), TRANSITION_BUFFER);
      return;
    }

    const MIN_LOADING_TIME = 1000;
    const elapsedTime = Date.now() - loadingStartTimeRef.current;
    const remainingTime = Math.max(
      TRANSITION_BUFFER,
      MIN_LOADING_TIME - elapsedTime,
    );
    setTimeout(() => setIsLoading(false), remainingTime);
  };

  const handleDocumentLoadProgress = ({
    loaded,
    total,
  }: {
    loaded: number;
    total: number;
  }) => {
    if (total > 0) {
      hadProgressRef.current = true;
      const progress = Math.round((loaded / total) * 100);
      setLoadingProgress((prev) => Math.max(prev, progress));
    }
  };

  const handlePageLoadSuccess = (page: {
    originalWidth: number;
    originalHeight: number;
  }) => {
    setPageAspectRatio(page.originalWidth / page.originalHeight);
  };

  const handleDocumentLoadError = (error: Error) => {
    console.error('PDF Load Error:', error);
    setHasError(true);
    setIsLoading(false);
  };

  const renderedHeight = renderedWidth / pageAspectRatio;
  const currentPageOverlays =
    videoOverlays?.filter((o) => o.page === currentPage) ?? [];
  const scale =
    renderedWidth > 0
      ? Math.min(
          containerSize.width / renderedWidth,
          containerSize.height / renderedHeight,
        )
      : 1;

  const PAGE_BUFFER = 2;
  const pagesToRender = useMemo(() => {
    if (!numPages) return [];
    const pages: number[] = [];
    for (
      let i = Math.max(1, currentPage - PAGE_BUFFER);
      i <= Math.min(numPages, currentPage + PAGE_BUFFER);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, numPages]);

  const isCurrentPageRendered = renderedPages.has(currentPage);

  return (
    <div
      ref={containerRef}
      className="bg-white w-full h-full relative overflow-hidden"
    >
      <div className="w-full h-full flex items-center justify-center relative">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.15s ease-out',
            willChange: 'transform',
          }}
        >
          <Document
            key={stepId}
            file={documentFile}
            onLoadSuccess={handleDocumentLoadSuccess}
            onLoadProgress={handleDocumentLoadProgress}
            onLoadError={handleDocumentLoadError}
            loading={<div />}
            className="flex items-center justify-center"
            options={{
              cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/cmaps/`,
              cMapPacked: true,
              disableAutoFetch: false,
              disableStream: false,
              isEvalSupported: false,
            }}
          >
            {renderedWidth > 0 && (
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#fff',
                }}
              >
                {pagesToRender.map((pageNum) => {
                  const isCurrent = pageNum === currentPage;
                  return (
                    <div
                      key={pageNum}
                      style={
                        isCurrent
                          ? { opacity: isCurrentPageRendered ? 1 : 0 }
                          : {
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              opacity: 0,
                              pointerEvents: 'none',
                            }
                      }
                    >
                      <Page
                        pageNumber={pageNum}
                        width={renderedWidth}
                        onLoadSuccess={handlePageLoadSuccess}
                        onRenderSuccess={() => {
                          setRenderedPages((prev) => {
                            if (prev.has(pageNum)) return prev;
                            return new Set(prev).add(pageNum);
                          });
                        }}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        loading=""
                      />
                    </div>
                  );
                })}
                {isCurrentPageRendered &&
                  !isLoading &&
                  currentPageOverlays.map((overlay) => (
                    <VideoOverlayItem
                      key={overlay.mediaFile}
                      overlay={overlay}
                    />
                  ))}
              </div>
            )}
          </Document>
        </div>

        {(isLoading || hasError) && (
          <DocumentLoadingOverlay
            loadingProgress={loadingProgress}
            showProgress={true}
            hasError={hasError}
          />
        )}
      </div>
    </div>
  );
}
