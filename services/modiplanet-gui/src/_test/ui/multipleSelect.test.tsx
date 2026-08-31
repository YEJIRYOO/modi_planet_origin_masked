import { render, screen } from '@testing-library/react';

import MultipleSelectUI from '@src/components/ui/Select/MultipleSelectUI';

const items = [
  { id: 'basic', label: 'BASIC' },
  { id: 'ai', label: 'AI' },
  { id: 'locked', label: 'LOCKED' },
];

describe('[공통 UI] 다중 선택', () => {
  test('선택된 항목 수를 라벨과 함께 표시한다.', () => {
    // Given
    render(
      <MultipleSelectUI
        items={items}
        label="COURSE"
        selectedKeys={new Set(['basic', 'ai'])}
        onSelectionChange={vi.fn()}
        getKey={(item) => item.id}
        getLabel={(item) => item.label}
      />,
    );

    // Then
    expect(screen.getByText('COURSE(2)')).toBeVisible();
  });

  test('비활성화된 항목은 선택 개수에서 제외한다.', () => {
    // Given
    render(
      <MultipleSelectUI
        items={items}
        label="COURSE"
        selectedKeys={new Set(['basic', 'locked'])}
        onSelectionChange={vi.fn()}
        getKey={(item) => item.id}
        getLabel={(item) => item.label}
        disabledKeys={new Set(['locked'])}
      />,
    );

    // Then
    expect(screen.getByText('COURSE(1)')).toBeVisible();
  });

  test('전체 선택 상태에서도 비활성화된 항목은 선택 개수에서 제외한다.', () => {
    // Given
    render(
      <MultipleSelectUI
        items={items}
        label="COURSE"
        selectedKeys="all"
        onSelectionChange={vi.fn()}
        getKey={(item) => item.id}
        getLabel={(item) => item.label}
        disabledKeys={new Set(['locked'])}
      />,
    );

    // Then
    expect(screen.getByText('COURSE(2)')).toBeVisible();
  });
});
