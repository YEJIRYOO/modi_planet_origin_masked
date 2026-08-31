import React, { HTMLProps, ReactNode } from 'react';
import classnames from 'classnames';

interface IButton extends HTMLProps<HTMLButtonElement> {
  type: 'red-border' | 'red';
  children: ReactNode;
  className?: string;
}

export function SubButton({ type, className, children, ...props }: IButton) {
  const styleByType = () => {
    switch (type) {
      case 'red-border':
        return 'bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white duration-200';
      case 'red':
        return 'bg-brand border-2 border-brand text-white hover:bg-white hover:text-brand duration-200';
    }
  };

  return (
    <button
      className={classnames([
        'flex justify-center items-center rounded-10 w-[160px] h-[50px] text-18 font-semibold',
        className,
        styleByType(),
        '[&:disabled]:bg-font-main',
        '[&:disabled]:cursor-default',
        '[&:disabled]:border-transparent',
        '[&:disabled]:hover:text-white',
      ])}
      {...props}
    >
      {children}
    </button>
  );
}

export default SubButton;
