import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TrainingSelectRadio from '@src/pages/training/components/training-select-section/training-select-radio';
import MyModelTabButtons from '@src/pages/training/components/training-select-section/training-submit-buttons/my-model-tab-buttons';

describe('[트레이닝] 선택 컨트롤', () => {
  test('모델 선택 라디오는 현재 탭을 활성 스타일로 표시하고 선택 변경을 전달한다.', () => {
    const onClickRadio = vi.fn();

    render(
      <TrainingSelectRadio
        currentViewType="category"
        onClickRadio={onClickRadio}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'MY_MODELS' }));

    expect(screen.getByRole('button', { name: 'NEW' })).toHaveClass(
      'bg-[#2B2929]',
      'text-white',
    );
    expect(onClickRadio).toHaveBeenCalledWith('my-model');
  });

  test('내 모델 탭 버튼은 재학습과 가져오기 클릭을 전달한다.', () => {
    const onRetrainingClick = vi.fn();
    const onCreateAIBlock = vi.fn();

    render(
      <MyModelTabButtons
        disabled={false}
        onRetrainingClick={onRetrainingClick}
        onCreateAIBlock={onCreateAIBlock}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'TRAIN' }));
    userEvent.click(screen.getByRole('button', { name: 'IMPORT' }));

    expect(onRetrainingClick).toHaveBeenCalledTimes(1);
    expect(onCreateAIBlock).toHaveBeenCalledTimes(1);
  });

  test('내 모델 탭 버튼은 비활성화되면 클릭을 전달하지 않는다.', () => {
    const onRetrainingClick = vi.fn();
    const onCreateAIBlock = vi.fn();

    render(
      <MyModelTabButtons
        disabled
        onRetrainingClick={onRetrainingClick}
        onCreateAIBlock={onCreateAIBlock}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'TRAIN' }));
    userEvent.click(screen.getByRole('button', { name: 'IMPORT' }));

    expect(screen.getByRole('button', { name: 'TRAIN' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'IMPORT' })).toBeDisabled();
    expect(onRetrainingClick).not.toHaveBeenCalled();
    expect(onCreateAIBlock).not.toHaveBeenCalled();
  });
});
