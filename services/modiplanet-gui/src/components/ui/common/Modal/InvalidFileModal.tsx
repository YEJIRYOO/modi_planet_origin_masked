import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import useTranslator from '@hooks/useTranslator';

interface InvalidFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvalidFileModal({
  isOpen,
  onClose,
}: InvalidFileModalProps) {
  const { t } = useTranslator();

  return (
    <CModalOneButton
      isOpen={isOpen}
      onClose={onClose}
      onClickOk={onClose}
      okLabel={t('OK')}
    >
      <p className="p3-m mt-[16px] mb-[60px] text-center whitespace-pre-wrap">
        {t('INVALID_FILE')}
      </p>
    </CModalOneButton>
  );
}
