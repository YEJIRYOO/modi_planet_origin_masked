import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import i18next from 'i18next';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import MyProjectPage from '@src/pages/my-project';
import ActionTab from '@src/pages/my-project/ActionTab';
import ProjectUploader from '@src/pages/my-project/ActionTab/ProjectUploader';
import CreateProjectModal from '@src/pages/my-project/CreateProjectModal';
import MaxLimitExceedModal from '@src/pages/my-project/MaxLimitExceedModal';
import MyProjectContainer from '@src/pages/my-project/MyProjectContainer';
import type { ProjectListItemModel } from '@src/services/client-model/project';
import {
  OrderDirectionType,
  ProjectCodeType,
  ProjectConnectionField,
  ProjectCreateType,
  ProjectRunType,
  ProjectUpdateType,
} from '@src/services/gen/gen';

const mockViewMyProjectPageLog = vi.fn();
const mockUseUser = vi.fn();
const mockUseProjectConnection = vi.fn();
const mockDeleteProject = vi.fn();
const mockUpdateProject = vi.fn();
const mockCreateProject = vi.fn();
const mockAddProjectFavorite = vi.fn();
const mockRemoveProjectFavorite = vi.fn();
const mockCheckProjectNameExist = vi.fn();
const mockOnClickNewProject = vi.fn();
const mockOnClickProject = vi.fn();
const mockWarningModalClose = vi.fn();

vi.mock('@components/provider/firebase-provider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useFirebaseEvent: () => ({
    viewMyProjectPageLog: mockViewMyProjectPageLog,
  }),
}));

vi.mock('@services/api', () => ({
  useUser: () => mockUseUser(),
}));

vi.mock('@services/api/project/useProjectConnection', () => ({
  useProjectConnection: (options: any) => mockUseProjectConnection(options),
}));

vi.mock('@src/services/api/project/useDeleteProject', () => ({
  useDeleteProject: () => ({
    deleteProject: mockDeleteProject,
    loading: false,
  }),
}));

vi.mock('@src/services/api/project/useUpdateProject', () => ({
  useUpdateProject: () => ({
    updateProject: mockUpdateProject,
    loading: false,
  }),
}));

vi.mock('@src/services/api/project/useCreateProject', () => ({
  useCreateProject: () => ({
    createProject: mockCreateProject,
    loading: false,
  }),
}));

vi.mock('@services/api/project/useCreateProject', () => ({
  useCreateProject: () => ({
    createProject: mockCreateProject,
    loading: false,
  }),
}));

vi.mock('@services/api/project/useProjectNameExistLazy', () => ({
  useProjectNameExistLazy: () => ({
    checkProjectNameExist: mockCheckProjectNameExist,
    loading: false,
  }),
}));

vi.mock('@services/api/project/useAddProjectFavorite', () => ({
  useAddProjectFavorite: () => ({
    addProjectFavorite: mockAddProjectFavorite,
    loading: false,
  }),
}));

vi.mock('@services/api/project/useRemoveProjectFavorite', () => ({
  useRemoveProjectFavorite: () => ({
    removeProjectFavorite: mockRemoveProjectFavorite,
    loading: false,
  }),
}));

vi.mock('@hooks/useLinkValidation', () => ({
  __esModule: true,
  default: () => ({
    onClickNewProject: mockOnClickNewProject,
    onClickProject: mockOnClickProject,
    warningModalProps: {
      isOpen: false,
      onClose: mockWarningModalClose,
      message: '',
    },
  }),
}));

vi.mock('@nextui-org/react', async () => {
  const React = await vi.importActual<typeof import('react')>('react');
  const actual = await vi.importActual<typeof import('@nextui-org/react')>(
    '@nextui-org/react',
  );

  return {
    ...actual,
    Select: ({
      items = [],
      selectedKeys = [],
      onSelectionChange,
      'aria-label': ariaLabel,
    }: any) => {
      const selectedKey = Array.isArray(selectedKeys)
        ? selectedKeys[0]
        : Array.from(selectedKeys)[0];

      return React.createElement(
        'select',
        {
          'aria-label': ariaLabel,
          value: selectedKey,
          onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
            onSelectionChange?.(new Set([event.target.value]));
          },
        },
        items.map((item: any) =>
          React.createElement(
            'option',
            { key: item.key, value: item.key },
            item.label,
          ),
        ),
      );
    },
    SelectItem: ({ children }: any) =>
      React.createElement('option', null, children),
  };
});

