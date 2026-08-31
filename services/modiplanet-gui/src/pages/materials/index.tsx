import React, { useEffect, useState } from 'react';

import SearchBar from '@components/ui_old/search-bar/search-bar';
import { CustomPagination } from '@components/ui_old/pagination/pagination';

import useTranslator from '@hooks/useTranslator';
import { useLibraryConnection } from '@src/pages/materials/hooks/useLibraryConnection';
import MaterialsComponent from '@src/pages/materials/index.view';
import { useFirebaseEvent } from '@components/provider/firebase-provider';

export default function MaterialsPage() {
  const first = 7;
  const { t, i18n } = useTranslator();
  const [pageNumber, setPageNumber] = useState<number>(0); // pageIndex
  const [keyword, setKeyword] = useState<string>('');
  const { dataList, totalCount, loading, error } = useLibraryConnection(
    first,
    pageNumber,
    keyword,
    i18n,
  );
  const { viewMaterialsPageLog } = useFirebaseEvent();

  const onPageChange = (index: number) => {
    setPageNumber(index - 1);
  };

  const onSearch = (keyword: string) => {
    setKeyword(keyword);
  };

  useEffect(() => {
    viewMaterialsPageLog();
  }, []);

  return (
    <div className="bg-form-bg sm:pt-[40px]">
      <div className="container pt-[90px] pb-[120px] sm:pt-0 sm:pb-10 sm:max-w-[390px]">
        <div className="mb-[30px] sm:mb-[30px]">
          <h1 className="h2-b">{t('EDU_RESOURCES')}</h1>
        </div>

        <div className="flex justify-between items-center mb-[30px] sm:flex-col sm:items-stretch sm:mb-[10px]">
          <div className="text-font-sub p4-r sm:order-2">
            {t('TOTAL_OF')} <span className="text-brand">{totalCount}</span>
            {t('TOTAL_NUMBER')}
          </div>

          <div className="w-[404px] sm:w-full sm:order-1 sm:mb-5">
            <SearchBar onSubmit={onSearch} className="sm:p-[13px_20px]" />
          </div>
        </div>

        <div className="mb-[60px] border-t border-form-border">
          <MaterialsComponent
            dataList={dataList}
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
      </div>
    </div>
  );
}
