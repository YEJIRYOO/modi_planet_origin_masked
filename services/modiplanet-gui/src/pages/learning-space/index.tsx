import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import { isDesktop } from 'react-device-detect';
import { useEffect, useState } from 'react';

import CoursesTab from './Courses/CoursesTab';
import MyCourse from './MyCourse';
import OnlyPCWarningModal from '@components/ui/common/Modal/OnlyPCWarningModal';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import i18n from '@lib/i18n';
import { useProfileStore } from '@src/store/zustand/user';
import { useFirebaseEvent } from '@src/components/provider/firebase-provider';
import { useDisclosure } from '@nextui-org/react';
import LoginPortalAlertModal from '@components/ui/common/Modal/LoginPortalAlertModal';

type TabType = 'my-course' | 'courses';

const COURSE_ERROR_MESSAGE_KEY: Record<number, string> = {
  62004: 'PRIVATE_MATERIAL',
  62005: 'REMOVED_MATERIAL',
};

interface NavButtonProps {
  active: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}

function NavButton({ active, icon, label, onClick }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-[236px] h-[40px] flex items-center justify-left gap-[10px] rounded-[8px] transition-colors px-[15px] ${
        active ? 'bg-brand_4' : 'hover:bg-form-bg'
      }`}
    >
      <img
        src={`/assets/learning-space/${icon}-${
          active ? 'fill' : 'outline'
        }.svg`}
        alt={label}
        className="w-[24px] h-[24px]"
      />
      <span className={active ? 'text-brand p4-sb' : 'text-font-sub_1 p4-r'}>
        {label}
      </span>
    </button>
  );
}

export default function LearningSpacePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    isOpen: isWarningOpen,
    onOpen: onWarningOpen,
    onClose: onWarningClose,
  } = useDisclosure();
  const {
    isOpen: isLoginPortalAlertOpen,
    onOpen: onLoginPortalAlertOpen,
    onClose: onLoginPortalAlertClose,
  } = useDisclosure();
  const profile = useProfileStore((state) => state.profile);
  const apolloClient = useApolloClient();
  const { viewLearningSpaceLog } = useFirebaseEvent();

  const courseErrorCode = (location.state as any)?.courseErrorCode as
    | number
    | undefined;
  const [courseErrorModalOpen, setCourseErrorModalOpen] = useState(
    !!courseErrorCode,
  );
  const courseErrorMessage = courseErrorCode
    ? t(COURSE_ERROR_MESSAGE_KEY[courseErrorCode] ?? '')
    : '';

  useEffect(() => {
    viewLearningSpaceLog();
  }, []);

  useEffect(() => {
    const handleLanguageChanged = () => {
      apolloClient.refetchQueries({ include: 'active' });
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => i18n.off('languageChanged', handleLanguageChanged);
  }, []);

  useEffect(() => {
    if (isDesktop) return;

    onWarningOpen();
  }, []);

  const closeWarningModal = () => {
    navigate('/');
    onWarningClose();
  };

  if (
    location.pathname === '/learning-space' ||
    location.pathname === '/learning-space/'
  ) {
    return (
      <Navigate
        to={profile ? '/learning-space/my-course' : '/learning-space/courses'}
        replace
      />
    );
  }

  const activeTab: TabType = location.pathname.includes('/courses')
    ? 'courses'
    : 'my-course';

  const handleMyCourseClick = () => {
    if (!profile) {
      onLoginPortalAlertOpen();
      return;
    }
    navigate('/learning-space/my-course');
  };

  const coursesButton = (
    <li>
      <NavButton
        active={activeTab === 'courses'}
        icon="library"
        label={t('LEARNING_MATERIALS')}
        onClick={() => navigate('/learning-space/courses')}
      />
    </li>
  );

  const myCourseButton = (
    <li>
      <NavButton
        active={activeTab === 'my-course'}
        icon="my"
        label={t('MY_LEARNING')}
        onClick={handleMyCourseClick}
      />
    </li>
  );

  return (
    <div className="h-full flex">
      {/* 좌측 메뉴 */}
      <aside className="w-[260px] border-r border-form-border bg-white shrink-0">
        <nav className="py-[20px] px-[12px]">
          <ul className="flex flex-col gap-[8px]">
            {profile ? (
              <>
                {myCourseButton}
                {coursesButton}
              </>
            ) : (
              <>
                {coursesButton}
                {myCourseButton}
              </>
            )}
          </ul>
        </nav>
      </aside>

      {/* 우측 컨텐츠 */}
      <main className="flex-1 min-h-0 bg-white overflow-auto">
        {activeTab === 'my-course' && <MyCourse />}
        {activeTab === 'courses' && <CoursesTab />}
      </main>

      <CModalOneButton
        isOpen={courseErrorModalOpen}
        onClose={() => setCourseErrorModalOpen(false)}
        onClickOk={() => setCourseErrorModalOpen(false)}
        isDismissable={false}
      >
        <p className="mt-[16px] mb-[60px] text-center">{courseErrorMessage}</p>
      </CModalOneButton>
      <OnlyPCWarningModal
        isOpen={isWarningOpen}
        onClose={closeWarningModal}
        messageKey="ONLY_PC_ALERT_LEARNING_SPACE"
      />
      <LoginPortalAlertModal
        isOpen={isLoginPortalAlertOpen}
        onClose={onLoginPortalAlertClose}
        onSignInSuccess={() => navigate('/learning-space')}
      />
    </div>
  );
}
