import {
  useNotificationConnectionQuery,
  NotificationAddedDocument,
  NotificationAddedSubscription,
  NotificationAddedSubscriptionVariables,
  NotificationUiType,
  DeviceType,
} from '@services/gen/gen';
import { useMemo, useCallback } from 'react';

export const useNotificationList = (onNotificationAdded?: () => void) => {
  const { data, subscribeToMore, error, loading, fetchMore } =
    useNotificationConnectionQuery({
      variables: {
        input: {
          first: 20,
          where: {
            uiType: NotificationUiType.Noti,
            deviceTypes: [DeviceType.Web],
          },
        },
      },
      fetchPolicy: 'cache-and-network',
    });

  const notifications = useMemo(() => {
    if (data) {
      return data.notificationConnection.nodes;
    } else {
      return null;
    }
  }, [data]);

  const totalCount = useMemo(() => {
    return data ? data.notificationConnection.totalCount : 0;
  }, [data]);

  const pageInfo = useMemo(() => {
    return data?.notificationConnection.pageInfo;
  }, [data]);

  const hasNextPage = useMemo(() => {
    return pageInfo?.hasNextPage ?? false;
  }, [pageInfo]);

  const loadMore = useCallback(() => {
    if (!hasNextPage || !pageInfo?.endCursor) return;

    fetchMore({
      variables: {
        input: {
          first: 20,
          after: pageInfo.endCursor,
          where: {
            uiType: NotificationUiType.Noti,
            deviceTypes: [DeviceType.Web],
          },
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          notificationConnection: {
            ...fetchMoreResult.notificationConnection,
            nodes: [
              ...prev.notificationConnection.nodes,
              ...fetchMoreResult.notificationConnection.nodes,
            ],
          },
        };
      },
    });
  }, [hasNextPage, pageInfo, fetchMore]);

  const subscribeToNotifications = useCallback(() => {
    try {
      return subscribeToMore<
        NotificationAddedSubscription,
        NotificationAddedSubscriptionVariables
      >({
        document: NotificationAddedDocument,
        variables: {},
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const {
            data: { notificationAdded },
          } = subscriptionData;

          // 중복 체크: 이미 존재하는 알림이면 추가하지 않음
          const isDuplicate = prev.notificationConnection.nodes.some(
            (node: any) => node.id === notificationAdded.id,
          );

          if (isDuplicate) {
            return prev;
          }

          // 새 알림이 추가되었을 때 콜백 호출
          if (onNotificationAdded) {
            onNotificationAdded();
          }

          return Object.assign({}, prev, {
            notificationConnection: {
              ...prev.notificationConnection,
              nodes: [notificationAdded, ...prev.notificationConnection.nodes],
              totalCount: prev.notificationConnection.totalCount + 1,
            },
          });
        },
        onError: () => {
          // Subscription failed, will use polling instead
        },
      });
    } catch {
      return () => {};
    }
  }, [subscribeToMore, onNotificationAdded]);

  return {
    notifications,
    totalCount,
    error,
    loading,
    hasNextPage,
    loadMore,
    subscribeToNotifications,
  };
};
