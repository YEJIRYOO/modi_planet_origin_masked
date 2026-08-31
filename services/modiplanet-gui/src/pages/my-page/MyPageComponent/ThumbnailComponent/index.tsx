import { DEFAULT_PROFILE_IMAGE } from '@lib/constants/etc';
import ModalUI from '@components/ui/Modal/ModalUI';
import {
  Divider,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import ButtonUI from '@components/ui/Button/ButtonUI';
import { Character } from '@lib/constants/character';
import { useState, useRef, ChangeEvent } from 'react';
import useTranslator from '@src/components/hooks/useTranslator';
import { useUpdateProfileController } from '../../hooks/useUpdateProfileController';
import { useSingleFileUploader } from '@hooks/upload/useSingleFileUploader';
import Loading from '@components/ui_old/loading/loading';

interface ThumbnailComponentProps {
  userId: any;
  thumbnail: string;
}

export default function ThumbnailComponent({
  userId,
  thumbnail,
}: ThumbnailComponentProps) {
  const {
    isOpen: isImageModalOpen,
    onOpen: onImageModalOpen,
    onOpenChange: onImageModalOpenChange,
    onClose,
  } = useDisclosure();
  const { t } = useTranslator();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    fileName: string;
    fileUrl: string;
  } | null>(null);
  const { onUploadSingleFile, loading } = useSingleFileUploader();
  const { onSubmit } = useUpdateProfileController();

  const handleEditAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarClick = (avatarUrl) => {
    onSubmit({ thumbnailUrl: avatarUrl });
    onClose();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const fileExtension =
        selectedFile.name.split('.').pop()?.toLowerCase() || '';

      if (
        !validTypes.includes(selectedFile.type) ||
        !['jpg', 'jpeg', 'png'].includes(fileExtension)
      ) {
        alert('Only JPG, JPEG, and PNG files are allowed.');
        event.target.value = '';
      } else {
        onUploadSingleFile({
          file: selectedFile,
          userId: userId,
          onCompleted: (result) => {
            setUploadedFile(result);
            onSubmit({ thumbnailUrl: result.fileUrl });
            onClose();
          },
          onError: (error) => {
            console.error('Error uploading file:', error);
            alert('Failed to upload file.');
          },
        });
      }
    }
  };

  return (
    <>
      <div className="relative w-[120px] h-[120px] rounded-2xl overflow-hidden mr-[80px] sm:m-0-auto sm:w-[80px] sm:h-[80px] sm:m-0-auto">
        <div className="w-full h-full">
          <img
            src={`${thumbnail ? `${thumbnail}` : DEFAULT_PROFILE_IMAGE}`}
            className="w-full h-full object-cover rounded-full"
          />
          <div className="absolute right-1 bottom-1 w-[30px] h-[30px] sm:-right-0 sm:-bottom-0.5">
            <button onClick={onImageModalOpen}>
              <img src={`/assets/profiles/edit-badge.svg`} alt="Edit Badge" />
            </button>
          </div>
        </div>
      </div>
      <ModalUI
        isOpen={isImageModalOpen}
        placement="center"
        onOpenChange={onImageModalOpenChange}
        hideCloseButton
        className="w-[428px] min-w-[350px] sm:w-[350px]"
        classNames={{
          wrapper: 'z-[20000]',
          backdrop: 'z-[20000]',
          base: 'z-[20000]',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {loading && <Loading />}
              <ModalBody>
                <div className="w-[368px] sm:w-[318px] mx-auto">
                  <label>
                    <ButtonUI
                      onClick={handleEditAvatarClick}
                      size="lg"
                      className="w-full mt-6"
                    >
                      <p className="p3-b">{t('UPLOAD_PROFILE_IMG')}</p>
                    </ButtonUI>
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg, .png, .jpeg"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                  </label>

                  <div className="flex items-center my-2 w-full my-6">
                    <div className="flex-grow">
                      <Divider className="text-font-sub_2" />
                    </div>
                    <div className="mx-4 sm:mx-2.5 p3-r whitespace-nowrap">
                      {t('BASIC_PROFILE')}
                    </div>
                    <div className="flex-grow">
                      <Divider className="text-font-sub_2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 grid-rows-4 gap-2 items-center justify-items-center w-full mb-6">
                    {Character.map((char, index) => (
                      <img
                        key={index}
                        src={char.ThumbnailUrl}
                        alt={char.Name}
                        className="w-full rounded-full cursor-pointer"
                        onClick={() => handleAvatarClick(char.ThumbnailUrl)}
                        style={{
                          opacity:
                            char.ThumbnailUrl.slice(
                              char.ThumbnailUrl.indexOf('/MODI/') + 1,
                            ) ===
                            thumbnail.slice(thumbnail.indexOf('/MODI/') + 1)
                              ? '1'
                              : '0.2',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </ModalUI>
    </>
  );
}
