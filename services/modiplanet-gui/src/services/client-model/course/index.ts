import {
  CourseDifficulty,
  ActivityCodingType,
  CourseStateType,
  CourseType,
  CourseProductTargetType,
} from '@services/gen/gen';

export interface CourseCardModel {
  id: string;
  courseGroupId?: string | null;
  courseGroupName?: string | null;
  name: string;
  description: string;
  difficulty: CourseDifficulty;
  codeEditorType: ActivityCodingType;
  lessonCount: number;
}

export interface NextLearningModel {
  courseGroupId?: string | null;
  courseId: string;
  courseName: string;
  totalLessonsInCourse: number;
  lessonId: string;
  lessonName: string;
  lessonIdx: number;
  stepId?: string | null;
  stepName?: string | null;
  stepIdx?: number | null;
  totalStepsInLesson: number;
}

export interface FirstLearningModel {
  courseGroupId?: string | null;
  courseId: string;
  lessonId: string;
  stepId?: string | null;
}

export interface MyCourseItemModel {
  id: string;
  courseGroupId?: string | null;
  courseGroupName?: string | null;
  title: string;
  description: string;
  status: 'not_started' | 'ongoing' | 'complete';
  totalLessons: number;
  completedLessons: number;
  currentLesson: number;
  difficulty: CourseDifficulty | null;
  codeEditorType: ActivityCodingType | null;
  nextLearning?: NextLearningModel | null;
  firstLearning?: FirstLearningModel | null;
}

export interface CourseListItemModel {
  id: string;
  name: string;
  description?: string;
  minParticipant: number;
  maxParticipant: number;
  minAge: number;
  maxAge: number;
  state: CourseStateType;
  recruitmentStartDateTime?: string;
  recruitmentEndDateTime?: string;
  isNew: boolean;
  isEndRecruitment: boolean;
  type: CourseType;
  targetType: CourseProductTargetType;
  codeEditorType?: ActivityCodingType;
  difficulty?: CourseDifficulty;
  lessonCount: number;
  createdAt: string;
  updatedAt: string;
}

export type CourseListModel = CourseListItemModel[];

export interface CourseGroupModel {
  id: string;
  name: string;
  description: string;
  courses: CourseCardModel[];
}

export interface CourseDetailStepModel {
  stepId: string;
  idx: number;
  stepName: string;
  stepDescription?: string | null;
  stepType: string;
  status: string;
  progressRate: number;
}

export interface CourseDetailLessonModel {
  lessonId: string;
  idx: number;
  lessonName: string;
  description?: string | null;
  state: string;
  status: string;
  progressRate: number;
  totalSteps: number;
  completedSteps: number;
  totalTime: number;
  steps: CourseDetailStepModel[];
  nextLearning?: NextLearningModel | null;
}

export interface CourseDetailModel {
  courseId: string;
  name: string;
  description?: string | null;
  difficulty?: CourseDifficulty | null;
  codeEditorType?: ActivityCodingType | null;
  status: string;
  progressRate: number;
  totalLessons: number;
  completedLessons: number;
  completedAt?: string | null;
  totalTime: number;
  educationalPlan?: {
    url: string;
    fileName?: string | null;
    fileSizeInBytes?: number | null;
    extension?: string | null;
  } | null;
  teachingMaterials?: {
    url: string;
    fileName?: string | null;
    fileSizeInBytes?: number | null;
    extension?: string | null;
  } | null;
  lessons: CourseDetailLessonModel[];
}

