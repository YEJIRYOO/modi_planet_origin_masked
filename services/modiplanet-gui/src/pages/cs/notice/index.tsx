import React, { Fragment, useEffect, useMemo, useState } from 'react';

import SearchBar from '@components/ui_old/search-bar/search-bar';
import NoticeComponent from '@src/pages/cs/notice/index.view';
import { CustomPagination } from '@components/ui_old/pagination/pagination';

import {
  LanguageType,
  NoticeConnectionOrderBy,
  OrderDirectionType,
} from '@services/gen/gen';
import { useNoticeList } from '@services/api/support/useNoticeList';
import useTranslator from '@hooks/useTranslator';

export default function NoticeContainer() {
  const first = 7;
  const { t, i18n } = useTranslator();

  const [pageNumber, setPageNumber] = useState<number>(0); // pageIndex
  const [keyword, setKeyword] = useState<string>('');

  const { noticeList, totalCount, loading, error, refetch } = useNoticeList({
    first,
    offset: pageNumber,
    orderBy: {
      field: 'CREATED_AT',
      direction: OrderDirectionType.Desc,
    } as NoticeConnectionOrderBy,
    where: {
      language: (i18n.language.toUpperCase() === 'ES'
        ? 'EN'
        : i18n.language.toUpperCase()) as LanguageType,
      ...(keyword && { keyword }),
    },
  });

  const onPageChange = (index: number) => {
    setPageNumber(index - 1);
  };

  const onSearch = (keyword: string) => {
    setKeyword(keyword);
  };

  useEffect(() => {
    refetch();
  }, [i18n.language, refetch]);

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-[30px] sm:flex-col sm:items-stretch sm:mb-[10px]">
        <div className="text-font-sub text-17 sm:order-2 sm:text-14">
          {t('TOTAL_OF')} <span className="text-brand">{totalCount}</span>
          {t('TOTAL_NUMBER')}
        </div>

        <div className="w-[404px] sm:w-full sm:order-1 sm:mb-5">
          <SearchBar onSubmit={onSearch} className="sm:p-[13px_20px]" />
        </div>
      </div>

      <div className="mb-[60px] border-t border-form-border">
        <NoticeComponent
          dataList={noticeList}
          pageNumber={pageNumber}
          first={first}
          totalCount={totalCount}
          isLoading={loading}
          isError={error}
        />
      </div>

      <div className="flex justify-center">
        <CustomPagination
          activePage={pageNumber + 1}
          itemsCountPerPage={first}
          totalItemsCount={totalCount}
          onChange={onPageChange}
        />
      </div>
    </Fragment>
  );
}