if (!i18next.isInitialized) {
  i18next.init({
    lng: 'ko',
    fallbackLng: 'ko',
    resources: {
      ko: {
        translation: {},
      },
    },
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
  });
}

function CurrentLocation() {
  const location = useLocation();

  return <span data-testid="current-path">{location.pathname}</span>;
}

const installDomMocks = () => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  Element.prototype.scrollIntoView = vi.fn();
};

const imageFixture = {
  domain: '',
  url: '',
  width: 0,
  height: 0,
  idx: 0,
  key: '',
};

const createProject = (
  overrides: Partial<ProjectListItemModel> = {},
): ProjectListItemModel => ({
  id: 'project-1',
  title: '모디 프로젝트',
  codeType: ProjectCodeType.Scratch,
  runType: ProjectRunType.Upload,
  isFavorite: false,
  jsonData: '{"blocks":[]}',
  thumb: imageFixture,
  createdAt: '2026-05-14T00:00:00.000Z',
  updatedAt: '2026-05-14T01:00:00.000Z',
  ...overrides,
});

const createFile = (name: string, content: string) => {
  const file = new File([content], name, { type: 'application/json' });
  Object.defineProperty(file, 'text', {
    value: vi.fn().mockResolvedValue(content),
  });
  return file;
};

function renderWithMyProjectRoute(ui: React.ReactElement) {
  return render(
    <MemoryRouter initialEntries={['/my-project']}>
      <Routes>
        <Route path="/my-project" element={ui} />
      </Routes>
      <CurrentLocation />
    </MemoryRouter>,
  );
}

const openProjectActionMenu = (container: HTMLElement) => {
  const menuButton = container.querySelector(
    'span[role="button"]',
  ) as HTMLElement;

  fireEvent.click(menuButton);
};

