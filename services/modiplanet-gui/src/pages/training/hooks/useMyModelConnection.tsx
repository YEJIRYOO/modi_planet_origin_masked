import {
  AiModelConnectionQueryVariables,
  useAiModelConnectionQuery,
} from '@services/old/generated/graphql';
import { useMemo } from 'react';

const useMyModelConnection = ({
  first = 20,
  offset = 0,
}: AiModelConnectionQueryVariables) => {
  const { data, error, loading, refetch } = useAiModelConnectionQuery({
    variables: {
      first,
      offset,
    },
  });

  const myModelConnection = useMemo(() => {
    if (data && data.aiModelConnection) {
      return data.aiModelConnection.nodes;
    } else {
      return null;
    }
  }, [data]);

  return {
    myModelConnection,
    error,
    loading,
    refetch,
  };
};

export default useMyModelConnection;
