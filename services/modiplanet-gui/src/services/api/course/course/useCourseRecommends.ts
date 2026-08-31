import { useMemo } from 'react';
import {
  useCourseRecommendsLazyQuery,
  CourseRecommendKind,
  ActivityCodingType,
  CourseDifficulty,
  CourseRecommendsQuery,
} from '@services/gen/gen';
import { CourseCardModel } from '@services/client-model/course';

interface UseCourseRecommendsOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

interface CourseRecommendModel {
  kind: CourseRecommendKind;
  courses: CourseCardModel[];
}

type CourseFromRecommends =
  CourseRecommendsQuery['courseRecommends'][number]['courses'][number];

const convertToCourseCardModel = (course: CourseFromRecommends): CourseCardModel => ({
  id: course.id,
  courseGroupId: course.courseGroupId ?? null,
  courseGroupName: course.courseGroupName ?? null,
  name: course.name,
  description: course.description ?? '',
  difficulty: course.difficulty ?? CourseDifficulty.Beginner,
  codeEditorType: course.codeEditorType ?? ActivityCodingType.Block,
  lessonCount: course.lessonCount,
});

export const useCourseRecommends = (options?: UseCourseRecommendsOptions) => {
  const [fetchRecommends, { data, loading, error }] = useCourseRecommendsLazyQuery({
    onCompleted: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const getCourseRecommends = async (kinds: CourseRecommendKind[], first?: number) => {
    return await fetchRecommends({
      variables: {
        kinds,
        first,
      },
    });
  };

  const recommends: CourseRecommendModel[] | null = useMemo(() => {
    if (!data?.courseRecommends) return null;

    return data.courseRecommends.map((recommend) => ({
      kind: recommend.kind,
      courses: recommend.courses.map(convertToCourseCardModel),
    }));
  }, [data]);

  return { getCourseRecommends, recommends, loading, error };
};
