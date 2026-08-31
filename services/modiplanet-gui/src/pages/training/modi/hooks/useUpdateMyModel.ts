import {
  SaveAiModelMutation,
  useUpdateAiModelMutation,
} from '@services/old/generated/graphql';
import { ApolloError } from '@apollo/client';
import { ModiRecordedData } from '@src/lib/types/modi-data';

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
    dataset: Array<ModiRecordedData>;
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
    try {
      const formattedClassifiers = classifiers.map(({ label, dataset }) => {
        const stringifiedDataset = dataset.map((item) => JSON.stringify(item));

        return {
          label,
          dataset: stringifiedDataset,
        };
      });

      await updateMyModelMutation({
        variables: {
          input: {
            ...rest,
            id: modelId,
            name: modelName,
            platClassifiers: formattedClassifiers,
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
