import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isDesktop } from 'react-device-detect';

import CurriculumSidebar from './components/CurriculumSidebar';
import CourseContent from './components/CourseContent';
import { useLearningSpaceErrorHandler } from '@hooks/useLearningSpaceErrorHandler';
import OnlyPCWarningModal from '@components/ui/common/Modal/OnlyPCWarningModal';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import { useMyCourseDetail } from '@services/api/course/course/useMyCourseDetail';
import { useCourse } from '@services/api/course/course/useCourse';
import { useProfileStore } from '@src/store/zustand/user';
import type { MyCourseDetailQuery } from '@services/gen/gen';
import { parseServerErrorMsg } from '@lib/utils/error';
import { useDisclosure } from '@nextui-org/react';

const STEP_ERROR_MESSAGE_KEY: Record<number, string> = {
  62002: 'PRIVATE_MATERIAL',
  62003: 'REMOVED_MATERIAL',
};

/** 코스/코스그룹 관련 에러 — 학습공간 코스 목록으로 이동 후 모달 표시 */
const COURSE_GROUP_ERROR_CODES = [62004, 62005];

export default function CourseDetailPage() {
  const { courseGroupId, courseId } = useParams<{
    courseGroupId: string;
    courseId: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const {
    isOpen: isWarningOpen,
    onOpen: onWarningOpen,
    onClose: onWarningClose,
  } = useDisclosure();
  const profile = useProfileStore((state) => state.profile);
  const handleLearningSpaceError = useLearningSpaceErrorHandler();

  const stepErrorCode = (location.state as any)?.stepErrorCode as
    | number
    | undefined;
  const [stepErrorModalOpen, setStepErrorModalOpen] = useState(!!stepErrorCode);
  const stepErrorMessage = stepErrorCode
    ? t(STEP_ERROR_MESSAGE_KEY[stepErrorCode] ?? '')
    : '';

  const {
    getMyCourseDetail,
    detail: myDetail,
    loading: myLoading,
  } = useMyCourseDetail({
    onError: (error) => {
      const errorCode = parseServerErrorMsg(
        error?.graphQLErrors?.[0]?.message,
      )?.code;

      if (errorCode && COURSE_GROUP_ERROR_CODES.includes(errorCode)) {
        navigate('/learning-space/courses', {
          state: { courseErrorCode: errorCode },
          replace: true,
        });
        return;
      }

      handleLearningSpaceError(error, { skipCodes: COURSE_GROUP_ERROR_CODES });
    },
  });
  const {
    getCourse,
    detail: courseDetail,
    loading: courseLoading,
  } = useCourse({
    onError: (error) => {
      const errorCode = parseServerErrorMsg(
        error?.graphQLErrors?.[0]?.message,
      )?.code;

      if (errorCode && COURSE_GROUP_ERROR_CODES.includes(errorCode)) {
        navigate('/learning-space/courses', {
          state: { courseErrorCode: errorCode },
          replace: true,
        });
        return;
      }

      handleLearningSpaceError(error, { skipCodes: COURSE_GROUP_ERROR_CODES });
    },
  });

  useEffect(() => {
    if (isDesktop) return;

    onWarningOpen();
  }, []);

  const closeWarningModal = () => {
    navigate('/learning-space');
    onWarningClose();
  };

  useEffect(() => {
    if (!courseId) return;
    if (profile) {
      getMyCourseDetail({ courseId, courseGroupId });
    } else {
      getCourse(courseId);
    }
  }, [courseId, profile]);

  const detail = (profile ? myDetail : courseDetail) as
    | MyCourseDetailQuery['myCourseDetail']
    | null;
  const loading = profile ? myLoading : courseLoading;

  return (
    <div className="h-full flex">
      <CurriculumSidebar course={detail} />
      <CourseContent
        course={detail}
        loading={loading}
        courseId={courseId || ''}
      />
      <CModalOneButton
        isOpen={stepErrorModalOpen}
        onClose={() => setStepErrorModalOpen(false)}
        onClickOk={() => setStepErrorModalOpen(false)}
        isDismissable={false}
      >
        <p className="mt-[16px] mb-[60px] text-center">{stepErrorMessage}</p>
      </CModalOneButton>
      <OnlyPCWarningModal
        isOpen={isWarningOpen}
        onClose={closeWarningModal}
        messageKey="ONLY_PC_ALERT_LEARNING_SPACE"
      />
    </div>
  );
}
