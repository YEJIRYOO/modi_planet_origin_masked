import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import ClassifierCard from '@src/pages/training/image/components/classfier-card';
import DataArea from '@src/pages/training/image/components/data-area';
import { useMyModelImageClassifier } from '@src/store/zustand';

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

vi.mock('@src/pages/training/image/components/training-area', () => ({
  __esModule: true,
  TRAINING_AREA_ARROW_ENDPOINT_ID: 'training-area-arrow-endpoint',
  default: () => <div>training area</div>,
}));

vi.mock(
  '@src/pages/training/image/components/classfier-card/image-upload-buttons',
  () => ({
    __esModule: true,
    default: ({
      uploadWay,
      onClickFile,
      onClickCamera,
    }: {
      uploadWay: string | null;
      onClickFile: () => void;
      onClickCamera: () => void;
    }) => (
      <div>
        <button onClick={onClickFile}>file upload {uploadWay}</button>
        <button onClick={onClickCamera}>camera upload {uploadWay}</button>
      </div>
    ),
  }),
);

vi.mock(
  '@src/pages/training/image/components/classfier-card/image-upload-inputs',
  () => ({
    __esModule: true,
    default: ({
      uploadWay,
      addImageUrls,
      isDatasetMaxCount,
    }: {
      uploadWay: string;
      addImageUrls: (urls: string[]) => void;
      isDatasetMaxCount: boolean;
    }) => (
      <div data-testid="image-upload-inputs">
        <span>
          {uploadWay}:{isDatasetMaxCount ? 'can-add' : 'max'}
        </span>
        <button onClick={() => addImageUrls(['new-image.png'])}>
          add image
        </button>
      </div>
    ),
  }),
);

vi.mock(
  '@src/pages/training/image/components/classfier-card/image-viewer',
  () => ({
    __esModule: true,
    default: ({
      isGridView,
      dataset,
      deleteImageUrl,
    }: {
      isGridView: boolean;
      dataset: string[];
      deleteImageUrl: (index: number) => void;
    }) => (
      <div data-testid="image-viewer">
        <span>
          {isGridView ? 'grid' : 'list'}:{dataset.join(',')}
        </span>
        <button onClick={() => deleteImageUrl(0)}>delete image 0</button>
      </div>
    ),
  }),
);

const seedImageClassifiers = (count = 2) => {
  act(() => {
    useMyModelImageClassifier.getState().reset();
    useMyModelImageClassifier.setState({
      classifiers: Array.from({ length: count }, (_, index) => ({
        uuid: `classifier-${index + 1}`,
        label: `Class ${index + 1}`,
        dataset: index === 0 ? ['image-a.png'] : [],
      })),
    });
  });
};

describe('[트레이닝] 이미지 데이터 영역', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsClicked = true;
    seedImageClassifiers();
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
    seedImageClassifiers(10);

    // When
    render(<DataArea />);

    // Then
    expect(
      screen.queryByRole('button', { name: /\+ ADD_CLASS/ }),
    ).not.toBeInTheDocument();
  });
});

describe('[트레이닝] 이미지 클래스 카드', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockIsClicked = true;
  });

  test('라벨, 삭제, 이미지 데이터 조작 이벤트를 전달한다.', () => {
    // Given
    const onClickDelete = vi.fn();
    const addImageUrls = vi.fn();
    const updateLabel = vi.fn();
    const deleteImageUrl = vi.fn();

    render(
      <ClassifierCard
        index={0}
        onClickDelete={onClickDelete}
        dataset={['image-a.png']}
        addImageUrls={addImageUrls}
        label="Class A"
        updateLabel={updateLabel}
        deleteImageUrl={deleteImageUrl}
      />,
    );

    // When
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Class B' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'delete image 0' }));
    fireEvent.click(screen.getAllByRole('button')[0]);

    // Then
    expect(updateLabel).toHaveBeenCalledWith('Class B');
    expect(deleteImageUrl).toHaveBeenCalledWith(0);
    expect(onClickDelete).toHaveBeenCalledTimes(1);
  });

  test('업로드 방식을 바꾸면 입력 컴포넌트와 뷰어 레이아웃을 연결한다.', () => {
    // Given
    const addImageUrls = vi.fn();

    render(
      <ClassifierCard
        index={0}
        onClickDelete={vi.fn()}
        dataset={[]}
        addImageUrls={addImageUrls}
        label="Class A"
        updateLabel={vi.fn()}
        deleteImageUrl={vi.fn()}
      />,
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: /camera upload/ }));

    // Then
    expect(screen.getByTestId('image-upload-inputs')).toHaveTextContent(
      'camera:can-add',
    );
    expect(screen.getByTestId('image-viewer')).toHaveTextContent('grid:');

    // When
    fireEvent.click(screen.getByRole('button', { name: 'add image' }));
    fireEvent.click(screen.getByRole('button', { name: /file upload/ }));

    // Then
    expect(addImageUrls).toHaveBeenCalledWith(['new-image.png']);
    expect(screen.getByTestId('image-upload-inputs')).toHaveTextContent(
      'file:can-add',
    );
  });

  test('데이터셋이 최대 개수이면 업로드 입력에 제한 상태를 전달한다.', () => {
    // Given
    const dataset = Array.from({ length: 50 }, (_, index) => `${index}.png`);

    render(
      <ClassifierCard
        index={0}
        onClickDelete={vi.fn()}
        dataset={dataset}
        addImageUrls={vi.fn()}
        label="Class A"
        updateLabel={vi.fn()}
        deleteImageUrl={vi.fn()}
      />,
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: /file upload/ }));

    // Then
    expect(screen.getByTestId('image-upload-inputs')).toHaveTextContent(
      'file:max',
    );
  });

  test('카드 포커스가 해제되면 업로드 상태를 닫는다.', () => {
    // Given
    mockIsClicked = false;

    render(
      <ClassifierCard
        index={0}
        onClickDelete={vi.fn()}
        dataset={['image-a.png']}
        addImageUrls={vi.fn()}
        label="Class A"
        updateLabel={vi.fn()}
        deleteImageUrl={vi.fn()}
      />,
    );

    // Then
    expect(screen.queryByTestId('image-upload-inputs')).not.toBeInTheDocument();
    expect(mockUpdateXarrow).toHaveBeenCalled();
  });
});
