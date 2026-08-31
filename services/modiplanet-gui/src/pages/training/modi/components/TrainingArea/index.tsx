import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import ArrowLine from '@components/ui_old/arrow-line/arrow-line';
import { TEST_AREA_ARROW_ENDPOINT_ID } from '@src/pages/training/modi/components/TestArea';
import { ChevronDown } from '@src/lib/newAssets';
import useLearningModiModel, {
  TDataModelVariables,
} from '../../hooks/useLearingModiModel';

import {
  useMyModelModiClassifier,
  useDataModel,
  useSelectedModelCategory,
  useTrainingLogs,
  useProfileStore,
} from '@src/store/zustand';

import TrainingOptionsContainer from '@src/pages/training/modi/components/TrainingArea/TrainingOptions/training-options-container';
import * as tf from '@tensorflow/tfjs';
import useSaveMyModel from '@src/pages/training/modi/hooks/useSaveMyModel';
import useAIModelUpload from '@src/pages/training/modi/hooks/useAIModelUpload';
import {
  deepCopy,
  getUuid,
  removePropsRecursively,
} from '@src/lib/utils/utils';
import useUpdateMyModel from '@src/pages/training/modi/hooks/useUpdateMyModel';
import TrainingStartButtonContainer from '@src/pages/training/modi/components/TrainingArea/TrainingStartButton/TrainingStartButtonContainer';
import { TDataClassifier } from '@src/store/zustand/ai/my-model-modi-classifier';
import useClickElementDetection from '@hooks/useClickElementDetection';
import useTranslator from '@hooks/useTranslator';
import {
  MIN_COUNT_CLASSIFIERS,
  MIN_COUNT_DATA_IN_CLASSIFIER,
} from '@src/lib/constants/etc';
import TrainingGuide from '@src/pages/training/modi/components/TrainingArea/TrainingGuide';
import { useAIUploader } from '@hooks/upload/useAIUploader';
import { Errorhandler } from '@src/lib/utils/error';
import CModalOneButton from '@src/components/ui/Modal/CModalOneButton';
import { useDisclosure } from '@nextui-org/react';
import { useCheckAIModelNameDuplicateLazy } from '@services/api/ai/useCheckAIModelNameDuplicateLazy';

export const TRAINING_AREA_ARROW_ENDPOINT_ID = 'training-area-arrow-endpoint';

interface TrainingArea {
  isDimmed: boolean;
}

