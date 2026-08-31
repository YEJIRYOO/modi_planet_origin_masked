import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import TrainingArea from '@src/pages/training/voice/components/training-area';
import {
  useMyModelVoiceClassifier,
  useProfileStore,
  useSelectedModelCategory,
  useTrainingLogs,
  useVoiceModel,
} from '@src/store/zustand';

const mockModelTrain = vi.fn();
const mockModelLoad = vi.fn();
const mockSaveAIModel = vi.fn();
const mockUpdateMyModel = vi.fn();
const mockUploadAIModel = vi.fn();
const mockUploadAIFile = vi.fn();
const mockCheckAIModelNameDuplicate = vi.fn();

vi.mock('@src/pages/training/voice/components/test-area', () => ({
  __esModule: true,
  TEST_AREA_ARROW_ENDPOINT_ID: 'test-area-arrow-endpoint',
  default: () => <div>test area</div>,
}));

vi.mock(
  '@src/pages/training/voice/components/training-area/training-options/training-options-container',
  () => ({
    __esModule: true,
    default: ({ isOptionView }: { isOptionView: boolean }) => (
      <div>
        {isOptionView ? 'training options open' : 'training options closed'}
      </div>
    ),
  }),
);

vi.mock('@src/pages/training/voice/hooks/useLearningVoiceModel', () => ({
  __esModule: true,
  default: () => ({
    modelTrain: mockModelTrain,
    modelLoad: mockModelLoad,
  }),
}));

vi.mock('@src/pages/training/voice/hooks/useSaveMyModel', () => ({
  __esModule: true,
  default: () => ({
    saveAIModel: mockSaveAIModel,
  }),
}));

vi.mock('@src/pages/training/voice/hooks/useUpdateMyModel', () => ({
  __esModule: true,
  default: () => ({
    updateMyModel: mockUpdateMyModel,
  }),
}));

vi.mock('@src/pages/training/voice/hooks/useAIModelUpload', () => ({
  __esModule: true,
  default: () => ({
    uploadAIModel: mockUploadAIModel,
  }),
}));

vi.mock('@hooks/upload/useAIUploader', () => ({
  useAIUploader: () => ({
    uploadAIFile: mockUploadAIFile,
  }),
}));

vi.mock('@services/api/ai/useCheckAIModelNameDuplicateLazy', () => ({
  useCheckAIModelNameDuplicateLazy: () => ({
    checkAIModelNameDuplicate: mockCheckAIModelNameDuplicate,
  }),
}));

vi.mock('@hooks/useClickElementDetection', () => ({
  __esModule: true,
  default: () => ({
    isClicked: true,
  }),
}));

vi.mock('react-xarrows', () => ({
  __esModule: true,
  default: () => <span data-testid="xarrow" />,
  Xwrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useXarrow: () => vi.fn(),
}));

vi.mock('@tensorflow/tfjs', () => ({
  io: {
    withSaveHandler: (save: any) => ({
      save,
    }),
  },
}));

const profile = {
  id: 'profile-1',
  userId: 'user-1',
  birthdate: '',
  name: '모디',
  nickname: '모디',
  countryCallingCode: '+82',
  phoneNumber: '',
  thumbnailUrl: '',
  codingExperienceTypeList: [],
  contactEmail: '',
};

const seedTrainingState = ({
  modelParams = {
    epoch: 3,
    batchSize: 2,
    learningRate: 0.01,
    validationDataRate: 0.2,
  },
  isCreationModel = true,
  modelUrl = '',
  modelId = '',
} = {}) => {
  act(() => {
    useMyModelVoiceClassifier.getState().reset();
    useMyModelVoiceClassifier.setState({
      isCreationModel,
      modelId,
      modelName: '음성 모델',
      modelUrl,
      modelParams,
      classifiers: [
        {
          uuid: 'classifier-1',
          label: '박수',
          dataset: ['clap.wav'],
          editableVoiceUrl: '',
        },
        {
          uuid: 'classifier-2',
          label: '휘파람',
          dataset: ['whistle.wav'],
          editableVoiceUrl: '',
        },
      ],
    });
    useVoiceModel.setState({ model: null });
    useTrainingLogs.setState({ logs: [] });
    useProfileStore.getState().setProfile(profile);
    useSelectedModelCategory.setState({
      modelCategory: {
        id: 'category-voice',
        name: 'VOICE',
      } as any,
    });
  });
};

const createSavableModel = () => ({
  saveModel: vi.fn(async (handler: any) => {
    await handler.save({
      weightData: new ArrayBuffer(8),
      weightSpecs: [],
    });
  }),
});

