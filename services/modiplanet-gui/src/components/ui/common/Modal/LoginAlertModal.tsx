import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import useTranslator from '@hooks/useTranslator';

interface LoginAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function LoginAlertModal({
  isOpen,
  onClose,
  onConfirm,
}: LoginAlertModalProps) {
  const { t } = useTranslator();

  return (
    <CModalOneButton
      isOpen={isOpen}
      onClose={onClose}
      onClickOk={onConfirm ?? onClose}
      okLabel={t('OK')}
    >
      <div className="flex-col items-center text-center pt-4">
        <div className="mb-[60px] sm:mb-[40px] whitespace-pre-wrap">
          <p className="p3-m">{t('NEED_TO_SIGN_IN')}</p>
        </div>
      </div>
    </CModalOneButton>
  );
}
