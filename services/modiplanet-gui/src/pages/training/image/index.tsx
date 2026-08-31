import TrainingImageContainer from '@src/pages/training/image/components/training-image-container';
import ImageModelSubmitButton from '@src/pages/training/image/components/image-model-submit-button';
import useTranslator from '@hooks/useTranslator';
import TrainingDetailHeader from '@src/pages/training/components/TrainingDetailHeader';
import PostMessageSender from '@src/lib/utils/PostMessageSender';

interface ITrainingImagePage {
  resetView: () => void;
  resetModelId: () => void;
  modelId: string;
}

function TrainingImagePage({
  resetView,
  modelId,
  resetModelId,
}: ITrainingImagePage) {
  const { t } = useTranslator();
  const postMessageSender = PostMessageSender.getInstance();

  const onClickClose = () => {
    postMessageSender.sendCloseTrainingPopup();
  };

  return (
    <div id="training-image-page" className="absolute inset-0">
      <section className="flex flex-col relative">
        <TrainingDetailHeader
          title={t('TRAINING_IMAGE_MODEL')}
          onClickBack={resetView}
          onClickClose={onClickClose}
        />
        <TrainingImageContainer modelId={modelId} resetModelId={resetModelId} />
      </section>

      <ImageModelSubmitButton />
    </div>
  );
}

export default TrainingImagePage;
