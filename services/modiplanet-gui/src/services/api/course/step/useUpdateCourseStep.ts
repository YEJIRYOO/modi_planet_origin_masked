import { useUpdateCourseStepMutation, UpdateCourseStepInput } from '@services/gen/gen';

interface UseUpdateCourseStepOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useUpdateCourseStep = (options?: UseUpdateCourseStepOptions) => {
  const [updateStepMutation, { data, loading, error }] = useUpdateCourseStepMutation({
    onCompleted: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const updateCourseStep = async (input: UpdateCourseStepInput) => {
    return await updateStepMutation({
      variables: {
        input,
      },
    });
  };

  const result = data?.updateCourseStep ?? null;

  return { updateCourseStep, result, loading, error };
};
