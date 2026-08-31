import { useState } from 'react';
import { BirthDateArg, BirthdateSelector } from '../shared/BirthdateSelector';
import ButtonUI from '@components/ui/Button/ButtonUI';
import useTranslator from '@hooks/useTranslator';

interface SignUpFormSocialProps {
  onClickNext: (birthdate: string) => void;
}

export default function SignUpFormSocial({
  onClickNext,
}: SignUpFormSocialProps) {
  const [birthDate, setBirthDate] = useState<BirthDateArg>({
    year: '',
    month: '',
    day: '',
  });

  const handleClickNext = () => {
    // TODO :birthDate 내부 값 falsy 체크 필요
    const birth = `${birthDate.year}-${birthDate.month}-${birthDate.day}`;
    onClickNext(birth);
  };

  const onChangeBirth = (date: BirthDateArg) => {
    setBirthDate(date);
  };

  const { t } = useTranslator();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center w-[376px] sm:w-[318px] mt-[70px] sm:mt-[30px]">
        <div className="h2-b mb-[38px] sm:mb-[20px]">{t('GNB_SIGN_UP')}</div>
        <div className="text-font-sub p1-b sm:p3-b mb-[20px]">
          {t('ENTER_BIRTH_DESC')}
        </div>
        <div className="flex items-center mb-[202px] sm:mb-[194px]">
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
        <div className="w-[432px] mb-[311px] sm:w-[350px] sm:mb-[40px]">
          <BirthdateSelector onChange={onChangeBirth} />
        </div>
        <div className="w-40 sm:w-[318px] mb-[70px] sm:mb-[321px]">
          <ButtonUI
            onClick={handleClickNext}
            fullWidth
            isDisabled={!birthDate.day || !birthDate.month || !birthDate.year}
          >
            {t('NEXT')}
          </ButtonUI>
        </div>
      </div>
    </div>
  );
}
