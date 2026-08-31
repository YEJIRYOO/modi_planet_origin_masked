import { useMemo, useCallback } from 'react';
import type { ApolloError } from '@apollo/client';
import {
  useCourseGroupConnectionQuery,
  CourseVisibilityStatus,
  CourseDifficulty,
  ActivityCodingType,
} from '@services/gen/gen';
import type { CourseGroupConnectionWhere } from '@services/gen/gen';
import type { CourseGroupModel } from '@services/client-model/course';

const PAGE_SIZE = 20;

export const useCourseGroupConnection = ({
  first = PAGE_SIZE,
  offset,
  where,
  onError,
}: {
  first?: number;
  offset?: number;
  where?: CourseGroupConnectionWhere;
  onError?: (error: ApolloError) => void;
}) => {
  const { data, loading, error, refetch, fetchMore } =
    useCourseGroupConnectionQuery({
      variables: {
        first,
        offset,
        where,
      },
      notifyOnNetworkStatusChange: true,
      onError,
    });

  const courseGroups = useMemo<CourseGroupModel[]>(() => {
    if (!data?.courseGroupConnection.nodes) return [];

    return data.courseGroupConnection.nodes.map((group) => ({
      id: group.id,
      name: group.name,
      description: group.description ?? '',
      courses: group.courses
        .filter(
          (courseInGroup) =>
            courseInGroup.effectiveStatus === CourseVisibilityStatus.Public,
        )
        .map((courseInGroup) => ({
          id: courseInGroup.course.id,
          courseGroupId: group.id,
          courseGroupName: group.name,
          name: courseInGroup.course.name,
          description: courseInGroup.course.description ?? '',
          difficulty:
            courseInGroup.course.difficulty ?? CourseDifficulty.Beginner,
          codeEditorType:
            courseInGroup.course.codeEditorType ?? ActivityCodingType.Block,
          lessonCount: courseInGroup.course.lessonCount,
        })),
    }));
  }, [data]);

  const totalCount = data?.courseGroupConnection.totalCount ?? 0;
  const filterCourse = data?.courseGroupConnection.filterCourse;
  const pageInfo = data?.courseGroupConnection.pageInfo;
  const hasNextPage = pageInfo?.hasNextPage ?? false;

  const loadMore = useCallback(() => {
    if (!hasNextPage || !pageInfo?.endCursor) return;

    fetchMore({
      variables: {
        first,
        after: pageInfo.endCursor,
        where,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          courseGroupConnection: {
            ...fetchMoreResult.courseGroupConnection,
            nodes: [
              ...prev.courseGroupConnection.nodes,
              ...fetchMoreResult.courseGroupConnection.nodes,
            ],
          },
        };
      },
    });
  }, [hasNextPage, pageInfo, fetchMore, first, where]);

  return {
    courseGroups,
    totalCount,
    filterCourse,
    hasNextPage,
    loadMore,
    loading,
    error,
    refetch,
  };
};
