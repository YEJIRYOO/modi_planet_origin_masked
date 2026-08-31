import { ApolloError } from '@apollo/client';
import {
  SaveAiModelMutation,
  useSaveAiModelMutation,
} from '@src/services/gen/gen';

interface ISaveAIModelProps {
  modelName: string;
  modelUrl: string;
  epoch: number;
  batchSize: number;
  learningRate: number;
  validationDataRate: number;
  modelCategoryId: string;
  classifiers: Array<{
    label: string;
    dataset: Array<string>;
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
    const filteredClassifiers = classifiers.map(({ label, dataset }) => ({
      label,
      dataset,
    }));
    await saveAIModelMutation({
      variables: {
        input: {
          ...rest,
          name: modelName,
          platClassifiers: filteredClassifiers,
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
