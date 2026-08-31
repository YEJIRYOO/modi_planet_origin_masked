import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TrainingDetailHeader from '@src/pages/training/components/TrainingDetailHeader';
import TrainingHomeHeader from '@src/pages/training/components/TrainingHomeHeader';

describe('[트레이닝] 헤더', () => {
  test('상세 헤더는 제목을 표시하고 뒤로가기와 닫기 클릭을 전달한다.', () => {
    const onClickBack = vi.fn();
    const onClickClose = vi.fn();

    render(
      <TrainingDetailHeader
        title="이미지 모델 만들기"
        onClickBack={onClickBack}
        onClickClose={onClickClose}
      />,
    );

    const buttons = screen.getAllByRole('button');

    userEvent.click(buttons[0]);
    userEvent.click(buttons[1]);

    expect(screen.getByRole('heading', { name: '이미지 모델 만들기' })).toBeVisible();
    expect(onClickBack).toHaveBeenCalledTimes(1);
    expect(onClickClose).toHaveBeenCalledTimes(1);
  });

  test('홈 헤더는 제목과 안내 아이콘을 표시하고 닫기 클릭을 전달한다.', () => {
    const onClickClose = vi.fn();

    render(<TrainingHomeHeader title="AI 모델 학습" onClickClose={onClickClose} />);

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('heading', { name: 'AI 모델 학습' })).toBeVisible();
    expect(screen.getByAltText('info')).toHaveAttribute(
      'src',
      '/assets/mypage/info.svg',
    );
    expect(screen.getByAltText('info active')).toHaveAttribute(
      'src',
      '/assets/mypage/info-active.svg',
    );
    expect(onClickClose).toHaveBeenCalledTimes(1);
  });
});
