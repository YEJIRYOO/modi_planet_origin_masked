import React, { useState, useEffect } from 'react';

import AlarmPopoverContent from '@src/components/ui_old/header/component/AlarmPopover/AlarmPopoverContent';

import Alarm from '@src/lib/newAssets/alarm.svg?react';
import { Close } from '@lib/newAssets';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { useProfileStore } from '@src/store/zustand';
import { useNotificationList } from '@services/api/support/useNotificationList';
import { useNotificationUnreadCount } from '@services/api/support/useNotificationUnreadCount';
import { useTokenInit } from '@src/services/api/user/useTokenInit';

export function AlarmPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const profile = useProfileStore((state) => state.profile);
  const { initToken } = useTokenInit();

  const { unreadCount, refetch: refetchUnreadCount } =
    useNotificationUnreadCount(profile?.userId || '');

  const { notifications, subscribeToNotifications, hasNextPage, loadMore } =
    useNotificationList(refetchUnreadCount);

  // 마운트 시: subscription 전용 토큰 초기화 → subscription 시작
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    initToken().then((success) => {
      if (success) {
        unsubscribe = subscribeToNotifications();
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  const hasUnreadNoti = unreadCount > 0;

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-end"
      offset={10}
      triggerScaleOnOpen={false}
    >
      <PopoverTrigger>
        {/* 알림 아이콘 버튼 */}
        <div className="relative cursor-pointer">
          <Alarm className="w-[27px] h-[27px] fill-font-main" />

          {hasUnreadNoti && (
            <div className="absolute top-[0px] right-[0px] w-[7px] h-[7px] bg-brand rounded-full" />
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[860px] shadow-popover p-[58px_30px_30px] rounded-[20px]">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-[30px] right-[25px] p-0 hover:bg-white active:bg-white"
        >
          <Close />
        </button>

        {profile && (
          <AlarmPopoverContent
            notices={notifications}
            onClose={() => setIsOpen(false)}
            hasNextPage={hasNextPage}
            loadMore={loadMore}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}

export default AlarmPopover;
