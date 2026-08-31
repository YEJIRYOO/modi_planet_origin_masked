import React, { useEffect, useLayoutEffect, useState } from 'react';
import useTranslator from '@hooks/useTranslator';
import { LocaleHandler } from '@src/lib/utils/locale';
import i18n from '@src/lib/i18n';

interface IClassifierLabel {
  index: number;
  label: string;
  updateLabel: (label: string) => void;
}

function ClassifierLabel({ label, index, updateLabel }: IClassifierLabel) {
  const { t } = useTranslator();
  const locale = LocaleHandler.getLocale(i18n.language);
  const [defaultLabel, setDefaultLabel] = useState<string>(
    `${t('DEFAULT_CLASS_LABEL')}${index + 1}`,
  );

  useLayoutEffect(() => {
    if (!label) {
      updateLabel(`${t('DEFAULT_CLASS_LABEL')}${index + 1}`);
    }
  }, []);

  useEffect(() => {
    const newDefaultLabel = `${t('DEFAULT_CLASS_LABEL')}${index + 1}`;
    setDefaultLabel(newDefaultLabel);

    if (label === defaultLabel) {
      updateLabel(newDefaultLabel);
    }
  }, [locale]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLabel(e.target.value);
  };

  return (
    <input
      value={label}
      className="input w-[300px]"
      type="text"
      maxLength={20}
      onChange={onChange}
    />
  );
}

export default React.memo(ClassifierLabel);
