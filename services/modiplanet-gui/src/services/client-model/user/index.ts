export interface ProfileModel {
  id: string;
  userId: string;
  birthdate: string;
  name: string;
  nickname: string;
  countryCallingCode: string;
  phoneNumber: string;
  thumbnailUrl: string;
  codingExperienceTypeList: string[];
  contactEmail: string;
}

export const SignUpTypeEnum = {
  EMAIL: 'EMAIL',
  GOOGLE: 'GOOGLE',
  KAKAO: 'KAKAO',
  APPLE: 'APPLE',
} as const;

export const RoleTypeEnum = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  GUEST: 'GUEST',
} as const;

export type SignUpTypeModel = keyof typeof SignUpTypeEnum;
export type RoleTypeModel = keyof typeof RoleTypeEnum;

export interface ProtectorModel {
  name: string;
  email: string;
  countryCallingCode: string;
  phoneNumber: string;
  verified: boolean;
}

export interface UserModel {
  id: string;
  email: string;
  signUpType: SignUpTypeModel;
  emailMarketingConsent: boolean;
  smsMarketingConsent: boolean;
  updatedAt: string;
  marketingConsentEmailUpdatedAt: string;
  marketingConsentSmsUpdatedAt: string;
  roleType: RoleTypeModel;
  isMinor: boolean;
  protector?: ProtectorModel;
}
