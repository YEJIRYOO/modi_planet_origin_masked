import { useCourseLazyQuery } from '@services/gen/gen';
import type { ApolloError } from '@apollo/client';
import type { CourseDetailModel } from '@services/client-model/course';
import { mapToCourseDetail } from '@services/client-model/course/courseDetailMapper';

interface UseCourseOptions {
  onSuccess?: (data: CourseDetailModel | null) => void;
  onError?: (error: ApolloError) => void;
}

export const useCourse = (options?: UseCourseOptions) => {
  const [fetchCourse, { data, loading, error }] = useCourseLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      options?.onSuccess?.(data?.course ? mapToCourseDetail(data.course) : null);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const getCourse = async (courseId: string) => {
    return await fetchCourse({
      variables: { where: { id: courseId } },
    });
  };

  const detail = data?.course ? mapToCourseDetail(data.course) : null;

  return { getCourse, detail, loading, error };
};
