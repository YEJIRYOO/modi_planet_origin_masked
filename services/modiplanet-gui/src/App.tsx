import React, { Suspense, useEffect } from 'react';

import Routers from '@src/routers/index';
import Loading from '@components/ui_old/loading/loading';
import { ToastContainer } from '@components/ui_old/toast';

import { useFirebaseEvent } from '@components/provider/firebase-provider';

function App() {
  const { visitModiplanetLog } = useFirebaseEvent();

  useEffect(() => {
    visitModiplanetLog();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Routers />
      <ToastContainer />
    </Suspense>
  );
}

export default App;