describe('[마이 프로젝트] 페이지와 컨테이너', () => {
  const refetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    localStorage.clear();
    installDomMocks();

    mockUseUser.mockReturnValue({
      user: { id: 'user-1' },
      loading: false,
    });
    mockUseProjectConnection.mockReturnValue({
      projectList: [createProject()],
      totalCount: 1,
      loading: false,
      refetch,
    });
    mockCreateProject.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.({
        createProject: {
          id: 'created-project',
        },
      });
    });
    mockDeleteProject.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.();
    });
    mockUpdateProject.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.();
    });
    mockAddProjectFavorite.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.();
    });
    mockRemoveProjectFavorite.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.();
    });
    mockCheckProjectNameExist.mockResolvedValue(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('페이지 진입 로그를 남기고 프로젝트 목록을 보여준다.', async () => {
    // Given & When
    renderWithMyProjectRoute(<MyProjectPage />);

    // Then
    expect(screen.getByRole('heading', { name: 'MY_PROJECTS' })).toBeVisible();
    expect(screen.getByText('모디 프로젝트')).toBeVisible();
    await waitFor(() => {
      expect(mockViewMyProjectPageLog).toHaveBeenCalledTimes(1);
    });
  });

  test('사용자 정보를 불러오는 중이면 로딩 상태를 보여준다.', () => {
    // Given
    mockUseUser.mockReturnValue({
      user: undefined,
      loading: true,
    });

    // When
    renderWithMyProjectRoute(<MyProjectContainer />);

    // Then
    expect(screen.getByAltText('Loading...')).toBeVisible();
    expect(mockUseProjectConnection).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: true,
      }),
    );
  });

  test('프로젝트가 없으면 새 프로젝트 카드와 액션 탭을 보여준다.', () => {
    // Given
    mockUseProjectConnection.mockReturnValue({
      projectList: [],
      totalCount: 0,
      loading: false,
      refetch,
    });

    // When
    renderWithMyProjectRoute(<MyProjectContainer />);

    // Then
    expect(screen.getByRole('button', { name: 'VIEW_ALL' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'AI_BLOCK' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'BLOCK' })).toBeVisible();
    expect(screen.getByPlaceholderText('SEARCH_PROJECT')).toBeVisible();
    expect(screen.getByLabelText('sortOrder')).toBeVisible();
    expect(screen.getByText('NEW_PROJECT')).toBeVisible();
  });

  test('필터, 검색어, 정렬 변경 값을 프로젝트 조회 조건에 반영한다.', async () => {
    // Given
    vi.useFakeTimers();

    renderWithMyProjectRoute(<MyProjectContainer />);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'AI_BLOCK' }));
    fireEvent.change(screen.getByPlaceholderText('SEARCH_PROJECT'), {
      target: { value: 'sensor' },
    });
    await act(async () => {
      vi.advanceTimersByTime(1000);
      await Promise.resolve();
    });
    fireEvent.change(screen.getByLabelText('sortOrder'), {
      target: { value: 'TITLE_ASC' },
    });

    // Then
    expect(mockUseProjectConnection).toHaveBeenLastCalledWith(
      expect.objectContaining({
        runType: ProjectRunType.Realtime,
        filter: 'sensor',
        orderBy: {
          field: ProjectConnectionField.Title,
          direction: OrderDirectionType.Asc,
        },
      }),
    );
  });

  test('검색 결과가 없으면 빈 결과 안내를 보여준다.', async () => {
    // Given
    vi.useFakeTimers();
    mockUseProjectConnection.mockReturnValue({
      projectList: [],
      totalCount: 0,
      loading: false,
      refetch,
    });

    renderWithMyProjectRoute(<MyProjectContainer />);

    // When
    fireEvent.change(screen.getByPlaceholderText('SEARCH_PROJECT'), {
      target: { value: 'unknown' },
    });
    await act(async () => {
      vi.advanceTimersByTime(1000);
      await Promise.resolve();
    });

    // Then
    expect(screen.getByText('NO_RESULT')).toBeVisible();
  });

  test('새 프로젝트 카드에서 프로젝트를 생성하고 에디터 이동을 요청한다.', async () => {
    // Given
    vi.useFakeTimers();
    mockUseProjectConnection.mockReturnValue({
      projectList: [],
      totalCount: 0,
      loading: false,
      refetch,
    });

    renderWithMyProjectRoute(<MyProjectContainer />);

    // When
    fireEvent.click(screen.getByText('NEW_PROJECT'));
    await act(async () => {
      vi.advanceTimersByTime(500);
      await Promise.resolve();
    });
    fireEvent.change(screen.getByPlaceholderText('ENTER_PROJECT_NAME'), {
      target: { value: '새 프로젝트' },
    });
    await act(async () => {
      vi.advanceTimersByTime(500);
      await Promise.resolve();
    });
    expect(screen.getByRole('button', { name: 'ROOM_CREATE' })).not.toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'ROOM_CREATE' }));
    vi.useRealTimers();

    // Then
    await waitFor(() => {
      expect(mockCreateProject).toHaveBeenCalledWith(
        expect.objectContaining({
          title: '새 프로젝트',
          runType: ProjectRunType.Upload,
          createType: ProjectCreateType.Normal,
        }),
      );
      expect(mockOnClickNewProject).toHaveBeenCalledWith(
        'created-project',
        ProjectRunType.Upload,
      );
      expect(refetch).toHaveBeenCalled();
    });
  });

  test('프로젝트 카드 메뉴에서 삭제와 이름 변경을 처리한다.', async () => {
    // Given
    const deleteView = renderWithMyProjectRoute(<MyProjectContainer />);
    openProjectActionMenu(deleteView.container);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'DELETE' }));
    fireEvent.click(screen.getByRole('button', { name: 'YES' }));

    // Then
    await waitFor(() => {
      expect(mockDeleteProject).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'project-1',
        }),
      );
      expect(refetch).toHaveBeenCalled();
    });

    deleteView.unmount();
    vi.clearAllMocks();
    mockDeleteProject.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.();
    });
    mockUpdateProject.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.();
    });

    // Given
    const renameView = renderWithMyProjectRoute(<MyProjectContainer />);
    openProjectActionMenu(renameView.container);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'RENAME' }));
    fireEvent.change(screen.getByPlaceholderText('모디 프로젝트'), {
      target: { value: '변경된 프로젝트' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    await waitFor(() => {
      expect(mockUpdateProject).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'project-1',
          title: '변경된 프로젝트',
          updateType: ProjectUpdateType.Rename,
        }),
      );
    });
    expect(await screen.findByText('변경된 프로젝트')).toBeVisible();
  });
});

