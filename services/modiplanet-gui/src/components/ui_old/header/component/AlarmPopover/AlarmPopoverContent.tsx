import Check from '@src/lib/assets/noti-check.svg?react';
import useTranslator from '@hooks/useTranslator';
import AlarmItem from './AlarmItem';
import { useMarkNotificationAsRead } from '@services/api/support/useMarkNotificationAsRead';
import { useRef, useCallback, useEffect } from 'react';

interface Notification {
  id: string;
  userId?: string | null;
  profileId?: string | null;
  title?: string | null;
  description: string;
  webLinkPath?: string | null;
  iconUrl?: string | null;
  state: any;
  uiType?: string | null;
  type?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

interface AlarmPopoverContent {
  notices: Notification[] | null;
  onClose: () => void;
  hasNextPage: boolean;
  loadMore: () => void;
}

export function AlarmPopoverContent({
  notices,
  onClose,
  hasNextPage,
  loadMore,
}: AlarmPopoverContent) {
  const { markAsRead } = useMarkNotificationAsRead();
  const { t } = useTranslator();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  const onReadNotice = (notificationId: string) => {
    return async () => {
      try {
        await markAsRead({
          notificationId,
          onError: (err) => {
            console.error('Failed to mark notification as read:', err);
          },
        });
      } catch (err) {
        console.error('Failed to mark notification as read:', err);
        throw err;
      }
    };
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        loadMore();
      }
    },
    [hasNextPage, loadMore],
  );

  useEffect(() => {
    const element = loadMoreTriggerRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: scrollContainerRef.current,
      rootMargin: '100px',
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return (
    <div className="relative">
      {/* 알림 목록 */}
      <div
        ref={scrollContainerRef}
        className="my-[12px] max-h-[500px] overflow-y-auto overflow-x-hidden pr-[10px] custom-brand-scroll"
      >
        {notices && notices.length > 0 ? (
          <>
            {notices.map((item, index) => (
              <AlarmItem
                key={item.id || index}
                news={item}
                onReadNotice={onReadNotice(item.id)}
                onClose={onClose}
                isLast={index === notices.length - 1}
              />
            ))}
            {/* 무한 스크롤 트리거 */}
            {hasNextPage && <div ref={loadMoreTriggerRef} className="h-1" />}
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[100px]">
            <div className="flex flex-col items-center">
              <Check className="mb-3" />
              <p>{t('CHECK_ALL_NOTI')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlarmPopoverContent;
