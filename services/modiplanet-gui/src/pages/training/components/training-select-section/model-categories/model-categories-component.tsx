import ModelCategoryCard from '@src/pages/training/components/training-select-section/model-categories/model-category-card';
import { TAIModelCategories } from '@services/old/schema/types';
import { AiModelCategoryType } from '@services/old/generated/graphql';
import useTranslator from '@hooks/useTranslator';
import React from 'react';

interface IModelCategoriesComponent {
  onClickModelCategory: (type: AiModelCategoryType) => void;
  selectedModelCategoryType: AiModelCategoryType | null;
  AIModelCategories: TAIModelCategories;
}

const ENABLED_AI_CATEGORIES: Array<AiModelCategoryType> = [
  AiModelCategoryType.ImageClassifier,
  AiModelCategoryType.SpeechClassifier,
  AiModelCategoryType.NumberClassifier,
];

function ModelCategoriesComponent({
  onClickModelCategory,
  selectedModelCategoryType,
  AIModelCategories,
}: IModelCategoriesComponent) {
  const handleClickCard = (type: AiModelCategoryType) => () => {
    onClickModelCategory(type);
  };
  const { t } = useTranslator();

  const glossary = {
    [AiModelCategoryType.ImageClassifier]: {
      title: t('MODEL_IMAGE_TITLE'),
      desc: t('MODEL_IMAGE_DESC'),
    },
    [AiModelCategoryType.TextClassifier]: {
      title: t('MODEL_TEXT_TITLE'),
      desc: t('MODEL_TEXT_DESC'),
    },
    [AiModelCategoryType.SpeechClassifier]: {
      title: t('MODEL_VOICE_TITLE'),
      desc: t('MODEL_VOICE_DESC'),
    },
    [AiModelCategoryType.NumberClassifier]: {
      title: t('MODEL_MODI_TITLE'),
      desc: t('MODEL_MODI_DESC'),
    },
  };

  return (
    <>
      <div className="flex-between flex gap-[24px] flex-wrap">
        {AIModelCategories.map((modelCategory) => {
          const { type, imageUrl, id } = modelCategory;

          // ENABLED_AI_CATEGORIES에 없는 항목 건너뛰기
          if (!ENABLED_AI_CATEGORIES.includes(type)) {
            return null;
          }

          return (
            <ModelCategoryCard
              thumbnail={imageUrl}
              modelType={type}
              key={id}
              onClick={handleClickCard(type)}
              isActive={selectedModelCategoryType === type}
              isPreParing={!ENABLED_AI_CATEGORIES.includes(type)}
              title={glossary[type].title}
              desc={glossary[type].desc}
            />
          );
        })}
      </div>
    </>
  );
}

export default ModelCategoriesComponent;
