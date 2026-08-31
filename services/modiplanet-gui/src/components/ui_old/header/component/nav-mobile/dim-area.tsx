import React, { MouseEvent } from 'react';
import classnames from 'classnames';

interface IDimArea {
  isOpen: boolean;
  onClick: () => void;
}

function DimArea({ isOpen, onClick }: IDimArea) {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <div
      className={classnames([
        'fixed inset-0 bg-[#00000060] z-[15000]',
        isOpen ? 'block' : 'hidden',
      ])}
      onClick={handleClick}
    >
      <div
        className="absolute top-6 right-6"
        role="button"
        onClick={handleClick}
      >
        <img src="/assets/close.svg" alt="close" />
      </div>
    </div>
  );
}

export default DimArea;
