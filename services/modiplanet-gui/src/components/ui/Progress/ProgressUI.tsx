import {
  Progress as NextuiProgress,
  ProgressProps as NextuiProgressProps,
} from '@nextui-org/react';

interface ProgressUIProps extends NextuiProgressProps {
  variant?: 'brand' | 'form';
  size?: 'sm' | 'md';
  indicatorColor?: string;
}

const sizeConfig = {
  sm: 'h-[8px]',
  md: 'h-[12px]',
};

function ProgressUI({
  variant = 'brand',
  size = 'md',
  indicatorColor = '#FF4547',
  className,
  classNames,
  ...props
}: ProgressUIProps) {
  return (
    <div
      className={className}
      style={{ ...props.style, '--progress-bg': indicatorColor } as React.CSSProperties}
    >
      <NextuiProgress
        classNames={{
          ...classNames,
          indicator: `[background:var(--progress-bg)!important] ${classNames?.indicator || ''}`,
          track: `${sizeConfig[size]} ${classNames?.track || ''}`,
        }}
        {...props}
      />
    </div>
  );
}

export default ProgressUI;
