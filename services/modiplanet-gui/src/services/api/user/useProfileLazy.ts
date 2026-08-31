import { useProfileLazyQuery } from '@src/services/gen/gen';
import { ApolloError } from '@apollo/client';
import { parseProfileModel } from '@services/api/user/handlers';
import { ProfileModel } from '@services/client-model/user';

export const useProfileLazy = () => {
  const [query, { data, loading, error }] = useProfileLazyQuery();

  const getProfile = async ({
    onCompleted,
    onError,
  }: {
    onCompleted?: (model: ProfileModel) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await query({
      onCompleted: (data) => {
        const profileModel = parseProfileModel(data.profile);
        onCompleted && onCompleted(profileModel);
      },
      onError: (err) => {
        onError && onError(err);
      },
    });
  };

  return {
    getProfile,
    error,
    loading,
  };
};
