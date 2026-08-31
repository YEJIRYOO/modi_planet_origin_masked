import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import moment from 'moment';
import PopupContent from '@src/pages/main/popup-v3/popup-content';
import PopupControl from '@src/pages/main/popup-v3/popup-control';
import {
  getDoNotShowPopupV3Timestamp,
  removeDoNotShowPopupV3Timestamp,
} from '@src/lib/utils/utils';

/** 서비스 이용약관 */
function MainPopupV3() {
  const navigate = useNavigate();

  const [isView, setIsView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(0);
  useEffect(() => {
    const timestamp = getDoNotShowPopupV3Timestamp();

    if (!timestamp) {
      setIsView(true);
      return;
    }

    const prev = moment(timestamp);
    const now = moment().utc();
    const diffInDays = Math.abs(now.diff(prev, 'days'));

    if (diffInDays > 1) {
      removeDoNotShowPopupV3Timestamp();
      setIsView(true);
    }
  }, []);

  const onClickBanner = () => {
    // 공지사항 먼저 만들고 해당 아이디값 넣기
    let path: string;

    if (process.env.REACT_APP_ENV === 'production') {
      path = '/cs/notice/28';
    } else {
      path = '/cs/notice/148';
    }

    navigate(path);
  };

  const onLoadedImage = () => {
    setIsLoaded((p) => p + 1);
  };

  if (!isView) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-start justify-end pt-[clamp(6px,6vh,80px)] pr-[16px] pointer-events-none">
      <div className="border border-gray-300 pointer-events-auto">
        <PopupContent onClickContent={onClickBanner} onLoaded={onLoadedImage} />
        {isLoaded ? <PopupControl onClose={() => setIsView(false)} /> : null}
      </div>
    </div>
  );
}

export default MainPopupV3;
