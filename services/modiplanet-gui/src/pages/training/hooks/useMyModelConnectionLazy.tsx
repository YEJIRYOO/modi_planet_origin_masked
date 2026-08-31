import {
  AiModelConnectionQuery,
  useAiModelConnectionLazyQuery,
} from '@services/old/generated/graphql';

const useMyModelConnectionLazy = () => {
  const [getAiModelConnection] = useAiModelConnectionLazyQuery();
  const getMyModelConnection = async ({
    onCompleted,
    onError,
  }: {
    onCompleted?: (data: AiModelConnectionQuery) => void;
    onError?: (err: any) => void;
  }) => {
    await getAiModelConnection({
      variables: {
        first: 20,
        offset: 0,
      },
      onCompleted,
      onError,
    });
  };

  return {
    getMyModelConnection,
  };
};

export default useMyModelConnectionLazy;
