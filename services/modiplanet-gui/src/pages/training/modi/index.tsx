import TrainingModiContainer from '@src/pages/training/modi/components/TrainingModiContainer';
import ModiModelSubmitButton from '@src/pages/training/modi/components/ModiModelSubmitButton';
import useTranslator from '@hooks/useTranslator';
import TrainingDetailHeader from '../components/TrainingDetailHeader';
import PostMessageSender from '@src/lib/utils/PostMessageSender';

interface TrainingModiPage {
  resetView: () => void;
  resetModelId: () => void;
  modelId: string;
}

function TrainingModiPage({
  resetView,
  modelId,
  resetModelId,
}: TrainingModiPage) {
  const { t } = useTranslator();
  const postMessageSender = PostMessageSender.getInstance();

  const onClickClose = () => {
    postMessageSender.sendCloseTrainingPopup();
  };

  return (
    <div id="training-image-page" className="absolute inset-0">
      <section className="flex flex-col relative">
        <TrainingDetailHeader
          title={t('TRAINING_MODI_MODEL')}
          onClickClose={onClickClose}
          onClickBack={resetView}
        />
        <TrainingModiContainer modelId={modelId} resetModelId={resetModelId} />
      </section>

      <ModiModelSubmitButton />
    </div>
  );
}

export default TrainingModiPage;
