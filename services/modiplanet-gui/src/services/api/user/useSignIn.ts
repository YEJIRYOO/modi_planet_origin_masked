import { useSignInMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useSignIn = () => {
  const [mutation, { loading }] = useSignInMutation();

  const signIn = async ({
    email,
    password,
    onCompleted,
    onError,
  }: {
    email: string;
    password: string;
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          email: email,
          password: password,
        },
      },
      onCompleted: (data) => {
        // data parsing
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { signIn, loading };
};
