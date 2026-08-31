import { SignUpType, useSocialSignInMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';
import { SocialSignInRes } from '@services/api';

export const useSocialSignIn = () => {
  const [mutation, { data, error }] = useSocialSignInMutation();

  const onSocialSignIn = async ({
    socialType,
    code,
    onCompleted,
    onError,
  }: {
    socialType: SignUpType;
    code: string;
    onCompleted: (res: SocialSignInRes) => void;
    onError: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          signUpType: socialType,
          code: code,
        },
      },
      onCompleted: ({ socialSignIn }) => onCompleted(socialSignIn),
      onError,
    });
  };

  return {
    onSocialSignIn,
    error,
  };
};
