import CheckboxUI from '@components/ui/Checkbox/CheckboxUI';
import InputUI from '@components/ui/Input/InputUI';
import { useEffect, useState } from 'react';
import useTranslator from '@hooks/useTranslator';
import PasswordInputUI from '@src/components/ui/Input/PasswordInputUI';
import { useQs } from '@hooks/useQs';
import { useWithdrawalController } from '@src/pages/my-page/hooks/useWithdrawalController';
import { isModiApp, redirectToAppScheme } from '@lib/utils/utils';
import i18n from '@lib/i18n';
import { LocaleHandler } from '@lib/utils/locale';
import ButtonUI from '@src/components/ui/Button/ButtonUI';

function WithdrawalPortalPage() {
  const { path } = useQs();

  const signinType = path.signinType?.toUpperCase();
  const locale = path.locale as string;

  const [password, setPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [otherReason, setOtherReason] = useState('');
  const [unRegisterReason, setUnRegisterReason] = useState<string[]>([]);
  const { t } = useTranslator();
  const { onWithdrawal, errorMsg, onClearErrorMsg } = useWithdrawalController();

  useEffect(() => {
    if (locale) {
      LocaleHandler.applyLocale(i18n, locale);
      LocaleHandler.cleanLocaleFromUrl();
    }
  }, [locale]);

  const isSocialUser = signinType !== 'EMAIL';

  const onChange = (name: string) => {
    const isChecked = unRegisterReason.includes(name);
    let updatedList = [...unRegisterReason];
    if (isChecked) {
      updatedList = updatedList.filter((type) => type !== name);
      if (name === t('ETC')) {
        setOtherReason('');
      }
    } else {
      updatedList.push(name);
    }
    setUnRegisterReason(updatedList);
  };

  const handleCancel = () => {
    if (isModiApp()) {
      redirectToAppScheme('letsmodi://withdrawal/cancel');
    }
  };

  const handleWithdrawal = async () => {
    const reasonMap = {
      [t('LOW_FREQUENCY')]: '사용 빈도 낮음',
      [t('NO_CONTENT')]: '즐길 콘텐츠 부족',
      [t('USE_HARD')]: '이용의 어려움',
      [t('SERVICE_ERR')]: '서비스 장애',
      [t('ETC')]: '기타',
    } as const;

    const reasons = unRegisterReason.map((reason) => {
      if (reason === t('ETC')) {
        return otherReason;
      }
      return reasonMap[reason as keyof typeof reasonMap] || reason;
    });

    await onWithdrawal({
      password: password ? password : undefined,
      reason: reasons,
      onCompleted: () => {
        if (isModiApp()) {
          redirectToAppScheme('letsmodi://withdrawal/complete');
        }
      },
    });
  };

  const isDisabled =
    unRegisterReason.length === 0 ||
    !termsChecked ||
    (isSocialUser ? !!password : !password);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-6 bg-white">
      <div className="w-full max-w-[500px]">
        <h1 className="text-2xl font-bold mb-8 text-center">
          {t('TERMINATE_ACCOUNT')}
        </h1>

        <div className="flex flex-col mb-[30px] text-left">
          <div className="flex flex-col items-center">
            <div className="p3-m mb-5 text-font-sub_1">
              {t('LEAVE_MOPLAENT')}
            </div>
            <div className="flex flex-col items-center justify-center w-full h-[66px] bg-[#FAFAFA] text-center p5-r mb-[22px] whitespace-pre-wrap">
              {t('DELETE_ALL_INFO')}
            </div>
          </div>

          <div className="p3-m mb-4 sm:mb-[10px] text-font-sub_1">
            {t('WIDTHRAWAL_REASON')}
          </div>

          <CheckboxUI
            isSelected={unRegisterReason.includes(t('LOW_FREQUENCY'))}
            onChange={() => onChange(t('LOW_FREQUENCY'))}
            className="mb-1"
          >
            <p className="p6-r text-font-sub_1">{t('LOW_FREQUENCY')}</p>
          </CheckboxUI>

          <CheckboxUI
            isSelected={unRegisterReason.includes(t('NO_CONTENT'))}
            onChange={() => onChange(t('NO_CONTENT'))}
            className="mb-1"
          >
            <p className="p6-r text-font-sub_1">{t('NO_CONTENT')}</p>
          </CheckboxUI>

          <CheckboxUI
            isSelected={unRegisterReason.includes(t('USE_HARD'))}
            onChange={() => onChange(t('USE_HARD'))}
            className="mb-1"
          >
            <p className="p6-r text-font-sub_1">{t('USE_HARD')}</p>
          </CheckboxUI>

          <CheckboxUI
            isSelected={unRegisterReason.includes(t('SERVICE_ERR'))}
            onChange={() => onChange(t('SERVICE_ERR'))}
            className="mb-1"
          >
            <p className="p6-r text-font-sub_1">{t('SERVICE_ERR')}</p>
          </CheckboxUI>

          <CheckboxUI
            isSelected={unRegisterReason.includes(t('ETC'))}
            onChange={() => onChange(t('ETC'))}
          >
            <p className="p6-r text-font-sub_1">{t('ETC')}</p>
          </CheckboxUI>

          <InputUI
            isDisabled={!unRegisterReason.includes(t('ETC'))}
            placeholder={t('ENTER_REASON')}
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            maxLength={20}
            className="mb-5 mt-1.5"
            errorMessage={isSocialUser ? errorMsg : ''}
          />

          {isSocialUser ? null : (
            <>
              <div className="p3-m mb-2.5 sm:mb-[10px] text-font-sub_1">
                {t('PASSWORD')}
              </div>
              <PasswordInputUI
                errorMessage={errorMsg}
                isRequired
                isVisibleToggle
                placeholder={t('ENTER_PW')}
                value={password}
                onValueChange={setPassword}
                className="mb-[19px] mt-1.5"
              />
            </>
          )}

          <CheckboxUI
            isSelected={termsChecked}
            onChange={() => setTermsChecked(!termsChecked)}
            className="mb-[2px]"
          >
            <p className="p6-r text-font-sub_1">{t('CHECK_AND_ALL_AGREE')}</p>
          </CheckboxUI>
          {isSocialUser ? (
            <p className="p6-r pt-[20px]">{t('DELETE_ACCOUNT_DESC')}</p>
          ) : null}
        </div>

        <div className="flex gap-5">
          <ButtonUI
            color="secondary"
            onClick={handleCancel}
            className="flex-1 h-[60px]"
          >
            {t('CANCEL')}
          </ButtonUI>
          <ButtonUI
            onClick={handleWithdrawal}
            isDisabled={isDisabled}
            className="flex-1 h-[60px]"
          >
            {t('WITHDRAWAL2')}
          </ButtonUI>
        </div>
      </div>
    </div>
  );
}

export default WithdrawalPortalPage;
