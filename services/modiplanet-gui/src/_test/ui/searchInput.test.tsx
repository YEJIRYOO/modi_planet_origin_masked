import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchInputUI from '@src/components/ui/Input/SearchInputUI';

function SearchInputTest({
  onChange,
  placeholder = 'SEARCH',
}: {
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState('');

  return (
    <SearchInputUI
      value={value}
      onChange={(nextValue) => {
        setValue(nextValue);
        onChange(nextValue);
      }}
      placeholder={placeholder}
    />
  );
}

describe('[공통 UI] 검색 입력', () => {
  test('검색어를 입력하면 변경 값을 전달한다.', () => {
    // Given
    const onChange = vi.fn();

    render(<SearchInputTest onChange={onChange} />);

    // When
    userEvent.type(screen.getByPlaceholderText('SEARCH'), 'modi');

    // Then
    expect(onChange).toHaveBeenLastCalledWith('modi');
    expect(screen.getByPlaceholderText('SEARCH')).toHaveValue('modi');
  });

  test('Enter 키를 누르면 현재 검색어로 제출한다.', () => {
    // Given
    const onSubmit = vi.fn();

    render(
      <SearchInputUI
        value="modi"
        onChange={vi.fn()}
        onSubmit={onSubmit}
        placeholder="SEARCH"
      />,
    );

    // When
    userEvent.type(screen.getByPlaceholderText('SEARCH'), '{enter}');

    // Then
    expect(onSubmit).toHaveBeenCalledWith('modi');
  });

  test('검색 아이콘을 클릭하면 현재 검색어로 제출한다.', () => {
    // Given
    const onSubmit = vi.fn();
    const { container } = render(
      <SearchInputUI
        value="modi"
        onChange={vi.fn()}
        onSubmit={onSubmit}
        placeholder="SEARCH"
      />,
    );

    const searchIcon = container.querySelector('svg');

    // When
    userEvent.click(searchIcon as SVGElement);

    // Then
    expect(onSubmit).toHaveBeenCalledWith('modi');
  });

  test('검색 버튼이 비활성화된 상태면 검색 아이콘을 클릭해도 제출하지 않는다.', () => {
    // Given
    const onSubmit = vi.fn();
    const { container } = render(
      <SearchInputUI
        value="modi"
        onChange={vi.fn()}
        onSubmit={onSubmit}
        placeholder="SEARCH"
        disableSearchButton
      />,
    );

    const searchIcon = container.querySelector('svg');

    // When
    userEvent.click(searchIcon as SVGElement);

    // Then
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
