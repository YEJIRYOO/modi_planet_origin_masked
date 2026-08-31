import {
  useUpdateStepProgressMutation,
  UpdateStepProgressInput,
} from '@services/gen/gen';

interface UseUpdateStepProgressOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const UseUpdateStepProgress = (
  options?: UseUpdateStepProgressOptions,
) => {
  const [updateStepProgressMutation, { data, loading, error }] =
    useUpdateStepProgressMutation({
      onCompleted: (data) => {
        options?.onSuccess?.(data);
      },
      onError: (error) => {
        options?.onError?.(error);
      },
    });

  const updateStepProgress = async (input: UpdateStepProgressInput) => {
    return await updateStepProgressMutation({
      variables: {
        input,
      },
    });
  };

  const result = data?.updateStepProgress ?? null;

  return { updateStepProgress, result, loading, error };
};
