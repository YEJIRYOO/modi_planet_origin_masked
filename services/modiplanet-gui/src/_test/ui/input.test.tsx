import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ErrorBorderedInputUI from '@src/components/ui/Input/ErrorBorderedInputUI';
import InputUI from '@src/components/ui/Input/InputUI';

function ControlledInput({
  onChange,
  placeholder = 'ENTER_TEXT',
}: {
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState('');

  return (
    <InputUI
      value={value}
      onValueChange={(nextValue) => {
        setValue(nextValue);
        onChange(nextValue);
      }}
      placeholder={placeholder}
    />
  );
}

describe('[공통 UI] 입력 필드', () => {
  test('입력값이 변경되면 변경 값을 전달한다.', () => {
    // Given
    const onChange = vi.fn();

    render(<ControlledInput onChange={onChange} />);

    // When
    userEvent.type(screen.getByPlaceholderText('ENTER_TEXT'), 'modi');

    // Then
    expect(onChange).toHaveBeenLastCalledWith('modi');
    expect(screen.getByPlaceholderText('ENTER_TEXT')).toHaveValue('modi');
  });

  test('에러 상태이면 입력 필드를 invalid로 표시하고 에러 메시지를 보여준다.', () => {
    // Given
    render(
      <ErrorBorderedInputUI
        value="wrong-email"
        onValueChange={vi.fn()}
        placeholder="EMAIL"
        isInvalid
        errorMessage="INVALID_EMAIL_FORMAT"
      />,
    );

    // Then
    expect(screen.getByPlaceholderText('EMAIL')).toHaveValue('wrong-email');
    expect(screen.getByText('INVALID_EMAIL_FORMAT')).toBeVisible();
  });

  test('에러 상태가 아니면 에러 메시지를 보여주지 않는다.', () => {
    // Given
    render(
      <ErrorBorderedInputUI
        value="student@example.com"
        onValueChange={vi.fn()}
        placeholder="EMAIL"
      />,
    );

    // Then
    expect(screen.getByPlaceholderText('EMAIL')).toHaveValue(
      'student@example.com',
    );
    expect(screen.queryByText('INVALID_EMAIL_FORMAT')).not.toBeInTheDocument();
  });
});
