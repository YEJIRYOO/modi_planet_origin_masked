import { useUserQuery } from '@services/gen/gen';
import { parseUserModel } from '@services/api/user/handlers';

export const useUser = () => {
  const { data, error, loading } = useUserQuery();

  const user = data ? parseUserModel(data.user) : null;

  return {
    user,
    error,
    loading,
  };
};
