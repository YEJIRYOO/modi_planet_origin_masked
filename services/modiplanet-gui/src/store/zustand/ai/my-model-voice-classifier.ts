import { create } from 'zustand';
import { getUuid } from '@src/lib/utils/utils';
import { TAiModel } from '@services/old/schema/types';
import { immer } from 'zustand/middleware/immer';

export type TVoiceClassifier = {
  uuid: string;
  label: string;
  dataset: Array<string>;
  editableVoiceUrl: string;
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

type TUseMyModelVoiceClassifierState = {
  isCreationModel: boolean;
  modelId: string;
  modelName: string;
  classifiers: Array<TVoiceClassifier>;
  modelUrl: string;
  modelParams: TMyModelParams;
};

type TTUseMyModelVoiceClassifierActions = {
  setMyModelFromServer: (myModel: TAiModel) => void;
  addClassifier: () => void;
  deleteClassifier: (uuid: string) => void;
  updateClassifierLabel: (uuid: string, label: string) => void;
  addClassifierVoiceUrls: (uuid: string, dataset: Array<string>) => void;
  deleteClassifierVoiceUrl: (uuid: string, itemIndex: number) => void;
  updateEditableVoiceUrl: (uuid: string, url: string) => void;
  updateModelName: (name: string) => void;
  updateModelParams: (
    key: keyof TMyModelParams,
    value: number | undefined,
  ) => void;
  updateModelId: (modelId: string) => void;
  updateCreationMode: (value: boolean) => void;
  updateModelUrl: (modelUrl: string) => void;
  reset: () => void;
};

const getDefaultVoiceClassifier = () => {
  return {
    uuid: getUuid(),
    label: '',
    dataset: [],
    editableVoiceUrl: '',
  };
};

const initMyModelVoiceClassifierState: TUseMyModelVoiceClassifierState = {
  isCreationModel: true,
  modelId: '',
  modelName: '',
  modelUrl: '',
  modelParams: {
    epoch: DEFAULT_TRAINING_PARAMS.EPOCH,
    batchSize: DEFAULT_TRAINING_PARAMS.BATCH_SIZE,
    learningRate: DEFAULT_TRAINING_PARAMS.LEARNING_RATE,
    validationDataRate: DEFAULT_TRAINING_PARAMS.VALIDATION_DATA_RATE,
  },
  classifiers: [getDefaultVoiceClassifier(), getDefaultVoiceClassifier()],
};

export const useMyModelVoiceClassifier = create(
  immer<TUseMyModelVoiceClassifierState & TTUseMyModelVoiceClassifierActions>(
    (set) => ({
      ...initMyModelVoiceClassifierState,

      addClassifier: () =>
        set(({ classifiers }) => ({
          classifiers: [...classifiers, getDefaultVoiceClassifier()],
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
      addClassifierVoiceUrls: (targetUuid, voiceUrls) =>
        set(({ classifiers }) => {
          const updatedClassifiers = classifiers.map((classifier) => {
            if (classifier.uuid === targetUuid) {
              const newDataset = [...voiceUrls, ...classifier.dataset];
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
      deleteClassifierVoiceUrl: (targetUuid, itemIndex) => {
        set(({ classifiers }) => {
          const updatedClassifiers = classifiers.map((classifier) => {
            if (classifier.uuid === targetUuid) {
              const updatedVoiceUrls = classifier.dataset.filter(
                (_, index) => index !== itemIndex,
              );

              return {
                ...classifier,
                dataset: updatedVoiceUrls,
              };
            }
            return classifier;
          });

          return {
            classifiers: updatedClassifiers,
          };
        });
      },
      updateEditableVoiceUrl: (targetUuid, url) => {
        set(({ classifiers }) => {
          const updatedClassifiers = classifiers.map((classifier) => {
            if (classifier.uuid === targetUuid) {
              return {
                ...classifier,
                editableVoiceUrl: url,
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
        set(initMyModelVoiceClassifierState);
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
          } = aiModel;
          const convertedClassifiers: Array<TVoiceClassifier> = classifiers.map(
            ({ label, dataset }) => {
              return {
                uuid: getUuid(),
                label: label,
                dataset: dataset,
                editableVoiceUrl: '',
              };
            },
          );
          const convertedMyModel: TUseMyModelVoiceClassifierState = {
            modelId: id,
            modelName: name,
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
    }),
  ),
);
