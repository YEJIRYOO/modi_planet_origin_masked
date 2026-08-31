import { useProfile, useUser } from '@services/api';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '@src/store/zustand';
import { useEffect } from 'react';
import { useDisclosure } from '@nextui-org/react';
import useTranslator from '@hooks/useTranslator';
import { RoleTypeEnum } from '@src/services/client-model/user';
import CModalTwoButton from '../ui/Modal/CModalTwoButton';

interface AuthProviderProps {
  children?: React.ReactNode;
  accessOnlySigned?: boolean;
  blockGuest?: boolean;
}

export default function AuthProvider({
  children,
  accessOnlySigned,
  blockGuest = false,
}: AuthProviderProps) {
  const { profile, error } = useProfile();
  const { user, loading: userLoading } = useUser();

  const [setProfile, clearProfile] = useProfileStore((state) => [
    state.setProfile,
    state.clearProfile,
  ]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { t } = useTranslator();
  const handleCancel = () => {
    navigate('/');
    clearProfile();
    onClose();
  };

  const handleAgree = () => {
    navigate('/signin');
    clearProfile();
    onClose();
  };

  useEffect(() => {
    if (!profile) return;

    setProfile({
      ...profile,
    });
  }, [profile]);

  useEffect(() => {
    if (error && accessOnlySigned) {
      onOpen();
    }
  }, [error, accessOnlySigned]);

  useEffect(() => {
    if (blockGuest && user && user.roleType === RoleTypeEnum.GUEST) {
      navigate('/', { replace: true });
    }
  }, [blockGuest, user]);

  if (userLoading) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <CModalTwoButton
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClickOk={handleAgree}
          onClickCancel={handleCancel}
          hideCloseButton
        >
          <p className="whitespace-pre-wrap pt-4 pb-8">
            {t('NEED_TO_SIGN_IN')}
          </p>
        </CModalTwoButton>
      )}
      {children}
    </>
  );
}
