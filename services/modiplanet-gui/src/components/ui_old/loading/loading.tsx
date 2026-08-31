import React from 'react';
import classNames from 'classnames';
import LogoSpinnerLoader from '@components/ui_old/loading/logo-spinner-loader';

interface ILoadingProps {
  className?: string;
}

export function Loading({ className }: ILoadingProps) {
  return (
    <div className={classNames('absolute inset-0 flex-center', className)}>
      <div>
        <LogoSpinnerLoader className="m-0-auto self-center w-[80px] h-[80px]" />
      </div>
    </div>
  );
}

export default Loading;
