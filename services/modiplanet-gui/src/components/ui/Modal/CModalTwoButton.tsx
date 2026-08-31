import CModal, { CModalProps } from '@components/ui/Modal/CModal';
import ButtonUI from '../Button/ButtonUI';
import useTranslator from '@hooks/useTranslator';

interface CModalTwoButtonProps extends CModalProps {
  okLabel?: string;
  onClickOk?: () => void;
  cancelLabel?: string;
  onClickCancel?: () => void;
  isDisabledOk?: boolean;
  isDisabledCancel?: boolean;
}

export default function CModalTwoButton({
  children,
  okLabel,
  onClickOk,
  onClickCancel,
  cancelLabel,
  isDisabledCancel = false,
  isDisabledOk = false,
  ...props
}: CModalTwoButtonProps) {
  const { t } = useTranslator();

  const handleOkClick = () => {
    onClickOk && onClickOk();
  };
  const handleCancelClick = () => {
    onClickCancel && onClickCancel();
  };

  return (
    <CModal {...props}>
      {children}
      <div className="flex gap-[20px]">
        <ButtonUI
          onClick={handleCancelClick}
          size="lg"
          fullWidth
          color="secondary"
          isDisabled={isDisabledCancel}
          className="p3-b"
        >
          {cancelLabel ? cancelLabel : t('CANCEL')}
        </ButtonUI>
        <ButtonUI
          onClick={handleOkClick}
          size="lg"
          fullWidth
          isDisabled={isDisabledOk}
          className="p3-b"
        >
          {okLabel ? okLabel : t('OK')}
        </ButtonUI>
      </div>
    </CModal>
  );
}
