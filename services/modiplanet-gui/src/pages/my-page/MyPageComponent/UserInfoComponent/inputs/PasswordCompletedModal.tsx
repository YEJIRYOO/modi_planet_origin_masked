import useTranslator from '@hooks/useTranslator';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';

interface PasswordCompletedModalProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function PasswordCompletedModal({
  isOpen,
  onClick,
}: PasswordCompletedModalProps) {
  const { t } = useTranslator();

  return (
    <CModalOneButton
      isOpen={isOpen}
      hideCloseButton
      onClickOk={onClick}
      title={t('CHANGE_PW_COMPLETED')}
      subTitle={t('CHANGE_PW_COMPLETED_DESC')}
    >
      <div className="w-[1px] h-[60px]" />
    </CModalOneButton>
  );
}
