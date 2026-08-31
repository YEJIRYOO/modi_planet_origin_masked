import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFirebaseEvent } from '@components/provider/firebase-provider';
import { useProfileStore } from '@src/store/zustand';
import { useUser } from '@services/api';
import { MyPageComponent } from '@src/pages/my-page/MyPageComponent/index';
import { RoleTypeEnum } from '@src/services/client-model/user';

export function MyPage() {
  const { viewMyAccountPageLog } = useFirebaseEvent();
  const profile = useProfileStore((state) => state.profile);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.roleType === RoleTypeEnum.GUEST) {
      navigate('/my-project', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    viewMyAccountPageLog();
  }, []);

  // TODO: 프로필이 없을 경우 예외처리 필요
  if (!profile || !user) return null;

  if (user.roleType === RoleTypeEnum.GUEST) {
    return null;
  }

  return <MyPageComponent user={user} profile={profile} />;
}

export default MyPage;
