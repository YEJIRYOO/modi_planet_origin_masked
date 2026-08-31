import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

import NoticeContainer from '@src/pages/cs/notice';
import NoticeComponent from '@src/pages/cs/notice/index.view';
import NoticeDetailsPage from '@src/pages/cs/notice/details';

const mockUseNoticeList = vi.fn();
const mockUseNoticeLazyQuery = vi.fn();
const mockNoticeQuery = vi.fn();

vi.mock('@services/api/support/useNoticeList', () => ({
  useNoticeList: (input: any) => mockUseNoticeList(input),
}));

vi.mock('@src/services/gen/gen', async () => {
  const actual = await vi.importActual<typeof import('@src/services/gen/gen')>(
    '@src/services/gen/gen',
  );

  return {
    ...actual,
    useNoticeLazyQuery: (...args: any[]) => mockUseNoticeLazyQuery(...args),
  };
});

vi.mock('@hooks/useSaveFiles', () => ({
  useSaveFiles: () => vi.fn(() => vi.fn()),
}));

function CurrentLocation() {
  const location = useLocation();

  return <span data-testid="current-path">{location.pathname}</span>;
}

const noticeNodes = [
  {
    id: 'notice-1',
    title: '첫 번째 공지',
    content: '공지 내용',
    createdAt: '2026-05-14T00:00:00.000Z',
    isNew: true,
    isTop: false,
    viewCount: 10,
    language: 'KO',
  },
  {
    id: 'notice-2',
    title: '두 번째 공지',
    content: '두 번째 내용',
    createdAt: '2026-05-13T00:00:00.000Z',
    isNew: false,
    isTop: false,
    viewCount: 7,
    language: 'KO',
  },
] as any[];

const noticeDetail = {
  id: 'notice-1',
  isTop: false,
  viewCount: 42,
  language: 'KO',
  title: '상세 공지',
  content: '<p>상세 본문입니다.</p>',
  isNew: true,
  createdAt: '2026-05-14T00:00:00.000Z',
  isExposed: true,
  attachments: [
    {
      id: 'file-1',
      name: 'guide.pdf',
      url: 'https://cdn.example.com/guide.pdf',
    },
  ],
  cursorInfo: {
    before: 'prev-notice',
    after: 'next-notice',
  },
};

describe('[고객센터] 공지 목록', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseNoticeList.mockImplementation(() => ({
      noticeList: noticeNodes,
      totalCount: 12,
      loading: false,
      error: undefined,
      refetch: vi.fn(),
    }));
  });

  test('공지 목록을 조회 조건과 함께 요청하고 검색어를 다음 조회 변수에 반영한다.', async () => {
    // Given
    render(
      <MemoryRouter initialEntries={['/cs']}>
        <NoticeContainer />
      </MemoryRouter>,
    );

    // Then
    expect(screen.getByText('첫 번째 공지')).toBeVisible();
    expect(screen.getByText('두 번째 공지')).toBeVisible();
    expect(mockUseNoticeList).toHaveBeenCalledWith(
      expect.objectContaining({
        first: 7,
        offset: 0,
        where: {
          language: 'KO',
        },
      }),
    );

    // When
    const input = screen.getByPlaceholderText('ENTER_SEARCH_THING');
    fireEvent.change(input, { target: { value: '공지' } });
    fireEvent.keyDown(input, { keyCode: 13 });

    // Then
    await waitFor(() => {
      expect(mockUseNoticeList).toHaveBeenLastCalledWith(
        expect.objectContaining({
          where: {
            language: 'KO',
            keyword: '공지',
          },
        }),
      );
    });
  });

  test('공지 항목 클릭 시 상세 경로로 이동한다.', () => {
    // Given
    render(
      <MemoryRouter initialEntries={['/cs']}>
        <CurrentLocation />
        <NoticeComponent
          dataList={noticeNodes as any}
          pageNumber={0}
          first={7}
          totalCount={12}
          isLoading={false}
          isError={undefined}
        />
      </MemoryRouter>,
    );

    // When
    fireEvent.click(screen.getByText('두 번째 공지'));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/cs/notice/notice-2',
    );
  });

  test('공지 뷰는 로딩, 에러, 빈 목록 상태를 표시한다.', () => {
    // Given
    const { rerender } = render(
      <MemoryRouter>
        <NoticeComponent
          dataList={noticeNodes as any}
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
        <NoticeComponent
          dataList={noticeNodes as any}
          pageNumber={0}
          first={7}
          totalCount={12}
          isLoading={false}
          isError={new Error('failed')}
        />
      </MemoryRouter>,
    );

    // Then
    expect(screen.getByText('NO_NOTICE')).toBeVisible();

    // When
    rerender(
      <MemoryRouter>
        <NoticeComponent
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
    expect(screen.getByText('NO_NOTICE')).toBeVisible();
  });
});

describe('[고객센터] 공지 상세', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseNoticeLazyQuery.mockImplementation((options) => [
      mockNoticeQuery,
      {
        data: {
          notice: noticeDetail,
        },
        loading: false,
        error: undefined,
      },
    ]);
  });

  test('공지 상세를 조회하고 제목, 파일, 본문, 이동 버튼을 표시한다.', async () => {
    // Given & When
    render(
      <MemoryRouter initialEntries={['/cs/notice/notice-1']}>
        <CurrentLocation />
        <Routes>
          <Route path="/cs/notice/:id" element={<NoticeDetailsPage />} />
          <Route path="/cs" element={<div>notice list page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    // Then
    await waitFor(() => {
      expect(mockNoticeQuery).toHaveBeenCalledTimes(1);
    });
    expect(mockUseNoticeLazyQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            id: 'notice-1',
            language: 'KO',
          },
        },
        fetchPolicy: 'no-cache',
      }),
    );
    expect(screen.getByText('GNB_ANNOUNCE')).toBeVisible();
    expect(screen.getByRole('heading', { name: '상세 공지' })).toBeVisible();
    expect(
      screen.getByText((_, element) => element?.textContent === 'VIEWS : 42'),
    ).toBeVisible();
    expect(screen.getByText('ATTACHMENT')).toBeVisible();
    expect(screen.getByText('guide.pdf')).toBeVisible();
    expect(screen.getByText('상세 본문입니다.')).toBeVisible();

    // When
    fireEvent.click(screen.getByText('PRE_CONTENT'));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/cs/notice/prev-notice',
    );

    // When
    fireEvent.click(screen.getByText('CONTENT_LIST'));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent('/cs');
  });

  test('로딩 중이거나 공지 데이터가 없으면 내용을 렌더링하지 않는다.', () => {
    // Given
    mockUseNoticeLazyQuery.mockReturnValueOnce([
      mockNoticeQuery,
      {
        data: undefined,
        loading: true,
        error: undefined,
      },
    ]);

    // When
    const { container } = render(
      <MemoryRouter initialEntries={['/cs/notice/notice-1']}>
        <Routes>
          <Route path="/cs/notice/:id" element={<NoticeDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    // Then
    expect(container).toBeEmptyDOMElement();
  });
});
