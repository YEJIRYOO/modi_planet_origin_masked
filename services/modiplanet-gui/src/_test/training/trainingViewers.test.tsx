import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ImageViewer from '@src/pages/training/image/components/classfier-card/image-viewer';
import ThumbnailImage from '@src/pages/training/image/components/classfier-card/image-viewer/thumbnail-image';
import ModiThumbnailImage from '@src/pages/training/modi/components/ClassfierCard/ModiViewer/ThumbnailIImage';
import ModiViewer from '@src/pages/training/modi/components/ClassfierCard/ModiViewer';

describe('[트레이닝] 데이터 뷰어', () => {
  test('이미지 썸네일은 그리드 상태에서 삭제 버튼 클릭을 전달한다.', () => {
    const deleteImageUrl = vi.fn();

    render(
      <ThumbnailImage
        url="/sample.png"
        isGridView
        deleteImageUrl={deleteImageUrl}
      />,
    );

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByAltText('imagess')).toHaveAttribute('src', '/sample.png');
    expect(deleteImageUrl).toHaveBeenCalledTimes(1);
  });

  test('이미지 뷰어는 데이터셋을 썸네일 목록으로 표시하고 index 삭제를 전달한다.', () => {
    const deleteImageUrl = vi.fn();

    render(
      <ImageViewer
        isGridView
        dataset={['/one.png', '/two.png']}
        deleteImageUrl={deleteImageUrl}
      />,
    );

    userEvent.click(screen.getAllByRole('button')[1]);

    expect(screen.getAllByAltText('imagess')).toHaveLength(2);
    expect(deleteImageUrl).toHaveBeenCalledWith(1);
  });

  test('모디 썸네일은 데이터가 없으면 로딩을 표시하고 삭제 클릭을 전달한다.', () => {
    const deleteImageUrl = vi.fn();

    render(
      <ModiThumbnailImage
        data={null as any}
        isGridView
        deleteImageUrl={deleteImageUrl}
      />,
    );

    userEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Loading...')).toBeVisible();
    expect(deleteImageUrl).toHaveBeenCalledTimes(1);
  });

  test('모디 뷰어는 빈 데이터셋을 렌더링할 수 있다.', () => {
    const { container: modiContainer } = render(
      <ModiViewer isGridView={false} dataset={[]} deleteImageUrl={vi.fn()} />,
    );

    expect(modiContainer.firstElementChild).toHaveClass('flex');
  });
});
