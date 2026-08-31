import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Curriculum from '@src/lib/newAssets/curriculum';
import type { MyCourseDetailQuery } from '@services/gen/gen';

type Step = NonNullable<
  NonNullable<
    NonNullable<MyCourseDetailQuery['myCourseDetail']>['lessons']
  >[number]['steps']
>[number];

interface CurriculumStepItemProps {
  lessonId: string;
  step: Step;
  index: number;
  isSignedIn: boolean;
  onRequireLogin: () => void;
}

export default function CurriculumStepItem({
  lessonId,
  step,
  index,
  isSignedIn,
  onRequireLogin,
}: CurriculumStepItemProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseGroupId, courseId } = useParams();
  const fromState = (location.state as any)?.from;

  const handleStepClick = () => {
    if (!isSignedIn) {
      onRequireLogin();
      return;
    }
    navigate(
      `/course-group/${courseGroupId}/course/${courseId}/lesson/${lessonId}/step/${step.stepId}`,
      fromState ? { state: { from: fromState } } : undefined,
    );
  };

  const getStatusIcon = () => {
    let iconPath = '';
    const isEverCompleted = step.status === 'COMPLETED';

    if (isEverCompleted) {
      iconPath = '/assets/course/curriculum/success.svg';
    } else if (step.status === 'IN_PROGRESS') {
      iconPath = '/assets/course/curriculum/progress.svg';
    } else {
      iconPath = '/assets/course/curriculum/ready.svg';
    }
    return (
      <img
        src={iconPath}
        alt={step.status || ''}
        className="w-[20px] h-[20px]"
      />
    );
  };

  const getTypeIcon = () => {
    const stepType = step.stepType?.toLowerCase();

    if (stepType === 'vod' || stepType === 'youtube') {
      return (
        <Curriculum.Video className="w-[18px] h-[18px] group-hover:text-[#FF5A5A] transition-colors" />
      );
    }

    if (stepType === 'coding') {
      return (
        <Curriculum.Training className="w-[18px] h-[18px] group-hover:text-[#FF5A5A] transition-colors" />
      );
    }

    return (
      <Curriculum.Theory className="w-[18px] h-[18px] group-hover:text-[#FF5A5A] transition-colors" />
    );
  };

  return (
    <div
      onClick={handleStepClick}
      className={`flex items-center gap-3 p-3 cursor-pointer transition-all hover:bg-[#FFF5F5] group ${
        index % 2 === 0 ? 'bg-form-bg' : 'bg-form-form'
      } last:rounded-b-[12px]`}
    >
      <div className="flex-shrink-0">{getStatusIcon()}</div>
      <div className="flex-1 min-w-0 flex items-center gap-1">
        <div className="flex-shrink-0">{getTypeIcon()}</div>
        <span className="p4-r group-hover:text-[#FF5A5A] transition-colors truncate">
          {step.stepName}
        </span>
      </div>
    </div>
  );
}
