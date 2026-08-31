import {
  MarkNotificationAsReadInput,
  useMarkNotificationAsReadMutation,
} from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useMarkNotificationAsRead = () => {
  const [mutation, { loading, error }] = useMarkNotificationAsReadMutation();

  const markAsRead = async ({
    notificationId,
    onCompleted,
    onError,
  }: {
    notificationId: string;
    onError?: (err: ApolloError) => void;
    onCompleted?: () => void;
  }) => {
    await mutation({
      variables: {
        input: {
          notificationId,
        },
      },
      refetchQueries: ['NotificationConnection', 'NotificationUnreadCount'],
      onError,
      onCompleted,
    });
  };

  return {
    markAsRead,
    loading,
    error,
  };
};
