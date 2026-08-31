import { useEffect, useState } from 'react';
import { Fragment } from 'react';

import Label from '@components/ui_old/form/label';
import InputWrapper from '@components/ui_old/form/input-wrapper';
import { useDisclosure } from '@nextui-org/react';
import {
  BirthDateArg,
  BirthdateSelector,
} from '@src/pages/sign-up/shared/BirthdateSelector';
import calculateAge from '@src/pages/sign-up/shared/calculate-age';
import { useUpdateProfileController } from '@src/pages/my-page/hooks/useUpdateProfileController';

import useTranslator from '@hooks/useTranslator';
import { LocaleHandler } from '@lib/utils/locale';
import dayjs from 'dayjs';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';

interface UserBirthInputProps {
  birth: string;
}

export function UserBirthInput({ birth }: UserBirthInputProps) {
  const { t } = useTranslator();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { onSubmit } = useUpdateProfileController();
  const [selectedDate, setBirthDate] = useState<BirthDateArg>();
  const birthdate = `${selectedDate?.year}-${selectedDate?.month}-${selectedDate?.day}`;
  const [errorMsg, setErrorMsg] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const regex = /(\d{2,4})-(\d{2})-(\d{2})/;

    setIsButtonEnabled(regex.test(birthdate) && errorMsg === '');
  }, [selectedDate?.year, selectedDate?.month, selectedDate?.day, errorMsg]);

  const handleOpen = (event) => {
    setErrorMsg('');
    event.preventDefault();
    onOpen();
  };

  const onChangeBirth = (date: BirthDateArg) => {
    setBirthDate(date);
    setErrorMsg('');
  };

  const handleSave = () => {
    if (calculateAge(birthdate) === 'child') {
      setErrorMsg(t('NOT_ENTER_UNDER_14_AGE'));
      return;
    }

    onSubmit({ birthdate });
    onClose();
  };

  return (
    <Fragment>
      <InputWrapper className="flex items-center justify-between my-14 sm:my-6 sm:items-start">
        <div className="flex items-center sm:flex-col sm:justify-start sm:items-start">
          <Label htmlFor="birth" className="w-[130px] p3-b sm:mb-4">
            {t('BIRTH')}
          </Label>
          <p className="p5-r text-font-sub_1 w-[250px]">
            <BirthLabel birth={birth} />
          </p>
        </div>
        {(!birth || birth === '-') && (
          <button onClick={handleOpen}>
            <img src="/assets/mypage/edit.svg"></img>
          </button>
        )}
      </InputWrapper>
      <CModalOneButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        innerLayout="left"
        title={t('ENTER_BIRTH')}
        subTitle={`${t('ENTER_BIRTH_DESC')}${t('ENTER_BIRTH_DESC2')}`}
        onClickOk={handleSave}
        isDisabled={!isButtonEnabled}
        okLabel={t('SAVE')}
      >
        <div className="flex flex-col items-center">
          <div className="w-full max-w-[500px]">
            <div className="my-[45px]">
              <BirthdateSelector onChange={onChangeBirth} />
              {errorMsg && <p className="p8-r text-[#FF4547]">{errorMsg}</p>}
            </div>
          </div>
        </div>
      </CModalOneButton>
    </Fragment>
  );
}

export default UserBirthInput;

function BirthLabel({ birth }: { birth: string }) {
  const { i18n } = useTranslator();

  const locale = LocaleHandler.getLocale(i18n.language);

  if (!birth) return <>-</>;

  switch (locale) {
    case 'es': {
      return <>{dayjs(birth).format('DD/MM/YYYY')}</>;
    }
    case 'en':
    case 'ko':
    default: {
      return <>{dayjs(birth).format('YYYY/MM/DD')}</>;
    }
  }
}
