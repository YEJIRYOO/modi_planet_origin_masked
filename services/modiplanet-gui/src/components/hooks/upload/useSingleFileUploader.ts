import { usePresignedUrlLazy } from '@services/api/upload/usePresignedUrlLazy';
import { useUploadFile } from '@services/api/upload/useUploadFile';
import { useState } from 'react';

export const useSingleFileUploader = () => {
  const { getPresignedUrl } = usePresignedUrlLazy();
  const { uploadFile } = useUploadFile();
  const [loading, setLoading] = useState(false);

  const onUploadSingleFile = async ({
    file,
    userId,
    onError,
    onCompleted,
  }: {
    file: File;
    userId: string;
    onCompleted?: (result: { fileName: string; fileUrl: string }) => void;
    onError?: (err: any) => void;
  }) => {
    setLoading(true);
    try {
      const url = await getPresignedUrl({
        fileName: file.name,
        fileType: file.type,
        onError,
      });

      await uploadFile({
        file: file,
        url: url,
        userId: userId,
        onCompleted: (result) => {
          onCompleted && onCompleted(result);
        },
        onError,
      });
    } catch (e) {
      onError && onError(e);
    } finally {
      setLoading(false);
    }
  };

  return { onUploadSingleFile, loading };
};
