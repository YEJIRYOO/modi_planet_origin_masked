import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RecordingDim from '@src/pages/training/components/RecordingDim';

describe('[트레이닝] 녹화 오버레이', () => {
  test('녹화 안내 문구와 취소 버튼을 표시하고 취소 클릭을 전달한다.', () => {
    const onCancel = vi.fn();

    render(<RecordingDim onCancel={onCancel} />);

    userEvent.click(screen.getByRole('button', { name: 'CANCEL' }));

    expect(screen.getByText('RECORDING_DESC')).toBeVisible();
    expect(screen.getByText('DO_NOT_STOP_MONITOR')).toBeVisible();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
