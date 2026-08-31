import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import MaterialDetailsPage from '@src/pages/materials/details';
import MaterialDetailsContainer from '@src/pages/materials/details/material-details-container';
import MaterialsPage from '@src/pages/materials';
import MaterialsComponent from '@src/pages/materials/index.view';
import { useProfileStore } from '@src/store/zustand';

const mockViewMaterialsPageLog = vi.fn();
const mockLibraryConnectionQuery = vi.fn();
const mockLibraryQuery = vi.fn();
const mockUseLibraryConnectionLazyQuery = vi.fn();
const mockUseLibraryLazyQuery = vi.fn();

vi.mock('@components/provider/firebase-provider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useFirebaseEvent: () => ({
    viewMaterialsPageLog: mockViewMaterialsPageLog,
  }),
}));

vi.mock('@src/services/gen/gen', async () => {
  const actual = await vi.importActual<typeof import('@src/services/gen/gen')>(
    '@src/services/gen/gen',
  );

  return {
    ...actual,
    useLibraryConnectionLazyQuery: (...args: any[]) =>
      mockUseLibraryConnectionLazyQuery(...args),
    useLibraryLazyQuery: (...args: any[]) => mockUseLibraryLazyQuery(...args),
  };
});

vi.mock('@hooks/useSaveFiles', () => ({
  useSaveFiles: () => vi.fn(() => vi.fn()),
}));

function CurrentLocation() {
  const location = useLocation();

  return <span data-testid="current-path">{location.pathname}</span>;
}

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

const materialNodes = [
  {
    id: 'material-1',
    viewCount: 10,
    language: 'KO',
    title: '첫 번째 자료',
    content: '자료 내용',
    createdAt: '2026-05-14T00:00:00.000Z',
    isNew: true,
    isExposed: true,
  },
  {
    id: 'material-2',
    viewCount: 7,
    language: 'KO',
    title: '두 번째 자료',
    content: '두 번째 내용',
    createdAt: '2026-05-13T00:00:00.000Z',
    isNew: false,
    isExposed: true,
  },
] as any[];

const materialDetail = {
  id: 'material-1',
  viewCount: 42,
  language: 'KO',
  title: '상세 자료',
  content: '<p>상세 자료 본문입니다.</p>',
  createdAt: '2026-05-14T00:00:00.000Z',
  isNew: true,
  isExposed: true,
  attachments: [
    {
      id: 'file-1',
      name: 'material.pdf',
      url: 'https://cdn.example.com/material.pdf',
    },
  ],
  cursorInfo: {
    before: 'prev-material',
    after: 'next-material',
  },
};

const signIn = () => {
  act(() => {
    useProfileStore.getState().setProfile(profile);
  });
};

const signOut = () => {
  act(() => {
    useProfileStore.getState().clearProfile();
  });
};

describe('[자료실] 목록 페이지', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    signIn();
    mockUseLibraryConnectionLazyQuery.mockImplementation(() => [
      mockLibraryConnectionQuery,
      {
        data: {
          libraryConnection: {
            totalCount: 12,
            nodes: materialNodes,
          },
        },
        loading: false,
        error: undefined,
      },
    ]);
  });

  test('자료 목록을 조회 조건과 함께 요청하고 방문 로그를 남긴다.', async () => {
    // Given & When
    render(
      <MemoryRouter initialEntries={['/materials']}>
        <MaterialsPage />
      </MemoryRouter>,
    );

    // Then
    expect(
      screen.getByRole('heading', { name: 'EDU_RESOURCES' }),
    ).toBeVisible();
    expect(screen.getByText(/TOTAL_OF/)).toHaveTextContent('12');
    expect(screen.getByText('첫 번째 자료')).toBeVisible();
    expect(screen.getByText('두 번째 자료')).toBeVisible();

    await waitFor(() => {
      expect(mockLibraryConnectionQuery).toHaveBeenCalledTimes(1);
      expect(mockViewMaterialsPageLog).toHaveBeenCalledTimes(1);
    });
    expect(mockUseLibraryConnectionLazyQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: expect.objectContaining({
            first: 7,
            offset: 0,
            where: {
              keyword: '',
              language: 'KO',
            },
          }),
        },
        fetchPolicy: 'no-cache',
      }),
    );
  });

  test('검색어를 입력하면 다음 조회 변수에 keyword를 반영한다.', async () => {
    // Given
    render(
      <MemoryRouter initialEntries={['/materials']}>
        <MaterialsPage />
      </MemoryRouter>,
    );

    // When
    const input = screen.getByPlaceholderText('ENTER_SEARCH_THING');
    fireEvent.change(input, { target: { value: '자료' } });
    fireEvent.keyDown(input, { keyCode: 13 });

    // Then
    await waitFor(() => {
      expect(mockUseLibraryConnectionLazyQuery).toHaveBeenLastCalledWith(
        expect.objectContaining({
          variables: {
            input: expect.objectContaining({
              where: {
                keyword: '자료',
                language: 'KO',
              },
            }),
          },
        }),
      );
    });
  });
});

