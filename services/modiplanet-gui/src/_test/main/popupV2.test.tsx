import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';

import MainPopupV2 from '@src/pages/main/popup-v2';
import PopupContent from '@src/pages/main/popup-v2/popup-content';
import PopupControl from '@src/pages/main/popup-v2/popup-control';
import {
  getDoNotShowPopupV2Timestamp,
  storeDoNotShowPopupV2Timestamp,
} from '@src/lib/utils/utils';

function CurrentPath() {
  const location = useLocation();

  return <span data-testid="current-path">{location.pathname}</span>;
}

const renderPopupWithRouter = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <MainPopupV2 />
      <CurrentPath />
    </MemoryRouter>,
  );

const originalReactAppEnv = process.env.REACT_APP_ENV;

describe('[메인] popup v2', () => {
  afterEach(() => {
    localStorage.clear();

    if (originalReactAppEnv === undefined) {
      delete process.env.REACT_APP_ENV;
      return;
    }

    process.env.REACT_APP_ENV = originalReactAppEnv;
  });

  test('개인정보 처리방침 팝업 내용을 보여주고 상세보기 클릭을 전달한다.', () => {
    // Given
    const onClickContent = vi.fn();

    render(<PopupContent onClickContent={onClickContent} />);

    // When
    userEvent.click(screen.getByRole('button', { name: 'VIEW_DETAILS' }));

    // Then
    expect(screen.getByText('PRIVACY_POLICY_POPUP_TITLE')).toBeVisible();
    expect(screen.getByText('EFFECTIVE_DATE')).toBeVisible();
    expect(screen.getByText('KEY_UPDATES')).toBeVisible();
    expect(screen.getByText('POSTING_PERIOD')).toBeVisible();
    expect(onClickContent).toHaveBeenCalledTimes(1);
  });

  test('체크하지 않고 닫으면 하루 숨김 시간을 저장하지 않는다.', () => {
    // Given
    const onClose = vi.fn();

    render(<PopupControl onClose={onClose} />);

    // When
    userEvent.click(screen.getByRole('button', { name: 'CLOSE' }));

    // Then
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(getDoNotShowPopupV2Timestamp()).toBeNull();
  });

  test('체크하고 닫으면 하루 숨김 시간을 저장한다.', () => {
    // Given
    const onClose = vi.fn();

    render(<PopupControl onClose={onClose} />);

    // When
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('button', { name: 'CLOSE' }));

    // Then
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(getDoNotShowPopupV2Timestamp()).not.toBeNull();
  });

  test('저장된 숨김 시간이 없으면 팝업을 보여준다.', () => {
    // Given
    renderPopupWithRouter();

    // Then
    expect(screen.getByText('PRIVACY_POLICY_POPUP_TITLE')).toBeVisible();
  });

  test('상세보기를 누르면 개발 환경 공지사항으로 이동한다.', () => {
    // Given
    renderPopupWithRouter();

    // When
    userEvent.click(screen.getByRole('button', { name: 'VIEW_DETAILS' }));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/cs/notice/108',
    );
  });

  test('프로덕션 환경에서는 프로덕션 공지사항으로 이동한다.', () => {
    // Given
    process.env.REACT_APP_ENV = 'production';
    renderPopupWithRouter();

    // When
    userEvent.click(screen.getByRole('button', { name: 'VIEW_DETAILS' }));

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/cs/notice/27',
    );
  });

  test('하루 숨김 시간이 남아있으면 팝업을 보여주지 않는다.', () => {
    // Given
    storeDoNotShowPopupV2Timestamp(new Date().toISOString());

    renderPopupWithRouter();

    // Then
    expect(
      screen.queryByText('PRIVACY_POLICY_POPUP_TITLE'),
    ).not.toBeInTheDocument();
  });
});
