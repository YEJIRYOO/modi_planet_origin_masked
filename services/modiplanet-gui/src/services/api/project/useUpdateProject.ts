import { useUpdateProjectMutation, ProjectUpdateType } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useUpdateProject = () => {
  const [mutation, { loading }] = useUpdateProjectMutation();

  const updateProject = async ({
    id,
    title,
    updateType,
    onCompleted,
    onError,
  }: {
    id: string;
    title: string;
    updateType?: ProjectUpdateType;
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          id,
          title,
          updateType,
        },
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { updateProject, loading };
};
