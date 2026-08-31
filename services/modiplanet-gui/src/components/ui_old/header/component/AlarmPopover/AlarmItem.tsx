import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Button } from '@nextui-org/react';
import Check from '@src/lib/assets/noti-check.svg?react';

import { localizeUTC } from '@src/lib/utils/utils';
import { AlarmItemLayout } from './AlarmItemLayout';

import { NotificationState } from '@services/gen/gen';
import useTranslator from '@hooks/useTranslator';
import ButtonUI from '@src/components/ui/Button/ButtonUI';

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

interface AlarmItemProps {
  news: {
    id: string;
    title?: string | null;
    description?: string | null;
    iconUrl?: string | null;
    webLinkPath?: string | null;
    state: NotificationState;
    type?: string | null;
    createdAt?: string | null;
  };
  onReadNotice: () => Promise<void>;
  onClose: () => void;
  isLast?: boolean;
}

export function AlarmItem({
  news,
  onReadNotice,
  onClose,
  isLast,
}: AlarmItemProps) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslator();

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
        navigate(news.webLinkPath);
        onClose();
      }
    } catch (err) {}
  };

  return (
    <AlarmItemLayout isLast={isLast}>
      <Fragment>
        <div className="flex justify-between gap-6">
          <div className="w-[680px] min-w-0">
            {localizedTitle && (
              <div className="flex gap-3 mb-[10px]">
                <div className="flex items-center gap-3 flex-1 min-w-0">
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
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span
                      className={`p4-b overflow-hidden max-h-[3em] leading-[1.5em] block break-all ${
                        isRead ? 'text-form-gray' : ''
                      }`}
                    >
                      {localizedTitle}
                    </span>
                    <span className="text-font-sub_2 p6-r shrink-0 leading-[1.5em]">
                      {localizeUTC(news.createdAt, 'YY.MM.DD')}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="p4-r pl-[44px]">
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
              <div className="w-[80px] flex items-center justify-center">
                <Check width={46} height={46} />
              </div>
            ) : news.webLinkPath ? (
              <ButtonUI
                className="w-[80px]"
                color="primary"
                size="md"
                onClick={handleButtonClick}
              >
                {t('MOVE')}
              </ButtonUI>
            ) : (
              <ButtonUI
                className="w-[80px]"
                color="primary"
                size="md"
                onClick={handleButtonClick}
              >
                {t('OK')}
              </ButtonUI>
            )}
          </div>
        </div>
      </Fragment>
    </AlarmItemLayout>
  );
}

export default AlarmItem;
