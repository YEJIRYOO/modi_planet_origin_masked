import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TrainingContent from '@src/pages/training/components/training-content';
import MyModelPopoverContent from '@src/pages/training/components/training-select-section/my-model-list/my-model-popover-content';

describe('[트레이닝] 보조 UI', () => {
  test('트레이닝 콘텐츠는 children을 섹션 안에 표시한다.', () => {
    render(
      <TrainingContent>
        <div>TRAINING_CHILD</div>
      </TrainingContent>,
    );

    expect(screen.getByText('TRAINING_CHILD').closest('section')).toHaveClass(
      'max-w-[1920px]',
      'flex-1',
    );
  });

  test('내 모델 팝오버는 삭제와 이름 변경 클릭을 전달한다.', () => {
    const onClickDelete = vi.fn();
    const onClickRename = vi.fn();

    render(
      <MyModelPopoverContent
        onClickDelete={onClickDelete}
        onClickRename={onClickRename}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'DELETE' }));
    userEvent.click(screen.getByRole('button', { name: 'RENAME' }));

    expect(onClickDelete).toHaveBeenCalledTimes(1);
    expect(onClickRename).toHaveBeenCalledTimes(1);
  });
});
