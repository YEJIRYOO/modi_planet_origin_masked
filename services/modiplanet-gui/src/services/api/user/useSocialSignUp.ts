import { SocialSignUpInput, useSocialSignUpMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export type socialSignUpArg = {
  input: SocialSignUpInput;
  onCompleted?: (model: any) => void;
  onError?: (err: ApolloError) => void;
};

export const useSocialSignUp = () => {
  const [mutation, { error, loading }] = useSocialSignUpMutation();

  const socialSignUp = async ({
    input,
    onCompleted,
    onError,
  }: socialSignUpArg) => {
    await mutation({
      variables: {
        input: { ...input },
      },
      onCompleted: onCompleted,
      onError: onError,
    });
  };

  return {
    socialSignUp,
    error,
    loading,
  };
};
