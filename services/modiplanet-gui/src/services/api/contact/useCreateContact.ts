import {
  CreateContactInput,
  useCreateContactMutation,
} from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useCreateContact = () => {
  const [mutation, { loading, error }] = useCreateContactMutation();

  const createContact = async ({
    input,
    onCompleted,
    onError,
  }: {
    input: CreateContactInput;
    onError?: (err: ApolloError) => void;
    onCompleted?: () => void;
  }) => {
    await mutation({
      variables: {
        input,
      },
      onError,
      onCompleted,
    });
  };

  return {
    createContact,
    loading,
    error,
  };
};
