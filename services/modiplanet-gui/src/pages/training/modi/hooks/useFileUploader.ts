import { useState } from 'react';
import { validateFileSize } from '@src/lib/utils/utils';
import { useProfileStore } from '@src/store/zustand';
import { ModiRecordedData } from '@src/lib/types/modi-data';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
const MAX_FILE_COUNT = 10;

interface UseFileUploaderOptions {
  onInvalidFile: () => void;
}

export const useFileUploader = ({ onInvalidFile }: UseFileUploaderOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const profile = useProfileStore((state) => state.profile);

  const uploadFiles = async (
    files: File[],
    addModiData: (data: ModiRecordedData[]) => void,
    onCompleted?: () => void,
  ) => {
    try {
      if (files.length === 0 || !profile?.userId) return;
      setIsLoading(true);
      const fileArray: File[] = Array.from(files);

      const processedFiles = await Promise.all(
        fileArray.map(
          (file) =>
            new Promise<ModiRecordedData>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                try {
                  const parsedData = JSON.parse(reader.result as string);
                  resolve(parsedData);
                } catch (error) {
                  reject(error);
                }
              };
              reader.onerror = reject;
              reader.readAsText(file);
            }),
        ),
      );

      addModiData(processedFiles);

      if (onCompleted) onCompleted();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    addModiData: (data: ModiRecordedData[]) => void,
    onCompleted?: () => void,
  ) => {
    try {
      const files = event.target.files;

      if (!files) return;

      const newSelectedFiles: File[] = Array.from(files);

      for (const file of newSelectedFiles) {
        if (!file.name.endsWith('.modi')) {
          onInvalidFile();
          return;
        }
      }

      validateFileSize(files, MAX_FILE_SIZE);

      uploadFiles(
        newSelectedFiles.slice(0, MAX_FILE_COUNT),
        addModiData,
        onCompleted,
      );
    } catch (err) {
      onInvalidFile();
    }
  };

  return { isLoading, handleFileChange };
};
