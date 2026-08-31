import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TrainingSubmitButtons from '@src/pages/training/components/training-select-section/training-submit-buttons';
import { useMyModelConnectionStore } from '@src/store/zustand';
import { AiModelCategoryType } from '@src/services/old/generated/graphql';

const defaultProps: React.ComponentProps<typeof TrainingSubmitButtons> = {
  currentView: 'category',
  onCreateMyModel: vi.fn(),
  onRetrainingClick: vi.fn(),
  onCreateAIBlock: vi.fn(),
  categoryButtonDisabled: false,
  myModelButtonsDisabled: false,
  selectedModelCategoryType: AiModelCategoryType.ImageClassifier,
  changeView: vi.fn(),
};

describe('[트레이닝] 하단 제출 버튼', () => {
  afterEach(() => {
    act(() => {
      useMyModelConnectionStore.setState({ modelConnection: null });
    });
    vi.clearAllMocks();
  });

  test('새 모델 탭에서는 학습 버튼 클릭으로 모델 생성을 요청한다.', () => {
    const onCreateMyModel = vi.fn();

    render(
      <TrainingSubmitButtons
        {...defaultProps}
        onCreateMyModel={onCreateMyModel}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'TRAIN' }));

    expect(onCreateMyModel).toHaveBeenCalledTimes(1);
  });

  test('내 모델 탭에서는 재학습과 가져오기 버튼을 표시한다.', () => {
    const onRetrainingClick = vi.fn();
    const onCreateAIBlock = vi.fn();

    render(
      <TrainingSubmitButtons
        {...defaultProps}
        currentView="my-model"
        onRetrainingClick={onRetrainingClick}
        onCreateAIBlock={onCreateAIBlock}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'TRAIN' }));
    userEvent.click(screen.getByRole('button', { name: 'IMPORT' }));

    expect(onRetrainingClick).toHaveBeenCalledTimes(1);
    expect(onCreateAIBlock).toHaveBeenCalledTimes(1);
  });

  test('모델 개수가 최대이면 알림 확인 후 내 모델 탭으로 이동한다.', () => {
    const changeView = vi.fn();

    useMyModelConnectionStore.setState({
      modelConnection: Array.from({ length: 20 }, (_, index) => ({
        id: `model-${index}`,
        name: `model-${index}`,
        imageUrl: '/model.svg',
        categoryType: AiModelCategoryType.ImageClassifier,
      })),
    });

    render(
      <TrainingSubmitButtons
        {...defaultProps}
        changeView={changeView}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: 'TRAIN' }));
    expect(screen.getByText('MODEL_ALERT_MAX_COUNT')).toBeVisible();

    userEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(changeView).toHaveBeenCalledWith('my-model');
  });

});
