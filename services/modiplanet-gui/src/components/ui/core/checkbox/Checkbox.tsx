import {
  Checkbox as NextuiCheckbox,
  CheckboxProps as NextuiCheckboxProps,
} from '@nextui-org/react';

export interface CheckboxProps extends NextuiCheckboxProps {}

function Checkbox({ ...props }: CheckboxProps) {
  return <NextuiCheckbox {...props} />;
}

export default Checkbox;
