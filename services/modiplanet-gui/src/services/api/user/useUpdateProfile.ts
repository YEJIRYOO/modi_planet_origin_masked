import { useUpdateProfileMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';

export const useUpdateProfile = () => {
  const [mutation, { loading }] = useUpdateProfileMutation();

  const updateProfile = async ({
    birthdate,
    name,
    nickname,
    phoneNumber,
    countryCallingCode,
    thumbnailUrl,
    codingExperienceTypeList,
    onCompleted,
    onError,
  }: {
    birthdate?: string;
    name?: string;
    nickname?: string;
    phoneNumber?: string;
    countryCallingCode?: string;
    thumbnailUrl?: string;
    codingExperienceTypeList?: string[];
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    await mutation({
      variables: {
        input: {
          ...(birthdate && { birthdate }),
          ...(name && { name }),
          ...(nickname && { nickname }),
          ...(phoneNumber && { phoneNumber }),
          ...(countryCallingCode && { countryCallingCode }),
          ...(thumbnailUrl && { thumbnailUrl }),
          ...(codingExperienceTypeList && { codingExperienceTypeList }),
        },
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  return { updateProfile, loading };
};
