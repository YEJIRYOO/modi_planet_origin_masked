import {
  LanguageType,
  NoticeConnectionOrderBy,
  useNoticeConnectionQuery,
} from '@services/gen/gen';
import { useMemo } from 'react';

export const useNoticeList = (input) => {
  const { data, error, loading, refetch } = useNoticeConnectionQuery({
    variables: { input },
  });

  const noticeList = useMemo(() => {
    return data
      ? data.noticeConnection.nodes.map((e) => ({
          id: e.id,
          title: e.title,
          content: e.content,
          createdAt: e.createdAt,
          isNew: e.isNew,
          isTop: e.isTop,
          viewCount: e.viewCount,
          language: e.language,
        }))
      : [];
  }, [data]);

  const totalCount = useMemo(() => {
    return data ? data.noticeConnection.totalCount : 0;
  }, [data]);

  return {
    noticeList,
    totalCount,
    error,
    loading,
    refetch,
  };
};
