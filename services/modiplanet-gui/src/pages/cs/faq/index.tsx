import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { i18n } from 'i18next';

import SearchBar from '@components/ui_old/search-bar/search-bar';
import FAQComponent from '@src/pages/cs/faq/index.view';
import { CustomPagination } from '@components/ui_old/pagination/pagination';

import {
  useFaqConnectionLazyQuery,
  LanguageType,
  FaqConnectionOrderBy,
  OrderDirectionType,
} from '@src/services/gen/gen';
import BoardMessage from '@components/ui_old/board/board-message';
import useTranslator from '@hooks/useTranslator';

function useBoardFAQConnection(
  first: number,
  offset: number,
  keyword: string,
  i18n: i18n,
) {
  const [boardFaqConnectionQuery, { data, loading, error }] =
    useFaqConnectionLazyQuery({
      variables: {
        input: {
          first,
          offset,
          orderBy: {
            field: 'CREATED_AT',
            direction: OrderDirectionType.Desc,
          } as FaqConnectionOrderBy,
          where: {
            language: (['ES', 'PL'].includes(i18n.language.toUpperCase())
              ? 'EN'
              : i18n.language.toUpperCase()) as LanguageType,
            ...(keyword && { title: keyword }),
          },
        },
      },
      fetchPolicy: 'no-cache',
    });

  const faqList = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.faqConnection.nodes;
  }, [data]);

  const page = useMemo(() => {
    const initialPage = {
      total: 0,
      pageInfo: {
        startCursor: '',
        endCursor: '',
        hasBeforePage: false,
        hasNextPage: false,
      },
    };
    if (!data) {
      return initialPage;
    }
    return {
      total: Math.ceil(data.faqConnection.totalCount / first),
      pageInfo: {
        startCursor: '',
        endCursor: '',
        hasBeforePage: offset > 0,
        hasNextPage: (offset + 1) * first < data.faqConnection.totalCount,
      },
    };
  }, [data, first, offset]);

  const totalCount = useMemo(() => {
    if (!data) {
      return 0;
    }
    return data.faqConnection.totalCount;
  }, [data]);

  useEffect(() => {
    boardFaqConnectionQuery();
  }, [i18n.language]);

  return {
    loading,
    error,
    faqList,
    page,
    totalCount,
  };
}

export function FAQContainer() {
  const first = 7;
  const { t, i18n } = useTranslator();

  const [offset, setOffset] = useState<number>(0); // pageIndex
  const [keyword, setKeyword] = useState<string>('');
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const { faqList, loading, error, totalCount } = useBoardFAQConnection(
    first,
    offset,
    keyword,
    i18n,
  );

  const onPageChange = (index: number) => {
    setOffset(index - 1);
  };

  const onSearch = (keyword: string) => {
    setKeyword(keyword);
  };

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

      <div className="mb-12 border-t border-form-border sm:mb-5">
        {faqList ? (
          <FAQComponent
            faqList={faqList}
            pageNumber={offset}
            first={first}
            openedIndex={openedIndex}
            setOpenedIndex={setOpenedIndex}
          />
        ) : (
          <BoardMessage text={t('NO_FAQ')} />
        )}
      </div>

      <div className="flex justify-center mb-14">
        <CustomPagination
          activePage={offset + 1}
          itemsCountPerPage={first}
          totalItemsCount={totalCount}
          onChange={onPageChange}
        />
      </div>
    </Fragment>
  );
}

export default FAQContainer;
