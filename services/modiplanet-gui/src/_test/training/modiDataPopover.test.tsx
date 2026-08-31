import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataCardPopoverContent from '@src/pages/training/components/training-select-section/modi-data/data-card-popover-content';
import { ModiData } from '@src/lib/types/modi-data';

const data: ModiData = {
  id: 'modi-data-id',
  name: 'distance',
  moduleType: 'TOF',
  functionType: 'cm',
  createdAt: '2026-05-12',
  data: {
    name: 'TOF',
    function: 'cm',
    min: 0,
    max: 10,
    index: 0,
    data: [{ date: 1, value: 5, unit: 'cm' }],
  },
};

describe('[트레이닝] 모디 데이터 카드 팝오버', () => {
  test('다운로드, 이름 변경, 삭제 버튼을 표시하고 이름 변경과 삭제 클릭을 전달한다.', () => {
    const onRenameClick = vi.fn();
    const onDeleteClick = vi.fn();

    render(
      <DataCardPopoverContent
        data={data}
        onRenameClick={onRenameClick}
        onDeleteClick={onDeleteClick}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'RENAME' }));
    userEvent.click(screen.getByRole('button', { name: 'DELETE' }));

    expect(screen.getByRole('button', { name: 'DOWNLOAD' })).toBeVisible();
    expect(onRenameClick).toHaveBeenCalledTimes(1);
    expect(onDeleteClick).toHaveBeenCalledTimes(1);
  });
});
