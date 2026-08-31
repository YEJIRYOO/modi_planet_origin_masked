import { useRef, useState } from 'react';

import {
  Tooltip as NextuiTooltip,
  TooltipProps as NextuiTooltipProps,
} from '@nextui-org/react';

interface TooltipUIProps extends NextuiTooltipProps {
  children?: React.ReactNode;
}

function useTouchSupport() {
  const [isTouch] = useState(
    () =>
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0),
  );
  return isTouch;
}

function TooltipUI({
  children,
  isOpen,
  onOpenChange,
  ...props
}: TooltipUIProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const clickedRef = useRef(false);
  const isTouch = useTouchSupport();

  // 터치 미지원: NextUI 기본 hover 동작
  if (!isTouch) {
    return (
      <NextuiTooltip isOpen={isOpen} onOpenChange={onOpenChange} {...props}>
        {children}
      </NextuiTooltip>
    );
  }

  // 터치 기기: controlled 모드 + onClick/onBlur
  const handleOpenChange = (open: boolean) => {
    setIsTooltipOpen(open);
    onOpenChange?.(open);
  };

  return (
    <NextuiTooltip
      isOpen={isOpen ?? isTooltipOpen}
      onOpenChange={handleOpenChange}
      {...props}
    >
      <div
        tabIndex={0}
        onClick={() => {
          clickedRef.current = true;
          handleOpenChange(!isTooltipOpen);
          setTimeout(() => {
            clickedRef.current = false;
          }, 300);
        }}
        onBlur={() => {
          if (!clickedRef.current) {
            handleOpenChange(false);
          }
        }}
      >
        {children}
      </div>
    </NextuiTooltip>
  );
}

export default TooltipUI;
