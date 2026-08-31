import {
  SaveAiModelMutation,
  useUpdateAiModelMutation,
} from '@services/old/generated/graphql';
import { ApolloError } from '@apollo/client';

interface IUpdateMyModelProps {
  modelId: string;
  modelName: string;
  modelUrl: string;
  epoch: number;
  batchSize: number;
  learningRate: number;
  validationDataRate: number;
  classifiers: Array<{
    label: string;
    dataset: Array<string>;
  }>;
  onCompleted?: (data: SaveAiModelMutation) => void;
  onError?: (err: ApolloError) => void;
}

const useUpdateMyModel = () => {
  const [updateMyModelMutation] = useUpdateAiModelMutation();

  const updateMyModel = async ({
    modelId,
    modelName,
    classifiers,
    onError = () => {},
    onCompleted = () => {},
    ...rest
  }: IUpdateMyModelProps) => {
    const filteredClassifiers = classifiers.map(({ label, dataset }) => ({
      label,
      dataset,
    }));
    try {
      await updateMyModelMutation({
        variables: {
          input: {
            ...rest,
            id: modelId,
            name: modelName,
            platClassifiers: filteredClassifiers,
          },
        },
      });
    } catch (err) {
      console.log('@@update my model err', err);
      throw err;
    }
  };

  return { updateMyModel };
};

export default useUpdateMyModel;
