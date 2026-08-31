import { useCheckAiModelNameDuplicateLazyQuery } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useCheckAIModelNameDuplicateLazy = () => {
  const [query, { data, loading, error }] =
    useCheckAiModelNameDuplicateLazyQuery();

  const checkAIModelNameDuplicate = async ({
    name,
    onCompleted,
    onError,
  }: {
    name: string;
    onCompleted?: (exists: boolean) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    try {
      const res = await query({
        variables: {
          input: {
            name,
          },
        },
        onCompleted: (data) => {
          onCompleted && onCompleted(data.checkAIModelNameDuplicate || false);
        },
        onError: (error) => {
          console.error('Duplicate check error:', error);
          onError && onError(error);
        },
      });

      return res.data?.checkAIModelNameDuplicate || false;
    } catch (err) {
      console.error('Unexpected error in checkAIModelNameDuplicate:', err);
      throw new Error('unexpected error');
    }
  };

  return {
    checkAIModelNameDuplicate,
    error,
    loading,
  };
};
