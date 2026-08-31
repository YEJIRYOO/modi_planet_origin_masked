import React, { useEffect, useState, useMemo } from 'react';
import { More, MoreActive } from '@src/lib/newAssets';
import CustomPopover from '@components/ui_old/popover/custom-popover';
import PopoverContent from './PopoverContent';
import CModalTwoButton from '@src/components/ui/Modal/CModalTwoButton';
import MaxLimitExceedModal from '../MaxLimitExceedModal';
import { useDisclosure } from '@nextui-org/react';
import useTranslator from '@src/components/hooks/useTranslator';
import { ProjectRunType, ProjectCreateType } from '@services/gen/gen';
import { ProjectListItemModel } from '@services/client-model/project';
import { useCreateProject } from '@services/api/project/useCreateProject';
import { useAddProjectFavorite } from '@services/api/project/useAddProjectFavorite';
import { useRemoveProjectFavorite } from '@services/api/project/useRemoveProjectFavorite';
import { useProjectNameExistLazy } from '@services/api/project/useProjectNameExistLazy';
import { debounce } from 'lodash';
import InputUI from '@src/components/ui/Input/InputUI';
import { showToast } from '@components/ui_old/toast';

interface ProjectCardProps {
  data: ProjectListItemModel;
  deleteProject: (id: string) => void;
  renameProject: (id: string, title: string) => void;
  refetch: () => void;
  onClickProject: (projectId: string, runType: ProjectRunType) => void;
}

