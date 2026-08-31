import useTranslator from '@hooks/useTranslator';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';

interface WithdrawalCompletedModalProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function WithdrawalCompletedModal({
  isOpen,
  onClick,
}: WithdrawalCompletedModalProps) {
  const { t } = useTranslator();

  return (
    <CModalOneButton
      isOpen={isOpen}
      hideCloseButton
      onClickOk={onClick}
      title={t('WITHDRAWAL_COMPLETED')}
      subTitle={t('WITHDRAWAL_COMPLETED_DESC')}
    >
      <div className="w-[1px] h-[60px]" />
    </CModalOneButton>
  );
}
