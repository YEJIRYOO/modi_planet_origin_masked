import { useConfirmProtectorEmailChangeMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';
import { parseProtectorModel } from './handlers';

export const useConfirmProtectorEmailChange = () => {
  const [mutation, { loading }] = useConfirmProtectorEmailChangeMutation();

  const confirmProtectorEmailChange = async ({
    newEmail,
    authCode,
    onCompleted,
    onError,
  }: {
    newEmail: string;
    authCode: string;
    onCompleted?: (protector: ReturnType<typeof parseProtectorModel>) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          newEmail,
          authCode,
        },
      },
      onCompleted: (data) => {
        const protectorModel = parseProtectorModel(data.confirmProtectorEmailChange);
        onCompleted && onCompleted(protectorModel);
      },
      onError,
    });
  };

  return { confirmProtectorEmailChange, loading };
};
