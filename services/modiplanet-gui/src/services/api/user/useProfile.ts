import { useProfileQuery } from '@src/services/gen/gen';
import { parseProfileModel } from '@services/api/user/handlers';
import { ProfileModel } from '@services/client-model/user';
import { useMemo } from 'react';

export const useProfile = () => {
  const { data, loading, error } = useProfileQuery();

  const profile: ProfileModel | null = useMemo(() => {
    return data ? parseProfileModel(data.profile) : null;
  }, [data]);

  return {
    profile,
    error,
    loading,
  };
};
