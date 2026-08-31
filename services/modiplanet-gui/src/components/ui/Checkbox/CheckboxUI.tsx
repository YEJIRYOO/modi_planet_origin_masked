import Checkbox from '@components/ui/core/checkbox/Checkbox';
import { CheckboxProps } from '@nextui-org/react';

interface CheckboxUIProps extends CheckboxProps {
  children?: React.ReactNode;
}

function CheckboxUI({ children, ...props }: CheckboxUIProps) {
  return (
    <Checkbox color="primary" size="lg" radius="sm" {...props}>
      {children}
    </Checkbox>
  );
}

export default CheckboxUI;
