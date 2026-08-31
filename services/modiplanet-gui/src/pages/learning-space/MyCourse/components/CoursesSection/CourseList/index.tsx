import { useState, useEffect, useRef } from 'react';
import CourseCard from './CourseCard';
import { CustomPagination } from '@components/ui_old/pagination/pagination';
import { MyCourseItemModel } from '@services/client-model/course';
import useTranslator from '@src/components/hooks/useTranslator';

interface CourseListProps {
  courses: MyCourseItemModel[];
  onContinueCourse?: (
    courseId: string,
    courseGroupId: string,
    nextLearning?: {
      lessonId: string;
      stepId?: string | null;
    } | null,
  ) => void;
  onReviewCourse?: (
    courseId: string,
    courseGroupId: string,
    firstLearning?: {
      lessonId: string;
      stepId?: string | null;
    } | null,
  ) => void;
  onCardClick?: (courseId: string, courseGroupId: string) => void;
}

const ITEMS_PER_PAGE = 5;

export default function CourseList({
  courses,
  onContinueCourse,
  onReviewCourse,
  onCardClick,
}: CourseListProps) {
  const [activePage, setActivePage] = useState(1);
  const { t } = useTranslator();
  const listRef = useRef<HTMLDivElement>(null);

  // courses가 변경될 때 (필터 변경 시) 페이지를 1로 초기화
  useEffect(() => {
    setActivePage(1);
  }, [courses]);

  if (courses.length === 0) {
    return (
      <div className="min-h-[293px] flex-col flex-center">
        <img
          src="/assets/error/no-data.svg"
          className="w-[144px] h-[144px] mb-4"
        />
        <p className="p3-r">{t('NO_COURSE_YET')}</p>
      </div>
    );
  }

  // 현재 페이지에 표시할 과정 계산
  const indexOfLastCourse = activePage * ITEMS_PER_PAGE;
  const indexOfFirstCourse = indexOfLastCourse - ITEMS_PER_PAGE;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
    listRef.current?.scrollIntoView({ block: 'nearest' });
  };

  return (
    <div ref={listRef} className="flex flex-col mb-[60px]">
      <div className="flex flex-col items-center gap-4 mb-[40px]">
        {currentCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onContinue={onContinueCourse}
            onReview={onReviewCourse}
            onCardClick={onCardClick}
          />
        ))}
      </div>

      {courses.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center mb-[20px]">
          <CustomPagination
            activePage={activePage}
            itemsCountPerPage={ITEMS_PER_PAGE}
            totalItemsCount={courses.length}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
