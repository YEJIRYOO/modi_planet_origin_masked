import { ModalContent } from '@nextui-org/react';

import ModalUI from '@components/ui/Modal/ModalUI';
import { SignInComponent } from '@src/pages/sign-in/SignInComponent';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess?: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onSignInSuccess,
}: LoginModalProps) {
  return (
    <ModalUI
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      className="min-w-[480px] min-h-[250px] sm:min-w-[350px]"
      classNames={{
        wrapper: 'z-[20000]',
        backdrop: 'z-[20000]',
        base: 'z-[20000]',
      }}
    >
      <ModalContent className="p-[30px] sm:p-[16px]">
        <SignInComponent
          onSignInSuccess={onSignInSuccess ?? onClose}
          onClose={onClose}
          noMargin
        />
      </ModalContent>
    </ModalUI>
  );
}
