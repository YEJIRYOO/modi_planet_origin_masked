import React, { useMemo } from 'react';
import { localizeUTC } from '@src/lib/utils/utils';
import useTranslator from '@hooks/useTranslator';

interface IBoardItem {
  title: string;
  createdAt: string;
  id: string;
  isNew: boolean;
  onClick: (id: string) => void;
  pageNumber: number;
  first: number;
  itemIndex: number;
}

export function BoardItem({
  createdAt,
  id,
  title,
  onClick,
  isNew,
  itemIndex,
}: IBoardItem) {
  const { t } = useTranslator();
  const getDate = useMemo(() => {
    return localizeUTC(createdAt, 'date');
  }, [createdAt]);

  return (
    <div
      role="button"
      className="relative group flex items-center h-[72px] border-b border-form-border bg-white p-[0_57px_0_47px] p3-r duration-200 sm:flex-col sm:h-[103px] sm:justify-between sm:items-stretch sm:p-[16px]"
      onClick={() => onClick(id)}
    >
      <p className="mr-[47px] text-font-sub sm:m-0">{itemIndex}</p>
      {isNew && (
        <span className="mr-[10px] p3-b text-brand_dark inline sm:absolute sm:right-[16px] sm:top-[16px] sm:m-0">
          NEW
        </span>
      )}
      <p className="flex-grow-[1] pr-[8px] p3-m group-hover:underline text-ellipsis overflow-hidden whitespace-nowrap sm:flex-grow-0">
        {title}
      </p>
      <div className="shrink-0">
        <p className="flex sm:justify-between">
          <span className="text-font-sub">{t('ADMIN')}</span>
          <span className="inline-block text-right text-font-sub w-[110px] ml-[80px] sm:ml-[10px] sm:text-end sm:w-auto">
            {getDate}
          </span>
        </p>
      </div>
    </div>
  );
}

export default BoardItem;
