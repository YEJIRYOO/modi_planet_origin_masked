import { useMemo } from 'react';
import { useProjectNameExistQuery } from '@services/gen/gen';

export const useProjectNameExist = ({
  title,
}: {
  title: string;
}) => {
  const { data, loading, error, refetch } = useProjectNameExistQuery({
    variables: {
      where: {
        title,
      },
    },
  });

  const projectNameExist = useMemo(() => {
    return data;
  }, [data]);

  return {
    projectNameExist,
    error,
    loading,
    refetch,
  };
};
