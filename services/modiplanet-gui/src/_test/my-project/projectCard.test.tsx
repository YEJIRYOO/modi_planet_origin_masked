import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import i18next from 'i18next';

import ProjectCard from '@src/pages/my-project/ProjectCard';
import PopoverContent from '@src/pages/my-project/ProjectCard/PopoverContent';
import type { ProjectListItemModel } from '@src/services/client-model/project';
import {
  ProjectCodeType,
  ProjectCreateType,
  ProjectRunType,
} from '@src/services/gen/gen';

const mockCreateProject = vi.fn();
const mockAddProjectFavorite = vi.fn();
const mockRemoveProjectFavorite = vi.fn();
const mockCheckProjectNameExist = vi.fn();
const mockShowToast = vi.fn();

vi.mock('@services/api/project/useCreateProject', () => ({
  useCreateProject: () => ({
    createProject: mockCreateProject,
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

vi.mock('@services/api/project/useProjectNameExistLazy', () => ({
  useProjectNameExistLazy: () => ({
    checkProjectNameExist: mockCheckProjectNameExist,
    loading: false,
  }),
}));

vi.mock('@components/ui_old/toast', () => ({
  showToast: (...args: any[]) => mockShowToast(...args),
}));

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

function renderProjectCard(overrides: Partial<ProjectListItemModel> = {}) {
  const props = {
    data: createProject(overrides),
    deleteProject: vi.fn(),
    renameProject: vi.fn(),
    refetch: vi.fn(),
    onClickProject: vi.fn(),
  };

  return {
    ...render(<ProjectCard {...props} />),
    props,
  };
}

const openActionMenu = (container: HTMLElement) => {
  const menuButton = container.querySelector(
    'span[role="button"]',
  ) as HTMLElement;

  fireEvent.click(menuButton);
};

describe('[마이 프로젝트] 프로젝트 카드', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    installDomMocks();

    mockCreateProject.mockImplementation(async ({ onCompleted }) => {
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

  test('카드 정보를 보여주고 카드를 클릭하면 프로젝트 열기를 요청한다.', () => {
    // Given
    const { props } = renderProjectCard();

    // When
    fireEvent.click(screen.getByText('모디 프로젝트'));

    // Then
    expect(screen.getByAltText('Default thumbnail')).toBeVisible();
    expect(screen.getByAltText('Block')).toBeVisible();
    expect(props.onClickProject).toHaveBeenCalledWith(
      'project-1',
      ProjectRunType.Upload,
    );
  });

  test('즐겨찾기 상태에 따라 추가와 제거 요청을 보낸다.', async () => {
    // Given
    const inactiveCard = renderProjectCard();

    // When
    fireEvent.click(screen.getByAltText('inactive star'));

    // Then
    await waitFor(() => {
      expect(mockAddProjectFavorite).toHaveBeenCalledWith(
        expect.objectContaining({
          projectId: 'project-1',
        }),
      );
    });
    expect(inactiveCard.props.refetch).toHaveBeenCalledTimes(1);
    expect(inactiveCard.props.onClickProject).not.toHaveBeenCalled();

    inactiveCard.unmount();
    vi.clearAllMocks();

    // Given
    const activeCard = renderProjectCard({ isFavorite: true });

    // When
    fireEvent.click(screen.getByAltText('active star'));

    // Then
    await waitFor(() => {
      expect(mockRemoveProjectFavorite).toHaveBeenCalledWith(
        expect.objectContaining({
          projectId: 'project-1',
        }),
      );
    });
    expect(activeCard.props.refetch).toHaveBeenCalledTimes(1);
  });

  test('썸네일이 있는 실시간 프로젝트는 썸네일과 AI 블록 아이콘을 보여준다.', () => {
    // Given & When
    renderProjectCard({
      runType: ProjectRunType.Realtime,
      thumb: {
        ...imageFixture,
        domain: 'https://cdn.example.com',
        url: '/thumb.png',
      },
    });

    // Then
    expect(screen.getByAltText('모디 프로젝트')).toHaveAttribute(
      'src',
      'https://cdn.example.com/thumb.png',
    );
    expect(screen.getByAltText('AI Block')).toBeVisible();
  });

  test('복제 메뉴를 누르면 복사 타입으로 프로젝트 생성을 요청한다.', async () => {
    // Given
    const { container, props } = renderProjectCard();
    openActionMenu(container);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'DUPLICATE' }));

    // Then
    await waitFor(() => {
      expect(mockCreateProject).toHaveBeenCalledWith(
        expect.objectContaining({
          title: '모디 프로젝트',
          runType: ProjectRunType.Upload,
          jsonData: '{"blocks":[]}',
          createType: ProjectCreateType.Copy,
        }),
      );
    });
    expect(props.refetch).toHaveBeenCalledTimes(1);
  });

  test('삭제 메뉴에서 확인을 누르면 삭제 함수를 실행한다.', () => {
    // Given
    const { container, props } = renderProjectCard();
    openActionMenu(container);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'DELETE' }));
    fireEvent.click(screen.getByRole('button', { name: 'YES' }));

    // Then
    expect(props.deleteProject).toHaveBeenCalledWith('project-1');
  });

  test('이름 변경 메뉴에서 새 이름을 입력해 변경 함수를 실행한다.', () => {
    // Given
    const { container, props } = renderProjectCard();
    openActionMenu(container);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'RENAME' }));
    fireEvent.change(screen.getByPlaceholderText('모디 프로젝트'), {
      target: { value: '변경된 프로젝트' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    expect(props.renameProject).toHaveBeenCalledWith(
      'project-1',
      '변경된 프로젝트',
    );
  });

  test('복제 중 일반 에러가 발생하면 토스트를 보여준다.', async () => {
    // Given
    mockCreateProject.mockImplementationOnce(async ({ onError }) => {
      onError?.({
        graphQLErrors: [
          {
            message: JSON.stringify({
              statusCode: 500,
              errorCode: 50000,
            }),
          },
        ],
      });
    });
    const { container } = renderProjectCard();
    openActionMenu(container);

    // When
    fireEvent.click(screen.getByRole('button', { name: 'DUPLICATE' }));

    // Then
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith('SAVE_PROJECT_ERROR');
    });
  });
});

describe('[마이 프로젝트] 프로젝트 카드 팝오버', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    installDomMocks();
  });

  test('메뉴 버튼 클릭과 PC 저장을 처리한다.', () => {
    // Given
    const onDeleteClick = vi.fn();
    const onCopyClick = vi.fn();
    const onRenameClick = vi.fn();
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(vi.fn());
    const createObjectURL = vi.fn(() => 'blob:project');
    const revokeObjectURL = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', {
      value: createObjectURL,
      configurable: true,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      value: revokeObjectURL,
      configurable: true,
    });

    render(
      <PopoverContent
        data={createProject()}
        onDeleteClick={onDeleteClick}
        onCopyClick={onCopyClick}
        onRenameClick={onRenameClick}
      />,
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: 'DELETE' }));
    fireEvent.click(screen.getByRole('button', { name: 'DUPLICATE' }));
    fireEvent.click(screen.getByRole('button', { name: 'RENAME' }));
    fireEvent.click(screen.getByRole('button', { name: 'SAVE_PC' }));

    // Then
    expect(onDeleteClick).toHaveBeenCalledTimes(1);
    expect(onCopyClick).toHaveBeenCalledTimes(1);
    expect(onRenameClick).toHaveBeenCalledTimes(1);
    expect(createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:project');

    clickSpy.mockRestore();
  });
});
