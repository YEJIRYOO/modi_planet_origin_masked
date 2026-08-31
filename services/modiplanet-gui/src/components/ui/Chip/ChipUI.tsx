import { Chip, type ChipProps } from '@nextui-org/react';

interface ChipUIProps extends Omit<ChipProps, 'variant' | 'color' | 'size'> {
  variant?: 'filled' | 'light';
  color?: 'gray' | 'yellow' | 'green' | 'red';
  size?: 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
}

const sizeConfig: {
  [key in 'md' | 'lg' | 'xl']: {
    width: string;
    height: string;
  };
} = {
  // sm: {
  //   width: 'w-[50px]',
  //   height: 'h-[24px]',
  // },
  md: {
    width: 'min-w-[60px]',
    height: 'h-[20px]',
  },
  lg: {
    width: 'min-w-[60px]',
    height: 'h-[30px]',
  },
  xl: {
    width: 'min-w-[100px]',
    height: 'h-[32px]',
  },
};

function ChipUI({
  children,
  classNames,
  variant = 'filled',
  color = 'gray',
  size = 'md',
  ...props
}: ChipUIProps) {
  const sizeStyles = sizeConfig[size];

  const getStyles = () => {
    if (variant === 'filled') {
      const colorStyle = (() => {
        switch (color) {
          case 'yellow':
            return 'bg-sub2_yellow text-white';
          case 'green':
            return 'bg-sub2_green text-white';
          case 'gray':
          default:
            return 'bg-form-gray text-white';
        }
      })();
      // Fill variant: xl 사이즈일 때만 p4-sb, 나머지는 p8-sb
      const fontClass = size === 'xl' ? 'p4-sb' : 'p8-sb';
      return {
        base: `${colorStyle} ${sizeStyles.width} ${sizeStyles.height} rounded-full`,
        content: fontClass,
      };
    } else {
      const colorStyle = (() => {
        switch (color) {
          case 'red':
            return 'bg-brand_4 text-brand';
          case 'green':
            return 'bg-[#F4FFFB] text-[#00A879]';
          case 'yellow':
            return 'bg-[#FFFAEF] text-[#F0B000]';
          default:
            return 'bg-white border border-[#DDDDDD] text-[#2B2929]';
        }
      })();
      // Light variant: 모든 사이즈 p8-sb
      return {
        base: `${colorStyle} ${sizeStyles.width} ${sizeStyles.height} rounded-[10px] px-[10px]`,
        content: 'p8-sb',
      };
    }
  };

  const styles = getStyles();

  return (
    <Chip
      {...props}
      classNames={{
        base: `${styles.base} !shadow-none !ring-0 border-none ${
          variant === 'filled' ? 'px-5' : ''
        } flex-shrink-0 max-w-full justify-center items-center`,
        content: `text-center font-bold whitespace-nowrap !px-0 ${styles.content}`,
        ...classNames,
      }}
    >
      {children}
    </Chip>
  );
}

export default ChipUI;
