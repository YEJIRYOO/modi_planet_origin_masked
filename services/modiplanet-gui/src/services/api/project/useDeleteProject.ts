import { useDeleteProjectMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useDeleteProject = () => {
  const [mutation, { loading }] = useDeleteProjectMutation();

  const deleteProject = async ({
    id,
    onCompleted,
    onError,
  }: {
    id: string;
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          id,
        },
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { deleteProject, loading };
};
