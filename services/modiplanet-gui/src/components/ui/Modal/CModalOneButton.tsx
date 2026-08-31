import CModal, { CModalProps } from '@components/ui/Modal/CModal';
import ButtonUI from '../Button/ButtonUI';
import useTranslator from '@hooks/useTranslator';

interface CModalOneButtonProps extends CModalProps {
  okLabel?: string;
  onClickOk?: () => void;
  isDisabled?: boolean;
  size?: 'sm' | 'lg';
  isDismissable?: boolean;
  buttonWidth?: 'md' | 'lg';
}

export default function CModalOneButton({
  children,
  okLabel,
  onClickOk,
  isDisabled = false,
  size = 'sm',
  isDismissable = true,
  buttonWidth = 'lg',
  ...props
}: CModalOneButtonProps) {
  const { t } = useTranslator();

  return (
    <CModal size={size} isDismissable={isDismissable} {...props}>
      {children}
      <div className="flex justify-center">
        <ButtonUI
          isDisabled={isDisabled}
          onClick={onClickOk}
          fullWidth={buttonWidth === 'lg'}
          size="lg"
          className={`p3-b ${buttonWidth === 'md' ? 'w-[500px]' : ''}`}
        >
          {okLabel ? okLabel : t('OK')}
        </ButtonUI>
      </div>
    </CModal>
  );
}
