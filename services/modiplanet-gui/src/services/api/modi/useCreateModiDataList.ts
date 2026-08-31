import { useCreateModiDataListMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useCreateModidataList = () => {
  const [mutation, { loading }] = useCreateModiDataListMutation();

  const createModiDataList = async ({
    dataList,
    onCompleted,
    onError,
  }: {
    dataList: {
      name: string;
      moduleType: string;
      functionType: string;
      data: string;
    }[];
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    const modiDataList = dataList.map((item) => ({
      ...item,
      name: item.name.endsWith('.modi') ? item.name : `${item.name}.modi`,
    }));

    await mutation({
      variables: {
        input: {
          modiDataList,
        },
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { createModiDataList, loading };
};
