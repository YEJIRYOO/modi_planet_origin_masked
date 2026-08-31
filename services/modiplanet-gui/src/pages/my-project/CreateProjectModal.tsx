import { useState, useEffect, useMemo } from 'react';
import { ProjectRunType } from '@services/gen/gen';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';
import InputUI from '@src/components/ui/Input/InputUI';
import CheckboxUI from '@src/components/ui/Checkbox/CheckboxUI';
import { useProjectNameExistLazy } from '@services/api/project/useProjectNameExistLazy';
import useTranslator from '@src/components/hooks/useTranslator';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import ErrorBorderedInputUI from '@src/components/ui/Input/ErrorBorderedInputUI';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (projectType: ProjectRunType, projectName: string) => void;
}

function CreateProjectModal({
  isOpen,
  onClose,
  onConfirm,
}: CreateProjectModalProps) {
  const { t } = useTranslator();
  const [selectedProjectType, setSelectedProjectType] =
    useState<ProjectRunType>(ProjectRunType.Upload);
  const [projectName, setProjectName] = useState<string>('');
  const [lengthError, setLengthError] = useState<string>('');
  const [duplicateError, setDuplicateError] = useState<string>('');
  const [isCheckingDuplicate, setIsCheckingDuplicate] =
    useState<boolean>(false);
  const isInvalid = !projectName.trim() || !!lengthError || !!duplicateError;

  const getDefaultProjectName = () => {
    const dateStr = dayjs().format('YYMMDD');
    return t('DEFAULT_PROJECT_NAME', { DATE: dateStr });
  };

  useEffect(() => {
    if (isOpen) {
      const defaultName = getDefaultProjectName();
      setProjectName(defaultName);
      setIsCheckingDuplicate(true);
      debouncedCheckDuplicate(defaultName);
    }
  }, [isOpen]);

  const { checkProjectNameExist } = useProjectNameExistLazy();

  const checkDuplicateName = async (name: string) => {
    if (!name.trim()) {
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
    [checkProjectNameExist, t],
  );

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProjectName(value);

    if (value.length > 30) {
      setLengthError(t('PROJECT_NAME_LENGTH'));
    } else {
      setLengthError('');
    }

    debouncedCheckDuplicate(value);
  };

  const handleClose = () => {
    setSelectedProjectType(ProjectRunType.Upload);
    setProjectName('');
    setLengthError('');
    setDuplicateError('');
    setIsCheckingDuplicate(false);
    debouncedCheckDuplicate.cancel();
    onClose();
  };

  const handleConfirm = async () => {
    if (duplicateError || lengthError) {
      return;
    }
    onConfirm(selectedProjectType, projectName);
    handleClose();
  };

  return (
    <CModalOneButton
      isOpen={isOpen}
      onClose={handleClose}
      onClickOk={handleConfirm}
      okLabel={t('ROOM_CREATE')}
      isDisabled={!projectName.trim() || isInvalid || isCheckingDuplicate}
      title={
        <span className="whitespace-pre-line">{t('CREATE_PROJECT_TITLE')}</span>
      }
    >
      <div className="flex flex-col items-center">
        <div className="flex gap-10 sm:gap-3 mb-6">
          <div>
            <div
              className={`w-[180px] h-[180px] sm:w-[139px] sm:h-[139px] rounded-[10px] border-1 cursor-pointer transition-all flex flex-col items-center justify-center relative mb-5 ${
                selectedProjectType === ProjectRunType.Upload
                  ? 'border-2 border-brand'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              onClick={() => setSelectedProjectType(ProjectRunType.Upload)}
            >
              <div className="absolute top-2 right-0 pointer-events-none">
                <CheckboxUI
                  isSelected={selectedProjectType === ProjectRunType.Upload}
                />
              </div>
              <img
                src="/assets/mypage/block-logo.svg"
                alt="Block"
                className="w-[120px] h-[120px]"
              />
            </div>
            <span className="p1-r">{t('BLOCK')}</span>
          </div>
          <div>
            <div
              className={`w-[180px] h-[180px] sm:w-[139px] sm:h-[139px] rounded-[10px] border-1 cursor-pointer transition-all flex flex-col items-center justify-center relative mb-5 ${
                selectedProjectType === ProjectRunType.Realtime
                  ? 'border-2 border-brand'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
              onClick={() => setSelectedProjectType(ProjectRunType.Realtime)}
            >
              <div className="absolute top-2 right-0 pointer-events-none">
                <CheckboxUI
                  isSelected={selectedProjectType === ProjectRunType.Realtime}
                />
              </div>
              <img
                src="/assets/mypage/ai-logo.svg"
                alt="AI Block"
                className="w-[120px] h-[120px]"
              />
            </div>
            <span className="p1-r">{t('AI_BLOCK')}</span>
          </div>
        </div>

        <div className="w-[452px] sm:w-[290px] mb-[60px] sm:mb-[51px]">
          <ErrorBorderedInputUI
            placeholder={t('ENTER_PROJECT_NAME')}
            value={projectName}
            onChange={handleProjectNameChange}
            onClear={() => {
              setProjectName('');
              setLengthError('');
              setDuplicateError('');
              debouncedCheckDuplicate.cancel();
            }}
            maxLength={31}
            isInvalid={isInvalid}
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
      </div>
    </CModalOneButton>
  );
}

export default CreateProjectModal;
