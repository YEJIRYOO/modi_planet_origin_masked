import { useMemo } from 'react';

import {
  Button as NextuiButton,
  ButtonProps as NextuiButtonProps,
} from '@nextui-org/react';

interface ButtonUIProps extends NextuiButtonProps {
  size?: NextuiButtonProps['size'];
  bordered?: boolean;
  children?: React.ReactNode;
  color?: NextuiButtonProps['color'];
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
    height_sm: 'sm:h-[34px]',
    gap: 'pl-[23px] pr-[23px]',
    weight: 'semibold',
  },
  lg: {
    height: 'h-[60px]',
    height_sm: 'sm:h-[46px]',
    gap: 'pl-[46px] pr-[46px]',
    weight: 'semibold',
  },
};

function ButtonUI({
  size = 'md',
  bordered = false,
  color = 'primary',
  children,
  rounded = false,
  className,
  isDisabled,
  ...props
}: ButtonUIProps) {
  const variant: NextuiButtonProps['variant'] = useMemo(() => {
    return bordered ? 'bordered' : 'solid';
  }, [bordered]);

  const coreConfig = useMemo(() => {
    return config[size];
  }, [size]);

  return (
    <NextuiButton
      variant={variant}
      size={size}
      color={color}
      className={`${coreConfig.height} ${coreConfig.height_sm} ${
        coreConfig.gap
      } ${coreConfig.weight} ${className} ${
        isDisabled ? 'bg-form-disable text-white border-none' : ''
      }`}
      radius={rounded ? 'full' : undefined}
      isDisabled={isDisabled}
      {...props}
    >
      {children}
    </NextuiButton>
  );
}

export default ButtonUI;
