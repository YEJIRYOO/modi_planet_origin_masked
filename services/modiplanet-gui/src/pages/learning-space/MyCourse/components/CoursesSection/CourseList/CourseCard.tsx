import { Card, CardBody } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import { useTranslation } from 'react-i18next';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import ChipUI from '@src/components/ui/Chip/ChipUI';
import { MyCourseItemModel } from '@services/client-model/course';
import { ActivityCodingType, CourseDifficulty } from '@services/gen/gen';
import {
  getCourseThumbnail,
  isLightThumbnail,
} from '@src/lib/utils/courseThumbnail';
import CourseStatus from './CourseStatus';
import CourseProgress from './CourseProgress';

interface CourseCardProps {
  course: MyCourseItemModel;
  onContinue?: (
    courseId: string,
    courseGroupId: string,
    nextLearning?: {
      lessonId: string;
      stepId?: string | null;
    } | null,
  ) => void;
  onReview?: (
    courseId: string,
    courseGroupId: string,
    firstLearning?: {
      lessonId: string;
      stepId?: string | null;
    } | null,
  ) => void;
  onCardClick?: (courseId: string, courseGroupId: string) => void;
}

export default function CourseCard({
  course,
  onContinue,
  onReview,
  onCardClick,
}: CourseCardProps) {
  const { status } = course;
  const { t } = useTranslation();

  const courseGroupId = course.courseGroupId || '';

  const handleCardClick = () => {
    onCardClick?.(course.id, courseGroupId);
  };

  const renderActionButton = () => {
    if (status === 'complete') {
      return (
        <ButtonUI
          variant="bordered"
          color="default"
          className="w-full border-[#2B2929]"
          onPress={() =>
            onReview?.(course.id, courseGroupId, course.firstLearning)
          }
        >
          {t('REVIEW')}
        </ButtonUI>
      );
    }

    if (status === 'not_started') {
      return (
        <ButtonUI
          color="secondary"
          className="w-full"
          isDisabled={course.totalLessons === 0}
          onPress={() =>
            onContinue?.(course.id, courseGroupId, course.firstLearning)
          }
        >
          {t('START_STUDY')} →
        </ButtonUI>
      );
    }

    return (
      <ButtonUI
        color="secondary"
        className="w-full"
        onPress={() =>
          onContinue?.(course.id, courseGroupId, course.nextLearning)
        }
      >
        {t('CONTINUE_LESSON', { LESSON: course.currentLesson })} →
      </ButtonUI>
    );
  };

  const getDifficultyText = (difficulty: CourseDifficulty | null) => {
    if (!difficulty) return '';
    const difficultyMap: Record<CourseDifficulty, string> = {
      [CourseDifficulty.Beginner]: t('BEGINNER'),
      [CourseDifficulty.Intermediate]: t('INTERMEDIATE'),
      [CourseDifficulty.Advanced]: t('ADVANCED'),
    };
    return difficultyMap[difficulty] || '';
  };

  const getTargetTypeText = (codeEditorType: ActivityCodingType | null) => {
    if (!codeEditorType) return '';
    const targetMap: Record<ActivityCodingType, string> = {
      [ActivityCodingType.Block]: t('BLOCK'),
      [ActivityCodingType.AiBlock]: t('AI_BLOCK'),
      [ActivityCodingType.Python]: t('PYTHON'),
    };
    return targetMap[codeEditorType] || '';
  };

  return (
    <Card
      as="div"
      shadow="none"
      className="w-[1040px] lg:w-full border border-line-normal shadow-none cursor-pointer"
      isPressable
      onPress={handleCardClick}
    >
      <CardBody className="p-0">
        <div className="flex">
          {/* 썸네일 */}
          <div className="flex-shrink-0 w-[302px] h-[184px] bg-gray-100 overflow-hidden relative px-4 py-5 flex flex-col justify-end">
            <img
              src={getCourseThumbnail(course.difficulty, course.codeEditorType)}
              alt={course.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {status === 'complete' && (
              <>
                {/* 검은색 오버레이 */}
                <div className="absolute inset-0 bg-black opacity-10" />
                {/* 완료 아이콘 */}
                <img
                  src="/assets/learning-space/completed.svg"
                  alt="completed"
                  className="absolute top-2 left-2 z-10"
                />
              </>
            )}
            {course.courseGroupName && (
              <span
                className={`relative z-10 p1-b line-clamp-5 ${
                  isLightThumbnail(course.difficulty, course.codeEditorType)
                    ? 'text-white'
                    : ''
                }`}
              >
                {course.courseGroupName}
              </span>
            )}
          </div>

          {/* 컨텐츠 */}
          <div className="flex-1 min-w-0 flex flex-col justify-between p-6">
            <div>
              <h3 className="p1-b mb-[12.5px] overflow-hidden text-ellipsis whitespace-nowrap">
                {course.title}
              </h3>
              <p className="min-h-[52px] p6-r text-font-sub_1 mb-[12.5px] line-clamp-3 break-keep">
                {course.description}
              </p>

              {/* 태그 - 난이도(빨강), 제품(초록), 차시 수(노랑) */}
              <div className="flex gap-[6px]">
                {course.difficulty && (
                  <ChipUI variant="light" color="red" size="lg">
                    {getDifficultyText(course.difficulty)}
                  </ChipUI>
                )}
                <ChipUI variant="light" color="green" size="lg">
                  {getTargetTypeText(course.codeEditorType)}
                </ChipUI>
                <ChipUI variant="light" color="yellow" size="lg">
                  {course.totalLessons}
                  {t('COURSE_LESSON')}
                </ChipUI>
              </div>
            </div>
          </div>

          <Divider
            orientation="vertical"
            className="my-6 h-auto self-stretch"
          />

          {/* 우측 상태 및 버튼 영역 */}
          <div className="flex-shrink-0 w-[248px] flex flex-col justify-end p-6">
            {course.totalLessons > 0 && (
              <div className="self-start mb-auto">
                <CourseStatus status={status} />
              </div>
            )}

            <div className="w-full flex flex-col gap-[14px]">
              {course.totalLessons > 0 && (
                <CourseProgress
                  current={course.completedLessons}
                  total={course.totalLessons}
                />
              )}

              <div
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {renderActionButton()}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
