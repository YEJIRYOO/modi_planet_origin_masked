import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreateMyModelCard from '@src/pages/training/components/training-select-section/my-model-list/create-my-model-card';
import ModelCategoryCard from '@src/pages/training/components/training-select-section/model-categories/model-category-card';
import { AiModelCategoryType } from '@src/services/old/generated/graphql';

describe('[트레이닝] 모델 카드', () => {
  test('모델 생성 카드는 새 모델 문구를 표시하고 클릭을 전달한다.', () => {
    const onClick = vi.fn();

    render(<CreateMyModelCard onClick={onClick} />);

    userEvent.click(screen.getByRole('button', { name: /NEW_MODEL/ }));

    expect(screen.getByText('NEW_MODEL')).toBeVisible();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('모델 카테고리 카드는 활성 상태 스타일과 썸네일 대체 텍스트를 표시한다.', () => {
    const onClick = vi.fn();

    render(
      <ModelCategoryCard
        thumbnail="/assets/training/image.svg"
        modelType={AiModelCategoryType.ImageClassifier}
        isActive
        isPreParing={false}
        title="이미지"
        desc="이미지로 학습"
        onClick={onClick}
      />,
    );

    userEvent.click(screen.getByRole('button', { name: /이미지로 학습/ }));

    expect(screen.getByRole('button')).toHaveClass('bg-brand', 'text-white');
    expect(
      screen.getByAltText(AiModelCategoryType.ImageClassifier),
    ).toHaveAttribute('src', '/assets/training/image.svg');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('준비 중인 모델 카테고리 카드는 클릭을 전달하지 않고 준비 문구를 표시한다.', () => {
    const onClick = vi.fn();
    const { container } = render(
      <ModelCategoryCard
        thumbnail="/assets/training/text.svg"
        modelType={AiModelCategoryType.TextClassifier}
        isActive={false}
        isPreParing
        title="텍스트"
        desc="텍스트로 학습"
        onClick={onClick}
      />,
    );

    userEvent.click(screen.getByText('PREPARING'));

    expect(container.firstElementChild).not.toHaveAttribute('role', 'button');
    expect(screen.getByText('PREPARING')).toBeVisible();
    expect(onClick).not.toHaveBeenCalled();
  });
});
