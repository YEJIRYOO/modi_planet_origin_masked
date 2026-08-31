import { render, waitFor } from '@testing-library/react';
import { useEffect } from 'react';

import useAIModelUpload from '@src/pages/training/image/hooks/useAIModelUpload';
import useLearningImageModel from '@src/pages/training/image/hooks/useLearningImageModel';
import useSaveMyModel from '@src/pages/training/image/hooks/useSaveMyModel';
import useUpdateMyModel from '@src/pages/training/image/hooks/useUpdateMyModel';

const mockSaveAiModelMutation = vi.fn();
const mockUpdateAiModelMutation = vi.fn();
const mockMultiUploadFileMutation = vi.fn();
const mockLearningMobilenet = vi.fn();
const modelInstances: any[] = [];
const mockProcessedImageData = {
  width: 224,
  height: 224,
  data: new Uint8ClampedArray(224 * 224 * 4),
} as ImageData;

vi.mock('@src/services/gen/gen', () => ({
  useSaveAiModelMutation: () => [mockSaveAiModelMutation],
}));

vi.mock('@services/old/generated/graphql', () => ({
  UploadFileType: {
    Data: 'DATA',
  },
  useUpdateAiModelMutation: () => [mockUpdateAiModelMutation],
  useMultiUploadFileMutation: () => [mockMultiUploadFileMutation],
}));

vi.mock('learning_model', () => ({
  LearningMobilenet: function (...args: any[]) {
    return mockLearningMobilenet(...args);
  },
}));

function HookHarness<T>({
  useHook,
  onReady,
}: {
  useHook: () => T;
  onReady: (value: T) => void;
}) {
  const value = useHook();

  useEffect(() => {
    onReady(value);
  }, [value, onReady]);

  return null;
}

const renderHookHarness = <T,>(useHook: () => T) => {
  let hookValue: T | undefined;

  render(
    <HookHarness
      useHook={useHook}
      onReady={(value) => {
        hookValue = value;
      }}
    />,
  );

  return {
    get current() {
      if (!hookValue) {
        throw new Error('hook is not ready');
      }
      return hookValue;
    },
  };
};

const createLearningModel = (options: any) => {
  const instance: any = {
    options,
    init: vi.fn().mockResolvedValue(undefined),
    load: vi.fn().mockResolvedValue(undefined),
    addData: vi.fn().mockResolvedValue(undefined),
    train: vi.fn(async () => {
      instance.onTrainBegin?.({ started: true });
      instance.onProgress?.(1);
      instance.onLoss?.(0.25);
      instance.onEpochEnd?.(1, { loss: 0.25 });
      instance.onTrainEnd?.({ loss: 0.1 });
    }),
  };

  modelInstances.push(instance);
  return instance;
};

const installImageProcessingMocks = () => {
  global.fetch = vi.fn().mockResolvedValue({
    arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)),
  }) as any;
  (global as any).createImageBitmap = vi.fn().mockResolvedValue({
    width: 320,
    height: 240,
  });
  (global as any).OffscreenCanvas = class {
    width: number;
    height: number;

    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }

    getContext() {
      return {
        drawImage: vi.fn(),
        getImageData: vi.fn(() => mockProcessedImageData),
      };
    }
  };
};

