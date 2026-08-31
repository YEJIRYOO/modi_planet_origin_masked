import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import MyPageMenuItem from '@components/ui_old/layout/menu/my-page-menu-item';
import { EMypageMenu } from '@src/lib/constants/enums';

const renderMyPageMenuItem = (
  props?: Partial<React.ComponentProps<typeof MyPageMenuItem>>,
) => {
  const defaultProps: React.ComponentProps<typeof MyPageMenuItem> = {
    menu: EMypageMenu.MYPAGE,
    isActive: false,
    label: 'ACCOUNT',
  };

  return render(
    <MemoryRouter>
      <MyPageMenuItem {...defaultProps} {...props} />
    </MemoryRouter>,
  );
};

const getLinkByLabel = (label: string) => screen.getByText(label).closest('a');
const getMenuBaseByLabel = (label: string) =>
  screen.getByText(label).closest('div');

describe('[마이페이지] 메뉴 아이템', () => {
  test('메뉴 라벨과 이동 경로를 표시한다.', () => {
    // Given
    renderMyPageMenuItem({
      menu: EMypageMenu.MYPROJECT,
      label: 'MY_PROJECTS',
    });

    // Then
    expect(getLinkByLabel('MY_PROJECTS')).toHaveAttribute(
      'href',
      '/my-project',
    );
  });

  test('활성 메뉴이면 선택 스타일을 적용한다.', () => {
    // Given
    renderMyPageMenuItem({ isActive: true });

    // Then
    expect(getMenuBaseByLabel('ACCOUNT')).toHaveClass('bg-form-form');
  });

  test('비활성 메뉴이면 선택 스타일을 적용하지 않는다.', () => {
    // Given
    renderMyPageMenuItem({ isActive: false });

    // Then
    expect(getMenuBaseByLabel('ACCOUNT')).not.toHaveClass('bg-form-form');
  });
});
