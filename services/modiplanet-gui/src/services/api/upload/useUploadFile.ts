export const useUploadFile = () => {
  const uploadFile = async ({
    url,
    file,
    userId,
    onError,
    onCompleted,
  }: {
    file: File;
    url: string;
    userId: string;
    onCompleted?: (result: { fileName: string; fileUrl: string }) => void;
    onError?: (err: any) => void;
  }): Promise<{ fileName: string; fileUrl: string }> => {
    return new Promise(async (resolve, reject) => {
      try {
        const headers: Record<string, string> = {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read',
          'x-amz-meta-userno': userId,
        };
        const res = await fetch(url, {
          method: 'PUT',
          headers: headers,
          body: file,
        });
        const fileUrl = res.url.split('?')[0];

        const result = {
          fileName: file.name,
          fileUrl: fileUrl,
        };
        onCompleted && onCompleted(result);

        resolve(result);
      } catch (err) {
        onError && onError(err);
        reject(err);
      }
    });
  };

  return {
    uploadFile,
  };
};
