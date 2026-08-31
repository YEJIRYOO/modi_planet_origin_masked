import React, { Fragment, useEffect, useState } from 'react';
import TrainingHomeHeader from '@src/pages/training/components/TrainingHomeHeader';
import TrainingSelectSection from '@src/pages/training/components/training-select-section';
import { AiModelCategoryType } from '@services/old/generated/graphql';
import TrainingImagePage from '@src/pages/training/image';
import TrainingVoicePage from '@src/pages/training/voice';
import TrainingModiPage from '@src/pages/training/modi';
import useAIModelCategories from '@src/pages/training/hooks/useAIModelCategories';
import {
  useMyModelConnectionStore,
  useSelectedModelCategory,
} from '@src/store/zustand';
import useTranslator from '@hooks/useTranslator';
import useMyModelConnection from '@src/pages/training/hooks/useMyModelConnection';
import { SET_LOCALE } from '@src/lib/constants/etc';
import { LocaleHandler } from '@src/lib/utils/locale';
import i18n from '@src/lib/i18n';
import PostMessageSender from '@src/lib/utils/PostMessageSender';
import PostMessageReceiver from '@src/lib/utils/PostMessageReceiver';

interface ITrainingContainer {}

function TrainingContainer({}: ITrainingContainer) {
  const [modelCategoryType, setModelCategoryType] =
    useState<AiModelCategoryType | null>(null);
  const { AIModelCategories, loading, error } = useAIModelCategories({});
  const setModelCategory = useSelectedModelCategory(
    (state) => state.setModelCategory,
  );
  const [modelId, setModelId] = useState<string>('');
  const { t } = useTranslator();
  const postMessageSender = PostMessageSender.getInstance();
  const postMessageReceiver = PostMessageReceiver.getInstance();
  const { myModelConnection: myModelConnectionFormServer, refetch } =
    useMyModelConnection({});
  const setMyModelConnection = useMyModelConnectionStore(
    (state) => state.setModelConnectionFromServer,
  );

  useEffect(() => {
    if (myModelConnectionFormServer) {
      setMyModelConnection(myModelConnectionFormServer);
    }
  }, [myModelConnectionFormServer]);

  useEffect(() => {
    if (!modelCategoryType) {
      refetch();
    }
  }, [modelCategoryType]);

  useEffect(() => {
    const handleSetLocale = (data: { locale: string }) => {
      const { locale } = data;
      LocaleHandler.applyLocale(i18n, locale);
    };

    postMessageReceiver.on(SET_LOCALE, handleSetLocale);
    postMessageReceiver.init();

    return () => {
      postMessageReceiver.dispose();
      postMessageReceiver.off(SET_LOCALE, handleSetLocale);
    };
  }, []);

  const onCreateMyModel = (type: AiModelCategoryType) => {
    if (!AIModelCategories) return;
    setModelId('');
    setModelCategoryType(type);

    const selectedCategory = AIModelCategories.filter(
      ({ type: categoryType }) => categoryType === type,
    )[0];

    setModelCategory(selectedCategory);
  };

  const onRetrainingMyModel = (type: AiModelCategoryType, modelId: string) => {
    setModelId(modelId);
    setModelCategoryType(type);
  };

  const resetView = () => {
    setModelCategoryType(null);
  };

  const resetModelId = () => {
    setModelId('');
  };

  const onClickClosePopup = () => {
    postMessageSender.sendCloseTrainingPopup();
  };

  return (
    <section className="h-screen w-screen bg-form-bg flex flex-col">
      {modelCategoryType === null && AIModelCategories !== null && (
        <Fragment>
          <TrainingHomeHeader
            title={t('TRAINING_MODEL')}
            onClickClose={onClickClosePopup}
          />
          <TrainingSelectSection
            AIModelCategories={AIModelCategories}
            onCreateMyModel={onCreateMyModel}
            onRetrainingMyModel={onRetrainingMyModel}
          />
        </Fragment>
      )}

      {modelCategoryType === AiModelCategoryType.ImageClassifier && (
        <TrainingImagePage
          resetView={resetView}
          resetModelId={resetModelId}
          modelId={modelId}
        />
      )}
      {modelCategoryType === AiModelCategoryType.SpeechClassifier && (
        <TrainingVoicePage
          resetView={resetView}
          resetModelId={resetModelId}
          modelId={modelId}
        />
      )}
      {modelCategoryType === AiModelCategoryType.NumberClassifier && (
        <TrainingModiPage
          resetView={resetView}
          resetModelId={resetModelId}
          modelId={modelId}
        />
      )}
    </section>
  );
}

export default TrainingContainer;
