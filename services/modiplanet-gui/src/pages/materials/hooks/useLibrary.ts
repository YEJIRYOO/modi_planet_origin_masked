import { i18n } from 'i18next';
import { useEffect, useMemo } from 'react';
import { LanguageType, useLibraryLazyQuery } from '@src/services/gen/gen';

export const useLibrary = (id: string, i18n: i18n) => {
  const [libraryQuery, { data, loading, error }] = useLibraryLazyQuery({
    variables: {
      input: {
        id: id,
        language: (['ES', 'PL'].includes(i18n.language.toUpperCase())
          ? 'EN'
          : i18n.language.toUpperCase()) as LanguageType,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const libraryData = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.library;
  }, [data]);

  useEffect(() => {
    libraryQuery();
  }, [i18n.language]);

  return { library: libraryData, loading, error };
};
