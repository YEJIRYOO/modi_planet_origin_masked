import React from 'react';
import { localizeUTC } from '@src/lib/utils/utils';
import useTranslator from '@hooks/useTranslator';

interface IBoardTitleSection {
  title: string;
  createdAt: string;
  viewCount: number;
}

export function BoardTitleSection({
  title,
  createdAt,
  viewCount,
}: IBoardTitleSection) {
  const { t } = useTranslator();

  return (
    <div className="">
      <h1 className="h2-b mb-[40px] ellipsis-2 sm:ellipsis-4">{title}</h1>

      <div className="flex-center text-font-sub_2 gap-[30px] p5-r">
        <p className="">
          <span className="p5-sb sm:hidden">{t('WRITER')} : </span>
          {t('ADMIN')}
        </p>
        <p className="">
          <span className="p5-sb sm:hidden">{t('ASSIGNED_DATE')} : </span>
          {localizeUTC(createdAt, 'date')}
        </p>
        <p>
          <span className="p5-sb">{t('VIEWS')} : </span>
          {viewCount}
        </p>
      </div>
    </div>
  );
}

export default BoardTitleSection;