describe('[자료실] 목록 뷰', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    signIn();
  });

  test('로그인 사용자는 자료 항목 클릭 시 상세 페이지로 이동한다.', () => {
    // Given
    render(
      <MemoryRouter initialEntries={['/materials']}>
        <CurrentLocation />
        <MaterialsComponent
          dataList={materialNodes as any}
          pageNumber={0}
          first={7}
          totalCount={12}
          isLoading={false}
          isError={undefined}
        />
      </MemoryRouter>,
    );

    // When
    fireEvent.click(screen.getByText('두 번째 자료'));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/materials/material-2',
    );
  });

  test('비로그인 사용자는 자료 항목 클릭 시 로그인 안내를 표시하고 확인 시 로그인 페이지로 이동한다.', async () => {
    // Given
    signOut();

    render(
      <MemoryRouter initialEntries={['/materials']}>
        <CurrentLocation />
        <MaterialsComponent
          dataList={materialNodes as any}
          pageNumber={0}
          first={7}
          totalCount={12}
          isLoading={false}
          isError={undefined}
        />
      </MemoryRouter>,
    );

    // When
    fireEvent.click(screen.getByText('첫 번째 자료'));

    // Then
    expect(await screen.findByText('NEED_TO_SIGN_IN')).toBeVisible();

    // When
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent('/signin');
  });

  test('로딩, 에러, 빈 목록 상태를 표시한다.', () => {
    // Given
    const { rerender } = render(
      <MemoryRouter>
        <MaterialsComponent
          dataList={materialNodes as any}
          pageNumber={0}
          first={7}
          totalCount={12}
          isLoading
          isError={undefined}
        />
      </MemoryRouter>,
    );

    // Then
    expect(screen.getByAltText('spinner')).toBeVisible();

    // When
    rerender(
      <MemoryRouter>
        <MaterialsComponent
          dataList={materialNodes as any}
          pageNumber={0}
          first={7}
          totalCount={12}
          isLoading={false}
          isError={new Error('failed')}
        />
      </MemoryRouter>,
    );

    // Then
    expect(screen.getByText('NO_MATERIALS')).toBeVisible();

    // When
    rerender(
      <MemoryRouter>
        <MaterialsComponent
          dataList={[] as any}
          pageNumber={0}
          first={7}
          totalCount={0}
          isLoading={false}
          isError={undefined}
        />
      </MemoryRouter>,
    );

    // Then
    expect(screen.getByText('NO_MATERIALS')).toBeVisible();
  });
});

describe('[자료실] 상세 페이지', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    signIn();
    mockUseLibraryLazyQuery.mockImplementation(() => [
      mockLibraryQuery,
      {
        data: {
          library: materialDetail,
        },
        loading: false,
        error: undefined,
      },
    ]);
  });

  test('로그인하지 않은 사용자는 상세 진입 시 로그인 안내를 표시하고 확인 시 로그인 페이지로 이동한다.', async () => {
    // Given
    signOut();

    render(
      <MemoryRouter initialEntries={['/materials/material-1']}>
        <CurrentLocation />
        <MaterialDetailsPage />
      </MemoryRouter>,
    );

    // Then
    expect(screen.getByAltText('spinner')).toBeVisible();
    expect(await screen.findByText('NEED_TO_SIGN_IN')).toBeVisible();

    // When
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent('/signin');
  });

  test('상세 자료를 조회하고 제목, 파일, 본문, 이동 버튼을 표시한다.', async () => {
    // Given & When
    render(
      <MemoryRouter initialEntries={['/materials/material-1']}>
        <CurrentLocation />
        <Routes>
          <Route path="/materials/:id" element={<MaterialDetailsContainer />} />
          <Route path="/materials" element={<div>materials list page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    // Then
    await waitFor(() => {
      expect(mockLibraryQuery).toHaveBeenCalledTimes(1);
    });
    expect(mockUseLibraryLazyQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            id: 'material-1',
            language: 'KO',
          },
        },
        fetchPolicy: 'no-cache',
      }),
    );
    expect(screen.getByText('EDU_RESOURCES')).toBeVisible();
    expect(screen.getByRole('heading', { name: '상세 자료' })).toBeVisible();
    expect(
      screen.getByText((_, element) => element?.textContent === 'VIEWS : 42'),
    ).toBeVisible();
    expect(screen.getByText('ATTACHMENT')).toBeVisible();
    expect(screen.getByText('material.pdf')).toBeVisible();
    expect(screen.getByText('상세 자료 본문입니다.')).toBeVisible();

    // When
    fireEvent.click(screen.getByText('NEXT_CONTENT'));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/materials/next-material',
    );

    // When
    fireEvent.click(screen.getByText('CONTENT_LIST'));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent('/materials');
  });

  test('상세 자료 로딩 중이면 내용을 렌더링하지 않는다.', () => {
    // Given
    mockUseLibraryLazyQuery.mockReturnValueOnce([
      mockLibraryQuery,
      {
        data: undefined,
        loading: true,
        error: undefined,
      },
    ]);

    // When
    const { container } = render(
      <MemoryRouter initialEntries={['/materials/material-1']}>
        <Routes>
          <Route path="/materials/:id" element={<MaterialDetailsContainer />} />
        </Routes>
      </MemoryRouter>,
    );

    // Then
    expect(container).toBeEmptyDOMElement();
  });
});
