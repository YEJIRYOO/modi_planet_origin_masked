import { useSessionOnetimeCodeMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useSessionOnetimeCode = () => {
  const [mutation, { loading }] = useSessionOnetimeCodeMutation();

  const sessionOnetimeCode = async ({
    onCompleted,
    onError,
  }: {
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {},
      },
      onCompleted: (data) => {
        // data parsing
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { sessionOnetimeCode, loading };
};
