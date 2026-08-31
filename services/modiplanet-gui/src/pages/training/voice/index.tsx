import TrainingVoiceContainer from '@src/pages/training/voice/components/training-voice-container';
import VoiceModelSubmitButton from '@src/pages/training/voice/components/voice-model-submit-button';
import useTranslator from '@hooks/useTranslator';

import TrainingDetailHeader from '../components/TrainingDetailHeader';
import PostMessageSender from '@src/lib/utils/PostMessageSender';

interface TrainingVoicePage {
  resetView: () => void;
  resetModelId: () => void;
  modelId: string;
}

function TrainingVoicePage({
  resetView,
  modelId,
  resetModelId,
}: TrainingVoicePage) {
  const { t } = useTranslator();
  const postMessageSender = PostMessageSender.getInstance();

  const onClickClose = () => {
    postMessageSender.sendCloseTrainingPopup();
  };
  return (
    <div id="training-image-page" className="absolute inset-0">
      <section className="flex flex-col relative">
        <TrainingDetailHeader
          title={t('TRAINING_VOICE_MODEL')}
          onClickBack={resetView}
          onClickClose={onClickClose}
        />
        <TrainingVoiceContainer modelId={modelId} resetModelId={resetModelId} />
      </section>

      <VoiceModelSubmitButton />
    </div>
  );
}

export default TrainingVoicePage;
