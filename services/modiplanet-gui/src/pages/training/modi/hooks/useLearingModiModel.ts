import * as tf from '@tensorflow/tfjs';
import { io } from '@tensorflow/tfjs-core';
import { LearningMobilenet } from 'learning_model';
import axios from 'axios';
import { Chart, ChartData, ChartOptions } from 'chart.js';

export type TDataModelVariables = LearningMobilenet;

interface IModelTrainProps {
  epochs?: number;
  batchSize?: number;
  learningRate?: number;
  validationDataRate?: number;
  classifierData: Array<{ label: string; data: any }>;
  onProgress?: (progress: number) => void;
  onLoss?: (loss: number) => void;
  onTrainBegin?: (log: any) => void;
  onTrainEnd?: (log: any, model: TDataModelVariables) => void;
  onEpochEnd?: (epoch: number, log: any) => void;
}

interface IModelLoadProps {
  jsonUrl: string;
  labels: Array<string>;
  onSuccess?: (model: TDataModelVariables) => void;
  onError?: (error: any) => void;
}

const useLearningModiModel = () => {
  const generateChartImageData = (
    data: any,
    label: string,
  ): Promise<ImageData> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 224;
      canvas.height = 224;
      const context = canvas.getContext('2d', { willReadFrequently: true });

      if (!context) {
        return;
      }

      const chartData: ChartData<'line'> = {
        labels: data.data.map((item: any) =>
          new Date(item.time).toLocaleTimeString(),
        ),
        datasets: [
          {
            data: data.data.map((item: any) => item.value),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
        ],
      };

      const options: ChartOptions<'line'> = {
        responsive: false,
        maintainAspectRatio: false,
        devicePixelRatio: 1,
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            min: data.min,
            max: data.max,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        layout: {
          padding: 0,
        },
        animation: {
          duration: 0,
          onComplete: () => {
            const context = canvas.getContext('2d');
            const imageData = context!.getImageData(0, 0, 224, 224);

            resolve(imageData);
          },
        },
      };

      new Chart(context, {
        type: 'line',
        data: chartData,
        options: options,
      });
    });
  };

  const addDataToModel = async (
    classifierData: Array<{ label: string; data: any }>,
    model: TDataModelVariables,
  ) => {
    const promises = classifierData.map(async ({ label, data }) => {
      const imageData = await generateChartImageData(data, label);

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
    generateChartImageData,
  };
};

export default useLearningModiModel;
