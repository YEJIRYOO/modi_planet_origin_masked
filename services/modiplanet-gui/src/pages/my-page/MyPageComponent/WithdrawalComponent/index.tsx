import { useDisclosure } from '@nextui-org/react';
import { useWithdrawalController } from '../../hooks/useWithdrawalController';
import { ProfileModel, UserModel } from '@services/client-model/user';
import WithdrawalCompletedModal from '@src/pages/my-page/MyPageComponent/WithdrawalComponent/WithdrawalCompletedModal';
import WithdrawalFormModal from '@src/pages/my-page/MyPageComponent/WithdrawalComponent/WithdrawalFormModal';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '@src/store/zustand';
import useTranslator from '@hooks/useTranslator';

interface WithdrawalComponentProps {
  user: UserModel;
  profile: ProfileModel;
  isSocialUser: boolean;
}

export default function WithdrawalComponent({
  user,
  profile,
  isSocialUser,
}: WithdrawalComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const {
    isOpen: isOpenComplete,
    onOpen: onOpenComplete,
    onClose: onCloseComplete,
  } = useDisclosure();
  const clearProfile = useProfileStore((state) => state.clearProfile);
  const { t } = useTranslator();
  const { onWithdrawal, errorMsg, onClearErrorMsg } = useWithdrawalController();

  const onSubmit = async (password: string, unRegisterReason: string[]) => {
    await onWithdrawal({
      password: password ? password : undefined,
      reason: unRegisterReason,
      onCompleted: () => {
        onClose();
        onOpenComplete();
      },
    });
  };

  const onClickCompletedModal = () => {
    onCloseComplete();
    navigate('/');
    clearProfile();
  };

  return (
    <>
      <div className="flex justify-end">
        <button onClick={onOpen} className="flex items-center">
          <span className="mr-4">{t('WITHDRAWAL')}</span>
          <img src="/assets/mypage/arrow-right.svg" alt="arrow" />
        </button>
      </div>

      <WithdrawalFormModal
        isOpen={isOpen}
        onClose={onClose}
        isSocialUser={isSocialUser}
        onSubmit={onSubmit}
        errorMsg={errorMsg}
        onClearErrorMsg={onClearErrorMsg}
      />

      <WithdrawalCompletedModal
        isOpen={isOpenComplete}
        onClick={onClickCompletedModal}
      />
    </>
  );
}
