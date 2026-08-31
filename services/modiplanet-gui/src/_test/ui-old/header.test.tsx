import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';

import AlarmItem from '@components/ui_old/header/component/AlarmPopover/AlarmItem';
import AlarmPopover from '@components/ui_old/header/component/AlarmPopover';
import AlarmPopoverContent from '@components/ui_old/header/component/AlarmPopover/AlarmPopoverContent';
import FullPageHeader from '@components/ui_old/header/full-page-header';
import Header from '@components/ui_old/header';
import LangSelect from '@components/ui_old/header/component/lang-select';
import NavDesktop from '@components/ui_old/header/component/nav-desktop';
import NavMobile from '@components/ui_old/header/component/nav-mobile';
import Profile from '@components/ui_old/header/component/profile';
import { NotificationState } from '@services/gen/gen';
import { useProfileStore } from '@src/store/zustand';

const mockChangeLanguage = vi.fn();
let mockLanguage = 'ko';
const mockOnSignOut = vi.fn();
const mockUseUser = vi.fn();
const mockInitToken = vi.fn();
const mockSubscribeToNotifications = vi.fn();
const mockLoadMore = vi.fn();
const mockRefetchUnreadCount = vi.fn();
const mockMarkAsRead = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
    i18n: {
      get language() {
        return mockLanguage;
      },
      changeLanguage: mockChangeLanguage,
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}));

vi.mock('@nextui-org/react', () => {
  const React = require('react');
  const optionValueByLabel: Record<string, string> = {
    KOR: 'ko',
    ENG: 'en',
    ES: 'es',
    PL: 'pl',
  };

  return {
    Select: ({
      children,
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
        children,
      );
    },
    SelectItem: ({ children }: any) =>
      React.createElement(
        'option',
        { value: optionValueByLabel[children] ?? children },
        children,
      ),
    Popover: ({ children }: any) => React.createElement('div', null, children),
    PopoverTrigger: ({ children }: any) =>
      React.createElement(React.Fragment, null, children),
    PopoverContent: ({ children }: any) =>
      React.createElement('div', null, children),
    Modal: ({ children, isOpen }: any) =>
      isOpen ? React.createElement('div', { role: 'dialog' }, children) : null,
    Divider: (props: any) => React.createElement('hr', props),
    Button: ({ children, onClick, isDisabled }: any) =>
      React.createElement(
        'button',
        { disabled: isDisabled, onClick },
        children,
      ),
    ModalContent: ({ children }: any) =>
      React.createElement(
        'div',
        null,
        typeof children === 'function' ? children(() => {}) : children,
      ),
    useDisclosure: () => {
      const [isOpen, setIsOpen] = React.useState(false);

      return {
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
        onOpenChange: setIsOpen,
      };
    },
  };
});

vi.mock('react-device-detect', () => ({
  isDesktop: true,
}));

vi.mock('@src/components/hooks/user/useSignOutController', () => ({
  useSignOutController: () => ({
    onSignOut: mockOnSignOut,
    loading: false,
  }),
}));

vi.mock('@src/services/api', () => ({
  useUser: () => mockUseUser(),
}));

vi.mock('@src/services/api/user/useTokenInit', () => ({
  useTokenInit: () => ({
    initToken: mockInitToken,
  }),
}));

vi.mock('@services/api/support/useNotificationUnreadCount', () => ({
  useNotificationUnreadCount: () => ({
    unreadCount: 2,
    refetch: mockRefetchUnreadCount,
  }),
}));

vi.mock('@services/api/support/useNotificationList', () => ({
  useNotificationList: () => ({
    notifications: [],
    subscribeToNotifications: mockSubscribeToNotifications,
    hasNextPage: false,
    loadMore: mockLoadMore,
  }),
}));

