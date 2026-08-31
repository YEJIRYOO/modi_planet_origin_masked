import { Button, ButtonProps } from '@nextui-org/react';
import { useMemo } from 'react';

interface ButtonUIProps extends ButtonProps {
  size?: ButtonProps['size'];
  bordered?: boolean;
  children?: React.ReactNode;
  color?: ButtonProps['color'];
  rounded?: boolean;
}
const config: {
  [key in 'sm' | 'md' | 'lg']: {
    height: string;
    height_sm: string;
    gap: string;
    weight: string;
  };
} = {
  sm: {
    height: 'h-[32px]',
    height_sm: 'sm:h-[30px]',
    gap: 'pl-[12px] pr-[12px]',
    weight: 'semibold',
  },
  md: {
    height: 'h-[46px]',
    height_sm: 'sm:h-[46px]',
    gap: 'pl-0 pr-0',
    weight: 'semibold',
  },
  lg: {
    height: 'h-[60px]',
    height_sm: 'sm:h-[46px]',
    gap: 'pl-[46px] pr-[46px]',
    weight: 'semibold',
  },
};

function EmailVerifyButtonUI({
  size = 'md',
  bordered = false,
  color = 'primary',
  children,
  rounded = false,
  className,
  isDisabled,
  ...props
}: ButtonUIProps) {
  const variant: ButtonProps['variant'] = useMemo(() => {
    return bordered ? 'bordered' : 'solid';
  }, [bordered]);

  const coreConfig = useMemo(() => {
    return config[size];
  }, [size]);

  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      className={`${coreConfig.height} ${coreConfig.height_sm} ${
        coreConfig.gap
      } ${coreConfig.weight} ${className} ${
        isDisabled ? 'bg-form-disable color-white border-none' : ''
      } flex-center min-w-0`}
      radius={rounded ? 'full' : undefined}
      isDisabled={isDisabled}
      {...props}
    >
      {children}
    </Button>
  );
}

export default EmailVerifyButtonUI;
