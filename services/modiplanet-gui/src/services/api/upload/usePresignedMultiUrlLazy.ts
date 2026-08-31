import { usePresignedMultiUrlsForFileUploadLazyQuery } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const usePresignedMultiUrlLazy = () => {
  const [query, { error, loading }] =
    usePresignedMultiUrlsForFileUploadLazyQuery();

  const getPresignedUrls = async ({
    params,
    onError,
    onCompleted,
  }: {
    params: { fileName: string; fileType: string }[];
    onCompleted?: (urls: string[]) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    try {
      const res = await query({
        variables: {
          input: {
            params: params,
          },
        },
        onCompleted: (res) => {
          onCompleted &&
            onCompleted(res.presignedMultiUrlsForFileUpload?.urls || []);
        },
        onError,
      });

      return res.data?.presignedMultiUrlsForFileUpload?.urls || [];
    } catch (err) {
      throw new Error('unexpected error');
    }
  };

  return {
    getPresignedUrls,
    error,
    loading,
  };
};
