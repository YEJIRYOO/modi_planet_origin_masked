import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CSPage from '@src/pages/cs';

const mockViewCsPageLog = vi.fn();

vi.mock('@components/provider/firebase-provider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useFirebaseEvent: () => ({
    viewCsPageLog: mockViewCsPageLog,
  }),
}));

vi.mock('@src/pages/cs/notice', () => ({
  __esModule: true,
  default: () => <div>notice content</div>,
}));

vi.mock('@src/pages/cs/faq', () => ({
  __esModule: true,
  default: () => <div>faq content</div>,
}));

describe('[고객센터] 메인 페이지', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('기본 진입 시 고객센터 정보와 공지 탭을 표시하고 방문 로그를 남긴다.', async () => {
    // Given & When
    render(
      <MemoryRouter initialEntries={['/cs']}>
        <CSPage />
      </MemoryRouter>,
    );

    // Then
    expect(
      screen.getByRole('heading', { name: 'SERVICE_CENTER' }),
    ).toBeVisible();
    expect(screen.getByText('PHONE_NUMBER')).toBeVisible();
    expect(screen.getByText('SERVICE_PHONE')).toBeVisible();
    expect(screen.getByText('EMAIL_TEXT')).toBeVisible();
    expect(screen.getByText('SERVICE_EMAIL')).toBeVisible();
    expect(screen.getByText('notice content')).toBeVisible();
    expect(screen.queryByText('faq content')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(mockViewCsPageLog).toHaveBeenCalledTimes(1);
    });
  });

  test('query tab=1이면 FAQ 탭을 기본으로 열고 탭 클릭으로 공지로 이동한다.', () => {
    // Given
    render(
      <MemoryRouter initialEntries={['/cs?tab=1']}>
        <CSPage />
      </MemoryRouter>,
    );

    // Then
    expect(screen.getByText('faq content')).toBeVisible();
    expect(screen.queryByText('notice content')).not.toBeInTheDocument();

    // When
    fireEvent.click(screen.getByRole('button', { name: 'NOTICE' }));

    // Then
    expect(screen.getByText('notice content')).toBeVisible();
    expect(screen.queryByText('faq content')).not.toBeInTheDocument();
  });
});
