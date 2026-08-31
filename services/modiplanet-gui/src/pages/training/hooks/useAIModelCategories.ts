import {
  MachineLearningType,
  useAiModelCategoriesQuery,
} from '@services/old/generated/graphql';
import { useMemo } from 'react';
import { TAIModelCategories } from '@services/old/schema/types';

interface IUseAIModelCategories {
  machineLearningTypes?: MachineLearningType[] | MachineLearningType;
}

const useAIModelCategories = ({
  machineLearningTypes = [
    MachineLearningType.ReinforcementLearning,
    MachineLearningType.SupervisedLearning,
    MachineLearningType.UnsupervisedLearning,
  ],
}: IUseAIModelCategories) => {
  const { data, loading, error } = useAiModelCategoriesQuery({
    variables: {
      machineLearningTypes,
    },
  });

  const AIModelCategories = useMemo((): TAIModelCategories | null => {
    if (!data) return null;

    return data.aiModelCategories;
  }, [data]);

  return {
    AIModelCategories,
    loading,
    error,
  };
};

export default useAIModelCategories;
