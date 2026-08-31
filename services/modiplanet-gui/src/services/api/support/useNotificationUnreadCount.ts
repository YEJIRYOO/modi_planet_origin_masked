import { useNotificationUnreadCountQuery, DeviceType } from '@services/gen/gen';
import { useMemo } from 'react';

export const useNotificationUnreadCount = (userId: string) => {
  const { data, error, loading, refetch } = useNotificationUnreadCountQuery({
    variables: {
      deviceTypes: [DeviceType.Web],
    },
    fetchPolicy: 'cache-and-network',
    skip: !userId,
  });

  const unreadCount = useMemo(() => {
    return data?.notificationUnreadCount ?? 0;
  }, [data]);

  return {
    unreadCount,
    error,
    loading,
    refetch,
  };
};
