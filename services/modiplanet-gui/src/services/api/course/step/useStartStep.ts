import { useStartStepMutation, StartStepInput } from '@services/gen/gen';
import type { ApolloError } from '@apollo/client';

interface UseStartStepOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: ApolloError) => void;
}

export const useStartStep = (options?: UseStartStepOptions) => {
  const [startStepMutation, { data, loading, error }] = useStartStepMutation({
    onCompleted: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const startStep = async (input: StartStepInput) => {
    return await startStepMutation({
      variables: {
        input,
      },
    });
  };

  const stepDetail = data?.startStep ?? null;

  return { startStep, stepDetail, loading, error };
};
