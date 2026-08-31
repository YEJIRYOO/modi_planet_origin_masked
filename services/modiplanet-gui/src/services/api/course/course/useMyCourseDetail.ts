import {
  useMyCourseDetailLazyQuery,
  MyCourseDetailWhere,
} from '@services/gen/gen';
import type { ApolloError } from '@apollo/client';

interface UseMyCourseDetailOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: ApolloError) => void;
}

export const useMyCourseDetail = (options?: UseMyCourseDetailOptions) => {
  const [fetchDetail, { data, loading, error, refetch }] =
    useMyCourseDetailLazyQuery({
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        options?.onSuccess?.(data);
      },
      onError: (error) => {
        options?.onError?.(error);
      },
    });

  const getMyCourseDetail = async (where: MyCourseDetailWhere) => {
    return await fetchDetail({
      variables: {
        where,
      },
    });
  };

  const detail = data?.myCourseDetail ?? null;

  return { getMyCourseDetail, refetch, detail, loading, error };
};
