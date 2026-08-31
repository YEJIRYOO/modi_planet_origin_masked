import DataArea from '@src/pages/training/voice/components/data-area';
import TrainingArea from '@src/pages/training/voice/components/training-area';
import TestArea from '@src/pages/training/voice/components/test-area';
import { Xwrapper } from 'react-xarrows';
import { useVoiceModel, useMyModelVoiceClassifier, useTrainingLogs } from '@src/store/zustand';
import { useEffect } from 'react';
import useMyModelLazy from '@src/pages/training/hooks/useMyModelLazy';
import ModelName from '@src/pages/training/voice/components/ModelName';

interface TrainingVoiceContainer {
  modelId: string;
  resetModelId: () => void;
}

function TrainingVoiceContainer({
  modelId,
  resetModelId,
}: TrainingVoiceContainer) {
  const [modelUrl, setMyModelFromServer, resetMyModelVoiceClassifier] =
    useMyModelVoiceClassifier((state) => [
      state.modelUrl,
      state.setMyModelFromServer,
      state.reset,
    ]);
  const clearModel = useVoiceModel((state) => state.clearModel);
  const clearLogs = useTrainingLogs((state) => state.clearLogs);
  const { myModelLazyQuery } = useMyModelLazy();

  useEffect(() => {
    clearLogs();

    return () => {
      resetModelId();
      resetMyModelVoiceClassifier();
      clearModel();
      clearLogs();
    };
  }, []);

  useEffect(() => {
    if (modelId) {
      getMyModel(modelId);
    }
  }, [modelId]);

  const getMyModel = async (modelId: string) => {
    try {
      await myModelLazyQuery({
        variables: {
          id: modelId,
        },
        onCompleted: ({ aiModel }) => {
          setMyModelFromServer(aiModel);
        },
      });
    } catch (err) {
      console.log('@@getMyModel err', err);
      throw err;
    }
  };

  if (modelId && !modelUrl) return null;

  return (
    <section className="flex-1 bg-form-bg">
      <section className="max-w-[1920px] m-0-auto overflow-y-auto overflow-hidden">
        <div className="max-w-[1416px] mx-auto py-[16px] px-[16px]">
          <div className="flex-center">
            <ModelName isCreatePage={!modelId} />
          </div>

          <Xwrapper>
            <div className="flex justify-between gap-[36px] px-[36px] overflow-x-auto relative">
              <DataArea />

              <TrainingArea />

              <TestArea />
            </div>
          </Xwrapper>
        </div>
      </section>
    </section>
  );
}

export default TrainingVoiceContainer;
