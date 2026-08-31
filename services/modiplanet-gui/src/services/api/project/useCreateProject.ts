import {
  ImageInfoInput,
  ProjectCodeType,
  ProjectCreateType,
  ProjectRunType,
  useCreateProjectMutation,
} from '@services/gen/gen';
import { ApolloError } from '@apollo/client';
import { showToast } from '@components/ui_old/toast';
import useTranslator from '@hooks/useTranslator';

export const useCreateProject = () => {
  const [mutation, { loading }] = useCreateProjectMutation();
  const { t } = useTranslator();

  const createProject = async ({
    title,
    thumb,
    runType,
    jsonData,
    createType,
    codeType = ProjectCodeType.Scratch,
    onCompleted,
    onError,
  }: {
    title: string;
    thumb?: ImageInfoInput;
    runType: ProjectRunType;
    jsonData: string;
    createType: ProjectCreateType;
    codeType?: ProjectCodeType;
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          title,
          thumb,
          runType,
          jsonData,
          createType,
          codeType,
        },
      },
      onCompleted: (data) => {
        const infoCode = data?.createProject?.infoCode;
        if (infoCode === 40011) {
          showToast(t('PROJECT_AUTO_RENAME_GUIDE'));
        }
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { createProject, loading };
};
