import { TModelSelectViewType } from '@src/pages/training/components/training-select-section';
import CategoryTabButtons from '@src/pages/training/components/training-select-section/training-submit-buttons/category-tab-buttons';
import MyModelTabButtons from '@src/pages/training/components/training-select-section/training-submit-buttons/my-model-tab-buttons';
import { AiModelCategoryType } from '@services/old/generated/graphql';

interface ITrainingSubmitButtons {
  currentView: TModelSelectViewType;
  onCreateMyModel: () => void;
  onRetrainingClick: () => void;
  onCreateAIBlock: () => void;
  categoryButtonDisabled: boolean;
  myModelButtonsDisabled: boolean;
  selectedModelCategoryType: AiModelCategoryType | null;
  changeView: (value: TModelSelectViewType) => void;
}

function TrainingSubmitButtons({
  currentView,
  onCreateMyModel,
  onRetrainingClick,
  onCreateAIBlock,
  categoryButtonDisabled,
  myModelButtonsDisabled,
  selectedModelCategoryType,
  changeView,
}: ITrainingSubmitButtons) {
  return (
    <div className="sticky bottom-0 left-0 right-0 flex-center h-[108px] bg-form-bg">
      {currentView === 'category' && (
        <CategoryTabButtons
          disabled={categoryButtonDisabled}
          onCreateMyModel={onCreateMyModel}
          selectedModelCategoryType={selectedModelCategoryType}
          changeView={changeView}
        />
      )}

      {currentView === 'my-model' && (
        <MyModelTabButtons
          disabled={myModelButtonsDisabled}
          onRetrainingClick={onRetrainingClick}
          onCreateAIBlock={onCreateAIBlock}
        />
      )}
    </div>
  );
}

export default TrainingSubmitButtons;
