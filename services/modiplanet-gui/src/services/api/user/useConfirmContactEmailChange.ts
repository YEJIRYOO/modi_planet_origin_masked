import { useConfirmContactEmailChangeMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';
import { parseProfileModel } from './handlers';
import { ProfileModel } from '@services/client-model/user';

export const useConfirmContactEmailChange = () => {
  const [mutation, { loading }] = useConfirmContactEmailChangeMutation();

  const confirmContactEmailChange = async ({
    newEmail,
    authCode,
    onCompleted,
    onError,
  }: {
    newEmail: string;
    authCode: string;
    onCompleted?: (model: ProfileModel) => void;
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
        const profileModel = parseProfileModel(data.confirmContactEmailChange);
        onCompleted && onCompleted(profileModel);
      },
      onError,
    });
  };

  return { confirmContactEmailChange, loading };
};
