import { create } from 'zustand';
import { getUuid } from '@src/lib/utils/utils';
import { TAiModel } from '@services/old/schema/types';
import { immer } from 'zustand/middleware/immer';
import { ModiRecordedData } from '@src/lib/types/modi-data';

export type TDataClassifier = {
  uuid: string;
  label: string;
  dataset: Array<ModiRecordedData>;
};

const DEFAULT_TRAINING_PARAMS = {
  EPOCH: 50,
  BATCH_SIZE: 16,
  LEARNING_RATE: 0.001,
  VALIDATION_DATA_RATE: 0.15,
};

export type TMyModelParams = {
  epoch: number | undefined;
  batchSize: number | undefined;
  learningRate: number | undefined;
  validationDataRate: number | undefined;
};

type TUseMyModelModiClassifierState = {
  isCreationModel: boolean;
  modelId: string;
  modelName: string;
  classifiers: Array<TDataClassifier>;
  modelUrl: string;
  modiType?: string | null;
  modelParams: TMyModelParams;
};

type TTUseMyModelModiClassifierActions = {
  setMyModelFromServer: (myModel: TAiModel) => void;
  addClassifier: () => void;
  deleteClassifier: (uuid: string) => void;
  updateClassifierLabel: (uuid: string, label: string) => void;
  addClassifierModiData: (uuid: string, dataset: Array<ModiRecordedData>) => void;
  deleteClassifierModiUrl: (uuid: string, itemIndex: number) => void;
  updateModelName: (name: string) => void;
  updateModelParams: (
    key: keyof TMyModelParams,
    value: number | undefined,
  ) => void;
  updateModelId: (modelId: string) => void;
  updateCreationMode: (value: boolean) => void;
  updateModelUrl: (modelUrl: string) => void;
  updateModiType: (modiType?: string | null) => void;
  reset: () => void;
};

const getDefaultModiClassifier = () => {
  return {
    uuid: getUuid(),
    label: '',
    dataset: [],
  };
};

const initMyModelModiClassifierState: TUseMyModelModiClassifierState = {
  isCreationModel: true,
  modelId: '',
  modelName: '',
  modelUrl: '',
  modiType: '',
  modelParams: {
    epoch: DEFAULT_TRAINING_PARAMS.EPOCH,
    batchSize: DEFAULT_TRAINING_PARAMS.BATCH_SIZE,
    learningRate: DEFAULT_TRAINING_PARAMS.LEARNING_RATE,
    validationDataRate: DEFAULT_TRAINING_PARAMS.VALIDATION_DATA_RATE,
  },
  classifiers: [getDefaultModiClassifier(), getDefaultModiClassifier()],
};

export const useMyModelModiClassifier = create(
  immer<TUseMyModelModiClassifierState & TTUseMyModelModiClassifierActions>(
    (set) => ({
      ...initMyModelModiClassifierState,

      addClassifier: () =>
        set(({ classifiers }) => ({
          classifiers: [...classifiers, getDefaultModiClassifier()],
        })),
      deleteClassifier: (targetUuid) =>
        set(({ classifiers }) => ({
          classifiers: classifiers.filter(({ uuid }) => uuid !== targetUuid),
        })),
      updateClassifierLabel: (targetUuid, label) =>
        set(({ classifiers }) => {
          const updatedClassifiers = classifiers.map((classifier) => {
            if (classifier.uuid === targetUuid) {
              return {
                ...classifier,
                label,
              };
            }
            return classifier;
          });

          return {
            classifiers: updatedClassifiers,
          };
        }),
      addClassifierModiData: (targetUuid, modiData) =>
        set(({ classifiers }) => {
          const updatedClassifiers = classifiers.map((classifier) => {
            if (classifier.uuid === targetUuid) {
              const newDataset = [...modiData, ...classifier.dataset];
              const DATASET_MAX_COUNT = 50;

              const limitedDataset = newDataset.slice(0, DATASET_MAX_COUNT);

              return {
                ...classifier,
                dataset: limitedDataset,
              };
            }
            return classifier;
          });

          return {
            classifiers: updatedClassifiers,
          };
        }),
      deleteClassifierModiUrl: (targetUuid, itemIndex) => {
        set(({ classifiers }) => {
          const updatedClassifiers = classifiers.map((classifier) => {
            if (classifier.uuid === targetUuid) {
              const updatedModiUrls = classifier.dataset.filter(
                (_, index) => index !== itemIndex,
              );

              return {
                ...classifier,
                dataset: updatedModiUrls,
              };
            }
            return classifier;
          });

          return {
            classifiers: updatedClassifiers,
          };
        });
      },
      reset: () => {
        set(initMyModelModiClassifierState);
      },
      updateModelName: (name) =>
        set(() => ({
          modelName: name,
        })),
      setMyModelFromServer: (aiModel) =>
        set(() => {
          const {
            id,
            modelUrl,
            name,
            epoch,
            batchSize,
            learningRate,
            validationDataRate,
            classifiers,
            moduleType,
          } = aiModel;

          const convertedClassifiers: Array<TDataClassifier> = classifiers.map(
            ({ label, dataset }) => {
              const parsedDataset = dataset.map((item) => {
                let parsedItem;
                try {
                  parsedItem = JSON.parse(item);
                  if (typeof parsedItem.data === 'string') {
                    parsedItem.data = JSON.parse(parsedItem.data);
                  }
                } catch (error) {
                  parsedItem = {};
                }
                return parsedItem;
              });

              return {
                uuid: getUuid(),
                label: label,
                dataset: parsedDataset,
              };
            },
          );
          const convertedMyModel: TUseMyModelModiClassifierState = {
            modelId: id,
            modelName: name,
            modiType: moduleType,
            modelParams: {
              epoch: epoch,
              batchSize: batchSize,
              learningRate: learningRate,
              validationDataRate: validationDataRate,
            },
            modelUrl: modelUrl,
            isCreationModel: false,
            classifiers: convertedClassifiers,
          };
          return {
            ...convertedMyModel,
          };
        }),
      updateModelParams: (key, value) =>
        set(({ modelParams }) => {
          return {
            modelParams: {
              ...modelParams,
              [key]: value,
            },
          };
        }),
      updateCreationMode: (value) =>
        set(() => ({
          isCreationModel: value,
        })),
      updateModelId: (modelId) =>
        set(() => ({
          modelId,
        })),
      updateModelUrl: (modelUrl) =>
        set(() => ({
          modelUrl,
        })),
      updateModiType: (modiType?: string | null) =>
        set(() => ({
          modiType,
        })),
    }),
  ),
);