describe('[트레이닝] 이미지 모델 hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    modelInstances.length = 0;
    mockLearningMobilenet.mockImplementation(createLearningModel);
    installImageProcessingMocks();
  });

  test('새 모델 저장 요청 값을 API 입력 형태로 변환한다.', async () => {
    // Given
    const onCompleted = vi.fn();
    const onError = vi.fn();
    const hook = renderHookHarness(useSaveMyModel);

    // When
    await hook.current.saveAIModel({
      modelName: '이미지 모델',
      modelUrl: 'https://cdn.example.com/model.json',
      epoch: 20,
      batchSize: 8,
      learningRate: 0.01,
      validationDataRate: 0.2,
      modelCategoryId: 'category-image',
      classifiers: [
        {
          label: '고양이',
          dataset: ['cat.png'],
        },
      ],
      onCompleted,
      onError,
    });

    // Then
    expect(mockSaveAiModelMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          modelUrl: 'https://cdn.example.com/model.json',
          epoch: 20,
          batchSize: 8,
          learningRate: 0.01,
          validationDataRate: 0.2,
          name: '이미지 모델',
          platClassifiers: [
            {
              label: '고양이',
              dataset: ['cat.png'],
            },
          ],
          aiModelCategoryID: 'category-image',
        },
      },
      onError,
      onCompleted,
    });
  });

  test('기존 모델 업데이트 요청 값을 API 입력 형태로 변환한다.', async () => {
    // Given
    const hook = renderHookHarness(useUpdateMyModel);

    // When
    await hook.current.updateMyModel({
      modelId: 'model-1',
      modelName: '수정된 모델',
      modelUrl: 'https://cdn.example.com/model.json',
      epoch: 10,
      batchSize: 4,
      learningRate: 0.02,
      validationDataRate: 0.1,
      classifiers: [
        {
          label: '강아지',
          dataset: ['dog.png'],
        },
      ],
    });

    // Then
    expect(mockUpdateAiModelMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          modelUrl: 'https://cdn.example.com/model.json',
          epoch: 10,
          batchSize: 4,
          learningRate: 0.02,
          validationDataRate: 0.1,
          id: 'model-1',
          name: '수정된 모델',
          platClassifiers: [
            {
              label: '강아지',
              dataset: ['dog.png'],
            },
          ],
        },
      },
    });
  });

  test('AI 모델 파일 업로드 성공과 실패를 처리한다.', async () => {
    // Given
    const file = new File(['{}'], 'model.json', { type: 'application/json' });
    mockMultiUploadFileMutation.mockResolvedValueOnce({
      data: {
        multiUploadFile: [{ fileUrl: 'https://cdn.example.com/model.json' }],
      },
    });
    const hook = renderHookHarness(useAIModelUpload);

    // When
    const result = await hook.current.uploadAIModel([file]);

    // Then
    expect(result).toEqual([{ fileUrl: 'https://cdn.example.com/model.json' }]);
    expect(mockMultiUploadFileMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          functionType: 'DATA',
          files: [file],
        },
      },
    });

    // Given
    mockMultiUploadFileMutation.mockResolvedValueOnce({ data: undefined });

    // Then
    await expect(hook.current.uploadAIModel([file])).rejects.toThrow();
  });

  test('이미지 모델 학습 시 이미지 데이터를 모델에 추가하고 콜백을 연결한다.', async () => {
    // Given
    const onProgress = vi.fn();
    const onLoss = vi.fn();
    const onTrainBegin = vi.fn();
    const onTrainEnd = vi.fn();
    const onEpochEnd = vi.fn();
    const hook = renderHookHarness(useLearningImageModel);

    // When
    await hook.current.modelTrain({
      epochs: 3,
      batchSize: 2,
      learningRate: 0.03,
      validationDataRate: 0.25,
      classifierData: [
        {
          label: 'A',
          imgUrl: 'a.png',
        },
        {
          label: 'B',
          imgUrl: 'b.png',
        },
      ],
      onProgress,
      onLoss,
      onTrainBegin,
      onTrainEnd,
      onEpochEnd,
    });

    // Then
    const model = modelInstances[0];
    expect(mockLearningMobilenet).toHaveBeenCalledWith({
      epochs: 3,
      batchSize: 2,
      learningRate: 0.03,
      validateRate: 0.25,
    });
    expect(global.fetch).toHaveBeenNthCalledWith(1, 'a.png');
    expect(global.fetch).toHaveBeenNthCalledWith(2, 'b.png');
    expect(model.addData).toHaveBeenNthCalledWith(
      1,
      'A',
      mockProcessedImageData,
    );
    expect(model.addData).toHaveBeenNthCalledWith(
      2,
      'B',
      mockProcessedImageData,
    );
    expect(model.train).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledWith(1);
    expect(onLoss).toHaveBeenCalledWith(0.25);
    expect(onTrainBegin).toHaveBeenCalledWith({ started: true });
    expect(onEpochEnd).toHaveBeenCalledWith(1, { loss: 0.25 });
    expect(onTrainEnd).toHaveBeenCalledWith({ loss: 0.1 }, model);
  });

  test('저장된 이미지 모델을 로드한다.', async () => {
    // Given
    const onSuccess = vi.fn();
    const hook = renderHookHarness(useLearningImageModel);

    // When
    await hook.current.modelLoad({
      jsonUrl: 'https://cdn.example.com/model.json',
      labels: ['A', 'B'],
      onSuccess,
    });

    // Then
    const model = modelInstances[0];
    expect(model.init).toHaveBeenCalledTimes(1);
    expect(model.load).toHaveBeenCalledWith({
      jsonURL: 'https://cdn.example.com/model.json',
      labels: ['A', 'B'],
    });
    expect(onSuccess).toHaveBeenCalledWith(model);
  });

  test('저장된 이미지 모델 로드 실패를 onError로 전달한다.', async () => {
    // Given
    const error = new Error('load failed');
    mockLearningMobilenet.mockImplementationOnce((options: any) => {
      const instance = createLearningModel(options);
      instance.load.mockRejectedValue(error);
      return instance;
    });
    const onError = vi.fn();
    const hook = renderHookHarness(useLearningImageModel);

    // Then
    await expect(
      hook.current.modelLoad({
        jsonUrl: 'broken.json',
        labels: [],
        onError,
      }),
    ).rejects.toThrow('load failed');
    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(error);
    });
  });
});
