import { i18n } from 'i18next';
import {
  BoardDataConnectionFieldType,
  LangType,
  OrderDirectionType,
  ServiceType,
  useBoardDataConnectionLazyQuery,
} from '@services/old/generated/graphql';
import {
  useLibraryConnectionLazyQuery,
  LanguageType,
  LibraryConnectionOrderByFieldType,
} from '@src/services/gen/gen';
import { useEffect, useMemo } from 'react';

export const useLibraryConnection = (
  first: number,
  offset: number,
  keyword: string,
  i18n: i18n,
) => {
  const [libraryConnectionQuery, { data, loading, error }] =
    useLibraryConnectionLazyQuery({
      variables: {
        input: {
          first,
          offset,
          where: {
            keyword,
            language: (['ES', 'PL'].includes(i18n.language.toUpperCase())
              ? 'EN'
              : i18n.language.toUpperCase()) as LanguageType,
          },
          orderBy: {
            field: LibraryConnectionOrderByFieldType.CreatedAt,
            direction: OrderDirectionType.Desc,
          },
        },
      },
      fetchPolicy: 'no-cache',
    });

  const dataList = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.libraryConnection.nodes;
  }, [data]);

  const totalCount = useMemo(() => {
    if (data) {
      return data.libraryConnection.totalCount;
    } else {
      return 0;
    }
  }, [data]);

  useEffect(() => {
    libraryConnectionQuery();
  }, [i18n.language]);

  return {
    loading,
    error,
    dataList,
    totalCount,
  };
};
