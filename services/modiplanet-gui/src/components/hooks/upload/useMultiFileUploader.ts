import { useUploadFile } from '@services/api/upload/useUploadFile';
import { usePresignedMultiUrlLazy } from '@services/api/upload/usePresignedMultiUrlLazy';

export const useMultiFileUploader = () => {
  const { uploadFile } = useUploadFile();
  const { getPresignedUrls } = usePresignedMultiUrlLazy();

  const onUploadMultiFile = async ({
    files,
    userId,
    onError,
    onCompleted,
  }: {
    files: File[];
    userId: string;
    onCompleted: (result: { fileName: string; fileUrl: string }) => void;
    onError: (err: any) => void;
  }) => {
    try {
      const params = files.map((file) => ({
        fileName: file.name,
        fileType: file.type,
      }));

      const urls = await getPresignedUrls({
        params: params,
        onError,
      });

      await Promise.all(
        files.map((file, index) => {
          uploadFile({
            file: file,
            url: urls[index],
            userId: userId,
            onCompleted: (result) => {
              onCompleted(result);
            },
            onError,
          });
        }),
      );
    } catch (err) {
      onError && onError(err);
    }
  };

  return { onUploadMultiFile };
};
