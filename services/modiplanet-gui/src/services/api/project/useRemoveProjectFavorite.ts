import { useRemoveProjectFavoriteMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useRemoveProjectFavorite = () => {
  const [mutation, { loading }] = useRemoveProjectFavoriteMutation();

  const removeProjectFavorite = async ({
    projectId,
    onCompleted,
    onError,
  }: {
    projectId: string;
    onCompleted?: (data: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          projectId,
        },
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { removeProjectFavorite, loading };
};
