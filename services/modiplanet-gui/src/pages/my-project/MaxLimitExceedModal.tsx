import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';
import useTranslator from '@src/components/hooks/useTranslator';

interface MaxLimitExceedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MaxLimitExceedModal({
  isOpen,
  onClose,
}: MaxLimitExceedModalProps) {
  const { t } = useTranslator();

  return (
    <CModalOneButton isOpen={isOpen} onClose={onClose} onClickOk={onClose}>
      <div className="whitespace-pre-wrap pt-4 pb-[60px]">
        {t('MAX_LIMIT_EXCEED')}
      </div>
    </CModalOneButton>
  );
}
