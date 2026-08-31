import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Curriculum from '@src/lib/newAssets/curriculum';
import { CourseStepDType, ProgressStatus } from '@services/gen/gen';

interface LearningStep {
  id: string;
  title: string;
  dType: CourseStepDType;
  status: ProgressStatus;
}

interface LearningPageSidebarProps {
  courseName: string;
  lessonName: string;
  lessonIndex: number;
  steps: LearningStep[];
  currentStepId: string;
  onLessonClick?: () => void;
}

export default function LearningPageSidebar({
  courseName,
  lessonName,
  lessonIndex,
  steps,
  currentStepId,
  onLessonClick,
}: LearningPageSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseGroupId, courseId, lessonId } = useParams();
  const fromState = (location.state as any)?.from;
  const [isCollapsed, setIsCollapsed] = useState(
    () => window.matchMedia('(max-width: 1579px)').matches,
  );

  const handleStepClick = (stepId: string) => {
    navigate(
      `/course-group/${courseGroupId}/course/${courseId}/lesson/${lessonId}/step/${stepId}`,
      fromState ? { state: { from: fromState } } : undefined,
    );
  };

  const getStepState = (step: LearningStep) => {
    if (step.status === ProgressStatus.Completed) return 'completed' as const;
    if (step.id === currentStepId) return 'inProgress' as const;
    return 'notStarted' as const;
  };

  const getStatusIcon = (step: LearningStep & { progressRate?: number }) => {
    let iconPath = '';
    const isEverCompleted =
      step.status === ProgressStatus.Completed ||
      (step.status === ProgressStatus.InProgress &&
        (step.progressRate ?? 0) >= 1);

    if (isEverCompleted) {
      iconPath = '/assets/course/curriculum/success.svg';
    } else if (step.id === currentStepId) {
      iconPath = '/assets/course/curriculum/progress.svg';
    } else {
      iconPath = '/assets/course/curriculum/ready.svg';
    }
    return (
      <img src={iconPath} alt={step.status} className="w-[20px] h-[20px]" />
    );
  };

  const getTypeIcon = (step: LearningStep, isActive: boolean) => {
    const isMedia =
      step.dType === CourseStepDType.Vod ||
      step.dType === CourseStepDType.Youtube;
    const isCodingOrQuiz =
      step.dType === CourseStepDType.Coding ||
      step.dType === CourseStepDType.Quiz;
    const isCompleted = step.status === ProgressStatus.Completed;
    const useFill = isCompleted;

    const Icon = isMedia
      ? useFill
        ? Curriculum.VideoFill
        : Curriculum.Video
      : isCodingOrQuiz
      ? useFill
        ? Curriculum.TrainingFill
        : Curriculum.Training
      : useFill
      ? Curriculum.TheoryFill
      : Curriculum.Theory;
    return <Icon className="w-[18px] h-[18px]" />;
  };

  return (
    <aside
      className={`border-r bg-white shrink-0 flex flex-col h-full transition-all duration-300 ${
        isCollapsed ? 'w-[60px]' : 'w-[300px]'
      }`}
    >
      <div className="h-[60px] border-b flex items-center px-[16px] gap-[12px]">
        {!isCollapsed && (
          <span className="p3-r text-font-sub_1 truncate flex-1">
            {courseName}
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="transition-colors shrink-0"
          aria-label={isCollapsed ? '사이드바 펼치기' : '사이드바 접기'}
        >
          <img
            src="/assets/course/curriculum/collapse.svg"
            className={`transition-transform w-[24px] h-[24px] ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {!isCollapsed && (
          <>
            {/* Lesson Title */}
            <button
              type="button"
              onClick={onLessonClick}
              className="flex items-center justify-between border-b hover:bg-[#FAFAFA] transition-colors group w-full text-left cursor-pointer"
            >
              <span className="pl-[16px] py-[16px] p3-b truncate flex-1">
                {lessonIndex}. {lessonName}
              </span>
              <div className="p-[16px] shrink-0">
                <img
                  src="/assets/course/curriculum/curriculum.svg"
                  alt="curriculum"
                  className="w-[24px] h-[24px] pr-1"
                />
              </div>
            </button>

            {/* Steps List */}
            <div className="flex flex-col px-[12px] gap-[8px] py-[12px]">
              {steps.map((step) => {
                const isActive = step.id === currentStepId;
                const state = getStepState(step);

                const bgClass = isActive
                  ? state === 'completed'
                    ? 'bg-[#E6FAF5]'
                    : 'bg-[#FFFAEF]'
                  : 'hover:bg-form-form';

                const textClass =
                  state === 'completed'
                    ? 'text-font-main'
                    : state === 'inProgress'
                    ? 'text-font-sub_1'
                    : 'text-font-non';

                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className={`flex items-center gap-[12px] p-[12px] rounded-[12px] transition-all text-left ${bgClass} ${textClass}`}
                  >
                    <div className="flex-1 flex items-center gap-[10px] overflow-hidden">
                      <div className="shrink-0">
                        {getTypeIcon(step, isActive)}
                      </div>
                      <span className="p6-r truncate">{step.title}</span>
                    </div>
                    <div className="flex-shrink-0">{getStatusIcon(step)}</div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Collapsed State - 선택 시에만 상태별 배경색 적용 */}
        {isCollapsed && (
          <div className="flex flex-col items-center py-[20px] gap-[16px]">
            {steps.map((step) => {
              const isActive = step.id === currentStepId;
              const state = getStepState(step);

              const collapsedClass = isActive
                ? state === 'completed'
                  ? 'bg-[#E6FAF5] text-[#00C08A]'
                  : 'bg-[#FFFAEF] text-[#FFC629]'
                : 'hover:bg-form-form';

              return (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all ${collapsedClass}`}
                  title={step.title}
                >
                  {getTypeIcon(step, isActive)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
