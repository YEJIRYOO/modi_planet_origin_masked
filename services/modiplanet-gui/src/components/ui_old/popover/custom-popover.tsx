import React, { ReactNode, useState } from 'react';
import { Popover, PopoverProps } from 'react-tiny-popover';

interface ICustomPopover {
  content: JSX.Element | null;
  children: ReactNode;
  onClose?: () => void;
  props?: Partial<PopoverProps>;
  // isClosableByClickOutside?: boolean;
}

export function CustomPopover({
  content,
  children,
  // isClosableByClickOutside = true,
  onClose,
  props,
}: ICustomPopover) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleView = () => {
    setIsOpen((prev) => !prev);
  };

  const onClickOutside = () => {
    toggleView();

    if (onClose) {
      onClose();
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      positions={['bottom']}
      padding={34}
      reposition={true}
      onClickOutside={onClickOutside}
      containerStyle={{ zIndex: '1000' }}
      content={<div onClick={toggleView}>{content}</div>}
      {...props}
    >
      <div role="button" className="inline" onClick={toggleView}>
        {children}
      </div>
    </Popover>
  );
}

export default CustomPopover;
