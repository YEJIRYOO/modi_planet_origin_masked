import { useState, useRef, useLayoutEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import CurriculumStepItem from './CurriculumStepItem';
import { Divider, useDisclosure } from '@nextui-org/react';
import ChipUI from '@src/components/ui/Chip/ChipUI';
import useTranslator from '@src/components/hooks/useTranslator';
import type { MyCourseDetailQuery } from '@services/gen/gen';
import { useProfileStore } from '@src/store/zustand/user';
import LoginPortalAlertModal from '@components/ui/common/Modal/LoginPortalAlertModal';

interface CurriculumLessonListProps {
  courseId: string;
  course: MyCourseDetailQuery['myCourseDetail'] | null;
}

export default function CurriculumLessonList({
  courseId,
  course,
}: CurriculumLessonListProps) {
  const [expandedLessonId, setExpandedLessonId] = useState<string>('');
  const { t } = useTranslator();
  const measureRef = useRef<HTMLDivElement>(null);
  const [chipWidth, setChipWidth] = useState<number | undefined>(undefined);

  const lessons = course?.lessons || [];

  const statusConfig: Record<
    string,
    { color: 'green' | 'yellow' | 'gray'; label: string }
  > = {
    COMPLETED: { color: 'green', label: t('STUDY_COMPLETED') },
    IN_PROGRESS: { color: 'yellow', label: t('STUDY_IN_PROGRESS') },
    NOT_STARTED: { color: 'gray', label: t('BEFORE_STUDY') },
  };

  const activeStatuses = useMemo(
    () => [...new Set(lessons.map((l) => l.status ?? 'NOT_STARTED'))],
    [lessons],
  );

  useLayoutEffect(() => {
    if (!measureRef.current) return;
    const widths = Array.from(
      measureRef.current.children,
      (el) => (el as HTMLElement).offsetWidth,
    );
    if (widths.length > 0) setChipWidth(Math.ceil(Math.max(...widths)));
  }, [activeStatuses, t]);

  const getStatusChip = (status?: string | null) => {
    const { color, label } =
      statusConfig[status ?? ''] ?? statusConfig.NOT_STARTED;
    return (
      <ChipUI variant="filled" color={color} size="xl">
        {label}
      </ChipUI>
    );
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { courseGroupId } = useParams();
  const profile = useProfileStore((state) => state.profile);
  const {
    isOpen: isLoginPortalAlertOpen,
    onOpen: onLoginPortalAlertOpen,
    onClose: onLoginPortalAlertClose,
  } = useDisclosure();

  const toggleLesson = (lessonId: string) => {
    setExpandedLessonId((prev) => (prev === lessonId ? '' : lessonId));
  };

  const handleLessonClick = (lesson: NonNullable<typeof lessons>[number]) => {
    if (!profile) {
      onLoginPortalAlertOpen();
      return;
    }

    const steps = lesson.steps || [];
    const fromState = (location.state as any)?.from;
    const navOptions = fromState ? { state: { from: fromState } } : undefined;

    // 1. IN_PROGRESS 단계 중 idx가 가장 큰 것
    const inProgressSteps = steps.filter((s) => s.status === 'IN_PROGRESS');
    if (inProgressSteps.length > 0) {
      const lastInProgress = inProgressSteps.reduce((prev, curr) =>
        (curr.idx ?? 0) > (prev.idx ?? 0) ? curr : prev,
      );
      navigate(
        `/course-group/${courseGroupId}/course/${courseId}/lesson/${lesson.lessonId}/step/${lastInProgress.stepId}`,
        navOptions,
      );
      return;
    }

    // 2. IN_PROGRESS 없으면 → 첫 번째 NOT_STARTED step
    const firstNotStarted = steps.find((s) => s.status === 'NOT_STARTED');
    if (firstNotStarted) {
      navigate(
        `/course-group/${courseGroupId}/course/${courseId}/lesson/${lesson.lessonId}/step/${firstNotStarted.stepId}`,
        navOptions,
      );
      return;
    }

    // 3. 전부 완료한 경우에는 첫번째 step으로
    if (steps.length > 0) {
      navigate(
        `/course-group/${courseGroupId}/course/${courseId}/lesson/${lesson.lessonId}/step/${steps[0].stepId}`,
        navOptions,
      );
      return;
    }

    // 4. 단계가 없는 경우에는 lesson으로 이동
    navigate(
      `/course-group/${courseGroupId}/course/${courseId}/lesson/${lesson.lessonId}`,
      navOptions,
    );
  };

  return (
    <div className="relative">
      <div
        ref={measureRef}
        className="absolute invisible pointer-events-none"
        aria-hidden="true"
      >
        {activeStatuses.map((status) => {
          const { color, label } =
            statusConfig[status] ?? statusConfig.NOT_STARTED;
          return (
            <ChipUI key={status} variant="filled" color={color} size="xl">
              {label}
            </ChipUI>
          );
        })}
      </div>
      <div className="items-center mb-[24px]">
        <h2 className="p1-b mb-[12px]">{t('CURRICULUM')}</h2>
        <Divider />
      </div>

      {lessons.length > 0 ? (
        <div className="flex flex-col gap-[12px]">
          {lessons.map((lesson, lessonIndex) => {
            const isExpanded = expandedLessonId === lesson.lessonId;
            const completedSteps = lesson.completedSteps || 0;
            const totalSteps = lesson.totalSteps || 0;

            return (
              <div
                key={lesson.lessonId}
                className={`bg-white rounded-[20px] transition-all duration-200 overflow-hidden px-4 py-5 border ${
                  isExpanded ? 'border-brand_2' : 'border-transparent'
                }`}
              >
                {/* 차시 헤더 */}
                <div className="w-full flex items-center gap-[24px]">
                  <button
                    onClick={() => handleLessonClick(lesson)}
                    className="flex flex-1 items-center gap-[16px] min-w-0 cursor-pointer"
                  >
                    <span className="p3-m truncate hover:text-brand_2 transition-colors">
                      {lesson.idx}. {lesson.lessonName}
                    </span>
                  </button>

                  <div className="flex flex-shrink-0 items-center gap-[24px]">
                    <span className="p3-m">
                      {completedSteps}/{totalSteps}
                    </span>
                    <div
                      className="grid"
                      style={chipWidth ? { minWidth: chipWidth } : undefined}
                    >
                      {getStatusChip(lesson.status)}
                    </div>
                    <button
                      onClick={() => toggleLesson(lesson.lessonId)}
                      className="cursor-pointer"
                    >
                      <img
                        src="/assets/course/curriculum/drop.svg"
                        alt="drop"
                        className={`w-[24px] h-[24px] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 차시 내용 (이론/실습 목록) */}
                {isExpanded && (
                  <div className="">
                    <Divider className="my-4" />
                    <p className="p4-r mb-4 whitespace-pre-line break-keep">
                      {lesson.description}
                    </p>

                    <div className="rounded-[4px] overflow-hidden">
                      {lesson.steps && lesson.steps.length > 0 ? (
                        lesson.steps.map((step, index) => (
                          <CurriculumStepItem
                            key={step.stepId}
                            lessonId={lesson.lessonId}
                            step={step}
                            index={index}
                            isSignedIn={!!profile}
                            onRequireLogin={onLoginPortalAlertOpen}
                          />
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src="/assets/error/no-data.svg"
                            alt="no data"
                            className="w-[120px] h-[120px] mb-[12px]"
                          />
                          <p className="p3-r mb-[40px]">{t('NO_MATERIAL')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assets/error/no-data.svg"
            alt="no data"
            className="w-[120px] h-[120px] mb-[12px]"
          />
          <p className="p3-r">{t('NO_MATERIAL')}</p>
        </div>
      )}
      <LoginPortalAlertModal
        isOpen={isLoginPortalAlertOpen}
        onClose={onLoginPortalAlertClose}
      />
    </div>
  );
}
