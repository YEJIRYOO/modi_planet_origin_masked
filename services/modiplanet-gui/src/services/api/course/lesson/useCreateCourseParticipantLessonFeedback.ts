import { useCreateCourseParticipantLessonFeedbackMutation } from '@services/gen/gen';
import type {
  CreateCourseParticipantLessonFeedbackInput,
  CreateCourseParticipantLessonFeedbackMutation,
} from '@services/gen/gen';

interface UseCreateCourseParticipantLessonFeedbackOptions {
  onSuccess?: (data: CreateCourseParticipantLessonFeedbackMutation) => void;
  onError?: (error: Error) => void;
}

export const useCreateCourseParticipantLessonFeedback = (
  options?: UseCreateCourseParticipantLessonFeedbackOptions,
) => {
  const [createFeedbackMutation, { loading, error, data }] =
    useCreateCourseParticipantLessonFeedbackMutation({
      onCompleted: (data) => {
        options?.onSuccess?.(data);
      },
      onError: (error) => {
        options?.onError?.(error);
      },
    });

  const createFeedback = async (
    input: CreateCourseParticipantLessonFeedbackInput,
  ) => {
    return await createFeedbackMutation({
      variables: { input },
    });
  };

  return { createFeedback, loading, error, data };
};
