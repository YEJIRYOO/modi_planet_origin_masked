import { useState } from 'react';
import ButtonUI from '@components/ui/Button/ButtonUI';
import { BirthDateArg, BirthdateSelector } from '../shared/BirthdateSelector';
import useTranslator from '@hooks/useTranslator';
import EmailVerify from '@components/ui/common/EmailVerify';
import PasswordVerify from '@components/ui/common/PasswordVerify';
import { AuthType } from '@src/services/gen/gen';

interface SignUpFormProps {
  handleCalculateAge: (birth: string) => void;
  setCurrentPage: (pageIndex: number) => void;
  onSubmit: (data: {
    email: string;
    password: string;
    birthdate: string;
  }) => void;
}

export default function SignUpForm({
  handleCalculateAge,
  setCurrentPage,
  onSubmit,
}: SignUpFormProps) {
  const [birthDate, setBirthDate] = useState<BirthDateArg>({
    year: '',
    month: '',
    day: '',
  });

  const { t } = useTranslator();
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);

  const [verifiedPw, setVerifiedPw] = useState('');
  const [isVerifiedPw, setIsVerifiedPw] = useState(false);

  const handleButtonClick = () => {
    const birth = `${birthDate.year}-${birthDate.month}-${birthDate.day}`;
    handleCalculateAge(birth);
    setCurrentPage(1);

    onSubmit({
      email: verifiedEmail,
      password: verifiedPw,
      birthdate: birth,
    });
  };

  const onChangeBirth = (date: BirthDateArg) => {
    setBirthDate(date);
  };

  const onVerifyCompleted = (isCompleted: boolean, email: string) => {
    setVerifiedEmail(email);
    setIsVerifiedEmail(isCompleted);
  };

  const onVerifyPw = (isVerified: boolean, pw: string) => {
    setVerifiedPw(pw);
    setIsVerifiedPw(isVerified);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center w-[432px] sm:w-[350px] mt-[70px] sm:mt-[30px]">
        <div className="h2-b mb-[38px] sm:mb-[20px]">{t('GNB_SIGN_UP')}</div>

        <div className="text-font-sub p1-b sm:p3-b mb-[20px]">
          {t('ENTER_INFO')}
        </div>
        <div className="flex items-center mb-[30px] sm:mb-[40px]">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 bg-[#FF4547] rounded-full flex items-center justify-center text-white p3-b sm:w-[30px] sm:h-[30px]">
              1
            </div>
          </div>

          <div className="w-[85px] border-t-1 border-dashed border-gray-300"></div>

          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 ${'bg-gray-300'} rounded-full flex items-center justify-center text-white p3-b sm:w-[30px] sm:h-[30px]`}
            >
              2
            </div>
          </div>
        </div>

        <EmailVerify
          title={t('ID')}
          authType={AuthType.SignUp}
          onVerifyCompleted={onVerifyCompleted}
        />

        <div className="flex justify-start w-full p3-b mb-5 text-font-sub">
          {t('PASSWORD')}
        </div>
        <PasswordVerify
          mismatchErrMsg={t('NO_MATCHING_PW')}
          onVerifyPw={onVerifyPw}
        />
        <div className="flex justify-start w-full p3-b mb-5 text-font-sub">
          {t('BIRTH')}
        </div>
        <div className="w-full flex justify-center mb-[59px] sm:mb-[37px]">
          <BirthdateSelector onChange={onChangeBirth} />
        </div>
        <ButtonUI
          color="primary"
          onClick={handleButtonClick}
          isDisabled={
            !isVerifiedPw ||
            !isVerifiedEmail ||
            !birthDate.year ||
            !birthDate.month ||
            !birthDate.day
          }
          className="w-40 h-[46px] mb-[70px] sm:w-[350px] sm:h-[46px]"
        >
          <div className="p3-b">{t('NEXT')}</div>
        </ButtonUI>
      </div>
    </div>
  );
}
