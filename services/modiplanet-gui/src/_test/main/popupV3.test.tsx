import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';

import MainPopupV3 from '@src/pages/main/popup-v3';
import PopupContent from '@src/pages/main/popup-v3/popup-content';
import PopupControl from '@src/pages/main/popup-v3/popup-control';
import {
  getDoNotShowPopupV3Timestamp,
  storeDoNotShowPopupV3Timestamp,
} from '@src/lib/utils/utils';

function CurrentPath() {
  const location = useLocation();

  return <span data-testid="current-path">{location.pathname}</span>;
}

const renderPopupWithRouter = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <MainPopupV3 />
      <CurrentPath />
    </MemoryRouter>,
  );

const originalReactAppEnv = process.env.REACT_APP_ENV;

describe('[메인] popup v3', () => {
  afterEach(() => {
    localStorage.clear();

    if (originalReactAppEnv === undefined) {
      delete process.env.REACT_APP_ENV;
      return;
    }

    process.env.REACT_APP_ENV = originalReactAppEnv;
  });

  test('현재 언어에 맞는 팝업 이미지를 보여주고 이미지 로드 이벤트를 전달한다.', () => {
    // Given
    const onClickContent = vi.fn();
    const onLoaded = vi.fn();

    const { container } = render(
      <PopupContent onClickContent={onClickContent} onLoaded={onLoaded} />,
    );

    const images = container.querySelectorAll('img');

    // When
    fireEvent.load(images[0]);
    fireEvent.load(images[1]);
    userEvent.click(screen.getByRole('button'));

    // Then
    expect(images[0]).toHaveAttribute('src', '/assets/popup/Popup3_KOR_md.jpg');
    expect(images[1]).toHaveAttribute('src', '/assets/popup/Popup3_KOR_sm.jpg');
    expect(onLoaded).toHaveBeenCalledTimes(2);
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
    expect(getDoNotShowPopupV3Timestamp()).toBeNull();
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
    expect(getDoNotShowPopupV3Timestamp()).not.toBeNull();
  });

  test('저장된 숨김 시간이 없으면 이미지를 보여주고 로드 후 닫기 컨트롤을 보여준다.', () => {
    // Given
    const { container } = renderPopupWithRouter();
    const images = container.querySelectorAll('img');

    // When
    fireEvent.load(images[0]);

    // Then
    expect(images).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'CLOSE' })).toBeVisible();
  });

  test('상세보기를 누르면 개발 환경 공지사항으로 이동한다.', () => {
    // Given
    const { container } = renderPopupWithRouter();

    // When
    userEvent.click(container.querySelector('[role="button"]') as HTMLElement);

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/cs/notice/148',
    );
  });

  test('프로덕션 환경에서는 프로덕션 공지사항으로 이동한다.', () => {
    // Given
    process.env.REACT_APP_ENV = 'production';
    const { container } = renderPopupWithRouter();

    // When
    userEvent.click(container.querySelector('[role="button"]') as HTMLElement);

    // Then
    expect(screen.getByTestId('current-path')).toHaveTextContent(
      '/cs/notice/28',
    );
  });

  test('만료된 숨김 시간이 있으면 저장소를 비우고 팝업을 다시 보여준다.', () => {
    // Given
    storeDoNotShowPopupV3Timestamp('2026-01-01T00:00:00Z');

    const { container } = renderPopupWithRouter();

    // Then
    expect(getDoNotShowPopupV3Timestamp()).toBeNull();
    expect(container.querySelectorAll('img')).toHaveLength(2);
  });
});
