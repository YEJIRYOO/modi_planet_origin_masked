import { useCompleteStepMutation, CompleteStepInput } from '@services/gen/gen';

interface UseCompleteStepOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useCompleteStep = (options?: UseCompleteStepOptions) => {
  const [completeStepMutation, { data, loading, error }] =
    useCompleteStepMutation({
      onCompleted: (data) => {
        options?.onSuccess?.(data);
      },
      onError: (error) => {
        options?.onError?.(error);
      },
    });

  const completeStep = async (input: CompleteStepInput) => {
    return await completeStepMutation({
      variables: {
        input,
      },
    });
  };

  const stepDetail = data?.completeStep ?? null;

  return { completeStep, stepDetail, loading, error };
};
