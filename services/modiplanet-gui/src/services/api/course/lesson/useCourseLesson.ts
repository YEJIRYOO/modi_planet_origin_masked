import { useCourseLessonLazyQuery, CourseStepVideoOverlay } from '@services/gen/gen';
import type { ApolloError } from '@apollo/client';

interface UseCourseLessonOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: ApolloError) => void;
}

export const useCourseLesson = (options?: UseCourseLessonOptions) => {
  const [fetchLesson, { data, loading, error }] = useCourseLessonLazyQuery({
    onCompleted: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const getCourseLesson = async (lessonId: string, courseId?: string) => {
    return await fetchLesson({
      variables: {
        where: { lessonId, courseId },
      },
    });
  };

  const lesson = data?.courseLesson ?? null;

  const videoOverlays =
    lesson?.steps?.reduce<Record<string, CourseStepVideoOverlay[]>>((acc, { step }) => {
      if (step.__typename === 'CourseStepPpt' && step.ppt?.videoOverlays) {
        acc[step.id] = step.ppt.videoOverlays;
      }
      return acc;
    }, {}) ?? null;

  return { getCourseLesson, lesson, videoOverlays, loading, error };
};
