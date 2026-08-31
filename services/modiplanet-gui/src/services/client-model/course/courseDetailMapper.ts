import { ProgressStatus } from '@services/gen/gen';
import type { CourseQuery } from '@services/gen/gen';
import type { CourseDetailModel } from './index';

type CourseRaw = CourseQuery['course'];

export const mapToCourseDetail = (course: CourseRaw): CourseDetailModel => {
  return {
    courseId: course.id,
    name: course.name,
    description: course.description ?? null,
    difficulty: course.difficulty ?? null,
    codeEditorType: course.codeEditorType ?? null,
    status: ProgressStatus.NotStarted,
    progressRate: 0,
    totalLessons: course.lessonCount,
    completedLessons: 0,
    completedAt: null,
    totalTime: 0,
    educationalPlan: course.educationalPlan ?? null,
    teachingMaterials: course.teachingMaterials ?? null,
    lessons: (course.lessons ?? []).map((lesson) => ({
      lessonId: lesson.id,
      idx: lesson.idx,
      lessonName: lesson.name,
      description: lesson.description ?? null,
      state: lesson.state,
      status: ProgressStatus.NotStarted,
      progressRate: 0,
      totalSteps: lesson.steps?.length ?? 0,
      completedSteps: 0,
      totalTime: 0,
      steps: (lesson.steps ?? []).map((s: any) => ({
        stepId: s.step?.id ?? '',
        idx: s.idx,
        stepName: s.step?.name ?? '',
        stepDescription: s.step?.description ?? null,
        stepType: s.step?.dType ?? 'CODING',
        status: ProgressStatus.NotStarted,
        progressRate: 0,
      })),
      nextLearning: null,
    })),
  };
};
