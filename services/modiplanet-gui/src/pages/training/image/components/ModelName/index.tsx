import React, { useEffect } from 'react';
import { useMyModelImageClassifier } from '@src/store/zustand';
import ModelNameInput from '@src/pages/training/image/components/ModelName/ModelNameInput';
import useTranslator from '@hooks/useTranslator';
import useMyModelConnectionLazy from '@src/pages/training/hooks/useMyModelConnectionLazy';
import i18n from '@src/lib/i18n';
import { LocaleHandler } from '@src/lib/utils/locale';

function ModelName({ isCreatePage }: { isCreatePage: boolean }) {
  const { t } = useTranslator();
  const [modelName, setModelName] = useMyModelImageClassifier((state) => [
    state.modelName,
    state.updateModelName,
  ]);
  const { getMyModelConnection } = useMyModelConnectionLazy();
  const locale = LocaleHandler.getLocale(i18n.language);

  const onChange = (value: string) => {
    setModelName(value);
  };

  const setDefaultName = async () => {
    await getMyModelConnection({
      onCompleted: (data) => {
        const count = data.aiModelConnection.nodes.length;
        let value = 1;
        const names = data.aiModelConnection.nodes.map((n) => n.name);

        let defaultName = t('NEW_MODEL') + ` ${count + value}`;

        while (names.includes(defaultName)) {
          value += 1;
          defaultName = t('NEW_MODEL') + ` ${count + value}`;
        }

        setModelName(defaultName);
      },
    });
  };

  useEffect(() => {
    if (isCreatePage) {
      // setModelName(t('NEW_MODEL'));
      setDefaultName();
    }
  }, [isCreatePage, locale]);

  return <ModelNameInput name={modelName} onChange={onChange} />;
}

export default ModelName;