describe('[마이 프로젝트] 액션 탭과 모달', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
    localStorage.clear();
    installDomMocks();

    mockUseUser.mockReturnValue({
      user: { id: 'user-1' },
      loading: false,
    });
    mockCreateProject.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.({
        createProject: {
          id: 'created-project',
        },
      });
    });
    mockCheckProjectNameExist.mockResolvedValue(false);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('액션 탭에서 실행 타입, 검색어, 정렬 변경을 전달한다.', () => {
    // Given
    const handleRunTypeChange = vi.fn();
    const handleSearchChange = vi.fn();
    const handleSortOrderChange = vi.fn();

    render(
      <ActionTab
        selectedRunType={null}
        searchText=""
        sortOrder={{
          field: ProjectConnectionField.CreatedAt,
          direction: OrderDirectionType.Desc,
        }}
        handleRunTypeChange={handleRunTypeChange}
        handleSearchChange={handleSearchChange}
        handleSortOrderChange={handleSortOrderChange}
      />,
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: 'BLOCK' }));
    fireEvent.change(screen.getByPlaceholderText('SEARCH_PROJECT'), {
      target: { value: 'alpha' },
    });
    fireEvent.change(screen.getByLabelText('sortOrder'), {
      target: { value: 'TITLE_DESC' },
    });

    // Then
    expect(handleRunTypeChange).toHaveBeenCalledWith(ProjectRunType.Upload);
    expect(handleSearchChange).toHaveBeenCalledWith('alpha');
    expect(handleSortOrderChange).toHaveBeenCalledWith({
      field: ProjectConnectionField.Title,
      direction: OrderDirectionType.Desc,
    });
  });

  test('프로젝트 생성 모달에서 타입과 이름을 선택해 생성을 요청한다.', async () => {
    // Given
    vi.useFakeTimers();
    const onClose = vi.fn();
    const onConfirm = vi.fn();

    render(
      <CreateProjectModal isOpen onClose={onClose} onConfirm={onConfirm} />,
    );

    // When
    await act(async () => {
      vi.advanceTimersByTime(500);
      await Promise.resolve();
    });
    expect(mockCheckProjectNameExist).toHaveBeenCalled();

    fireEvent.click(screen.getByAltText('AI Block'));
    fireEvent.change(screen.getByPlaceholderText('ENTER_PROJECT_NAME'), {
      target: { value: '새 프로젝트' },
    });
    await act(async () => {
      vi.advanceTimersByTime(500);
      await Promise.resolve();
    });
    expect(mockCheckProjectNameExist).toHaveBeenCalledWith({
      title: '새 프로젝트',
    });
    expect(screen.getByRole('button', { name: 'ROOM_CREATE' })).not.toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'ROOM_CREATE' }));
    vi.useRealTimers();

    // Then
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledWith(
        ProjectRunType.Realtime,
        '새 프로젝트',
      );
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('프로젝트 업로드 파일을 프로젝트 생성 요청으로 변환한다.', async () => {
    // Given
    const refetch = vi.fn();
    const { container } = render(<ProjectUploader refetch={refetch} />);
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    // When
    fireEvent.change(fileInput, {
      target: {
        files: [
          createFile('block-project.bk', '{"type":"block"}'),
          createFile('ai-project.abk', '{"type":"ai"}'),
        ],
      },
    });

    // Then
    await waitFor(() => {
      expect(mockCreateProject).toHaveBeenCalledTimes(2);
    });
    expect(mockCreateProject).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        title: 'block-project',
        runType: ProjectRunType.Upload,
        jsonData: '{"type":"block"}',
        createType: ProjectCreateType.Upload,
      }),
    );
    expect(mockCreateProject).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        title: 'ai-project',
        runType: ProjectRunType.Realtime,
        jsonData: '{"type":"ai"}',
        createType: ProjectCreateType.Upload,
      }),
    );
    expect(refetch).toHaveBeenCalled();
  });

  test('프로젝트 최대 개수 초과 모달에서 확인하면 닫기 함수를 실행한다.', () => {
    // Given
    const onClose = vi.fn();

    render(<MaxLimitExceedModal isOpen onClose={onClose} />);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    expect(screen.getByText('MAX_LIMIT_EXCEED')).toBeVisible();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
