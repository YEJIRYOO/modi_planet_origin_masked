import { useState, useEffect } from 'react';
import CModalOneButton from '@components/ui/Modal/CModalOneButton';
import ChipUI from '@components/ui/Chip/ChipUI';
import { ModalBody } from '@nextui-org/react';
import useTranslator from '@src/components/hooks/useTranslator';
import { ProgressStatus } from '@services/gen/gen';

interface Lesson {
  id: string;
  name: string;
  completedSteps: number;
  totalSteps: number;
  status: ProgressStatus;
}

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  lessons: Lesson[];
  currentLessonId: string;
  onSelectLesson: (lessonId: string) => void;
}

export default function CurriculumModal({
  isOpen,
  onClose,
  courseName,
  lessons,
  currentLessonId,
  onSelectLesson,
}: CurriculumModalProps) {
  const [selectedLessonId, setSelectedLessonId] = useState(currentLessonId);
  const { t } = useTranslator();

  useEffect(() => {
    if (isOpen) {
      setSelectedLessonId(currentLessonId);
    }
  }, [isOpen, currentLessonId]);

  const handleMove = () => {
    onSelectLesson(selectedLessonId);
    onClose();
  };

  return (
    <CModalOneButton
      isOpen={isOpen}
      onClose={onClose}
      title={t('CURRICULUM')}
      okLabel={t('MOVE_TO')}
      onClickOk={handleMove}
      size="sm"
      innerLayout="left"
    >
      <ModalBody className="p-0 gap-0">
        <p className="p3-r text-font-sub_1 mb-[10px]">{courseName}</p>
        <div className="flex flex-col max-h-[490px] overflow-y-auto custom-scroll mb-[40px]">
          {lessons.map((lesson, index) => {
            const isSelected = lesson.id === selectedLessonId;

            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => setSelectedLessonId(lesson.id)}
                className={`flex items-center justify-between px-[12px] py-[16px] transition-all text-left border-b last:border-b-0 ${
                  isSelected ? 'bg-brand_3' : 'bg-white hover:bg-[#FAFAFA]'
                }`}
              >
                <span className="p3-m truncate flex-1">{index + 1}. {lesson.name}</span>

                <div className="flex items-center gap-[24px] shrink-0 ml-[20px]">
                  <span className="p3-r text-font-sub_1 text-right">
                    {lesson.completedSteps}/{lesson.totalSteps}
                  </span>
                  <div className="flex justify-end w-[100px]">
                    {lesson.status === ProgressStatus.Completed ? (
                      <ChipUI color="green" size="xl">
                        {t('STUDY_COMPLETED')}
                      </ChipUI>
                    ) : lesson.status === ProgressStatus.InProgress ? (
                      <ChipUI color="yellow" size="xl">
                        {t('STUDY_IN_PROGRESS')}
                      </ChipUI>
                    ) : (
                      <ChipUI color="gray" size="xl">
                        {t('BEFORE_STUDY')}
                      </ChipUI>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ModalBody>
    </CModalOneButton>
  );
}
