import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import VoiceUploadInputs from '@src/pages/training/voice/components/classfier-card/voice-upload-inputs';
import VoiceViewer from '@src/pages/training/voice/components/classfier-card/voice-viewer';
import { useWaveSurferStore } from '@src/store/zustand/ai/useWavesurferStore';

const mockWaveSurferCreate = vi.fn();
const mockWaveSurfers: any[] = [];

vi.mock('wavesurfer.js', () => ({
  __esModule: true,
  default: {
    create: (...args: any[]) => mockWaveSurferCreate(...args),
  },
}));

vi.mock(
  '@src/pages/training/voice/components/classfier-card/voice-upload-inputs/mic-uploader',
  () => ({
    __esModule: true,
    default: ({
      time,
      addVoiceUrls,
      setIsTimeDisabled,
    }: {
      time: string;
      addVoiceUrls: (urls: string[]) => void;
      setIsTimeDisabled: (value: boolean) => void;
    }) => (
      <div>
        <span>mic uploader {time}</span>
        <button onClick={() => addVoiceUrls(['mic.wav'])}>add mic</button>
        <button onClick={() => setIsTimeDisabled(true)}>lock time</button>
      </div>
    ),
  }),
);

vi.mock(
  '@src/pages/training/voice/components/classfier-card/voice-upload-inputs/voice-file-uploader',
  () => ({
    __esModule: true,
    default: ({
      editableVoiceUrl,
      addVoiceUrls,
    }: {
      editableVoiceUrl: string;
      addVoiceUrls: (urls: string[]) => void;
    }) => (
      <div>
        <span>file uploader {editableVoiceUrl}</span>
        <button onClick={() => addVoiceUrls(['file.wav'])}>add file</button>
      </div>
    ),
  }),
);

const createWaveSurfer = () => {
  const handlers: Record<string, (value?: any) => void> = {};
  const waveSurfer = {
    on: vi.fn((event: string, handler: (value?: any) => void) => {
      handlers[event] = handler;
      if (event === 'ready') {
        handler();
      }
    }),
    getDuration: vi.fn(() => 65),
    destroy: vi.fn(),
    play: vi.fn(),
    stop: vi.fn(),
    isPlaying: vi.fn(() => false),
    emit: (event: string, value?: any) => handlers[event]?.(value),
  };

  mockWaveSurfers.push(waveSurfer);
  return waveSurfer;
};

describe('[트레이닝] 음성 데이터 뷰어', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWaveSurfers.length = 0;
    mockWaveSurferCreate.mockImplementation(createWaveSurfer);
    act(() => {
      useWaveSurferStore.setState({
        waveSurfers: {},
        playingWsId: null,
      });
    });
  });

  test('음성 썸네일을 만들고 재생, 삭제, 편집 선택을 처리한다.', async () => {
    // Given
    const deleteVoiceUrl = vi.fn();
    const updateEditVoiceUrl = vi.fn();
    const { container, unmount } = render(
      <VoiceViewer
        classifierId="classifier-1"
        uploadWay="file"
        isGridView
        dataset={['voice-a.wav', 'voice-b.wav']}
        deleteVoiceUrl={deleteVoiceUrl}
        updateEditVoiceUrl={updateEditVoiceUrl}
        editableVoiceUrl="voice-a.wav"
      />,
    );

    // Then
    await waitFor(() => {
      expect(screen.getAllByText('1:05')).toHaveLength(2);
    });
    expect(mockWaveSurferCreate).toHaveBeenCalledTimes(2);

    // When
    fireEvent.click(screen.getAllByAltText('Play')[0]);

    // Then
    expect(mockWaveSurfers[0].play).toHaveBeenCalledTimes(1);

    // When
    const overlays = container.querySelectorAll('.absolute.inset-0');
    fireEvent.click(overlays[0]);
    fireEvent.click(screen.getAllByRole('button')[2]);

    // Then
    expect(updateEditVoiceUrl).toHaveBeenCalledWith('voice-a.wav');
    expect(deleteVoiceUrl).toHaveBeenCalledWith(1);

    // When
    act(() => {
      mockWaveSurfers[0].emit('finish');
    });
    unmount();

    // Then
    expect(mockWaveSurfers[0].destroy).toHaveBeenCalledTimes(1);
  });

  test('마이크 업로드 상태에서 썸네일을 클릭하면 편집 음성을 초기화한다.', async () => {
    // Given
    const updateEditVoiceUrl = vi.fn();
    const { container } = render(
      <VoiceViewer
        classifierId="classifier-1"
        uploadWay="mic"
        isGridView
        dataset={['voice-a.wav']}
        deleteVoiceUrl={vi.fn()}
        updateEditVoiceUrl={updateEditVoiceUrl}
        editableVoiceUrl=""
      />,
    );

    // When
    await screen.findByText('1:05');
    const overlays = container.querySelectorAll('.absolute.inset-0');
    fireEvent.click(overlays[0]);

    // Then
    expect(updateEditVoiceUrl).toHaveBeenCalledWith('');
  });
});

describe('[트레이닝] 음성 업로드 입력 분기', () => {
  test('업로드 방식에 맞는 입력 컴포넌트를 렌더링한다.', () => {
    // Given
    const addVoiceUrls = vi.fn();
    const setIsTimeDisabled = vi.fn();
    const { rerender } = render(
      <VoiceUploadInputs
        uploadWay={null}
        addVoiceUrls={addVoiceUrls}
        isDatasetMaxCount
        time="2"
        setIsTimeDisabled={setIsTimeDisabled}
        editableVoiceUrl=""
        classifierId="classifier-1"
      />,
    );

    // Then
    expect(screen.queryByText(/uploader/)).not.toBeInTheDocument();

    // When
    rerender(
      <VoiceUploadInputs
        uploadWay="mic"
        addVoiceUrls={addVoiceUrls}
        isDatasetMaxCount
        time="2"
        setIsTimeDisabled={setIsTimeDisabled}
        editableVoiceUrl=""
        classifierId="classifier-1"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'add mic' }));
    fireEvent.click(screen.getByRole('button', { name: 'lock time' }));

    // Then
    expect(screen.getByText('mic uploader 2')).toBeVisible();
    expect(addVoiceUrls).toHaveBeenCalledWith(['mic.wav']);
    expect(setIsTimeDisabled).toHaveBeenCalledWith(true);

    // When
    rerender(
      <VoiceUploadInputs
        uploadWay="file"
        addVoiceUrls={addVoiceUrls}
        isDatasetMaxCount
        time="2"
        setIsTimeDisabled={setIsTimeDisabled}
        editableVoiceUrl="editable.wav"
        classifierId="classifier-1"
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'add file' }));

    // Then
    expect(screen.getByText('file uploader editable.wav')).toBeVisible();
    expect(addVoiceUrls).toHaveBeenCalledWith(['file.wav']);
  });
});
