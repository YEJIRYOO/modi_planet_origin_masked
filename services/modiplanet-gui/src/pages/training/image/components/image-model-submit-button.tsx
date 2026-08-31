import Button from '@components/ui_old/button/button';
import {
  useLearningModel,
  useMyModelImageClassifier,
} from '@src/store/zustand';
import { useMemo } from 'react';

import useTranslator from '@hooks/useTranslator';
import PostMessageSender from '@src/lib/utils/PostMessageSender';
import { useUpdateAiModelMutation } from '@services/old/generated/graphql';

interface IImageModelSubmitButton {}

function ImageModelSubmitButton({}: IImageModelSubmitButton) {
  const { model } = useLearningModel();
  const { modelUrl, classifiers, modelName, modelId, isCreationModel } =
    useMyModelImageClassifier((state) => ({
      modelUrl: state.modelUrl,
      modelName: state.modelName,
      classifiers: state.classifiers,
      modelId: state.modelId,
      isCreationModel: state.isCreationModel,
    }));
  const [updateAiModel] = useUpdateAiModelMutation();
  const postMessageSender = PostMessageSender.getInstance();
  const { t } = useTranslator();
  const isDisabled = useMemo(() => {
    return !modelUrl || !modelUrl;
  }, [modelUrl, model]);

  const labels = useMemo(() => {
    let labels: Array<string> = [];

    classifiers.forEach(({ label, dataset }) => {
      dataset.forEach(() => {
        labels.push(label);
      });
    });

    return labels;
  }, [classifiers]);

  const onSubmit = async () => {
    if (!isCreationModel && modelId) {
      try {
        await updateAiModel({
          variables: { input: { id: modelId, name: modelName } },
        });
      } catch (err) {
        console.error('@@update model name err', err);
      }
    }

    postMessageSender.sendModelInfo({
      modelUrl,
      labels,
      category: 'IMAGE',
      modelName,
    });
    postMessageSender.sendCloseTrainingPopup();
  };

  return (
    <div className="fixed bottom-[24px] left-[50%] -translate-x-1/2">
      <Button onClick={onSubmit} className="w-[174px]" disabled={isDisabled}>
        {t('CREATE')}
      </Button>
    </div>
  );
}

export default ImageModelSubmitButton;
