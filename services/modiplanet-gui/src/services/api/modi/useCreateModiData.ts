import { useCreateModiDataMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useCreateModidata = () => {
  const [mutation, { loading }] = useCreateModiDataMutation();

  const createModiData = async ({
    data,
    functionType,
    moduleType,
    name,
    onCompleted,
    onError,
  }: {
    data: string;
    functionType: string;
    moduleType: string;
    name: string;
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    if (!name.endsWith('.modi')) {
      name += '.modi';
    }

    await mutation({
      variables: {
        input: {
          data,
          functionType,
          moduleType,
          name,
        },
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { createModiData, loading };
};
