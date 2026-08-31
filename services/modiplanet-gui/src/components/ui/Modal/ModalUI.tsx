import Modal from '@components/ui/core/modal/Modal';
import { ModalProps } from '@components/ui/core/modal/Modal';
import { Close } from '@lib/newAssets';
import { useMemo } from 'react';

interface ModalUIProps extends ModalProps {
  children: React.ReactNode;
}

const modalSizeConfig = {
  xl: 'w-[560px]',
};

function ModalUI({
  size = 'md',
  children,
  closeButton = (
    <button type="button">
      <Close />
    </button>
  ),
  classNames,
  ...props
}: ModalUIProps) {
  const modalClass = useMemo(() => {
    return modalSizeConfig[size] || '';
  }, [size]);

  return (
    <Modal
      size={size}
      className={`${modalClass}`}
      closeButton={closeButton}
      classNames={{
        ...classNames,
        closeButton:
          'top-[30px] right-[25px] p-0 hover:bg-white active:bg-white',
      }}
      {...props}
    >
      {children}
    </Modal>
  );
}

export default ModalUI;
