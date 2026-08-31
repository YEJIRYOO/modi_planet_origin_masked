import { Upload } from '@lib/newAssets';
import ButtonUI from '@components/ui/Button/ButtonUI';
import { useRef } from 'react';
import { Errorhandler } from '@lib/utils/error';
import { useCreateProject } from '@services/api/project/useCreateProject';
import {
  ProjectRunType,
  ProjectCodeType,
  ProjectCreateType,
} from '@services/gen/gen';
import { useUser } from '@services/api';
import useTranslator from '@hooks/useTranslator';
import { useDisclosure } from '@nextui-org/react';
import MaxLimitExceedModal from '../MaxLimitExceedModal';
import { showToast } from '@components/ui_old/toast';

interface ProjectUploaderProps {
  refetch: () => void;
}

export default function ProjectUploader({ refetch }: ProjectUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createProject, loading } = useCreateProject();
  const { user } = useUser();
  const { t } = useTranslator();
  const {
    isOpen: isMaxLimitModalOpen,
    onOpen: onMaxLimitModalOpen,
    onClose: onMaxLimitModalClose,
  } = useDisclosure();

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && user?.id) {
      await processFiles(Array.from(files));
      setTimeout(refetch, 100);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const processFiles = async (files: File[]) => {
    for (const file of files) {
      try {
        const fileContent = await file.text();
        const fileName = file.name.replace(/\.(bk|abk)$/, '');
        const extension = file.name.split('.').pop()?.toLowerCase();

        const runType =
          extension === 'bk' ? ProjectRunType.Upload : ProjectRunType.Realtime;

        await createProject({
          title: fileName,
          runType: runType,
          jsonData: fileContent,
          createType: ProjectCreateType.Upload,
          onCompleted: () => {
            refetch();
          },
          onError: (error) => {
            const errorMessage = error?.graphQLErrors?.[0]?.message;
            let errorData: { statusCode?: number; errorCode?: number } = {};
            try {
              errorData = JSON.parse(errorMessage || '{}');
            } catch {
              errorData = {};
            }
            const statusCode = errorData?.statusCode;
            const errorCode = errorData?.errorCode;

            if (errorCode === 40012) {
              onMaxLimitModalOpen();
            } else {
              showToast(t('SAVE_PROJECT_ERROR', { CODE: statusCode || 'UNKNOWN' }));
            }
            const err = new Errorhandler(error);
          },
        });
      } catch (error) {
        console.error('파일 처리 에러:', error);
      }
    }
  };

  return (
    <>
      <ButtonUI
        color="secondary"
        onClick={handleUpload}
        disabled={loading || !user?.id}
        className="p-3 flex items-center justify-center"
      >
        <Upload className="sm:hidden w-[20px] h-[20px] [&_path]:stroke-white"></Upload>
        <div className="p5-sb text-white">{t('PROJECT_UPLOAD')}</div>
        <input
          className="hidden"
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".bk,.abk"
        />
      </ButtonUI>

      <MaxLimitExceedModal
        isOpen={isMaxLimitModalOpen}
        onClose={onMaxLimitModalClose}
      />
    </>
  );
}
