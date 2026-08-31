import { LearningMobilenet } from 'learning_model';

import { adjustDrawingSize } from '@src/lib/utils/utils';

export type TModelVariables = LearningMobilenet;

interface IModelTrainProps {
  epochs?: number;
  batchSize?: number;
  learningRate?: number;
  validationDataRate?: number;
  classifierData: Array<{ label: string; imgUrl: string }>;
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

const useLearningImageModel = () => {
  const getImageDataFromInternalURL = (internalUrl: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(internalUrl);
        const arrayBuffer = new Uint8ClampedArray(await response.arrayBuffer());
        const imageBitmap = await createImageBitmap(
          new Blob([arrayBuffer], { type: 'image/jpeg' }),
        );

        const canvas = new OffscreenCanvas(224, 224);
        const context = canvas.getContext('2d', {
          willReadFrequently: true,
        });

        if (!context) {
          throw new Error('Failed to get canvas context');
        }

        const { sx, sy, sWidth, sHeight } = adjustDrawingSize(
          imageBitmap.width,
          imageBitmap.height,
        );

        context.drawImage(imageBitmap, sx, sy, sWidth, sHeight, 0, 0, 224, 224);

        const processedImageData = context.getImageData(0, 0, 224, 224);
        resolve(processedImageData);
      } catch (err) {
        reject(err);
      }
    });
  };

  const addDataToModel = async (
    classifierData: Array<{ label: string; imgUrl: string }>,
    model: TModelVariables,
  ) => {
    const promises = classifierData.map(async ({ label, imgUrl }) => {
      const imageData = await getImageDataFromInternalURL(imgUrl);
      return { label, imageData };
    });
    const results = await Promise.all(promises);

    const addDataPromises = results.map(async ({ label, imageData }) => {
      await model.addData(label, imageData);
    });

    await Promise.all(addDataPromises);
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

export default useLearningImageModel;
