import {
  AuthType,
  useVerifyEmailVerificationCodeMutation,
} from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useEmailCodeConfirm = () => {
  const [mutation, { loading }] = useVerifyEmailVerificationCodeMutation();

  const confirmCode = async ({
    authType,
    email,
    authCode,
    onCompleted,
    onError,
  }: {
    authType: AuthType;
    email: string;
    authCode: string;
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          authType: authType,
          email: email,
          authCode: authCode,
        },
      },
      onCompleted: (data) => {
        // data parsing
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { confirmCode, loading };
};
