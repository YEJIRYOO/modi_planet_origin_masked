import React, { useMemo } from 'react';
import classnames from 'classnames';

export type TBadgeColor = 'main' | 'amber' | 'purple' | 'grey' | 'lx';

interface IBadge {
  color?: TBadgeColor;
  hasBorder?: boolean;
  content: string;
  isView?: boolean;
  className?: string;
}

export function Badge({
  className,
  isView = false,
  content,
  color,
  hasBorder = false,
}: IBadge) {
  const stylesByType = useMemo(() => {
    switch (color) {
      case 'main':
      default:
        return hasBorder
          ? 'border border-brand text-brand'
          : 'bg-brand text-white';

      case 'amber':
        return hasBorder
          ? 'border border-amber text-amber'
          : 'bg-amber text-white';

      case 'purple':
        return hasBorder
          ? 'border border-sub2_purple text-sub2_purple'
          : 'bg-sub2_purple text-white';

      case 'grey':
        return hasBorder
          ? 'border border-[#333] text-[#333]'
          : 'bg-[#333] text-white';

      case 'lx':
        return hasBorder ? 'border border-lx text-lx' : 'bg-lx text-white';
    }
  }, [color, hasBorder]);

  return (
    <div
      className={classnames([
        'flex-center p4-b rounded-10 inline-block text-white w-[70px] h-[30px]',
        stylesByType,
        {
          hidden: isView,
        },
        className,
      ])}
    >
      {content}
    </div>
  );
}

export default Badge;
