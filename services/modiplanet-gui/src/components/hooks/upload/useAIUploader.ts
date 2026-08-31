import { usePresignedUrlLazy } from '@services/api/upload/usePresignedUrlLazy';
import { useUploadFile } from '@services/api/upload/useUploadFile';

export const useAIUploader = () => {
  const { getPresignedUrl } = usePresignedUrlLazy();
  const { uploadFile } = useUploadFile();

  const uploadAIFile = async ({
    file,
    userId,
  }: {
    file: File;
    userId: string;
  }): Promise<{ fileName: string; fileUrl: string }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = await getPresignedUrl({
          fileName: file.name,
          fileType: file.type,
        });

        const fileUrl = await uploadFile({
          file: file,
          url: url || '',
          userId: userId,
        });

        resolve(fileUrl);
      } catch (e) {
        reject(e);
      }
    });
  };

  return {
    uploadAIFile,
  };
};
