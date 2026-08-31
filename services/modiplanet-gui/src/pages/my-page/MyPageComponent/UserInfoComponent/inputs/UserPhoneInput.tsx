import { Fragment, useState, useEffect } from 'react';
import Label from '@components/ui_old/form/label';
import InputWrapper from '@components/ui_old/form/input-wrapper';
import InputUI from '@components/ui/Input/InputUI';
import { useDisclosure, Avatar, Select, SelectItem } from '@nextui-org/react';
import { useUpdateProfileController } from '@src/pages/my-page/hooks/useUpdateProfileController';
import { Country } from './country';
import useTranslator from '@hooks/useTranslator';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';
import { maskUserInfo } from '../maskUserInfo';

interface UserPhoneInputProps {
  countryCode: string;
  phone: string;
  externalOpen?: boolean;
  onExternalOpenChange?: (isOpen: boolean) => void;
}

export function UserPhoneInput({
  countryCode,
  phone,
  externalOpen,
  onExternalOpenChange,
}: UserPhoneInputProps) {
  const { t } = useTranslator();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const actualIsOpen = externalOpen !== undefined ? externalOpen : isOpen;
  const actualOnOpenChange = onExternalOpenChange || onOpenChange;
  const initialValue = Country.getName(countryCode) || 'South Korea';
  const [value, setValue] = useState(initialValue);
  const [selectedCode, setSelectedCode] = useState<string>(
    `${countryCode || '+82'}`,
  );
  const [phoneNumber, setPhoneNumber] = useState(phone || '');
  const { onSubmit } = useUpdateProfileController();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setIsButtonEnabled(
      ((phoneNumber !== phone && phoneNumber !== '') ||
        (countryCode !== selectedCode && phoneNumber !== '')) &&
        errorMsg === '',
    );
  }, [phoneNumber, phone, countryCode, selectedCode, errorMsg]);

  const handleOpen = (event) => {
    setErrorMsg('');
    event.preventDefault();
    if (onExternalOpenChange) {
      onExternalOpenChange(true);
    } else {
      onOpen();
    }
  };

  const handleClose = () => {
    setValue(initialValue);
    setSelectedCode(countryCode || '+82');
    setPhoneNumber(phone || '');
    onClose();
  };

  const handleSelectionChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    const selectedCode = Country.getCodeByName(selectedValue);
    setSelectedCode(`+${selectedCode}`);
  };

  const handlePhoneChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d*$/u.test(inputValue)) {
      setPhoneNumber(inputValue);
      setErrorMsg('');
    } else {
      setErrorMsg(t('ENTER_INPUT_NUMBER'));
    }
  };

  const handleButtonClick = () => {
    onSubmit({ countryCallingCode: selectedCode, phoneNumber: phoneNumber });
    if (onExternalOpenChange) {
      onExternalOpenChange(false);
    } else {
      onClose();
    }
  };

  return (
    <Fragment>
      <InputWrapper className="flex items-center justify-between my-14 sm:my-6 sm:items-start">
        <div className="flex items-center sm:flex-col sm:justify-start sm:items-start">
          <Label htmlFor="phone" className="w-[130px] p3-b sm:mb-4">
            {t('PHONE_NUM')}
          </Label>
          <div className="flex">
            {countryCode && (
              <p className="p5-r text-font-sub_1 mr-1">{countryCode}</p>
            )}
            <p className="p5-r text-font-sub_1 w-[250px]">
              {phone ? maskUserInfo.maskPhoneNumber(phone) : '-'}
            </p>
          </div>
        </div>
        <button onClick={handleOpen}>
          <img src="/assets/mypage/edit.svg"></img>
        </button>
      </InputWrapper>
      <CModalOneButton
        isOpen={actualIsOpen}
        onOpenChange={actualOnOpenChange}
        onClose={handleClose}
        innerLayout="left"
        title={t('CHANGE_PHONE')}
        subTitle={t('ENTER_CHANGE_PHONE')}
        onClickOk={handleButtonClick}
        isDisabled={!isButtonEnabled}
        okLabel={t('CHANGE')}
      >
        <div className="mt-[78px] mb-[50px]">
          <div className="flex">
            <Select
              items={Country.getList()}
              showScrollIndicators={false}
              onChange={handleSelectionChange}
              selectedKeys={[value]}
              defaultSelectedKeys={[initialValue]}
              aria-label="country"
              className="w-[250px]"
              classNames={{
                trigger:
                  'bg-white data-[hover=true]:bg-white h-[46px] border border-[#ddd] shadow-none',
              }}
            >
              {(item) => {
                const primaryCode = item.isoCode.split('/')[0].trim();

                return (
                  <SelectItem
                    key={item.name}
                    aria-label="country"
                    startContent={
                      <Avatar
                        alt="Country Flag"
                        className="h-6 w-6"
                        src={`https://flagcdn.com/${primaryCode.toLowerCase()}.svg`}
                      />
                    }
                    value={item.name}
                  >
                    {item.name}
                  </SelectItem>
                );
              }}
            </Select>

            <InputUI
              isRequired
              placeholder={t('ENTER_PHONE')}
              className="w-full"
              defaultValue={phone}
              onChange={handlePhoneChange}
              onClear={() => {
                setPhoneNumber('');
              }}
              startContent={
                <div className="p5-r whitespace-nowrap text-font-main">
                  {selectedCode}
                </div>
              }
            />
          </div>
          {errorMsg && <p className="p8-r text-brand">{errorMsg}</p>}
        </div>
      </CModalOneButton>
    </Fragment>
  );
}

export default UserPhoneInput;
