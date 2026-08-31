import DataArea from '@src/pages/training/modi/components/DataArea';
import TrainingArea from '@src/pages/training/modi/components/TrainingArea';
import TestArea from '@src/pages/training/modi/components/TestArea';
import { Xwrapper } from 'react-xarrows';
import { useDataModel, useMyModelModiClassifier, useTrainingLogs } from '@src/store/zustand';
import React, { useEffect, useState } from 'react';
import useMyModelLazy from '@src/pages/training/hooks/useMyModelLazy';
import ModelModuleBadge from '@src/pages/training/modi/components/ModelModuleBadge';
import ModelName from '@src/pages/training/modi/components/ModelName';
import { useModiDataHandler } from '@src/store/zustand/ai/ModiDataHandler';
import PostMessageReceiver from '@src/lib/utils/PostMessageReceiver';
import PostMessageSender from '@src/lib/utils/PostMessageSender';
import {
  MODI_DATA_RECORD_REQUEST,
  MODI_DATA_RECORD_SEND,
  MODI_DATA_RECORD_CANCEL,
} from '@src/lib/constants/etc';
import useTranslator from '@src/components/hooks/useTranslator';
import { ModiRecordedData } from '@src/lib/types/modi-data';
import RecordingDim from '../../components/RecordingDim';
import { isModiApp } from '@lib/utils/utils';

interface TrainingModiContainer {
  modelId: string;
  resetModelId: () => void;
}

function TrainingModiContainer({
  modelId,
  resetModelId,
}: TrainingModiContainer) {
  const [modelUrl, setMyModelFromServer, resetMyModelModiClassifier] =
    useMyModelModiClassifier((state) => [
      state.modelUrl,
      state.setMyModelFromServer,
      state.reset,
    ]);
  const clearModel = useDataModel((state) => state.clearModel);
  const clearLogs = useTrainingLogs((state) => state.clearLogs);
  const { myModelLazyQuery } = useMyModelLazy();
  const addData = useModiDataHandler((state) => state.addData);
  const { t } = useTranslator();
  const [isDimmed, setIsDimmed] = useState(false);

  useEffect(() => {
    clearLogs();

    return () => {
      resetModelId();
      resetMyModelModiClassifier();
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

  useEffect(() => {
    const postMessageReceiver = PostMessageReceiver.getInstance();
    const postMessageSender = PostMessageSender.getInstance();

    const handleModiDataRecordRequest = () => {
      const id = useModiDataHandler.getState().id;
      if (id) {
        postMessageSender.sendModiDataRecordResponse({
          isRecording: true,
        });
        setIsDimmed(true);
      } else {
        postMessageSender.sendModiDataRecordResponse({
          isRecording: false,
          alertMessage: 'ONLY_IN_RESULT',
        });
        setIsDimmed(false);
      }
    };

    const handleModiDataRecordSend = async (data: ModiRecordedData) => {
      setIsDimmed(false);
      try {
        await addData(data);
      } catch (err) {
        console.log('@@handleModiDataRecordSend err', err);
      }
    };

    const handleModiDataRecordCancel = () => {
      postMessageSender.sendModiDataRecordResponse({ isRecording: false });
      setIsDimmed(false);
    };

    postMessageReceiver.on(
      MODI_DATA_RECORD_REQUEST,
      handleModiDataRecordRequest,
    );
    postMessageReceiver.on(MODI_DATA_RECORD_SEND, handleModiDataRecordSend);
    postMessageReceiver.on(MODI_DATA_RECORD_CANCEL, handleModiDataRecordCancel);

    return () => {
      postMessageReceiver.off(
        MODI_DATA_RECORD_REQUEST,
        handleModiDataRecordRequest,
      );
      postMessageReceiver.off(MODI_DATA_RECORD_SEND, handleModiDataRecordSend);
      postMessageReceiver.off(
        MODI_DATA_RECORD_CANCEL,
        handleModiDataRecordCancel,
      );
    };
  }, []);

  if (modelId && !modelUrl) return null;

  const handleCancel = () => {
    setIsDimmed(false);
    PostMessageSender.getInstance().sendModiDataRecordResponse({
      isRecording: false,
    });
  };

  return (
    <>
      {isDimmed && !isModiApp() && <RecordingDim onCancel={handleCancel} />}
      <section className="flex-1 bg-form-bg">
        <section className="max-w-[1920px] m-0-auto overflow-y-auto overflow-hidden">
          <div className="max-w-[1416px] mx-auto py-[16px] px-[16px]">
            <div className="flex-center">
              <ModelModuleBadge />
              <ModelName isCreatePage={!modelId} />
            </div>

            <Xwrapper>
              <div className="flex justify-between gap-[36px] px-[36px] overflow-x-auto relative">
                <DataArea isDimmed={isDimmed} />

                <TrainingArea isDimmed={isDimmed} />

                <TestArea isDimmed={isDimmed} />
              </div>
            </Xwrapper>
          </div>
        </section>
      </section>
    </>
  );
}

export default TrainingModiContainer;
