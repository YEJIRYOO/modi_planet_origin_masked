import { useState } from 'react';

import LoginAlertModal from './LoginAlertModal';
import LoginModal from './LoginModal';

interface LoginPortalAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess?: () => void;
}

export default function LoginPortalAlertModal({
  isOpen,
  onClose,
  onSignInSuccess,
}: LoginPortalAlertModalProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const handleConfirm = () => {
    onClose();
    setIsLoginOpen(true);
  };

  const handleSignInSuccess = () => {
    closeLogin();
    onSignInSuccess?.();
  };

  return (
    <>
      <LoginAlertModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onSignInSuccess={handleSignInSuccess}
      />
    </>
  );
}
