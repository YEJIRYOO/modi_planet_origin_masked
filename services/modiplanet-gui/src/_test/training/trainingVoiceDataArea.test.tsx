import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import ClassifierCard from '@src/pages/training/voice/components/classfier-card';
import DataArea from '@src/pages/training/voice/components/data-area';
import { useMyModelVoiceClassifier } from '@src/store/zustand';

const mockUpdateXarrow = vi.fn();
let mockIsClicked = true;

vi.mock('react-xarrows', () => ({
  __esModule: true,
  default: () => <span data-testid="xarrow" />,
  Xwrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useXarrow: () => mockUpdateXarrow,
}));

vi.mock('@components/hooks/useClickElementDetection', () => ({
  __esModule: true,
  default: () => ({
    isClicked: mockIsClicked,
  }),
}));

vi.mock('@src/pages/training/voice/components/training-area', () => ({
  __esModule: true,
  TRAINING_AREA_ARROW_ENDPOINT_ID: 'training-area-arrow-endpoint',
  default: () => <div>training area</div>,
}));

vi.mock(
  '@src/pages/training/voice/components/classfier-card/voice-upload-buttons',
  () => ({
    __esModule: true,
    default: ({
      uploadWay,
      onClickFile,
      onClickMic,
    }: {
      uploadWay: string | null;
      onClickFile: () => void;
      onClickMic: () => void;
    }) => (
      <div>
        <button onClick={onClickFile}>file upload {uploadWay}</button>
        <button onClick={onClickMic}>mic upload {uploadWay}</button>
      </div>
    ),
  }),
);

vi.mock(
  '@src/pages/training/voice/components/classfier-card/voice-upload-inputs',
  () => ({
    __esModule: true,
    default: ({
      uploadWay,
      time,
      addVoiceUrls,
      setIsTimeDisabled,
      editableVoiceUrl,
    }: {
      uploadWay: string;
      time: string;
      addVoiceUrls: (urls: string[]) => void;
      setIsTimeDisabled: (value: boolean) => void;
      editableVoiceUrl: string;
    }) => (
      <div data-testid="voice-upload-inputs">
        <span>
          {uploadWay}:{time}:{editableVoiceUrl}
        </span>
        <button onClick={() => addVoiceUrls(['new-voice.wav'])}>
          add voice
        </button>
        <button onClick={() => setIsTimeDisabled(true)}>disable time</button>
      </div>
    ),
  }),
);

vi.mock(
  '@src/pages/training/voice/components/classfier-card/voice-viewer',
  () => ({
    __esModule: true,
    default: ({
      dataset,
      uploadWay,
      deleteVoiceUrl,
      updateEditVoiceUrl,
    }: {
      dataset: string[];
      uploadWay: string | null;
      deleteVoiceUrl: (index: number) => void;
      updateEditVoiceUrl: (url: string) => void;
    }) => (
      <div data-testid="voice-viewer">
        <span>
          {uploadWay ?? 'none'}:{dataset.join(',')}
        </span>
        <button onClick={() => deleteVoiceUrl(0)}>delete voice 0</button>
        <button onClick={() => updateEditVoiceUrl(dataset[0] ?? '')}>
          edit first voice
        </button>
      </div>
    ),
  }),
);

const seedVoiceClassifiers = (count = 2) => {
  act(() => {
    useMyModelVoiceClassifier.getState().reset();
    useMyModelVoiceClassifier.setState({
      classifiers: Array.from({ length: count }, (_, index) => ({
        uuid: `classifier-${index + 1}`,
        label: `Class ${index + 1}`,
        dataset: index === 0 ? ['voice-a.wav'] : [],
        editableVoiceUrl: '',
      })),
    });
  });
};

describe('[트레이닝] 음성 데이터 영역', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsClicked = true;
    seedVoiceClassifiers();
  });

  test('클래스 추가와 최소 클래스 개수 삭제 제한을 처리한다.', async () => {
    // Given
    render(<DataArea />);

    // Then
    expect(screen.getAllByRole('textbox')).toHaveLength(2);

    // When
    fireEvent.click(screen.getByRole('button', { name: /\+ ADD_CLASS/ }));

    // Then
    await waitFor(() => {
      expect(screen.getAllByRole('textbox')).toHaveLength(3);
    });

    // When
    fireEvent.click(screen.getAllByRole('button')[0]);

    // Then
    await waitFor(() => {
      expect(screen.getAllByRole('textbox')).toHaveLength(2);
    });

    // When
    fireEvent.click(screen.getAllByRole('button')[0]);

    // Then
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
  });

  test('클래스가 10개이면 추가 버튼을 숨긴다.', () => {
    // Given
    seedVoiceClassifiers(10);

    // When
    render(<DataArea />);

    // Then
    expect(
      screen.queryByRole('button', { name: /\+ ADD_CLASS/ }),
    ).not.toBeInTheDocument();
  });
});

