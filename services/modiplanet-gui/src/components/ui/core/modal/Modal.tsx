import {
  Modal as NextuiModal,
  ModalProps as NextuiModalProps,
} from '@nextui-org/react';

export interface ModalProps extends NextuiModalProps {}

function Modal({ ...props }: ModalProps) {
  return <NextuiModal {...props} />;
}

export default Modal;
