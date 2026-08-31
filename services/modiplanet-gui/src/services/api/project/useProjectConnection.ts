import { useMemo } from 'react';
import {
  useProjectConnectionQuery,
  OrderDirectionType,
  ProjectRunType,
  ProjectConnectionOrder,
} from '@services/gen/gen';
import { parseProjectListModel } from './handlers';

export const useProjectConnection = ({
  runType,
  filter,
  first,
  offset,
  orderBy,
  skip,
}: {
  runType?: ProjectRunType;
  filter?: string;
  first: number;
  offset: number;
  orderBy: ProjectConnectionOrder;
  skip?: boolean;
}) => {
  const { data, loading, error, refetch } = useProjectConnectionQuery({
    variables: {
      where: {
        runType: runType || undefined,
        filter: filter || undefined,
      },
      first,
      offset,
      orderBy,
    },
    skip,
  });

  const projectList = useMemo(() => {
    return data ? parseProjectListModel(data.projectConnection.nodes) : [];
  }, [data]);

  const totalCount = useMemo(() => {
    return data ? data.projectConnection.totalCount : 0;
  }, [data]);

  return {
    projectList,
    totalCount,
    error,
    loading,
    refetch,
  };
};
