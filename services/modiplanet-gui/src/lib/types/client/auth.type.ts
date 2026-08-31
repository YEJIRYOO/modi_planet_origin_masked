export interface AuthType {
  email?: string;
  pw?: string;
  newPw?: string;
  pwDoubleCheck?: string;
  otp?: string;
}

export interface AuthErrorType {
  msg?: string;
  // errorType: AUTH_INFO_TYPE;
}

export interface ProfileType {
  profileImage?: string;
  email?: string;
  name?: string;
}
