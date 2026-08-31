import { useState, useEffect } from 'react';
import InputWrapper from '@components/ui_old/form/input-wrapper';
import { Switch, useDisclosure } from '@nextui-org/react';
import dayjs from 'dayjs';
import { ProfileModel, UserModel } from '@services/client-model/user';
import useTranslator from '@src/components/hooks/useTranslator';
import { useMarketingController } from '../../hooks/useMarketingController';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';

interface MarketingComponentProps {
  profile: ProfileModel;
  user: UserModel;
  onOpenEmailModal?: () => void;
  onOpenPhoneModal?: () => void;
}

export default function MarketingComponent({
  profile,
  user,
  onOpenEmailModal,
  onOpenPhoneModal,
}: MarketingComponentProps) {
  const { t } = useTranslator();
  const [emailConsent, setEmailConsent] = useState(user.emailMarketingConsent);
  const [smsConsent, setSmsConsent] = useState(user.smsMarketingConsent);
  const { onSubmit, updatedAt } = useMarketingController();

  const {
    isOpen: isEmailWarningOpen,
    onOpen: onEmailWarningOpen,
    onOpenChange: onEmailWarningChange,
    onClose: onEmailWarningClose,
  } = useDisclosure();

  const {
    isOpen: isPhoneWarningOpen,
    onOpen: onPhoneWarningOpen,
    onOpenChange: onPhoneWarningChange,
    onClose: onPhoneWarningClose,
  } = useDisclosure();

  const isMinor = user.isMinor;
  const userEmail = isMinor
    ? user.protector?.email || ''
    : profile.contactEmail;
  const hasEmail = !!userEmail;
  const hasPhone = !!profile.phoneNumber;

  useEffect(() => {
    onSubmit(smsConsent, emailConsent);
  }, [smsConsent, emailConsent]);

  const formatEmailDate = () => {
    const dateValue = updatedAt || user.marketingConsentEmailUpdatedAt;
    if (!dateValue || !dayjs(dateValue).isValid()) return '';
    const formatted = dayjs(dateValue).format('YYYY.MM.DD');
    const consentText = emailConsent
      ? t('RECEPTION_CONSENT')
      : t('RECEPTION_REFUSE');
    return `${formatted} ${consentText}`;
  };

  const formatSmsDate = () => {
    const dateValue = updatedAt || user.marketingConsentSmsUpdatedAt;
    if (!dateValue || !dayjs(dateValue).isValid()) return '';
    const formatted = dayjs(dateValue).format('YYYY.MM.DD');
    const consentText = smsConsent
      ? t('RECEPTION_CONSENT')
      : t('RECEPTION_REFUSE');
    return `${formatted} ${consentText}`;
  };

  const handleEmailChange = () => {
    if (!hasEmail) {
      onEmailWarningOpen();
      return;
    }
    const newEmailConsent = !emailConsent;
    setEmailConsent(newEmailConsent);

    const currentYear = dayjs().format('YYYY');
    const currentMonth = dayjs().format('MM');
    const currentDay = dayjs().format('DD');

    if (newEmailConsent) {
      alert(
        t('NOTIFICATION_AGREE_DESC', {
          YEAR: currentYear,
          MONTH: currentMonth,
          DAY: currentDay,
        }),
      );
    } else {
      alert(
        t('NOTIFICATION_DISAGREE_DESC', {
          YEAR: currentYear,
          MONTH: currentMonth,
          DAY: currentDay,
        }),
      );
    }
  };

  const handleSmsChange = () => {
    if (!hasPhone) {
      onPhoneWarningOpen();
      return;
    }
    const newSmsConsent = !smsConsent;
    setSmsConsent(newSmsConsent);

    const currentYear = dayjs().format('YYYY');
    const currentMonth = dayjs().format('MM');
    const currentDay = dayjs().format('DD');

    if (newSmsConsent) {
      alert(
        t('NOTIFICATION_AGREE_DESC', {
          YEAR: currentYear,
          MONTH: currentMonth,
          DAY: currentDay,
        }),
      );
    } else {
      alert(
        t('NOTIFICATION_DISAGREE_DESC', {
          YEAR: currentYear,
          MONTH: currentMonth,
          DAY: currentDay,
        }),
      );
    }
  };

  const handleEmailWarningConfirm = () => {
    onEmailWarningClose();
    if (onOpenEmailModal) {
      onOpenEmailModal();
    }
  };

  const handlePhoneWarningConfirm = () => {
    onPhoneWarningClose();
    if (onOpenPhoneModal) {
      onOpenPhoneModal();
    }
  };

  const emailWarningMessage = isMinor
    ? t('REGISTER_PARENTS_EMAIL_FIRST')
    : t('REGISTER_EMAIL_FIRST');

  return (
    <>
      <h2 className="p2-b mb-5">{t('RECEPTION_SETTING')}</h2>
      <div className="rounded-30 bg-white p-[32px_54px] mb-[60px] text-font-sub_1 sm:rounded-10 sm:p-[30px_20px]">
        <div className="mb-8 flex items-center sm:flex-col sm:items-start">
          <p className="p3-b w-[148px] shrink-0 sm:w-auto sm:mb-4">
            {t('MARKETING_AD_RECEPTION')}
          </p>
          <p className="p8-r text-font-sub_1">{t('RECEIVE_SOME_INFO')}</p>
        </div>

        {/* Email Section */}
        <InputWrapper className="flex w-full mb-6">
          <div className="flex w-full items-center">
            <p className="w-[64px] p3-r shrink-0">{t('EMAIL_EN')}</p>
            <div onClick={!hasEmail ? onEmailWarningOpen : undefined}>
              <Switch
                id="email-marketing"
                defaultSelected={emailConsent}
                isSelected={emailConsent}
                size="sm"
                onChange={handleEmailChange}
                isDisabled={!hasEmail}
              />
            </div>
            <p className="ml-[30px] p5-r text-font-sub_1 sm:ml-auto">
              {formatEmailDate()}
            </p>
          </div>
        </InputWrapper>

        {/* SMS Section */}
        <InputWrapper className="flex w-full">
          <div className="flex w-full items-center">
            <p className="w-[64px] p3-r shrink-0">{t('SMS')}</p>
            <div onClick={!hasPhone ? onPhoneWarningOpen : undefined}>
              <Switch
                id="sms-marketing"
                defaultSelected={smsConsent}
                isSelected={smsConsent}
                size="sm"
                onChange={handleSmsChange}
                isDisabled={!hasPhone}
              />
            </div>
            <p className="ml-[30px] p5-r text-font-sub_1 sm:ml-auto">
              {formatSmsDate()}
            </p>
          </div>
        </InputWrapper>
      </div>

      <CModalOneButton
        isOpen={isEmailWarningOpen}
        onOpenChange={onEmailWarningChange}
        okLabel={t('REGISTER2')}
        onClickOk={handleEmailWarningConfirm}
      >
        <div className="text-center">
          <p className="p3-r mt-4 mb-[60px] sm:mb-[40px]">
            {emailWarningMessage}
          </p>
        </div>
      </CModalOneButton>

      <CModalOneButton
        isOpen={isPhoneWarningOpen}
        onOpenChange={onPhoneWarningChange}
        okLabel={t('REGISTER2')}
        onClickOk={handlePhoneWarningConfirm}
      >
        <div className="text-center">
          <p className="p3-r mt-4 mb-[60px] sm:mb-[40px]">
            {t('REGISTER_PHONE_FIRST')}
          </p>
        </div>
      </CModalOneButton>
    </>
  );
}
