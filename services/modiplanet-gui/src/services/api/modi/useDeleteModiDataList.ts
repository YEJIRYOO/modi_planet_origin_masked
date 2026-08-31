import { useDeleteModiDataListMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useDeleteModidataList = () => {
  const [mutation, { loading }] = useDeleteModiDataListMutation();

  const deleteModiDataList = async ({
    ids,
    onCompleted,
    onError,
  }: {
    ids: string[];
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          ids,
        },
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { deleteModiDataList, loading };
};
