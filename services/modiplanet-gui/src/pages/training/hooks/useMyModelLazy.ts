import { useAiModelLazyQuery } from '@services/gen/gen';
import { useMemo } from 'react';

const useMyModelLazy = () => {
  const [myModelLazyQuery, { data, error, loading }] = useAiModelLazyQuery();

  const myModel = useMemo(() => {
    if (data) {
      return data.aiModel;
    } else {
      return null;
    }
  }, [data]);

  return {
    myModel,
    loading,
    error,
    myModelLazyQuery,
  };
};

export default useMyModelLazy;
