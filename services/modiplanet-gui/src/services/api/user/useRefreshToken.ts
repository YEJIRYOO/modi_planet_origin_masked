import { RefreshTokenInput } from '@src/services/gen/gen';
import { useRefreshTokenMutation } from '@src/services/gen/gen';

export const useRefreshToken = () => {
  const [mutation, { loading }] = useRefreshTokenMutation();

  const refreshToken = async ({
    input,
    onComplete,
    onError,
  }: {
    input: RefreshTokenInput;
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

  return { refreshToken, loading };
};
