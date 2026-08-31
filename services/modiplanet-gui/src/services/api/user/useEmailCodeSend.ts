import {
  AuthType,
  useSendEmailVerificationCodeMutation,
} from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useEmailCodeSend = () => {
  const [mutation, { loading }] = useSendEmailVerificationCodeMutation();

  const sendEmail = async ({
    authType,
    email,
    onCompleted,
    onError,
  }: {
    authType: AuthType;
    email: string;
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          authType: authType,
          email: email,
        },
      },
      onCompleted: (data) => {
        // data parsing
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { sendEmail, loading };
};
