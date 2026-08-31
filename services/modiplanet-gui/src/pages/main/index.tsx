import React, { useEffect } from 'react';

import Section1 from '@src/pages/main/v3/section-1';
import Section2 from '@src/pages/main/v3/section-2';
import Section3 from '@src/pages/main/v3/section-3';
import Section4 from '@src/pages/main/v3/section-4';
import Section5 from '@src/pages/main/v3/section-5';
import Section6 from '@src/pages/main/v3/section-6';
import Section7 from '@src/pages/main/v3/section-7';
import Section8 from '@src/pages/main/v3/section-8';

import { useFirebaseEvent } from '@components/provider/firebase-provider';
import MainPopupV2 from '@src/pages/main/popup-v2';
import MainPopupV3 from '@src/pages/main/popup-v3';

const MainPage = () => {
  const { viewMainPageLog } = useFirebaseEvent();

  useEffect(() => {
    viewMainPageLog();
  }, []);

  return (
    <div className="bg-white max-w-[2560px] mx-auto">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />

      {/* <MainPopupV2 /> */}
      {/* <MainPopupV3 /> */}
    </div>
  );
};

export default MainPage;
