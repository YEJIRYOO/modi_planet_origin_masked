import { useModiDataQuery } from '@services/gen/gen';

export const useModiData = (id: any) => {
  const { data, error, loading } = useModiDataQuery(id);

  const modiData = data ? data : null;

  return {
    modiData,
    error,
    loading,
  };
};
