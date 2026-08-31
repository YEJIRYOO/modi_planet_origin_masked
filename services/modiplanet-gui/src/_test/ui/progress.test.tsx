import { render, screen } from '@testing-library/react';

import ProgressUI from '@src/components/ui/Progress/ProgressUI';

describe('[공통 UI] 진행률', () => {
  test('진행률 값을 progressbar 접근성 값으로 표시한다.', () => {
    // Given
    render(<ProgressUI aria-label="UPLOAD_PROGRESS" value={40} />);

    // Then
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '40',
    );
  });

  test('진행률 색상과 크기 스타일을 적용한다.', () => {
    // Given
    const { container } = render(
      <ProgressUI
        aria-label="UPLOAD_PROGRESS"
        value={70}
        size="sm"
        indicatorColor="#00A879"
        className="progress-container"
        classNames={{
          track: 'progress-track',
          indicator: 'progress-indicator',
        }}
      />,
    );

    // Then
    expect(container.querySelector('.progress-container')).toHaveStyle({
      '--progress-bg': '#00A879',
    });
    expect(container.querySelector('.progress-track')).toHaveClass('h-[8px]');
    expect(container.querySelector('.progress-indicator')).toHaveClass(
      '[background:var(--progress-bg)!important]',
    );
  });
});
