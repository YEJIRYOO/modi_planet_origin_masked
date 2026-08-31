import { Profile, User } from '@services/api';
import { Protector } from '@services/gen/gen';
import { ProfileModel, UserModel } from '@services/client-model/user';

export const parseProfileModel = (data: Profile): ProfileModel => {
  return {
    id: data.id,
    userId: data.userId,
    name: data.name || '',
    nickname: data.nickname || '',
    birthdate: data.birthdate || '',
    phoneNumber: data.phoneNumber || '',
    countryCallingCode: data.countryCallingCode || '',
    thumbnailUrl: data.thumbnailUrl || '',
    codingExperienceTypeList: data.codingExperienceTypeList || [],
    contactEmail: data.contactEmail || '',
  };
};

export const parseProtectorModel = (data: Protector) => {
  return {
    name: data.name || '',
    email: data.email || '',
    countryCallingCode: data.countryCallingCode || '',
    phoneNumber: data.phoneNumber || '',
    verified: data.verified,
  };
};

export const parseUserModel = (data: User): UserModel => {
  return {
    id: data.id,
    email: data.email,
    emailMarketingConsent: data.emailMarketingConsent,
    signUpType: data.signUpType,
    smsMarketingConsent: data.smsMarketingConsent,
    updatedAt: data.updatedAt,
    marketingConsentEmailUpdatedAt: data.marketingConsentEmailUpdatedAt || '',
    marketingConsentSmsUpdatedAt: data.marketingConsentSmsUpdatedAt || '',
    roleType: data.roleType,
    isMinor: data.isMinor,
    protector: data.protector ? parseProtectorModel(data.protector) : undefined,
  };
};
