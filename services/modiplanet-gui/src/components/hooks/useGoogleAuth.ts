import { useGoogleLogin } from '@react-oauth/google';

interface useGoogleAuthProps {
  onError?: (err: any) => void;
  onSuccess?: (code: string) => void;
  path?: string;
}
export const useGoogleAuth = ({
  onSuccess,
  onError,
  path = '/auth/google/signin',
}: useGoogleAuthProps) => {
  const googleSignIn = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: `${window.location.origin}${path}`,
    onSuccess: (res) => onSuccess && onSuccess(res.code),
    onError: (err) => onError && onError(err),
  });

  return {
    googleSignIn,
  };
};
