import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useQs } from '@src/components/hooks/useQs';
import { Button, Input } from '@nextui-org/react';
import { SignUpType, useUnregisterMutation } from '@services/gen/gen';
import { useGoogleAuth } from '@hooks/useGoogleAuth';

interface TestAuthPageProps {}

export default function TestAuthPage({}: TestAuthPageProps) {
  const [unregister] = useUnregisterMutation();
  const {
    path: { code },
  } = useQs();
  const [googleCode, setGoogleCode] = useState('');

  const { googleSignIn } = useGoogleAuth({
    onSuccess: onSuccessSigInAuthcode,
    path: '/test/auth',
  });

  const onClickKakao = () => {
    window.location.replace(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=https://temp-modiplanet.vercel.app/test/auth&response_type=code`,
    );
  };

  const onDeleteUser = async () => {
    try {
      await unregister({
        variables: {
          input: {
            signUpType: SignUpType.Google,
            reason: [],
          },
        },
      });
    } catch (err) {}
  };

  function onSuccessSigInAuthcode(code: string) {
    console.log('@@res', code);
    setGoogleCode(code);
  }

  return (
    <div className="p-[40px]">
      <div>
        <Button onClick={googleSignIn}>google Auth</Button>
      </div>

      <hr className="my-[40px]" />
      <div>
        <Button onClick={onClickKakao}>kakao Auth</Button>
      </div>

      <hr className="my-[40px]" />

      <p>{code}</p>

      <hr className="my-[40px]" />

      <div>
        <Button onClick={onDeleteUser}>유저삭제</Button>
      </div>
    </div>
  );
}