function TrainingArea({ isDimmed }: TrainingArea) {
  const startPointRef = useRef<HTMLDivElement | null>(null);
  const trainingCardRef = useRef<HTMLDivElement | null>(null);
  const {
    isCreationModel,
    modelId,
    modelName,
    modelUrl,
    modelParams,
    classifiers,
    updateModelId,
    updateModelUrl,
    modiType,
    updateCreationMode,
  } = useMyModelModiClassifier((state) => ({
    isCreationModel: state.isCreationModel,
    modelId: state.modelId,
    modelName: state.modelName,
    modelUrl: state.modelUrl,
    modiType: state.modiType,
    modelParams: state.modelParams,
    classifiers: state.classifiers,
    updateModelId: state.updateModelId,
    updateModelUrl: state.updateModelUrl,
    updateCreationMode: state.updateCreationMode,
  }));
  const { isClicked } = useClickElementDetection(trainingCardRef, isDimmed);
  const [isFocused, setIsFocused] = useState(false);
  const profile = useProfileStore((state) => state.profile);

  const [isOptionView, setIsOptionView] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [originalModelName, setOriginalModelName] = useState(modelName);

  const [addLog, clearLogs] = useTrainingLogs((state) => [
    state.addLog,
    state.clearLogs,
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const modelCategory = useSelectedModelCategory(
    (state) => state.modelCategory,
  );
  const [model, setModel] = useDataModel((state) => [
    state.model,
    state.setModel,
  ]);
  const { saveAIModel } = useSaveMyModel();
  const { updateMyModel } = useUpdateMyModel();
  const { uploadAIModel } = useAIModelUpload();
  const { modelTrain, modelLoad } = useLearningModiModel();
  const { t } = useTranslator();

  const { uploadAIFile } = useAIUploader();
  const { checkAIModelNameDuplicate } = useCheckAIModelNameDuplicateLazy();

  useEffect(() => {
    setIsFocused(isClicked);
  }, [isClicked]);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onOpenChange: onErrorOpenChange,
    onClose: onErrorClose,
  } = useDisclosure();

  useEffect(() => {
    if (!isCreationModel && modelUrl && !model) {
      loadTrainedMyModel(modelUrl, classifiers);
    }
  }, [isCreationModel, modelUrl, model]);

  const isEnabledTraining = useMemo(() => {
    const hasEnoughClassifiers = classifiers.length >= MIN_COUNT_CLASSIFIERS;
    const hasEnoughData = classifiers.every(
      (classifier) => classifier.dataset.length >= MIN_COUNT_DATA_IN_CLASSIFIER,
    );
    return hasEnoughClassifiers && hasEnoughData;
  }, [classifiers]);

  useEffect(() => {
    if (!isEnabledTraining) {
      setIsCompleted(false);
    }
  }, [isEnabledTraining]);

  const loadTrainedMyModel = async (
    modelUrl: string,
    classifiers: Array<TDataClassifier>,
  ) => {
    try {
      const labels: Array<string> = classifiers.map(({ label }) => label);
      const onLoadSuccess = (model: TDataModelVariables) => setModel(model);
      await modelLoad({
        jsonUrl: modelUrl,
        labels,
        onSuccess: onLoadSuccess,
        onError: () => {},
      });
    } catch (err) {}
  };

  const saveOrUpdateMyModel = async (modelUrl: string) => {
    const { epoch, validationDataRate, learningRate, batchSize } = modelParams;

    try {
      const deepCopiedClassifiers = deepCopy(classifiers);
      const removeUuidClassifiers = removePropsRecursively(
        deepCopiedClassifiers,
        ['uuid'],
      );

      const modelData = {
        modelUrl,
        modelName,
        classifiers: removeUuidClassifiers,
        epoch: epoch || 0,
        learningRate: learningRate || 0,
        validationDataRate: validationDataRate || 0,
        batchSize: batchSize || 0,
        moduleType: modiType,
      };

      if (isCreationModel) {
        await saveAIModel({
          ...modelData,
          modelCategoryId: modelCategory?.id || '',
          onCompleted: ({ saveAIModel: { id } }) => {
            updateModelId(id);
            setOriginalModelName(modelName);
          },
          onError(err) {
            const error = new Errorhandler(err);

            error.getCodes().forEach((e) => {
              if (e === 409) {
                onOpen();
              }
            });
          },
        });
        updateCreationMode(false);
      } else {
        await updateMyModel({ ...modelData, modelId: modelId });
      }

      updateModelUrl(modelUrl);
    } catch (err) {
      throw err;
    } finally {
      resetProgressState();
    }
  };

  const resetProgressState = () => {
    setIsRunning(false);
    setCurrentEpoch(0);
  };

  const onEpochEnd = (epoch: number, log: any) => {
    addLog({ epoch, ...log });
  };

  const onTrainBegin = () => {
    clearLogs();
  };

  const onTrainEnd = async (_: any, model: TDataModelVariables) => {
    setModel(model);
    try {
      await model.saveModel(
        tf.io.withSaveHandler(async (modelArtifacts): Promise<any> => {
          const uuid = getUuid();
          const weightData = modelArtifacts.weightData as tf.io.WeightData;
          let weightBlob: Blob;

          if (!profile?.userId) {
            throw new Error('유저 없음');
          }
          if (Array.isArray(weightData)) {
            weightBlob = new Blob([...weightData], {
              type: 'application/octet-stream',
            });
          } else {
            weightBlob = new Blob([weightData], {
              type: 'application/octet-stream',
            });
          }
          const weightFile = new File(
            [weightBlob],
            `${profile.userId}_${uuid}.weight.bin`,
          );
          const weightFileData = await uploadAIFile({
            userId: profile.userId,
            file: weightFile,
          });
          const pathBinFile = (
            weightFileData.fileUrl.match(/\/([^/]+\.bin)$/i) as any
          )[1];

          const modelJson = JSON.stringify({
            ...modelArtifacts,
            weightsManifest: [
              {
                paths: [`./${pathBinFile}`],
                weights: [...(modelArtifacts.weightSpecs as any)],
              },
            ],
          });
          const modelJsonBlob = new Blob([modelJson], {
            type: 'application/json',
          });
          const jsonFile = new File(
            [modelJsonBlob],
            `${profile.userId}_${uuid}.json`,
          );

          const jsonFileData = await uploadAIFile({
            userId: profile.userId,
            file: jsonFile,
          });

          await saveOrUpdateMyModel(jsonFileData.fileUrl);

          resetProgressState();

          return {
            modelArtifactsInfo: {
              dateSaved: new Date(),
              modelTopologyType: 'JSON',
            },
          };
        }),
      );
    } catch (err) {
      console.log('@@save model err', err);
    }

    setIsCompleted(true);
  };

  const validateTrainingParams = () => {
    const { epoch, batchSize, learningRate } = modelParams;

    if (
      !epoch ||
      !batchSize ||
      !learningRate ||
      epoch === 0 ||
      batchSize === 0 ||
      learningRate === 0 ||
      !Number.isInteger(epoch) ||
      !Number.isInteger(batchSize)
    ) {
      return false;
    }
    return true;
  };

  const executeTraining = async () => {
    try {
      // 유효성 검사
      if (!validateTrainingParams()) {
        onErrorOpen();
        return;
      }

      const shouldCheckDuplicate =
        isCreationModel ||
        (!isCreationModel && modelName !== originalModelName);

      if (shouldCheckDuplicate) {
        const isDuplicate = await checkAIModelNameDuplicate({
          name: modelName,
        });

        if (isDuplicate) {
          onOpen();
          return;
        }
      }

      setIsRunning(true);
      setModel(null);

      const data = classifiers.flatMap(({ label, dataset }) =>
        dataset.map((data) => ({ label, data })),
      );

      await modelTrain({
        epochs: modelParams.epoch || 0,
        batchSize: modelParams.batchSize || 0,
        learningRate: modelParams.learningRate || 0,
        validationDataRate: modelParams.validationDataRate || 0,
        classifierData: data,
        onProgress: (epoch) => setCurrentEpoch(epoch),
        onTrainEnd: onTrainEnd,
        onTrainBegin: onTrainBegin,
        onEpochEnd: onEpochEnd,
        onLoss: (loss) => {
          console.log('Loss:', loss);
        },
      });
    } catch (err) {
      resetProgressState();
      onErrorOpen();
    }
  };

  return (
    <Fragment>
      <div className="w-[300px] shrink-0">
        <h2 className="p2-b mb-[20px]">{t('TRAINING')}</h2>

        <div
          className={`border rounded-20 relative duration-200 ${
            isFocused ? 'bg-brand_4 border-brand' : 'bg-white'
          }`}
          ref={trainingCardRef}
        >
          <div
            id={TRAINING_AREA_ARROW_ENDPOINT_ID}
            className="absolute left-0 top-[75px]"
          />
          <div className="arrow-startpoint absolute right-0 top-0 bottom-0">
            <div className="absolute top-[75px]" ref={startPointRef} />
          </div>
          <div className="pt-[30px] px-[30px]">
            <p className="text-center mb-[20px]">
              <TrainingGuide
                isEnabledTraining={isEnabledTraining}
                isCompleted={isCompleted}
                isRunning={isRunning}
              />
            </p>
            <div className="mb-[16px]">
              <TrainingStartButtonContainer
                currentEpoch={currentEpoch}
                totalEpoch={modelParams.epoch || 0}
                isRunning={isRunning}
                isEnabledTraining={isEnabledTraining}
                onClick={executeTraining}
              />
            </div>
          </div>
          <div className="border-t px-[30px] py-[16px]">
            <div
              role="button"
              className="flex justify-between items-center"
              onClick={() => setIsOptionView(!isOptionView)}
            >
              <span className="p3-r">{t('ADVANCED')}</span>
              <ChevronDown
                className={`${isOptionView && 'rotate-180'} w-[24px] h-[24px]`}
              />
            </div>
            <TrainingOptionsContainer
              isRunning={isRunning}
              isOptionView={isOptionView}
            />
          </div>
        </div>
      </div>
      <ArrowLine start={startPointRef} end={TEST_AREA_ARROW_ENDPOINT_ID} />

      <CModalOneButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClickOk={onClose}
        hideCloseButton={false}
      >
        <div className="p3-m mb-[60px] whitespace-pre">
          {t('ALREADY_USED_MODEL_NAME_DESC')}
        </div>
      </CModalOneButton>

      <CModalOneButton
        isOpen={isErrorOpen}
        onOpenChange={onErrorOpenChange}
        onClickOk={onErrorClose}
        hideCloseButton={false}
      >
        <div className="p3-m mb-[60px] whitespace-pre">
          {t('ERROR_OCCURED')}
        </div>
      </CModalOneButton>
    </Fragment>
  );
}

export default TrainingArea;
