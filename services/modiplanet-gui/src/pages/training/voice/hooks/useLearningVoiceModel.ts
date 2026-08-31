import { LearningMobilenet } from 'learning_model';
import useDrawWaveform from './useDrawWaveform';

export type TModelVariables = LearningMobilenet;

interface IModelTrainProps {
  epochs?: number;
  batchSize?: number;
  learningRate?: number;
  validationDataRate?: number;
  classifierData: Array<{ label: string; voiceUrl: string }>;
  onProgress?: (progress: number) => void;
  onLoss?: (loss: number) => void;
  onTrainBegin?: (log: any) => void;
  onTrainEnd?: (log: any, model: TModelVariables) => void;
  onEpochEnd?: (epoch: number, log: any) => void;
}

interface IModelLoadProps {
  jsonUrl: string;
  labels: Array<string>;
  onSuccess?: (model: TModelVariables) => void;
  onError?: (error) => void;
}

const useLearningVoiceModel = () => {
  const { getImageUrlFromWaveSurfer } = useDrawWaveform();

  const addDataToModel = async (
    classifierData: Array<{ label: string; voiceUrl: string }>,
    model: TModelVariables,
  ) => {
    // 순차 처리: 브라우저 AudioContext 동시 생성 제한(~6개) 초과 방지
    for (const { label, voiceUrl } of classifierData) {
      const imageData = await getImageUrlFromWaveSurfer(voiceUrl);
      await model.addData(label, imageData);
    }
  };

  const modelLoad = async ({
    jsonUrl,
    labels = [],
    onSuccess = () => {},
    onError = () => {},
  }: IModelLoadProps) => {
    try {
      const model = new LearningMobilenet({});

      await model.init();

      await model.load({
        jsonURL: jsonUrl,
        labels: labels,
      });

      onSuccess(model);
    } catch (err) {
      console.log('@@model load err', err);
      onError(err);
      throw err;
    }
  };

  const modelTrain = async ({
    epochs = 10,
    batchSize = 16,
    learningRate = 0.001,
    validationDataRate = 0.2,
    classifierData,
    onProgress = (epoch: number) => {},
    onLoss = () => {},
    onTrainEnd = () => {},
    onTrainBegin = () => {},
    onEpochEnd = () => {},
  }: IModelTrainProps) => {
    try {
      const model = new LearningMobilenet({
        epochs,
        batchSize,
        learningRate,
        validateRate: validationDataRate,
      });

      await model.init();

      model.onProgress = onProgress;
      model.onLoss = onLoss;
      model.onEpochEnd = onEpochEnd;
      model.onTrainBegin = onTrainBegin;
      model.onTrainEnd = (log) => {
        onTrainEnd(log, model);
      };

      await addDataToModel(classifierData, model);

      await model.train();
    } catch (err) {
      throw err;
    }
  };

  return {
    modelTrain,
    modelLoad,
  };
};

export default useLearningVoiceModel;
