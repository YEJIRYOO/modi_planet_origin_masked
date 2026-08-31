import ProgressUI from '@components/ui/Progress/ProgressUI';
import useTranslator from '@src/components/hooks/useTranslator';

interface DocumentLoadingOverlayProps {
  loadingProgress?: number;
  showProgress?: boolean;
  hasError?: boolean;
}

export default function DocumentLoadingOverlay({
  loadingProgress = 0,
  showProgress = false,
  hasError = false,
}: DocumentLoadingOverlayProps) {
  const { t } = useTranslator();
  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-10"
      style={{ background: '#000000CC' }}
    >
      <div className="flex flex-col items-center justify-center gap-[24px] p-[40px]">
        <img
          src={
            hasError
              ? '/assets/course/curriculum/loading-failed.svg'
              : '/assets/course/curriculum/loading.gif'
          }
          alt={hasError ? 'Loading Failed' : 'Loading'}
          className="w-[120px] h-[120px]"
        />
        <p className="p4-sb text-white">
          {hasError ? t('LESSON_LOAD_ERROR') : t('LESSON_LOADING')}
        </p>
        {showProgress && !hasError && (
          <div className="flex items-center gap-1 w-[200px]">
            <ProgressUI
              aria-label="Course progress"
              value={loadingProgress}
              variant="brand"
              className="flex-1"
              size="sm"
            />
            <p className="p6-m text-white whitespace-nowrap min-w-[34px] text-right">
              {loadingProgress}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
