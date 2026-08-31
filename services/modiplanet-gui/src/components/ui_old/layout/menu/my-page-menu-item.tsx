import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import { EMypageMenu } from '@src/lib/constants/enums';
import ChevronNext from '@src/lib/assets/chevron/next.svg?react';

interface IMyPageMenuItemProps {
  menu: EMypageMenu;
  isActive: boolean;
  label: string;
}

export default function MyPageMenuItem({
  menu,
  isActive,
  label,
}: IMyPageMenuItemProps) {
  return (
    <div
      className={`rounded-[10px] sm:rounded-[4px] min-w-[170px] p-[10px_15px] sm:p-[5px_25px] p4-r sm:min-w-[110px] sm:w-max sm:flex-1 sm:text-14 ${
        isActive
          ? 'bg-form-form sm:bg-brand_4 sm:text-brand sm:font-bold sm:border sm:border-brand'
          : 'sm:bg-white sm:text-sub_1 sm:border'
      }`}
    >
      <Link className="flex items-center sm:justify-center" to={`/${menu}`}>
        <span className="flex-1 leading-6 sm:flex-none">{label}</span>
        <ChevronNext className="inline-block stroke-font-main sm:hidden" />
      </Link>
    </div>
  );
}
