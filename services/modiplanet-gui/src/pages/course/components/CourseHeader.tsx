import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import ChipUI from '@src/components/ui/Chip/ChipUI';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import { t } from 'i18next';
import CertificateModal from './CertificateModal';
import type { MyCourseDetailQuery } from '@services/gen/gen';
import { ActivityCodingType, ProgressStatus } from '@services/gen/gen';
import { useProfileStore } from '@src/store/zustand/user';
import {
  getCourseThumbnail,
  isLightThumbnail,
} from '@src/lib/utils/courseThumbnail';
import { useDisclosure } from '@nextui-org/react';
import LoginPortalAlertModal from '@components/ui/common/Modal/LoginPortalAlertModal';

interface CourseHeaderProps {
  course: MyCourseDetailQuery['myCourseDetail'];
}

const convertCodingType = (type?: ActivityCodingType | null): string => {
  if (type === ActivityCodingType.AiBlock) return 'AI Block';
  if (type === ActivityCodingType.Block) return 'Block';
  return 'Block';
};

export default function CourseHeader({ course }: CourseHeaderProps) {
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const profile = useProfileStore((state) => state.profile);
  const navigate = useNavigate();
  const location = useLocation();
  const { courseGroupId, courseId } = useParams();
  const {
    isOpen: isLoginPortalAlertOpen,
    onOpen: onLoginPortalAlertOpen,
    onClose: onLoginPortalAlertClose,
  } = useDisclosure();
  const fromState = (location.state as any)?.from;

  const displayProgress = course.displayProgress;
  const totalLessons = displayProgress?.totalLessons || 0;
  const completedLessons = displayProgress?.completedLessons || 0;
  // 전체 차시 중 학습 완료한 차시 기준으로 진도율 계산
  const progress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isNotStarted = course.status === ProgressStatus.NotStarted;
  const isInProgress = course.status === ProgressStatus.InProgress;
  const isCompleted = course.status === ProgressStatus.Completed;
  // 수료증: completedAt이 있으면 바로 활성화, 없으면 actualProgress 기준
  const actualProgress = course.actualProgress;
  const isCertificateEligible = course.completedAt
    ? true
    : (actualProgress?.totalLessons ?? 0) > 0 &&
      actualProgress?.completedLessons === actualProgress?.totalLessons;

  const getProgressMessage = () => {
    if (progress === 0) {
      return 'START_NEW_LESSON_MSG';
    }
    if (progress >= 1 && progress <= 50) {
      return 'DURING_LEARNING_MSG';
    }
    if (progress >= 51 && progress <= 99) {
      return 'ALMOST_END_MSG';
    }
    if (progress === 100) {
      return 'END_LEARNING_MSG';
    }
    return 'DURING_LEARNING_MSG';
  };

  const getProgressIcon = () => {
    if (progress === 0) {
      return <img src="/assets/course/details/emoji-start.svg" />;
    }
    if (progress >= 1 && progress <= 50) {
      return <img src="/assets/course/details/emoji-run.svg" />;
    }
    if (progress >= 51 && progress <= 99) {
      return <img src="/assets/course/details/emoji-fighting.svg" />;
    }
    if (progress === 100) {
      return <img src="/assets/course/details/emoji-cong.svg" />;
    }
    return <img src="/assets/course/details/emoji-start.svg" />;
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    if (!profile) {
      onLoginPortalAlertOpen();
      return;
    }
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStartLearning = () => {
    if (!profile) {
      onLoginPortalAlertOpen();
      return;
    }

    const navOptions = fromState ? { state: { from: fromState } } : undefined;

    const target =
      isCompleted && course.firstLearning
        ? course.firstLearning
        : course.nextLearning ?? {
            lessonId: course.lessons?.[0]?.lessonId,
            stepId: course.lessons?.[0]?.steps?.[0]?.stepId,
          };

    if (!target?.lessonId) return;

    const basePath = `/course-group/${courseGroupId}/course/${courseId}/lesson/${target.lessonId}`;
    navigate(
      target.stepId ? `${basePath}/step/${target.stepId}` : basePath,
      navOptions,
    );
  };

  const renderStartButton = () => {
    const hasNoLessons = !course.lessons || course.lessons.length === 0;

    if (isNotStarted) {
      return (
        <ButtonUI
          className="w-[200px]"
          onClick={handleStartLearning}
          isDisabled={hasNoLessons}
        >
          {t('START_STUDY')}
        </ButtonUI>
      );
    }

    if (isInProgress) {
      const lessonNumber =
        course.nextLearning?.lessonIdx !== undefined
          ? course.nextLearning.lessonIdx
          : completedLessons + 1;

      return (
        <ButtonUI
          className="w-[200px]"
          onClick={handleStartLearning}
          isDisabled={hasNoLessons}
        >
          <span className="p5-sb">
            {t('CONTINUE_LESSON', { LESSON: lessonNumber })}
          </span>
        </ButtonUI>
      );
    }

    if (isCompleted) {
      return (
        <ButtonUI
          color="primary"
          variant="bordered"
          className="w-[200px]"
          onClick={handleStartLearning}
          isDisabled={hasNoLessons}
        >
          <span className="p5-sb">{t('REVIEW')}</span>
        </ButtonUI>
      );
    }

    return null;
  };

  return (
    <div className="flex gap-[20px] lg:items-start">
      {/* 왼쪽 캐릭터 카드 */}
      <div className="w-[350px] h-[238px] rounded-[20px] overflow-hidden flex-shrink-0 self-start relative px-4 py-3 flex flex-col justify-end">
        <img
          src={getCourseThumbnail(course.difficulty, course.codeEditorType)}
          alt={course.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {course.courseGroupName && (
          <span
            className={`relative p1-b ${
              isLightThumbnail(course.difficulty, course.codeEditorType)
                ? 'text-white'
                : ''
            }`}
          >
            {course.courseGroupName}
          </span>
        )}
      </div>

      {/* 오른쪽 정보 영역 */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0 max-w-[494px] lg:max-w-[354px]">
            <h1 className="h5-b mb-[12px] break-keep">{course.name}</h1>
            <p className="p4-r text-font-sub whitespace-pre-line mb-[12px] leading-[19.2px] break-keep">
              {course.description}
            </p>
            <div className="flex items-center gap-[6px]">
              {course.difficulty && (
                <ChipUI size="lg" variant="light" color="red">
                  {t(course.difficulty)}
                </ChipUI>
              )}
              <ChipUI size="lg" variant="light" color="green">
                {convertCodingType(course.codeEditorType)}
              </ChipUI>
              <ChipUI size="lg" variant="light" color="yellow">
                {totalLessons}
                {t('COURSE_LESSON')}
              </ChipUI>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex flex-col gap-[8px] ml-4 min-w-[152px]">
            {isCertificateEligible && (
              <Button
                color="secondary"
                className="h-[36px] px-[13px] rounded-[8px]"
                onClick={() => setIsCertificateModalOpen(true)}
              >
                <span className="p8-sb">{t('VIEW_CERT')}</span>
              </Button>
            )}
            {course.teachingMaterials?.url && (
              <Button
                variant="flat"
                className="bg-[#EEEEEE] h-[36px] px-[13px] rounded-[8px]"
                startContent={
                  <img
                    src="/assets/course/curriculum/download.svg"
                    alt="download"
                  />
                }
                onClick={() =>
                  handleDownload(
                    course.teachingMaterials!.url || '',
                    course.teachingMaterials!.fileName || '',
                  )
                }
              >
                <span className="p8-sb">{t('CLASS_MATERIALS')}</span>
              </Button>
            )}
            {course.educationalPlan?.url && (
              <Button
                variant="flat"
                className="bg-[#EEEEEE] h-[36px] px-[13px] rounded-[8px]"
                startContent={
                  <img
                    src="/assets/course/curriculum/download.svg"
                    alt="download"
                  />
                }
                onClick={() =>
                  handleDownload(
                    course.educationalPlan!.url || '',
                    course.educationalPlan!.fileName || '',
                  )
                }
              >
                <span className="p8-sb">{t('TEACHING_GUIDE')}</span>
              </Button>
            )}
          </div>
        </div>

        <Divider className="my-[20px]" />

        {/* 하단 진행도 및 시작 버튼 영역 */}
        <div className="w-full">
          <div className="flex items-end gap-[20px]">
            <div className="flex-1">
              <div className="flex-col items-center">
                {profile && (
                  <p className="p4-r mb-1">
                    {t('DEAR_NICKNAME', { NICKNAME: profile.nickname })}
                  </p>
                )}
                <p className="p4-sb mb-[5px]">
                  {t(getProgressMessage())}{' '}
                  <span className="inline-block align-middle">
                    {getProgressIcon()}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-[12px]">
                <div className="flex-1 h-[12px] bg-[#F2F2F2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF5A5A] rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="p4-sb">{progress}%</span>
              </div>
            </div>
            {renderStartButton()}
          </div>
        </div>
      </div>

      {/* 수료증 모달 */}
      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        userName={profile?.nickname || 'MODI'}
        courseName={course.name}
        certificateDate={course.completedAt || undefined}
        certificateImage={undefined}
      />
      <LoginPortalAlertModal
        isOpen={isLoginPortalAlertOpen}
        onClose={onLoginPortalAlertClose}
      />
    </div>
  );
}
