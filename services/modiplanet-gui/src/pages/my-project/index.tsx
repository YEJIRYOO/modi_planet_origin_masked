import { useEffect } from 'react';

import MyProjectContainer from './MyProjectContainer';
import { useFirebaseEvent } from '@components/provider/firebase-provider';

export function MyProjectPage() {
  const { viewMyProjectPageLog } = useFirebaseEvent();

  useEffect(() => {
    viewMyProjectPageLog();
  }, []);

  return <MyProjectContainer />;
}

export default MyProjectPage;
