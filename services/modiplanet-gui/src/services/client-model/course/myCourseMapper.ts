import { MyCourseConnectionQuery, ProgressStatus } from '@services/gen/gen';
import { MyCourseItemModel } from './index';

type CourseNode = MyCourseConnectionQuery['myCourseConnection']['nodes'][0];

export const mapToMyCourseItems = (
  courses: CourseNode[],
): MyCourseItemModel[] => {
  return courses.map((course) => {
    const myProgress = course.myProgress;
    const displayProgress = myProgress?.displayProgress;
    const status =
      myProgress?.status === ProgressStatus.Completed
        ? 'complete'
        : myProgress?.status === ProgressStatus.NotStarted
          ? 'not_started'
          : 'ongoing';

    const completedLessons = displayProgress?.completedLessons || 0;
    const totalLessons =
      displayProgress?.totalLessons || course.lessonCount;

    const currentLesson = course.nextLearning?.lessonIdx
      ? course.nextLearning.lessonIdx
      : Math.max(1, completedLessons + 1);

    return {
      id: course.id,
      courseGroupId: course.courseGroupId || null,
      courseGroupName: course.courseGroupName || null,
      title: course.name || '',
      description: course.description || '',
      status,
      totalLessons,
      completedLessons,
      currentLesson: Math.max(1, currentLesson),
      difficulty: course.difficulty || null,
      codeEditorType: course.codeEditorType || null,
      nextLearning: course.nextLearning || null,
      firstLearning: course.firstLearning || null,
    };
  });
};
