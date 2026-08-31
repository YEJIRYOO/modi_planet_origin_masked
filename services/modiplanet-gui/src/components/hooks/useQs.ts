import { useLocation } from 'react-router-dom';
import qs from 'qs';

export const useQs = (isDecode?: boolean) => {
  const { search } = useLocation();
  const path = qs.parse(search, {
    ignoreQueryPrefix: true,
  });

  return { path: path as any };
};
