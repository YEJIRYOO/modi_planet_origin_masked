import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ModelCategoriesComponent from '@src/pages/training/components/training-select-section/model-categories/model-categories-component';
import {
  AiModelCategoryType,
  MachineLearningType,
} from '@src/services/old/generated/graphql';
import { TAIModelCategories } from '@src/services/old/schema/types';

const createCategory = (
  type: AiModelCategoryType,
  imageUrl: string,
): TAIModelCategories[number] => ({
  __typename: 'AIModelCategory',
  id: type,
  description: `${type} desc`,
  machineLearningType: MachineLearningType.SupervisedLearning,
  imageUrl,
  name: type,
  type,
});

describe('[트레이닝] 모델 카테고리 목록', () => {
  test('활성화된 모델 카테고리만 표시하고 선택된 카드는 활성 스타일을 적용한다.', () => {
    render(
      <ModelCategoriesComponent
        selectedModelCategoryType={AiModelCategoryType.SpeechClassifier}
        onClickModelCategory={vi.fn()}
        AIModelCategories={[
          createCategory(AiModelCategoryType.ImageClassifier, '/image.svg'),
          createCategory(AiModelCategoryType.SpeechClassifier, '/voice.svg'),
          createCategory(AiModelCategoryType.NumberClassifier, '/modi.svg'),
          createCategory(AiModelCategoryType.TextClassifier, '/text.svg'),
        ]}
      />,
    );

    expect(screen.getByText('MODEL_IMAGE_TITLE')).toBeVisible();
    expect(screen.getByText('MODEL_VOICE_TITLE')).toBeVisible();
    expect(screen.getByText('MODEL_MODI_TITLE')).toBeVisible();
    expect(screen.queryByText('MODEL_TEXT_TITLE')).toBeNull();
    expect(
      screen.getByRole('button', { name: /MODEL_VOICE_TITLE/ }),
    ).toHaveClass('bg-brand', 'text-white');
  });

  test('모델 카테고리를 클릭하면 해당 타입을 전달한다.', () => {
    const onClickModelCategory = vi.fn();

    render(
      <ModelCategoriesComponent
        selectedModelCategoryType={null}
        onClickModelCategory={onClickModelCategory}
        AIModelCategories={[
          createCategory(AiModelCategoryType.NumberClassifier, '/modi.svg'),
        ]}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: /MODEL_MODI_TITLE/ }));

    expect(onClickModelCategory).toHaveBeenCalledWith(
      AiModelCategoryType.NumberClassifier,
    );
  });
});
