import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_0AUTH_ID } from '@lib/constants/urls';

interface GoogleAuthProviderProps {
  children: React.ReactNode;
}

export default function GoogleAuthProvider({
  children,
}: GoogleAuthProviderProps) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_0AUTH_ID || ''}>
      {children}
    </GoogleOAuthProvider>
  );
}
