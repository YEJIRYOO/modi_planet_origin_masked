import { useSignOutMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useSignOut = () => {
  const [mutation, loading] = useSignOutMutation();

  const signOut = async ({
    onCompleted,
    onError,
  }: {
    onCompleted?: () => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      onCompleted,
      onError,
    });
  };

  return {
    signOut,
    loading,
  };
};
