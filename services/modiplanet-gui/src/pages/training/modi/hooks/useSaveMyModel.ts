import { ApolloError } from '@apollo/client';
import {
  SaveAiModelMutation,
  useSaveAiModelMutation,
} from '@src/services/gen/gen';
import { ModiRecordedData } from '@src/lib/types/modi-data';

interface ISaveAIModelProps {
  modelName: string;
  modelUrl: string;
  epoch: number;
  batchSize: number;
  learningRate: number;
  validationDataRate: number;
  modelCategoryId: string;
  moduleType?: string | null;
  classifiers: Array<{
    label: string;
    dataset: Array<ModiRecordedData>;
  }>;
  onCompleted?: (data: SaveAiModelMutation) => void;
  onError?: (err: ApolloError) => void;
}

const useSaveMyModel = () => {
  const [saveAIModelMutation] = useSaveAiModelMutation();

  const saveAIModel = async ({
    modelName,
    classifiers,
    modelCategoryId,
    onError = () => {},
    onCompleted = () => {},
    ...rest
  }: ISaveAIModelProps) => {
    const modifiedClassifiers = classifiers.map((classifier) => ({
      ...classifier,
      dataset: classifier.dataset.map((data) => JSON.stringify(data)),
    }));

    await saveAIModelMutation({
      variables: {
        input: {
          ...rest,
          name: modelName,
          platClassifiers: modifiedClassifiers,
          aiModelCategoryID: modelCategoryId,
        },
      },
      onError: onError,
      onCompleted: onCompleted,
    });
  };

  return {
    saveAIModel,
  };
};
export default useSaveMyModel;
