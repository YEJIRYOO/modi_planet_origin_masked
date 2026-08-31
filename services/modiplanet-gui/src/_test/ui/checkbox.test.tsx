import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CheckboxUI from '@src/components/ui/Checkbox/CheckboxUI';

function ControlledCheckbox({
  onChange,
  isDisabled = false,
}: {
  onChange: (isSelected: boolean) => void;
  isDisabled?: boolean;
}) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <CheckboxUI
      isSelected={isSelected}
      isDisabled={isDisabled}
      onValueChange={(nextSelected) => {
        setIsSelected(nextSelected);
        onChange(nextSelected);
      }}
    >
      TERMS_AGREE
    </CheckboxUI>
  );
}

describe('[공통 UI] 체크박스', () => {
  test('체크박스를 클릭하면 선택 상태와 변경 값을 전달한다.', () => {
    // Given
    const onChange = vi.fn();

    render(<ControlledCheckbox onChange={onChange} />);

    // When
    userEvent.click(screen.getByRole('checkbox', { name: 'TERMS_AGREE' }));

    // Then
    expect(onChange).toHaveBeenLastCalledWith(true);
    expect(screen.getByRole('checkbox', { name: 'TERMS_AGREE' })).toBeChecked();
  });

  test('선택된 체크박스를 다시 클릭하면 선택을 해제한다.', () => {
    // Given
    const onChange = vi.fn();

    render(<ControlledCheckbox onChange={onChange} />);

    // When
    userEvent.click(screen.getByRole('checkbox', { name: 'TERMS_AGREE' }));
    userEvent.click(screen.getByRole('checkbox', { name: 'TERMS_AGREE' }));

    // Then
    expect(onChange).toHaveBeenLastCalledWith(false);
    expect(
      screen.getByRole('checkbox', { name: 'TERMS_AGREE' }),
    ).not.toBeChecked();
  });

  test('비활성화된 체크박스는 클릭해도 변경 값을 전달하지 않는다.', () => {
    // Given
    const onChange = vi.fn();

    render(<ControlledCheckbox onChange={onChange} isDisabled />);

    // When
    userEvent.click(screen.getByRole('checkbox', { name: 'TERMS_AGREE' }));

    // Then
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('checkbox', { name: 'TERMS_AGREE' })).toBeDisabled();
  });
});
