import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import LearningPageHeader from './components/LearningPageHeader';
import LearningPageSidebar from './components/LearningPageSidebar';
import CurriculumModal from './components/CurriculumModal';
import FeedbackModal from './components/FeedbackModal';
import Content from './components/content';
import NoContent from './components/content/error/NoContent';
import {
  CourseParticipantLessonFeedbackType,
  CourseStepDType,
  CourseVisibilityStatus,
  ProgressStatus,
} from '@services/gen/gen';
import { useCreateCourseParticipantLessonFeedback } from '@services/api/course/lesson/useCreateCourseParticipantLessonFeedback';
import { useCourseLesson } from '@services/api/course/lesson/useCourseLesson';
import { useMyCourseDetail } from '@services/api/course/course/useMyCourseDetail';
import { useStartStep } from '@services/api/course/step/useStartStep';
import { useCompleteStep } from '@services/api/course/step/useCompleteStep';
import { UseUpdateStepProgress } from '@services/api/course/step/useUpdateStepProgress';
import { mapStepToContentProps } from './utils/mapStepToContentProps';
import { parseServerErrorMsg } from '@lib/utils/error';
import { useLearningSpaceErrorHandler } from '@hooks/useLearningSpaceErrorHandler';
import SpinnerLoader from '@src/components/ui_old/loading/spinner-loader';
import { useFirebaseEvent } from '@src/components/provider/firebase-provider';

/** 단계/차시 관련 에러 — 코스 상세로 이동 후 모달 표시 */
const STEP_LESSON_ERROR_CODES = [62002, 62003];
/** 코스/코스그룹 관련 에러 — 학습공간 코스 목록으로 이동 후 모달 표시 */
const COURSE_GROUP_ERROR_CODES = [62004, 62005];

