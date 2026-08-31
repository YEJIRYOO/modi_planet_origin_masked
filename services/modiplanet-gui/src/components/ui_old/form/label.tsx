import React from 'react';
import classnames from 'classnames';

interface ILabel
  extends React.HTMLAttributes<HTMLLabelElement>,
    React.HTMLProps<HTMLLabelElement> {
  isRequired?: boolean;
  width?: 'sm' | 'md';
}

export function Label({
  size,
  width = 'sm',
  children,
  className,
  isRequired = false,
  ...props
}: ILabel) {
  return (
    <label
      {...props}
      className={classnames([
        'inline-block shrink-0 p3-r sm:mb-2 text-font-sub',
        width === 'sm' && 'min-w-[130px]',
        width === 'md' && 'min-w-[160px]',
        className,
      ])}
    >
      {children}&nbsp;{isRequired && <span className="text-brand">*</span>}
    </label>
  );
}

export default Label;
