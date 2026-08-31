import { useRef, useState } from 'react';
import { Input, type InputProps } from '@nextui-org/react';
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import ClearIcon from './ClearIcon';

import { SIGNIN_TEST_ID } from '@src/_test/signin/util/testId';

interface InputUIProps extends InputProps {
  children?: React.ReactNode;
  isVisibleToggle?: boolean;
}

function PasswordInputUI({
  children,
  isVisibleToggle,
  onValueChange,
  ...props
}: InputUIProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState('');

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleChange = (e) => setValue(e.target.value);

  const handleClearClick = () => {
    handleValueChange('');
    setValue('');
    inputRef.current?.focus();
  };

  const inputType = () => {
    if (isVisibleToggle) {
      return isVisible ? 'text' : 'password';
    }

    return props.type || 'text';
  };

  const handleValueChange = (value: string) => {
    onValueChange && onValueChange(value);
  };

  return (
    <Input
      ref={inputRef}
      {...props}
      onValueChange={handleValueChange}
      value={value}
      onChange={handleChange}
      classNames={{
        inputWrapper:
          'bg-white border border-[#DDDDDD] shadow-none h-[46px] data-[hover=true]:bg-white group-data-[focus=true]:bg-white',
      }}
      autoComplete="new-password"
      type={inputType()}
      endContent={
        <div className="flex items-center">
          {value && (
            <>
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon
                    data-testid={SIGNIN_TEST_ID.EYE_SLASHED_BUTTON}
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                ) : (
                  <EyeFilledIcon
                    data-testid={SIGNIN_TEST_ID.EYE_OPENED_BUTTON}
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                )}
              </button>
              <span
                data-testid={SIGNIN_TEST_ID.INPUT_RESET_BUTTON}
                onClick={handleClearClick}
                className="cursor-pointer"
              >
                <ClearIcon isVisible={value.length > 0} />
              </span>
            </>
          )}
        </div>
      }
    >
      {children}
    </Input>
  );
}

export default PasswordInputUI;
