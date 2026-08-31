import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '@components/ui_old/loading/loading';
import { ERROR_404 } from '@src/lib/constants/error';

export function RedirectPage() {
  const navigate = useNavigate();

  console.log('@@RedirectPage 일치하는 주소가 없습니다, 현재 경로:', window.location.pathname + window.location.search);

  useEffect(() => {
    navigate(`/error/${ERROR_404}`);
  }, []);

  return <Loading />;
}

export default RedirectPage;
