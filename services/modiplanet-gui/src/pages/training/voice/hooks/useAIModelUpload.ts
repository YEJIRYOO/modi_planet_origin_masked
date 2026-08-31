import {
  UploadFileType,
  useMultiUploadFileMutation,
} from '@services/old/generated/graphql';

const useAIModelUpload = () => {
  const [fileUpload] = useMultiUploadFileMutation();

  const uploadAIModel = async (files: File[]) => {
    try {
      const { data } = await fileUpload({
        variables: {
          input: {
            functionType: UploadFileType.Data,
            files: [...files],
          },
        },
      });

      if (!data) {
        throw Error();
      }

      return data.multiUploadFile;
    } catch (err) {
      console.log('@@upload AI model error', err);
      throw Error();
    }
  };

  return {
    uploadAIModel,
  };
};

export default useAIModelUpload;
