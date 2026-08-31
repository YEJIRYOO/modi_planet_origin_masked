import { SignUpInput, useSignUpMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export type emailSignUpArg = {
  input: SignUpInput;
  onCompleted?: (model: any) => void;
  onError?: (err: ApolloError) => void;
};

export const useSignUp = () => {
  const [mutation, { loading }] = useSignUpMutation();

  const emailSignUp = async ({
    input,
    onCompleted,
    onError,
  }: emailSignUpArg) => {
    await mutation({
      variables: {
        input: {
          ...input,
        },
      },
      onCompleted: (data) => {
        // data parsing
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { emailSignUp, loading };
};
