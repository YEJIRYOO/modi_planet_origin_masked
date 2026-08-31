import { useDisclosure } from '@nextui-org/react';
import { useResetPw } from '@services/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordVerify from '@components/ui/common/PasswordVerify';
import ButtonUI from '@components/ui/Button/ButtonUI';
import { ApolloError } from '@apollo/client';
import useTranslator from '@hooks/useTranslator';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import { getIsPortal } from '@lib/utils/utils';
import { Errorhandler } from '@lib/utils/error';

interface ResetPwComponentProps {
  authCode: string;
  email: string;
}

export default function ResetPwComponent({
  email,
  authCode,
}: ResetPwComponentProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { onResetPw } = useResetPw();
  const [isVerified, setIsVerified] = useState(false);
  const [pw, setPw] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslator();
  const [errMessage, setErrMessage] = useState('');
  const isPortal = getIsPortal();
  const onVerifyPw = (isVerified: boolean, pw: string) => {
    setIsVerified(isVerified);
    setPw(pw);
  };

  const onSubmit = async () => {
    await onResetPw({
      pw: pw,
      authCode: authCode,
      email: email,
      onCompleted: onCompleted,
      onError: onError,
    });
  };

  const onCompleted = () => {
    onOpen();
  };

  const onError = (err: ApolloError) => {
    /**
     * TODO : 비밀번호 변경 실패시 에러처리
     * */
    const handler = new Errorhandler(err);
    const codes = handler.getCodes();

    switch (codes[0]) {
      case 10015: {
        setErrMessage(t('ALREADY_USED_PW'));
        break;
      }
      default: {
        alert(t('COMMON_ERROR_MSG'));
        navigate('/');
        break;
      }
    }
  };

  const onOk = () => {
    navigate(isPortal ? '/portal/signin' : '/signin');
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-[432px] sm:w-[350px] flex flex-col items-center mt-[70px]">
          <div className="h2-b mb-[38px]">{t('CHANGE_PW')}</div>
          <div className="text-font-sub sm:p3-b p1-b mb-[155px]">
            {t('CHANGE_NEW_PW')}
          </div>
          <div className="w-[432px] sm:w-[350px] flex flex-col mb-[70px]">
            <div className="flex justify-start w-full p3-b mb-5 text-font-sub">
              {t('PASSWORD')}
            </div>
            <PasswordVerify
              mismatchErrMsg={t('NO_MATCHING_PW')}
              onVerifyPw={onVerifyPw}
            />
            {errMessage ? (
              <p className="p8-r text-brand relative -top-[40px]">
                {errMessage}
              </p>
            ) : null}
          </div>
          <div className="flex justify-center w-[160px] h-[50px] sm:w-[174px] sm:h-[46px]">
            <ButtonUI fullWidth onClick={onSubmit} isDisabled={!isVerified}>
              {t('OK')}
            </ButtonUI>
          </div>
          <CModalOneButton
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            title={t('CHANGE_PW')}
            subTitle={t('CHAGNE_PW_COMPLETED')}
            onClickOk={onOk}
          >
            <div className="w-[1px] h-[60px]" />
          </CModalOneButton>
        </div>
      </div>
    </>
  );
}
