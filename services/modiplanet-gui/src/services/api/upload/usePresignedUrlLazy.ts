import { usePresignedUrlForFileUploadLazyQuery } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const usePresignedUrlLazy = () => {
  const [query, { error, loading }] = usePresignedUrlForFileUploadLazyQuery();

  const getPresignedUrl = async ({
    fileName,
    fileType,
    onError,
    onCompleted,
  }: {
    fileName: string;
    fileType: string;
    onCompleted?: (url: string) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    try {
      const res = await query({
        variables: {
          fileName,
          fileType,
        },
        onCompleted: (res) => {
          onCompleted && onCompleted(res.presignedUrlForFileUpload?.url || '');
        },
        onError,
      });

      return res.data?.presignedUrlForFileUpload?.url || '';
    } catch (err) {
      throw new Error('unexpected error');
    }
  };

  return {
    getPresignedUrl,
    error,
    loading,
  };
};
