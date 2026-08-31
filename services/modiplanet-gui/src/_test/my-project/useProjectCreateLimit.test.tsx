import { fireEvent, render, screen } from '@testing-library/react';

import { EStorageKey } from '@src/lib/constants/enums';
import { useProjectCreateLimit } from '@src/pages/my-project/hooks/useProjectCreateLimit';

function ProjectCreateLimitHarness() {
  const { canCreate, recordCreate, reset } = useProjectCreateLimit();

  return (
    <>
      <button onClick={recordCreate}>record</button>
      <button onClick={reset}>reset</button>
      <output data-testid="can-create">{String(canCreate())}</output>
    </>
  );
}

describe('[마이 프로젝트] 프로젝트 생성 제한 hook', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Date, 'now').mockReturnValue(10_000);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('저장된 생성 기록 중 시간 제한이 지난 기록은 제외한다.', () => {
    // Given
    localStorage.setItem(
      EStorageKey.PROJECT_CREATE_TIMES,
      JSON.stringify([1_000, 8_000]),
    );

    // When
    render(<ProjectCreateLimitHarness />);

    // Then
    expect(screen.getByTestId('can-create')).toHaveTextContent('true');
    expect(localStorage.getItem(EStorageKey.PROJECT_CREATE_TIMES)).toBe(
      JSON.stringify([8_000]),
    );
  });

  test('5초 안에 5번 생성하면 추가 생성을 막고 초기화할 수 있다.', () => {
    // Given
    render(<ProjectCreateLimitHarness />);

    // When
    Array.from({ length: 5 }).forEach(() => {
      fireEvent.click(screen.getByRole('button', { name: 'record' }));
    });

    // Then
    expect(screen.getByTestId('can-create')).toHaveTextContent('false');

    // When
    fireEvent.click(screen.getByRole('button', { name: 'reset' }));

    // Then
    expect(screen.getByTestId('can-create')).toHaveTextContent('true');
    expect(localStorage.getItem(EStorageKey.PROJECT_CREATE_TIMES)).toBe('[]');
  });
});