describe('[트레이닝] 음성 학습 영역', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    seedTrainingState();

    mockCheckAIModelNameDuplicate.mockResolvedValue(false);
    mockUploadAIFile.mockImplementation(async ({ file }) => ({
      fileUrl: `https://cdn.example.com/${file.name}`,
    }));
    mockSaveAIModel.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.({
        saveAIModel: {
          id: 'saved-model-id',
        },
      });
    });
    mockUpdateMyModel.mockResolvedValue(undefined);
    mockModelLoad.mockImplementation(async ({ onSuccess }) => {
      onSuccess?.({ loaded: true });
    });
    mockModelTrain.mockImplementation(
      async ({ onTrainBegin, onProgress, onEpochEnd, onTrainEnd }) => {
        onTrainBegin?.();
        onProgress?.(1);
        onEpochEnd?.(0, {
          acc: 0.9,
          loss: 0.1,
        });
        await onTrainEnd?.({}, createSavableModel());
      },
    );
  });

  test('학습 파라미터가 유효하지 않으면 에러 모달을 보여준다.', async () => {
    // Given
    seedTrainingState({
      modelParams: {
        epoch: 0,
        batchSize: 2,
        learningRate: 0.01,
        validationDataRate: 0.2,
      },
    });

    render(<TrainingArea />);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'TRAIN_MODEL' }));

    // Then
    expect(await screen.findByText('ERROR_OCCURED')).toBeVisible();
    expect(mockModelTrain).not.toHaveBeenCalled();
  });

  test('모델 이름이 중복되면 중복 안내 모달을 보여준다.', async () => {
    // Given
    mockCheckAIModelNameDuplicate.mockResolvedValue(true);

    render(<TrainingArea />);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'TRAIN_MODEL' }));

    // Then
    await waitFor(() => {
      expect(mockCheckAIModelNameDuplicate).toHaveBeenCalledWith({
        name: '음성 모델',
      });
    });
    expect(
      await screen.findByText('ALREADY_USED_MODEL_NAME_DESC'),
    ).toBeVisible();
    expect(mockModelTrain).not.toHaveBeenCalled();
  });

  test('학습 성공 시 모델 파일을 업로드하고 새 모델을 저장한다.', async () => {
    // Given
    render(<TrainingArea />);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'TRAIN_MODEL' }));

    // Then
    await waitFor(() => {
      expect(mockModelTrain).toHaveBeenCalledWith(
        expect.objectContaining({
          epochs: 3,
          batchSize: 2,
          learningRate: 0.01,
          validationDataRate: 0.2,
          classifierData: [
            {
              label: '박수',
              voiceUrl: 'clap.wav',
            },
            {
              label: '휘파람',
              voiceUrl: 'whistle.wav',
            },
          ],
        }),
      );
      expect(mockSaveAIModel).toHaveBeenCalledWith(
        expect.objectContaining({
          modelName: '음성 모델',
          modelCategoryId: 'category-voice',
        }),
      );
    });
    expect(mockUploadAIFile).toHaveBeenCalledTimes(2);
    expect(useMyModelVoiceClassifier.getState().modelId).toBe('saved-model-id');
    expect(useMyModelVoiceClassifier.getState().isCreationModel).toBe(false);
    expect(useMyModelVoiceClassifier.getState().modelUrl).toContain('.json');
    expect(useTrainingLogs.getState().logs).toEqual([
      {
        epoch: 0,
        acc: 0.9,
        loss: 0.1,
      },
    ]);
  });

  test('기존 모델은 modelUrl로 로드하고 재학습 후 업데이트한다.', async () => {
    // Given
    seedTrainingState({
      isCreationModel: false,
      modelId: 'voice-model-1',
      modelUrl: 'https://cdn.example.com/existing.json',
    });

    render(<TrainingArea />);

    // Then
    await waitFor(() => {
      expect(mockModelLoad).toHaveBeenCalledWith(
        expect.objectContaining({
          jsonUrl: 'https://cdn.example.com/existing.json',
          labels: ['박수', '휘파람'],
        }),
      );
      expect(useVoiceModel.getState().model).toEqual({ loaded: true });
    });

    // When
    fireEvent.click(screen.getByRole('button', { name: 'TRAIN_MODEL' }));

    // Then
    await waitFor(() => {
      expect(mockUpdateMyModel).toHaveBeenCalledWith(
        expect.objectContaining({
          modelId: 'voice-model-1',
          modelName: '음성 모델',
        }),
      );
    });
  });

  test('고급 옵션 영역을 열고 닫는다.', () => {
    // Given
    render(<TrainingArea />);

    // Then
    expect(screen.getByText('training options closed')).toBeVisible();

    // When
    fireEvent.click(screen.getByRole('button', { name: /ADVANCED/ }));

    // Then
    expect(screen.getByText('training options open')).toBeVisible();
  });
});
