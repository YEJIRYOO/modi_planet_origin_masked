import ChipUI from '@src/components/ui/Chip/ChipUI';
import { useTranslation } from 'react-i18next';
import { CourseDifficulty, ActivityCodingType } from '@services/gen/gen';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCourseThumbnail, isLightThumbnail } from '@src/lib/utils/courseThumbnail';

interface CourseCardProps {
  id: string;
  courseGroupId?: string | null;
  courseGroupName?: string | null;
  name: string;
  description: string;
  difficulty: CourseDifficulty;
  codeEditorType: ActivityCodingType;
  lessonCount: number;
}

const convertCodingType = (type: ActivityCodingType): 'Block' | 'AI Block' => {
  if (type === ActivityCodingType.AiBlock) return 'AI Block';
  return 'Block';
};

export default function CourseCard({
  id,
  courseGroupId,
  courseGroupName,
  name,
  description,
  difficulty,
  codeEditorType,
  lessonCount,
}: CourseCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/course-group/${courseGroupId || ''}/course/${id}`, {
      state: { from: location.pathname },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="w-[302px] lg:w-[284px] h-[368px] rounded-[20px] overflow-hidden bg-white border cursor-pointer"
    >
      {/* Thumbnail Image */}
      <div className="relative w-full h-[200px] px-4 py-5 flex flex-col justify-end">
        <img
          src={getCourseThumbnail(difficulty, codeEditorType)}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {courseGroupName && (
          <span className={`relative p1-b line-clamp-5 ${isLightThumbnail(difficulty, codeEditorType) ? 'text-white' : ''}`}>{courseGroupName}</span>
        )}
      </div>

      {/* Content */}
      <div className="p-[16px] flex flex-col">
        {/* Title */}
        <h3 className="p3-b truncate break-keep mb-2 h-[22px]">{name}</h3>

        {/* Description */}
        <p className="mb-6 p6-r text-font-sub_1 line-clamp-3 break-keep min-h-[52px]">
          {description}
        </p>

        {/* Chips */}
        <div className="flex gap-[6px] flex-wrap">
          <ChipUI variant="light" color="red" size="lg">
            {t(difficulty)}
          </ChipUI>
          <ChipUI variant="light" color="green" size="lg">
            {convertCodingType(codeEditorType)}
          </ChipUI>
          <ChipUI variant="light" color="yellow" size="lg">
            {lessonCount}
            {t('COURSE_LESSON')}
          </ChipUI>
        </div>
      </div>
    </div>
  );
}