export default function LessonLearningPage() {
  const { courseGroupId, courseId, lessonId, stepId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromState = (location.state as any)?.from;
  const { startCourseLessonLog, viewCourseStepLog } = useFirebaseEvent();
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [localStepStatuses, setLocalStepStatuses] = useState<
    Record<string, { status: ProgressStatus; progressRate: number }>
  >({});
  const localStepStatusesRef = useRef(localStepStatuses);
  useEffect(() => {
    localStepStatusesRef.current = localStepStatuses;
  }, [localStepStatuses]);

  const stepStartTimeRef = useRef<number>(Date.now());
  const isExplicitExitRef = useRef(false);
  const handleLearningSpaceError = useLearningSpaceErrorHandler();

  const { createFeedback } = useCreateCourseParticipantLessonFeedback({
    onError: (error) => console.error('피드백 전송 에러:', error),
  });

  const { startStep } = useStartStep({
    onError: (error) => {
      const errorCode = parseServerErrorMsg(
        error?.graphQLErrors?.[0]?.message,
      )?.code;

      if (errorCode && STEP_LESSON_ERROR_CODES.includes(errorCode)) {
        navigate(`/course-group/${courseGroupId}/course/${courseId}`, {
          state: { stepErrorCode: errorCode },
          replace: true,
        });
        return;
      }

      if (errorCode && COURSE_GROUP_ERROR_CODES.includes(errorCode)) {
        navigate('/learning-space/courses', {
          state: { courseErrorCode: errorCode },
          replace: true,
        });
        return;
      }

      handleLearningSpaceError(error, {
        skipCodes: [...STEP_LESSON_ERROR_CODES, ...COURSE_GROUP_ERROR_CODES],
      });
    },
  });

  const { completeStep } = useCompleteStep({
    onError: (error) => console.error('단계 완료 에러:', error),
  });

  const { updateStepProgress } = UseUpdateStepProgress({
    onError: (error) => console.error('진도 업데이트 에러:', error),
  });

  const {
    getMyCourseDetail,
    detail: courseDetail,
    loading: courseLoading,
  } = useMyCourseDetail({
    onError: (error) => {
      const errorCode = parseServerErrorMsg(
        error?.graphQLErrors?.[0]?.message,
      )?.code;

      if (errorCode && STEP_LESSON_ERROR_CODES.includes(errorCode)) {
        navigate(`/course-group/${courseGroupId}/course/${courseId}`, {
          state: { stepErrorCode: errorCode },
          replace: true,
        });
        return;
      }

      if (errorCode && COURSE_GROUP_ERROR_CODES.includes(errorCode)) {
        navigate('/learning-space/courses', {
          state: { courseErrorCode: errorCode },
          replace: true,
        });
        return;
      }

      handleLearningSpaceError(error, {
        skipCodes: [...STEP_LESSON_ERROR_CODES, ...COURSE_GROUP_ERROR_CODES],
      });
    },
  });

  const {
    getCourseLesson,
    lesson,
    loading: lessonLoading,
  } = useCourseLesson({
    onError: (error) => {
      const errorCode = parseServerErrorMsg(
        error?.graphQLErrors?.[0]?.message,
      )?.code;

      if (errorCode && STEP_LESSON_ERROR_CODES.includes(errorCode)) {
        navigate(`/course-group/${courseGroupId}/course/${courseId}`, {
          state: { stepErrorCode: errorCode },
          replace: true,
        });
        return;
      }

      if (errorCode && COURSE_GROUP_ERROR_CODES.includes(errorCode)) {
        navigate('/learning-space/courses', {
          state: { courseErrorCode: errorCode },
          replace: true,
        });
        return;
      }

      handleLearningSpaceError(error, {
        skipCodes: [...STEP_LESSON_ERROR_CODES, ...COURSE_GROUP_ERROR_CODES],
      });
    },
  });

  useEffect(() => {
    if (courseId) getMyCourseDetail({ courseId, courseGroupId });
  }, [courseId]);

  useEffect(() => {
    if (lessonId) getCourseLesson(lessonId, courseId);
  }, [lessonId, courseId]);

  const currentLessonSummary = useMemo(
    () => courseDetail?.lessons.find((l) => l.lessonId === lessonId),
    [courseDetail, lessonId],
  );

  const lessonIndex = useMemo(
    () =>
      (courseDetail?.lessons.findIndex((l) => l.lessonId === lessonId) ?? -1) +
      1,
    [courseDetail, lessonId],
  );

  const summarySteps = currentLessonSummary?.steps ?? [];

  const steps = useMemo(() => {
    if (!lesson?.steps) return [];
    return [...lesson.steps]
      .filter((s) => s.effectiveStatus !== CourseVisibilityStatus.Inactive)
      .sort((a, b) => a.idx - b.idx)
      .map((s) => s.step);
  }, [lesson]);

  const hasNoSteps =
    !courseLoading &&
    !lessonLoading &&
    courseDetail &&
    lesson &&
    summarySteps.length === 0;

  const isDataReady =
    !courseLoading &&
    !lessonLoading &&
    courseDetail &&
    lesson &&
    summarySteps.length > 0;
  const summaryStepsKey = useMemo(
    () => summarySteps.map((s) => s.stepId).join(','),
    [summarySteps.length, lessonId],
  );

  useEffect(() => {
    if (!isDataReady) return;

    const initialStatuses: Record<
      string,
      { status: ProgressStatus; progressRate: number }
    > = {};
    summarySteps.forEach((step) => {
      initialStatuses[step.stepId] = {
        status: step.status ?? ProgressStatus.NotStarted,
        progressRate: step.progressRate ?? 0,
      };
    });
    setLocalStepStatuses(initialStatuses);
  }, [isDataReady, summaryStepsKey]);

  // useEffect(() => {
  //   if (!isDataReady || !courseId || !lessonId) return;

  //   const isValid = stepId && stepId !== 'undefined';
  //   const exists = isValid && summarySteps.some((s) => s.stepId === stepId);

  //   if (!exists && summarySteps[0]) {
  //     navigate(
  //       `/course-group/${courseGroupId}/course/${courseId}/lesson/${lessonId}/step/${summarySteps[0].stepId}`,
  //       { replace: true },
  //     );
  //   }
  // }, [isDataReady, summaryStepsKey, stepId, courseId, lessonId, navigate]);

  const hasLoggedPageView = useRef(false);

  useEffect(() => {
    if (courseId && lessonId) {
      if (!hasLoggedPageView.current) {
        startCourseLessonLog({ courseId, lessonId });
        hasLoggedPageView.current = true;
      }
    }
  }, [courseId, lessonId]);

  useEffect(() => {
    if (courseId && lessonId && stepId && stepId !== 'undefined') {
      viewCourseStepLog({ courseId, lessonId, stepId });
    }
  }, [courseId, lessonId, stepId]);

  const isLocalStateReady = Object.keys(localStepStatuses).length > 0;

  const isCodingStep = (sid?: string): boolean => {
    if (!sid) return false;
    const idx = summarySteps.findIndex((s) => s.stepId === sid);
    if (idx < 0) return false;
    const dtype = steps[idx]?.dType ?? summarySteps[idx]?.stepType;
    return dtype === CourseStepDType.Coding;
  };

  // URL 잡히자마자 무조건 startStep (데이터/로컬상태 대기 없음)
  useEffect(() => {
    if (!courseId || !lessonId || !stepId || stepId === 'undefined') return;
    startStep({ courseGroupId, courseId, lessonId, stepId });
  }, [courseGroupId, courseId, lessonId, stepId]);

  // 모든 스텝: heartbeat(10s) → forceFlush+completeStep(이탈 시)
  useEffect(() => {
    if (
      !isLocalStateReady ||
      !courseId ||
      !lessonId ||
      !stepId ||
      stepId === 'undefined'
    )
      return;

    const isCoding = isCodingStep(stepId);
    const startTime = Date.now();
    stepStartTimeRef.current = startTime;
    isExplicitExitRef.current = false;

    setLocalStepStatuses((prev) => {
      if (prev[stepId]?.status === ProgressStatus.Completed) return prev;
      return {
        ...prev,
        [stepId]: {
          status: ProgressStatus.InProgress,
          progressRate: prev[stepId]?.progressRate ?? 0,
        },
      };
    });

    let lastActivityTime = Date.now();
    const ACTIVITY_EVENTS = [
      'mousemove',
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
    ] as const;
    const handleActivity = () => {
      lastActivityTime = Date.now();
    };
    if (isCoding)
      ACTIVITY_EVENTS.forEach((e) =>
        window.addEventListener(e, handleActivity),
      );

    const intervalId = setInterval(() => {
      if (isCoding && Date.now() - lastActivityTime > 60_000) return;
      updateStepProgress({
        courseGroupId,
        courseId,
        lessonId,
        stepId,
        progressRate: localStepStatusesRef.current[stepId]?.progressRate ?? 0,
        totalJoinedTime: Math.floor((Date.now() - startTime) / 1000),
      });
    }, 10_000);

    return () => {
      clearInterval(intervalId);
      if (isCoding)
        ACTIVITY_EVENTS.forEach((e) =>
          window.removeEventListener(e, handleActivity),
        );

      if (isExplicitExitRef.current) return;

      updateStepProgress({
        courseGroupId,
        courseId,
        lessonId,
        stepId,
        progressRate: localStepStatusesRef.current[stepId]?.progressRate ?? 0,
        totalJoinedTime: Math.floor((Date.now() - startTime) / 1000),
        forceFlush: true,
      });
      completeStep({ courseGroupId, courseId, lessonId, stepId });
      setLocalStepStatuses((prev) => ({
        ...prev,
        [stepId]: {
          status: ProgressStatus.Completed,
          progressRate: prev[stepId]?.progressRate ?? 0,
        },
      }));
    };
  }, [isLocalStateReady, stepId, courseId, lessonId]);

  const currentStepIndex = useMemo(() => {
    if (!stepId || stepId === 'undefined') return 0;
    const byId = steps.findIndex((s) => s.id === stepId);
    if (byId >= 0) return byId;
    const bySummary = summarySteps.findIndex((s) => s.stepId === stepId);
    if (bySummary >= 0 && bySummary < steps.length) return bySummary;
    return 0;
  }, [steps, stepId, summarySteps]);

  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;

  const mappedContent = useMemo(() => {
    if (!currentStep) return null;
    return mapStepToContentProps(currentStep as any);
  }, [currentStep]);

  const nextPdfUrl = useMemo(() => {
    for (let i = currentStepIndex + 1; i < steps.length; i++) {
      const mapped = mapStepToContentProps(steps[i] as any);
      if (mapped?.contentType === 'PDF' && mapped.contentUrl)
        return mapped.contentUrl;
    }
    return undefined;
  }, [steps, currentStepIndex]);

  const localCompletedSteps = useMemo(
    () =>
      summarySteps.filter(
        (ss) =>
          localStepStatuses[ss.stepId]?.status === ProgressStatus.Completed,
      ).length,
    [summarySteps, localStepStatuses],
  );

  const sidebarSteps = useMemo(
    () =>
      summarySteps.map((ss, i) => {
        const localStatus = localStepStatuses[ss.stepId];
        return {
          id: ss.stepId,
          title: ss.stepName,
          dType: steps[i]?.dType ?? ss.stepType,
          status: localStatus?.status ?? ss.status ?? ProgressStatus.NotStarted,
          progressRate: localStatus?.progressRate ?? ss.progressRate ?? 0,
        };
      }),
    [summarySteps, steps, localStepStatuses],
  );

  const curriculumLessons = useMemo(
    () =>
      courseDetail?.lessons.map((l) => ({
        id: l.lessonId,
        name: l.lessonName,
        completedSteps: l.completedSteps,
        totalSteps: l.totalSteps,
        status: l.status,
      })) ?? [],
    [courseDetail],
  );

  const handleOpenCurriculum = () => {
    getMyCourseDetail({ courseId: courseId!, courseGroupId });
    setIsCurriculumModalOpen(true);
  };

  const navOptions = fromState ? { state: { from: fromState } } : undefined;

  const handleSelectLesson = async (selectedLessonId: string) => {
    isExplicitExitRef.current = true;

    if (stepId && stepId !== 'undefined') {
      try {
        await updateStepProgress({
          courseGroupId,
          courseId: courseId!,
          lessonId: lessonId!,
          stepId,
          progressRate: localStepStatusesRef.current[stepId]?.progressRate ?? 0,
          totalJoinedTime: Math.floor(
            (Date.now() - stepStartTimeRef.current) / 1000,
          ),
          forceFlush: true,
        });
        await completeStep({
          courseGroupId,
          courseId: courseId!,
          lessonId: lessonId!,
          stepId,
        });
      } catch (e) {
        console.error('차시 이동 처리 에러:', e);
      }
    }

    await getMyCourseDetail({ courseId: courseId!, courseGroupId });

    const target = courseDetail?.lessons.find(
      (l) => l.lessonId === selectedLessonId,
    );
    const firstStepId = target?.steps?.[0]?.stepId;
    const basePath = `/course-group/${courseGroupId}/course/${courseId}/lesson/${selectedLessonId}`;
    navigate(
      firstStepId ? `${basePath}/step/${firstStepId}` : basePath,
      navOptions,
    );
  };

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  const prevLesson = useMemo(() => {
    if (!courseDetail?.lessons || !lessonId) return null;
    const currentIdx = courseDetail.lessons.findIndex(
      (l) => l.lessonId === lessonId,
    );
    if (currentIdx <= 0) return null;
    return courseDetail.lessons[currentIdx - 1];
  }, [courseDetail, lessonId]);

  const nextLesson = useMemo(() => {
    if (!courseDetail?.lessons || !lessonId) return null;
    const currentIdx = courseDetail.lessons.findIndex(
      (l) => l.lessonId === lessonId,
    );
    if (currentIdx < 0 || currentIdx >= courseDetail.lessons.length - 1)
      return null;
    return courseDetail.lessons[currentIdx + 1];
  }, [courseDetail, lessonId]);

  const handleNextStep = () => {
    const nextId = summarySteps[currentStepIndex + 1]?.stepId;
    if (nextId) {
      navigate(
        `/course-group/${courseGroupId}/course/${courseId}/lesson/${lessonId}/step/${nextId}`,
        navOptions,
      );
    }
  };

  const handlePrevStep = () => {
    const prevId = summarySteps[currentStepIndex - 1]?.stepId;
    if (prevId) {
      navigate(
        `/course-group/${courseGroupId}/course/${courseId}/lesson/${lessonId}/step/${prevId}`,
        navOptions,
      );
    }
  };

  const handlePrevLesson = () => {
    if (!prevLesson) return;
    const lastStepId = prevLesson.steps?.[prevLesson.steps.length - 1]?.stepId;
    const basePath = `/course-group/${courseGroupId}/course/${courseId}/lesson/${prevLesson.lessonId}`;
    navigate(
      lastStepId ? `${basePath}/step/${lastStepId}` : basePath,
      navOptions,
    );
  };

  const handleNextLesson = () => {
    if (!nextLesson) return;
    const firstStepId = nextLesson.steps?.[0]?.stepId;
    const basePath = `/course-group/${courseGroupId}/course/${courseId}/lesson/${nextLesson.lessonId}`;
    navigate(
      firstStepId ? `${basePath}/step/${firstStepId}` : basePath,
      navOptions,
    );
  };

  const handleExit = async () => {
    if (document.fullscreenElement) document.exitFullscreen();

    isExplicitExitRef.current = true;

    if (stepId) {
      try {
        await updateStepProgress({
          courseGroupId,
          courseId: courseId!,
          lessonId: lessonId!,
          stepId,
          progressRate: localStepStatusesRef.current[stepId]?.progressRate ?? 0,
          totalJoinedTime: Math.floor(
            (Date.now() - stepStartTimeRef.current) / 1000,
          ),
          forceFlush: true,
        });
        await completeStep({
          courseGroupId,
          courseId: courseId!,
          lessonId: lessonId!,
          stepId,
        });
      } catch (e) {
        console.error('종료 처리 에러:', e);
      }
    }

    navigate(`/course-group/${courseGroupId}/course/${courseId}`, {
      state: { fromLearning: true, from: fromState },
    });
  };

  const handleSendFeedback = async (feedback: {
    category: string;
    description: string;
  }) => {
    if (!courseId || !lessonId) return;
    await createFeedback({
      courseId,
      lessonId,
      feedbackType: feedback.category as CourseParticipantLessonFeedbackType,
      feedback: feedback.description,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode) setIsFocusMode(false);
      if (e.ctrlKey && e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevStep();
      }
      if (e.ctrlKey && e.key === 'ArrowDown') {
        e.preventDefault();
        handleNextStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode, currentStepIndex, totalSteps]);

  // 로딩 상태 - 모든 데이터가 준비될 때까지 대기 (단계가 없는 차시는 제외)
  if (!hasNoSteps && (!isDataReady || !isLocalStateReady)) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-[50]">
        <SpinnerLoader className="w-[100px] h-[100px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white flex flex-col overflow-hidden z-[50]">
      <div className="flex-1 flex overflow-hidden">
        {!isFocusMode && (
          <LearningPageSidebar
            courseName={courseDetail.name}
            lessonName={currentLessonSummary?.lessonName ?? ''}
            lessonIndex={lessonIndex}
            steps={sidebarSteps}
            currentStepId={stepId ?? ''}
            onLessonClick={handleOpenCurriculum}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          {!isFocusMode && (
            <LearningPageHeader
              lessonName={currentLessonSummary?.lessonName ?? ''}
              lessonIndex={lessonIndex}
              stepName={summarySteps[currentStepIndex]?.stepName ?? ''}
              completedSteps={localCompletedSteps}
              totalSteps={summarySteps.length}
              onExit={handleExit}
              onLessonClick={handleOpenCurriculum}
              onFeedbackClick={() => setIsFeedbackModalOpen(true)}
              hideStepInfo={!!hasNoSteps}
            />
          )}

          <main
            className={`flex-1 flex flex-col overflow-hidden transition-all ${
              isFocusMode ? 'bg-black' : 'bg-[#111111]'
            }`}
          >
            {hasNoSteps ? (
              <NoContent
                hasPrevLesson={!!prevLesson}
                hasNextLesson={!!nextLesson}
                onPrevLesson={handlePrevLesson}
                onNextLesson={handleNextLesson}
              />
            ) : mappedContent ? (
              <Content
                contentType={mappedContent.contentType}
                contentUrl={mappedContent.contentUrl}
                nextContentUrl={nextPdfUrl}
                slideCount={mappedContent.slideCount}
                learningObjective={mappedContent.learningObjective}
                activity={mappedContent.activity}
                codeEditorType={mappedContent.codeEditorType}
                videoOverlays={mappedContent.videoOverlays}
                title={summarySteps[currentStepIndex]?.stepName}
                stepId={stepId}
                onPrevStep={handlePrevStep}
                onNextStep={handleNextStep}
                hasPrevStep={currentStepIndex > 0}
                hasNextStep={currentStepIndex < totalSteps - 1}
                onToggleFullscreen={() => setIsFocusMode((v) => !v)}
                isFullscreen={isFocusMode}
                isFirstStep={isFirstStep}
                isLastStep={isLastStep}
                hasPrevLesson={!!prevLesson}
                hasNextLesson={!!nextLesson}
                onPrevLesson={handlePrevLesson}
                onNextLesson={handleNextLesson}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <img
                  src="/assets/course/curriculum/loading.gif"
                  alt="Loading"
                  className="w-[100px] h-[100px]"
                />
              </div>
            )}
          </main>
        </div>
      </div>

      <CurriculumModal
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
        courseName={courseDetail.name}
        lessons={curriculumLessons}
        currentLessonId={lessonId ?? ''}
        onSelectLesson={handleSelectLesson}
      />
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        courseName={courseDetail.name}
        lessonName={currentLessonSummary?.lessonName ?? ''}
        onSendFeedback={handleSendFeedback}
      />
    </div>
  );
}
