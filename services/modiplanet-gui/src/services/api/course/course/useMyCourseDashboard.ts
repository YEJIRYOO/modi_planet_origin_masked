import { useMyCourseDashboardLazyQuery } from '@services/gen/gen';

interface UseMyCourseDashboardOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useMyCourseDashboard = (options?: UseMyCourseDashboardOptions) => {
  const [fetchDashboard, { data, loading, error }] = useMyCourseDashboardLazyQuery({
    onCompleted: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const getMyCourseDashboard = async () => {
    return await fetchDashboard();
  };

  const dashboard = data?.myCourseDashboard ?? null;

  return { getMyCourseDashboard, dashboard, loading, error };
};
