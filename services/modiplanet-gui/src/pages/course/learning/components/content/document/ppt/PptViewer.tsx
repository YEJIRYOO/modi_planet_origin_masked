import { useState, useEffect, useRef } from 'react';
import DocumentLoadingOverlay from '../common/DocumentLoadingOverlay';

interface PptViewerProps {
  contentUrl: string;
  title: string;
  onLoadingChange?: (isLoading: boolean) => void;
  stepId?: string;
}

export default function PptViewer({
  contentUrl,
  title,
  onLoadingChange,
  stepId,
}: PptViewerProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const loadingStartTimeRef = useRef<number>(0);

  // stepId가 변경되면 로딩 상태 리셋
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setLoadingProgress(0);
    loadingStartTimeRef.current = Date.now();
  }, [stepId]);

  // 로딩 상태 변경 통지
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  const handleIframeLoad = () => {
    // iframe 로드 완료
    const MIN_LOADING_TIME = 1200;
    const elapsedTime = Date.now() - loadingStartTimeRef.current;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

    setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);
  };

  const handleIframeError = () => {
    setHasError(true);
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
          contentUrl,
        )}`}
        className="w-full h-full border-0"
        title={title}
        onLoad={handleIframeLoad}
        onError={handleIframeError}
      />

      {/* Loading Overlay */}
      {isLoading && (
        <DocumentLoadingOverlay
          loadingProgress={loadingProgress}
          showProgress={false}
          hasError={hasError}
        />
      )}
    </div>
  );
}
