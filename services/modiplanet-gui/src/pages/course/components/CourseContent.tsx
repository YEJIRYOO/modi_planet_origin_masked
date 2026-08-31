import CourseHeader from './CourseHeader';
import CurriculumLessonList from './CurriculumLessonList';
import type { MyCourseDetailQuery } from '@services/gen/gen';

interface CourseContentProps {
  courseId: string;
  course: MyCourseDetailQuery['myCourseDetail'] | null;
  loading: boolean;
}

export default function CourseContent({
  courseId,
  course,
  loading,
}: CourseContentProps) {
  if (loading || !course) {
    return (
      <main className="flex-1 overflow-auto flex flex-col items-center justify-center">
        <img
          src="/assets/loading/spinner-loading.gif"
          alt="Loading..."
          className="w-24 h-24"
        />
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-auto flex flex-col">
      <div className="px-[60px]">
        <div className="w-[1040px] lg:w-[900px] mx-auto pt-[40px] pb-[60px]">
          {/* 상단 배너 영역 */}
          <CourseHeader course={course} />
        </div>
      </div>

      <div className="w-full flex-1 pt-[40px] pb-[60px] bg-form-bg border-t">
        {/* 커리큘럼 리스트 */}
        <div className="px-[60px]">
          <div className="w-[1040px] lg:w-[900px] mx-auto">
            <CurriculumLessonList courseId={courseId} course={course} />
          </div>
        </div>
      </div>
    </main>
  );
}
