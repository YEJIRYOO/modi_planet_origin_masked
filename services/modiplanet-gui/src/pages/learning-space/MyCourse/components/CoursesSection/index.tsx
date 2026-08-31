import { useState, useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
import StatusFilter from './StatusFilter';
import OrderBySelector from './OrderBySelector';
import CourseList from './CourseList';
import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import { useMyCourseConnection } from '@services/api/course/course/useMyCourseConnection';
import { useLearningSpaceErrorHandler } from '@hooks/useLearningSpaceErrorHandler';
import {
  MyCourseProgressFilterStatus,
  CourseConnectionOrderFieldType,
  OrderDirectionType,
} from '@services/gen/gen';

interface CoursesSectionProps {
  onContinueCourse: (
    courseId: string,
    courseGroupId: string,
    nextLearning?: {
      lessonId: string;
      stepId?: string | null;
    } | null,
  ) => void;
  onReviewCourse: (
    courseId: string,
    courseGroupId: string,
    firstLearning?: {
      lessonId: string;
      stepId?: string | null;
    } | null,
  ) => void;
  onCardClick: (courseId: string, courseGroupId: string) => void;
  learningStatus?: {
    enrolledCourseCount: number;
    completedCourseCount: number;
    inProgressCourseCount: number;
  };
}

export default function CoursesSection({
  onContinueCourse,
  onReviewCourse,
  onCardClick,
  learningStatus,
}: CoursesSectionProps) {
  const [currentStatus, setCurrentStatus] = useState<
    'all' | 'ongoing' | 'complete'
  >('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [displayKeyword, setDisplayKeyword] = useState<string>('');

  const debouncedSetSearchKeyword = useCallback(
    debounce((text: string) => {
      setSearchKeyword(text);
      setCurrentPage(0);
    }, 1000),
    [],
  );

  const handleSearchChange = (text: string) => {
    setDisplayKeyword(text);
    debouncedSetSearchKeyword(text);
  };

  const [orderBy, setOrderBy] = useState<CourseConnectionOrderFieldType>(
    CourseConnectionOrderFieldType.LastAccessedAt,
  );
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const statusMap: Record<string, MyCourseProgressFilterStatus | undefined> = {
    all: MyCourseProgressFilterStatus.All,
    ongoing: MyCourseProgressFilterStatus.InProgress,
    complete: MyCourseProgressFilterStatus.Completed,
  };

  const where = useMemo(
    () => ({
      status: statusMap[currentStatus],
      keyword: searchKeyword || undefined,
    }),
    [currentStatus, searchKeyword],
  );

  const order = useMemo(
    () => ({
      field: orderBy,
      direction:
        orderBy === CourseConnectionOrderFieldType.Name
          ? OrderDirectionType.Asc
          : OrderDirectionType.Desc,
    }),
    [orderBy],
  );

  const handleLearningSpaceError = useLearningSpaceErrorHandler();
  const { courses, loading } = useMyCourseConnection({
    first: itemsPerPage,
    offset: currentPage * itemsPerPage,
    where,
    orderBy: order,
    onError: (error) => handleLearningSpaceError(error),
  });

  const counts = {
    all: learningStatus?.enrolledCourseCount ?? 0,
    ongoing: learningStatus?.inProgressCourseCount ?? 0,
    complete: learningStatus?.completedCourseCount ?? 0,
  };

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status as 'all' | 'ongoing' | 'complete');
    setCurrentPage(0); // 상태 변경 시 첫 페이지로 리셋
  };

  const handleOrderByChange = (newOrderBy: CourseConnectionOrderFieldType) => {
    setOrderBy(newOrderBy);
    setCurrentPage(0); // 정렬 변경 시 첫 페이지로 리셋
  };

  const hasNoCourse = (learningStatus?.enrolledCourseCount ?? 0) === 0;

  return (
    <div className="pt-[30px]">
      <StatusFilter
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
        searchKeyword={displayKeyword}
        onSearchChange={handleSearchChange}
        counts={counts}
        hideSearch={hasNoCourse}
      />
      {!hasNoCourse && (
        <OrderBySelector value={orderBy} onChange={handleOrderByChange} />
      )}
      {loading ? (
        <div className="min-h-[300px] flex-center">
          <SpinnerLoader className="w-[80px] h-[80px]" />
        </div>
      ) : (
        <CourseList
          courses={courses}
          onContinueCourse={onContinueCourse}
          onReviewCourse={onReviewCourse}
          onCardClick={onCardClick}
        />
      )}
    </div>
  );
}
