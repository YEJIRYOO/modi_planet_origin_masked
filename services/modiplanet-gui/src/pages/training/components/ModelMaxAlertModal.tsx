import { ModalBody } from '@nextui-org/react';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import React from 'react';
import useTranslator from '@hooks/useTranslator';

interface ModelMaxAlertModalProps {
  onClose: () => void;
  onOK: () => void;
}

export default function ModelMaxAlertModal({
  onClose,
  onOK,
}: ModelMaxAlertModalProps) {
  const { t } = useTranslator();

  return (
    <CModalOneButton
      isOpen
      onClose={onClose}
      onClickOk={onOK}
      okLabel={t('OK')}
    >
      <ModalBody>
        <div className="p3-m mb-[60px] whitespace-pre-wrap">
          {t('MODEL_ALERT_MAX_COUNT')}
        </div>
      </ModalBody>
    </CModalOneButton>
  );
}
