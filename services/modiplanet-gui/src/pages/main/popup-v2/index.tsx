import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import PopupContent from '@src/pages/main/popup-v2/popup-content';
import PopupControl from '@src/pages/main/popup-v2/popup-control';
import {
  getDoNotShowPopupV2Timestamp,
  removeDoNotShowPopupV2Timestamp,
} from '@lib/utils/utils';

interface IMainPopup {}

/** 개인정보 처리방침 */
function MainPopupV2({}: IMainPopup) {
  const navigate = useNavigate();

  const [isView, setIsView] = useState(false);

  useEffect(() => {
    const timestamp = getDoNotShowPopupV2Timestamp();

    if (!timestamp) {
      setIsView(true);
      return;
    }

    const prev = moment(timestamp);
    const now = moment().utc();
    const diffInDays = Math.abs(now.diff(prev, 'days'));

    if (diffInDays > 1) {
      removeDoNotShowPopupV2Timestamp();
      setIsView(true);
    }
  }, []);

  const onClickBanner = () => {
    // 공지사항 먼저 만들고 해당 아이디값 넣기
    let path: string;

    if (process.env.REACT_APP_ENV === 'production') {
      //프로덕션
      path = '/cs/notice/27';
    } else {
      path = '/cs/notice/108';
    }

    navigate(path);
  };

  if (!isView) {
    return null;
  }

  return (
    <div className="fixed inset-0 top-[64px] tb:top-[60px] mb:top-[60px] z-[10000] flex items-center justify-center">
      <div className="w-[min(560px,90vw)] sm:w-[min(350px,90vw)] max-h-[calc(100vh-64px-32px)] tb:max-h-[calc(100vh-60px-32px)] mb:max-h-[calc(100vh-60px-32px)] overflow-hidden bg-white rounded-[20px] shadow-lg p-[30px] sm:p-[16px]">
        <PopupContent onClickContent={onClickBanner} />
        <PopupControl onClose={() => setIsView(false)} />
      </div>
    </div>
  );
}

export default MainPopupV2;
