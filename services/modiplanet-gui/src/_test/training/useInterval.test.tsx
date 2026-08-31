import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useInterval } from '@src/pages/training/voice/hooks/useInterval';

function IntervalHarness({ onTick }: { onTick: () => void }) {
  const { startInterval, stopInterval } = useInterval(onTick, 1000);

  return (
    <>
      <button onClick={startInterval}>START</button>
      <button onClick={stopInterval}>STOP</button>
    </>
  );
}

describe('[트레이닝] useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('시작 후 interval마다 콜백을 실행하고 중지 후에는 실행하지 않는다.', () => {
    const onTick = vi.fn();

    render(<IntervalHarness onTick={onTick} />);

    userEvent.click(screen.getByRole('button', { name: 'START' }));
    vi.advanceTimersByTime(2500);
    userEvent.click(screen.getByRole('button', { name: 'STOP' }));
    vi.advanceTimersByTime(2000);

    expect(onTick).toHaveBeenCalledTimes(2);
  });
});
