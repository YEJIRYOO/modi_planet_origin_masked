import { useProjectNameExistLazyQuery } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useProjectNameExistLazy = () => {
  const [query, { data, loading, error }] = useProjectNameExistLazyQuery();

  const checkProjectNameExist = async ({
    title,
    onCompleted,
    onError,
  }: {
    title: string;
    onCompleted?: (exists: boolean) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    try {
      const res = await query({
        variables: {
          where: {
            title,
          },
        },
        onCompleted: (data) => {
          onCompleted && onCompleted(data.projectNameExist || false);
        },
        onError,
      });

      return res.data?.projectNameExist || false;
    } catch (err) {
      throw new Error('unexpected error');
    }
  };

  return {
    checkProjectNameExist,
    error,
    loading,
  };
};
