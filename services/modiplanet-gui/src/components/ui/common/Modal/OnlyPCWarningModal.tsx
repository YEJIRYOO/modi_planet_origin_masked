import { ReactNode } from 'react';

import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import useTranslator from '@hooks/useTranslator';

interface OnlyPCWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: ReactNode;
  messageKey?: string;
}

export default function OnlyPCWarningModal({
  isOpen,
  onClose,
  message,
  messageKey = 'ONLY_PC_ALERT_CODE_EDITOR',
}: OnlyPCWarningModalProps) {
  const { t } = useTranslator();

  return (
    <CModalOneButton
      isOpen={isOpen}
      onClose={onClose}
      onClickOk={onClose}
      okLabel={t('OK')}
      size="sm"
    >
      <div className="p3-m pb-[40px] text-center whitespace-pre-wrap">
        {message ?? t(messageKey)}
      </div>
    </CModalOneButton>
  );
}
