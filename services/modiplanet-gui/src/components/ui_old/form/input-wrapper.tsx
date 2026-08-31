import React from 'react';
import classnames from 'classnames';

type TInputWrapper = React.HTMLAttributes<HTMLDivElement> &
  React.HTMLProps<HTMLDivElement>;

export function InputWrapper({ className, children, ...props }: TInputWrapper) {
  return (
    <div {...props} className={classnames(['flex sm:items-start', className])}>
      {children}
    </div>
  );
}

export default InputWrapper;
