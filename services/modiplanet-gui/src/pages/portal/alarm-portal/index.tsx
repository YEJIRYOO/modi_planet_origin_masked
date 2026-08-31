import React, { useRef, useCallback, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Divider } from '@nextui-org/react';

import Check from '@src/lib/assets/noti-check.svg?react';
import useTranslator from '@hooks/useTranslator';
import { useNotificationList } from '@services/api/support/useNotificationList';
import { useMarkNotificationAsRead } from '@services/api/support/useMarkNotificationAsRead';
import { NotificationState } from '@services/gen/gen';
import { localizeUTC } from '@src/lib/utils/utils';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import PostMessageSender from '@src/lib/utils/PostMessageSender';
import { useQs } from '@hooks/useQs';
import i18n from '@lib/i18n';
import { LocaleHandler } from '@lib/utils/locale';

interface Notification {
  id: string;
  userId?: string | null;
  profileId?: string | null;
  title?: string | null;
  description: string;
  webLinkPath?: string | null;
  iconUrl?: string | null;
  state: NotificationState;
  uiType?: string | null;
  type?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

const parseLocalizedText = (
  text: string | null | undefined,
  locale: string,
): string => {
  if (!text) return '';

  try {
    const parsed = JSON.parse(text);
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed[locale] || parsed['en'] || parsed['ko'] || '';
    }

    return text;
  } catch (e) {
    return text;
  }
};

// AlarmItemLayout 컴포넌트
function AlarmItemLayout({
  children,
  isLast,
}: {
  children: JSX.Element | null;
  isLast?: boolean;
}) {
  return (
    <>
      <div className="w-full flex items-start duration-200 rounded-8">
        {children}
      </div>
      {!isLast && <Divider className="my-[20px]" />}
    </>
  );
}

// AlarmItem 컴포넌트
interface AlarmItemProps {
  news: Notification;
  onReadNotice: () => Promise<void>;
  isLast?: boolean;
}

function AlarmItem({ news, onReadNotice, isLast }: AlarmItemProps) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslator();
  const postMessageSender = PostMessageSender.getInstance();

  const isRead = news.state === NotificationState.Read;

  const localizedTitle = parseLocalizedText(news.title, i18n.language);
  const localizedDescription = parseLocalizedText(
    news.description,
    i18n.language,
  );

  // 아이콘 결정 로직
  const getIconUrl = () => {
    if (news.iconUrl) return news.iconUrl;

    switch (news.type) {
      case 'ANNOUNCEMENT':
        return '/assets/alarm/notice.svg';
      case 'INQUIRY_REPLY':
        return '/assets/alarm/contact.svg';
      default:
        return '/assets/alarm/notice.svg';
    }
  };

  const handleButtonClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await onReadNotice();
      if (news.webLinkPath) {
        postMessageSender.sendNotificationClickEvent({
          webLinkPath: news.webLinkPath,
        });
      } else {
        postMessageSender.sendNotificationClickEvent();
      }
    } catch (err) {
      console.error('Failed to handle notification:', err);
    }
  };

  return (
    <AlarmItemLayout isLast={isLast}>
      <Fragment>
        <div className="flex justify-between gap-[24px]">
          <div className="w-[680px] min-w-0">
            {localizedTitle && (
              <div className="flex gap-[12px] mb-[10px]">
                <div className="flex items-center gap-[12px] flex-1 min-w-0">
                  <div
                    className={`shrink-0 w-[32px] h-[32px] overflow-hidden rounded-full bg-form-bg flex-center ${
                      isRead ? 'opacity-20' : ''
                    }`}
                  >
                    <img
                      className="w-full h-full"
                      alt="icon"
                      src={getIconUrl()}
                    />
                  </div>
                  <div className="flex items-start gap-[12px] flex-1 min-w-0">
                    <span
                      className={`text-[16px] font-bold overflow-hidden max-h-[3em] leading-[1.5em] block ${
                        isRead ? 'text-form-gray' : ''
                      }`}
                    >
                      {localizedTitle}
                    </span>
                    <span className="text-font-sub_2 text-[14px] font-regular shrink-0 leading-[1.5em]">
                      {localizeUTC(news.createdAt, 'YY.MM.DD')}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="text-[16px] font-regular pl-[44px]">
              <div
                className={`whitespace-pre-line break-words ${
                  isRead ? 'text-form-gray' : ''
                }`}
              >
                {ReactHtmlParser(localizedDescription)}
              </div>
            </div>
          </div>

          <div className="shrink-0">
            {isRead ? (
              <div className="w-[80px] h-[46px] flex items-center justify-center">
                <Check width={46} height={46} />
              </div>
            ) : news.webLinkPath ? (
              <ButtonUI
                className="w-[80px] !h-[46px]"
                color="primary"
                size="md"
                onClick={handleButtonClick}
              >
                <span className="text-[14px] font-semibold">{t('MOVE')}</span>
              </ButtonUI>
            ) : (
              <ButtonUI
                className="w-[80px] !h-[46px]"
                color="primary"
                size="md"
                onClick={handleButtonClick}
              >
                <span className="text-[14px] font-semibold">{t('OK')}</span>
              </ButtonUI>
            )}
          </div>
        </div>
      </Fragment>
    </AlarmItemLayout>
  );
}

// 메인 AlarmPortalPage 컴포넌트
function AlarmPortalPage() {
  const { t } = useTranslator();
  const { markAsRead } = useMarkNotificationAsRead();
  const {
    path: { locale },
  } = useQs();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    hasNextPage,
    loadMore,
    error,
    loading,
    subscribeToNotifications,
  } = useNotificationList();

  // Locale 설정
  useEffect(() => {
    if (locale) {
      LocaleHandler.applyLocale(i18n, locale);
      LocaleHandler.cleanLocaleFromUrl();
    }
  }, [locale]);

  // 웹소켓 subscription 설정
  useEffect(() => {
    const unsubscribe = subscribeToNotifications();
    return () => {
      unsubscribe();
    };
  }, [subscribeToNotifications]);

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

  // 무한 스크롤 옵저버 설정
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
    <div className="w-[800px] h-[524px]">
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto overflow-x-hidden pr-[10px] custom-brand-scroll"
      >
        {error ? null : notifications && notifications.length > 0 ? (
          <>
            {notifications.map((item, index) => (
              <AlarmItem
                key={item.id || index}
                news={item as Notification}
                onReadNotice={onReadNotice(item.id)}
                isLast={index === notifications.length - 1}
              />
            ))}
            {/* 무한 스크롤 트리거 */}
            {hasNextPage && <div ref={loadMoreTriggerRef} className="h-1" />}
          </>
        ) : !loading ? (
          <div className="flex items-center justify-center min-h-[100px]">
            <div className="flex flex-col items-center">
              <Check className="mb-3" />
              <p>{t('CHECK_ALL_NOTI')}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AlarmPortalPage;
