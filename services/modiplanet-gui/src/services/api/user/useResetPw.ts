import { useResetPasswordMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useResetPw = () => {
  const [mutation, { error }] = useResetPasswordMutation();

  const onResetPw = async ({
    authCode,
    email,
    pw,
    onCompleted,
    onError,
  }: {
    authCode: string;
    email: string;
    pw: string;
    onCompleted?: () => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          authCode: authCode,
          email: email,
          newPassword: pw,
        },
      },
      onCompleted: onCompleted,
      onError: onError,
    });
  };

  return {
    onResetPw,
    error,
  };
};
