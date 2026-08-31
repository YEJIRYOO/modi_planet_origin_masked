import { useUnregisterMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useWithdrawal = () => {
  const [mutation, { loading }] = useUnregisterMutation();

  const withdrawal = async ({
    password,
    reason,
    onCompleted,
    onError,
  }: {
    password?: string;
    reason: string[];
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          password,
          reason,
        },
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { withdrawal, loading };
};