const ProjectCard = ({
  data,
  renameProject,
  deleteProject,
  refetch,
  onClickProject,
}: ProjectCardProps) => {
  const [cardData, setCardData] = useState(data);
  const { createProject } = useCreateProject();
  const { addProjectFavorite } = useAddProjectFavorite();
  const { removeProjectFavorite } = useRemoveProjectFavorite();
  const {
    isOpen: isRenameModalOpen,
    onOpen: onRenameModalOpen,
    onClose: onRenameModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isMaxLimitModalOpen,
    onOpen: onMaxLimitModalOpen,
    onClose: onMaxLimitModalClose,
  } = useDisclosure();
  const [newTitle, setNewTitle] = useState(cardData.title);
  const [lengthError, setLengthError] = useState<string>('');
  const [duplicateError, setDuplicateError] = useState<string>('');
  const [isCheckingDuplicate, setIsCheckingDuplicate] =
    useState<boolean>(false);
  const { t } = useTranslator();
  const { checkProjectNameExist } = useProjectNameExistLazy();

  const isInvalid = !newTitle.trim() || !!lengthError || !!duplicateError;

  useEffect(() => {
    setCardData(data);
  }, [data]);

  const checkDuplicateName = async (name: string) => {
    if (!name.trim()) {
      setDuplicateError('');
      setIsCheckingDuplicate(false);
      return;
    }

    if (name === cardData.title) {
      setDuplicateError('');
      setIsCheckingDuplicate(false);
      return;
    }

    setIsCheckingDuplicate(true);
    const exists = await checkProjectNameExist({
      title: name,
    });

    if (exists) {
      setDuplicateError(t('ALREADY_USED_NAME2'));
    } else {
      setDuplicateError('');
    }
    setIsCheckingDuplicate(false);
  };

  const debouncedCheckDuplicate = useMemo(
    () => debounce(checkDuplicateName, 500),
    [checkProjectNameExist, t, cardData.title],
  );

  const handleRenameOpen = () => {
    setNewTitle(cardData.title);
    setLengthError('');
    setDuplicateError('');
    setIsCheckingDuplicate(false);
    onRenameModalOpen();
  };

  const handleRenameConfirm = () => {
    if (duplicateError || lengthError || isCheckingDuplicate) {
      return;
    }
    renameProject(data.id, newTitle);
    handleRenameClose();
  };

  const handleRenameClose = () => {
    setLengthError('');
    setDuplicateError('');
    setIsCheckingDuplicate(false);
    debouncedCheckDuplicate.cancel();
    onRenameModalClose();
  };

  const handleDeleteOpen = () => {
    onDeleteModalOpen();
  };

  const handleDeleteConfirm = async () => {
    deleteProject(data.id);
    onDeleteModalClose();
  };

  const handleCopyClick = async () => {
    try {
      await createProject({
        title: `${cardData.title}`,
        runType: cardData.runType,
        jsonData: cardData.jsonData,
        createType: ProjectCreateType.Copy,
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
            showToast(
              t('SAVE_PROJECT_ERROR', { CODE: statusCode || 'UNKNOWN' }),
            );
          }
        },
      });
    } catch (error) {
      console.error('Error copying project:', error);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /[\{\}\[\]\/?.,;:|\*~`!^\-+<>@\#$%&\\\=\'\"]/gi;
    const value = event.target.value.replace(regex, '');
    setNewTitle(value);

    if (value.length > 30) {
      setLengthError(t('PROJECT_NAME_LENGTH'));
    } else {
      setLengthError('');
    }

    debouncedCheckDuplicate(value);
  };

  const getRunTypeLogo = (runType: ProjectRunType) => {
    return runType === ProjectRunType.Realtime
      ? '/assets/mypage/ai-block.svg'
      : '/assets/mypage/block.svg';
  };

  const handleCardClick = () => {
    onClickProject(cardData.id, cardData.runType);
  };

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (cardData.isFavorite) {
        await removeProjectFavorite({
          projectId: cardData.id,
          onCompleted: () => {
            refetch();
          },
          onError: (error) => {
            console.error('Error removing favorite:', error);
          },
        });
      } else {
        await addProjectFavorite({
          projectId: cardData.id,
          onCompleted: () => {
            refetch();
          },
          onError: (error) => {
            console.error('Error adding favorite:', error);
          },
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="flex flex-col w-[220px] sm:w-[163px]">
      <div
        className="w-full h-[224px] border border-1 rounded-20 p-[11px] bg-white relative flex flex-col cursor-pointer hover:border-brand"
        onClick={handleCardClick}
      >
        <div className="flex items-center justify-between mb-[12px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteToggle(e);
            }}
          >
            <img
              src={
                cardData.isFavorite
                  ? '/assets/mypage/star-active.svg'
                  : '/assets/mypage/star-inactive.svg'
              }
              alt={cardData.isFavorite ? 'active star' : 'inactive star'}
              className="h-[24px] w-[24px]"
            />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <CustomPopover
              content={
                <PopoverContent
                  data={cardData}
                  onRenameClick={handleRenameOpen}
                  onDeleteClick={handleDeleteOpen}
                  onCopyClick={handleCopyClick}
                />
              }
              props={{
                align: 'start',
                reposition: true,
                positions: ['right', 'left', 'bottom'],
                padding: -24,
                boundaryInset: 5,
                containerStyle: {
                  top: '24px',
                },
              }}
            >
              <span
                role="button"
                className="group flex items-center justify-center w-6 h-6 rounded-full hover:bg-brand_3 active:bg-brand_3"
              >
                <More className="w-[24px] h-[24px] group-hover:hidden" />
                <MoreActive className="w-[24px] h-[24px] hidden group-hover:block" />
              </span>
            </CustomPopover>
          </div>
        </div>
        <div className="w-full flex bg-gray-50 rounded-lg overflow-hidden mb-[12px]">
          {cardData.thumb && cardData.thumb.url !== '' ? (
            <img
              src={`${cardData.thumb.domain}${cardData.thumb.url}`}
              alt={cardData.title}
              className="max-w-full h-[120px]"
            />
          ) : (
            <>
              <img
                src="/assets/mypage/thumbnail.svg"
                alt="Default thumbnail"
                className="w-full h-[120px] sm:hidden"
              />
              <img
                src="/assets/mypage/thumbnail-mobile.svg"
                alt="Default thumbnail mobile"
                className="w-full h-[120px] hidden sm:block"
              />
            </>
          )}
        </div>
        <div className="flex items-center">
          <img
            src={getRunTypeLogo(cardData.runType)}
            alt={
              cardData.runType === ProjectRunType.Realtime
                ? 'AI Block'
                : 'Block'
            }
            className="h-[24px]"
          />
          <div className="p5-sb text-font-main truncate max-w-full px-2">
            {cardData.title}
          </div>
        </div>
      </div>

      <CModalTwoButton
        isOpen={isRenameModalOpen}
        hideCloseButton
        onClickCancel={handleRenameClose}
        onClickOk={handleRenameConfirm}
        isDisabledOk={
          newTitle === '' ||
          newTitle === cardData.title ||
          isInvalid ||
          isCheckingDuplicate
        }
      >
        <div className="w-full mb-[50px]">
          <InputUI
            autoFocus
            placeholder={cardData.title}
            maxLength={31}
            value={newTitle}
            onChange={handleTitleChange}
            onClear={() => {
              setNewTitle('');
              setLengthError('');
              setDuplicateError('');
              debouncedCheckDuplicate.cancel();
            }}
          />
          {lengthError && (
            <div className="text-tiny text-brand text-start mt-1">
              {lengthError}
            </div>
          )}
          {duplicateError && (
            <div className="text-tiny text-brand text-start mt-1">
              {duplicateError}
            </div>
          )}
        </div>
      </CModalTwoButton>
      <CModalTwoButton
        isOpen={isDeleteModalOpen}
        hideCloseButton
        onClickCancel={onDeleteModalClose}
        onClickOk={handleDeleteConfirm}
        okLabel={t('YES')}
        cancelLabel={t('NO')}
      >
        <div className="mb-[60px] p3-m">
          {t('DELETE_CUSTOM_MODEL', { NAME: cardData.title })}
        </div>
      </CModalTwoButton>

      <MaxLimitExceedModal
        isOpen={isMaxLimitModalOpen}
        onClose={onMaxLimitModalClose}
      />
    </div>
  );
};

export default ProjectCard;
