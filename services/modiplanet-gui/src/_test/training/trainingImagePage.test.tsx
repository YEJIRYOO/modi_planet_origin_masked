import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import TrainingImagePage from '@src/pages/training/image';
import ImageModelSubmitButton from '@src/pages/training/image/components/image-model-submit-button';
import TrainingImageContainer from '@src/pages/training/image/components/training-image-container';
import {
  useLearningModel,
  useMyModelImageClassifier,
  useTrainingLogs,
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

vi.mock('@src/pages/training/image/components/data-area', () => ({
  __esModule: true,
  default: () => <div>image data area</div>,
}));

vi.mock('@src/pages/training/image/components/training-area', () => ({
  __esModule: true,
  default: () => <div>image training area</div>,
}));

vi.mock('@src/pages/training/image/components/test-area', () => ({
  __esModule: true,
  default: () => <div>image test area</div>,
}));

vi.mock('react-xarrows', () => ({
  __esModule: true,
  default: () => <span data-testid="xarrow" />,
  Xwrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useXarrow: () => vi.fn(),
}));

const resetImageStores = () => {
  act(() => {
    useMyModelImageClassifier.getState().reset();
    useLearningModel.setState({ model: null });
    useTrainingLogs.setState({ logs: [] });
  });
};

const serverModel = {
  id: 'image-model-1',
  name: '서버 이미지 모델',
  modelUrl: 'https://cdn.example.com/model.json',
  epoch: 10,
  batchSize: 8,
  learningRate: 0.01,
  validationDataRate: 0.2,
  classifiers: [
    {
      label: 'A',
      dataset: ['a.png'],
    },
    {
      label: 'B',
      dataset: ['b.png'],
    },
  ],
};

describe('[트레이닝] 이미지 페이지와 컨테이너', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetImageStores();
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

  test('생성 화면에서 기본 모델명을 만들고 이미지 학습 영역을 렌더링한다.', async () => {
    // Given
    const resetModelId = vi.fn();

    // When
    render(<TrainingImageContainer modelId="" resetModelId={resetModelId} />);

    // Then
    expect(screen.getByText('image data area')).toBeVisible();
    expect(screen.getByText('image training area')).toBeVisible();
    expect(screen.getByText('image test area')).toBeVisible();
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
      <TrainingImageContainer
        modelId="image-model-1"
        resetModelId={resetModelId}
      />,
    );

    // Then
    await waitFor(() => {
      expect(mockMyModelLazyQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            id: 'image-model-1',
          },
        }),
      );
      expect(screen.getByDisplayValue('서버 이미지 모델')).toBeVisible();
      expect(screen.getByText('image data area')).toBeVisible();
    });

    // When
    act(() => {
      useTrainingLogs.getState().addLog({ epoch: 1 });
      useLearningModel.setState({ model: { infer: vi.fn() } as any });
    });
    unmount();

    // Then
    expect(resetModelId).toHaveBeenCalledTimes(1);
    expect(useLearningModel.getState().model).toBeNull();
    expect(useTrainingLogs.getState().logs).toEqual([]);
    expect(useMyModelImageClassifier.getState().modelUrl).toBe('');
  });

  test('헤더 버튼은 뒤로가기와 닫기 이벤트를 전달한다.', () => {
    // Given
    const resetView = vi.fn();

    render(
      <TrainingImagePage
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

describe('[트레이닝] 이미지 모델 제출 버튼', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetImageStores();
  });

  test('모델 URL이 없으면 제출 버튼을 비활성화한다.', () => {
    // Given & When
    render(<ImageModelSubmitButton />);

    // Then
    expect(screen.getByRole('button', { name: 'CREATE' })).toBeDisabled();
  });

  test('모델 URL이 있으면 모델 정보와 라벨을 전송하고 팝업을 닫는다.', () => {
    // Given
    act(() => {
      useMyModelImageClassifier.setState({
        modelName: '이미지 모델',
        modelUrl: 'https://cdn.example.com/model.json',
        classifiers: [
          {
            uuid: 'classifier-1',
            label: '고양이',
            dataset: ['cat-1.png', 'cat-2.png'],
          },
          {
            uuid: 'classifier-2',
            label: '강아지',
            dataset: ['dog.png'],
          },
        ],
      });
      useLearningModel.setState({ model: { infer: vi.fn() } as any });
    });

    render(<ImageModelSubmitButton />);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'CREATE' }));

    // Then
    expect(mockSendModelInfo).toHaveBeenCalledWith({
      modelUrl: 'https://cdn.example.com/model.json',
      labels: ['고양이', '고양이', '강아지'],
      category: 'IMAGE',
      modelName: '이미지 모델',
    });
    expect(mockSendCloseTrainingPopup).toHaveBeenCalledTimes(1);
  });
});
