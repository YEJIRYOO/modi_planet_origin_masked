import {
  useModiDataConnectionQuery,
  ModiDataConnectionInput,
} from '@services/gen/gen';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { ModiData, ModiRecordedData } from '@src/lib/types/modi-data';

export const useModiDataConnection = (input: ModiDataConnectionInput) => {
  const { data, error, loading, refetch } = useModiDataConnectionQuery({
    variables: { input },
  });

  const formatDate = (dateString: string): string => {
    return dayjs(dateString).format('YYYY-MM-DD HH:mm:ss');
  };

  const modiDataConnection = useMemo(() => {
    return data
      ? data.modiDataConnection.nodes.map((item): ModiData => {
          const parsedData: ModiRecordedData = JSON.parse(item.data);
          return {
            name: item.name.replace(/\.modi$/, ''),
            functionType: item.functionType,
            id: item.id,
            moduleType: item.moduleType,
            data: parsedData,
            createdAt: formatDate(item.createdAt),
          };
        })
      : [];
  }, [data]);

  const totalCount = useMemo(() => {
    return data ? data.modiDataConnection.totalCount : 0;
  }, [data]);

  return {
    modiDataConnection,
    totalCount,
    error,
    loading,
    refetch,
  };
};
