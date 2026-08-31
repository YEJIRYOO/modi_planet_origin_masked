import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import FAQContainer from '@src/pages/cs/faq';
import FAQComponent from '@src/pages/cs/faq/index.view';
import FAQItem from '@src/pages/cs/faq/faq-item';

const mockFaqConnectionQuery = vi.fn();
const mockUseFaqConnectionLazyQuery = vi.fn();

vi.mock('@src/services/gen/gen', async () => {
  const actual = await vi.importActual<typeof import('@src/services/gen/gen')>(
    '@src/services/gen/gen',
  );

  return {
    ...actual,
    useFaqConnectionLazyQuery: (...args: any[]) =>
      mockUseFaqConnectionLazyQuery(...args),
  };
});

const faqNodes = [
  {
    id: 'faq-1',
    category: 'GENERAL',
    subCategory: '',
    viewCount: 3,
    language: 'KO',
    title: '계정은 어떻게 만들어요?',
    content: '<p>회원가입 메뉴를 이용하세요.</p>',
    createdAt: '2026-05-14T00:00:00.000Z',
  },
  {
    id: 'faq-2',
    category: 'GENERAL',
    subCategory: '',
    viewCount: 5,
    language: 'KO',
    title: '비밀번호를 잊었어요.',
    content: '<p>비밀번호 찾기를 눌러주세요.</p>',
    createdAt: '2026-05-13T00:00:00.000Z',
  },
] as any[];

describe('[고객센터] FAQ', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseFaqConnectionLazyQuery.mockImplementation(() => [
      mockFaqConnectionQuery,
      {
        data: {
          faqConnection: {
            totalCount: faqNodes.length,
            nodes: faqNodes,
          },
        },
        loading: false,
        error: undefined,
      },
    ]);
  });

  test('FAQ 목록을 조회 조건과 함께 요청하고 항목을 열고 닫는다.', async () => {
    // Given & When
    render(<FAQContainer />);

    // Then
    await waitFor(() => {
      expect(mockFaqConnectionQuery).toHaveBeenCalledTimes(1);
    });
    expect(mockUseFaqConnectionLazyQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: expect.objectContaining({
          input: expect.objectContaining({
            first: 7,
            offset: 0,
            where: {
              language: 'KO',
            },
          }),
        }),
        fetchPolicy: 'no-cache',
      }),
    );
    expect(screen.getByText(/TOTAL_OF/)).toHaveTextContent('2');
    expect(screen.getByText('계정은 어떻게 만들어요?')).toBeVisible();
    expect(screen.getByText('비밀번호를 잊었어요.')).toBeVisible();

    // When
    fireEvent.click(screen.getByText('계정은 어떻게 만들어요?'));

    // Then
    expect(screen.getByText('회원가입 메뉴를 이용하세요.')).toBeVisible();

    // When
    fireEvent.click(screen.getByText('계정은 어떻게 만들어요?'));

    // Then
    expect(
      screen.queryByText('회원가입 메뉴를 이용하세요.'),
    ).not.toBeInTheDocument();
  });

  test('검색어를 입력하면 다음 조회 변수에 제목 조건을 반영한다.', async () => {
    // Given
    render(<FAQContainer />);
    const input = screen.getByPlaceholderText('ENTER_SEARCH_THING');

    // When
    fireEvent.change(input, { target: { value: '비밀번호' } });
    fireEvent.keyDown(input, { keyCode: 13 });

    // Then
    await waitFor(() => {
      expect(mockUseFaqConnectionLazyQuery).toHaveBeenLastCalledWith(
        expect.objectContaining({
          variables: expect.objectContaining({
            input: expect.objectContaining({
              where: {
                language: 'KO',
                title: '비밀번호',
              },
            }),
          }),
        }),
      );
    });
  });

  test('FAQ 뷰는 페이지 번호를 반영한 역순 번호와 빈 목록 메시지를 표시한다.', () => {
    // Given
    const setOpenedIndex = vi.fn();
    const { rerender } = render(
      <FAQComponent
        faqList={faqNodes as any}
        pageNumber={1}
        first={7}
        openedIndex={null}
        setOpenedIndex={setOpenedIndex}
      />,
    );

    // Then
    expect(screen.getByText('9')).toBeVisible();
    expect(screen.getByText('8')).toBeVisible();

    // When
    fireEvent.click(screen.getByText('비밀번호를 잊었어요.'));

    // Then
    expect(setOpenedIndex).toHaveBeenCalledWith(1);

    // When
    rerender(
      <FAQComponent
        faqList={[]}
        pageNumber={0}
        first={7}
        openedIndex={null}
        setOpenedIndex={setOpenedIndex}
      />,
    );

    // Then
    expect(screen.getByText('NO_FAQ')).toBeVisible();
  });

  test('FAQ 항목은 관리자와 작성일, HTML 본문을 표시한다.', () => {
    // Given & When
    render(
      <FAQItem
        faq={faqNodes[0] as any}
        isOpen
        onClick={vi.fn()}
        itemIndex={3}
      />,
    );

    // Then
    expect(screen.getByText('3')).toBeVisible();
    expect(screen.getByText('ADMIN')).toBeVisible();
    expect(screen.getByText('계정은 어떻게 만들어요?')).toBeVisible();
    expect(screen.getByText('회원가입 메뉴를 이용하세요.')).toBeVisible();
  });
});
