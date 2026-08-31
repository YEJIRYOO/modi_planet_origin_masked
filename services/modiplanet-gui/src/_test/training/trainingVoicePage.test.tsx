import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import TrainingVoiceContainer from '@src/pages/training/voice/components/training-voice-container';
import TrainingVoicePage from '@src/pages/training/voice';
import VoiceModelSubmitButton from '@src/pages/training/voice/components/voice-model-submit-button';
import {
  useMyModelVoiceClassifier,
  useTrainingLogs,
  useVoiceModel,
} from '@src/store/zustand';

const mockMyModelLazyQuery = vi.fn();
const mockGetMyModelConnection = vi.fn();
const mockSendModelInfo = vi.fn();
const mockSendCloseTrainingPopup = vi.fn();

vi.mock('@src/pages/training/hooks/useMyModelLazy', () => ({
  __esModule: true,
  default: () => ({
    myModelLazyQuery: mockMyModelLazyQuery,
  }),
}));

vi.mock('@src/pages/training/hooks/useMyModelConnectionLazy', () => ({
  __esModule: true,
  default: () => ({
    getMyModelConnection: mockGetMyModelConnection,
  }),
}));

vi.mock('@src/lib/utils/PostMessageSender', () => ({
  __esModule: true,
  default: {
    getInstance: () => ({
      sendModelInfo: (...args: any[]) => mockSendModelInfo(...args),
      sendCloseTrainingPopup: (...args: any[]) =>
        mockSendCloseTrainingPopup(...args),
    }),
  },
}));

vi.mock('@src/pages/training/voice/components/data-area', () => ({
  __esModule: true,
  default: () => <div>voice data area</div>,
}));

vi.mock('@src/pages/training/voice/components/training-area', () => ({
  __esModule: true,
  default: () => <div>voice training area</div>,
}));

vi.mock('@src/pages/training/voice/components/test-area', () => ({
  __esModule: true,
  default: () => <div>voice test area</div>,
}));

vi.mock('react-xarrows', () => ({
  __esModule: true,
  default: () => <span data-testid="xarrow" />,
  Xwrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useXarrow: () => vi.fn(),
}));

const resetVoiceStores = () => {
  act(() => {
    useMyModelVoiceClassifier.getState().reset();
    useVoiceModel.setState({ model: null });
    useTrainingLogs.setState({ logs: [] });
  });
};

const serverModel = {
  id: 'voice-model-1',
  name: '서버 음성 모델',
  modelUrl: 'https://cdn.example.com/model.json',
  epoch: 10,
  batchSize: 8,
  learningRate: 0.01,
  validationDataRate: 0.2,
  classifiers: [
    {
      label: 'A',
      dataset: ['a.wav'],
    },
    {
      label: 'B',
      dataset: ['b.wav'],
    },
  ],
};

describe('[트레이닝] 음성 페이지와 컨테이너', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetVoiceStores();
    mockGetMyModelConnection.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.({
        aiModelConnection: {
          nodes: [{ name: 'NEW_MODEL 1' }, { name: 'NEW_MODEL 2' }],
        },
      });
    });
    mockMyModelLazyQuery.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.({
        aiModel: serverModel,
      });
    });
  });

  test('생성 화면에서 기본 모델명을 만들고 음성 학습 영역을 렌더링한다.', async () => {
    // Given
    const resetModelId = vi.fn();

    // When
    render(<TrainingVoiceContainer modelId="" resetModelId={resetModelId} />);

    // Then
    expect(screen.getByText('voice data area')).toBeVisible();
    expect(screen.getByText('voice training area')).toBeVisible();
    expect(screen.getByText('voice test area')).toBeVisible();
    await waitFor(() => {
      expect(mockGetMyModelConnection).toHaveBeenCalled();
      expect(screen.getByDisplayValue('NEW_MODEL 3')).toBeVisible();
    });
  });

  test('기존 모델 id가 있으면 서버 모델 로드 후 렌더링하고 언마운트 때 상태를 초기화한다.', async () => {
    // Given
    const resetModelId = vi.fn();

    // When
    const { unmount } = render(
      <TrainingVoiceContainer
        modelId="voice-model-1"
        resetModelId={resetModelId}
      />,
    );

    // Then
    await waitFor(() => {
      expect(mockMyModelLazyQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            id: 'voice-model-1',
          },
        }),
      );
      expect(screen.getByDisplayValue('서버 음성 모델')).toBeVisible();
      expect(screen.getByText('voice data area')).toBeVisible();
    });

    // When
    act(() => {
      useTrainingLogs.getState().addLog({ epoch: 1 });
      useVoiceModel.setState({ model: { infer: vi.fn() } as any });
    });
    unmount();

    // Then
    expect(resetModelId).toHaveBeenCalledTimes(1);
    expect(useVoiceModel.getState().model).toBeNull();
    expect(useTrainingLogs.getState().logs).toEqual([]);
    expect(useMyModelVoiceClassifier.getState().modelUrl).toBe('');
  });

  test('헤더 버튼은 뒤로가기와 닫기 이벤트를 전달한다.', () => {
    // Given
    const resetView = vi.fn();

    render(
      <TrainingVoicePage
        resetView={resetView}
        modelId=""
        resetModelId={vi.fn()}
      />,
    );

    // When
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);

    // Then
    expect(resetView).toHaveBeenCalledTimes(1);
    expect(mockSendCloseTrainingPopup).toHaveBeenCalledTimes(1);
  });
});

describe('[트레이닝] 음성 모델 제출 버튼', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetVoiceStores();
  });

  test('모델 URL이 없으면 제출 버튼을 비활성화한다.', () => {
    // Given & When
    render(<VoiceModelSubmitButton />);

    // Then
    expect(screen.getByRole('button', { name: 'CREATE' })).toBeDisabled();
  });

  test('모델 URL이 있으면 모델 정보와 라벨을 전송하고 팝업을 닫는다.', () => {
    // Given
    act(() => {
      useMyModelVoiceClassifier.setState({
        modelName: '음성 모델',
        modelUrl: 'https://cdn.example.com/model.json',
        classifiers: [
          {
            uuid: 'classifier-1',
            label: '박수',
            dataset: ['clap-1.wav', 'clap-2.wav'],
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
      useVoiceModel.setState({ model: { infer: vi.fn() } as any });
    });

    render(<VoiceModelSubmitButton />);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'CREATE' }));

    // Then
    expect(mockSendModelInfo).toHaveBeenCalledWith({
      modelUrl: 'https://cdn.example.com/model.json',
      labels: ['박수', '박수', '휘파람'],
      category: 'VOICE',
      modelName: '음성 모델',
    });
    expect(mockSendCloseTrainingPopup).toHaveBeenCalledTimes(1);
  });
});
