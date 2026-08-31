import { isDesktop } from 'react-device-detect';
import { ReactNode, useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import i18n from '@src/lib/i18n';
import { useNavigate } from 'react-router-dom';
import useTranslator from '@hooks/useTranslator';
import { LocaleHandler } from '@lib/utils/locale';
import { ProjectRunType } from '@services/gen/gen';

const useLinkValidation = () => {
  const { t } = useTranslator();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [warningMessage, setWarningMessage] = useState<ReactNode>('');

  const onModalOpen = (message: string) => {
    setWarningMessage(message);
    onOpen();
  };

  const onClickCodeEditor = () => {
    if (isDesktop) {
      window.open(
        `/editor?locale=${LocaleHandler.getLocale(i18n.language)}`,
        '_blank',
      );
    } else {
      onModalOpen(t('ONLY_PC_ALERT_CODE_EDITOR'));
    }
  };

  const onClickLearningSpace = () => {
    if (isDesktop) {
      const locale = LocaleHandler.getLocale(i18n.language);
      window.open(`/learning-space?locale=${locale}`, '_blank');
    } else {
      onModalOpen(t('ONLY_PC_ALERT_LEARNING_SPACE'));
    }
  };

  const onClickProject = (projectId: string, runType: ProjectRunType) => {
    if (isDesktop) {
      const mode = runType === ProjectRunType.Realtime ? 'ai' : 'block';
      const locale = LocaleHandler.getLocale(i18n.language);
      navigate(`/editor?projectId=${projectId}&mode=${mode}&locale=${locale}`);
    } else {
      onModalOpen(t('ONLY_PC_ALERT_CODE_EDITOR'));
    }
  };
  const onClickNewProject = (projectId: string, runType: ProjectRunType) => {
    if (isDesktop) {
      const mode = runType === ProjectRunType.Realtime ? 'ai' : 'block';
      const locale = LocaleHandler.getLocale(i18n.language);
      navigate(`/editor?projectId=${projectId}&mode=${mode}&locale=${locale}`);

      return;
    }
  };

  return {
    onClickCodeEditor,
    onClickLearningSpace,
    onClickProject,
    onClickNewProject,
    warningModalProps: {
      isOpen,
      onClose,
      message: warningMessage,
    },
  };
};

export default useLinkValidation;
