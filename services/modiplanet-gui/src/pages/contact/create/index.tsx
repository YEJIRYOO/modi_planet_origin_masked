import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ContactForm from '@src/pages/contact/create/ContactForm';
import { useCreateContact } from '@services/api';
import useTranslator from '@hooks/useTranslator';
import { useProfileStore } from '@src/store/zustand';
import { VALID_EXTENSION_INQUIRY_ATTACHMENT } from '@lib/constants/etc';
import { useSingleFileUploader } from '@hooks/upload/useSingleFileUploader';

export function ContactCreatePage() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState<{
    fileName: string;
    fileUrl: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { createContact } = useCreateContact();
  const { t } = useTranslator();
  const { profile } = useProfileStore();
  const { onUploadSingleFile } = useSingleFileUploader();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const { type, name, description } = data;
      await createContact({
        input: {
          subject: type,
          content: description,
          ...(uploadedFile && {
            fileList: [
              { name: uploadedFile.fileName, url: uploadedFile.fileUrl },
            ],
          }),
          title: name,
        },
        onCompleted: () => {
          navigate('/contact');
        },
        onError: () => {
          alert(t('COMMON_ERROR_MSG'));
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onUploadFiles = async (
    droppedFiles: File[] | FileList,
  ): Promise<any[] | undefined> => {
    if (!droppedFiles || !profile?.userId) return;

    const validExtensions = VALID_EXTENSION_INQUIRY_ATTACHMENT.split(', ').map(
      (ext) => ext.trim().replace('.', ''),
    );
    const selectedFile = Array.from(droppedFiles)[0];
    const fileExtension =
      selectedFile.name.split('.').pop()?.toLowerCase() || '';

    if (!validExtensions.includes(fileExtension)) {
      alert(t('ATTACHMENT_CONDITION1'));
      return;
    }
    await onUploadSingleFile({
      file: selectedFile,
      userId: profile.userId,
      onCompleted: onCompletedUpload,
      onError: onErrorUpload,
    });

    return [];
  };

  const onCompletedUpload = ({
    fileUrl,
    fileName,
  }: {
    fileName: string;
    fileUrl: string;
  }) => {
    setUploadedFile({
      fileName: fileName,
      fileUrl: fileUrl,
    });
  };

  const onErrorUpload = (err: any) => {
    console.error('파일 업로드 에러', err);
  };

  return (
    <ContactForm
      onUploadFiles={onUploadFiles}
      onSubmit={onSubmit}
      isLoading={isLoading}
      fileName={uploadedFile?.fileName}
    />
  );
}

export default ContactCreatePage;
