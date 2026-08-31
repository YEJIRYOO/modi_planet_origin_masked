import { useEffect, useState } from 'react';

import MaterialDetailsContainer from '@src/pages/materials/details/material-details-container';
import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import { useProfileStore } from '@src/store/zustand';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@nextui-org/react';
import LoginAlertModal from '@components/ui/common/Modal/LoginAlertModal';

export default function MaterialDetailsPage() {
  const [isLogin, setIsLogin] = useState(false);
  const profile = useProfileStore((state) => state.profile);
  const navigate = useNavigate();
  const {
    isOpen: isLoginAlertOpen,
    onOpen: onLoginAlertOpen,
    onClose: onLoginAlertClose,
  } = useDisclosure();

  const handleLoginAlertConfirm = () => {
    onLoginAlertClose();
    navigate('/signin');
  };

  useEffect(() => {
    if (profile) {
      setIsLogin(true);
    } else {
      onLoginAlertOpen();
    }
  }, []);

  if (!isLogin)
    return (
      <>
        <div className="h-full flex-center">
          <SpinnerLoader className="w-[100px] h-[100px]" />
        </div>
        <LoginAlertModal
          isOpen={isLoginAlertOpen}
          onClose={onLoginAlertClose}
          onConfirm={handleLoginAlertConfirm}
        />
      </>
    );

  return <MaterialDetailsContainer />;
}
