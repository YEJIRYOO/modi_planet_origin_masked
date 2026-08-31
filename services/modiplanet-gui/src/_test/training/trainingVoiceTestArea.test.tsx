import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import TestArea from '@src/pages/training/voice/components/test-area';
import TestDataInputs from '@src/pages/training/voice/components/test-area/test-data-inputs';
import { useVoiceModel } from '@src/store/zustand';

vi.mock(
  '@src/pages/training/voice/components/classfier-card/voice-upload-buttons',
  () => ({
    __esModule: true,
    default: ({
      uploadWay,
      isEnabledTest = true,
      onClickFile,
      onClickMic,
    }: {
      uploadWay: string | null;
      isEnabledTest?: boolean;
      onClickFile: () => void;
      onClickMic: () => void;
    }) => (
      <div>
        <button disabled={!isEnabledTest} onClick={onClickFile}>
          test file {uploadWay}
        </button>
        <button disabled={!isEnabledTest} onClick={onClickMic}>
          test mic {uploadWay}
        </button>
      </div>
    ),
  }),
);

vi.mock(
  '@src/pages/training/voice/components/test-area/test-data-inputs/mic-voice',
  () => ({
    __esModule: true,
    default: ({
      onPredict,
      time,
    }: {
      onPredict: (data: ImageData) => void;
      time: string;
    }) => (
      <button onClick={() => onPredict({} as ImageData)}>
        mic input {time}
      </button>
    ),
  }),
);

vi.mock(
  '@src/pages/training/voice/components/test-area/test-data-inputs/upload-voice',
  () => ({
    __esModule: true,
    default: ({ onPredict }: { onPredict: (data: ImageData) => void }) => (
      <button onClick={() => onPredict({} as ImageData)}>file input</button>
    ),
  }),
);

const setVoiceModel = (model: any) => {
  act(() => {
    useVoiceModel.setState({ model });
  });
};

describe('[트레이닝] 음성 테스트 영역', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setVoiceModel(null);
  });

  test('학습된 모델이 없으면 테스트 입력 버튼을 비활성화한다.', () => {
    // Given & When
    render(<TestArea />);

    // Then
    expect(screen.getByText('TRAIN_MODEL_FIRST')).toBeVisible();
    expect(screen.getByRole('button', { name: /test file/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /test mic/ })).toBeDisabled();
  });

  test('파일 테스트 입력으로 모델 추론 결과를 표시한다.', async () => {
    // Given
    const infer = vi.fn().mockResolvedValue(
      new Map<string, number>([
        ['Class A', 0.8765],
        ['Class B', 0.1234],
      ]),
    );
    setVoiceModel({ infer });

    render(<TestArea />);

    // When
    fireEvent.click(screen.getByRole('button', { name: /test file/ }));
    fireEvent.click(screen.getByRole('button', { name: 'file input' }));

    // Then
    await waitFor(() => {
      expect(infer).toHaveBeenCalledWith({});
      expect(screen.getByText('Class A')).toBeVisible();
      expect(screen.getByText('87.65%')).toBeVisible();
      expect(screen.getByText('Class B')).toBeVisible();
      expect(screen.getByText('12.34%')).toBeVisible();
    });
  });

  test('마이크 테스트 시간은 1초에서 3초 사이로 보정되고 입력 방식을 바꾸면 결과가 초기화된다.', async () => {
    // Given
    const infer = vi
      .fn()
      .mockResolvedValue(new Map<string, number>([['Voice', 1]]));
    setVoiceModel({ infer });

    render(<TestArea />);

    // When
    fireEvent.click(screen.getByRole('button', { name: /test mic/ }));
    const timeInput = screen.getByDisplayValue('3');
    fireEvent.change(timeInput, { target: { value: '.' } });

    // Then
    expect(timeInput).toHaveValue('1.');

    // When
    fireEvent.change(timeInput, { target: { value: '5' } });
    fireEvent.blur(timeInput);
    fireEvent.click(screen.getByRole('button', { name: 'mic input 3' }));

    // Then
    await waitFor(() => {
      expect(screen.getByText('Voice')).toBeVisible();
      expect(screen.getByText('100%')).toBeVisible();
    });

    // When
    fireEvent.click(screen.getByRole('button', { name: /test file/ }));

    // Then
    expect(screen.queryByText('Voice')).not.toBeInTheDocument();
  });
});

describe('[트레이닝] 음성 테스트 입력 분기', () => {
  test('마이크 입력과 파일 입력 컴포넌트를 uploadWay에 맞게 선택한다.', () => {
    // Given
    const onPredict = vi.fn();
    const { rerender } = render(
      <TestDataInputs uploadWay="mic" onPredict={onPredict} time="2" />,
    );

    // Then
    expect(screen.getByRole('button', { name: 'mic input 2' })).toBeVisible();

    // When
    rerender(
      <TestDataInputs uploadWay="file" onPredict={onPredict} time="2" />,
    );

    // Then
    expect(screen.getByRole('button', { name: 'file input' })).toBeVisible();
  });
});
