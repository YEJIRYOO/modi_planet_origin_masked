import { useSignOut } from '@services/api';
import { ApolloError } from '@apollo/client';
import { useProfileStore } from '@src/store/zustand';

export const useSignOutController = () => {
  const { signOut, loading } = useSignOut();
  const clearProfile = useProfileStore((state) => state.clearProfile);

  const onSignOut = async ({
    onCompleted,
    onError,
  }: {
    onCompleted?: () => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await signOut({
      onCompleted: () => {
        clearProfile();
        onCompleted && onCompleted();
      },
      onError: onError,
    });
  };

  return {
    onSignOut,
    loading,
  };
};
