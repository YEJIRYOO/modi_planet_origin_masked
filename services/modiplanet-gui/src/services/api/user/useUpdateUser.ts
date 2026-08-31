import { useUpdateUserMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useUpdateUser = () => {
  const [mutation, { loading }] = useUpdateUserMutation();

  const updateUser = async ({
    smsMarketingConsent,
    emailMarketingConsent,
    onCompleted,
    onError,
  }: {
    smsMarketingConsent: boolean;
    emailMarketingConsent: boolean;
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          smsMarketingConsent,
          emailMarketingConsent,
        },
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { updateUser, loading };
};
