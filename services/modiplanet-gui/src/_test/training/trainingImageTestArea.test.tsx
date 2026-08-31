import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import TestArea from '@src/pages/training/image/components/test-area';
import TestDataInputs from '@src/pages/training/image/components/test-area/test-data-inputs';
import { useLearningModel } from '@src/store/zustand';

const mockImageData = {} as ImageData;

vi.mock(
  '@src/pages/training/image/components/classfier-card/image-upload-buttons',
  () => ({
    __esModule: true,
    default: ({
      uploadWay,
      isEnabledTest = true,
      onClickFile,
      onClickCamera,
    }: {
      uploadWay: string | null;
      isEnabledTest?: boolean;
      onClickFile: () => void;
      onClickCamera: () => void;
    }) => (
      <div>
        <button disabled={!isEnabledTest} onClick={onClickFile}>
          test file {uploadWay}
        </button>
        <button disabled={!isEnabledTest} onClick={onClickCamera}>
          test camera {uploadWay}
        </button>
      </div>
    ),
  }),
);

vi.mock(
  '@src/pages/training/image/components/test-area/test-data-inputs/camera-capture',
  () => ({
    __esModule: true,
    default: ({ onPredict }: { onPredict: (data: ImageData) => void }) => (
      <button onClick={() => onPredict(mockImageData)}>camera input</button>
    ),
  }),
);

vi.mock(
  '@src/pages/training/image/components/test-area/test-data-inputs/image-capture',
  () => ({
    __esModule: true,
    default: ({ onPredict }: { onPredict: (data: ImageData) => void }) => (
      <button onClick={() => onPredict(mockImageData)}>file input</button>
    ),
  }),
);

const setImageModel = (model: any) => {
  act(() => {
    useLearningModel.setState({ model });
  });
};

describe('[트레이닝] 이미지 테스트 영역', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setImageModel(null);
  });

  test('학습된 모델이 없으면 테스트 입력 버튼을 비활성화한다.', () => {
    // Given & When
    render(<TestArea />);

    // Then
    expect(screen.getByText('TRAIN_MODEL_FIRST')).toBeVisible();
    expect(screen.getByRole('button', { name: /test file/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /test camera/ })).toBeDisabled();
  });

  test('파일 테스트 입력으로 모델 추론 결과를 표시한다.', async () => {
    // Given
    const infer = vi.fn().mockResolvedValue(
      new Map<string, number>([
        ['Cat', 0.8765],
        ['Dog', 0.1234],
      ]),
    );
    setImageModel({ infer });

    render(<TestArea />);

    // When
    fireEvent.click(screen.getByRole('button', { name: /test file/ }));
    fireEvent.click(screen.getByRole('button', { name: 'file input' }));

    // Then
    await waitFor(() => {
      expect(infer).toHaveBeenCalledWith(mockImageData);
      expect(screen.getByText('Cat')).toBeVisible();
      expect(screen.getByText('87.65%')).toBeVisible();
      expect(screen.getByText('Dog')).toBeVisible();
      expect(screen.getByText('12.34%')).toBeVisible();
    });
  });

  test('입력 방식을 바꾸면 이전 추론 결과를 초기화한다.', async () => {
    // Given
    const infer = vi
      .fn()
      .mockResolvedValue(new Map<string, number>([['A', 1]]));
    setImageModel({ infer });

    render(<TestArea />);

    // When
    fireEvent.click(screen.getByRole('button', { name: /test camera/ }));
    fireEvent.click(screen.getByRole('button', { name: 'camera input' }));

    // Then
    await waitFor(() => {
      expect(screen.getByText('A')).toBeVisible();
      expect(screen.getByText('100%')).toBeVisible();
    });

    // When
    fireEvent.click(screen.getByRole('button', { name: /test file/ }));

    // Then
    expect(screen.queryByText('A')).not.toBeInTheDocument();
  });
});

describe('[트레이닝] 이미지 테스트 입력 분기', () => {
  test('카메라 입력과 파일 입력 컴포넌트를 uploadWay에 맞게 선택한다.', () => {
    // Given
    const onPredict = vi.fn();
    const { rerender } = render(
      <TestDataInputs uploadWay="camera" onPredict={onPredict} />,
    );

    // Then
    expect(screen.getByRole('button', { name: 'camera input' })).toBeVisible();

    // When
    rerender(<TestDataInputs uploadWay="file" onPredict={onPredict} />);

    // Then
    expect(screen.getByRole('button', { name: 'file input' })).toBeVisible();
  });
});
