import { useContactConnectionQuery } from '@services/gen/gen';
import { parseContactListModel } from '@services/api/contact/handlers';

export const useContactConnection = ({
  offset,
  first,
}: {
  first: number;
  offset: number;
}) => {
  const { data, loading, error } = useContactConnectionQuery({
    variables: {
      input: {
        first,
        offset,
      },
    },
  });

  const contactList = data
    ? parseContactListModel(data.contactConnection.nodes)
    : null;

  const totalCount = data ? data.contactConnection.totalCount : 0;

  return {
    contactList,
    totalCount,
    error,
    loading,
  };
};
