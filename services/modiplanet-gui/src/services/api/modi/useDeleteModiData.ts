import { useDeleteModiDataMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useDeleteModidata = () => {
  const [mutation, { loading }] = useDeleteModiDataMutation();

  const deleteModiData = async ({
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

  return { deleteModiDataMutation: deleteModiData, loading };
};
