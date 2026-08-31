import { ChangeEvent, useState } from 'react';
import dayjs from 'dayjs';
import {
  Checkbox,
  Divider,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react';
import ButtonUI from '@components/ui/Button/ButtonUI';
import { Validator } from '../validator';
import EmailVerify from '@components/ui/common/EmailVerify';
import { AuthType } from '@services/gen/gen';
import useTranslator from '@hooks/useTranslator';

interface SignUpTermsProps {
  ageType: 'adult' | 'child' | null;
  onSubmit: (formData: {
    privacyPolicyConsent: boolean;
    termsOfServiceConsent: boolean;
    personalInfoConsent: boolean;
    emailMarketingConsent: boolean;
    protectorEmail: string;
    protectorAuthCode: string;
  }) => void;
  notAllowedEmail: string | null;
}

export default function SignUpTerms({
  ageType,
  onSubmit,
  notAllowedEmail,
}: SignUpTermsProps) {
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isVerifiedProtector, setIsVerifiedProtector] = useState(
    ageType === 'adult',
  );
  const [protectorEmail, setProtectorEmail] = useState('');
  const [protectorAuthCode, setProtectorAuthCode] = useState('');
  const { t, isKorean } = useTranslator();

  const {
    isOpen: isCollectModalOpen,
    onOpen: onCollectModalOpen,
    onOpenChange: onCollectModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isMarketingModalOpen,
    onOpen: onMarketingModalOpen,
    onOpenChange: onMarketingModalOpenChange,
  } = useDisclosure();
  const checkAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (ageType === 'adult') {
      e.target.checked
        ? setCheckList(['terms', 'privacy', 'collect', 'marketing', 'adult'])
        : setCheckList([]);
    } else {
      e.target.checked
        ? setCheckList(['terms', 'privacy', 'collect', 'marketing', 'agent'])
        : setCheckList([]);
    }
  };
  const check = (name: string) => {
    const isChecked = checkList.includes(name);
    const updatedList = isChecked
      ? checkList.filter((choice) => choice !== name)
      : [...checkList, name];
    setCheckList(updatedList);
  };

  const childTermList = [
    {
      name: 'terms',
      label: t('TERMS_AGREEMENT'),
      viewLink: isKorean
        ? 'https://luxrobo.notion.site/2024-5-3-245ff842083247c798f02bd03172857d?pvs=4'
        : 'https://luxrobo.notion.site/Service-Terms-of-Use-MAY-03-2024-ec32678d4b3846878c59c363c4a49424?pvs=4',
    },
    {
      name: 'privacy',
      label: t('PRIVACY_AGREEMENT'),
      viewLink: isKorean
        ? 'https://luxrobo.notion.site/2024-5-3-3507189795bb492db0bbf61c5f10af08?pvs=4.com/privacy'
        : 'https://luxrobo.notion.site/Privacy-Policy-MAY-03-2024-99fa1297e076442aad47d56ed8531c68?pvs=4',
    },
    {
      name: 'collect',
      label: t('PRIVARY_USE_AGREEMENT'),
      viewLink: isKorean
        ? 'https://luxrobo.notion.site/4e85409f9fcd4dcda07eb9361d5ac945?pvs=4.com/collect'
        : 'https://luxrobo.notion.site/Consent-to-the-Optional-Collection-and-Use-of-Personal-Information-0828f5c438b647489db06b9b7b3eb3ce?pvs=4',
    },
    { name: 'marketing', label: t('MARKETING_AGREEMENT') },
    {
      name: 'agent',
      label: t('GUARDIAN_AGREEMENT'),
    },
  ];

  const adultTermList = [
    {
      name: 'terms',
      label: t('TERMS_AGREEMENT'),
      viewLink: isKorean
        ? 'https://luxrobo.notion.site/2024-5-3-245ff842083247c798f02bd03172857d?pvs=4'
        : 'https://luxrobo.notion.site/Service-Terms-of-Use-MAY-03-2024-ec32678d4b3846878c59c363c4a49424?pvs=4',
    },
    {
      name: 'privacy',
      label: t('PRIVACY_AGREEMENT'),
      viewLink: isKorean
        ? 'https://luxrobo.notion.site/2024-5-3-3507189795bb492db0bbf61c5f10af08?pvs=4.com/privacy'
        : 'https://luxrobo.notion.site/Privacy-Policy-MAY-03-2024-99fa1297e076442aad47d56ed8531c68?pvs=4',
    },
    {
      name: 'collect',
      label: t('PRIVARY_USE_AGREEMENT'),
      viewLink: isKorean
        ? 'https://luxrobo.notion.site/4e85409f9fcd4dcda07eb9361d5ac945?pvs=4.com/collect'
        : 'https://luxrobo.notion.site/Consent-to-the-Optional-Collection-and-Use-of-Personal-Information-0828f5c438b647489db06b9b7b3eb3ce?pvs=4',
    },
    { name: 'marketing', label: t('MARKETING_AGREEMENT') },
    {
      name: 'adult',
      label: t('OVER_14_AGE'),
    },
  ];

  const handleCollectAgree = () => {
    setCheckList((prev) => {
      const updatedList = [...prev, 'collect'];
      onCollectModalOpenChange();

      if (!updatedList.includes('marketing')) {
        onMarketingModalOpen();
      } else {
        submitFormData(updatedList);
      }

      return updatedList;
    });
  };

  const handleCollectCancel = () => {
    onCollectModalOpenChange();
    if (!checkList.includes('marketing')) {
      onMarketingModalOpen();
    } else {
      submitFormData(checkList);
    }
  };

  const handleMarketingAgree = () => {
    setCheckList((prev) => {
      const updatedList = [...prev, 'marketing'];
      onMarketingModalOpenChange();
      submitFormData(updatedList);
      return updatedList;
    });
  };

  const handleMarketingCancel = () => {
    onMarketingModalOpenChange();
    submitFormData(checkList);
  };

  const handleButtonClick = () => {
    if (!checkList.includes('collect')) {
      onCollectModalOpen();
    } else if (!checkList.includes('marketing')) {
      onMarketingModalOpen();
    } else {
      submitFormData(checkList);
    }
  };

  // TODO : singup관련 모델 필요
  const submitFormData = (updatedCheckList) => {
    const formData = {
      privacyPolicyConsent: updatedCheckList.includes('privacy'),
      termsOfServiceConsent: updatedCheckList.includes('terms'),
      personalInfoConsent: updatedCheckList.includes('collect'),
      emailMarketingConsent: updatedCheckList.includes('marketing'),
      smsMarketingConsent: updatedCheckList.includes('marketing'),
      protectorEmail: protectorEmail,
      protectorAuthCode: protectorAuthCode,
    };
    onSubmit(formData);

    const currentYear = dayjs().format('YYYY');
    const currentMonth = dayjs().format('MM');
    const currentDay = dayjs().format('DD');

    setTimeout(() => {
      if (formData.emailMarketingConsent) {
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
    }, 500);
  };

  let termList = ageType === 'adult' ? adultTermList : childTermList;

  const onVerifyCompleted = (isCompleted: boolean, email: string, authCode?: string) => {
    setIsVerifiedProtector(isCompleted);
    setProtectorEmail(email);
    setProtectorAuthCode(authCode || '');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[432px] sm:w-[350px] flex flex-col items-center mt-[70px] sm:mt-[30px]">
        <div className="h2-b mb-[38px] sm:mb-[20px]">{t('GNB_SIGN_UP')}</div>
        <div className="text-font-sub p1-b sm:p3-b mb-[20px]">
          {t('AGREE_TERMS')}
        </div>
        <div className="flex items-center mb-[30px] sm:mb-[40px]">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 bg-[#FF4547] rounded-full flex items-center justify-center text-white p3-b sm:w-[30px] sm:h-[30px]">
              1
            </div>
          </div>

          <div className="w-20 border-t-1 border-dashed border-[#FF4547]"></div>

          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 bg-[#FF4547] rounded-full flex items-center justify-center text-white p3-b sm:w-[30px] sm:h-[30px]`}
            >
              2
            </div>
          </div>
        </div>
        {ageType === 'child' && (
          <>
            <EmailVerify
              notAllowedEmail={notAllowedEmail || ''}
              onVerifyCompleted={onVerifyCompleted}
              authType={AuthType.SignUpProtector}
              title={
                <div>
                  <div className="flex justify-start w-full p3-b mb-2 text-font-sub">
                    {t('GUARDIAN_VERIFY')}
                  </div>
                  <div className="flex justify-start w-full p8-r mb-5 text-font-sub sm:p4-r">
                    {t('REQUIRE_AGREE_UNDER_14_AGE')}
                  </div>
                </div>
              }
            />
          </>
        )}

        <div className="flex flex-col justify-start w-full mb-[65px] sm:mb-[30px]">
          <Checkbox
            id="check-all"
            isSelected={checkList.length === 5}
            onChange={checkAll}
            classNames={{
              wrapper: 'after:bg-[#FF4547]',
            }}
          >
            <div className="p6-r sm:p5-r">{t('ALL_AGREE')}</div>
          </Checkbox>
          <Divider className="my-3" />
          {termList.map(({ name, label, viewLink }) => (
            <div className="flex justify-between" key={name}>
              <Checkbox
                name={name}
                color="primary"
                isSelected={checkList.includes(name)}
                onChange={() => check(name)}
                className="${name === 'agent' ? 'w-[432px]' : ''} mb-1"
              >
                <div className="p6-r sm:p5-r w-[360px] sm:w-[290px]">
                  {label}
                </div>
              </Checkbox>
              {viewLink && (
                <a
                  href={viewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-font-main p6-r underline"
                >
                  {t('VIEW')}
                </a>
              )}
            </div>
          ))}
        </div>
        <ButtonUI
          color="primary"
          isDisabled={
            !Validator.validateTerms(checkList) || !isVerifiedProtector
          }
          className="w-40 h-[46px] mb-20 sm:w-[318px] sm:h-[46px]"
          onPress={handleButtonClick}
        >
          <div className="p3-b">{t('SIGN_UP')}</div>
        </ButtonUI>
      </div>
      <>
        <Modal
          isOpen={isCollectModalOpen}
          placement="center"
          onOpenChange={onCollectModalOpenChange}
          size="xl"
          backdrop="transparent"
          hideCloseButton
        >
          <ModalContent className="flex flex-col">
            <>
              <ModalHeader></ModalHeader>
              <ModalBody className="items-center justify-center text-center">
                <div className="justify-center items-center mb-12 whitespace-pre-line">
                  {t('OPTION_PRIVACY_AGREEMENT')}
                </div>
                <div className="flex gap-[20px]">
                  <ButtonUI
                    className="w-60"
                    color="secondary"
                    size="lg"
                    onClick={handleCollectCancel}
                  >
                    {t('DISAGREE')}
                  </ButtonUI>
                  <ButtonUI
                    className="w-60 mb-7"
                    size="lg"
                    onClick={handleCollectAgree}
                  >
                    {t('AGREE')}
                  </ButtonUI>
                </div>
              </ModalBody>
            </>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isMarketingModalOpen}
          placement="center"
          onOpenChange={onMarketingModalOpenChange}
          size="xl"
          backdrop="transparent"
          hideCloseButton
        >
          <ModalContent className="flex flex-col">
            {(onClose) => (
              <>
                <ModalHeader></ModalHeader>
                <ModalBody className="items-center justify-center text-center">
                  <div className="justify-center items-center mb-12 whitespace-pre-line">
                    {t('OPTION_MARKETING_AGREEMENT')}
                  </div>
                  <div className="flex gap-[20px]">
                    <ButtonUI
                      className="w-60"
                      color="secondary"
                      size="lg"
                      onClick={handleMarketingCancel}
                    >
                      {t('DISAGREE')}
                    </ButtonUI>
                    <ButtonUI
                      className="w-60 mb-7"
                      size="lg"
                      onClick={handleMarketingAgree}
                    >
                      {t('AGREE')}
                    </ButtonUI>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}