describe('[트레이닝] 음성 클래스 카드', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsClicked = true;
  });

  test('라벨, 삭제, 음성 데이터 조작 이벤트를 전달한다.', () => {
    // Given
    const onClickDelete = vi.fn();
    const addVoiceUrls = vi.fn();
    const updateLabel = vi.fn();
    const deleteVoiceUrl = vi.fn();
    const updateEditVoiceUrl = vi.fn();

    render(
      <ClassifierCard
        classifierId="classifier-1"
        index={0}
        onClickDelete={onClickDelete}
        dataset={['voice-a.wav']}
        addVoiceUrls={addVoiceUrls}
        label="Class A"
        updateLabel={updateLabel}
        deleteVoiceUrl={deleteVoiceUrl}
        updateEditVoiceUrl={updateEditVoiceUrl}
        editableVoiceUrl=""
      />,
    );

    // When
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Class B' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'delete voice 0' }));
    fireEvent.click(screen.getByRole('button', { name: 'edit first voice' }));
    fireEvent.click(screen.getAllByRole('button')[0]);

    // Then
    expect(updateLabel).toHaveBeenCalledWith('Class B');
    expect(deleteVoiceUrl).toHaveBeenCalledWith(0);
    expect(updateEditVoiceUrl).toHaveBeenCalledWith('voice-a.wav');
    expect(onClickDelete).toHaveBeenCalledTimes(1);
  });

  test('마이크 업로드 시간을 숫자 범위로 보정하고 업로드 입력을 연결한다.', () => {
    // Given
    const addVoiceUrls = vi.fn();
    const updateEditVoiceUrl = vi.fn();

    render(
      <ClassifierCard
        classifierId="classifier-1"
        index={0}
        onClickDelete={vi.fn()}
        dataset={[]}
        addVoiceUrls={addVoiceUrls}
        label="Class A"
        updateLabel={vi.fn()}
        deleteVoiceUrl={vi.fn()}
        updateEditVoiceUrl={updateEditVoiceUrl}
        editableVoiceUrl=""
      />,
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: /mic upload/ }));

    // Then
    expect(screen.getByTestId('voice-upload-inputs')).toHaveTextContent(
      'mic:3:',
    );

    // When
    const timeInput = screen.getByDisplayValue('3');
    fireEvent.change(timeInput, { target: { value: '0.5' } });
    fireEvent.blur(timeInput);

    // Then
    expect(timeInput).toHaveValue('1');

    // When
    fireEvent.change(timeInput, { target: { value: '4' } });
    fireEvent.blur(timeInput);

    // Then
    expect(timeInput).toHaveValue('3');

    // When
    fireEvent.change(timeInput, { target: { value: 'abc' } });
    fireEvent.click(screen.getByRole('button', { name: 'add voice' }));
    fireEvent.click(screen.getByRole('button', { name: /file upload/ }));

    // Then
    expect(timeInput).toHaveValue('3');
    expect(addVoiceUrls).toHaveBeenCalledWith(['new-voice.wav']);
    expect(updateEditVoiceUrl).toHaveBeenCalledWith('');
    expect(screen.getByTestId('voice-upload-inputs')).toHaveTextContent(
      'file:3:',
    );
  });

  test('카드 포커스가 해제되면 업로드 상태와 편집 음성을 초기화한다.', () => {
    // Given
    mockIsClicked = false;
    const updateEditVoiceUrl = vi.fn();

    render(
      <ClassifierCard
        classifierId="classifier-1"
        index={0}
        onClickDelete={vi.fn()}
        dataset={['voice-a.wav']}
        addVoiceUrls={vi.fn()}
        label="Class A"
        updateLabel={vi.fn()}
        deleteVoiceUrl={vi.fn()}
        updateEditVoiceUrl={updateEditVoiceUrl}
        editableVoiceUrl="voice-a.wav"
      />,
    );

    // Then
    expect(updateEditVoiceUrl).toHaveBeenCalledWith('');
    expect(screen.queryByTestId('voice-upload-inputs')).not.toBeInTheDocument();
  });
});
