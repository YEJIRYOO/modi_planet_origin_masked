import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { storeLangType } from '@src/lib/utils/utils';
import { ELangType } from '@src/lib/constants/enums';
import { Select, SelectItem } from '@nextui-org/react';
import CModalTwoButton from '@components/ui/Modal/CModalTwoButton';

interface ILangSelect {
  confirmBeforeChange?: {
    title?: string;
    message: string;
    okLabel: string;
    cancelLabel: string;
  };
}

export function LangSelect({ confirmBeforeChange }: ILangSelect) {
  const { i18n } = useTranslation();
  const [pendingLang, setPendingLang] = useState<string | null>(null);

  const applyLangChange = (value: string) => {
    if (value === ELangType.EN) {
      i18n.changeLanguage(ELangType.EN);
      storeLangType(ELangType.EN);
      return;
    }
    if (value === ELangType.KO) {
      i18n.changeLanguage(ELangType.KO);
      storeLangType(ELangType.KO);
      return;
    }
    if (value === ELangType.ES) {
      i18n.changeLanguage(ELangType.ES);
      storeLangType(ELangType.ES);
      return;
    }
    if (value === ELangType.PL) {
      i18n.changeLanguage(ELangType.PL);
      storeLangType(ELangType.PL);
      return;
    }
  };

  const onLangChange = (keys: any) => {
    const value = Array.from(keys)[0] as string;
    if (confirmBeforeChange) {
      setPendingLang(value);
      return;
    }
    applyLangChange(value);
  };

  const handleConfirm = () => {
    if (pendingLang) applyLangChange(pendingLang);
    setPendingLang(null);
  };

  const handleCancel = () => {
    setPendingLang(null);
  };

  const languageLabels = {
    [ELangType.KO]: 'KOR',
    [ELangType.EN]: 'ENG',
    [ELangType.ES]: 'ES',
    [ELangType.PL]: 'PL',
  };

  return (
    <>
      <Select
        name="select"
        selectedKeys={[i18n.language]}
        onSelectionChange={onLangChange}
        renderValue={() => (
          <span className="p3-m text-font-main">
            {languageLabels[i18n.language as ELangType]}
          </span>
        )}
        classNames={{
          base: 'w-[62px] tb:w-[48px] mb:w-[48px]',
          trigger:
            'bg-transparent border-none shadow-none p-0 h-auto data-[hover=true]:bg-transparent',
          innerWrapper: 'p-0 gap-[6px]',
          popoverContent: 'w-auto p-1',
          selectorIcon: 'right-0 w-5 h-5',
        }}
        aria-label="select"
        disallowEmptySelection
        popoverProps={{
          crossOffset: -9,
        }}
      >
        <SelectItem key={ELangType.KO} className="bg-white gap-2">
          KOR
        </SelectItem>
        <SelectItem key={ELangType.EN} className="bg-white gap-2">
          ENG
        </SelectItem>
        <SelectItem key={ELangType.ES} className="bg-white gap-2">
          ES
        </SelectItem>
        <SelectItem key={ELangType.PL} className="bg-white gap-2">
          PL
        </SelectItem>
      </Select>

      {confirmBeforeChange && (
        <CModalTwoButton
          isOpen={!!pendingLang}
          title={confirmBeforeChange.title}
          okLabel={confirmBeforeChange.okLabel}
          cancelLabel={confirmBeforeChange.cancelLabel}
          onClickOk={handleConfirm}
          onClickCancel={handleCancel}
          onClose={handleCancel}
          isDismissable={false}
        >
          <p className="p3-m text-font-sub mb-[60px] whitespace-pre-line">
            {confirmBeforeChange.message}
          </p>
        </CModalTwoButton>
      )}
    </>
  );
}

export default LangSelect;
