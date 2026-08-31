import { useQs } from '@hooks/useQs';
import { useEmailController } from '@hooks/user/useEmailController';
import ResetPwComponent from '@src/pages/password/reset-pw/ResetPwComponent';
import { useEffect, useState } from 'react';
import Loading from '@components/ui_old/loading/loading';
import { AuthType } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';
import useTranslator from '@hooks/useTranslator';
import { useNavigate } from 'react-router-dom';

export default function ResetPwPage() {
  const {
    path: { authCode, service, email },
  } = useQs();
  const { onConfirmCode } = useEmailController();
  const { t } = useTranslator();
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyCode();
  }, []);

  const verifyCode = async () => {
    await onConfirmCode({
      authCode: authCode,
      authType: AuthType.ResetPassword,
      email: email,
      onCompleted: onCompleted,
      onError: onError,
    });
  };

  const onCompleted = () => {
    setIsVerified(true);
  };

  const onError = (msg: string) => {
    /**
     * TODO : 이메일 인증 실패시 에러처리
     *  1. 만료된 코드일경우(24시간) 처리
     *  2. 그 외 모든 api 요청 에러 처리
     * */
    alert(t('COMMON_ERROR_MSG'));
    navigate('/');
  };

  return isVerified ? (
    <ResetPwComponent authCode={authCode} email={email} />
  ) : (
    <div className="h-[80vh] relative">
      <Loading />
    </div>
  );
}
