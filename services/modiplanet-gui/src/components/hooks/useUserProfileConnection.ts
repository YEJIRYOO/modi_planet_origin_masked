import { useMemo } from 'react';

import {
  UserRoleType,
  useUserProfileConnectionQuery,
} from '@services/old/generated/graphql';

export const useUserProfileConnection = (userId: string) => {
  const { data, loading, error, refetch } = useUserProfileConnectionQuery({
    variables: { where: { userId } },
    fetchPolicy: 'no-cache',
  });

  const profiles = useMemo(() => {
    if (data) {
      return data.userProfileConnection.nodes
        .filter((profile) => profile.role !== UserRoleType.Admin)
        .sort(({ role }) => {
          switch (role) {
            case UserRoleType.Parent:
              return -1;
            case UserRoleType.Child:
            default:
              return 0;
            case UserRoleType.Tutor:
              return 1;
          }
        });
    } else {
      return [];
    }
  }, [data]);

  return { profiles, error, loading, refetchProfiles: refetch };
};
