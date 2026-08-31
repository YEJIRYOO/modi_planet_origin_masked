import { TokenExchangeInput } from '@src/services/gen/gen';
import { useTokenExchangeMutation } from '@src/services/gen/gen';

export const useTokenExchange = () => {
  const [mutation, { loading }] = useTokenExchangeMutation();

  const tokenExchange = async ({
    input,
    onComplete,
    onError,
  }: {
    input: TokenExchangeInput;
    onComplete?: (data: any) => void;
    onError?: (error: any) => void;
  }) => {
    await mutation({
      variables: {
        input: { ...input },
      },
      onCompleted: onComplete,
      onError: onError,
    });
  };

  return { tokenExchange, loading };
};
