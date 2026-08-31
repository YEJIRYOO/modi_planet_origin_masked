import {
  Input as NextuiInput,
  InputProps as NextuiInputProps,
} from '@nextui-org/react';

export interface InputProps extends NextuiInputProps {}

function Input({ ...props }: InputProps) {
  return <NextuiInput {...props} />;
}

export default Input;
