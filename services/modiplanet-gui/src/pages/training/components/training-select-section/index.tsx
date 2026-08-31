import React, { Fragment, useEffect, useState } from 'react';
import TrainingSelectRadio from '@src/pages/training/components/training-select-section/training-select-radio';
import ModelCategoriesComponent from '@src/pages/training/components/training-select-section/model-categories/model-categories-component';
import MyModelList from '@src/pages/training/components/training-select-section/my-model-list';
import ModiData from '@src/pages/training/components/training-select-section/modi-data';
import TrainingSubmitButtons from '@src/pages/training/components/training-select-section/training-submit-buttons';
import { TAIModelCategories } from '@services/old/schema/types';
import { AiModelCategoryType } from '@services/old/generated/graphql';
import useMyModelLazy from '@src/pages/training/hooks/useMyModelLazy';
import { MODI_DATA_RECORD_REQUEST } from '@src/lib/constants/etc';
import useTranslator from '@hooks/useTranslator';
import { useLocation } from 'react-router-dom';
import PostMessageSender, {
  ModelCategoryType,
} from '@src/lib/utils/PostMessageSender';
import PostMessageReceiver from '@src/lib/utils/PostMessageReceiver';
import RecordingDim from '../RecordingDim';
import { isModiApp } from '@lib/utils/utils';

interface ITrainingSelectSection {
  onCreateMyModel: (type: AiModelCategoryType) => void;
  AIModelCategories: TAIModelCategories;
  onRetrainingMyModel: (type: AiModelCategoryType, modelId: string) => void;
}

export type TModelSelectViewType = 'category' | 'my-model' | 'modi-data';

function TrainingSelectSection({
  onCreateMyModel,
  AIModelCategories,
  onRetrainingMyModel,
}: ITrainingSelectSection) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const viewType = queryParams.get('viewtype');

  const [selectedViewType, setSelectedViewType] =
    useState<TModelSelectViewType>(() => {
      if (['category', 'my-model', 'modi-data'].includes(viewType ?? '')) {
        return viewType as TModelSelectViewType;
      }

      return 'category';
    });
  const [selectedModelCategoryType, setSelectedModelCategoryType] =
    useState<AiModelCategoryType | null>(null);
  const [selectedMyModel, setSelectedMyModel] = useState<{
    id: string;
    type: AiModelCategoryType;
  } | null>(null);
  const { myModelLazyQuery } = useMyModelLazy();
  const postMessageSender = PostMessageSender.getInstance();
  const postMessageReceiver = PostMessageReceiver.getInstance();
  const [isDimmed, setIsDimmed] = useState(false);
  const { t } = useTranslator();

  useEffect(() => {
    const handleModiDataRecordRequest = () => {
      if (selectedViewType === 'modi-data') {
        postMessageSender.sendModiDataRecordResponse({
          isRecording: true,
        });
      } else {
        // 새로만들기, 나의 모델에서 기록하기 누를 경우
        postMessageSender.sendModiDataRecordResponse({
          isRecording: false,
        });
      }
    };
    postMessageReceiver.on(
      MODI_DATA_RECORD_REQUEST,
      handleModiDataRecordRequest,
    );

    return () => {
      postMessageReceiver.off(
        MODI_DATA_RECORD_REQUEST,
        handleModiDataRecordRequest,
      );
    };
  }, []);

  const resetSelectedState = () => {
    setSelectedModelCategoryType(null);
    setSelectedMyModel(null);
  };

  const onClickRadio = (viewType: TModelSelectViewType) => {
    setSelectedViewType(viewType);
    resetSelectedState();
  };

  const onClickModelCategory = (modelType: AiModelCategoryType) => {
    setSelectedModelCategoryType(modelType);
  };

  const onClickMyModel = (type: AiModelCategoryType, modelId: string) => {
    setSelectedMyModel({
      id: modelId,
      type: type,
    });
  };

  const onClickCreateCard = () => {
    onClickRadio('category');
  };

  const handleCreateMyModel = () => {
    if (!selectedModelCategoryType) return;

    onCreateMyModel(selectedModelCategoryType);
  };

  const handleRetrainingMyModel = () => {
    if (!selectedMyModel) return;
    onRetrainingMyModel(selectedMyModel.type, selectedMyModel.id);
  };

  const handleCreateAIBlock = async () => {
    if (!selectedMyModel) return;
    try {
      const { data } = await myModelLazyQuery({
        variables: {
          id: selectedMyModel.id,
        },
      });
      let labels: Array<string> = [];

      const modelUrl = data!.aiModel.modelUrl;
      const modelType = data!.aiModel.aiModelCategory.type;
      const modelName = data!.aiModel.name;
      const modiType = data!.aiModel.moduleType;
      data!.aiModel.classifiers.forEach(({ label, dataset }) => {
        dataset.forEach(() => {
          labels.push(label);
        });
      });

      let type: ModelCategoryType = 'IMAGE';

      switch (modelType) {
        case AiModelCategoryType.ImageClassifier: {
          type = 'IMAGE';
          break;
        }
        case AiModelCategoryType.SpeechClassifier: {
          type = 'VOICE';
          break;
        }
        case AiModelCategoryType.NumberClassifier: {
          type = 'NUMBER';
          break;
        }
      }

      postMessageSender.sendModelInfo({
        modelUrl,
        labels,
        category: type,
        modelName,
        modiType: modiType,
      });
      postMessageSender.sendCloseTrainingPopup();
    } catch (err) {
      console.log('@@onCreate AIBlock err', err);
      throw err;
    }
  };

  const changeView = (value: TModelSelectViewType) => {
    setSelectedViewType(value);
  };

  const handleCancel = () => {
    setIsDimmed(false);
    PostMessageSender.getInstance().sendModiDataRecordResponse({
      isRecording: false,
    });
  };

  return (
    <Fragment>
      {isDimmed && selectedViewType === 'modi-data' && !isModiApp() && (
        <RecordingDim onCancel={handleCancel} />
      )}
      <section className="m-0-auto w-full max-w-[1920px] pt-[40px] px-[16px] flex-1 relative overflow-y-auto">
        <TrainingSelectRadio
          onClickRadio={onClickRadio}
          currentViewType={selectedViewType}
        />

        <div className="m-0-auto">
          {selectedViewType === 'category' && (
            <ModelCategoriesComponent
              AIModelCategories={AIModelCategories}
              onClickModelCategory={onClickModelCategory}
              selectedModelCategoryType={selectedModelCategoryType}
            />
          )}
        </div>

        {selectedViewType === 'my-model' && (
          <MyModelList
            onClickCreateCard={onClickCreateCard}
            onClickMyModel={onClickMyModel}
            selectedMyModel={selectedMyModel}
          />
        )}

        {selectedViewType === 'modi-data' && (
          <ModiData setIsDimmed={setIsDimmed} />
        )}
      </section>

      {selectedViewType !== 'modi-data' && (
        <TrainingSubmitButtons
          categoryButtonDisabled={!selectedModelCategoryType}
          myModelButtonsDisabled={!selectedMyModel}
          onCreateMyModel={handleCreateMyModel}
          onRetrainingClick={handleRetrainingMyModel}
          onCreateAIBlock={handleCreateAIBlock}
          currentView={selectedViewType}
          changeView={changeView}
          selectedModelCategoryType={selectedModelCategoryType}
        />
      )}
    </Fragment>
  );
}

export default TrainingSelectSection;