vi.mock('@services/api/support/useMarkNotificationAsRead', () => ({
  useMarkNotificationAsRead: () => ({
    markAsRead: mockMarkAsRead,
  }),
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
  nickname: '루미',
  countryCallingCode: '+82',
  phoneNumber: '',
  thumbnailUrl: '/profile.png',
  codingExperienceTypeList: [],
  contactEmail: '',
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

const renderWithRouter = (ui: React.ReactElement, initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <CurrentLocation />
      {ui}
    </MemoryRouter>,
  );
};

describe('[UI Old] 헤더 네비게이션', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockLanguage = 'ko';
    mockUseUser.mockReturnValue({
      user: {
        roleType: 'USER',
      },
    });
    mockOnSignOut.mockImplementation(async ({ onCompleted }) => {
      onCompleted?.();
    });
    mockInitToken.mockResolvedValue(true);
    mockSubscribeToNotifications.mockReturnValue(vi.fn());
    mockMarkAsRead.mockResolvedValue(undefined);
    signOut();
    document.body.style.removeProperty('overflow');
  });

  test('기본 헤더는 로고와 데스크톱 메뉴를 렌더링하고 공지 링크로 이동한다.', () => {
    // Given
    renderWithRouter(<Header />, ['/materials']);

    // Then
    expect(screen.getByAltText('logo')).toHaveAttribute(
      'src',
      '/assets/logo.svg',
    );
    expect(screen.getAllByText('GNB_CODE_EDITOR').length).toBeGreaterThan(0);
    expect(screen.getAllByText('LEARNING_SPACE').length).toBeGreaterThan(0);
    expect(screen.getAllByText('EDU_RESOURCES').length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: 'NOTICE' })).toBeVisible();
    expect(screen.getByRole('link', { name: /GNB_MODI_MALL/ })).toHaveAttribute(
      'target',
      '_blank',
    );

    // When
    fireEvent.click(screen.getByRole('link', { name: 'NOTICE' }));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent('/cs');
  });

  test('데스크톱 메뉴의 코드 에디터와 학습공간 클릭을 link validation으로 위임한다.', () => {
    // Given
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderWithRouter(<NavDesktop />, ['/learning-space']);

    // When
    fireEvent.click(screen.getByText('GNB_CODE_EDITOR'));
    fireEvent.click(screen.getByText('LEARNING_SPACE'));

    // Then
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^\/editor\?locale=/),
      '_blank',
    );
    expect(openSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^\/learning-space\?locale=/),
      '_blank',
    );
    expect(screen.getByText('LEARNING_SPACE')).toHaveClass('text-brand');

    openSpy.mockRestore();
  });

  test('모바일 메뉴는 로그인 사용자 프로필, 마이페이지 이동, 로그아웃을 처리한다.', async () => {
    // Given
    signIn();
    renderWithRouter(<NavMobile pathname="/" />, ['/']);

    // When
    fireEvent.click(screen.getAllByRole('button')[0]);

    // Then
    expect(document.body).toHaveStyle({ overflow: 'hidden' });
    expect(screen.getByText('루미')).toBeVisible();

    // When
    fireEvent.click(screen.getByText('MY_PAGE'));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent('/my-page');
    expect(document.body.style.overflow).toBe('');

    // When
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByText('SIGN_OUT'));

    // Then
    await waitFor(() => {
      expect(mockOnSignOut).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('current-path')).toHaveTextContent('/');
    });
  });

  test('모바일 메뉴는 비로그인 사용자를 로그인 페이지로 보낸다.', () => {
    // Given
    renderWithRouter(<NavMobile pathname="/" />, ['/']);

    // When
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByText('SIGN_IN'));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent('/signin');
  });

  test('프로필 로그인 버튼은 현재 경로를 유지한 채 로그인 페이지로 이동한다.', () => {
    // Given
    renderWithRouter(<Profile />, ['/materials?keyword=test']);

    // When
    fireEvent.click(screen.getByText('SIGN_IN'));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent('/signin');
  });

  test('풀페이지 헤더는 로고 새 창 열기와 제목 링크 이동을 처리한다.', () => {
    // Given
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    renderWithRouter(
      <FullPageHeader title="학습 공간" titleLink="/learning-space" />,
      ['/course'],
    );

    // When
    fireEvent.click(screen.getByAltText('logo').closest('a') as HTMLElement);

    // Then
    expect(openSpy).toHaveBeenCalledWith('/', '_blank');

    // When
    fireEvent.click(screen.getByText('학습 공간'));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/learning-space',
    );

    openSpy.mockRestore();
  });
});

