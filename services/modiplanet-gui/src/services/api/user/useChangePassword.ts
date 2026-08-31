import { useChangePasswordMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useChangePassword = () => {
  const [mutation, { loading }] = useChangePasswordMutation();

  const changePassword = async ({
    currentPassword,
    newPassword,
    onCompleted,
    onError,
  }: {
    currentPassword: string;
    newPassword: string;
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
      },
      onCompleted: (data) => {
        // data parsing
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { changePassword, loading };
};
