import { Upload } from '@lib/newAssets';
import { ACCEPT_MODI_FILES_AI_UPLOAD } from '@lib/constants/etc';
import ButtonUI from '@components/ui/Button/ButtonUI';
import { useRef } from 'react';
import { Errorhandler } from '@lib/utils/error';
import { useCreateModidata } from '@services/api/modi/useCreateModiData';
import { useCreateModidataList } from '@src/services/api/modi/useCreateModiDataList';
import useTranslator from '@hooks/useTranslator';
import PostMessageSender from '@src/lib/utils/PostMessageSender';

interface ModiDataUploaderProps {
  refetch: () => void;
}

export default function ModiDataUploader({ refetch }: ModiDataUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createModiDataList, loading } = useCreateModidataList();
  const { t } = useTranslator();
  const postMessageSender = PostMessageSender.getInstance();

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files) {
      await processFiles(Array.from(files));
      setTimeout(refetch, 100);
      fileInputRef.current && (fileInputRef.current.value = '');
    }
  };

  const processFiles = async (files: File[]) => {
    const dataList = await Promise.all(
      files.map(async (file) => {
        const fileContent = await file.text();
        const jsonData = JSON.parse(fileContent);
        const { name: moduleType, function: functionType } = jsonData;
        let fileName = file.name.replace(/\.modi$/, '');

        return {
          data: fileContent,
          functionType,
          moduleType,
          name: fileName,
        };
      }),
    );

    await createModiDataList({
      dataList,
      onCompleted: (data) => {
        console.log('Mutation 완료:', data);
      },
      onError: (error) => {
        const err = new Errorhandler(error);
        err.getCodes().forEach((e) => {
          if (e === 2000) {
            postMessageSender.sendModiDataRecordResponse({
              alertMessage: 'MAX_MODI_DATA_COUNT',
            });
          }
        });
        console.error('Mutation 에러:', error);
      },
    });
  };

  return (
    <ButtonUI
      color="secondary"
      onClick={handleUpload}
      className="w-[109px] p-0 flex items-center justify-center"
    >
      <Upload className="w-[20px] h-[20px] [&_path]:stroke-white"></Upload>
      <div className="p5-sb text-white">{t('UPLOADING')}</div>
      <input
        className="hidden"
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={ACCEPT_MODI_FILES_AI_UPLOAD}
      />
    </ButtonUI>
  );
}
