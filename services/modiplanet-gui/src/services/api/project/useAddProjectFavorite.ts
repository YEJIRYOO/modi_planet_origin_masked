import { useAddProjectFavoriteMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useAddProjectFavorite = () => {
  const [mutation, { loading }] = useAddProjectFavoriteMutation();

  const addProjectFavorite = async ({
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

  return { addProjectFavorite, loading };
};