describe('[UI Old] 헤더 언어 선택', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockLanguage = 'ko';
  });

  test('확인 없이 언어를 바꾸면 i18n과 localStorage에 바로 반영한다.', () => {
    // Given
    render(<LangSelect />);

    // When
    fireEvent.change(screen.getByLabelText('select'), {
      target: { value: 'en' },
    });

    // Then
    expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    expect(localStorage.getItem('lang')).toBe('en');
  });

  test('확인이 필요한 언어 변경은 모달 확인 후 반영한다.', () => {
    // Given
    render(
      <LangSelect
        confirmBeforeChange={{
          message: 'CHANGE_LANG_MSG',
          okLabel: 'YES',
          cancelLabel: 'NO',
        }}
      />,
    );

    // When
    fireEvent.change(screen.getByLabelText('select'), {
      target: { value: 'pl' },
    });

    // Then
    expect(screen.getByRole('dialog')).toHaveTextContent('CHANGE_LANG_MSG');
    expect(mockChangeLanguage).not.toHaveBeenCalled();

    // When
    fireEvent.click(screen.getByRole('button', { name: 'YES' }));

    // Then
    expect(mockChangeLanguage).toHaveBeenCalledWith('pl');
    expect(localStorage.getItem('lang')).toBe('pl');
  });
});

describe('[UI Old] 헤더 알림', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLanguage = 'ko';
    mockMarkAsRead.mockResolvedValue(undefined);
    mockInitToken.mockResolvedValue(true);
    mockSubscribeToNotifications.mockReturnValue(vi.fn());
    signIn();

    class MockIntersectionObserver {
      callback: IntersectionObserverCallback;

      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
      }

      observe = (target: Element) => {
        this.callback(
          [{ isIntersecting: true, target } as IntersectionObserverEntry],
          this as any,
        );
      };

      disconnect = vi.fn();
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
    }

    window.IntersectionObserver = MockIntersectionObserver as any;
  });

  test('알림 팝오버는 토큰 초기화 후 subscription을 시작하고 빈 알림 메시지를 표시한다.', async () => {
    // Given & When
    renderWithRouter(<AlarmPopover />);

    // Then
    await waitFor(() => {
      expect(mockInitToken).toHaveBeenCalledTimes(1);
      expect(mockSubscribeToNotifications).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByText('CHECK_ALL_NOTI')).toBeVisible();
  });

  test('알림 목록은 읽음 처리 후 링크로 이동하고 닫기 콜백을 실행한다.', async () => {
    // Given
    const onClose = vi.fn();
    renderWithRouter(
      <AlarmPopoverContent
        notices={[
          {
            id: 'noti-1',
            title: '{"ko":"공지 제목","en":"Notice title"}',
            description: '{"ko":"공지 설명","en":"Notice description"}',
            webLinkPath: '/cs/notice/noti-1',
            state: NotificationState.Unread,
            type: 'ANNOUNCEMENT',
            createdAt: '2026-05-14T00:00:00.000Z',
          },
        ]}
        onClose={onClose}
        hasNextPage={false}
        loadMore={mockLoadMore}
      />,
    );

    // Then
    expect(screen.getByText('공지 제목')).toBeVisible();
    expect(screen.getByText('공지 설명')).toBeVisible();

    // When
    fireEvent.click(screen.getByRole('button', { name: 'MOVE' }));

    // Then
    await waitFor(() => {
      expect(mockMarkAsRead).toHaveBeenCalledWith(
        expect.objectContaining({
          notificationId: 'noti-1',
        }),
      );
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('current-path')).toHaveTextContent(
        '/cs/notice/noti-1',
      );
    });
  });

  test('알림 목록 하단이 보이면 다음 페이지를 불러온다.', async () => {
    // Given & When
    renderWithRouter(
      <AlarmPopoverContent
        notices={[
          {
            id: 'noti-1',
            title: '새 알림',
            description: '새 알림 설명',
            state: NotificationState.Unread,
          },
        ]}
        onClose={vi.fn()}
        hasNextPage
        loadMore={mockLoadMore}
      />,
    );

    // Then
    await waitFor(() => {
      expect(mockLoadMore).toHaveBeenCalledTimes(1);
    });
  });

  test('알림 항목은 링크가 없으면 확인 버튼으로 읽음 처리만 수행한다.', async () => {
    // Given
    const onClose = vi.fn();
    renderWithRouter(
      <AlarmItem
        news={{
          id: 'noti-2',
          title: '단순 알림',
          description: '확인만 필요한 알림',
          state: NotificationState.Unread,
          createdAt: '2026-05-14T00:00:00.000Z',
        }}
        onReadNotice={mockMarkAsRead}
        onClose={onClose}
      />,
    );

    // When
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    // Then
    await waitFor(() => {
      expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
    });
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByTestId('current-path')).toHaveTextContent('/');
  });
});
