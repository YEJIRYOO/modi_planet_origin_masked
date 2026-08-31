import { useUpdateModiDataMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useUpdateModidata = () => {
  const [mutation, { loading }] = useUpdateModiDataMutation();

  const updateModiData = async ({
    id,
    name,
    onCompleted,
    onError,
  }: {
    id: string;
    name: string;
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          id,
          name,
        },
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { updateModiData, loading };
};
