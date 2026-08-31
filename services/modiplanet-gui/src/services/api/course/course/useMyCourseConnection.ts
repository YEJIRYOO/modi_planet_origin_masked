import {
  useMyCourseConnectionQuery,
  CourseConnectionOrder,
  MyCourseConnectionWhere,
} from '@services/gen/gen';
import { useMemo } from 'react';
import type { ApolloError } from '@apollo/client';
import { MyCourseItemModel } from '@services/client-model/course';
import { mapToMyCourseItems } from '@services/client-model/course/myCourseMapper';

export const useMyCourseConnection = ({
  first,
  offset,
  where,
  orderBy,
  onError,
}: {
  first?: number;
  offset?: number;
  where?: MyCourseConnectionWhere;
  orderBy?: CourseConnectionOrder;
  onError?: (error: ApolloError) => void;
}) => {
  const { data, loading, error, refetch } = useMyCourseConnectionQuery({
    variables: {
      first,
      offset,
      where,
      orderBy,
    },
    onError,
  });

  // API 응답을 클라이언트 모델로 매핑
  const courses = useMemo((): MyCourseItemModel[] => {
    const nodes = data?.myCourseConnection?.nodes;
    if (!nodes) return [];

    return mapToMyCourseItems(nodes);
  }, [data]);

  const totalCount = data?.myCourseConnection?.totalCount ?? 0;

  return { courses, totalCount, loading, error, refetch };
};
