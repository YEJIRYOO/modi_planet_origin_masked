export interface SignUpModel {
  email: string;
  password: string;
  privacyPolicyConsent: boolean;
  termsOfServiceConsent: boolean;
  personalInfoConsent: boolean;
  emailMarketingConsent: boolean;
  smsMarketingConsent: boolean;
  birthdate: string;
}
