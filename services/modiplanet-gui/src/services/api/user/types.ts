import {
  ProfileQuery,
  UserQuery,
  SocialSignInMutation,
} from '@services/gen/gen';

export type Profile = ProfileQuery['profile'];

export type User = UserQuery['user'];

export type SocialSignInRes = SocialSignInMutation['socialSignIn'];
