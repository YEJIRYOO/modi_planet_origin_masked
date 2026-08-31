import Modal from '@components/ui/core/modal/Modal';
import { ModalContent } from '@nextui-org/react';
import { Close } from '@lib/newAssets';
import React, { useMemo } from 'react';

export interface CModalProps {
  isOpen: boolean;
  children?: React.ReactNode;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  innerLayout?: 'left' | 'center';
  onOpenChange?: (isOpen: boolean) => void;
  hideCloseButton?: boolean;
  onClose?: () => void;
  size?: 'sm' | 'lg';
  isDismissable?: boolean;
}
const config: {
  [key in 'sm' | 'lg']: {
    width: string;
    max_width: string;
    width_sm?: string;
    max_width_sm?: string;
    min_width?: string;
  };
} = {
  sm: {
    width: 'w-[560px]',
    max_width: 'max-w-[560px]',
    width_sm: 'sm:w-[350px]',
    max_width_sm: 'sm:max-w-[350px]',
    min_width: 'min-w-[350px]',
  },
  lg: {
    width: 'w-[1037px]',
    max_width: 'max-w-[1037px]',
  },
};

interface CModalCloseButtonProps {
  onClose: () => void;
}

function CModalCloseButton({ onClose }: CModalCloseButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <button
      type="button"
      aria-label="Close"
      className="absolute top-[30px] right-[25px] sm:top-[16px] sm:right-[11px] p-0 hover:bg-white active:bg-white"
      onClick={handleClick}
    >
      <Close />
    </button>
  );
}

export default function CModal({
  isOpen,
  children,
  title,
  subTitle,
  innerLayout = 'center',
  hideCloseButton = false,
  onOpenChange,
  onClose,
  size = 'sm',
  isDismissable = true,
}: CModalProps) {
  const modalConfig = useMemo(() => config[size], [size]);

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      placement="center"
      className={`p-[58px_30px_30px] sm:p-[44px_16px_16px] rounded-[20px] ${
        modalConfig.width
      } ${modalConfig.max_width} ${modalConfig.width_sm || ''} ${
        modalConfig.max_width_sm || ''
      } ${modalConfig.min_width || ''} ${
        innerLayout === 'center' ? 'text-center' : 'text-left'
      }`}
      classNames={{
        wrapper: 'z-[20000]',
        backdrop: 'z-[20000]',
      }}
      onOpenChange={onOpenChange}
      hideCloseButton
      disableAnimation
      isDismissable={isDismissable}
    >
      <ModalContent onClick={handleContentClick}>
        {(close) => (
          <>
            {!hideCloseButton ? <CModalCloseButton onClose={close} /> : null}
            {title ? (
              <h3 className="h5-b text-font-main mb-[20px]">{title}</h3>
            ) : null}
            {subTitle ? (
              <p className="p3-m text-font-sub">{subTitle}</p>
            ) : null}
            {children}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
