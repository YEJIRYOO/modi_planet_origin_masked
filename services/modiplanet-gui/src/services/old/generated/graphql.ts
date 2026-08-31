import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
  _Any: any;
  _FieldSet: any;
};

export type AiModel = {
  __typename?: 'AIModel';
  /** 모델 유형 */
  aiModelCategory: AiModelCategory;
  /** 모델 유형 ID */
  aiModelCategoryId: Scalars['ID'];
  /** 배치 사이즈 */
  batchSize: Scalars['Int'];
  /** 클래스 목록 */
  classifiers: Array<Classifier>;
  /** 에포크 */
  epoch: Scalars['Int'];
  /** 모델 ID */
  id: Scalars['ID'];
  /** 학습률 */
  learningRate: Scalars['Float'];
  /** model.json 파일 경로 */
  modelUrl: Scalars['String'];
  /** 모델명 */
  name: Scalars['String'];
  /** 프로필 ID */
  profileId: Scalars['ID'];
  /** 검증 데이터 비율 */
  validationDataRate: Scalars['Float'];
};

export type AiModelCategoriesWhere = {
  /** 기계학습 유형 */
  machineLearningTypes: Array<MachineLearningType>;
};

/** 모델 유형 (분류: 이미지, 분류: 텍스트, 분류: 소리 등) */
export type AiModelCategory = {
  __typename?: 'AIModelCategory';
  /** 설명 */
  description: Scalars['String'];
  /** 모델 유형 ID */
  id: Scalars['ID'];
  /** 모델 유형 이미지 경로 */
  imageUrl: Scalars['String'];
  /** 기계학습 유형 */
  machineLearningType: MachineLearningType;
  /** 이름 */
  name: Scalars['String'];
  /** 유형 */
  type: AiModelCategoryType;
};

export enum AiModelCategoryType {
  Cluster = 'CLUSTER',
  DecisionTreeClassifier = 'DECISION_TREE_CLASSIFIER',
  ImageClassifier = 'IMAGE_CLASSIFIER',
  LogisticRegressionClassifier = 'LOGISTIC_REGRESSION_CLASSIFIER',
  NumberClassifier = 'NUMBER_CLASSIFIER',
  Regression = 'REGRESSION',
  SpeechClassifier = 'SPEECH_CLASSIFIER',
  SvmClassifier = 'SVM_CLASSIFIER',
  TextClassifier = 'TEXT_CLASSIFIER'
}

export type AiModelCategoryWhere = {
  /** 모델 카테고리 ID */
  id: Scalars['ID'];
};

export type AiModelConnection = {
  __typename?: 'AIModelConnection';
  /** 모델 목록 */
  nodes: Array<AiModel>;
  /** 모델 수 */
  totalCount: Scalars['Int'];
};

export type AiModelConnectionOrder = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<AiModelConnectionOrderFieldType>;
};

export enum AiModelConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type AiModelWhere = {
  /** 모델 ID */
  id: Scalars['ID'];
};

/** 액티비티 코딩 유형 */
export enum ActivityCodingType {
  Moditor = 'MODITOR',
  Python = 'PYTHON'
}

/** 교육자료 학습 내역 (교육자료가 포함된 강의에만 존재) */
export type ActivityHistory = {
  __typename?: 'ActivityHistory';
  /** 학습 내역 목록 */
  activities: Array<ActivityHistoryItem>;
  /** 마지막으로 학습한 액티비티 ID */
  lastActivityID: Scalars['ID'];
  /** 액티비티 학습 진행률 */
  progressRate: Scalars['Int'];
};

export type ActivityHistoryDetail = ActivityPdfHistory | ActivityVodHistory;

/** 액티비티 학습 내역 */
export type ActivityHistoryItem = {
  __typename?: 'ActivityHistoryItem';
  /** 액티비티 ID */
  activityID: Scalars['ID'];
  /** 상세 정보 */
  detail?: Maybe<ActivityHistoryDetail>;
  /** 학습 완료 여부 */
  isCompleted: Scalars['Boolean'];
  /** 액티비티 학습 진행률 */
  progressRate: Scalars['Int'];
};

export type ActivityPdfHistory = {
  __typename?: 'ActivityPDFHistory';
  lastPage: Scalars['Int'];
};

export type ActivityVodHistory = {
  __typename?: 'ActivityVODHistory';
  /** 비디오 재생위치 (초 단위) */
  videoPlaybackPosition: Scalars['Int'];
};

export type AddClassroomLessonInput = {
  id: Scalars['ID'];
  lessonId: Scalars['String'];
  startTime: Scalars['String'];
  startType: ClassroomLessonStartType;
};

export type AddClassroomStudentInput = {
  classroomId: Scalars['String'];
  name: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type AddDataAnalyzerInput = {
  activity?: InputMaybe<DataAnalyzerActivityInput>;
  courseId: Scalars['String'];
  eventTime: Scalars['Int'];
  intervalSeconds: Scalars['Int'];
  isCoding: Scalars['Boolean'];
  isLive: Scalars['Boolean'];
  lessonSeconds: Scalars['Int'];
  lifeEventType: DataAnalyzerLifeEventType;
  scheduleGroupId: Scalars['String'];
  scheduleId: Scalars['String'];
};

/** AddUserProfileInput 프로필 입력 */
export type AddUserProfileInput = {
  avatar?: InputMaybe<ImageInfoInput>;
  birth?: InputMaybe<Scalars['String']>;
  codingTypes?: InputMaybe<Array<CodingType>>;
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  roleType?: InputMaybe<UserRoleType>;
  userId?: InputMaybe<Scalars['String']>;
  val?: InputMaybe<Scalars['Int']>;
};

export type AddedNotificationInput = {
  /** 유저 프로필 아이디 */
  profileId: Scalars['String'];
  /** 확인 여부 */
  state: NotificationState;
  /** 알림 UI */
  uiType: NotificationUiType;
};

export type AppBanner = Node & {
  __typename?: 'AppBanner';
  id: Scalars['ID'];
  idx: Scalars['Int'];
  image: ImageInfo;
  openType: OpenType;
  subTitle: Scalars['String'];
  title: Scalars['String'];
  type: AppBannerType;
};

export type AppBannerConnection = {
  __typename?: 'AppBannerConnection';
  edges: Array<Maybe<AppBannerEdge>>;
  nodes: Array<Maybe<AppBanner>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum AppBannerConnectionField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type AppBannerConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field: AppBannerConnectionField;
};

export type AppBannerConnectionWhere = {
  filter?: InputMaybe<Scalars['String']>;
  openType?: InputMaybe<OpenType>;
  type?: InputMaybe<AppBannerType>;
};

export type AppBannerEdge = {
  __typename?: 'AppBannerEdge';
  cursor: Scalars['String'];
  node: AppBanner;
};

export enum AppBannerType {
  Ads = 'ADS',
  Classroom = 'CLASSROOM',
  Curriculum = 'CURRICULUM',
  Faq = 'FAQ',
  Lesson = 'LESSON',
  Main = 'MAIN',
  Notice = 'NOTICE',
  Quiestion = 'QUIESTION'
}

export type AppBannerWhere = {
  id: Scalars['ID'];
};

export type AppDashboard = {
  __typename?: 'AppDashboard';
  id: Scalars['ID'];
  name: Scalars['String'];
  webUrl: Scalars['String'];
};

export type AppFirmware = {
  __typename?: 'AppFirmware';
  name: Scalars['String'];
  version: Scalars['String'];
};

export type AppFirmwareVersion = {
  __typename?: 'AppFirmwareVersion';
  downloadURL: Scalars['String'];
  firmwares: Array<AppFirmware>;
};

export type AppGuide = {
  __typename?: 'AppGuide';
  brickpack: Array<AppGuideContent>;
  coding: Array<AppGuideContent>;
  freeCoding: Array<AppGuideContent>;
  main: Array<AppGuideContent>;
  project: Array<AppGuideContent>;
  uploadCodingTip: AppGuideContent;
};

export type AppGuideContent = {
  __typename?: 'AppGuideContent';
  image: ImageInfo;
};

export type AppGuideLanguage = {
  __typename?: 'AppGuideLanguage';
  cn: AppGuide;
  de: AppGuide;
  en: AppGuide;
  jp: AppGuide;
  ko: AppGuide;
  pl: AppGuide;
};

export type AppInit = {
  __typename?: 'AppInit';
  bgAudioUrls: Array<Scalars['String']>;
  codingBlocklyUrl: Scalars['String'];
  codingUrl: Scalars['String'];
  guideLanguage: AppGuideLanguage;
};

export type AppInitWhere = {
  serviceType?: InputMaybe<AppServiceType>;
};

export enum AppOsType {
  Android = 'ANDROID',
  Firmware = 'FIRMWARE',
  Ios = 'IOS'
}

export enum AppServiceType {
  CodeSketch = 'CODE_SKETCH',
  CodeSketchPlus = 'CODE_SKETCH_PLUS',
  Letsmodi = 'LETSMODI',
  ModiPlayPlus = 'MODI_PLAY_PLUS'
}

export type AppVersion = {
  __typename?: 'AppVersion';
  comment: Scalars['String'];
  downloadURL: Scalars['String'];
  isForceUpdate: Scalars['Boolean'];
  isUpdate: Scalars['Boolean'];
  version: Scalars['String'];
};

export type AppVersionWhere = {
  os: AppOsType;
  serviceType?: InputMaybe<AppServiceType>;
  version: Scalars['String'];
};

/** 쿠폰 적용 입력 */
export type ApplyMarketingCouponInput = {
  /** 쿠폰 코드 */
  code: Scalars['String'];
};

export type ApproveCourseApplicationInput = {
  /** 신청 ID */
  id: Scalars['ID'];
};

export type Attendance = {
  __typename?: 'Attendance';
  /** 차시 */
  idx: Scalars['Int'];
  /** 누적 학습시간 (분 단위) */
  runningTime: Scalars['Int'];
  /** 스케줄 ID */
  scheduleId: Scalars['String'];
  /** 출결 상태 */
  status: CourseAttendanceType;
};

/** 출결 정보 */
export type AttendanceResult = {
  __typename?: 'AttendanceResult';
  /** 출결 정보 */
  attendances: Array<Attendance>;
  /** 유저 프로필 ID */
  profileId: Scalars['String'];
  /** 스케줄 그룹 ID */
  scheduleGroupId: Scalars['String'];
  /**
   * 유저 ID
   * @deprecated userId is deprecated.
   */
  userId: Scalars['String'];
};

export type AutoCreateQuestionInput = {
  /** 난이도 */
  difficulty: QuizQuestionDifficultyType;
  /** 언어 */
  language: QuizQuestionLanguageType;
  /** 생성할 문제 개수 */
  numItems: Scalars['Int'];
  /** 학습 대상 */
  target: QuizQuestionTargetType;
};

/** AvailableUserEmailWhere 이메일 조회 */
export type AvailableUserEmailWhere = {
  email: Scalars['String'];
};

export type BoardCode = {
  __typename?: 'BoardCode';
  code: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
};

export type BoardCodeConnection = {
  __typename?: 'BoardCodeConnection';
  description?: Maybe<Scalars['String']>;
  groupCode: Scalars['Int'];
  groupName?: Maybe<Scalars['String']>;
  nodes?: Maybe<Array<BoardCode>>;
};

export type BoardCodeConnectionWhere = {
  code: Scalars['Int'];
  langType: LangType;
};

export enum BoardContentType {
  Data = 'DATA',
  Faq = 'FAQ',
  Notice = 'NOTICE'
}

export type BoardData = {
  __typename?: 'BoardData';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  cursorInfo: CursorInfo;
  dataByLanguages: Array<BoardDataByLanguage>;
  files: Array<Maybe<BoardFile>>;
  id: Scalars['String'];
  isNew: Scalars['Boolean'];
  isView: Scalars['Boolean'];
  /** @deprecated Use `dataByLanguages`. */
  languages: Array<BoardDataLanguage>;
  serviceType: ServiceType;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type BoardDataByLanguage = {
  __typename?: 'BoardDataByLanguage';
  content: Scalars['String'];
  files: Array<Maybe<BoardFile>>;
  langType: LangType;
  title: Scalars['String'];
};

export type BoardDataByLanguageInput = {
  content: Scalars['String'];
  files: Array<InputMaybe<FileInput>>;
  langType: LangType;
  title: Scalars['String'];
};

export type BoardDataConnection = {
  __typename?: 'BoardDataConnection';
  nodes: Array<Maybe<BoardData>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum BoardDataConnectionFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type BoardDataConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field?: InputMaybe<BoardDataConnectionFieldType>;
};

export type BoardDataConnectionWhere = {
  field?: InputMaybe<Scalars['String']>;
  keyword?: InputMaybe<Scalars['String']>;
  serviceType: ServiceType;
};

export type BoardDataLanguage = {
  __typename?: 'BoardDataLanguage';
  content: Scalars['String'];
  langType: LangType;
  title: Scalars['String'];
};

export type BoardDataLanguageInput = {
  content: Scalars['String'];
  langType: LangType;
  title: Scalars['String'];
};

export type BoardDataWhere = {
  id: Scalars['ID'];
  langType: LangType;
};

export type BoardFaq = {
  __typename?: 'BoardFaq';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  faqCode: Scalars['Int'];
  faqCodeName: Scalars['String'];
  id: Scalars['String'];
  isView: Scalars['Boolean'];
  languages: Array<BoardFaqLanguage>;
  serviceType: ServiceType;
  title: Scalars['String'];
};

export type BoardFaqConnection = {
  __typename?: 'BoardFaqConnection';
  nodes: Array<BoardFaq>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum BoardFaqConnectionFieldType {
  Id = 'ID'
}

export type BoardFaqConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field?: InputMaybe<BoardFaqConnectionFieldType>;
};

export type BoardFaqConnectionWhere = {
  faqCode?: InputMaybe<Scalars['Int']>;
  field?: InputMaybe<Scalars['String']>;
  keyword?: InputMaybe<Scalars['String']>;
  serviceType: ServiceType;
};

export type BoardFaqLanguage = {
  __typename?: 'BoardFaqLanguage';
  content: Scalars['String'];
  langType: LangType;
  title: Scalars['String'];
};

export type BoardFaqLanguageInput = {
  content: Scalars['String'];
  langType: LangType;
  title: Scalars['String'];
};

export type BoardFaqWhere = {
  id: Scalars['ID'];
  langType: LangType;
};

export type BoardFile = {
  __typename?: 'BoardFile';
  contentId: Scalars['ID'];
  contentType: BoardContentType;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  langType: LangType;
  name: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type BoardImage = {
  __typename?: 'BoardImage';
  contentId: Scalars['ID'];
  contentType: BoardImageContentType;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  idx: Scalars['Int'];
  imageKey: Scalars['String'];
  imageUrl: Scalars['String'];
};

export enum BoardImageContentType {
  Contact = 'CONTACT',
  Faq = 'FAQ',
  Notice = 'NOTICE'
}

export type BoardNotice = {
  __typename?: 'BoardNotice';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  cursorInfo: CursorInfo;
  dataByLanguages: Array<BoardDataByLanguage>;
  files: Array<Maybe<BoardFile>>;
  id: Scalars['String'];
  images?: Maybe<Array<BoardImage>>;
  isNew: Scalars['Boolean'];
  isTop: Scalars['Boolean'];
  isView: Scalars['Boolean'];
  /** @deprecated Use `dataByLanguages`. */
  languages: Array<BoardNoticeLanguage>;
  serviceType: ServiceType;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type BoardNoticeConnection = {
  __typename?: 'BoardNoticeConnection';
  nodes: Array<BoardNotice>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum BoardNoticeConnectionFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type BoardNoticeConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field?: InputMaybe<BoardNoticeConnectionFieldType>;
};

export type BoardNoticeConnectionWhere = {
  field?: InputMaybe<Scalars['String']>;
  keyword?: InputMaybe<Scalars['String']>;
  serviceType: ServiceType;
};

export type BoardNoticeLanguage = {
  __typename?: 'BoardNoticeLanguage';
  content: Scalars['String'];
  langType: LangType;
  title: Scalars['String'];
};

export type BoardNoticeLanguageInput = {
  content: Scalars['String'];
  langType: LangType;
  title: Scalars['String'];
};

export type BoardNoticeWhere = {
  id: Scalars['ID'];
  langType: LangType;
};

export enum BookmarkServiceType {
  Curriculum = 'CURRICULUM',
  Lesson = 'LESSON'
}

export type ButtonInfo = {
  __typename?: 'ButtonInfo';
  idx: Scalars['Int'];
  image: ImageInfo;
  linkUrl: Scalars['String'];
  title: Scalars['String'];
};

export type CancelCourseApplicationInput = {
  /** 신청 ID */
  id: Scalars['ID'];
};

export type Classifier = {
  /** 클래스 아이디 */
  id: Scalars['ID'];
  /** 라벨명 */
  label: Scalars['String'];
};

export type Classroom = Node & {
  __typename?: 'Classroom';
  activity: ClassroomActivity;
  cLesson: Scalars['Int'];
  cLessonDoing: Scalars['Int'];
  createdAt: Scalars['String'];
  gradeType: ClassroomGradeType;
  id: Scalars['ID'];
  idx: Scalars['Int'];
  mainImg: ImageInfo;
  openType: ClassroomOpenType;
  ownerId: Scalars['ID'];
  ownerName: Scalars['String'];
  summary: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ClassroomActivity = {
  __typename?: 'ClassroomActivity';
  cAlarm: Scalars['Int'];
  cStudent: Scalars['Int'];
};

export type ClassroomConnection = {
  __typename?: 'ClassroomConnection';
  edges: Array<Maybe<ClassroomEdge>>;
  nodes: Array<Maybe<Classroom>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum ClassroomConnectionField {
  Id = 'ID'
}

export type ClassroomConnectionOrder = {
  direction?: InputMaybe<OrderDirection>;
  field: ClassroomConnectionField;
};

export type ClassroomConnectionWhere = {
  filter?: InputMaybe<Scalars['String']>;
  openType?: InputMaybe<ClassroomOpenType>;
};

export type ClassroomEdge = {
  __typename?: 'ClassroomEdge';
  cursor: Scalars['String'];
  node: Classroom;
};

export enum ClassroomGradeType {
  Element_1Grade = 'ELEMENT_1_GRADE',
  Element_2Grade = 'ELEMENT_2_GRADE',
  Element_3Grade = 'ELEMENT_3_GRADE',
  Element_4Grade = 'ELEMENT_4_GRADE',
  Element_5Grade = 'ELEMENT_5_GRADE',
  Element_6Grade = 'ELEMENT_6_GRADE',
  Middle_1Grade = 'MIDDLE_1_GRADE',
  Middle_2Grade = 'MIDDLE_2_GRADE',
  Middle_3Grade = 'MIDDLE_3_GRADE',
  NormalGrade = 'NORMAL_GRADE',
  PreSchoolerGrade = 'PRE_SCHOOLER_GRADE'
}

export type ClassroomHomework = Node & {
  __typename?: 'ClassroomHomework';
  classroomId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  expireDate: Scalars['String'];
  id: Scalars['ID'];
  isSubmission: Scalars['Boolean'];
  lessonId: Scalars['String'];
  lessonName: Scalars['String'];
  progress: LessonProgress;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
  userName: Scalars['String'];
};

export type ClassroomHomeworkConnection = {
  __typename?: 'ClassroomHomeworkConnection';
  edges: Array<Maybe<ClassroomHomeworkEdge>>;
  nodes: Array<Maybe<ClassroomHomework>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum ClassroomHomeworkConnectionField {
  Id = 'ID'
}

export type ClassroomHomeworkConnectionOrder = {
  direction?: InputMaybe<OrderDirection>;
  field: ClassroomHomeworkConnectionField;
};

export type ClassroomHomeworkConnectionWhere = {
  classroomId: Scalars['String'];
};

export type ClassroomHomeworkEdge = {
  __typename?: 'ClassroomHomeworkEdge';
  cursor: Scalars['String'];
  node: ClassroomHomework;
};

export type ClassroomHomeworkGroup = {
  __typename?: 'ClassroomHomeworkGroup';
  date: Scalars['String'];
  nodes: Array<Maybe<ClassroomHomework>>;
};

export type ClassroomHomeworkGroupConnection = {
  __typename?: 'ClassroomHomeworkGroupConnection';
  group: Array<Maybe<ClassroomHomeworkGroup>>;
};

export type ClassroomHomeworkGroupConnectionOrder = {
  direction?: InputMaybe<OrderDirection>;
};

export type ClassroomHomeworkGroupConnectionWhere = {
  classroomId: Scalars['String'];
};

export type ClassroomHomeworkWhere = {
  classroomId: Scalars['String'];
  id: Scalars['ID'];
};

export type ClassroomImage = Node & {
  __typename?: 'ClassroomImage';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type ClassroomImageConnection = {
  __typename?: 'ClassroomImageConnection';
  edges: Array<Maybe<ClassroomImageEdge>>;
  nodes: Array<Maybe<ClassroomImage>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ClassroomImageEdge = {
  __typename?: 'ClassroomImageEdge';
  cursor: Scalars['String'];
  node: ClassroomImage;
};

export type ClassroomLessonConnection = {
  __typename?: 'ClassroomLessonConnection';
  edges: Array<Maybe<ClassroomLessonEdge>>;
  nodes: Array<Scalars['String']>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum ClassroomLessonConnectionField {
  Id = 'ID'
}

export type ClassroomLessonConnectionOrder = {
  direction?: InputMaybe<OrderDirection>;
  field: ClassroomLessonConnectionField;
};

export type ClassroomLessonConnectionWhere = {
  classroomId: Scalars['String'];
};

export type ClassroomLessonEdge = {
  __typename?: 'ClassroomLessonEdge';
  cursor: Scalars['String'];
  node: Scalars['String'];
};

export enum ClassroomLessonStartType {
  FiveDaysPreOpen = 'FIVE_DAYS_PRE_OPEN',
  FourDaysPreOpen = 'FOUR_DAYS_PRE_OPEN',
  None = 'NONE',
  OneDayPreOpen = 'ONE_DAY_PRE_OPEN',
  Private = 'PRIVATE',
  SixDaysPreOpen = 'SIX_DAYS_PRE_OPEN',
  ThreeDaysPreOpen = 'THREE_DAYS_PRE_OPEN',
  TwoDaysPreOpen = 'TWO_DAYS_PRE_OPEN'
}

export enum ClassroomLessonStatus {
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type ClassroomLogin = {
  __typename?: 'ClassroomLogin';
  classroomId: Scalars['String'];
  expireTime: Scalars['String'];
  isUpdatePassword: Scalars['Boolean'];
  name: Scalars['String'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type ClassroomNotice = Node & {
  __typename?: 'ClassroomNotice';
  classroomId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ClassroomNoticeConnection = {
  __typename?: 'ClassroomNoticeConnection';
  edges: Array<Maybe<ClassroomNoticeEdge>>;
  nodes: Array<Maybe<ClassroomNotice>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum ClassroomNoticeConnectionField {
  Id = 'ID'
}

export type ClassroomNoticeConnectionOrder = {
  direction?: InputMaybe<OrderDirection>;
  field: ClassroomNoticeConnectionField;
};

export type ClassroomNoticeConnectionWhere = {
  classroomId: Scalars['String'];
  filter?: InputMaybe<Scalars['String']>;
};

export type ClassroomNoticeEdge = {
  __typename?: 'ClassroomNoticeEdge';
  cursor: Scalars['String'];
  node: ClassroomNotice;
};

export enum ClassroomNoticePositionType {
  Main = 'MAIN',
  None = 'NONE'
}

export enum ClassroomNoticeType {
  Homework = 'HOMEWORK',
  None = 'NONE'
}

export type ClassroomNoticeWhere = {
  classroomId: Scalars['String'];
  id: Scalars['ID'];
};

export enum ClassroomOpenType {
  All = 'ALL',
  Close = 'CLOSE',
  Open = 'OPEN'
}

export type ClassroomStudent = Node & {
  __typename?: 'ClassroomStudent';
  cAttendance: Scalars['Int'];
  classroomId: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  lastAccessTime: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  shortWord: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type ClassroomStudentConnection = {
  __typename?: 'ClassroomStudentConnection';
  edges: Array<Maybe<ClassroomStudentEdge>>;
  nodes: Array<ClassroomStudent>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum ClassroomStudentConnectionField {
  Id = 'ID'
}

export type ClassroomStudentConnectionOrder = {
  direction?: InputMaybe<OrderDirection>;
  field: ClassroomStudentConnectionField;
};

export type ClassroomStudentConnectionWhere = {
  classroomId: Scalars['String'];
};

export type ClassroomStudentEdge = {
  __typename?: 'ClassroomStudentEdge';
  cursor: Scalars['String'];
  node: ClassroomStudent;
};

export type ClassroomStudentHomework = Node & {
  __typename?: 'ClassroomStudentHomework';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  fie: Scalars['String'];
  homeworkId: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
  userName: Scalars['String'];
};

export type ClassroomStudentHomeworkConnection = {
  __typename?: 'ClassroomStudentHomeworkConnection';
  edges: Array<Maybe<ClassroomStudentHomeworkEdge>>;
  nodes: Array<Maybe<ClassroomStudentHomework>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ClassroomStudentHomeworkEdge = {
  __typename?: 'ClassroomStudentHomeworkEdge';
  cursor: Scalars['String'];
  node: ClassroomStudentHomework;
};

export type ClassroomStudentLessonDashboard = Node & {
  __typename?: 'ClassroomStudentLessonDashboard';
  classroomId: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  learningTime: Scalars['String'];
  lessonId: Scalars['String'];
  lessonName: Scalars['String'];
  progress: LessonProgress;
  status: ClassroomLessonStatus;
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
  userName: Scalars['String'];
  works: Array<Maybe<ClassroomWork>>;
};

export type ClassroomStudentLessonDashboardConnection = {
  __typename?: 'ClassroomStudentLessonDashboardConnection';
  edges: Array<Maybe<ClassroomStudentLessonDashboardEdge>>;
  nodes: Array<Maybe<ClassroomStudentLessonDashboard>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum ClassroomStudentLessonDashboardConnectionField {
  Id = 'ID'
}

export type ClassroomStudentLessonDashboardConnectionOrder = {
  direction?: InputMaybe<OrderDirection>;
  field: ClassroomStudentLessonDashboardConnectionField;
};

export type ClassroomStudentLessonDashboardConnectionWhere = {
  classroomId: Scalars['String'];
  lessonId: Scalars['String'];
};

export type ClassroomStudentLessonDashboardEdge = {
  __typename?: 'ClassroomStudentLessonDashboardEdge';
  cursor: Scalars['String'];
  node: ClassroomStudentLessonDashboard;
};

export type ClassroomStudentWhere = {
  classroomId: Scalars['String'];
  userId: Scalars['String'];
};

export type ClassroomWhere = {
  id: Scalars['ID'];
};

export type ClassroomWork = Node & {
  __typename?: 'ClassroomWork';
  classroomId: Scalars['String'];
  code: Scalars['String'];
  contentId: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  lessonId: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export enum CodingType {
  AppInventor = 'APP_INVENTOR',
  Entry = 'ENTRY',
  Etc = 'ETC',
  None = 'NONE',
  Python = 'PYTHON',
  Scratch = 'SCRATCH'
}

/** 주문 결제 완료 */
export type CompleteOrderPaymentInput = {
  /** 결제완료 번호 */
  impCode: Scalars['String'];
  /** 주문코드 */
  orderId: Scalars['String'];
};

/** [관리자] 주문요청(취소, 반품, 제품회수, 교환)등 완료 입력값 */
export type CompleteOrderRequestInput = {
  /** 고객 수수료 비용 */
  customerChargeFee: MoneyInput;
  /** 주문 코드 */
  orderId: Scalars['String'];
  /** 환불 코드 */
  orderRefundId: Scalars['String'];
};

export type ConfirmActivityVodItemInput = {
  activityId: Scalars['ID'];
  activityVodItemId: Scalars['ID'];
};

/** 인증 문자 확인 */
export type ConfirmUserAuthFromSmsInput = {
  authCode: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
};

/** Modi 등록 or 수정 인풋 */
export type ConnectModiInput = {
  /** 펌웨어 버전 */
  appVersion: Scalars['String'];
  /** 위치 정보 */
  location: GeoLocationInput;
  /** 부트로더 버전 */
  osVersion: Scalars['String'];
  /** 하드웨어 버전 */
  productVersionType: ModiProductVersionType;
  /** 유형 */
  type: ModiType;
  /** 기기 고유 ID (unique) */
  uuid: Scalars['String'];
};

/** 언어 정보 */
export type ContentLanguage = {
  __typename?: 'ContentLanguage';
  /** 국가 코드 */
  code: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 언어 ID */
  id: Scalars['ID'];
  /** ISO 숫자 */
  isoNumber?: Maybe<Scalars['Int']>;
  /** 한글명 */
  name: Scalars['String'];
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 언어 커넥션 정보 */
export type ContentLanguageConnection = {
  __typename?: 'ContentLanguageConnection';
  /** 언어 목록 */
  nodes: Array<ContentLanguage>;
  /** 언어 수 */
  totalCount: Scalars['Int'];
};

/** 언어 목록 정렬 조건 */
export type ContentLanguageConnectionOrder = {
  /** 정렬 방향 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 정렬 항목 */
  field?: InputMaybe<ContentLanguageConnectionOrderFieldType>;
};

/** 언어 정렬 필드 유형 */
export enum ContentLanguageConnectionOrderFieldType {
  /** 생성일 */
  CreatedAt = 'CREATED_AT',
  /** 언어 ID */
  Id = 'ID'
}

/** 언어 목록 조회 조건 */
export type ContentLanguageConnectionWhere = {
  /** 키워드 (한글명, 국가코드) */
  keyword?: InputMaybe<Scalars['String']>;
};

/** 언어 조회 조건 */
export type ContentLanguageWhere = {
  /** 국가코드 */
  code?: InputMaybe<Scalars['String']>;
  /** 언어 ID */
  languageId?: InputMaybe<Scalars['String']>;
};

/** 컨텐츠 제공 업체 유형 */
export enum ContentProvderType {
  Luxrobo = 'LUXROBO',
  Youtube = 'YOUTUBE'
}

/** 컨텐츠 제공 업체 유형 */
export enum ContentProviderType {
  Luxrobo = 'LUXROBO',
  Youtube = 'YOUTUBE'
}

/** 비디오 정보 */
export type ContentVideo = {
  __typename?: 'ContentVideo';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 재생 시간 */
  durationInSec: Scalars['Int'];
  /** 비디오 ID */
  id: Scalars['ID'];
  /** job 고유 아이디 (s3 업로드를 통한 미디어컨버터가 동작할때 생성되는 아이디로 Optional 값이다) */
  jobId?: Maybe<Scalars['String']>;
  /** 언어 유형 */
  language?: Maybe<ContentLanguage>;
  /** 파일명 */
  name: Scalars['String'];
  /** 제공 업체 */
  providerType: ContentProviderType;
  /** raw 데이터 */
  raw?: Maybe<Scalars['String']>;
  /** 작업 상태 */
  statusType: ContentVideoStatusType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** 비디오 스트리밍 주소 */
  url?: Maybe<Scalars['String']>;
};

/** 비디오 커넥션 정보 */
export type ContentVideoConnection = {
  __typename?: 'ContentVideoConnection';
  /** 비디오 목록 */
  nodes: Array<ContentVideo>;
  /** 비디오 수 */
  totalCount: Scalars['Int'];
};

/** 비디오 목록 정렬 조건 */
export type ContentVideoConnectionOrder = {
  /** 정렬 방향 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 정렬 항목 */
  field?: InputMaybe<ContentVideoConnectionOrderFieldType>;
};

/** 비디오 정렬 필드 유형 */
export enum ContentVideoConnectionOrderFieldType {
  /** 생성일 */
  CreatedAt = 'CREATED_AT',
  /** 비디오 ID */
  Id = 'ID'
}

/** 비디오 목록 조회 조건 */
export type ContentVideoConnectionWhere = {
  /** 키워드 (파일명) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 제공 업체 */
  providerType?: InputMaybe<ContentProviderType>;
  /** 작업 상태 목록 */
  statusTypes?: InputMaybe<Array<ContentVideoStatusType>>;
};

/** 비디오 처리 상태 유형 */
export enum ContentVideoStatusType {
  /** 처리완료 */
  Complete = 'COMPLETE',
  /** 처리중 */
  Progressing = 'PROGRESSING'
}

/** 비디오 조회 조건 */
export type ContentVideoWhere = {
  /** 비디오 ID */
  videoId: Scalars['String'];
};

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type CoordinateInput = {
  x: Scalars['Float'];
  y: Scalars['Float'];
};

/** 코스 정보 */
export type Course = {
  __typename?: 'Course';
  /** 유의사항 */
  caution?: Maybe<Scalars['String']>;
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 특징 */
  feature?: Maybe<Scalars['String']>;
  /** 코스 ID */
  id: Scalars['ID'];
  /** 이미지 경로 */
  images: Array<CourseImage>;
  /** 모집 마감 유무 */
  isEndRecruitment: Scalars['Boolean'];
  /** 새로운 상품 유무 (상품생성일 30일 이전 true, 이후 false */
  isNew: Scalars['Boolean'];
  /** 할인 유무 (할인중 true, 아닐경우 false) */
  isSale: Scalars['Boolean'];
  /** 레슨 목록 */
  lessons: Array<CourseLesson>;
  /** 수강 최대연령 */
  maxAge: Scalars['Int'];
  /** 최대 참여자수 */
  maxParticipant: Scalars['Int'];
  /** 연계 상품 */
  merchandises: Array<CourseMerchandise>;
  /** 수강 최소연령 */
  minAge: Scalars['Int'];
  /** 최소 참여자수 */
  minParticipant: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** 가격 */
  price: Scalars['Int'];
  /** 프로모션 */
  promotion?: Maybe<CourseMarketingPromotion>;
  /** 모집 종료일 */
  recruitmentEndDateTime?: Maybe<Scalars['String']>;
  /** 모집 시작일 */
  recruitmentStartDateTime?: Maybe<Scalars['String']>;
  /** 모집 대상 */
  recruitmentTarget?: Maybe<Scalars['String']>;
  /** 필수 준비물 */
  requiredPreparation?: Maybe<Scalars['String']>;
  /** 스케줄 그룹 */
  scheduleGroups: Array<CourseScheduleGroup>;
  /** 상태 */
  state: CourseProductStateType;
  /** 태그 */
  tags: Array<CourseTag>;
  /** 타겟 유형 (일반, 튜터, 모디 교육자 등) */
  targetType: CourseProductTargetType;
  /** 교육 유형 (교육자주도학습, 자기주도학습) */
  type: CourseType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /**
   * 유저 ID
   * @deprecated userId is deprecated.
   */
  userId: Scalars['String'];
};

/** 액티비티 */
export type CourseActivity = {
  /** 액티비티 학습 내역 */
  activityHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseActivityDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 액티비티 고유 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseActivityCoding = CourseActivity & {
  __typename?: 'CourseActivityCoding';
  /** 액티비티 학습 내역 */
  activityHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 저자 */
  author: Scalars['String'];
  /** coding 상세정보 */
  coding: CourseActivityCodingDetail;
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseActivityDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 액티비티 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseActivityCodingDetail = {
  __typename?: 'CourseActivityCodingDetail';
  /** 정답 코드 */
  answerCode: Scalars['String'];
  /** 유형 (MODITOR, PTYHON) */
  codingType: ActivityCodingType;
  /** 액티비티 Coding ID */
  id: Scalars['ID'];
  /** 초기 코드 */
  initCode?: Maybe<Scalars['String']>;
};

/** 액티비티 목록 */
export type CourseActivityConnection = {
  __typename?: 'CourseActivityConnection';
  /** 액티비티 리스트 (교육자료) */
  nodes: Array<CourseActivity>;
  /** 총 액티비티 수 */
  totalCount: Scalars['Int'];
};

export type CourseActivityConnectionOrder = {
  /** 차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<CourseActivityConnectionOrderFieldType>;
};

export enum CourseActivityConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type CourseActivityConnectionWhere = {
  /** 키워드 (이름, 설명, 저자) */
  keyword?: InputMaybe<Scalars['String']>;
};

/** 액티비티 유형 */
export enum CourseActivityDType {
  Coding = 'CODING',
  Pdf = 'PDF',
  Quiz = 'QUIZ',
  TextBook = 'TEXT_BOOK',
  Vod = 'VOD'
}

export type CourseActivityPdf = CourseActivity & {
  __typename?: 'CourseActivityPdf';
  /** 액티비티 학습 내역 */
  activityHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseActivityDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 액티비티 고유 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** pdf 상세정보 */
  pdf: CourseActivityPdfDetail;
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseActivityPdfDetail = {
  __typename?: 'CourseActivityPdfDetail';
  /** 액티비티 Coding 고유 ID */
  id: Scalars['ID'];
  /** pdf 페이지 총 수 */
  totalCount: Scalars['Int'];
  /** pdf 경로 */
  url: Scalars['String'];
};

export type CourseActivityQuiz = CourseActivity & {
  __typename?: 'CourseActivityQuiz';
  /** 액티비티 학습 내역 */
  activityHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseActivityDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 액티비티 고유 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** 퀴즈 */
  quiz: CourseQuiz;
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseActivitySupplementaryDataWhere = {
  /** 액티비티 보조자료 ID */
  id: Scalars['ID'];
};

export type CourseActivityTextBook = CourseActivity & {
  __typename?: 'CourseActivityTextBook';
  /** 액티비티 학습 내역 */
  activityHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseActivityDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 액티비티 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** TextBook 상세정보 */
  textBook: CourseActivityTextBookDetail;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseActivityTextBookDetail = {
  __typename?: 'CourseActivityTextBookDetail';
  /** 내용 */
  content: Scalars['String'];
  /** 액티비티 TextBook ID */
  id: Scalars['ID'];
};

export type CourseActivityVod = CourseActivity & {
  __typename?: 'CourseActivityVod';
  /** 액티비티 학습 내역 */
  activityHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseActivityDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 액티비티 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 아이템 목록 */
  items: Array<CourseVodItem>;
  /** 이름 */
  name: Scalars['String'];
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** vod 상세정보 */
  vod: CourseActivityVodDetail;
};

export type CourseActivityVodDetail = {
  __typename?: 'CourseActivityVodDetail';
  /** 전체 시간 (초 단위) */
  durationInSec: Scalars['Int'];
  /** 액티비티 VOD ID */
  id: Scalars['ID'];
  /** 제공업체 유형 */
  providerType: ContentProviderType;
  /** 경로 */
  url: Scalars['String'];
};

export type CourseActivityWhere = {
  /** 액티비티 ID */
  id: Scalars['ID'];
};

/** 신청서 (외부강사양성과정, 외부강사등록 등) */
export type CourseApplication = {
  __typename?: 'CourseApplication';
  /** 주소 */
  addr?: Maybe<Scalars['String']>;
  /** 상세 주소 */
  addrDetail?: Maybe<Scalars['String']>;
  /** 생년월일 (ex. 1990-12-25) */
  birthdate?: Maybe<Scalars['String']>;
  /** 이메일 */
  email?: Maybe<Scalars['String']>;
  /** 신청 ID */
  id: Scalars['ID'];
  /** 이름 */
  name?: Maybe<Scalars['String']>;
  /** 연락처 (ex. 010-9100-1476) */
  phone?: Maybe<Scalars['String']>;
  /** 프로필 아이디 */
  profileId: Scalars['String'];
  /** 원본 데이터 */
  raw: Scalars['String'];
  /** 상태 */
  status: CourseApplicationStatusType;
  /** 우편번호 */
  zipCode?: Maybe<Scalars['String']>;
};

/** 신청서 목록 */
export type CourseApplicationConnection = {
  __typename?: 'CourseApplicationConnection';
  /** 신청서 리스트 */
  nodes: Array<CourseApplication>;
  /** 총 신청수 */
  totalCount: Scalars['Int'];
};

export type CourseApplicationConnectionOrder = {
  /** 차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<CourseApplicationConnectionOrderFieldType>;
};

export enum CourseApplicationConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type CourseApplicationConnectionWhere = {
  /** 키워드 (이름, 이메일, 전화번호, 주소) */
  keyword?: InputMaybe<Scalars['String']>;
};

export type CourseApplicationInput = {
  /** 주소 */
  addr?: InputMaybe<Scalars['String']>;
  /** 상세 주소 */
  addrDetail?: InputMaybe<Scalars['String']>;
  /** 생년월일 (ex. 1990-12-25) */
  birthdate?: InputMaybe<Scalars['String']>;
  /** 이메일 */
  email?: InputMaybe<Scalars['String']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 연락처 (ex. 010-9100-1476) */
  phone?: InputMaybe<Scalars['String']>;
  /** 프로필 아이디 */
  profileId: Scalars['String'];
  /** 원본 데이터 */
  raw: Scalars['String'];
  /** 우편번호 */
  zipCode?: InputMaybe<Scalars['String']>;
};

/** 신청 상태 */
export enum CourseApplicationStatusType {
  /** 승인 */
  Approved = 'APPROVED',
  /** 취소 */
  Canceled = 'CANCELED',
  /** 요청 */
  Request = 'REQUEST'
}

export type CourseApplicationWhere = {
  /** 신청 ID */
  id: Scalars['ID'];
};

export type CourseAtomicProductListInput = {
  /** 프로덕트 ID 목록 */
  productIDs?: InputMaybe<Array<Scalars['String']>>;
};

/** 출결 정보 (학생일때만 사용되는 필드) */
export type CourseAttendance = {
  __typename?: 'CourseAttendance';
  /** 학습 진행률 */
  progressRate: Scalars['Int'];
  /** 출결상태 */
  status: CourseAttendanceType;
};

export type CourseAttendanceResultWhere = {
  /** 스케줄 그룹 ID */
  scheduleGroupId: Scalars['String'];
};

export enum CourseAttendanceType {
  /** 결석 - 입장하지 않은 경우 */
  Absence = 'ABSENCE',
  /** 출석 - 설정된 수업 시작 후 5분 내 입장, 설정된 러닝타임 50%이상 참여 */
  Attendance = 'ATTENDANCE',
  /** 이탈 - 입장 후 러닝타임 50% 이하 참여,중도 이탈하여 재입장하지 않는 경우 */
  BreakAway = 'BREAK_AWAY',
  /** 지각 - 설정된 수업 시간 후 5분 이후 입장, 설정된 러닝타임 50%이상 참여 */
  Lateness = 'LATENESS',
  /** 출결 처리중 - 조건에 충족하지 않는 변수에 노출 됨 */
  Pending = 'PENDING',
  /** 수업 시작 전 */
  Ready = 'READY'
}

export type CourseAttendanceWhere = {
  /** 프로필 아이디 (관리자일 경우 profileId 입력) */
  profileId?: InputMaybe<Scalars['String']>;
  /** 스케줄 아이디 */
  scheduleId: Scalars['Int'];
};

export type CourseCancelReservationOpenRoomInput = {
  /** 방 아이디 */
  roomId: Scalars['String'];
};

/** 오픈룸 예약 취소 */
export type CourseCancelReservationOpenRoomOutput = {
  __typename?: 'CourseCancelReservationOpenRoomOutput';
  success: Scalars['Boolean'];
};

/** 선택지 (보기) */
export type CourseChoice = {
  __typename?: 'CourseChoice';
  /** 선택지(보기) ID */
  id: Scalars['ID'];
  /** 정답 여부 */
  isCorrect: Scalars['Boolean'];
  /** 보기 내용 */
  text: Scalars['String'];
};

export type CourseCompleteOpenRoomInput = {
  /** 방 아이디 */
  roomId: Scalars['String'];
};

/** 오픈룸 종료하기 응답값 */
export type CourseCompleteOpenRoomOutput = {
  __typename?: 'CourseCompleteOpenRoomOutput';
  success: Scalars['Boolean'];
};

/** 코스 목록 */
export type CourseConnection = {
  __typename?: 'CourseConnection';
  /** 코스 리스트 */
  nodes: Array<Course>;
  /** 코스 수 */
  totalCount: Scalars['Int'];
};

export type CourseConnectionOrder = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<CourseConnectionOrderFieldType>;
};

export enum CourseConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type CourseConnectionWhere = {
  /** 필터 */
  filter?: InputMaybe<CourseFilterType>;
  /** 키워드 (상품명, 상품코드) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 공개여부 */
  state?: InputMaybe<CourseProductStateType>;
  /** 타겟 유형 */
  target?: InputMaybe<CourseProductTargetType>;
};

export type CourseCreateOpenRoomInput = {
  /** 공개 여부 */
  isPublic: Scalars['Boolean'];
  /** 비밀번호 */
  password?: InputMaybe<Scalars['String']>;
  /** 방 이름 */
  roomName: Scalars['String'];
  /** 시작시간 (예약) */
  startDateTime?: InputMaybe<Scalars['String']>;
  /** 방의 유형 (일반 or 예약, default=IMMEDIATE) */
  type?: InputMaybe<CourseOpenRoomType>;
};

/** 오픈룸 생성 응답값 */
export type CourseCreateOpenRoomOutput = {
  __typename?: 'CourseCreateOpenRoomOutput';
  room: CourseOpenRoom;
  token: Scalars['String'];
};

export enum CourseFilterType {
  /** 모집마감 상품 */
  EndRecruitment = 'END_RECRUITMENT',
  /** 무료 상품 */
  Free = 'FREE',
  /** 새로운 상품 */
  New = 'NEW',
  /** 세일 상품 */
  Sale = 'SALE'
}

export type CourseImage = {
  __typename?: 'CourseImage';
  id: Scalars['ID'];
  idx: Scalars['Int'];
  url: Scalars['String'];
};

export type CourseImageInput = {
  idx: Scalars['Int'];
  url: Scalars['String'];
};

/**
 * 초대 링크
 * - 튜터 권한 초대 링크
 * - 유저 권한 초대 링크
 */
export type CourseInviteLink = {
  __typename?: 'CourseInviteLink';
  tutor: Scalars['String'];
  user: Scalars['String'];
};

export type CourseJoinOpenRoomInput = {
  /** 참여자 고유 아이디 (로그인된 사용자일 경우 profileID가 해당된다) */
  identity: Scalars['String'];
  /** 방 안에서 사용될 닉네임 */
  nickname: Scalars['String'];
  /** 권한 */
  permission: PermissionType;
  /** 방 아이디 */
  roomId: Scalars['String'];
};

/** 오픈룸 입장히기 응답값 */
export type CourseJoinOpenRoomOutput = {
  __typename?: 'CourseJoinOpenRoomOutput';
  token: Scalars['String'];
};

/** 레슨 */
export type CourseLesson = {
  __typename?: 'CourseLesson';
  /** 액티비티 목록 */
  activities: Array<CourseActivity>;
  /** 코스 ID */
  courseId: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 소요시간 (분 단위) */
  durationTime: Scalars['Int'];
  /** 레슨 ID */
  id: Scalars['ID'];
  /** 차시 */
  idx: Scalars['Int'];
  /** 라이브 레슨 유무 */
  isLive: Scalars['Boolean'];
  /** 수업자료 */
  materials: Array<CourseLessonMaterial>;
  /** 이름 */
  name: Scalars['String'];
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /**
   * Video 정보 (type이 VOD일 경우에만 사용되는 필드)
   * @deprecated video field is deprecated.
   */
  video?: Maybe<CourseVideo>;
};

export type CourseLessonListWhere = {
  /** 코스 ID */
  courseId: Scalars['String'];
};

/** 수업 자료 */
export type CourseLessonMaterial = {
  __typename?: 'CourseLessonMaterial';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 자료 ID */
  id: Scalars['ID'];
  /** 레슨 ID */
  lessonId: Scalars['String'];
  /** 자료 이름 */
  name: Scalars['String'];
  /** 유형 (TUTOR 또는 PARTICIPANT) */
  type: CourseLessonMaterialType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** 자료 경로 */
  url: Scalars['String'];
};

export enum CourseLessonMaterialType {
  /** 학생 전용 */
  Participant = 'PARTICIPANT',
  /** 튜터 전용 */
  Tutor = 'TUTOR'
}

export type CourseLessonWhere = {
  /** 레슨 ID */
  lessonId: Scalars['String'];
};

/** 프로모션 상세 */
export type CourseMarketingPromotion = {
  __typename?: 'CourseMarketingPromotion';
  /** 할인정보 */
  discount: Discount;
  /** 종료 시간 */
  endDateTime: Scalars['String'];
  /** ID */
  id: Scalars['ID'];
  /** 이름 */
  name: Scalars['String'];
  /** 상품 고유 아이디 */
  productIds: Array<Scalars['String']>;
  /** 프로모션 범위 */
  scopeType: CourseMarketingScopeType;
  /** 시작 시간 */
  startDateTime: Scalars['String'];
  /** 상태 */
  status: CourseMarketingPromotionStatusType;
};

export enum CourseMarketingPromotionStatusType {
  /** 전체 적용 */
  All = 'ALL',
  /** 단일 적용 */
  Only = 'ONLY'
}

export enum CourseMarketingScopeType {
  /** 강제 종료 */
  Close = 'CLOSE',
  /** 만료 */
  Expire = 'EXPIRE',
  /** 진행중 */
  Ongoing = 'ONGOING',
  /** 대기 */
  Ready = 'READY'
}

/** 코스 연계상품 */
export type CourseMerchandise = {
  __typename?: 'CourseMerchandise';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description: Scalars['String'];
  /** 상품 ID */
  id: Scalars['ID'];
  /** 이미지 경로 */
  images: Array<CourseImage>;
  /** 새로운 상품 유무 (상품생성일 30일 이전 true, 이후 false */
  isNew: Scalars['Boolean'];
  /** 할인 유무 (할인중 true, 아닐경우 false) */
  isSale: Scalars['Boolean'];
  /** 상품명 */
  name: Scalars['String'];
  /** 가격 */
  price: Scalars['Int'];
  /** 프로모션 */
  promotion?: Maybe<CourseMarketingPromotion>;
  /** 구매 유형 */
  purchaseType: CourseProductPurchaseType;
  /** 공개 여부 */
  state: CourseProductStateType;
  /** 재고 수 */
  stockCount: Scalars['Int'];
  /** 유형 */
  type: CourseMerchandiseType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 일반 상품 목록 (코스와 연계되는 상품이기도 함) */
export type CourseMerchandiseConnection = {
  __typename?: 'CourseMerchandiseConnection';
  /** 상품 목록 */
  nodes: Array<CourseMerchandise>;
  /** 상품 수 */
  totalCount: Scalars['Int'];
};

export type CourseMerchandiseConnectionOrder = {
  /** 차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<CourseMerchandiseConnectionOrderFieldType>;
};

export enum CourseMerchandiseConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type CourseMerchandiseConnectionWhere = {
  /** 키워드 (상품명, 상품코드) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 구매 유형 */
  purchaseType?: InputMaybe<CourseProductPurchaseType>;
  /** 공개여부 */
  state?: InputMaybe<CourseProductStateType>;
};

export type CourseMerchandiseInput = {
  /** ID */
  id: Scalars['ID'];
  /** 이름 */
  name: Scalars['String'];
};

export enum CourseMerchandiseType {
  /** 키트 */
  Kit = 'KIT',
  /** 팩 */
  Pack = 'PACK',
  /** 교재 */
  TextBook = 'TEXT_BOOK'
}

export type CourseMerchandiseWhere = {
  /** 일반상품 ID */
  id: Scalars['String'];
};

/** 오픈룸 */
export type CourseOpenRoom = {
  __typename?: 'CourseOpenRoom';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 방 생성자 */
  creator: Scalars['String'];
  /** 방 생성자 이름 */
  creatorName: Scalars['String'];
  /** 현재 방 참여자 목록 */
  currentParticipants: Array<LiveLessonParticipant>;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 오픈룸 ID */
  id: Scalars['ID'];
  /** 초대 링크 */
  inviteLink: CourseInviteLink;
  /** 공개 여부 */
  isPublic: Scalars['Boolean'];
  /** 비밀번호 여부 */
  passwordProtected: Scalars['Boolean'];
  /** 예약 정보 */
  reservation?: Maybe<CourseOpenRoomReservation>;
  /** 방 이름 */
  roomName: Scalars['String'];
  /** 공유 자료 목록 */
  sharedFiles: Array<CourseSharedFile>;
  /** 상태 */
  status: CourseOpenRoomStatusType;
  /** 방의 유형 (일반 or 예약) */
  type: CourseOpenRoomType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 오픈룸 목록 */
export type CourseOpenRoomConnection = {
  __typename?: 'CourseOpenRoomConnection';
  /** 오픈룸 리스트 */
  nodes: Array<CourseOpenRoom>;
  /** 총 오픈룸 수 */
  totalCount: Scalars['Int'];
};

export type CourseOpenRoomConnectionOrder = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<CourseOpenRoomConnectionOrderFieldType>;
};

export enum CourseOpenRoomConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type CourseOpenRoomConnectionWhere = {
  /** 공개 여부 */
  isPublic?: InputMaybe<Scalars['Boolean']>;
  /** 키워드 (방 이름) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 내가 만든 방 여부 */
  myRoom?: InputMaybe<Scalars['Boolean']>;
  /** 비밀번호 여부 */
  passwordProtected?: InputMaybe<Scalars['Boolean']>;
  /** 상태 */
  status?: InputMaybe<CourseOpenRoomStatusType>;
};

export type CourseOpenRoomParticipantsWhere = {
  /** 방 이름 */
  roomName: Scalars['String'];
};

/** 오픈룸 예약 정보 */
export type CourseOpenRoomReservation = {
  __typename?: 'CourseOpenRoomReservation';
  endDateTime?: Maybe<Scalars['String']>;
  startDateTime: Scalars['String'];
};

/** 오픈룸 상태 유형 */
export enum CourseOpenRoomStatusType {
  /** 취소 */
  Canceled = 'CANCELED',
  /** 완료 */
  Completed = 'COMPLETED',
  /** 오픈 */
  Ongoing = 'ONGOING',
  /** 대기 */
  Pending = 'PENDING'
}

/** 오픈룸 유형 */
export enum CourseOpenRoomType {
  /** 즉시 생성되는 방 */
  Immediate = 'IMMEDIATE',
  /** 예약 생성되는 방 */
  Reservation = 'RESERVATION'
}

export type CourseOpenRoomWhere = {
  /** 오픈룸 아이디 */
  id: Scalars['ID'];
};

/** 클래스 참여자 */
export type CourseParticipant = {
  __typename?: 'CourseParticipant';
  /** 출생년도 */
  birthYear: Scalars['Int'];
  /** 코딩 경험 */
  codingExperiences: Array<CodingType>;
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 참여자 ID */
  id: Scalars['ID'];
  /** 학습자 이름 */
  name: Scalars['String'];
  /** 학습자 전화번호 */
  phoneNumber: Scalars['String'];
  /** 유저 프로필 ID */
  profileId: Scalars['String'];
  /** 스케줄 그룹 ID */
  scheduleGroupId: Scalars['String'];
  /** 상태 */
  status: CourseParticipantStatusType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /**
   * 유저 ID
   * @deprecated userId is deprecated.
   */
  userId: Scalars['String'];
};

/** 학생 레슨 피드백 */
export type CourseParticipantLessonFeedback = {
  __typename?: 'CourseParticipantLessonFeedback';
  difficultyLevel: Scalars['Int'];
  feedback: Scalars['String'];
  interestLevel: Scalars['Int'];
};

export type CourseParticipantLessonFeedbackWhere = {
  /** 프로필 아이디 */
  profileId: Scalars['String'];
  /** 스케줄 아이디 */
  scheduleId: Scalars['Int'];
};

export enum CourseParticipantStatusType {
  Canceled = 'CANCELED',
  Complete = 'COMPLETE',
  Create = 'CREATE',
  Pending = 'PENDING',
  Progress = 'PROGRESS',
  RequestCancel = 'REQUEST_CANCEL'
}

/** 상품 고유 정보 */
export type CourseProduct = {
  __typename?: 'CourseProduct';
  /** 유형 */
  dType: CourseProductDType;
  /** 프로덕트 고유 ID */
  id: Scalars['ID'];
  /** 이미지 경로 */
  images: Array<CourseImage>;
  /** 이름 */
  name: Scalars['String'];
  /** 가격 */
  price: Scalars['Int'];
  /** 구매 유형 */
  purchaseType: CourseProductPurchaseType;
  /** 공개 여부 */
  state: CourseProductStateType;
  /** 재고 수 */
  stockCount: Scalars['Int'];
};

/** 상품 고유 정보 목록 */
export type CourseProductConnection = {
  __typename?: 'CourseProductConnection';
  /** 상품 리스트 */
  nodes: Array<CourseProduct>;
  /** 상품 수 */
  totalCount: Scalars['Int'];
};

export type CourseProductConnectionOrder = {
  /** 차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<CourseProductConnectionOrderFieldType>;
};

export enum CourseProductConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type CourseProductConnectionWhere = {
  /** 상품 유형 */
  dType?: InputMaybe<CourseProductDType>;
  /** 키워드 (상품명, 상품코드) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 구매 유형 */
  purchaseType?: InputMaybe<CourseProductPurchaseType>;
  /** 공개여부 */
  state?: InputMaybe<CourseProductStateType>;
};

export enum CourseProductDType {
  Course = 'COURSE',
  Merchandise = 'MERCHANDISE'
}

export enum CourseProductPurchaseType {
  /** 구매 */
  Purchase = 'PURCHASE',
  /** 대여 */
  Rental = 'RENTAL'
}

export enum CourseProductStateType {
  Off = 'OFF',
  On = 'ON',
  Soldout = 'SOLDOUT'
}

export enum CourseProductTargetType {
  /** 일반 */
  General = 'GENERAL',
  /** 모디 교육자 */
  ModiTrainee = 'MODI_TRAINEE',
  /** 튜터 */
  Tutor = 'TUTOR'
}

export type CourseProductWhere = {
  /** 상품 ID */
  id: Scalars['ID'];
};

/** 질문 */
export type CourseQuestion = {
  __typename?: 'CourseQuestion';
  /** 선택지 */
  choices: Array<CourseChoice>;
  /** 질문 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 서브 질문 내용 */
  subText: Scalars['String'];
  /** 질문 내용 */
  text: Scalars['String'];
  /** 유형 (객관식, 주관식) */
  type: CourseQuestionType;
};

export enum CourseQuestionType {
  /** 객관식 */
  MultipleChoiceAnswer = 'MULTIPLE_CHOICE_ANSWER',
  /** 주관식 (단답형) */
  ShortAnswer = 'SHORT_ANSWER'
}

/** 퀴즈 */
export type CourseQuiz = {
  __typename?: 'CourseQuiz';
  /** 작성자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 퀴즈 ID */
  id: Scalars['ID'];
  /** 질문 목록 */
  questions: Array<CourseQuestion>;
  /** 제한 시간 */
  time: Scalars['Int'];
  /** 제목 */
  title: Scalars['String'];
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 퀴즈 목록 */
export type CourseQuizConnection = {
  __typename?: 'CourseQuizConnection';
  /** 퀴즈 리스트 */
  nodes: Array<CourseQuiz>;
  /** 총 퀴즈 수 */
  totalCount: Scalars['Int'];
};

export type CourseQuizConnectionOrder = {
  /** 차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<CourseQuizConnectionOrderFieldType>;
};

export enum CourseQuizConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type CourseQuizConnectionWhere = {
  /** 키워드 (제목, 작성자) */
  keyword?: InputMaybe<Scalars['String']>;
};

export type CourseQuizWhere = {
  /** 퀴즈 ID */
  id: Scalars['ID'];
};

/** 스케줄 */
export type CourseSchedule = {
  __typename?: 'CourseSchedule';
  /** 액티비티 학습 내역 */
  activityHistory?: Maybe<ActivityHistory>;
  /** 출결 정보 (학생일때만 사용되는 필드) */
  attendance?: Maybe<CourseAttendance>;
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 스케줄 ID */
  id: Scalars['ID'];
  /** 수업 입장가능 유무 */
  isEnterable: Scalars['Boolean'];
  /** 방 생성 유무 */
  isExistRoom: Scalars['Boolean'];
  /** 수업자료 다운로드 가능 유무 */
  isMaterialDownloadable: Scalars['Boolean'];
  /** 레슨 */
  lesson: CourseLesson;
  /** 방 이름 */
  roomName: Scalars['String'];
  /** 스케줄 그룹(클래스) ID */
  scheduleGroupId: Scalars['String'];
  /** 스케줄 그룹(클래스) 이름 */
  scheduleGroupName: Scalars['String'];
  /** 수업 시간 */
  startDateTime: Scalars['String'];
  /** 상태 */
  status: CourseScheduleStatusType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 스케줄 목록 */
export type CourseScheduleConnection = {
  __typename?: 'CourseScheduleConnection';
  /** 스케줄 리스트 */
  nodes: Array<CourseSchedule>;
  /** 스케줄 수 */
  totalCount: Scalars['Int'];
};

export type CourseScheduleConnectionOrder = {
  direction: OrderDirectionType;
  field: CourseScheduleConnectionOrderFieldType;
};

export enum CourseScheduleConnectionOrderFieldType {
  /** 스케줄 생성일 */
  CreatedAt = 'CREATED_AT',
  /** 스케줄 ID */
  Id = 'ID',
  /** 날짜 */
  StartDate = 'START_DATE'
}

export type CourseScheduleConnectionWhere = {
  /** 기간 */
  period?: InputMaybe<CourseSchedulePeriodInput>;
  /** 프로필 ID (참여자의 스케줄목록을 조회할때 사용. admin 권한 필수) */
  profileId?: InputMaybe<Scalars['String']>;
  /** 스케줄 그룹 ID */
  scheduleGroupId?: InputMaybe<Scalars['String']>;
  /** 튜터 ID (튜터의 배정 스케줄목록을 조회할때 사용. admin 권한 필수) */
  tutorId?: InputMaybe<Scalars['String']>;
};

/** 스케줄 그룹 (클래스) */
export type CourseScheduleGroup = {
  __typename?: 'CourseScheduleGroup';
  /** 나의 출석률 (학생일때만 사용되는 필드) */
  attendanceRate: Scalars['Int'];
  /** 스케줄그룹 코드 */
  code: Scalars['String'];
  /** 코스 ID */
  courseId: Scalars['String'];
  /** 코스 유형 */
  courseType: CourseType;
  /** 생성 유형 */
  createType: CourseScheduleGroupCreateType;
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 스케줄그룹 ID */
  id: Scalars['ID'];
  /** 이미지 */
  imageUrl: Scalars['String'];
  /** 레슨 목록 */
  lessons: Array<CourseLesson>;
  /** 최대 참여자수 */
  maxParticipant?: Maybe<Scalars['Int']>;
  /** 최소 참여자수 */
  minParticipant?: Maybe<Scalars['Int']>;
  /** 스케줄그룹명 (클래스명) */
  name: Scalars['String'];
  /** 참여자 목록 */
  participants: Array<CourseParticipant>;
  /** 진도율 */
  progressRate: Scalars['Int'];
  /** 스케줄 목록 */
  schedules: Array<CourseSchedule>;
  /** 개강일 (시간) */
  startDateTime: Scalars['String'];
  /** 상태 */
  status: CourseScheduleGroupStatusType;
  /** 튜터 */
  tutor?: Maybe<CourseTutor>;
  /** 유형 (일반, 보강) */
  type: CourseScheduleGroupType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 스케줄그룹(클래스) 목록 */
export type CourseScheduleGroupConnection = {
  __typename?: 'CourseScheduleGroupConnection';
  /** 스케줄그룹 목록 */
  nodes: Array<CourseScheduleGroup>;
  /** 스케줄그룹 수 */
  totalCount: Scalars['Int'];
};

export type CourseScheduleGroupConnectionOrder = {
  /** 정렬 방향 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 정렬 항목 */
  field?: InputMaybe<CourseScheduleGroupConnectionOrderFieldType>;
};

export enum CourseScheduleGroupConnectionOrderFieldType {
  /** 스케줄그룹(클래스) 생성일 */
  CreatedAt = 'CREATED_AT',
  /** 스케줄그룹(클래스) ID */
  Id = 'ID'
}

export type CourseScheduleGroupConnectionWhere = {
  /** 생성 유형 (수동, 자동) */
  createType?: InputMaybe<CourseScheduleGroupCreateType>;
  /** 키워드 (클래스명, 코드) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 프로필 ID (특정 프로필의 클래스 목록을 조회할때 사용. admin 권한 필수) */
  profileId?: InputMaybe<Scalars['String']>;
  /** 상태 */
  statusTypes?: InputMaybe<Array<CourseScheduleGroupStatusType>>;
  /** 튜터 ID (튜터의 배정 클래스 목록을 조회할때 사용. admin 권한 필수) */
  tutorId?: InputMaybe<Scalars['String']>;
  /** 클래스 유형 (일반, 보강) */
  type?: InputMaybe<CourseScheduleGroupType>;
};

export enum CourseScheduleGroupCreateType {
  Auto = 'AUTO',
  Manual = 'MANUAL'
}

export enum CourseScheduleGroupStatusType {
  /** 선생님 배정 완료 */
  AssignTutor = 'ASSIGN_TUTOR',
  /** 클래스 폐강 */
  Canceled = 'CANCELED',
  /** 클래스 폐강 대기 */
  CancelWait = 'CANCEL_WAIT',
  /** 클래스 수강완료 */
  Complete = 'COMPLETE',
  /** 클래스 생성 */
  Create = 'CREATE',
  /** 수강생 매칭 완료 */
  MatchStudent = 'MATCH_STUDENT',
  /** 클래스 진행중 */
  Ongoing = 'ONGOING',
  /** 대기 (결제 등) */
  Pending = 'PENDING',
  /** 클래스 준비완료 */
  Ready = 'READY'
}

export enum CourseScheduleGroupType {
  Normal = 'NORMAL',
  Supplement = 'SUPPLEMENT'
}

export type CourseScheduleGroupWhere = {
  /** 스케줄 그룹 ID */
  scheduleGroupId: Scalars['String'];
};

export type CourseScheduleInput = {
  /** 레슨 ID */
  lessonId: Scalars['String'];
  /** 수업 시간 */
  startDateTime: Scalars['String'];
};

export type CourseScheduleListWhere = {
  /** 코스 ID */
  courseId: Scalars['String'];
};

export type CourseSchedulePeriodInput = {
  /** 날짜  ex) 2020-01-01 */
  date: Scalars['String'];
  /** 단위 */
  unit: CourseSchedulePeriodType;
};

export enum CourseSchedulePeriodType {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK'
}

export enum CourseScheduleStatusType {
  /** 수업 완료 */
  Complete = 'COMPLETE',
  /** 수업 누락 */
  Missing = 'MISSING',
  /** 수업 진행중 */
  Ongoing = 'ONGOING',
  /** 수업 준비 (대기) */
  Ready = 'READY'
}

export type CourseScheduleWhere = {
  /** 스케줄 ID */
  scheduleId: Scalars['String'];
};

/** 오픈룸 공유 파일 */
export type CourseSharedFile = {
  __typename?: 'CourseSharedFile';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 공유 파일 ID */
  id: Scalars['ID'];
  /** 유형 */
  type: Scalars['String'];
  /** 경로 */
  url: Scalars['String'];
};

/** 액티비티 보조 자료 */
export type CourseSupplementaryData = {
  __typename?: 'CourseSupplementaryData';
  /** 액티비티 ID */
  activityId: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 내용 */
  description: Scalars['String'];
  /** 힌트 내용 */
  hintDescription?: Maybe<Scalars['String']>;
  /** 힌트 제목 */
  hintTitle?: Maybe<Scalars['String']>;
  /** 액티비티 보조 자료 고유 ID */
  id: Scalars['ID'];
  /** 컨텐츠 제공업체 */
  providerType?: Maybe<ContentProviderType>;
  /** 제목 */
  title: Scalars['String'];
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** 비디오 경로 */
  videoUrl?: Maybe<Scalars['String']>;
};

/** 태그 */
export type CourseTag = {
  __typename?: 'CourseTag';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** ID */
  id: Scalars['ID'];
  /** 태그 이름 */
  name: Scalars['String'];
  /** 태그 카테고리 */
  tagCategoryID: Scalars['ID'];
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 태그 카테고리 */
export type CourseTagCategory = {
  __typename?: 'CourseTagCategory';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 태그 카테고리 ID */
  id: Scalars['ID'];
  /** 카테고리 이름 */
  name: Scalars['String'];
  /** 태그 목록 */
  tags: Array<CourseTag>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseTagInput = {
  /** ID */
  id: Scalars['ID'];
  /** 태그 이름 */
  name: Scalars['String'];
};

export type CourseTagswhere = {
  /** 태그 카테고리 ID */
  tagCategoryId: Scalars['String'];
};

/** 튜터 정보 */
export type CourseTutor = {
  __typename?: 'CourseTutor';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 이메일 */
  email: Scalars['String'];
  /** 튜터 ID */
  id: Scalars['ID'];
  /** 이름 */
  name: Scalars['String'];
  /** 전화번호 */
  phoneNumber: Scalars['String'];
  /** 시간당 가격 */
  price?: Maybe<Scalars['Int']>;
  /** 프로필 */
  profileId: Scalars['String'];
  /** 상태 (신청가능, 불가능) */
  state: CourseTutorStateType;
  /** 과목 */
  subject?: Maybe<Scalars['String']>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** 유저 */
  userId: Scalars['String'];
};

/** 튜터 목록 */
export type CourseTutorConnection = {
  __typename?: 'CourseTutorConnection';
  /** 튜터 목록 */
  nodes: Array<CourseTutor>;
  /** 튜터 수 */
  totalCount: Scalars['Int'];
};

export type CourseTutorConnectionOrder = {
  direction: OrderDirectionType;
  field: CourseTutorConnectionOrderFieldType;
};

export enum CourseTutorConnectionOrderFieldType {
  /** 튜터 ID */
  Id = 'ID'
}

export type CourseTutorConnectionWhere = {
  keyword: Scalars['String'];
};

/** 튜터 스케쥴 디테일 */
export type CourseTutorSchedule = {
  __typename?: 'CourseTutorSchedule';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 스케쥴 종료 날짜 */
  endDateTime: Scalars['String'];
  /** 튜터 스케쥴 디테일 ID */
  id: Scalars['ID'];
  /** 스케쥴 시작 날짜 */
  startDateTime: Scalars['String'];
  /** 튜터 스케쥴 ID */
  tutorScheduleGroupId: Scalars['ID'];
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 튜터 스케줄 디테일 목록 */
export type CourseTutorScheduleConnection = {
  __typename?: 'CourseTutorScheduleConnection';
  /** 튜터 스케줄 디테일 목록 */
  nodes: Array<CourseTutorSchedule>;
  /** 튜터 스케줄 수 */
  totalCount: Scalars['Int'];
};

export type CourseTutorScheduleConnectionOrder = {
  direction: OrderDirectionType;
  field: CourseTutorScheduleConnectionOrderFieldType;
};

export enum CourseTutorScheduleConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type CourseTutorScheduleConnectionWhere = {
  /** 기간 */
  period?: InputMaybe<CourseSchedulePeriodInput>;
  /** 튜터 ID (튜터의 가능 스케줄목록을 조회할때 사용. admin 권한 필수) */
  tutorId?: InputMaybe<Scalars['String']>;
  /** 튜터 스케줄그룹 ID */
  tutorScheduleGroupId?: InputMaybe<Scalars['ID']>;
};

/** 튜터 스케줄그룹 */
export type CourseTutorScheduleGroup = {
  __typename?: 'CourseTutorScheduleGroup';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 종료 날짜 */
  endDateTime: Scalars['String'];
  /** 튜터 스케줄 ID */
  id: Scalars['ID'];
  /** 반복 유무 */
  loop: CourseTutorScheduleGroupLoopType;
  /** 시작 날짜 */
  startDateTime: Scalars['String'];
  /** 튜터 고유 ID */
  tutorId: Scalars['String'];
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 튜터 스케줄그룹 목록 */
export type CourseTutorScheduleGroupConnection = {
  __typename?: 'CourseTutorScheduleGroupConnection';
  /** 튜터 스케줄그룹 목록 */
  nodes: Array<CourseTutorScheduleGroup>;
  /** 튜터 스케줄 수 */
  totalCount: Scalars['Int'];
};

export type CourseTutorScheduleGroupConnectionOrder = {
  direction: OrderDirectionType;
  field: CourseTutorScheduleGroupConnectionOrderFieldType;
};

export enum CourseTutorScheduleGroupConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type CourseTutorScheduleGroupConnectionWhere = {
  /** 튜터 ID */
  tutorId: Scalars['ID'];
};

export enum CourseTutorScheduleGroupLoopType {
  EveryDay = 'EVERY_DAY',
  EveryWeek = 'EVERY_WEEK',
  None = 'NONE'
}

export type CourseTutorScheduleGroupWhere = {
  /** 튜터 ID */
  tutorId: Scalars['ID'];
};

export type CourseTutorScheduleWhere = {
  /** 튜터 스케줄그룹 ID */
  tutorScheduleGroupId: Scalars['ID'];
};

export enum CourseTutorStateType {
  /** 신청 불가능 */
  Off = 'OFF',
  /** 신청 가능 */
  On = 'ON'
}

export type CourseTutorWhere = {
  /** 튜터 ID */
  id?: InputMaybe<Scalars['ID']>;
  /** 프로필 ID */
  profileId?: InputMaybe<Scalars['String']>;
};

/** 교육 유형 */
export enum CourseType {
  /** 교육자주도학습 */
  Educator = 'EDUCATOR',
  /** 자기주도학습 */
  Self = 'SELF'
}

export type CourseUploadOpenRoomSharedFileInput = {
  /** 유저 식별자 */
  identity: Scalars['String'];
  /** 방 아이디 */
  roomId: Scalars['String'];
  /** 유형 */
  type: Scalars['String'];
  /** 경로 */
  url: Scalars['String'];
};

/** 오픈룸 공유 파일 업로드 응답값 */
export type CourseUploadOpenRoomSharedFileOutput = {
  __typename?: 'CourseUploadOpenRoomSharedFileOutput';
  success: Scalars['Boolean'];
};

export type CourseVideo = {
  __typename?: 'CourseVideo';
  /** 비디오 ID */
  id: Scalars['String'];
  /** 언어 */
  languageType: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
  /** 컨텐츠 제공업체 */
  providerType: ContentProviderType;
  /** 주소 */
  url: Scalars['String'];
  /** 비디오 재생위치 (초 단위) */
  videoPlaybackPosition: Scalars['Int'];
};

export type CourseVodItem = {
  /** 유형 (설명, 퀴즈) */
  dType: CourseVodItemDType;
  /** VOD 아이템 ID */
  id: Scalars['ID'];
  /** 아이템 정답여부 */
  isCorrect: Scalars['Boolean'];
  /** 아이템 확인유무 */
  isView: Scalars['Boolean'];
  /** 핀 위치 */
  pinPosition: Scalars['Int'];
  /** 부제목 */
  subTitle?: Maybe<Scalars['String']>;
  /** 제목 */
  title: Scalars['String'];
};

export enum CourseVodItemDType {
  Quiz = 'QUIZ',
  TextBook = 'TEXT_BOOK'
}

export type CourseVodItemQuiz = CourseVodItem & {
  __typename?: 'CourseVodItemQuiz';
  /** 유형 (설명, 퀴즈) */
  dType: CourseVodItemDType;
  /** VOD 아이템 고유 ID */
  id: Scalars['ID'];
  /** 아이템 정답여부 */
  isCorrect: Scalars['Boolean'];
  /** 아이템 확인유무 */
  isView: Scalars['Boolean'];
  /** 핀 위치 */
  pinPosition: Scalars['Int'];
  /** quiz 상세정보 */
  quiz: CourseQuiz;
  /** 부제목 */
  subTitle?: Maybe<Scalars['String']>;
  /** 제목 */
  title: Scalars['String'];
};

export type CourseVodItemText = CourseVodItem & {
  __typename?: 'CourseVodItemText';
  /** 유형 (설명, 퀴즈) */
  dType: CourseVodItemDType;
  /** VOD 아이템 고유 ID */
  id: Scalars['ID'];
  /** 아이템 정답여부 */
  isCorrect: Scalars['Boolean'];
  /** 아이템 확인유무 */
  isView: Scalars['Boolean'];
  /** 핀 위치 */
  pinPosition: Scalars['Int'];
  /** 부제목 */
  subTitle?: Maybe<Scalars['String']>;
  /** text 상세정보 */
  text: CourseVodItemTextDetail;
  /** 제목 */
  title: Scalars['String'];
};

export type CourseVodItemTextDetail = {
  __typename?: 'CourseVodItemTextDetail';
  /** 내용 */
  content: Scalars['String'];
  /** 고유 ID */
  id: Scalars['ID'];
};

export enum CourseWeekType {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type CourseWhere = {
  /** 코스 ID */
  id: Scalars['ID'];
};

export type CreateActivityInput = {
  /** coding 정보 */
  coding?: InputMaybe<CreateCourseActivityCodingInput>;
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseActivityDType;
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 레슨 ID */
  lessonId?: InputMaybe<Scalars['String']>;
  /** 이름 */
  name: Scalars['String'];
  /** pdf 정보 */
  pdf?: InputMaybe<CreateCourseActivityPdfInput>;
  /** quiz 정보 */
  quiz?: InputMaybe<CreateCourseQuizInput>;
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 보조 자료 */
  supplementaryData?: InputMaybe<CreateCourseSupplementaryDataInput>;
  /** textBook 정보 */
  textBook?: InputMaybe<CreateCourseActivityTextBookInput>;
  /** vod 정보 */
  vod?: InputMaybe<CreateCourseActivityVodInput>;
};

export type CreateActivitySupplementaryDataInput = {
  /** 액티비티 ID */
  activityId: Scalars['String'];
  /** 내용 */
  description: Scalars['String'];
  /** 힌트 내용 */
  hintDescription?: InputMaybe<Scalars['String']>;
  /** 힌트 제목 */
  hintTitle?: InputMaybe<Scalars['String']>;
  /** 컨텐츠 제공업체 */
  providerType?: InputMaybe<ContentProviderType>;
  /** 제목 */
  title: Scalars['String'];
  /** 비디오 경로 */
  videoUrl?: InputMaybe<Scalars['String']>;
};

export type CreateActivityVodItemInput = {
  /** 액티비티 VOD ID */
  activityVodId: Scalars['ID'];
  /** 핀 위치 (초 단위) */
  pinPosition: Scalars['Int'];
  /** 퀴즈 유형의 아이템 */
  quiz?: InputMaybe<CreateCourseQuizInput>;
  /** 부제목 */
  subTitle?: InputMaybe<Scalars['String']>;
  /** 텍스트 유형의 아이템 */
  textBook?: InputMaybe<CreateCourseActivityVodItemTextBookInput>;
  /** 제목 */
  title: Scalars['String'];
  /** 아이템 유형 (퀴즈, 텍스트) */
  type: CourseVodItemDType;
};

export type CreateAppBannerInput = {
  idx: Scalars['Int'];
  image?: InputMaybe<ImageInfoInput>;
  openType: OpenType;
  subTitle?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type: AppBannerType;
};

export type CreateBoardDataInput = {
  dataByLanguages: Array<BoardDataByLanguageInput>;
  isView: Scalars['Boolean'];
  serviceType: ServiceType;
};

export type CreateBoardFaqInput = {
  faqCode: Scalars['Int'];
  isView: Scalars['Boolean'];
  languages: Array<BoardFaqLanguageInput>;
  serviceType: ServiceType;
};

export type CreateBoardNoticeInput = {
  dataByLanguages: Array<BoardDataByLanguageInput>;
  isTop: Scalars['Boolean'];
  isView: Scalars['Boolean'];
  serviceType: ServiceType;
};

export type CreateClassroomHomeworkInput = {
  classroomId: Scalars['String'];
  content: Scalars['String'];
  expireDate: Scalars['String'];
  lessonId: Scalars['String'];
  title: Scalars['String'];
};

export type CreateClassroomInput = {
  gradeType: ClassroomGradeType;
  idx?: InputMaybe<Scalars['Int']>;
  mainImg: ImageInfoInput;
  openType?: InputMaybe<ClassroomOpenType>;
  summary: Scalars['String'];
  title: Scalars['String'];
};

export type CreateClassroomNoticeInput = {
  classroomId: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};

export type CreateClassroomStudentHomeworkInput = {
  classroomId: Scalars['String'];
  content: Scalars['String'];
  fileBase64: Scalars['String'];
  homeworkId: Scalars['String'];
};

export type CreateCourseActivityCodingInput = {
  /** 정답 코드 */
  answerCode: Scalars['String'];
  /** 유형 (MODITOR, PTYHON) */
  codingType: ActivityCodingType;
  /** 초기 코드 */
  initCode?: InputMaybe<Scalars['String']>;
};

export type CreateCourseActivityPdfInput = {
  /** pdf 페이지 총 수 */
  totalCount: Scalars['Int'];
  /** pdf 경로 */
  url: Scalars['String'];
};

export type CreateCourseActivityTextBookInput = {
  /** 내용 */
  content: Scalars['String'];
};

export type CreateCourseActivityVodInput = {
  /** 전체 시간 (초 단위) */
  durationInSec: Scalars['Int'];
  /** 제공업체 유형 */
  providerType: ContentProviderType;
  /** 경로 */
  url: Scalars['String'];
};

export type CreateCourseActivityVodItemTextBookInput = {
  /** 내용 */
  content: Scalars['String'];
};

export type CreateCourseAttendanceResultInput = {
  /** 첫번째 입장한 시간 */
  firstEnteredTimestamp: Scalars['Int'];
  /** 총 참여한 시간 (분 단위) */
  joinedTime: Scalars['Int'];
  /** 총 수업시간 (분 단위) */
  lessonTime: Scalars['Int'];
  /** 프로필 아이디 */
  profileId: Scalars['String'];
  /** 스케줄 ID */
  scheduleId: Scalars['String'];
};

export type CreateCourseChoiceInput = {
  /** 정답 여부 */
  isCorrect: Scalars['Boolean'];
  /** 보기 내용 */
  text: Scalars['String'];
};

export type CreateCourseInput = {
  /** 유의사항 */
  caution: Scalars['String'];
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 특징 */
  feature: Scalars['String'];
  /** 이미지 */
  images?: InputMaybe<Array<CourseImageInput>>;
  /** 수강 최대연령 */
  maxAge: Scalars['Int'];
  /** 최대 참여자수 */
  maxParticipant?: InputMaybe<Scalars['Int']>;
  /** 상품 아이디 목록 */
  merchandises?: InputMaybe<Array<CourseMerchandiseInput>>;
  /** 수강 최소연령 */
  minAge: Scalars['Int'];
  /** 최소 참여자수 */
  minParticipant?: InputMaybe<Scalars['Int']>;
  /** 이름 */
  name: Scalars['String'];
  /** 가격 */
  price: Scalars['Int'];
  /** 모집 종료일 */
  recruitmentEndDateTime?: InputMaybe<Scalars['String']>;
  /** 모집 시작일 */
  recruitmentStartDateTime?: InputMaybe<Scalars['String']>;
  /** 모집 대상 */
  recruitmentTarget: Scalars['String'];
  /** 필수 준비물 */
  requiredPreparation: Scalars['String'];
  /** 상태 */
  state: CourseProductStateType;
  /** 태그 아이디 목록 */
  tags?: InputMaybe<Array<CourseTagInput>>;
  /** 교육 유형 (교육자주도학습, 자기주도학습) */
  type: CourseType;
};

export type CreateCourseLessonInput = {
  /** 코스 ID */
  courseId: Scalars['String'];
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 소요시간 (분 단위) */
  durationTime: Scalars['Int'];
  /** 라이브 레슨 유무 */
  isLive: Scalars['Boolean'];
  /** 이름 */
  name: Scalars['String'];
};

export type CreateCourseMaterialInput = {
  materials: Array<MaterialInput>;
};

export type CreateCourseMerchandiseInput = {
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 이미지 */
  images?: InputMaybe<Array<CourseImageInput>>;
  /** 상품 이름 */
  name: Scalars['String'];
  /** 가격 */
  price: Scalars['Int'];
  /** 구매 유형 */
  purchaseType: CourseProductPurchaseType;
  /** 공개 여부 */
  state: CourseProductStateType;
  /** 재고 수 */
  stockCount: Scalars['Int'];
  /** 유형 */
  type: CourseMerchandiseType;
};

export type CreateCourseParticipantInput = {
  /** 출생년도 */
  birthYear: Scalars['Int'];
  /** 코딩 경험 */
  codingExperiences: Array<CodingType>;
  /** 학습자 이름 */
  name: Scalars['String'];
  /** 학습자 전화번호 */
  phoneNumber: Scalars['String'];
  /** 유저 프로필 ID */
  profileId: Scalars['String'];
  /** 스케줄 그룹 ID */
  scheduleGroupId: Scalars['String'];
  /** 상태 */
  status: CourseParticipantStatusType;
};

export type CreateCourseParticipantLessonFeedbackInput = {
  /** 난이도 */
  difficultyLevel: Scalars['Int'];
  /** 피드백 */
  feedback: Scalars['String'];
  /** 흥미도 */
  interestLevel: Scalars['Int'];
  /** 스케줄 아이디 */
  scheduleId: Scalars['Int'];
};

export type CreateCourseProductInput = {
  /** 상품 유형 */
  dType: CourseProductDType;
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 이미지 */
  images?: InputMaybe<Array<CourseImageInput>>;
  /** 상품 이름 */
  name: Scalars['String'];
  /** 가격 */
  price: Scalars['Int'];
  /** 구매 유형 */
  purchaseType: CourseProductPurchaseType;
  /** 공개 여부 */
  state: CourseProductStateType;
  /** 재고 수 */
  stockCount?: InputMaybe<Scalars['Int']>;
};

export type CreateCourseQuestionInput = {
  /** 선택지 */
  choices: Array<CreateCourseChoiceInput>;
  /** 서브 질문 내용 */
  subText: Scalars['String'];
  /** 질문 내용 */
  text: Scalars['String'];
  /** 유형 (객관식, 주관식) */
  type: CourseQuestionType;
};

export type CreateCourseQuizInput = {
  /** 액티비티용 퀴즈 생성 */
  activityID?: InputMaybe<Scalars['ID']>;
  /** VOD 액티비티용 퀴즈 생성 */
  activityVodItemID?: InputMaybe<Scalars['ID']>;
  /** 질문 목록 */
  questions: Array<CreateCourseQuestionInput>;
  /** 제한 시간 */
  time: Scalars['Int'];
  /** 제목 */
  title: Scalars['String'];
};

export type CreateCourseScheduleGroupInput = {
  /** 코스 ID */
  courseId: Scalars['String'];
  /** 생성 유형 */
  createType: CourseScheduleGroupCreateType;
  /** 최대 참여자수 */
  maxParticipant: Scalars['Int'];
  /** 최소 참여자수 */
  minParticipant: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** 개강일 (시간) */
  startDateTime: Scalars['String'];
  /** 유형 (일반, 보강) */
  type: CourseScheduleGroupType;
};

export type CreateCourseScheduleInput = {
  /** 스케줄 그룹 ID */
  scheduleGroupId: Scalars['String'];
  /** 스케줄 정보 */
  schedules: Array<CourseScheduleInput>;
};

/** 액티비티 보조 자료 생성 인풋 */
export type CreateCourseSupplementaryDataInput = {
  /** 내용 */
  description: Scalars['String'];
  /** 힌트 내용 */
  hintDescription?: InputMaybe<Scalars['String']>;
  /** 힌트 제목 */
  hintTitle?: InputMaybe<Scalars['String']>;
  /** 컨텐츠 제공업체 */
  providerType?: InputMaybe<ContentProviderType>;
  /** 제목 */
  title: Scalars['String'];
  /** 비디오 경로 */
  videoUrl?: InputMaybe<Scalars['String']>;
};

export type CreateCourseTagCategoryInput = {
  /** 카테고리 이름 */
  name: Scalars['String'];
};

export type CreateCourseTagInput = {
  /** 태그 이름 */
  name: Scalars['String'];
  /** 태그 카테고리 ID */
  tagCategoryId: Scalars['String'];
};

export type CreateCourseTutorInput = {
  /** 이메일 */
  email: Scalars['String'];
  /** 튜터 닉네임 */
  name: Scalars['String'];
  /** 전화번호 */
  phoneNumber: Scalars['String'];
  /** 시간당 가격 */
  price?: InputMaybe<Scalars['Int']>;
  /** 프로필 ID */
  profileId: Scalars['String'];
  /** 상태 (신청가능, 불가능) */
  state: CourseTutorStateType;
  /** 과목 */
  subject?: InputMaybe<Scalars['String']>;
  /** 유저 ID */
  userId: Scalars['String'];
};

export type CreateCourseTutorScheduleGroupInput = {
  /** 종료 날짜 */
  endDateTime: Scalars['String'];
  /** 반복 유무 */
  loop: CourseTutorScheduleGroupLoopType;
  /** 프로필 ID (관리자가 특정 튜터의 스케줄을 생성할때 사용) */
  profileId?: InputMaybe<Scalars['String']>;
  /** 시작 날짜 */
  startDateTime: Scalars['String'];
};

/** 카테고리 등록 입력 */
export type CreateEduContentCategoryInput = {
  /** 잠금여부 */
  isLock: Scalars['Boolean'];
  /** 다국어 */
  languages: Array<EduContentLanguageInput>;
  /** 이름 */
  name: Scalars['String'];
};

/** 서브 카테고리 등록 입력 */
export type CreateEduContentSubCategoryInput = {
  /** 카테고리 ID */
  categoryId: Scalars['Int'];
  /** 잠금여부 */
  isLock: Scalars['Boolean'];
  /** 다국어 */
  languages: Array<EduContentLanguageInput>;
  /** 이름 */
  name: Scalars['String'];
};

export type CreateEduContentSubjectInput = {
  /** 색상 */
  color: Scalars['String'];
  /** 잠금여부 */
  isLock: Scalars['Boolean'];
  /** 다국어 */
  languages: Array<EduContentLanguageInput>;
  /** 이름 */
  name: Scalars['String'];
  /** 서브 카테고리 ID */
  subCategoryId: Scalars['Int'];
  /** thumbnail */
  thumbnail: ImageInfoInput;
};

export type CreateEduContentSubjectThemeInput = {
  /** 컨텐츠 */
  contentImages: Array<EduContentImageInput>;
  /** 다국어 */
  languages: Array<EduContentLanguageInput>;
  /** 이름 */
  name: Scalars['String'];
  /** 과목 ID */
  subjectId: Scalars['Int'];
  /** 색상 */
  type: EduContentSubjectThemeType;
};

export type CreateInterpreterFrameFromExpressionsInput = {
  /** LuxJS 블럭 코딩 선언부 */
  code: Scalars['String'];
  /** LuxJS 모디 모듈 선언부 */
  setup: Scalars['String'];
};

export type CreateInterpreterFrameFromSourceInput = {
  /** LuxJS 모디 모듈 + 블럭 코딩 선언부 */
  source: Scalars['String'];
};

export type CreateInterpreterFrameInput = {
  /** LuxJS 블럭 코딩 선언부 */
  code: Scalars['String'];
  /** LuxJS 모디 모듈 선언부 */
  setup: Scalars['String'];
};

export type CreateInterpreterV2FrameInput = {
  code: Scalars['String'];
  modis: Array<InputMaybe<InterpreterV2Modi>>;
  vars?: InputMaybe<Array<Scalars['String']>>;
};

/** 언어 생성 인풋 */
export type CreateLanguageInput = {
  /** 국가 코드 (KO, JP, DE etc..) */
  code: Scalars['String'];
  /** ISO 숫자 */
  isoNumber?: InputMaybe<Scalars['Int']>;
  /** 한글명 */
  name: Scalars['String'];
};

export type CreateLessonCurriculumInput = {
  bgImg?: InputMaybe<ImageInfoInput>;
  color?: InputMaybe<Scalars['String']>;
  groupType?: InputMaybe<LessonGroupType>;
  idx?: InputMaybe<Scalars['Int']>;
  label: Scalars['String'];
  languages: Array<LessonCurriculumLanguageInput>;
  levelType?: InputMaybe<LessonLevelType>;
  mainImgs?: InputMaybe<Array<InputMaybe<ImageInfoInput>>>;
  openType: OpenType;
  serviceType: LessonServiceType;
  summary?: InputMaybe<LessonSummaryInput>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  textColor?: InputMaybe<Scalars['String']>;
  viewType?: InputMaybe<LessonViewType>;
};

export type CreateLessonCurriculumRelateInput = {
  curriculumId: Scalars['String'];
  lessons: Array<InputMaybe<CurriculumRelateLessonInput>>;
};

export type CreateLessonEpubInput = {
  id: Scalars['ID'];
};

export type CreateLessonHardwareInput = {
  hardwareType: LessonHardwareType;
  mainImg: ImageInfoInput;
  subTitle?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateLessonInput = {
  answerCode?: InputMaybe<Scalars['String']>;
  bgImg?: InputMaybe<ImageInfoInput>;
  classTime?: InputMaybe<Scalars['Int']>;
  color?: InputMaybe<Scalars['String']>;
  creationType?: InputMaybe<LessonCodingCreationType>;
  epubUrl?: InputMaybe<Scalars['String']>;
  groupType?: InputMaybe<LessonGroupType>;
  idx?: InputMaybe<Scalars['Int']>;
  languages: Array<LessonLanguageInput>;
  levelType?: InputMaybe<LessonLevelType>;
  lockType?: InputMaybe<TrueFalseType>;
  mainImgs?: InputMaybe<Array<InputMaybe<ImageInfoInput>>>;
  openType: OpenType;
  serviceType: LessonServiceType;
  summary?: InputMaybe<LessonSummaryInput>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  textColor?: InputMaybe<Scalars['String']>;
  videoType?: InputMaybe<Scalars['String']>;
  videoURL?: InputMaybe<Scalars['String']>;
};

export type CreateLessonPlanContentInput = {
  lessonId: Scalars['String'];
  lessonPlanId: Scalars['String'];
  templates?: InputMaybe<Array<LessonPlanContentTemplateInput>>;
  title: Scalars['String'];
  type: LessonPlanContentType;
  viewType: LessonPlanContentViewType;
};

export type CreateLessonPlanInput = {
  contents: Array<LessonPlanContentInput>;
  lessonId: Scalars['String'];
  title: Scalars['String'];
  viewType: LessonPlanViewType;
};

export type CreateLessonPlanPdfInput = {
  lessonId: Scalars['String'];
  pdfBase64: Scalars['String'];
  title: Scalars['String'];
  viewType: LessonPlanContentViewType;
};

/** 쿠폰 입력 */
export type CreateMarketingCouponInput = {
  /** 할인정보 */
  discount?: InputMaybe<DiscountInput>;
  /** 종료 시간 */
  endTime: Scalars['String'];
  /** 발급 대상 */
  issuerTarget: MarketingCouponIssuerTargetInput;
  /** 발급 수량 */
  issuerVolume: Scalars['Int'];
  /** 발급 수량 타입 */
  issuerVolumeType: MarketingCouponIssuerVolumeType;
  /** 최대 할인 금액 */
  maxDiscountPrice: MoneyInput;
  /** 최소 주문 금액 */
  minOrderPrice: MoneyInput;
  /** 쿠폰 이름 */
  name: Scalars['String'];
  /** 쿠폰 적용 범위 타입 */
  scopeType: MarketingCouponScopeType;
  /** 시작 시간 */
  startTime: Scalars['String'];
};

/** 프로모션 입력 */
export type CreateMarketingPromotionInput = {
  /** 할인정보 */
  discount?: InputMaybe<DiscountInput>;
  /** 종료 시간 */
  endTime: Scalars['String'];
  /** 프로모션 이름 */
  name: Scalars['String'];
  /** 상품 ID */
  productIds?: InputMaybe<Array<Scalars['String']>>;
  /** 프로모션 스코프 전체 or 상품 */
  scopeType: MarketingPromotionScopeType;
  /** 시작 시간 */
  startTime: Scalars['String'];
};

export type CreateNotificationInput = {
  /** 아이콘 URL */
  IconURL?: InputMaybe<Scalars['String']>;
  /** 알림 내용 */
  description: Scalars['String'];
  /** 이벤트 발생 시간 */
  eventDateTime?: InputMaybe<Scalars['String']>;
  /** live 시간 적용 */
  liveDateTime?: InputMaybe<Scalars['String']>;
  /** 유저 프로필 아이디 */
  profileId: Scalars['String'];
  /** 알림 제목 */
  title: Scalars['String'];
  /** 알림 UI */
  uiType: NotificationUiType;
  /** 유저 아이디 */
  userId?: InputMaybe<Scalars['String']>;
  /** 웹 링크 URL */
  webLinkPath?: InputMaybe<Scalars['String']>;
};

/** CreateOrderCardInput 카드사 정보 등록 */
export type CreateOrderCardInput = {
  /** 카드사 코드 */
  code: Scalars['String'];
  /** 사용여부 */
  enabled: Scalars['Boolean'];
  /** 이미지 정보 */
  icon: ImageInfoInput;
  /** 카드사 이름 */
  name: Scalars['String'];
};

/** 베송정보 입력 */
export type CreateOrderDeliveryInput = {
  /** 주소 */
  addr: Scalars['String'];
  /** 상세 주소 */
  addrDetail?: InputMaybe<Scalars['String']>;
  /** 쿠폰 배송 할인 정보 */
  couponDiscount?: InputMaybe<OrderDiscountInput>;
  /** 요청사항 */
  deliveryRequest: Scalars['String'];
  /** 배송비 */
  shippingPrice: MoneyInput;
  /** 배송지 유저 정보 */
  userInfo: CreateOrderUserInfoInput;
  /** 우편번호 */
  zipcode: Scalars['String'];
};

/** CreateOrderInput 주문서 등록 입력 */
export type CreateOrderInput = {
  /** 쿠폰 주문 할인 정보 */
  couponDiscount?: InputMaybe<OrderDiscountInput>;
  /** 배송정보 옵션 */
  delivery?: InputMaybe<CreateOrderDeliveryInput>;
  /** 주문코드 */
  orderId: Scalars['String'];
  /** 주문 아이템 */
  orderItems: Array<CreateOrderItemInput>;
  /** 결제정보 */
  payment: CreateOrderPaymentInput;
  /** 수강자 프로필 ID */
  profileId: Scalars['String'];
  /** 유저정보 */
  userInfo: CreateOrderUserInfoInput;
};

export type CreateOrderItemInput = {
  /** 쿠폰 할인 정보 */
  couponDiscount?: InputMaybe<OrderDiscountInput>;
  /** 원래 가격 */
  originPrice: MoneyInput;
  /** 상품 Id */
  productId: Scalars['String'];
  /** 상품 이미지 */
  productImage: ImageInfoInput;
  /** 상품 이름 */
  productName: Scalars['String'];
  /** 구매 타입 */
  productPurchaseType: OrderProductPurchaseType;
  /** 프로모션 할인 정보 */
  promotionDiscount?: InputMaybe<OrderDiscountInput>;
  /** 프로모션 가격 */
  promotionPrice: MoneyInput;
  /** 개수 */
  qty: Scalars['Int'];
  /** 스케줄 그룹 ID */
  scheduleGroupId: Scalars['String'];
};

export type CreateOrderPaymentInput = {
  /** 카드 개월수 */
  cardQuota: OrderCardQuotaType;
  /** 결제수단 Code */
  payMethod: OrderPayMethodType;
  /** PG 제공사 */
  pgProvider: OrderPgProviderType;
  /** 총 주문금액 */
  totalPrice: MoneyInput;
};

/** 유저 정보 */
export type CreateOrderUserInfoInput = {
  /** 이메일 */
  email: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
  /** 휴대전화 */
  phone: Scalars['String'];
};

export type CreatePlatClassifierInput = {
  /** 데이터 (이미지 데이터 주소, 텍스트, 소리 데이터 주소 등) */
  dataset: Array<Scalars['String']>;
  /** 라벨명 */
  label: Scalars['String'];
};

export type CreateProjectInput = {
  codeType: ProjectCodeType;
  jsonData?: InputMaybe<Scalars['String']>;
  thumb?: InputMaybe<ImageInfoInput>;
  title: Scalars['String'];
  userKey: Scalars['String'];
};

export type CreateQuestionChoiceInput = {
  /** 정답 여부 */
  isCorrect: Scalars['Boolean'];
  /** 보기 내용 */
  text: Scalars['String'];
};

export type CreateQuestionInput = {
  /** 선택지 */
  choices: Array<CreateQuestionChoiceInput>;
  /** 해설 */
  commentary: Scalars['String'];
  /** 난이도 */
  difficulty: QuizQuestionDifficultyType;
  /** 힌트 */
  hint: Scalars['String'];
  /** 서브 질문 내용 */
  subText?: InputMaybe<Scalars['String']>;
  /** 학습 대상 */
  target: QuizQuestionTargetType;
  /** 질문 내용 */
  text: Scalars['String'];
  /** 유형 (객관식, 주관식) */
  type: QuizQuestionType;
};

export type CreateQuizInput = {
  /** 질문 목록 */
  questionIds: Array<Scalars['ID']>;
  /** 제한 시간 */
  time: Scalars['Int'];
  /** 제목 */
  title: Scalars['String'];
};

export type CreateReviewInput = {
  comment: Scalars['String'];
  serviceId: Scalars['String'];
  serviceType: ReviewServiceType;
  title: Scalars['String'];
};

export type CreateReviewQnaInput = {
  comment: Scalars['String'];
  serviceId: Scalars['String'];
  serviceType: ReviewQnaServiceType;
  title: Scalars['String'];
};

export type CreateReviewReplyInput = {
  comment: Scalars['String'];
  reviewId: Scalars['String'];
};

export type CreateScheduleGroupRelateTutorInput = {
  /** 스케줄 그룹 ID */
  id: Scalars['String'];
  /** 튜터 ID */
  tutorId: Scalars['String'];
};

export type CreateSearchIndexInput = {
  indexType: SearchIndexType;
  serviceId?: InputMaybe<Scalars['String']>;
};

export type CreateStatLessonInput = {
  cContent?: InputMaybe<Scalars['Int']>;
  cRetry?: InputMaybe<Scalars['Int']>;
  cSuccess?: InputMaybe<Scalars['Int']>;
  eTime: Scalars['String'];
  lessonContentId: Scalars['String'];
  lessonId: Scalars['String'];
  ownerId?: InputMaybe<Scalars['String']>;
  questionType?: InputMaybe<StatQuestionType>;
  sTime: Scalars['String'];
};

export type CreateStatViewInput = {
  curriculumId: Scalars['String'];
  lessonId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateUploadImageInput = {
  id: Scalars['String'];
  image: ImageInfoInput;
  serviceType: UploadImageServiceType;
};

/** CreateUserContactInput 고객 1:1 등록 */
export type CreateUserContactInput = {
  /** 설명 */
  description: Scalars['String'];
  /** 파일목록 */
  files?: InputMaybe<Array<FileInput>>;
  /** 제목 */
  name: Scalars['String'];
  /** 주문 ID */
  orderId?: InputMaybe<Scalars['String']>;
  /** 분류 타입 */
  type: UserContactType;
};

/** CreateUserCsInput 고객 CS 등록 */
export type CreateUserCsInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  type: UserCsType;
  userId: Scalars['String'];
};

/** CreateUserInput 회원가입 */
export type CreateUserInput = {
  avatar?: InputMaybe<ImageInfoInput>;
  birth: Scalars['String'];
  email: Scalars['String'];
  identityCode: Scalars['String'];
  loginType: UserLoginType;
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

/** CreateUserSocialInput 소셜 회원가입 */
export type CreateUserSocialInput = {
  avatar?: InputMaybe<ImageInfoInput>;
  birth: Scalars['String'];
  identityCode: Scalars['String'];
  loginType: UserLoginType;
  name: Scalars['String'];
  phone: Scalars['String'];
  socialAuthCode: Scalars['String'];
};

/** 비디오 생성 인풋 */
export type CreateVideoInput = {
  /** 재생 시간 */
  durationInSec?: InputMaybe<Scalars['Int']>;
  /** job 고유 아이디 (s3 업로드를 통한 미디어컨버터가 동작할때 생성되는 아이디로 Optional 값이다) */
  jobId?: InputMaybe<Scalars['String']>;
  /** 언어 ID */
  languageId?: InputMaybe<Scalars['String']>;
  /** 파일명 */
  name: Scalars['String'];
  /** 제공 업체 */
  providerType: ContentProviderType;
  /** raw 데이터 */
  raw?: InputMaybe<Scalars['String']>;
  /** 작업 상태 */
  statusType: ContentVideoStatusType;
  /** 비디오 스트리밍 주소 */
  url?: InputMaybe<Scalars['String']>;
};

/** 국제 통화 타입 */
export enum CurrencyType {
  /** Korea Won */
  Krw = 'KRW'
}

export type CurriculumRelateLessonInput = {
  idx?: InputMaybe<Scalars['Int']>;
  lessonId: Scalars['String'];
  summary?: InputMaybe<Scalars['String']>;
};

export type CursorInfo = {
  __typename?: 'CursorInfo';
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export enum CusorType {
  After = 'AFTER',
  Before = 'BEFORE'
}

export type DataAnalyzerActivityInput = {
  id: Scalars['String'];
  pdf?: InputMaybe<DataAnalyzerActivityPdfInput>;
  type: DataAnalyzerActivityType;
  vod?: InputMaybe<Scalars['String']>;
  youtube?: InputMaybe<DataAnalyzerActivityYoutubeInput>;
};

export type DataAnalyzerActivityPdfInput = {
  page: Scalars['Int'];
};

export enum DataAnalyzerActivityType {
  Coding = 'CODING',
  Pdf = 'PDF',
  Quiz = 'QUIZ',
  TextBook = 'TEXT_BOOK',
  Vod = 'VOD'
}

export type DataAnalyzerActivityYoutubeInput = {
  current: Scalars['Int'];
  duration: Scalars['Int'];
};

export enum DataAnalyzerLifeEventType {
  Add = 'ADD',
  Sync = 'SYNC'
}

export enum DataPacketType {
  Lossy = 'LOSSY',
  Reliable = 'RELIABLE'
}

export enum DecorationType {
  BottomPosition = 'BOTTOM_POSITION',
  CenterPosition = 'CENTER_POSITION',
  CompletionKind = 'COMPLETION_KIND',
  TopPosition = 'TOP_POSITION'
}

export type DelClassroomLessonInput = {
  id: Scalars['ID'];
  lessonId: Scalars['String'];
};

export type DelClassroomStudentInput = {
  id: Scalars['ID'];
};

export type DeleteAiModel = {
  __typename?: 'DeleteAIModel';
  success: Scalars['Boolean'];
};

export type DeleteAiModelInput = {
  /** 모델 ID */
  id: Scalars['ID'];
};

export type DeleteActivityInput = {
  /** 액티비티 ID */
  id: Scalars['ID'];
};

export type DeleteActivitySupplementaryDataInput = {
  /** 액티비티 보조자료 ID */
  id: Scalars['ID'];
};

export type DeleteActivityVodItemInput = {
  /** 액티비티 VOD 아이템 ID */
  id: Scalars['ID'];
};

export type DeleteAppBannerInput = {
  id: Scalars['ID'];
};

export type DeleteBoardInput = {
  id: Scalars['ID'];
};

export type DeleteClassroomHomeworkInput = {
  classroomId: Scalars['String'];
  id: Scalars['ID'];
};

export type DeleteClassroomInput = {
  id: Scalars['ID'];
};

export type DeleteClassroomNoticeInput = {
  classroomId: Scalars['String'];
  id: Scalars['ID'];
};

export type DeleteClassroomStudentHomeworkInput = {
  id: Scalars['ID'];
};

export type DeleteCourseInput = {
  /** 코스 ID */
  id: Scalars['ID'];
};

export type DeleteCourseLessonInput = {
  /** 코스 ID */
  courseId: Scalars['String'];
  /** 레슨 ID */
  id: Scalars['ID'];
};

export type DeleteCourseMaterialInput = {
  /** 교육자료 ID */
  id: Scalars['ID'];
};

export type DeleteCourseMerchandiseInput = {
  /** 상품 ID */
  id: Scalars['ID'];
};

export type DeleteCourseParticipantInput = {
  /** 참여자 ID */
  id: Scalars['ID'];
};

export type DeleteCourseQuizInput = {
  /** 퀴즈 ID */
  id: Scalars['ID'];
};

export type DeleteCourseScheduleGroupInput = {
  /** 스케줄 그룹 ID */
  id: Scalars['String'];
};

export type DeleteCourseTagCategoryInput = {
  /** 카테고리 ID */
  id: Scalars['ID'];
};

export type DeleteCourseTagInput = {
  /** 태그 ID */
  id: Scalars['ID'];
};

export type DeleteCourseTutorScheduleGroupInput = {
  /** 튜터 스케줄그룹 ID */
  id: Scalars['String'];
};

export type DeleteCourseTutorScheduleInput = {
  /** 튜터 스케줄 ID */
  id: Scalars['String'];
};

/** 언어 삭제 인풋 */
export type DeleteLanguageInput = {
  /** 언어 ID */
  languageId: Scalars['String'];
};

/** 언어 삭제 결과 */
export type DeleteLanguageOutput = {
  __typename?: 'DeleteLanguageOutput';
  result: Scalars['Boolean'];
};

export type DeleteLessonCurriculumInput = {
  id: Scalars['ID'];
};

export type DeleteLessonCurriculumRelateInput = {
  curriculumId: Scalars['String'];
  lessonId: Scalars['String'];
};

export type DeleteLessonHardwareInput = {
  id: Scalars['ID'];
};

export type DeleteLessonInput = {
  id: Scalars['ID'];
};

export type DeleteLessonPlanContentInput = {
  id: Scalars['ID'];
  lessonId: Scalars['String'];
  lessonPlanId: Scalars['String'];
};

export type DeleteLessonPlanInput = {
  id: Scalars['ID'];
};

/** Modi 삭제 인풋 */
export type DeleteModiInput = {
  /** 고유 ID */
  id: Scalars['String'];
};

export type DeleteNotificationInput = {
  /** 뉴스 아이디 */
  id: Scalars['ID'];
};

/** DeleteOrderCardInput 카드사 정보 삭제 */
export type DeleteOrderCardInput = {
  id: Scalars['ID'];
};

export type DeleteProjectInput = {
  id: Scalars['ID'];
  userKey: Scalars['String'];
};

export type DeleteQuestionInput = {
  /** 퀴즈 문제 ID */
  id: Scalars['ID'];
};

export type DeleteReviewInput = {
  id: Scalars['String'];
};

export type DeleteReviewQnaInput = {
  id: Scalars['String'];
};

export type DeleteReviewReplyInput = {
  id: Scalars['String'];
};

/** DeleteUserContactInput 고객 1:1 삭제 */
export type DeleteUserContactInput = {
  /** Contact ID */
  id: Scalars['ID'];
};

/** DeleteUserCsInput 고객 CS 삭제 */
export type DeleteUserCsInput = {
  id: Scalars['ID'];
};

/** DeleteUserInput 회원삭제 */
export type DeleteUserInput = {
  id: Scalars['ID'];
  reason: Scalars['String'];
};

/** DeleteUserRevokeInput 회원삭제 취소하기 */
export type DeleteUserRevokeInput = {
  id: Scalars['ID'];
};

/** 비디오 삭제 인풋 */
export type DeleteVideoInput = {
  /** 비디오 ID */
  videoId: Scalars['String'];
};

/** 비디오 삭제 결과 */
export type DeleteVideoOutput = {
  __typename?: 'DeleteVideoOutput';
  result: Scalars['Boolean'];
};

/** 할인정보 */
export type Discount = {
  __typename?: 'Discount';
  /** 할인 타입 */
  type: DiscountType;
  /** 할인 값 */
  value: Scalars['Int'];
};

/** 할인정보 입력 */
export type DiscountInput = {
  /** 할인 타입 */
  type: DiscountType;
  /** 할인 값 */
  value: Scalars['Int'];
};

/** 할인 타입 */
export enum DiscountType {
  /** 퍼센트 */
  Percent = 'PERCENT',
  /** 값 */
  Value = 'VALUE'
}

/** 에듀 카테고리 메뉴 */
export type EduContentCategory = {
  __typename?: 'EduContentCategory';
  /** ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 잠금여부 */
  isLock: Scalars['Boolean'];
  /** 이름 */
  name: Scalars['String'];
  /** 서브 카테고리 리스트 */
  subCategories: Array<EduContentSubCategory>;
};

/** 컨텐츠 이미지 정보 */
export type EduContentImage = {
  __typename?: 'EduContentImage';
  /** 내용 */
  content: Scalars['String'];
  /** 이미지 */
  image: ImageInfo;
  /** 제목 */
  name: Scalars['String'];
};

/** 컨텐츠 이미지정보 */
export type EduContentImageInput = {
  /** 내용 */
  content: Scalars['String'];
  /** 이미지 */
  image: ImageInfoInput;
  /** 다국어 */
  languages: Array<EduContentLanguageInput>;
  /** 제목 */
  name: Scalars['String'];
};

/** 컨텐츠 언어 정보 */
export type EduContentLanguage = {
  __typename?: 'EduContentLanguage';
  /** 내용 */
  content: Scalars['String'];
  /** 언어타입 */
  langType: LangType;
  /** 이름 */
  name: Scalars['String'];
};

/** 컨텐츠 언어 정보 */
export type EduContentLanguageInput = {
  /** 내용 */
  content?: InputMaybe<Scalars['String']>;
  /** 언어타입 */
  langType: LangType;
  /** 이름 */
  name: Scalars['String'];
};

/** 에듀 서브 카테고리 메뉴 - 오른쪽 상단메뉴 */
export type EduContentSubCategory = {
  __typename?: 'EduContentSubCategory';
  /** ID */
  id: Scalars['ID'];
  /** 잠금여부 */
  isLock: Scalars['Boolean'];
  /** 서브 카테고리 이름 */
  name: Scalars['String'];
  /** 과목 리스트 */
  subjects: Array<EduContentSubject>;
};

/** 컨텐츠 과목 */
export type EduContentSubject = {
  __typename?: 'EduContentSubject';
  /** 색상 */
  color: Scalars['String'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 잠금여부 */
  isLock: Scalars['Boolean'];
  /** 제목 - 스토리텔링, 스토리 디자인 ... */
  name: Scalars['String'];
  /** 테마 리스트 */
  themes: Array<EduContentSubjectTheme>;
  /** 쌈네일 이미지 */
  thumbnail: ImageInfo;
};

/** 컨텐츠 과목 테마 */
export type EduContentSubjectTheme = {
  __typename?: 'EduContentSubjectTheme';
  /** 컨텐츠 이미지 리스트 */
  contentImages: Array<EduContentImage>;
  /** 순서 */
  idx: Scalars['Int'];
  /** 제목 - 소개, 업뎅리트 예정 등등 */
  name: Scalars['String'];
  /** 테마 타입 */
  type: EduContentSubjectThemeType;
};

/** 컨텐츠 과목 테마 타입 */
export enum EduContentSubjectThemeType {
  /** 단일 컨텐츠 */
  ContentOnly = 'CONTENT_ONLY',
  /** 잠금 테마 */
  Lock = 'LOCK'
}

export type EndCourseLessonInput = {
  /** 방 이름 */
  roomName: Scalars['String'];
  /** 스케줄 ID */
  scheduleId: Scalars['String'];
};

/** 레슨 종료 결과 */
export type EndCourseLessonOutput = {
  __typename?: 'EndCourseLessonOutput';
  /** 결과 */
  result: Scalars['Boolean'];
};

export type EnrollLessonCurriculumInput = {
  curriculumId: Scalars['String'];
};

export type EnterCourseLessonInput = {
  /** 방 이름 */
  roomName: Scalars['String'];
  /** 스케줄 ID */
  scheduleId: Scalars['String'];
};

/** 레슨 입장 결과 */
export type EnterCourseLessonOutput = {
  __typename?: 'EnterCourseLessonOutput';
  /** 토큰 */
  token: Scalars['String'];
};

/** 강의 입장 output */
export type EnterCourseOutput = {
  __typename?: 'EnterCourseOutput';
  /** 토큰 */
  token: Scalars['String'];
};

export enum FileExtType {
  Jpg = 'JPG',
  Pdf = 'PDF',
  Png = 'PNG',
  Zip = 'ZIP'
}

export type FileInfo = {
  __typename?: 'FileInfo';
  ext: FileExtType;
  idx: Scalars['Int'];
  key: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type FileInput = {
  langType: LangType;
  name: Scalars['String'];
  rawFile?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type GenerateNotificationInput = {
  /** 유저 프로필 아이디 */
  profileId: Scalars['String'];
};

/** 위치 정보 */
export type GeoLocation = {
  __typename?: 'GeoLocation';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  timestamp: Scalars['String'];
};

/** 위치 정보 */
export type GeoLocationInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  timestamp: Scalars['String'];
};

export type HelloSaidEvent = {
  __typename?: 'HelloSaidEvent';
  id: Scalars['String'];
  msg: Scalars['String'];
};

export type ImageInfo = {
  __typename?: 'ImageInfo';
  domain: Scalars['String'];
  height: Scalars['Int'];
  idx: Scalars['Int'];
  key: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type ImageInfoInput = {
  height?: InputMaybe<Scalars['Int']>;
  idx?: InputMaybe<Scalars['Int']>;
  rawFile?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type InterpreterFrame = {
  __typename?: 'InterpreterFrame';
  frame: Scalars['String'];
};

export type InterpreterV2Frame = {
  __typename?: 'InterpreterV2Frame';
  frame: Scalars['String'];
};

export type InterpreterV2Modi = {
  index: Scalars['Int'];
  name: Scalars['String'];
  type: Scalars['String'];
  uuid: Scalars['String'];
};

export type Jwt = {
  __typename?: 'JWT';
  accessToken: Scalars['String'];
  expiresIn: Scalars['Int'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
};

export enum LangType {
  Cn = 'CN',
  De = 'DE',
  En = 'EN',
  Jp = 'JP',
  Ko = 'KO',
  Pl = 'PL'
}

export type Lesson = Node & {
  __typename?: 'Lesson';
  answerCode: Scalars['String'];
  bgImg: ImageInfo;
  classTime: Scalars['Int'];
  color: Scalars['String'];
  createdAt: Scalars['String'];
  creationType: LessonCodingCreationType;
  describe: Scalars['String'];
  elementJson: Scalars['String'];
  epubUrl: Scalars['String'];
  files: Array<FileInfo>;
  groupType: LessonGroupType;
  id: Scalars['ID'];
  idx: Scalars['Int'];
  isEdit: Scalars['Boolean'];
  isStart: Scalars['Boolean'];
  languages: Array<LessonLanguage>;
  lessonPlans: Array<LessonPlan>;
  levelType: LessonLevelType;
  lockType: TrueFalseType;
  mainImgs: Array<ImageInfo>;
  openType: OpenType;
  ownerId: Scalars['String'];
  ownerName: Scalars['String'];
  progressRate: Scalars['Int'];
  serviceType: LessonServiceType;
  startTime: Scalars['String'];
  startType: ClassroomLessonStartType;
  subTitle: Scalars['String'];
  summary: LessonSummary;
  tags: Array<Scalars['String']>;
  textColor: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  userActivity: UserActivity;
  userId: Scalars['String'];
  videoType: LessonVideoType;
  videoURL: Scalars['String'];
};

export enum LessonBookConnectionField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Popularity = 'POPULARITY'
}

export type LessonCategory = {
  __typename?: 'LessonCategory';
  title: Scalars['String'];
  total: Scalars['Int'];
};

export type LessonCategoryWhere = {
  serviceType: LessonServiceType;
};

export enum LessonCodingCreationType {
  BingoMachine = 'BINGO_MACHINE',
  CrocodileTeeth = 'CROCODILE_TEETH',
  Fishing = 'FISHING',
  Free = 'FREE',
  Helicopter = 'HELICOPTER',
  Joytrope = 'JOYTROPE',
  LedMetronium = 'LED_METRONIUM',
  LedTimer = 'LED_TIMER',
  Lighthouse = 'LIGHTHOUSE',
  MonsterTruck = 'MONSTER_TRUCK',
  MoodLamp = 'MOOD_LAMP',
  PirateShip = 'PIRATE_SHIP',
  RandomRoulette = 'RANDOM_ROULETTE',
  RcCar = 'RC_CAR',
  RotatingPencilHolder = 'ROTATING_PENCIL_HOLDER',
  Safe = 'SAFE',
  SurfingBot = 'SURFING_BOT',
  TongsArm = 'TONGS_ARM'
}

export enum LessonCodingType {
  EntryCoding = 'ENTRY_CODING',
  PymodiCoding = 'PYMODI_CODING',
  ScratchCoding = 'SCRATCH_CODING'
}

export type LessonConnection = {
  __typename?: 'LessonConnection';
  edges: Array<Maybe<LessonEdge>>;
  nodes: Array<Maybe<Lesson>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum LessonConnectionField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Like = 'Like',
  Popularity = 'POPULARITY'
}

export type LessonConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field: LessonConnectionField;
};

export type LessonConnectionWhere = {
  classroomId?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Scalars['String']>;
  groupType?: InputMaybe<LessonGroupType>;
  lang?: InputMaybe<LangType>;
  lessonIds?: InputMaybe<Array<Scalars['String']>>;
  levelType?: InputMaybe<LessonLevelType>;
  openType?: InputMaybe<OpenType>;
  recommendBestLesson?: InputMaybe<LessonRecommendBestWhere>;
  recommendNextLesson?: InputMaybe<LessonRecommendNextWhere>;
  recommendOtherTeacherLesson?: InputMaybe<LessonRecommendOtherTeacherWhere>;
  recommendSimilarityLesson?: InputMaybe<LessonRecommendSimilarityWhere>;
  recommendType?: InputMaybe<LessonRecommendType>;
  recommendUserLesson?: InputMaybe<LessonRecommendUserWhere>;
  serviceType?: InputMaybe<LessonServiceType>;
  serviceTypes?: InputMaybe<Array<LessonServiceType>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  user?: InputMaybe<Scalars['String']>;
  userActionType?: InputMaybe<LessonUserActionType>;
};

export type LessonCurriculum = Node & {
  __typename?: 'LessonCurriculum';
  bgImg: ImageInfo;
  color: Scalars['String'];
  createdAt: Scalars['String'];
  describe: Scalars['String'];
  groupType: LessonGroupType;
  id: Scalars['ID'];
  idx: Scalars['Int'];
  label: Scalars['String'];
  labelColor: Scalars['String'];
  languages: Array<LessonCurriculumLanguage>;
  lessons: Array<Lesson>;
  levelType: LessonLevelType;
  mainImgs: Array<ImageInfo>;
  openType: OpenType;
  ownerId: Scalars['String'];
  ownerName: Scalars['String'];
  serviceType: LessonServiceType;
  subTitle: Scalars['String'];
  summary: LessonSummary;
  tags: Array<Scalars['String']>;
  textColor: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  userActivity: UserActivity;
  viewType: LessonViewType;
};

export type LessonCurriculumConnection = {
  __typename?: 'LessonCurriculumConnection';
  edges: Array<Maybe<LessonCurriculumEdge>>;
  nodes: Array<Maybe<LessonCurriculum>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum LessonCurriculumConnectionField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Like = 'Like',
  Popularity = 'POPULARITY'
}

export type LessonCurriculumConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field: LessonCurriculumConnectionField;
};

export type LessonCurriculumConnectionWhere = {
  curriculumIds?: InputMaybe<Array<Scalars['String']>>;
  filter?: InputMaybe<Scalars['String']>;
  groupType?: InputMaybe<LessonGroupType>;
  lang?: InputMaybe<LangType>;
  levelType?: InputMaybe<LessonLevelType>;
  openType?: InputMaybe<OpenType>;
  serviceType?: InputMaybe<LessonServiceType>;
  serviceTypes?: InputMaybe<Array<LessonServiceType>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  user?: InputMaybe<Scalars['String']>;
  userActionType?: InputMaybe<LessonUserActionType>;
};

export type LessonCurriculumEdge = {
  __typename?: 'LessonCurriculumEdge';
  cursor: Scalars['String'];
  node: LessonCurriculum;
};

export type LessonCurriculumLanguage = {
  __typename?: 'LessonCurriculumLanguage';
  describe: Scalars['String'];
  label: Scalars['String'];
  langType: LangType;
  subTitle: Scalars['String'];
  title: Scalars['String'];
};

export type LessonCurriculumLanguageInput = {
  describe?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  langType: LangType;
  subTitle?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type LessonCurriculumWhere = {
  id: Scalars['ID'];
  lang?: InputMaybe<LangType>;
  user?: InputMaybe<Scalars['String']>;
};

export type LessonEdge = {
  __typename?: 'LessonEdge';
  cursor: Scalars['String'];
  node: Lesson;
};

export type LessonGroup = {
  __typename?: 'LessonGroup';
  date: Scalars['String'];
  nodes: Array<Maybe<Lesson>>;
};

export type LessonGroupConnection = {
  __typename?: 'LessonGroupConnection';
  group: Array<Maybe<LessonGroup>>;
};

export type LessonGroupConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
};

export type LessonGroupConnectionWhere = {
  classroomId: Scalars['String'];
};

export type LessonGroupLabel = {
  __typename?: 'LessonGroupLabel';
  label: Scalars['String'];
  type: LessonGroupType;
};

export enum LessonGroupType {
  ElementBeginningGroup = 'ELEMENT_BEGINNING_GROUP',
  ElementHighGroup = 'ELEMENT_HIGH_GROUP',
  HighSchoolerGroup = 'HIGH_SCHOOLER_GROUP',
  MiddleSchoolerGroup = 'MIDDLE_SCHOOLER_GROUP',
  NoneGroup = 'NONE_GROUP',
  PreSchoolerGroup = 'PRE_SCHOOLER_GROUP'
}

export type LessonHardware = Node & {
  __typename?: 'LessonHardware';
  createdAt: Scalars['String'];
  hardwareType: LessonHardwareType;
  id: Scalars['ID'];
  idx: Scalars['Int'];
  mainImg: ImageInfo;
  subTitle: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type LessonHardwareGroup = {
  __typename?: 'LessonHardwareGroup';
  hardwareType: LessonHardwareType;
  nodes: Array<LessonHardware>;
  title: Scalars['String'];
};

export enum LessonHardwareType {
  HelloAiHardware = 'HELLO_AI_HARDWARE',
  MicrobitHardware = 'MICROBIT_HARDWARE',
  Modi1Hardware = 'MODI1_HARDWARE',
  Modi2Hardware = 'MODI2_HARDWARE',
  NoneHardware = 'NONE_HARDWARE',
  RaspberryHardware = 'RASPBERRY_HARDWARE'
}

export type LessonHardwareWhere = {
  id: Scalars['ID'];
};

export enum LessonIndexType {
  Lesson = 'LESSON',
  LessonCurriculum = 'LESSON_CURRICULUM'
}

export type LessonLanguage = {
  __typename?: 'LessonLanguage';
  describe: Scalars['String'];
  label: Scalars['String'];
  langType: LangType;
  subTitle: Scalars['String'];
  title: Scalars['String'];
};

export type LessonLanguageInput = {
  describe?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  langType: LangType;
  subTitle?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export enum LessonLanguageType {
  En = 'EN',
  Jp = 'JP',
  Ko = 'KO'
}

export type LessonLevelLabel = {
  __typename?: 'LessonLevelLabel';
  label: Scalars['String'];
  type: LessonLevelType;
};

export enum LessonLevelType {
  BeginningLevel = 'BEGINNING_LEVEL',
  HighLevel = 'HIGH_LEVEL',
  IntermediateLevel = 'INTERMEDIATE_LEVEL',
  NoneLevel = 'NONE_LEVEL'
}

export enum LessonOpenType {
  All = 'ALL',
  Close = 'CLOSE',
  Open = 'OPEN'
}

export type LessonPlan = Node & {
  __typename?: 'LessonPlan';
  contents: Array<LessonPlanContent>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  idx: Scalars['Int'];
  lessonId: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  viewType: LessonPlanViewType;
};

export type LessonPlanContent = Node & {
  __typename?: 'LessonPlanContent';
  doneDate: Scalars['String'];
  id: Scalars['ID'];
  idx: Scalars['Int'];
  isDone: Scalars['Boolean'];
  lessonId: Scalars['String'];
  lessonPlanId: Scalars['String'];
  template: LessonPlanContentTemplate;
  templates: Array<Maybe<LessonPlanContentTemplate>>;
  title: Scalars['String'];
  type: LessonPlanContentType;
  viewType: LessonPlanContentViewType;
};

export type LessonPlanContentConnection = {
  __typename?: 'LessonPlanContentConnection';
  edge: LessonPlanContentEdge;
  pageInfo: PageInfo;
  progress: LessonProgress;
  totalCount: Scalars['Int'];
};

export type LessonPlanContentConnectionInput = {
  eTime: Scalars['String'];
  lessonContentId: Scalars['String'];
  lessonId: Scalars['String'];
  ownerId: Scalars['String'];
  sTime: Scalars['String'];
};

export type LessonPlanContentConnectionWhere = {
  id?: InputMaybe<Scalars['ID']>;
  lang?: InputMaybe<LangType>;
  lessonId: Scalars['String'];
};

export type LessonPlanContentEdge = {
  __typename?: 'LessonPlanContentEdge';
  afterCursor: Scalars['String'];
  beforeCursor: Scalars['String'];
  node: LessonPlanContent;
  nodes: Array<Maybe<LessonPlanContent>>;
};

export type LessonPlanContentInput = {
  templates?: InputMaybe<Array<LessonPlanContentTemplateInput>>;
  title: Scalars['String'];
  type: LessonPlanContentType;
  viewType: LessonPlanContentViewType;
};

export type LessonPlanContentTemplate = LessonPlanContentTemplateBase | LessonPlanContentTemplateCoding | LessonPlanContentTemplateImage | LessonPlanContentTemplateText | LessonPlanContentTemplateVideo;

export type LessonPlanContentTemplateBase = {
  __typename?: 'LessonPlanContentTemplateBase';
  content: Scalars['String'];
  coordinate: Coordinate;
  id: Scalars['ID'];
  idx: Scalars['Int'];
  img: ImageInfo;
  type: LessonPlanDataType;
};

export type LessonPlanContentTemplateBaseInput = {
  content: Scalars['String'];
  coordinate?: InputMaybe<CoordinateInput>;
  img?: InputMaybe<ImageInfoInput>;
};

export type LessonPlanContentTemplateCoding = {
  __typename?: 'LessonPlanContentTemplateCoding';
  answerCode: Scalars['String'];
  answerImgs: Array<ImageInfo>;
  codingType: LessonCodingType;
  coordinate: Coordinate;
  creationType: LessonCodingCreationType;
  hardwareType: LessonHardwareType;
  hardwareTypes: Array<LessonHardware>;
  id: Scalars['ID'];
  idx: Scalars['Int'];
  initCode: Scalars['String'];
  purpose: Scalars['String'];
  questions: Array<Scalars['String']>;
  type: LessonPlanDataType;
};

export type LessonPlanContentTemplateCodingInput = {
  answerCode: Scalars['String'];
  answerImgs?: InputMaybe<Array<ImageInfoInput>>;
  codingType: LessonCodingType;
  coordinate?: InputMaybe<CoordinateInput>;
  creationType: LessonCodingCreationType;
  hardwareTypes?: InputMaybe<Array<Scalars['String']>>;
  initCode: Scalars['String'];
  purpose: Scalars['String'];
  questions?: InputMaybe<Array<Scalars['String']>>;
};

export type LessonPlanContentTemplateImage = {
  __typename?: 'LessonPlanContentTemplateImage';
  coordinate: Coordinate;
  decorationTypes: Array<DecorationType>;
  id: Scalars['ID'];
  idx: Scalars['Int'];
  img: ImageInfo;
  isReverse: Scalars['Boolean'];
  type: LessonPlanDataType;
};

export type LessonPlanContentTemplateImageInput = {
  coordinate?: InputMaybe<CoordinateInput>;
  img?: InputMaybe<ImageInfoInput>;
  isReverse?: InputMaybe<Scalars['Boolean']>;
};

export type LessonPlanContentTemplateInput = {
  base?: InputMaybe<LessonPlanContentTemplateBaseInput>;
  coding?: InputMaybe<LessonPlanContentTemplateCodingInput>;
  image?: InputMaybe<LessonPlanContentTemplateImageInput>;
  text?: InputMaybe<LessonPlanContentTemplateTextInput>;
  video?: InputMaybe<LessonPlanContentTemplateVideoInput>;
};

export type LessonPlanContentTemplateText = {
  __typename?: 'LessonPlanContentTemplateText';
  content: Scalars['String'];
  coordinate: Coordinate;
  id: Scalars['ID'];
  idx: Scalars['Int'];
  type: LessonPlanDataType;
};

export type LessonPlanContentTemplateTextInput = {
  content: Scalars['String'];
  coordinate?: InputMaybe<CoordinateInput>;
};

export type LessonPlanContentTemplateVideo = {
  __typename?: 'LessonPlanContentTemplateVideo';
  coordinate: Coordinate;
  id: Scalars['ID'];
  idx: Scalars['Int'];
  thumbImg: ImageInfo;
  type: LessonPlanDataType;
  videoType: LessonVideoType;
  videoURL: Scalars['String'];
};

export type LessonPlanContentTemplateVideoInput = {
  coordinate?: InputMaybe<CoordinateInput>;
  thumbImg: ImageInfoInput;
  videoType: LessonVideoType;
  videoURL: Scalars['String'];
};

export enum LessonPlanContentType {
  BaseContent = 'BASE_CONTENT',
  MultiContent = 'MULTI_CONTENT',
  NoneContent = 'NONE_CONTENT',
  VideoContent = 'VIDEO_CONTENT'
}

export enum LessonPlanContentViewType {
  CodingView = 'CODING_VIEW',
  HorizonFullVerticalDownHalfView = 'HORIZON_FULL_VERTICAL_DOWN_HALF_VIEW',
  HorizonFullVerticalFullView = 'HORIZON_FULL_VERTICAL_FULL_VIEW',
  HorizonFullView = 'HORIZON_FULL_VIEW',
  NoneView = 'NONE_VIEW',
  NormalView = 'NORMAL_VIEW',
  PracticeCodingView = 'PRACTICE_CODING_VIEW',
  SlideView = 'SLIDE_VIEW',
  VerticalFullHorizonRightHalfView = 'VERTICAL_FULL_HORIZON_RIGHT_HALF_VIEW',
  VerticalFullView = 'VERTICAL_FULL_VIEW',
  VerticalTwoFullView = 'VERTICAL_TWO_FULL_VIEW',
  VideoView = 'VIDEO_VIEW'
}

export enum LessonPlanDataType {
  Base = 'BASE',
  Coding = 'CODING',
  Image = 'IMAGE',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type LessonPlanLayout = Node & {
  __typename?: 'LessonPlanLayout';
  id: Scalars['ID'];
  idx: Scalars['Int'];
  image: ImageInfo;
  title: Scalars['String'];
  type: LessonPlanLayoutType;
};

export enum LessonPlanLayoutType {
  HorizonFull = 'HORIZON_FULL',
  HorizonFullVerticalDownHalf = 'HORIZON_FULL_VERTICAL_DOWN_HALF',
  HorizonFullVerticalFull = 'HORIZON_FULL_VERTICAL_FULL',
  Normal = 'NORMAL',
  VerticalFull = 'VERTICAL_FULL',
  VerticalFullHorizonRightHalf = 'VERTICAL_FULL_HORIZON_RIGHT_HALF',
  VerticalTwoFull = 'VERTICAL_TWO_FULL'
}

export enum LessonPlanViewType {
  LessonPlanNoneView = 'LESSON_PLAN_NONE_VIEW',
  LessonPlanSlideView = 'LESSON_PLAN_SLIDE_VIEW'
}

export type LessonProgress = {
  __typename?: 'LessonProgress';
  current: Scalars['Int'];
  progress: Scalars['Int'];
  progressRate: Scalars['Int'];
  total: Scalars['Int'];
};

export type LessonRecommendBestWhere = {
  month: Scalars['Int'];
  year: Scalars['Int'];
};

export type LessonRecommendNextWhere = {
  lessonId: Scalars['String'];
};

export type LessonRecommendOtherTeacherWhere = {
  lessonId: Scalars['String'];
};

export type LessonRecommendSimilarityWhere = {
  lessonId: Scalars['String'];
};

export enum LessonRecommendType {
  LessonOtherTeacherRecommend = 'LESSON_OTHER_TEACHER_RECOMMEND',
  LessonSimiarlityRecommend = 'LESSON_SIMIARLITY_RECOMMEND',
  LessonUserRecommend = 'LESSON_USER_RECOMMEND'
}

export type LessonRecommendUserWhere = {
  userId?: InputMaybe<Scalars['String']>;
};

export enum LessonServiceType {
  BrickPack = 'BRICK_PACK',
  Cengage = 'CENGAGE',
  Lms = 'LMS',
  MakingPack = 'MAKING_PACK',
  NoneType = 'NONE_TYPE'
}

export type LessonSummary = {
  __typename?: 'LessonSummary';
  codingTypes: Array<LessonCodingType>;
  elements: Array<LessonSummaryElementType>;
  goals: Array<Scalars['String']>;
  hardwareTypes: Array<LessonHardware>;
  intro: Scalars['String'];
  outputs: Array<Scalars['String']>;
  recommendTarget: Scalars['String'];
  summary: Scalars['String'];
};

export enum LessonSummaryElementType {
  AbstractElement = 'ABSTRACT_ELEMENT',
  AlgorithmElement = 'ALGORITHM_ELEMENT',
  AnalysisElement = 'ANALYSIS_ELEMENT',
  AutomationElement = 'AUTOMATION_ELEMENT',
  DataStructureElement = 'DATA_STRUCTURE_ELEMENT',
  ParallelismElement = 'PARALLELISM_ELEMENT',
  SimulationElement = 'SIMULATION_ELEMENT'
}

export type LessonSummaryInput = {
  codingTypes?: InputMaybe<Array<LessonCodingType>>;
  elements?: InputMaybe<Array<LessonSummaryElementType>>;
  goals?: InputMaybe<Array<Scalars['String']>>;
  hardwareTypes?: InputMaybe<Array<Scalars['String']>>;
  intro?: InputMaybe<Scalars['String']>;
  outputs?: InputMaybe<Array<Scalars['String']>>;
  recommendTarget?: InputMaybe<Scalars['String']>;
};

export type LessonUploadFileInput = {
  file: Scalars['String'];
  functionType: LessonUploadFileType;
  id?: InputMaybe<Scalars['String']>;
};

export enum LessonUploadFileType {
  Data = 'DATA'
}

export enum LessonUserActionType {
  LessonDoneAction = 'LESSON_DONE_ACTION',
  LessonFavoriteAction = 'LESSON_FAVORITE_ACTION',
  LessonLikeAction = 'LESSON_LIKE_ACTION',
  LessonOwnerAction = 'LESSON_OWNER_ACTION',
  LessonRegisterAction = 'LESSON_REGISTER_ACTION'
}

export type LessonVideo = Node & {
  __typename?: 'LessonVideo';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  idx: Scalars['Int'];
  lang: LangType;
  serviceId: Scalars['String'];
  serviceType: VideoServiceType;
  updatedAt: Scalars['String'];
  video: VideoInfo;
};

export type LessonVideoConnection = {
  __typename?: 'LessonVideoConnection';
  edges: Array<Maybe<LessonVideoEdge>>;
  nodes: Array<Maybe<LessonVideo>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum LessonVideoConnectionField {
  CreatedAt = 'CREATED_AT'
}

export type LessonVideoConnectionOrder = {
  field: LessonVideoConnectionField;
};

export type LessonVideoConnectionWhere = {
  lang?: InputMaybe<LangType>;
  serviceIds?: InputMaybe<Array<Scalars['String']>>;
  serviceType?: InputMaybe<LessonServiceType>;
};

export type LessonVideoEdge = {
  __typename?: 'LessonVideoEdge';
  cursor: Scalars['String'];
  node: LessonVideo;
};

export enum LessonVideoGroupType {
  DashIsoGroup = 'DASH_ISO_GROUP',
  HlsGroup = 'HLS_GROUP'
}

export enum LessonVideoType {
  Dash = 'DASH',
  Hls = 'HLS',
  None = 'NONE',
  Youtube = 'YOUTUBE'
}

export enum LessonViewType {
  BigSlideView = 'BIG_SLIDE_VIEW',
  CardView = 'CARD_VIEW',
  ListView = 'LIST_VIEW',
  None = 'NONE',
  PageView = 'PAGE_VIEW',
  SlideView = 'SLIDE_VIEW'
}

export type LessonWhere = {
  id: Scalars['ID'];
  lang?: InputMaybe<LangType>;
  user?: InputMaybe<Scalars['String']>;
};

export enum LikeServiceType {
  Curriculum = 'CURRICULUM',
  Lesson = 'LESSON'
}

/** 라이브 레슨 참여자 */
export type LiveLessonParticipant = {
  __typename?: 'LiveLessonParticipant';
  identity: Scalars['String'];
  isPublisher: Scalars['Boolean'];
  joinedAt: Scalars['Int'];
  metadata: Scalars['String'];
  name: Scalars['String'];
  sid: Scalars['String'];
  state: LivekitParticipantStateType;
  tracks: Array<LivekitTrack>;
};

export type LiveLessonParticipantsInput = {
  /** 방 이름 */
  roomName: Scalars['String'];
};

export type LivekitCodec = {
  __typename?: 'LivekitCodec';
  fmtpLine: Scalars['String'];
  mime: Scalars['String'];
};

export type LivekitCreateRoomInput = {
  /** 생성할 방 이름 */
  roomName: Scalars['String'];
};

export type LivekitCreateTokenInput = {
  /** 유저 아이디 */
  identity: Scalars['String'];
  /** 유저 이름 */
  name: Scalars['String'];
  /** 권한 */
  permission: LivekitPermissionType;
  /** 접속할 방 이름 */
  roomName: Scalars['String'];
};

export type LivekitDeleteRoomInput = {
  /** 삭제할 방 이름 */
  roomName: Scalars['String'];
};

export type LivekitGetJoinTokenInput = {
  /** 유저 아이디 */
  identity: Scalars['String'];
  /** 유저 이름 */
  name: Scalars['String'];
  /** 접속할 방 이름 */
  roomName: Scalars['String'];
};

export type LivekitListParticipantsInput = {
  /** 방 이름 */
  roomName: Scalars['String'];
};

export type LivekitMuteParticipantInput = {
  /** 삭제할 참가자 */
  identity: Scalars['String'];
  /** 음소거 설정 (mute: true / unmute: false) */
  muted: Scalars['Boolean'];
  /** 참가자가 속한 방 이름 */
  roomName: Scalars['String'];
  /** 트랙 아이디 */
  trackSid: Scalars['String'];
};

export type LivekitParticipant = {
  __typename?: 'LivekitParticipant';
  identity: Scalars['String'];
  isPublisher: Scalars['Boolean'];
  joinedAt: Scalars['Int'];
  metadata: Scalars['String'];
  name: Scalars['String'];
  sid: Scalars['String'];
  state: LivekitParticipantStateType;
  tracks: Array<LivekitTrack>;
};

export enum LivekitParticipantStateType {
  Active = 'ACTIVE',
  Disconnected = 'DISCONNECTED',
  Joined = 'JOINED',
  Joining = 'JOINING'
}

export enum LivekitPermissionType {
  Admin = 'ADMIN',
  Tutor = 'TUTOR',
  User = 'USER'
}

export type LivekitRemoveParticipantInput = {
  /** 삭제할 참가자 */
  identity: Scalars['String'];
  /** 삭제할 참가자가 속한 방 이름 */
  roomName: Scalars['String'];
};

export type LivekitRoom = {
  __typename?: 'LivekitRoom';
  creation_time: Scalars['Int'];
  empty_timeout: Scalars['Int'];
  enableCodecs: Array<LivekitCodec>;
  maxParticipants: Scalars['Int'];
  metadata: Scalars['String'];
  name: Scalars['String'];
  numParticipants: Scalars['Int'];
  sid: Scalars['String'];
  turnPassword: Scalars['String'];
};

export type LivekitSendDataInput = {
  /** 전달할 데이터 */
  data: Scalars['String'];
  /** 타겟 */
  destinationSids: Array<Scalars['String']>;
  /** 패킷 타입 */
  kind: DataPacketType;
  /** 방 이름 */
  room: Scalars['String'];
};

export type LivekitTrack = {
  __typename?: 'LivekitTrack';
  disableDtx: Scalars['Boolean'];
  height: Scalars['Int'];
  layers: Array<LivekitVideoLayer>;
  mimeType: Scalars['String'];
  muted: Scalars['Boolean'];
  name: Scalars['String'];
  sid: Scalars['String'];
  simulcast: Scalars['Boolean'];
  source: LivekitTrackSourceType;
  type: LivekitTrackType;
  width: Scalars['Int'];
};

export enum LivekitTrackSourceType {
  Camera = 'CAMERA',
  Microphone = 'MICROPHONE',
  ScreenShare = 'SCREEN_SHARE',
  ScreenShareAudio = 'SCREEN_SHARE_AUDIO',
  Unknown = 'UNKNOWN'
}

export enum LivekitTrackType {
  Audio = 'AUDIO',
  Data = 'DATA',
  Video = 'VIDEO'
}

export type LivekitUpdateParticipantInput = {
  /** 유저 아이디 */
  identity: Scalars['String'];
  /** 방 메타데이터 */
  metadata: Scalars['String'];
  /** 유저 이름 */
  name: Scalars['String'];
  /** 방 이름 */
  room: Scalars['String'];
};

export type LivekitUpdateParticipantOutput = {
  __typename?: 'LivekitUpdateParticipantOutput';
  participant: LivekitParticipant;
};

export type LivekitUpdateRoomMetadataInput = {
  /** 방 메타데이터 */
  metadata: Scalars['String'];
  /** 방 이름 */
  room: Scalars['String'];
};

export type LivekitUpdateRoomMetadataOutput = {
  __typename?: 'LivekitUpdateRoomMetadataOutput';
  room: LivekitRoom;
};

export type LivekitVideoLayer = {
  __typename?: 'LivekitVideoLayer';
  bitrate: Scalars['Int'];
  height: Scalars['Int'];
  quality: LivekitVideoQualityType;
  width: Scalars['Int'];
};

export enum LivekitVideoQualityType {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

export type LoginClassroomInput = {
  password: Scalars['String'];
  userId: Scalars['String'];
};

/** LoginSocialUserInput 소셜로그인 */
export type LoginSocialUserInput = {
  loginType: UserLoginType;
  redirectURL: Scalars['String'];
  socialAuthCode: Scalars['String'];
};

/** LoginUserInput 일반 로그인 */
export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum MachineLearningType {
  /** 강화학습 */
  ReinforcementLearning = 'REINFORCEMENT_LEARNING',
  /** 지도학습 */
  SupervisedLearning = 'SUPERVISED_LEARNING',
  /** 비지도학습 */
  UnsupervisedLearning = 'UNSUPERVISED_LEARNING'
}

/** 쿠폰 */
export type MarketingCoupon = {
  __typename?: 'MarketingCoupon';
  /** 등록 날짜 */
  createdAt: Scalars['String'];
  /** 할인정보 */
  discount: Discount;
  /** 다운로드 수량 */
  downloadCount: Scalars['Int'];
  /** 종료 시간 */
  endTime: Scalars['String'];
  /** ID */
  id: Scalars['ID'];
  /** 발급 타입 */
  issuerTarget: MarketingCouponIssuerTarget;
  /** 발급 수량 */
  issuerVolume: Scalars['Int'];
  /** 발급 수량 타입 */
  issuerVolumeType: MarketingCouponIssuerVolumeType;
  /** 최대 할인 금액 */
  maxDiscountPrice: Money;
  /** 최소 주문 금액 */
  minOrderPrice: Money;
  /** 이름 */
  name: Scalars['String'];
  /** 쿠폰 범위 타입 */
  scopeType: MarketingCouponScopeType;
  /** 시작 시간 */
  startTime: Scalars['String'];
  /** 상태 */
  status: MarketingCouponStatus;
  /** 사용완료 수량 */
  usedCount: Scalars['Int'];
  /** 사용완료 금액 */
  usedPrice: Money;
  /** 쿠폰 variantID */
  variantId: Scalars['String'];
};

/** 쿠폰 리스트 */
export type MarketingCouponConnection = {
  __typename?: 'MarketingCouponConnection';
  edges: Array<MarketingCouponEdges>;
  nodes: Array<MarketingCoupon>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum MarketingCouponConnectionField {
  Id = 'ID',
  Name = 'Name'
}

/** 쿠폰 리스트 순서 */
export type MarketingCouponConnectionOrder = {
  field: MarketingCouponConnectionField;
};

/** 쿠폰 리스트 조건 */
export type MarketingCouponConnectionWhere = {
  endTimeGT?: InputMaybe<Scalars['String']>;
  /** 종료날짜 ex) 2006-01-02T15:04:05Z */
  endTimeLT?: InputMaybe<Scalars['String']>;
  /** 발행 타켓 */
  issuerTarget?: InputMaybe<MarketingCouponIssuerTargetInput>;
  /** 쿠폰 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 시작날짜 ex) 2006-01-02T15:04:05Z */
  startTimeGT?: InputMaybe<Scalars['String']>;
  startTimeLT?: InputMaybe<Scalars['String']>;
  /** 쿠폰 상태 */
  status?: InputMaybe<Array<MarketingCouponStatus>>;
};

/** 쿠폰 다운로드 */
export type MarketingCouponDownload = {
  __typename?: 'MarketingCouponDownload';
  /** 남은 기간 */
  availableDay: Scalars['Int'];
  /** 쿠폰 ID */
  couponId: Scalars['String'];
  /** 등록날짜 */
  createdAt: Scalars['String'];
  /** 할인정보 */
  discount: Discount;
  /** 종료 시간 */
  endTime: Scalars['String'];
  /** ID */
  id: Scalars['ID'];
  /** 최대 할인 금액 */
  maxDiscountPrice: Money;
  /** 최소 주문 금액 */
  minOrderPrice: Money;
  /** 이름 */
  name: Scalars['String'];
  /** 쿠폰 범위 타입 */
  scopeType: MarketingCouponScopeType;
  /** 시작 시간 */
  startTime: Scalars['String'];
  /** 상태 */
  status: MarketingCouponStatus;
  /** 수정날짜 */
  updatedAt: Scalars['String'];
  /** 유저 ID */
  userId: Scalars['String'];
};

/** 쿠폰 다운로드 리스트 */
export type MarketingCouponDownloadConnection = {
  __typename?: 'MarketingCouponDownloadConnection';
  edges: Array<MarketingCouponDownloadEdges>;
  nodes: Array<MarketingCouponDownload>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum MarketingCouponDownloadConnectionField {
  Id = 'ID',
  Name = 'Name'
}

/** 쿠폰 다운로드 리스트 순서 */
export type MarketingCouponDownloadConnectionOrder = {
  field: MarketingCouponDownloadConnectionField;
};

/** 쿠폰 다운로드 리스트 조건 */
export type MarketingCouponDownloadConnectionWhere = {
  endTimeGT?: InputMaybe<Scalars['String']>;
  /** 종료날짜 ex) 2006-01-02T15:04:05Z */
  endTimeLT?: InputMaybe<Scalars['String']>;
  /** 쿠폰 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 시작날짜 ex) 2006-01-02T15:04:05Z */
  startTimeGT?: InputMaybe<Scalars['String']>;
  startTimeLT?: InputMaybe<Scalars['String']>;
  /** 쿠폰 상태 */
  status?: InputMaybe<Array<MarketingCouponStatus>>;
};

/** 쿠폰 다운로드 엣지 */
export type MarketingCouponDownloadEdges = {
  __typename?: 'MarketingCouponDownloadEdges';
  cursor: Scalars['String'];
  node: MarketingCouponDownload;
};

/** 쿠폰 엣지 */
export type MarketingCouponEdges = {
  __typename?: 'MarketingCouponEdges';
  cursor: Scalars['String'];
  node: MarketingCoupon;
};

/** 쿠폰 발급값 시스템 조건타입 정의 */
export enum MarketingCouponIssuerSystemConditionType {
  /** 없음 */
  Null = 'NULL',
  /** 회원가입 */
  Signup = 'SIGNUP'
}

/** 쿠폰 발급 대상 정보 */
export type MarketingCouponIssuerTarget = {
  __typename?: 'MarketingCouponIssuerTarget';
  /** 발급 타입 */
  issuerType: MarketingCouponIssuerType;
  /** 발급 타입 값 */
  values?: Maybe<Array<Scalars['String']>>;
};

/** 쿠폰 발급 대상 정보 */
export type MarketingCouponIssuerTargetInput = {
  /** 시스템 쿠폰 발급 조건 */
  issuerSystemConditionType?: InputMaybe<MarketingCouponIssuerSystemConditionType>;
  /** 발급 타입 */
  issuerType: MarketingCouponIssuerType;
  /** 발급 타입 값 */
  values?: InputMaybe<Array<Scalars['String']>>;
};

/** 쿠폰 발급 타입 */
export enum MarketingCouponIssuerType {
  /** 전체 - 마케팅 노출을 통한 적용 */
  All = 'ALL',
  /** 이벤트 - 시스템 다운로드 */
  System = 'SYSTEM',
  /** 유저 - 자동 다운로드 */
  User = 'USER'
}

/** 쿠폰 발행 수량 타입 */
export enum MarketingCouponIssuerVolumeType {
  /** 수량 제한 */
  Limit = 'LIMIT',
  /** 무제한 */
  Unlimited = 'UNLIMITED'
}

/** 쿠폰 적용 유형 */
export enum MarketingCouponScopeType {
  /** 배송비 적용 */
  Delivery = 'DELIVERY',
  /** 주문 적용 */
  Order = 'ORDER',
  /** 상품 적용 */
  Product = 'PRODUCT'
}

/** 마케팅 쿠폰 상태 */
export enum MarketingCouponStatus {
  /** 종료 */
  Close = 'CLOSE',
  /** 만료 */
  Expire = 'EXPIRE',
  /** 진행중 */
  Ongoing = 'ONGOING',
  /** 대기 */
  Ready = 'READY',
  /** 사용 취소 */
  UsedCancel = 'USED_CANCEL',
  /** 사용 완료 */
  UsedComplete = 'USED_COMPLETE'
}

/** 마케팅 제품 */
export type MarketingProduct = {
  __typename?: 'MarketingProduct';
  /** 상품 ID */
  id: Scalars['ID'];
  /** 이미지 경로 */
  imageUrl: Scalars['String'];
  /** 상품명 */
  name: Scalars['String'];
  /** 기본 가격 */
  originPrice: Money;
  /** 프로모션 가격 */
  promotionPrice: Money;
};

/** 프로모션 상세 */
export type MarketingPromotion = {
  __typename?: 'MarketingPromotion';
  /** 할인정보 */
  discount: Discount;
  /** 종료 시간 */
  endTime: Scalars['String'];
  /** ID */
  id: Scalars['ID'];
  /** 이름 */
  name: Scalars['String'];
  products?: Maybe<Array<MarketingProduct>>;
  /** 프로모션 스코프 전체 or 상품 */
  scopeType: MarketingPromotionScopeType;
  /** 시작 시간 */
  startTime: Scalars['String'];
  /** 상태 */
  status: MarketingPromotionStatus;
};

/** 마케팅 프로모션 리스트 */
export type MarketingPromotionConnection = {
  __typename?: 'MarketingPromotionConnection';
  edges: Array<MarketingPromotionEdges>;
  nodes: Array<MarketingPromotion>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum MarketingPromotionConnectionField {
  Id = 'ID',
  Name = 'Name'
}

/** 프로모션 리스트 순서 */
export type MarketingPromotionConnectionOrder = {
  field: MarketingPromotionConnectionField;
};

/** 프로모션 리스트 조건 */
export type MarketingPromotionConnectionWhere = {
  /** 프로모션 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 상품 ID */
  productId?: InputMaybe<Scalars['String']>;
};

/** 마케팅 프로모션 엣지 */
export type MarketingPromotionEdges = {
  __typename?: 'MarketingPromotionEdges';
  cursor: Scalars['String'];
  node: MarketingPromotion;
};

/** 프로모션 적용 상품 범위 */
export enum MarketingPromotionScopeType {
  /** 전체 상품 */
  All = 'ALL',
  /** 여러 상품 */
  Multi = 'MULTI'
}

/** 마케팅 프로모션 상태 */
export enum MarketingPromotionStatus {
  /** 강제 종료 */
  Close = 'CLOSE',
  /** 만료 */
  Expire = 'EXPIRE',
  /** 진행중 */
  Ongoing = 'ONGOING',
  /** 대기 */
  Ready = 'READY'
}

/** 프로모션 상세 조회 */
export type MarketingPromotionWhere = {
  id: Scalars['ID'];
};

export type MaterialInput = {
  /** 레슨 ID */
  lessonId: Scalars['String'];
  /** 자료 이름 */
  name: Scalars['String'];
  /** 유형 (TUTOR 또는 PARTICIPANT) */
  type: CourseLessonMaterialType;
  /** 자료 경로 */
  url: Scalars['String'];
};

export enum MediaProgressStatus {
  Complete = 'COMPLETE',
  Progressing = 'PROGRESSING'
}

/** Modi 정보 */
export type Modi = {
  __typename?: 'Modi';
  /** 펌웨어 버전 (S/W) */
  appVersion: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 고유 ID */
  id: Scalars['ID'];
  /** 위치정보 */
  location?: Maybe<GeoLocation>;
  /** 부트로더 버전 (S/W) */
  osVersion: Scalars['String'];
  /** Modi 유형 ID */
  typeId: Scalars['String'];
  /** Modi 유형 정보 */
  typeInfo?: Maybe<ModiTypeInfo>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** 기기 고유 ID */
  uuid: Scalars['String'];
};

/** Modi 목록 조회 */
export type ModiConnection = {
  __typename?: 'ModiConnection';
  /** Modi 목록 */
  nodes: Array<Modi>;
  /** Modi 총 개수 */
  totalCount: Scalars['Int'];
};

/** Modi 목록 정렬 조건 */
export type ModiConnectionOrder = {
  /** 정렬 방향 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 정렬 항목 */
  field?: InputMaybe<ModiOrderFieldType>;
};

/** Modi 목록 조회 조건 */
export type ModiConnectionWhere = {
  /** Modi 모듈 유형 (INPUT, OUTPUT 등..) */
  entityTypes?: InputMaybe<Array<ModiModuleEntityType>>;
  /** 키워드 (uuid, app version, os version) */
  keyword?: InputMaybe<Scalars['String']>;
  /** Modi 하드웨어 버전 (MODI1 or MODI2) */
  productVersionTypes?: InputMaybe<Array<ModiProductVersionType>>;
  /** Modi 유형 */
  types?: InputMaybe<Array<ModiType>>;
};

/** Modi Entity 유형 */
export enum ModiModuleEntityType {
  Input = 'INPUT',
  Output = 'OUTPUT',
  Setup = 'SETUP',
  Template = 'TEMPLATE'
}

/** Modi 목록 정렬 필드 유형 */
export enum ModiOrderFieldType {
  /** 생성일 */
  CreatedAt = 'CREATED_AT',
  /** 고유 ID */
  Id = 'ID'
}

/** Modi 하드웨어 유형 */
export enum ModiProductVersionType {
  Modi1 = 'MODI1',
  Modi2 = 'MODI2'
}

/** Modi 유형 */
export enum ModiType {
  Battery = 'BATTERY',
  Button = 'BUTTON',
  Dial = 'DIAL',
  Display = 'DISPLAY',
  Environment = 'ENVIRONMENT',
  Gyroscope = 'GYROSCOPE',
  Ir = 'IR',
  Led = 'LED',
  Mic = 'MIC',
  Motor = 'MOTOR',
  Network = 'NETWORK',
  Speaker = 'SPEAKER',
  Ultrasonic = 'ULTRASONIC'
}

/** Modi 유형 정보 */
export type ModiTypeInfo = {
  __typename?: 'ModiTypeInfo';
  /** Modi Entity 유형 */
  entityType: ModiModuleEntityType;
  /** Modi 하드웨어 유형 */
  productVersionType: ModiProductVersionType;
  /** Modi 모듈 유형 */
  type: ModiType;
};

/** Modi 조회 조건 */
export type ModiWhere = {
  /** 고유 ID */
  id: Scalars['String'];
};

/** 금액 */
export type Money = {
  __typename?: 'Money';
  /** 금액 */
  amount: Scalars['Int'];
  /** 국제 통화 타입 - 추후를 위해서 미리 정의함 */
  currencyType: CurrencyType;
};

/** 금액 입력 */
export type MoneyInput = {
  /** 금액 */
  amount: Scalars['Int'];
  /** 국제 통화 타입 - 추후를 위해서 미리 정의함 */
  currencyType: CurrencyType;
};

/** MultiUploadFileInput 복수 파일 업로드 Input */
export type MultiUploadFileInput = {
  files: Array<Scalars['Upload']>;
  functionType: UploadFileType;
  id?: InputMaybe<Scalars['String']>;
};

/** 비디오 멀티 업로드 인풋 */
export type MultiUploadVideoInput = {
  files: Array<Scalars['Upload']>;
};

/** 멀티 비디오 업로드 결과 */
export type MultiUploadVideoOutput = {
  __typename?: 'MultiUploadVideoOutput';
  status: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addClassroomLessons: Scalars['Boolean'];
  addClassroomStudents: Scalars['Boolean'];
  addDataAnalyzer: Scalars['Boolean'];
  /** 계정추가 */
  addUserProfile: User;
  /** 관리자 레슨 입장 */
  adminEnterCourseLesson: EnterCourseLessonOutput;
  /** [사용자] 쿠폰 적용 */
  applyMarketingCoupon: MarketingCouponDownload;
  /** 신청 수락 (admin 전용) */
  approveCourseApplication: Scalars['Boolean'];
  /** 퀴즈 문제 자동 생성 */
  autoCreateQuestion: Scalars['Int'];
  /** 신청 취소 (admin 전용) */
  cancelCourseApplication: Scalars['Boolean'];
  /** 주문결제 완료 */
  completeOrderPayment: Order;
  /** [관리자] 주문요청(취소, 반품, 제품회수, 교환)등 완료 */
  completeOrderRequest: Order;
  /** 액티비티 vod 아이템(핀) 확인 */
  confirmActivityVodItem: Scalars['Boolean'];
  /** 인증 문자 확인 */
  confirmUserAuthFromSms: Scalars['Boolean'];
  /** 모디 등록 or 수정 (Upsert) */
  connectModi: Modi;
  /** 오픈룸 예약 취소 */
  courseCancelReservationOpenRoom: CourseCancelReservationOpenRoomOutput;
  /** 오픈룸 종료하기 (호스트 전용) */
  courseCompleteOpenRoom: CourseCompleteOpenRoomOutput;
  /** 오픈룸 만들기 (즉시 or 예약) */
  courseCreateOpenRoom: CourseCreateOpenRoomOutput;
  /** 오픈룸 입장하기 (토큰 발급) */
  courseJoinOpenRoom: CourseJoinOpenRoomOutput;
  /** 오픈룸 공유자료 업로드 */
  courseUploadOpenRoomSharedFile: CourseUploadOpenRoomSharedFileOutput;
  /** 액티비티 생성 */
  createActivity: CourseActivity;
  /** 보조자료 생성 */
  createActivitySupplementaryData: CourseSupplementaryData;
  /** 액티비티 VOD 아이템 생성 */
  createActivityVodItem: CourseVodItem;
  createAppBanner: Scalars['Boolean'];
  createBoardData: Scalars['ID'];
  createBoardFaq: Scalars['ID'];
  createBoardNotice: Scalars['ID'];
  createClassroom: Scalars['String'];
  createClassroomHomework: Scalars['String'];
  createClassroomNotice: Scalars['String'];
  createClassroomStudentHomework: Scalars['String'];
  /** 코스 생성 */
  createCourse: Course;
  /** 레슨 생성 */
  createCourseLesson: CourseLesson;
  /** 교육자료 생성 */
  createCourseMaterial: Array<CourseLessonMaterial>;
  /** 일반상품 생성 */
  createCourseMerchandise: CourseMerchandise;
  /** 수강생 등록 */
  createCourseParticipant: CourseParticipant;
  /** 학생 레슨(스케줄) 피드백 등록 */
  createCourseParticipantLessonFeedback: Scalars['Boolean'];
  /** 퀴즈 생성 */
  createCourseQuiz: CourseQuiz;
  /** 스케줄 생성 */
  createCourseSchedule: Array<CourseSchedule>;
  /** 스케줄그룹(클래스) 생성 */
  createCourseScheduleGroup: CourseScheduleGroup;
  /** 태그 생성 */
  createCourseTag: CourseTag;
  /** 태그 유형 생성 */
  createCourseTagCategory: CourseTagCategory;
  /** 튜터 생성 */
  createCourseTutor: CourseTutor;
  /** 튜터 스케줄그룹 등록 */
  createCourseTutorScheduleGroup: CourseTutorScheduleGroup;
  /** 카테고리 등록 */
  createEduContentCategory: Array<EduContentCategory>;
  /** 서브 카테고리 등록 */
  createEduContentSubCategory: Array<EduContentCategory>;
  /** 과목 등록 */
  createEduContentSubject: Array<EduContentCategory>;
  /** 과목 테마 등록 */
  createEduContentSubjectTheme: Array<EduContentCategory>;
  /** 프레임 생성(Binary Array) */
  createInterpreterFrame: InterpreterFrame;
  /** 프레임 생성(Binary Array) 셋업, 코드표현 */
  createInterpreterFrameFromExpressions: InterpreterFrame;
  /** 프레임 생성(Binary Array) 코드 전체 */
  createInterpreterFrameFromSource: InterpreterFrame;
  createInterpreterScratchFrame: InterpreterV2Frame;
  createInterpreterV2Frame: InterpreterV2Frame;
  /** 언어 생성 */
  createLanguage: ContentLanguage;
  createLesson: Scalars['String'];
  createLessonAllIndex: Scalars['Boolean'];
  createLessonBest: Scalars['Boolean'];
  createLessonCurriculum: Scalars['String'];
  createLessonCurriculumRelate: Scalars['Boolean'];
  createLessonHardware: LessonHardware;
  createLessonPlan: LessonPlan;
  createLessonPlanContent: LessonPlanContent;
  createLessonPlanPDF: LessonPlan;
  /** [관리자] 쿠폰 등록 */
  createMarketingCoupon: MarketingCoupon;
  /** [관리자] 프로모션 등록 */
  createMarketingPromotion: MarketingPromotion;
  /** 주문서 등록 */
  createOrder: Order;
  /** [관리자] 카드사 정보 등록 */
  createOrderCards: Array<OrderCard>;
  createProject: Project;
  /** 퀴즈 문제 생성 */
  createQuestion: QuizQuestion;
  /** 퀴즈 생성 */
  createQuiz: Quiz;
  createReview: Review;
  createReviewReply: Reply;
  /** 클래스에 튜터 수동 배정 */
  createScheduleGroupRelateTutor: Scalars['Boolean'];
  createStatLesson: Scalars['Boolean'];
  createStatView: Scalars['Boolean'];
  /** @deprecated Use `singleUploadFile or multiUploadFile`. */
  createUploadImage: ImageInfo;
  /** @deprecated Use `singleUploadFile or multiUploadFile`. */
  createUploadImages: Array<ImageInfo>;
  /** 회원 가입 */
  createUser: User;
  /** 인덱스 */
  createUserAllIndex: Scalars['Boolean'];
  /** 회원 1:1문의 등록 */
  createUserContact: UserContact;
  /** 회원 CS 작성 */
  createUserCs: UserCs;
  /** 소셜 회원 가입 */
  createUserSocial: User;
  /** 비디오 생성 */
  createVideo: ContentVideo;
  delClassroomLessons: Scalars['Boolean'];
  delClassroomStudents: Scalars['Boolean'];
  deleteAIModel: DeleteAiModel;
  /** 액티비티 삭제 (액티비티 연결 제거) */
  deleteActivity: Scalars['Boolean'];
  /** 보조자료 삭제 */
  deleteActivitySupplementaryData: Scalars['Boolean'];
  /** 액티비티 VOD 아이템 삭제 */
  deleteActivityVodItem: Scalars['Boolean'];
  deleteAppBanner: Scalars['Boolean'];
  deleteBoardData: Scalars['ID'];
  deleteBoardFaq: Scalars['ID'];
  deleteBoardNotice: Scalars['ID'];
  deleteClassroom: Scalars['Boolean'];
  deleteClassroomHomework: Scalars['Boolean'];
  deleteClassroomNotice: Scalars['Boolean'];
  deleteClassroomStudentHomework: Scalars['Boolean'];
  /** 코스 삭제 */
  deleteCourse: Scalars['Boolean'];
  /** 레슨 삭제 */
  deleteCourseLesson: Scalars['Boolean'];
  /** 교육자료 삭제 */
  deleteCourseMaterial: Scalars['Boolean'];
  /** 일반상품 삭제 */
  deleteCourseMerchandise: Scalars['Boolean'];
  /** 수강생 삭제 */
  deleteCourseParticipant: Scalars['Boolean'];
  /** 퀴즈 삭제 */
  deleteCourseQuiz: Scalars['Boolean'];
  /** 스케줄그룹(클래스) 삭제 */
  deleteCourseScheduleGroup: Scalars['Boolean'];
  /** 태그 삭제 */
  deleteCourseTag: Scalars['Boolean'];
  /** 태그 유형 삭제 */
  deleteCourseTagCategory: Scalars['Boolean'];
  /** 튜터 스케줄 삭제 */
  deleteCourseTutorSchedule: Scalars['Boolean'];
  /** 튜터 스케줄그룹 삭제 */
  deleteCourseTutorScheduleGroup: Scalars['Boolean'];
  /** 언어 삭제 */
  deleteLanguage: DeleteLanguageOutput;
  deleteLesson: Scalars['Boolean'];
  deleteLessonCurriculum: Scalars['Boolean'];
  deleteLessonCurriculumRelate: Scalars['Boolean'];
  deleteLessonHardware: Scalars['Boolean'];
  deleteLessonPlan: Scalars['Boolean'];
  deleteLessonPlanContent: Scalars['Boolean'];
  /** 모디 삭제 */
  deleteModi: Scalars['Boolean'];
  /** [관리자] 카드사 정보 삭제 */
  deleteOrderCard: Array<OrderCard>;
  deleteProject: Scalars['Boolean'];
  /** 퀴즈 문제 삭제 */
  deleteQuestion: Scalars['Boolean'];
  deleteReview: Scalars['Boolean'];
  deleteReviewReply: Scalars['Boolean'];
  /** 회원 삭제 */
  deleteUser: Scalars['Boolean'];
  /** 회원 1:1문의 삭제 */
  deleteUserContact: Scalars['Boolean'];
  /** 회원 CS 삭제 */
  deleteUserCs: Scalars['Boolean'];
  /** 회원 삭제 복구 */
  deleteUserRevoke: Scalars['Boolean'];
  /** 비디오 삭제 */
  deleteVideo: DeleteVideoOutput;
  /** 레슨 종료 (튜터 전용) */
  endCourseLesson: EndCourseLessonOutput;
  enrollLessonCurriculum: Scalars['Boolean'];
  /** 레슨 입장 */
  enterCourseLesson: EnterCourseLessonOutput;
  /** 알림 생성 */
  generateNotifications: Scalars['Int'];
  /** 방 생성 */
  livekitCreateRoom: LivekitRoom;
  /**
   * 방 삭제
   * 방을 종료하고 참가자를 내보낸다.
   */
  livekitDeleteRoom: Scalars['Boolean'];
  /** 참여자 mute/unmute (requires `roomAdmin`) */
  livekitMuteParticipant: Scalars['Boolean'];
  /**
   * 강제 퇴장
   * 특정 참가자를 방에서 강제로 퇴장시긴다.
   */
  livekitRemoveParticipant: Scalars['Boolean'];
  /** 데이터 전송 */
  livekitSendData: Scalars['Boolean'];
  /** 참여자 정보 업데이트. 같은 방의 모든 참여자에게 broadcast. (requires `roomAdmin`) */
  livekitUpdateParticipant: LivekitUpdateParticipantOutput;
  /** 방의 메타데이터 업데이트 (requires `roomAdmin`) */
  livekitUpdateRoomMetadata: LivekitUpdateRoomMetadataOutput;
  loginClassroom: ClassroomLogin;
  /** 소셜 로그인 */
  loginSocialUser: Jwt;
  /** 로그인 */
  loginUser: Jwt;
  /** 로그아웃 */
  logoutUser: Scalars['Boolean'];
  multiUploadFile: Array<Scalars['String']>;
  /** 비디오 멀티 업로드 (VOD 가능한 형태로 컨버팅 처리됨) */
  multiUploadVideo: MultiUploadVideoOutput;
  /** 라이브 수업의 참여자 mute/unmute (admin 권한 필요) */
  muteLiveLessonParticipant: Scalars['Boolean'];
  /** 알림 메시지 발행 */
  publishNotifications: Scalars['Boolean'];
  /** 프로필 토큰 재발행 */
  reTokenUser: Jwt;
  /** 알림 읽음 상태로 변경 */
  readNotification: Notification;
  refreshClassroomToken: ClassroomLogin;
  /** 라이브 수업의 참여자 강제퇴장 (admin 권한 필요) */
  removeLiveLessonParticipant: Scalars['Boolean'];
  /** 계정삭제 */
  removeUserProfile: User;
  /** 코스 신청 */
  requestCourse: RequestCourseOutput;
  /** 신청 요청 (외부강사양성교육, 외부강사등록 등) */
  requestCourseApplication: CourseApplication;
  /** 주문 요청 */
  requestOrder: Order;
  /** 주문코드 요청 */
  requestOrderCode: Scalars['String'];
  /** 인증 문자 발송 */
  requestUserAuthToSms: Scalars['Boolean'];
  /** 아이디 찾기 - 문자발송 */
  requestUserEmailToSms: Scalars['Boolean'];
  /** 비밀번호 찾기 - 문자발송 */
  requestUserPasswordToSms: Scalars['Boolean'];
  resetClassroomStudentTempPassword: Scalars['String'];
  /** 회원 PicCode Reset */
  resetUserPinCode: Scalars['Boolean'];
  /** 회원 1:1문의 답변 */
  responseUserContact: UserContact;
  /** 회원 CS 응답 */
  responseUserCs: UserCs;
  saveAIModel: SaveAiModel;
  /** 라이브 방의 참여자에게 메시지 전송 */
  sendDataToLiveLessonParticipant: Scalars['Boolean'];
  /** 출석 해주세요 알림톡 전송 */
  sendKakaoMessageAttendanceRequest: Scalars['Boolean'];
  singleUploadFile: Scalars['String'];
  /** 비디오 업로드 (VOD 가능한 형태로 컨버팅 처리됨) */
  singleUploadVideo: SingleUploadVideoOutput;
  startClassroomLessonStudent: Scalars['Boolean'];
  /** 레슨 시작 (튜터 전용) */
  startCourseLesson: StartCourseLessonOutput;
  /** 퀴즈 시작 */
  startQuiz: StartQuizOutput;
  /** 퀴즈 문제 답안 제출 */
  submitQuestionAnswer: QuestionResultOutput;
  /** 퀴즈 문제 리포트 제출 */
  submitQuestionReport: SubmitQuestionReportOutput;
  /** 퀴즈 답안 제출 */
  submitQuizAnswer: SubmitQuizAnswerOutput;
  toggleLessonBookmark: Scalars['Boolean'];
  toggleLessonLike: Scalars['Boolean'];
  toggleStatLessonBookmark: Scalars['Boolean'];
  toggleStatLessonLike: Scalars['Boolean'];
  unenrollLessonCurriculum: Scalars['Boolean'];
  /** 알림 안읽음 상태로 변경 */
  unreadNotification: Notification;
  updateAIModel: UpdateAiModel;
  /** 액티비티 수정 */
  updateActivity: Scalars['Boolean'];
  /** 보조자료 수정 */
  updateActivitySupplementaryData: Scalars['Boolean'];
  /** 액티비티 VOD 아이템 수정 */
  updateActivityVodItem: Scalars['Boolean'];
  updateAppBanner: Scalars['Boolean'];
  updateBoardData: Scalars['ID'];
  updateBoardFaq: Scalars['ID'];
  updateBoardNotice: Scalars['ID'];
  updateClassroom: Scalars['Boolean'];
  updateClassroomHomework: Scalars['Boolean'];
  updateClassroomNotice: Scalars['Boolean'];
  updateClassroomStudentHomework: Scalars['Boolean'];
  updateClassroomStudentPassword: Scalars['Boolean'];
  updateClassroomToken: ClassroomLogin;
  /** 코스 수정 */
  updateCourse: Scalars['Boolean'];
  /** 출결 상태 수정 */
  updateCourseAttendanceResult: Scalars['Boolean'];
  /** 레슨 수정 */
  updateCourseLesson: Scalars['Boolean'];
  /** 일반상품 수정 */
  updateCourseMerchandise: Scalars['Boolean'];
  /** 수강생 업데이트 */
  updateCourseParticipant: Scalars['Boolean'];
  /** 퀴즈 수정 */
  updateCourseQuiz: Scalars['Boolean'];
  /** 스케줄그룹(클래스) 수정 */
  updateCourseScheduleGroup: Scalars['Boolean'];
  /** 튜터 정보 수정 */
  updateCourseTutor: Scalars['Boolean'];
  /** 튜터 스케줄 수정 */
  updateCourseTutorSchedule: Scalars['Boolean'];
  /** 튜터 스케줄그룹 수정 */
  updateCourseTutorScheduleGroup: Scalars['Boolean'];
  /** 언어 업데이트 */
  updateLanguage: ContentLanguage;
  updateLesson: Scalars['Boolean'];
  updateLessonCurriculum: Scalars['Boolean'];
  updateLessonHardware: LessonHardware;
  updateLessonPlan: LessonPlan;
  updateLessonPlanContent: LessonPlanContent;
  updateLessonPlanContentsIndex: Scalars['Boolean'];
  updateLessonPlansIndex: Scalars['Boolean'];
  /** 방 메타데이터 정보 업데이트 */
  updateLiveLessonMetadata: LivekitRoom;
  /** [관리자] 쿠폰 수정 */
  updateMarketingCoupon: MarketingCoupon;
  /** [관리자] 프로모션 수정 */
  updateMarketingPromotion: MarketingPromotion;
  /** [관리자] 주문 상태별 송장번호 등록 */
  updateOrderInvoice: Order;
  updateProject: Project;
  /** 퀴즈 문제 업데이트 */
  updateQuestion: QuizQuestion;
  updateReview: Review;
  updateReviewReply: Reply;
  /** 회원 수정 */
  updateUser: User;
  /** 회원 1:1문의 수정 */
  updateUserContact: UserContact;
  /** 회원 CS 수정 */
  updateUserCs: UserCs;
  /** 비밀번호 변경 */
  updateUserPassword: Scalars['Boolean'];
  /** 유저 핀코드 수정 */
  updateUserPinCode: Scalars['Boolean'];
  /** 회원정보 수정 */
  updateUserProfile: User;
  /** 비디오 업데이트 */
  updateVideo: ContentVideo;
  /** @deprecated Use `singleUploadFile or multiUploadFile`. */
  uploadFile: Scalars['String'];
};


export type MutationAddClassroomLessonsArgs = {
  input: Array<AddClassroomLessonInput>;
};


export type MutationAddClassroomStudentsArgs = {
  input: Array<AddClassroomStudentInput>;
};


export type MutationAddDataAnalyzerArgs = {
  input: Array<AddDataAnalyzerInput>;
};


export type MutationAddUserProfileArgs = {
  input: AddUserProfileInput;
};


export type MutationAdminEnterCourseLessonArgs = {
  input: EnterCourseLessonInput;
};


export type MutationApplyMarketingCouponArgs = {
  input: ApplyMarketingCouponInput;
};


export type MutationApproveCourseApplicationArgs = {
  input: ApproveCourseApplicationInput;
};


export type MutationAutoCreateQuestionArgs = {
  input: AutoCreateQuestionInput;
};


export type MutationCancelCourseApplicationArgs = {
  input: CancelCourseApplicationInput;
};


export type MutationCompleteOrderPaymentArgs = {
  input: CompleteOrderPaymentInput;
};


export type MutationCompleteOrderRequestArgs = {
  input: CompleteOrderRequestInput;
};


export type MutationConfirmActivityVodItemArgs = {
  input: ConfirmActivityVodItemInput;
};


export type MutationConfirmUserAuthFromSmsArgs = {
  input: ConfirmUserAuthFromSmsInput;
};


export type MutationConnectModiArgs = {
  input: ConnectModiInput;
};


export type MutationCourseCancelReservationOpenRoomArgs = {
  input: CourseCancelReservationOpenRoomInput;
};


export type MutationCourseCompleteOpenRoomArgs = {
  input: CourseCompleteOpenRoomInput;
};


export type MutationCourseCreateOpenRoomArgs = {
  input: CourseCreateOpenRoomInput;
};


export type MutationCourseJoinOpenRoomArgs = {
  input: CourseJoinOpenRoomInput;
};


export type MutationCourseUploadOpenRoomSharedFileArgs = {
  input: CourseUploadOpenRoomSharedFileInput;
};


export type MutationCreateActivityArgs = {
  input: CreateActivityInput;
};


export type MutationCreateActivitySupplementaryDataArgs = {
  input: CreateActivitySupplementaryDataInput;
};


export type MutationCreateActivityVodItemArgs = {
  input: CreateActivityVodItemInput;
};


export type MutationCreateAppBannerArgs = {
  input: CreateAppBannerInput;
};


export type MutationCreateBoardDataArgs = {
  input: CreateBoardDataInput;
};


export type MutationCreateBoardFaqArgs = {
  input: CreateBoardFaqInput;
};


export type MutationCreateBoardNoticeArgs = {
  input: CreateBoardNoticeInput;
};


export type MutationCreateClassroomArgs = {
  input: CreateClassroomInput;
};


export type MutationCreateClassroomHomeworkArgs = {
  input: CreateClassroomHomeworkInput;
};


export type MutationCreateClassroomNoticeArgs = {
  input: CreateClassroomNoticeInput;
};


export type MutationCreateClassroomStudentHomeworkArgs = {
  input: CreateClassroomStudentHomeworkInput;
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationCreateCourseLessonArgs = {
  input: CreateCourseLessonInput;
};


export type MutationCreateCourseMaterialArgs = {
  input: CreateCourseMaterialInput;
};


export type MutationCreateCourseMerchandiseArgs = {
  input: CreateCourseMerchandiseInput;
};


export type MutationCreateCourseParticipantArgs = {
  input: CreateCourseParticipantInput;
};


export type MutationCreateCourseParticipantLessonFeedbackArgs = {
  input: CreateCourseParticipantLessonFeedbackInput;
};


export type MutationCreateCourseQuizArgs = {
  input: CreateCourseQuizInput;
};


export type MutationCreateCourseScheduleArgs = {
  input: CreateCourseScheduleInput;
};


export type MutationCreateCourseScheduleGroupArgs = {
  input: CreateCourseScheduleGroupInput;
};


export type MutationCreateCourseTagArgs = {
  input: CreateCourseTagInput;
};


export type MutationCreateCourseTagCategoryArgs = {
  input: CreateCourseTagCategoryInput;
};


export type MutationCreateCourseTutorArgs = {
  input: CreateCourseTutorInput;
};


export type MutationCreateCourseTutorScheduleGroupArgs = {
  input: CreateCourseTutorScheduleGroupInput;
};


export type MutationCreateEduContentCategoryArgs = {
  input: CreateEduContentCategoryInput;
};


export type MutationCreateEduContentSubCategoryArgs = {
  input: CreateEduContentSubCategoryInput;
};


export type MutationCreateEduContentSubjectArgs = {
  input: CreateEduContentSubjectInput;
};


export type MutationCreateEduContentSubjectThemeArgs = {
  input: CreateEduContentSubjectThemeInput;
};


export type MutationCreateInterpreterFrameArgs = {
  input: CreateInterpreterFrameInput;
};


export type MutationCreateInterpreterFrameFromExpressionsArgs = {
  input: CreateInterpreterFrameFromExpressionsInput;
};


export type MutationCreateInterpreterFrameFromSourceArgs = {
  input: CreateInterpreterFrameFromSourceInput;
};


export type MutationCreateInterpreterScratchFrameArgs = {
  source: Scalars['String'];
};


export type MutationCreateInterpreterV2FrameArgs = {
  input: CreateInterpreterV2FrameInput;
};


export type MutationCreateLanguageArgs = {
  input: CreateLanguageInput;
};


export type MutationCreateLessonArgs = {
  input: CreateLessonInput;
};


export type MutationCreateLessonAllIndexArgs = {
  input: CreateLessonAllIndexInput;
};


export type MutationCreateLessonCurriculumArgs = {
  input: CreateLessonCurriculumInput;
};


export type MutationCreateLessonCurriculumRelateArgs = {
  input: CreateLessonCurriculumRelateInput;
};


export type MutationCreateLessonHardwareArgs = {
  input: CreateLessonHardwareInput;
};


export type MutationCreateLessonPlanArgs = {
  input: CreateLessonPlanInput;
};


export type MutationCreateLessonPlanContentArgs = {
  input: CreateLessonPlanContentInput;
};


export type MutationCreateLessonPlanPdfArgs = {
  input: CreateLessonPlanPdfInput;
};


export type MutationCreateMarketingCouponArgs = {
  input: CreateMarketingCouponInput;
};


export type MutationCreateMarketingPromotionArgs = {
  input: CreateMarketingPromotionInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateQuestionArgs = {
  input: CreateQuestionInput;
};


export type MutationCreateQuizArgs = {
  input: CreateQuizInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationCreateReviewReplyArgs = {
  input: CreateReviewReplyInput;
};


export type MutationCreateScheduleGroupRelateTutorArgs = {
  input: CreateScheduleGroupRelateTutorInput;
};


export type MutationCreateStatLessonArgs = {
  input: CreateStatLessonInput;
};


export type MutationCreateStatViewArgs = {
  input: CreateStatViewInput;
};


export type MutationCreateUploadImageArgs = {
  input?: InputMaybe<CreateUploadImageInput>;
};


export type MutationCreateUploadImagesArgs = {
  input: Array<InputMaybe<CreateUploadImageInput>>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserContactArgs = {
  input: CreateUserContactInput;
};


export type MutationCreateUserCsArgs = {
  input: CreateUserCsInput;
};


export type MutationCreateUserSocialArgs = {
  input: CreateUserSocialInput;
};


export type MutationCreateVideoArgs = {
  input: CreateVideoInput;
};


export type MutationDelClassroomLessonsArgs = {
  input: Array<DelClassroomLessonInput>;
};


export type MutationDelClassroomStudentsArgs = {
  input: Array<DelClassroomStudentInput>;
};


export type MutationDeleteAiModelArgs = {
  input: DeleteAiModelInput;
};


export type MutationDeleteActivityArgs = {
  input: DeleteActivityInput;
};


export type MutationDeleteActivitySupplementaryDataArgs = {
  input: DeleteActivitySupplementaryDataInput;
};


export type MutationDeleteActivityVodItemArgs = {
  input: DeleteActivityVodItemInput;
};


export type MutationDeleteAppBannerArgs = {
  input: DeleteAppBannerInput;
};


export type MutationDeleteBoardDataArgs = {
  input: DeleteBoardInput;
};


export type MutationDeleteBoardFaqArgs = {
  input: DeleteBoardInput;
};


export type MutationDeleteBoardNoticeArgs = {
  input: DeleteBoardInput;
};


export type MutationDeleteClassroomArgs = {
  input: DeleteClassroomInput;
};


export type MutationDeleteClassroomHomeworkArgs = {
  input: DeleteClassroomHomeworkInput;
};


export type MutationDeleteClassroomNoticeArgs = {
  input: DeleteClassroomNoticeInput;
};


export type MutationDeleteClassroomStudentHomeworkArgs = {
  input: DeleteClassroomStudentHomeworkInput;
};


export type MutationDeleteCourseArgs = {
  input: DeleteCourseInput;
};


export type MutationDeleteCourseLessonArgs = {
  input: DeleteCourseLessonInput;
};


export type MutationDeleteCourseMaterialArgs = {
  input: DeleteCourseMaterialInput;
};


export type MutationDeleteCourseMerchandiseArgs = {
  input: DeleteCourseMerchandiseInput;
};


export type MutationDeleteCourseParticipantArgs = {
  input: DeleteCourseParticipantInput;
};


export type MutationDeleteCourseQuizArgs = {
  input: DeleteCourseQuizInput;
};


export type MutationDeleteCourseScheduleGroupArgs = {
  input: DeleteCourseScheduleGroupInput;
};


export type MutationDeleteCourseTagArgs = {
  input: DeleteCourseTagInput;
};


export type MutationDeleteCourseTagCategoryArgs = {
  input: DeleteCourseTagCategoryInput;
};


export type MutationDeleteCourseTutorScheduleArgs = {
  input: DeleteCourseTutorScheduleInput;
};


export type MutationDeleteCourseTutorScheduleGroupArgs = {
  input: DeleteCourseTutorScheduleGroupInput;
};


export type MutationDeleteLanguageArgs = {
  input: DeleteLanguageInput;
};


export type MutationDeleteLessonArgs = {
  input: DeleteLessonInput;
};


export type MutationDeleteLessonCurriculumArgs = {
  input: DeleteLessonCurriculumInput;
};


export type MutationDeleteLessonCurriculumRelateArgs = {
  input: Array<DeleteLessonCurriculumRelateInput>;
};


export type MutationDeleteLessonHardwareArgs = {
  input: DeleteLessonHardwareInput;
};


export type MutationDeleteLessonPlanArgs = {
  input: DeleteLessonPlanInput;
};


export type MutationDeleteLessonPlanContentArgs = {
  input: DeleteLessonPlanContentInput;
};


export type MutationDeleteModiArgs = {
  input: DeleteModiInput;
};


export type MutationDeleteOrderCardArgs = {
  input: DeleteOrderCardInput;
};


export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


export type MutationDeleteQuestionArgs = {
  input: DeleteQuestionInput;
};


export type MutationDeleteReviewArgs = {
  input: DeleteReviewInput;
};


export type MutationDeleteReviewReplyArgs = {
  input: DeleteReviewReplyInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationDeleteUserContactArgs = {
  input: DeleteUserContactInput;
};


export type MutationDeleteUserCsArgs = {
  input: DeleteUserCsInput;
};


export type MutationDeleteUserRevokeArgs = {
  input: DeleteUserRevokeInput;
};


export type MutationDeleteVideoArgs = {
  input: DeleteVideoInput;
};


export type MutationEndCourseLessonArgs = {
  input: EndCourseLessonInput;
};


export type MutationEnrollLessonCurriculumArgs = {
  input: EnrollLessonCurriculumInput;
};


export type MutationEnterCourseLessonArgs = {
  input: EnterCourseLessonInput;
};


export type MutationGenerateNotificationsArgs = {
  input: GenerateNotificationInput;
};


export type MutationLivekitCreateRoomArgs = {
  input: LivekitCreateRoomInput;
};


export type MutationLivekitDeleteRoomArgs = {
  input: LivekitDeleteRoomInput;
};


export type MutationLivekitMuteParticipantArgs = {
  input: LivekitMuteParticipantInput;
};


export type MutationLivekitRemoveParticipantArgs = {
  input: LivekitRemoveParticipantInput;
};


export type MutationLivekitSendDataArgs = {
  input: LivekitSendDataInput;
};


export type MutationLivekitUpdateParticipantArgs = {
  input: LivekitUpdateParticipantInput;
};


export type MutationLivekitUpdateRoomMetadataArgs = {
  input: LivekitUpdateRoomMetadataInput;
};


export type MutationLoginClassroomArgs = {
  input: LoginClassroomInput;
};


export type MutationLoginSocialUserArgs = {
  input: LoginSocialUserInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationMultiUploadFileArgs = {
  input: MultiUploadFileInput;
};


export type MutationMultiUploadVideoArgs = {
  input: MultiUploadVideoInput;
};


export type MutationMuteLiveLessonParticipantArgs = {
  input: MuteLiveLessonParticipantInput;
};


export type MutationPublishNotificationsArgs = {
  input: PublishNotificationInput;
};


export type MutationReTokenUserArgs = {
  input: ReTokenUserInput;
};


export type MutationReadNotificationArgs = {
  input: ReadNotificationInput;
};


export type MutationRemoveLiveLessonParticipantArgs = {
  input: RemoveLiveLessonParticipantInput;
};


export type MutationRemoveUserProfileArgs = {
  input: RemoveUserProfileInput;
};


export type MutationRequestCourseArgs = {
  input: RequestCourseInput;
};


export type MutationRequestCourseApplicationArgs = {
  input: RequestCourseApplicationInput;
};


export type MutationRequestOrderArgs = {
  input: RequestOrderInput;
};


export type MutationRequestUserAuthToSmsArgs = {
  input: RequestUserAuthToSmsInput;
};


export type MutationRequestUserEmailToSmsArgs = {
  input: RequestUserEmailToSmsInput;
};


export type MutationRequestUserPasswordToSmsArgs = {
  input: RequestUserPasswordToSmsInput;
};


export type MutationResetClassroomStudentTempPasswordArgs = {
  input: ResetClassroomStudentTempPasswordInput;
};


export type MutationResetUserPinCodeArgs = {
  input: ResetUserPinCodeInput;
};


export type MutationResponseUserContactArgs = {
  input: ResponseUserContactInput;
};


export type MutationResponseUserCsArgs = {
  input: ResponseUserCsInput;
};


export type MutationSaveAiModelArgs = {
  input: SaveAiModelInput;
};


export type MutationSendDataToLiveLessonParticipantArgs = {
  input: SendDataToLiveLessonParticipantInput;
};


export type MutationSendKakaoMessageAttendanceRequestArgs = {
  input: SendKakaoMessageAttendanceRequestInput;
};


export type MutationSingleUploadFileArgs = {
  input: SingleUploadFileInput;
};


export type MutationSingleUploadVideoArgs = {
  input: SingleUploadVideoInput;
};


export type MutationStartClassroomLessonStudentArgs = {
  input: StartClassroomLessonStudentInput;
};


export type MutationStartCourseLessonArgs = {
  input: StartCourseLessonInput;
};


export type MutationStartQuizArgs = {
  input: StartQuizInput;
};


export type MutationSubmitQuestionAnswerArgs = {
  input: QuestionAnswer;
};


export type MutationSubmitQuestionReportArgs = {
  input: SubmitQuestionReportInput;
};


export type MutationSubmitQuizAnswerArgs = {
  input: SubmitQuizAnswerInput;
};


export type MutationToggleLessonBookmarkArgs = {
  input: ToggleLessonBookmarkInput;
};


export type MutationToggleLessonLikeArgs = {
  input: ToggleLessonLikeInput;
};


export type MutationToggleStatLessonBookmarkArgs = {
  input: ToggleStatLessonBookmarkInput;
};


export type MutationToggleStatLessonLikeArgs = {
  input: ToggleStatLessonLikeInput;
};


export type MutationUnenrollLessonCurriculumArgs = {
  input: UnenrollLessonCurriculumInput;
};


export type MutationUnreadNotificationArgs = {
  input: UnreadNotificationInput;
};


export type MutationUpdateAiModelArgs = {
  input: UpdateAiModelInput;
};


export type MutationUpdateActivityArgs = {
  input: UpdateActivityInput;
};


export type MutationUpdateActivitySupplementaryDataArgs = {
  input: UpdateActivitySupplementaryDataInput;
};


export type MutationUpdateActivityVodItemArgs = {
  input: UpdateActivityVodItemInput;
};


export type MutationUpdateAppBannerArgs = {
  input: UpdateAppBannerInput;
};


export type MutationUpdateBoardDataArgs = {
  input: UpdateBoardDataInput;
};


export type MutationUpdateBoardFaqArgs = {
  input: UpdateBoardFaqInput;
};


export type MutationUpdateBoardNoticeArgs = {
  input: UpdateBoardNoticeInput;
};


export type MutationUpdateClassroomArgs = {
  input: UpdateClassroomInput;
};


export type MutationUpdateClassroomHomeworkArgs = {
  input: UpdateClassroomHomeworkInput;
};


export type MutationUpdateClassroomNoticeArgs = {
  input: UpdateClassroomNoticeInput;
};


export type MutationUpdateClassroomStudentHomeworkArgs = {
  input: UpdateClassroomStudentHomeworkInput;
};


export type MutationUpdateClassroomStudentPasswordArgs = {
  input: UpdateClassroomStudentPasswordInput;
};


export type MutationUpdateClassroomTokenArgs = {
  input: UpdateClassroomTokenInput;
};


export type MutationUpdateCourseArgs = {
  input: UpdateCourseInput;
};


export type MutationUpdateCourseAttendanceResultArgs = {
  input: UpdateCourseAttendanceResultInput;
};


export type MutationUpdateCourseLessonArgs = {
  input: UpdateCourseLessonInput;
};


export type MutationUpdateCourseMerchandiseArgs = {
  input: UpdateCourseMerchandiseInput;
};


export type MutationUpdateCourseParticipantArgs = {
  input: UpdateCourseParticipantInput;
};


export type MutationUpdateCourseQuizArgs = {
  input: UpdateCourseQuizInput;
};


export type MutationUpdateCourseScheduleGroupArgs = {
  input: UpdateCourseScheduleGroupInput;
};


export type MutationUpdateCourseTutorArgs = {
  input: UpdateCourseTutorInput;
};


export type MutationUpdateCourseTutorScheduleArgs = {
  input: UpdateCourseTutorScheduleInput;
};


export type MutationUpdateCourseTutorScheduleGroupArgs = {
  input: UpdateCourseTutorScheduleGroupInput;
};


export type MutationUpdateLanguageArgs = {
  input: UpdateLanguageInput;
};


export type MutationUpdateLessonArgs = {
  input: UpdateLessonInput;
};


export type MutationUpdateLessonCurriculumArgs = {
  input: UpdateLessonCurriculumInput;
};


export type MutationUpdateLessonHardwareArgs = {
  input: UpdateLessonHardwareInput;
};


export type MutationUpdateLessonPlanArgs = {
  input: UpdateLessonPlanInput;
};


export type MutationUpdateLessonPlanContentArgs = {
  input: UpdateLessonPlanContentInput;
};


export type MutationUpdateLessonPlanContentsIndexArgs = {
  input: Array<UpdateLessonPlanContentsIndexInput>;
};


export type MutationUpdateLessonPlansIndexArgs = {
  input: Array<UpdateLessonPlansIndexInput>;
};


export type MutationUpdateLiveLessonMetadataArgs = {
  input: UpdateLiveLessonMetadataInput;
};


export type MutationUpdateMarketingCouponArgs = {
  input: UpdateMarketingCouponInput;
};


export type MutationUpdateMarketingPromotionArgs = {
  input: UpdateMarketingPromotionInput;
};


export type MutationUpdateOrderInvoiceArgs = {
  input: UpdateOrderInvoiceInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationUpdateQuestionArgs = {
  input: UpdateQuestionInput;
};


export type MutationUpdateReviewArgs = {
  input: UpdateReviewInput;
};


export type MutationUpdateReviewReplyArgs = {
  input: UpdateReviewReplyInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserContactArgs = {
  input: UpdateUserContactInput;
};


export type MutationUpdateUserCsArgs = {
  input: UpdateUserCsInput;
};


export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPasswordInput;
};


export type MutationUpdateUserPinCodeArgs = {
  input: UpdateUserPinCodeInput;
};


export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationUpdateVideoArgs = {
  input: UpdateVideoInput;
};


export type MutationUploadFileArgs = {
  input: UploadFileInput;
};

export type MuteLiveLessonParticipantInput = {
  /** 삭제할 참가자 */
  identity: Scalars['String'];
  /** 음소거 설정 (mute: true / unmute: false) */
  muted: Scalars['Boolean'];
  /** 참가자가 속한 방 이름 */
  roomName: Scalars['String'];
  /** 트랙 아이디 */
  trackSid: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Notification = {
  __typename?: 'Notification';
  /** 아이콘 URL */
  IconURL?: Maybe<Scalars['String']>;
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 알림 내용 */
  description: Scalars['String'];
  /** 이벤트 발생 시간 */
  eventDateTime?: Maybe<Scalars['String']>;
  /** 알림 ID */
  id: Scalars['ID'];
  /** live 시간 적용 */
  liveDateTime?: Maybe<Scalars['String']>;
  /** 유저 프로필 아이디 */
  profileId: Scalars['String'];
  /** 읽음/안읽음 상태 */
  state: NotificationState;
  /** 알림 제목 */
  title: Scalars['String'];
  /** 알림 UI */
  uiType: NotificationUiType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** 유저 아이디 */
  userId?: Maybe<Scalars['String']>;
  /** 웹 링크 URL */
  webLinkPath?: Maybe<Scalars['String']>;
};

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  /** 알림 리스트 */
  nodes: Array<Notification>;
  /** 알림 수 */
  totalCount: Scalars['Int'];
};

export type NotificationConnectionOrder = {
  /** 차순 */
  direction?: InputMaybe<NotificationConnectionOrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<NotificationConnectionOrderFieldType>;
};

export enum NotificationConnectionOrderDirectionType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum NotificationConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  /** 알림 ID */
  Id = 'ID'
}

export type NotificationConnectionWhere = {
  /** 토스트가 30분 이야? */
  maxToastMinutes?: InputMaybe<Scalars['Int']>;
  profileId?: InputMaybe<Scalars['String']>;
  /** 확인 여부 */
  state?: InputMaybe<NotificationState>;
  /** 알림 UI */
  uiType?: InputMaybe<NotificationUiType>;
};

export enum NotificationState {
  /** 확인 */
  Read = 'READ',
  /** 미확인 */
  Unread = 'UNREAD'
}

export enum NotificationUiType {
  Noti = 'NOTI',
  Toast = 'TOAST'
}

export type NotificationWhere = {
  /** 알림 아이디 */
  id: Scalars['ID'];
  /** 유저 프로필 아이디 */
  profileId: Scalars['String'];
};

export type NotificationsToastWhere = {
  /** 토스트 개수 */
  first: Scalars['Int'];
  /** 토스트 몇분까지 볼래? */
  maxToastMinutes: Scalars['Int'];
  /** 유저 프로필 아이디 */
  profileId: Scalars['String'];
};

export enum OpenType {
  All = 'ALL',
  Close = 'CLOSE',
  Delete = 'DELETE',
  Open = 'OPEN'
}

/** 주문 정보 */
export type Order = {
  __typename?: 'Order';
  /** 취소된 날짜 */
  cancelledAt: Scalars['String'];
  /** 카드 개월수 */
  cardQuota: Scalars['Int'];
  /** 쿠폰 주문 할인 정보 */
  couponDiscount?: Maybe<OrderDiscount>;
  /** 주문 날짜 */
  createdAt: Scalars['String'];
  /** 현재 총 금액 = totalPrice(총결제금액) - totalRefundPrice(총 환불금액) */
  currentTotalPrice: Money;
  /** 배송지 정보 - 옵션 */
  delivery?: Maybe<OrderDelivery>;
  /** 주문 ID */
  id: Scalars['ID'];
  /** 주문 아이템리스트 */
  orderItems: Array<OrderItem>;
  /** 주문 No */
  orderNo: Scalars['String'];
  /** 환불정보 */
  orderRefunds: Array<OrderRefund>;
  /** 결제수단 Code */
  payMethod: Scalars['String'];
  /** 결제정보 - 결제취소포함 */
  payments: Array<OrderPayment>;
  /** 학습자 정보 */
  profileInfo: OrderProfileInfo;
  /** 배송비 */
  shippingPrice: Money;
  /** 주문 상태 */
  status: OrderStatus;
  /** 총 할인적용 금액(쿠폰적용) */
  totalDiscountPrice: Money;
  /** 모든 품목의 합계 = 총물품가격 + 프로모션 할인 */
  totalItemsPrice: Money;
  /** 총결제 금액 = totalItemsPrice + shippingPrice -총 할인적용 금액 */
  totalPrice: Money;
  /** 총 환불금액 - 주문취소로 환불된 금액 */
  totalRefundedPrice: Money;
  /** 주문자 정보 */
  userInfo: OrderUserInfo;
};

/** 주소정보 */
export type OrderAddress = {
  __typename?: 'OrderAddress';
  /** 주소 */
  addr: Scalars['String'];
  /** 상세 주소 */
  addrDetail: Scalars['String'];
  /** 주소정보 ID */
  id: Scalars['ID'];
  /** 주문자 정보 */
  userInfo: OrderUserInfo;
  /** 우편번호 */
  zipcode: Scalars['String'];
};

/** 카드정보 */
export type OrderCard = {
  __typename?: 'OrderCard';
  code: Scalars['String'];
  enabled: Scalars['Boolean'];
  icon: ImageInfo;
  name: Scalars['String'];
};

/** 카드 Quota 타입 */
export enum OrderCardQuotaType {
  /** 8개월 */
  Eight = 'EIGHT',
  /** 5개월 */
  Five = 'FIVE',
  /** 4개월 */
  Four = 'FOUR',
  /** 9개월 */
  Nine = 'NINE',
  /** 일시불 */
  One = 'ONE',
  /** 7개월 */
  Seven = 'SEVEN',
  /** 6개월 */
  Six = 'SIX',
  /** 10개월 */
  Ten = 'TEN',
  /** 3개월 */
  Three = 'THREE',
  /** 2개월 */
  Two = 'TWO'
}

/** 장바구니 */
export type OrderCart = {
  __typename?: 'OrderCart';
  cardId: Scalars['ID'];
};

/** 주문 장바구니 연결 리스트 */
export type OrderCartConnection = {
  __typename?: 'OrderCartConnection';
  edges: Array<OrderCartEdges>;
  nodes: Array<OrderCart>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** 장바구니 엣지 */
export type OrderCartEdges = {
  __typename?: 'OrderCartEdges';
  cursor: Scalars['String'];
  nodes: OrderCart;
};

/** OrderConnection 리스트 */
export type OrderConnection = {
  __typename?: 'OrderConnection';
  edges: Array<OrderEdges>;
  nodes: Array<Order>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum OrderConnectionField {
  Id = 'ID',
  Name = 'Name'
}

export type OrderConnectionOrder = {
  field: OrderConnectionField;
};

export type OrderConnectionWhere = {
  /** 주문코드 */
  orderId?: InputMaybe<Scalars['String']>;
  /** 상태 리스트 */
  statuses?: InputMaybe<Array<OrderStatus>>;
  /** 유저 ID */
  userId?: InputMaybe<Scalars['String']>;
};

/** 주문 대쉬보드 */
export type OrderDashboard = {
  __typename?: 'OrderDashboard';
  /** 취소 완료 */
  cancelComplete: Scalars['Int'];
  /** 취소 진행중 */
  cancelOngoing: Scalars['Int'];
  /** 취소 요청 */
  cancelRequest: Scalars['Int'];
  /** 배송 완료 */
  deliveryComplete: Scalars['Int'];
  /** 배송 시작 송장번호 입력완료 */
  deliveryOngoing: Scalars['Int'];
  /** 배송 준비 */
  deliveryReady: Scalars['Int'];
  /** 교환 완료 */
  exchangeComplete: Scalars['Int'];
  /** 교환 진행중 */
  exchangeOngoing: Scalars['Int'];
  /** 교환 요청 */
  exchangeRequest: Scalars['Int'];
  /** 결제 취소 */
  paymentCancel: Scalars['Int'];
  /** 결제 완료 */
  paymentComplete: Scalars['Int'];
  /** 결제 준비 */
  paymentReady: Scalars['Int'];
  /** 제품 회수 완료 */
  productReturnComplete: Scalars['Int'];
  /** 제품 회수 진행중 */
  productReturnOngoing: Scalars['Int'];
  /** 제품 회수 요청 */
  productReturnRequest: Scalars['Int'];
  /** 반품 완료 */
  returnComplete: Scalars['Int'];
  /** 반품 진행중 */
  returnOngoing: Scalars['Int'];
  /** 반품 요청 */
  returnRequest: Scalars['Int'];
};

export type OrderDashboardWhere = {
  /** 종료날짜 */
  endDate: Scalars['String'];
  /** 시작날짜 */
  startDate: Scalars['String'];
};

/** 주문 배송 */
export type OrderDelivery = {
  __typename?: 'OrderDelivery';
  /** 주문자 주소정보 */
  address: OrderAddress;
  /** 배송비 할인정보 */
  couponDiscount: OrderDiscount;
  /** 등록 날짜 */
  createdAt: Scalars['String'];
  /** 택배사 ID */
  deliveryCarrierId: Scalars['String'];
  /** 요청 사항 */
  deliveryRequest: Scalars['String'];
  /** 배송 ID */
  id: Scalars['ID'];
  /** 송장 번호 */
  invoice: Scalars['String'];
  /** 처리 일자 */
  processedAt: Scalars['String'];
  /** 배송비 */
  shippingPrice: Money;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 택배사 목록 */
export type OrderDeliveryCarrier = {
  __typename?: 'OrderDeliveryCarrier';
  id: Scalars['ID'];
  name: Scalars['String'];
  tel: Scalars['String'];
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderDirectionType {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** 주문 할인정보 */
export type OrderDiscount = {
  __typename?: 'OrderDiscount';
  /** 할인 Code - 쿠폰, 프로모션 할인코드 */
  code: Scalars['String'];
  /** 할인 정보 */
  discount: Discount;
  /** 할인된 금액 */
  discountPrice: Money;
  /** 할인정보 이름 */
  name: Scalars['String'];
};

/** 주문 할인 정보 */
export type OrderDiscountInput = {
  /** 할인 Code - 쿠폰, 프로모션 할인코드 */
  code: Scalars['String'];
  /** 할인정보 */
  discount: DiscountInput;
  /** 할인된 금액 */
  discountPrice: MoneyInput;
  /** 할인정보 이름 */
  name: Scalars['String'];
};

/** 주문 연결 Point */
export type OrderEdges = {
  __typename?: 'OrderEdges';
  cursor: Scalars['String'];
  node: Order;
};

/** 주문 Item */
export type OrderItem = {
  __typename?: 'OrderItem';
  /** 쿠폰 할인 정보 */
  couponDiscount?: Maybe<OrderDiscount>;
  /** 등록 날짜 */
  createdAt: Scalars['String'];
  /** 주문 item ID */
  id: Scalars['ID'];
  /** 주문 코드 */
  orderId: Scalars['String'];
  /** item No */
  orderItemNo: Scalars['String'];
  /** 상품 정보 */
  product: OrderProduct;
  /** 상태 */
  status: OrderStatus;
};

/** 결제 PG 제공사 */
export enum OrderPgProviderType {
  Html5Inicis = 'HTML5INICIS'
}

/** 페이 결제 방법 */
export enum OrderPayMethodType {
  /** 카드 */
  Card = 'CARD',
  /** 카카오 페이 */
  KakaoPay = 'KAKAO_PAY',
  /** 엘페이 */
  Lpay = 'LPAY',
  /** 페이코 */
  Payco = 'PAYCO',
  /** SSG */
  Ssgpay = 'SSGPAY',
  /** 토스 */
  Tosspay = 'TOSSPAY'
}

/** 주문 결제 */
export type OrderPayment = {
  __typename?: 'OrderPayment';
  /** 카드 개월수 */
  cardQuota: Scalars['Int'];
  /** 결제 ID */
  id: Scalars['String'];
  /** 결제완료 번호 */
  impCode: Scalars['String'];
  /** 결제수단 Code */
  payMethod: Scalars['String'];
  /** 결제 금액 */
  paymentPrice: Money;
  /** PG 제공사 */
  pgProvider: Scalars['String'];
  /** 상태 */
  status: OrderStatus;
};

/** 상품정보 */
export type OrderProduct = {
  __typename?: 'OrderProduct';
  /** 상품 ID */
  id: Scalars['String'];
  /** 상품 이미지 */
  image: ImageInfo;
  /** 상품 이름 */
  name: Scalars['String'];
  /** 상품가 */
  originPrice: Money;
  /** 프로모션 할인 정보 */
  promotionDiscount?: Maybe<OrderDiscount>;
  /** 프로모션 할인가 */
  promotionPrice: Money;
  /** 구매 타입 */
  purchaseType: OrderProductPurchaseType;
  /** 주문 수량 */
  qty: Scalars['Int'];
  /** 스케줄 그룹 ID */
  scheduleGroupId: Scalars['String'];
};

/** 주문 상품 구매타입 */
export enum OrderProductPurchaseType {
  /** 구매형 */
  Purchase = 'PURCHASE',
  /** 렌탈형 */
  Rental = 'RENTAL'
}

/** 학습자 정보 */
export type OrderProfileInfo = {
  __typename?: 'OrderProfileInfo';
  /** 출생년도 */
  birth: Scalars['String'];
  codingTypes: Array<CodingType>;
  /** 이메일 */
  email: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
  /** 휴대전화 */
  phone: Scalars['String'];
  /** 학습자 ID */
  profileId: Scalars['String'];
};

/** Item 환불 정보 */
export type OrderRefund = {
  __typename?: 'OrderRefund';
  /** 쿠폰 환불 정보 */
  couponDiscount?: Maybe<OrderDiscount>;
  /** 접수 일자 */
  createdAt: Scalars['String'];
  /** 고객 부담금 비용 */
  customerChargeFee: Money;
  /** 반품/회수 등등의 배송지 정보 */
  delivery?: Maybe<OrderDelivery>;
  /** 주문 환불 ID */
  id: Scalars['String'];
  /** 주문 코드 */
  orderId: Scalars['String'];
  /** 주문 Item 리스트 */
  orderItems: Array<OrderItem>;
  /** 주문 환불 No */
  orderRefundNo: Scalars['String'];
  /** 환불수단 */
  payMethod: OrderPayMethodType;
  /** 처리 일자 */
  processedAt: Scalars['String'];
  /** 환불 요청 이유 */
  reason: Scalars['String'];
  /** 환불 금액 */
  refundPrice: Money;
  /** 배송비 */
  shippingPrice: Money;
  /** 환불 처리 담당자 */
  staffUserId: Scalars['String'];
  /** 상태 */
  status: OrderStatus;
};

/** 주문 상태 */
export enum OrderStatus {
  /** 취소 완료 */
  CancelCompete = 'CANCEL_COMPETE',
  /** 취소 진행중 */
  CancelOngoing = 'CANCEL_ONGOING',
  /** 취소 요청 */
  CancelRequest = 'CANCEL_REQUEST',
  /** 배송 완료 */
  DeliveryComplete = 'DELIVERY_COMPLETE',
  /** 배송 시작 송장번호 입력완료 */
  DeliveryOngoing = 'DELIVERY_ONGOING',
  /** 배송 준비 */
  DeliveryReady = 'DELIVERY_READY',
  /** 교환 완료 */
  ExchangeComplete = 'EXCHANGE_COMPLETE',
  /** 교환 진행중 */
  ExchangeOngoing = 'EXCHANGE_ONGOING',
  /** 교환 요청 */
  ExchangeRequest = 'EXCHANGE_REQUEST',
  /** 결제 취소 */
  PaymentCancel = 'PAYMENT_CANCEL',
  /** 결제 완료 */
  PaymentComplete = 'PAYMENT_COMPLETE',
  /** 결제 준비 */
  PaymentReady = 'PAYMENT_READY',
  /** 제품 회수 완료 */
  ProductReturnComplete = 'PRODUCT_RETURN_COMPLETE',
  /** 제품 회수 진행중 */
  ProductReturnOngoing = 'PRODUCT_RETURN_ONGOING',
  /** 제품 회수 요청 */
  ProductReturnRequest = 'PRODUCT_RETURN_REQUEST',
  /** 반품 완료 */
  ReturnComplete = 'RETURN_COMPLETE',
  /** 반품 진행중 */
  ReturnOngoing = 'RETURN_ONGOING',
  /** 반품 요청 */
  ReturnRequest = 'RETURN_REQUEST'
}

/** 주문자 정보 */
export type OrderUserInfo = {
  __typename?: 'OrderUserInfo';
  /** 이메일 */
  email: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
  /** 휴대전화 */
  phone: Scalars['String'];
  /** 유저 ID */
  userId: Scalars['String'];
};

export type OrderWhere = {
  /** 주문코드 */
  orderId: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasBeforePage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export enum PeriodType {
  Day = 'DAY',
  Month = 'MONTH',
  Week = 'WEEK'
}

export enum PermissionType {
  Admin = 'ADMIN',
  Tutor = 'TUTOR',
  User = 'USER'
}

export type PlatClassifier = Classifier & {
  __typename?: 'PlatClassifier';
  /** 데이터 (이미지 데이터 주소, 텍스트, 소리 데이터 주소 등) */
  dataset: Array<Scalars['String']>;
  /** 클래스 아이디 */
  id: Scalars['ID'];
  /** 라벨명 */
  label: Scalars['String'];
};

export type PresignedUrlForFileUpload = {
  __typename?: 'PresignedUrlForFileUpload';
  url: Scalars['String'];
};

export type PresignedUrlForVideoUpload = {
  __typename?: 'PresignedUrlForVideoUpload';
  url: Scalars['String'];
};

export type Project = Node & {
  __typename?: 'Project';
  codeType: ProjectCodeType;
  id: Scalars['ID'];
  jsonData: Scalars['String'];
  thumb: ImageInfo;
  title: Scalars['String'];
  userKey: Scalars['String'];
};

export enum ProjectCodeType {
  Entry = 'ENTRY',
  Scratch = 'SCRATCH'
}

export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  edges: Array<Maybe<ProjectEdge>>;
  nodes: Array<Maybe<Project>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum ProjectConnectionField {
  Id = 'ID'
}

export type ProjectConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field: ProjectConnectionField;
};

export type ProjectConnectionWhere = {
  filter?: InputMaybe<Scalars['String']>;
  userKey: Scalars['String'];
};

export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  cursor: Scalars['String'];
  node: Project;
};

export type ProjectNameExistWhere = {
  title: Scalars['String'];
  userKey: Scalars['String'];
};

export type ProjectWhere = {
  id: Scalars['ID'];
  userKey: Scalars['String'];
};

export type PublishNotificationInput = {
  /** 유저 프로필 아이디 */
  profileId: Scalars['String'];
  /** 알림 UI */
  uiType: NotificationUiType;
};

export type Query = {
  __typename?: 'Query';
  aiModel: AiModel;
  aiModelCategories: Array<AiModelCategory>;
  aiModelCategory: AiModelCategory;
  aiModelConnection: AiModelConnection;
  appBanner: AppBanner;
  appBannerConnection: AppBannerConnection;
  appDashboards: Array<AppDashboard>;
  appFirmwareVersion: AppFirmwareVersion;
  appInit: AppInit;
  appServiceMarketingAgreement: Scalars['String'];
  appServicePersonalAgreement: Scalars['String'];
  appServiceTerms: Scalars['String'];
  appVersion: AppVersion;
  /** 이메일 이용가능 */
  availableUserEmail: Scalars['Boolean'];
  boardCodeConnection: BoardCodeConnection;
  boardData?: Maybe<BoardData>;
  boardDataConnection: BoardDataConnection;
  boardFaq?: Maybe<BoardFaq>;
  boardFaqConnection: BoardFaqConnection;
  boardNotice?: Maybe<BoardNotice>;
  boardNoticeConnection: BoardNoticeConnection;
  classroom: Classroom;
  classroomConnection: ClassroomConnection;
  classroomHomework: ClassroomHomework;
  classroomHomeworkConnection: ClassroomHomeworkConnection;
  classroomHomeworkGroupConnection: ClassroomHomeworkGroupConnection;
  classroomNotice: ClassroomNotice;
  classroomNoticeConnection: ClassroomNoticeConnection;
  classroomStudent: ClassroomStudent;
  classroomStudentConnection: ClassroomStudentConnection;
  classroomStudentLessonDashboardConnection: ClassroomStudentLessonDashboardConnection;
  /** 언어 조회 */
  contentLanguage: ContentLanguage;
  /** 언어 목록 조회 */
  contentLanguageConnection: ContentLanguageConnection;
  /** 비디오 조회 */
  contentVideo: ContentVideo;
  /** 비디오 목록 조회 */
  contentVideoConnection: ContentVideoConnection;
  /** 코스 조회 */
  course: Course;
  /** 액티비티 조회 */
  courseActivity: CourseActivity;
  /** 액티비티 목록 조회 */
  courseActivityConnection: CourseActivityConnection;
  /** 액티비티 보조자료 조회 */
  courseActivitySupplementaryData: CourseSupplementaryData;
  /** 신청정보 상세 조회 (외부강사양성교육, 외부강사등록 등) */
  courseApplication: CourseApplication;
  /** 신청 목록 조회 (외부강사양성교육, 외부강사등록 등) */
  courseApplicationConnection: CourseApplicationConnection;
  /** 참여자 출결 상태 조회 */
  courseAttendance: Attendance;
  /** 클래스의 참여자 출결 상태 목록 조회 */
  courseAttendanceResult: Array<AttendanceResult>;
  /** 코스 목록 조회 */
  courseConnection: CourseConnection;
  /** 레슨 목록 조회 */
  courseLesson: CourseLesson;
  /** 일반상품 조회 */
  courseMerchandise: CourseMerchandise;
  /** 일반상품 목록 조회 */
  courseMerchandiseConnection: CourseMerchandiseConnection;
  /** 오픈룸 조회 */
  courseOpenRoom: CourseOpenRoom;
  /** 오픈룸 목록 조회 */
  courseOpenRoomConnection: CourseOpenRoomConnection;
  /** 학생 레슨(스케줄) 피드백 조회 */
  courseParticipantLessonFeedback: CourseParticipantLessonFeedback;
  /** 상품 조회 */
  courseProduct: CourseProduct;
  /** 상품 목록 조회 */
  courseProductConnection: CourseProductConnection;
  /** 퀴즈 조회 */
  courseQuiz: CourseQuiz;
  /** 퀴즈 목록 조회 */
  courseQuizConnection: CourseQuizConnection;
  /** 스케줄 조회 */
  courseSchedule: CourseSchedule;
  /** 스케줄 목록 조회 */
  courseScheduleConnection: CourseScheduleConnection;
  /** 스케줄그룹 조회 (클래스 상세 조회) */
  courseScheduleGroup: CourseScheduleGroup;
  /** 스케줄그룹 목록 조회 (클래스 목록 조회) */
  courseScheduleGroupConnection: CourseScheduleGroupConnection;
  /** 태그 카테고리 목록 조회 */
  courseTagCategories?: Maybe<Array<CourseTagCategory>>;
  /** 태그 목록 조회 */
  courseTags: Array<CourseTag>;
  /** 튜터 조회 */
  courseTutor: CourseTutor;
  /** 튜터 목록 조회 */
  courseTutorConnection: CourseTutorConnection;
  /** 튜터 스케줄 디테일 조회 */
  courseTutorSchedule: CourseTutorSchedule;
  /** 튜터 스케줄 디테일 목록 조회 */
  courseTutorScheduleConnection: CourseTutorScheduleConnection;
  /** 튜터 스케줄그룹 조회 */
  courseTutorScheduleGroup: CourseTutorScheduleGroup;
  /** 튜터 스케줄그룹 목록 조회 */
  courseTutorScheduleGroupConnection: CourseTutorScheduleGroupConnection;
  dummy?: Maybe<Scalars['String']>;
  eduContentCategories: Array<EduContentCategory>;
  lesson: Lesson;
  lessonCategory: Array<LessonCategory>;
  lessonConnection: LessonConnection;
  lessonCurriculum: LessonCurriculum;
  lessonCurriculumConnection: LessonCurriculumConnection;
  lessonGroupConnection: LessonGroupConnection;
  lessonGroupLabels: Array<LessonGroupLabel>;
  lessonHardware: LessonHardware;
  lessonHardwareGroup: Array<LessonHardwareGroup>;
  lessonLevelLabels: Array<LessonLevelLabel>;
  lessonPlanContentConnection: LessonPlanContentConnection;
  lessonVideoConnection: LessonVideoConnection;
  /** 라이브 레슨의 참여자 목록 */
  liveLessonParticipants: Array<LiveLessonParticipant>;
  /** 권한별 토큰 생성 */
  livekitCreateToken: Scalars['String'];
  /** 어드민 토큰 조회 */
  livekitGetAdminToken: Scalars['String'];
  /** 토큰 조회 */
  livekitGetJoinToken: Scalars['String'];
  /** 튜터 토큰 조회 */
  livekitGetTutorToken: Scalars['String'];
  /** 유저 토큰 조회 */
  livekitGetUserToken: Scalars['String'];
  /** 특정 방 안에 참가자 목록 조회 */
  livekitListParticipants: Array<LivekitParticipant>;
  /** 방 목록 조회 */
  livekitListRoom: Array<LivekitRoom>;
  /** [관리자] 쿠폰 리스트 */
  marketingCouponConnection: MarketingCouponConnection;
  /** 쿠폰 다운로드 리스트 */
  marketingCouponDownloadConnection: MarketingCouponDownloadConnection;
  /** [관리자] 프로모션 상세 */
  marketingPromotion: MarketingPromotion;
  /** [관리자] 프로모션 리스트 */
  marketingPromotionConnection: MarketingPromotionConnection;
  /** 모디 정보 조회 */
  modi: Modi;
  /** 모디 목록 조회 */
  modiConnection: ModiConnection;
  /** 알림 상세 */
  notification: Notification;
  /** 알림 목록 조회 */
  notificationConnection: NotificationConnection;
  notificationConnectionToast: NotificationConnection;
  /** 주문 상세정보 */
  order: Order;
  /** 카드사 정보 리스트 */
  orderCards: Array<OrderCard>;
  /** 주문 리스트 */
  orderConnection: OrderConnection;
  /** 주문 대쉬보드 */
  orderDashboard: OrderDashboard;
  /** 배송 유통사 */
  orderDeliveryCarriers: Array<OrderDeliveryCarrier>;
  /** 주문자 마지막 주소지 */
  orderLastAddress: OrderAddress;
  /** 주문상점 코드 */
  orderPgID: Scalars['String'];
  presignedUrlForFileUpload?: Maybe<PresignedUrlForFileUpload>;
  presignedUrlForVideoUpload?: Maybe<PresignedUrlForVideoUpload>;
  project: Project;
  projectConnection: ProjectConnection;
  projectNameExist: Scalars['Boolean'];
  /** 퀴즈 조회 */
  quiz: Quiz;
  /** 퀴즈 목록 조회 */
  quizConnection: QuizConnection;
  /** 퀴즈 문제 조회 */
  quizQuestion: QuizQuestion;
  /** 퀴즈 문제 목록 조회 */
  quizQuestionConnection: QuizQuestionConnection;
  quizResult: QuizResultOutput;
  /** 랜덤 퀴즈 문제 조회 */
  randomQuizQuestion: QuizQuestion;
  review: Review;
  reviewConnection: ReviewConnection;
  searchTags: Array<SearchTag>;
  /** 소셜 유저 프로필정보 */
  socialUserProfile: SocialUserProfile;
  statUserLessonConnection: StatUserLessonConnection;
  statUserSummary: StatUserSummary;
  statUserSummaryConnection: StatUserSummaryConnection;
  statUserView: Array<StatUserView>;
  /** @deprecated Use `singleUploadFile or multiUploadFile`. */
  uploadImageConnection: UploadImageConnection;
  /** 회원조회 */
  user: User;
  /** 인증 정보 조회 */
  userAuthIdentity: UserAuthIdentity;
  /** 회원정보 목록 조회 */
  userConnection: UserConnection;
  /** 회원 1:1 문의 조회 */
  userContact: UserContact;
  /** 회원 1:1 문의 리스트 */
  userContactConnection: UserContactConnection;
  /** 회원 CS */
  userCsConnection: UserCsConnection;
  /** 유저 대쉬보드 */
  userDashboard: UserDashboard;
  /** 회원 프로필 이미지 */
  userDefaultProfileImages: Array<ImageInfo>;
  /** 회원 프로필 */
  userProfileConnection: UserProfileConnection;
  /** 유저 토큰 */
  userProfileToken: Jwt;
};


export type QueryAiModelArgs = {
  where: AiModelWhere;
};


export type QueryAiModelCategoriesArgs = {
  where?: InputMaybe<AiModelCategoriesWhere>;
};


export type QueryAiModelCategoryArgs = {
  where: AiModelCategoryWhere;
};


export type QueryAiModelConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AiModelConnectionOrder>;
};


export type QueryAppBannerArgs = {
  where: AppBannerWhere;
};


export type QueryAppBannerConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AppBannerConnectionOrder>;
  where?: InputMaybe<AppBannerConnectionWhere>;
};


export type QueryAppInitArgs = {
  where?: InputMaybe<AppInitWhere>;
};


export type QueryAppVersionArgs = {
  where: AppVersionWhere;
};


export type QueryAvailableUserEmailArgs = {
  where: AvailableUserEmailWhere;
};


export type QueryBoardCodeConnectionArgs = {
  where: BoardCodeConnectionWhere;
};


export type QueryBoardDataArgs = {
  where: BoardDataWhere;
};


export type QueryBoardDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  langType?: InputMaybe<LangType>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BoardDataConnectionOrder>;
  where?: InputMaybe<BoardDataConnectionWhere>;
};


export type QueryBoardFaqArgs = {
  where: BoardFaqWhere;
};


export type QueryBoardFaqConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  langType?: InputMaybe<LangType>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BoardFaqConnectionOrder>;
  where?: InputMaybe<BoardFaqConnectionWhere>;
};


export type QueryBoardNoticeArgs = {
  where: BoardNoticeWhere;
};


export type QueryBoardNoticeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  langType?: InputMaybe<LangType>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BoardNoticeConnectionOrder>;
  where?: InputMaybe<BoardNoticeConnectionWhere>;
};


export type QueryClassroomArgs = {
  where?: InputMaybe<ClassroomWhere>;
};


export type QueryClassroomConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClassroomConnectionOrder>;
  where?: InputMaybe<ClassroomConnectionWhere>;
};


export type QueryClassroomHomeworkArgs = {
  where: ClassroomHomeworkWhere;
};


export type QueryClassroomHomeworkConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClassroomHomeworkConnectionOrder>;
  where: ClassroomHomeworkConnectionWhere;
};


export type QueryClassroomHomeworkGroupConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClassroomHomeworkGroupConnectionOrder>;
  where: ClassroomHomeworkGroupConnectionWhere;
};


export type QueryClassroomNoticeArgs = {
  where: ClassroomNoticeWhere;
};


export type QueryClassroomNoticeConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClassroomNoticeConnectionOrder>;
  where: ClassroomNoticeConnectionWhere;
};


export type QueryClassroomStudentArgs = {
  where: ClassroomStudentWhere;
};


export type QueryClassroomStudentConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClassroomStudentConnectionOrder>;
  where: ClassroomStudentConnectionWhere;
};


export type QueryClassroomStudentLessonDashboardConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClassroomStudentLessonDashboardConnectionOrder>;
  where: ClassroomStudentLessonDashboardConnectionWhere;
};


export type QueryContentLanguageArgs = {
  where: ContentLanguageWhere;
};


export type QueryContentLanguageConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ContentLanguageConnectionOrder>;
  where?: InputMaybe<ContentLanguageConnectionWhere>;
};


export type QueryContentVideoArgs = {
  where: ContentVideoWhere;
};


export type QueryContentVideoConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ContentVideoConnectionOrder>;
  where?: InputMaybe<ContentVideoConnectionWhere>;
};


export type QueryCourseArgs = {
  where: CourseWhere;
};


export type QueryCourseActivityArgs = {
  where: CourseActivityWhere;
};


export type QueryCourseActivityConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseActivityConnectionOrder>;
  where?: InputMaybe<CourseActivityConnectionWhere>;
};


export type QueryCourseActivitySupplementaryDataArgs = {
  where: CourseActivitySupplementaryDataWhere;
};


export type QueryCourseApplicationArgs = {
  where: CourseApplicationWhere;
};


export type QueryCourseApplicationConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseApplicationConnectionOrder>;
  where?: InputMaybe<CourseApplicationConnectionWhere>;
};


export type QueryCourseAttendanceArgs = {
  where: CourseAttendanceWhere;
};


export type QueryCourseAttendanceResultArgs = {
  where: CourseAttendanceResultWhere;
};


export type QueryCourseConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseConnectionOrder>;
  where?: InputMaybe<CourseConnectionWhere>;
};


export type QueryCourseLessonArgs = {
  where: CourseLessonWhere;
};


export type QueryCourseMerchandiseArgs = {
  where: CourseMerchandiseWhere;
};


export type QueryCourseMerchandiseConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseMerchandiseConnectionOrder>;
  where?: InputMaybe<CourseMerchandiseConnectionWhere>;
};


export type QueryCourseOpenRoomArgs = {
  where: CourseOpenRoomWhere;
};


export type QueryCourseOpenRoomConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseOpenRoomConnectionOrder>;
  where?: InputMaybe<CourseOpenRoomConnectionWhere>;
};


export type QueryCourseParticipantLessonFeedbackArgs = {
  where: CourseParticipantLessonFeedbackWhere;
};


export type QueryCourseProductArgs = {
  where: CourseProductWhere;
};


export type QueryCourseProductConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseProductConnectionOrder>;
  where?: InputMaybe<CourseProductConnectionWhere>;
};


export type QueryCourseQuizArgs = {
  where: CourseQuizWhere;
};


export type QueryCourseQuizConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseQuizConnectionOrder>;
  where?: InputMaybe<CourseQuizConnectionWhere>;
};


export type QueryCourseScheduleArgs = {
  where: CourseScheduleWhere;
};


export type QueryCourseScheduleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseScheduleConnectionOrder>;
  where?: InputMaybe<CourseScheduleConnectionWhere>;
};


export type QueryCourseScheduleGroupArgs = {
  where: CourseScheduleGroupWhere;
};


export type QueryCourseScheduleGroupConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseScheduleGroupConnectionOrder>;
  where?: InputMaybe<CourseScheduleGroupConnectionWhere>;
};


export type QueryCourseTagsArgs = {
  where?: InputMaybe<CourseTagswhere>;
};


export type QueryCourseTutorArgs = {
  where: CourseTutorWhere;
};


export type QueryCourseTutorConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseTutorConnectionOrder>;
  where?: InputMaybe<CourseTutorConnectionWhere>;
};


export type QueryCourseTutorScheduleArgs = {
  where: CourseTutorScheduleWhere;
};


export type QueryCourseTutorScheduleConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseTutorScheduleConnectionOrder>;
  where?: InputMaybe<CourseTutorScheduleConnectionWhere>;
};


export type QueryCourseTutorScheduleGroupArgs = {
  where: CourseTutorScheduleGroupWhere;
};


export type QueryCourseTutorScheduleGroupConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseTutorScheduleGroupConnectionOrder>;
  where?: InputMaybe<CourseTutorScheduleGroupConnectionWhere>;
};


export type QueryEduContentCategoriesArgs = {
  where: LangType;
};


export type QueryLessonArgs = {
  where: LessonWhere;
};


export type QueryLessonCategoryArgs = {
  where: LessonCategoryWhere;
};


export type QueryLessonConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LessonConnectionOrder>;
  where?: InputMaybe<LessonConnectionWhere>;
};


export type QueryLessonCurriculumArgs = {
  where: LessonCurriculumWhere;
};


export type QueryLessonCurriculumConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LessonCurriculumConnectionOrder>;
  where: LessonCurriculumConnectionWhere;
};


export type QueryLessonGroupConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LessonGroupConnectionOrder>;
  where: LessonGroupConnectionWhere;
};


export type QueryLessonHardwareArgs = {
  where: LessonHardwareWhere;
};


export type QueryLessonPlanContentConnectionArgs = {
  where: LessonPlanContentConnectionWhere;
};


export type QueryLessonVideoConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LessonVideoConnectionOrder>;
  where?: InputMaybe<LessonVideoConnectionWhere>;
};


export type QueryLiveLessonParticipantsArgs = {
  input: LiveLessonParticipantsInput;
};


export type QueryLivekitCreateTokenArgs = {
  input: LivekitCreateTokenInput;
};


export type QueryLivekitGetAdminTokenArgs = {
  input: LivekitGetJoinTokenInput;
};


export type QueryLivekitGetJoinTokenArgs = {
  input: LivekitGetJoinTokenInput;
};


export type QueryLivekitGetTutorTokenArgs = {
  input: LivekitGetJoinTokenInput;
};


export type QueryLivekitGetUserTokenArgs = {
  input: LivekitGetJoinTokenInput;
};


export type QueryLivekitListParticipantsArgs = {
  input: LivekitListParticipantsInput;
};


export type QueryMarketingCouponConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketingCouponConnectionOrder>;
  where?: InputMaybe<MarketingCouponConnectionWhere>;
};


export type QueryMarketingCouponDownloadConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketingCouponDownloadConnectionOrder>;
  where?: InputMaybe<MarketingCouponDownloadConnectionWhere>;
};


export type QueryMarketingPromotionArgs = {
  where: MarketingPromotionWhere;
};


export type QueryMarketingPromotionConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketingPromotionConnectionOrder>;
  where?: InputMaybe<MarketingPromotionConnectionWhere>;
};


export type QueryModiArgs = {
  where: ModiWhere;
};


export type QueryModiConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ModiConnectionOrder>;
  where?: InputMaybe<ModiConnectionWhere>;
};


export type QueryNotificationArgs = {
  where: NotificationWhere;
};


export type QueryNotificationConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NotificationConnectionOrder>;
  where?: InputMaybe<NotificationConnectionWhere>;
};


export type QueryNotificationConnectionToastArgs = {
  where: NotificationsToastWhere;
};


export type QueryOrderArgs = {
  where: OrderWhere;
};


export type QueryOrderConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderConnectionOrder>;
  where?: InputMaybe<OrderConnectionWhere>;
};


export type QueryOrderDashboardArgs = {
  where: OrderDashboardWhere;
};


export type QueryPresignedUrlForFileUploadArgs = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
};


export type QueryPresignedUrlForVideoUploadArgs = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
};


export type QueryProjectArgs = {
  where: ProjectWhere;
};


export type QueryProjectConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectConnectionOrder>;
  where: ProjectConnectionWhere;
};


export type QueryProjectNameExistArgs = {
  where: ProjectNameExistWhere;
};


export type QueryQuizArgs = {
  where: QuizWhere;
};


export type QueryQuizConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<QuizConnectionOrder>;
  where?: InputMaybe<QuizConnectionWhere>;
};


export type QueryQuizQuestionArgs = {
  where: QuizQuestionWhere;
};


export type QueryQuizQuestionConnectionArgs = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<QuizQuestionConnectionOrder>;
  where?: InputMaybe<QuizQuestionConnectionWhere>;
};


export type QueryQuizResultArgs = {
  where: QuizResultWhere;
};


export type QueryRandomQuizQuestionArgs = {
  where: RandomQuizQuestion;
};


export type QueryReviewArgs = {
  where: ReviewWhere;
};


export type QueryReviewConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReviewConnectionOrder>;
  where?: InputMaybe<ReviewConnectionWhere>;
};


export type QuerySearchTagsArgs = {
  where: SearchTagsWhere;
};


export type QuerySocialUserProfileArgs = {
  where: SocialUserProfileWhere;
};


export type QueryStatUserLessonConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<StatUserLessonConnectionOrder>;
  where: StatUserLessonConnectionWhere;
};


export type QueryStatUserSummaryArgs = {
  where?: InputMaybe<StatUserSummaryWhere>;
};


export type QueryStatUserSummaryConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryStatUserViewArgs = {
  where: StatUserViewWhere;
};


export type QueryUploadImageConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UploadImageConnectionOrder>;
  where?: InputMaybe<UploadImageConnectionWhere>;
};


export type QueryUserArgs = {
  where?: InputMaybe<UserWhere>;
};


export type QueryUserAuthIdentityArgs = {
  where: UserAuthIdentityWhere;
};


export type QueryUserConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserConnectionOrder>;
  where?: InputMaybe<UserConnectionWhere>;
};


export type QueryUserContactArgs = {
  where?: InputMaybe<UserContactWhere>;
};


export type QueryUserContactConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserContactConnectionOrder>;
  where?: InputMaybe<UserContactConnectionWhere>;
};


export type QueryUserCsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserCsConnectionOrder>;
  where?: InputMaybe<UserCsConnectionWhere>;
};


export type QueryUserProfileConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserProfileConnectionOrder>;
  where?: InputMaybe<UserProfileConnectionWhere>;
};


export type QueryUserProfileTokenArgs = {
  where: UserProfileTokenWhere;
};

/** 문제 답안 */
export type QuestionAnswer = {
  /** 퀴즈 문제 선택보기 ID */
  choiceIds: Array<Scalars['ID']>;
  /** 퀴즈 문제 ID */
  questionId: Scalars['ID'];
};

/** 퀴즈 문제 결과 */
export type QuestionResultOutput = {
  __typename?: 'QuestionResultOutput';
  choiceIds: Array<Scalars['ID']>;
  pass: Scalars['Boolean'];
  question: QuizQuestionResult;
};

/** 퀴즈 */
export type Quiz = {
  __typename?: 'Quiz';
  /** 작성자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 퀴즈 ID */
  id: Scalars['ID'];
  /** 질문 목록 */
  questions: Array<QuizQuestion>;
  /** 제한 시간 */
  time: Scalars['Int'];
  /** 제목 */
  title: Scalars['String'];
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 퀴즈 문제 보기 */
export type QuizChoice = {
  __typename?: 'QuizChoice';
  /** 선택지(보기) ID */
  id: Scalars['ID'];
  /** 보기 내용 */
  text: Scalars['String'];
};

/** 퀴즈 문제 보기 결과 */
export type QuizChoiceResult = {
  __typename?: 'QuizChoiceResult';
  /** 선택지(보기) ID */
  id: Scalars['ID'];
  /** 정답 여부 */
  isCorrect: Scalars['Boolean'];
  /** 보기 내용 */
  text: Scalars['String'];
};

/** 퀴즈 목록 */
export type QuizConnection = {
  __typename?: 'QuizConnection';
  /** 퀴즈 리스트 */
  nodes: Array<Quiz>;
  /** 총 퀴즈 수 */
  totalCount: Scalars['Int'];
};

export type QuizConnectionOrder = {
  /** 차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<QuizConnectionOrderFieldType>;
};

/** 퀴즈 정렬 기준 */
export enum QuizConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type QuizConnectionWhere = {
  /** 키워드 (제목, 작성자) */
  keyword?: InputMaybe<Scalars['String']>;
};

/** 퀴즈 문제 */
export type QuizQuestion = {
  __typename?: 'QuizQuestion';
  /** 선택지 */
  choices: Array<QuizChoice>;
  /** 난이도 */
  difficulty: QuizQuestionDifficultyType;
  /** 힌트 */
  hint?: Maybe<Scalars['String']>;
  /** 질문 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 서브 질문 내용 */
  subText: Scalars['String'];
  /** 학습 대상 */
  target: QuizQuestionTargetType;
  /** 질문 내용 */
  text: Scalars['String'];
  /** 유형 (객관식, 주관식) */
  type: QuizQuestionType;
};

/** 퀴즈 문제 목록 */
export type QuizQuestionConnection = {
  __typename?: 'QuizQuestionConnection';
  /** 퀴즈 문제 목록 */
  nodes: Array<QuizQuestion>;
  /** 총 퀴즈 문제 수 */
  totalCount: Scalars['Int'];
};

export type QuizQuestionConnectionOrder = {
  /** 차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<QuizQuestionConnectionOrderFieldType>;
};

/** 퀴즈 문제 정렬 기준 */
export enum QuizQuestionConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type QuizQuestionConnectionWhere = {
  /** 난이도 */
  difficulty: Array<QuizQuestionDifficultyType>;
  /** 학습 대상 */
  target: Array<QuizQuestionTargetType>;
  /** 유형 (객관식, 주관식) */
  type?: InputMaybe<QuizQuestionType>;
};

/** 문제 난이도 */
export enum QuizQuestionDifficultyType {
  Easy = 'EASY',
  Hard = 'HARD',
  Moderate = 'MODERATE'
}

/** 프로그래밍 언어 */
export enum QuizQuestionLanguageType {
  Go = 'GO',
  Javascript = 'JAVASCRIPT',
  Python = 'PYTHON'
}

/** 퀴즈 문제풀이 결과 */
export type QuizQuestionResult = {
  __typename?: 'QuizQuestionResult';
  /** 선택지 */
  choices: Array<QuizChoiceResult>;
  /** 해설 */
  commentary?: Maybe<Scalars['String']>;
  /** 난이도 */
  difficulty: QuizQuestionDifficultyType;
  /** 힌트 */
  hint?: Maybe<Scalars['String']>;
  /** 질문 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 서브 질문 내용 */
  subText: Scalars['String'];
  /** 학습 대상 */
  target: QuizQuestionTargetType;
  /** 질문 내용 */
  text: Scalars['String'];
  /** 유형 (객관식, 주관식) */
  type: QuizQuestionType;
};

/** 문제 학습 대상 */
export enum QuizQuestionTargetType {
  College = 'COLLEGE',
  EarlyElementary = 'EARLY_ELEMENTARY',
  Expert = 'EXPERT',
  HighSchooler = 'HIGH_SCHOOLER',
  LateElementary = 'LATE_ELEMENTARY',
  MiddleSchooler = 'MIDDLE_SCHOOLER'
}

/** 문제 유형 */
export enum QuizQuestionType {
  /** 객관식 */
  Multiple = 'MULTIPLE',
  /** 주관식 (단답형) */
  Short = 'SHORT'
}

export type QuizQuestionWhere = {
  /** 퀴즈 문제 ID */
  id: Scalars['ID'];
};

/** 퀴즈 결과 */
export type QuizResultOutput = {
  __typename?: 'QuizResultOutput';
  /** 맞은 문제 수 */
  correctQuestionNum: Scalars['Int'];
  /** 문제 결과 */
  questionResults: Array<QuestionResultOutput>;
  /** 전체 문제 수 */
  totalQuestionNum: Scalars['Int'];
};

/** 퀴즈 결과 조회 조건 */
export type QuizResultWhere = {
  quizTakingId: Scalars['ID'];
};

export type QuizWhere = {
  /** 퀴즈 ID */
  id: Scalars['ID'];
};

/** 랜덤 퀴즈 문제 조회 인풋 */
export type RandomQuizQuestion = {
  /** 언어 */
  languages: Array<QuizQuestionLanguageType>;
};

/** ReTokenUserInput 토큰재요청 */
export type ReTokenUserInput = {
  refreshToken: Scalars['String'];
};

export type ReadNotificationInput = {
  /** 알림 아이디 */
  id: Scalars['ID'];
};

export type RemoveLiveLessonParticipantInput = {
  /** 삭제할 참가자 */
  identity: Scalars['String'];
  /** 참가자가 속한 방 이름 */
  roomName: Scalars['String'];
};

/** RemoveUserProfileInput 프로필 삭제 */
export type RemoveUserProfileInput = {
  profileId: Scalars['String'];
  userId: Scalars['String'];
};

export type Reply = Node & {
  __typename?: 'Reply';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  ownerId: Scalars['String'];
  ownerName: Scalars['String'];
  reviewId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type RequestCourseApplicationInput = {
  /** 주소 */
  addr?: InputMaybe<Scalars['String']>;
  /** 상세 주소 */
  addrDetail?: InputMaybe<Scalars['String']>;
  /** 생년월일 (ex. 1990-12-25) */
  birthdate?: InputMaybe<Scalars['String']>;
  /** 이메일 */
  email?: InputMaybe<Scalars['String']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 연락처 (ex. 010-9100-1476) */
  phone?: InputMaybe<Scalars['String']>;
  /** 원본 데이터 */
  raw: Scalars['String'];
  /** 우편번호 */
  zipCode?: InputMaybe<Scalars['String']>;
};

export type RequestCourseInput = {
  /** 코스 ID */
  courseId: Scalars['String'];
  /** 학습자 정보 */
  participant: RequestCourseParticipantInput;
  /** 개강일 (교육자주도학습 - Required, 자기주도학습 - Optional) */
  startDateTime?: InputMaybe<Scalars['String']>;
};

/** 코스 신청 결과 */
export type RequestCourseOutput = {
  __typename?: 'RequestCourseOutput';
  /** 결과 */
  result: Scalars['Boolean'];
  /** 스케줄그룹(클래스) ID */
  scheduleGroupId?: Maybe<Scalars['String']>;
};

export type RequestCourseParticipantInput = {
  /** 출생년도 */
  birthYear: Scalars['Int'];
  /** 코딩 경험 */
  codingExperiences: Array<CodingType>;
  /** 이름 */
  name: Scalars['String'];
  /** 연락처 */
  phoneNumber: Scalars['String'];
  /** 프로필 ID */
  profileId: Scalars['String'];
};

/** RequestOrderInput 주문요청 입력 */
export type RequestOrderInput = {
  /** 주문코드 */
  orderId: Scalars['String'];
  /** 환불정보 */
  refund: RequestOrderRefundInput;
  /** 주문 상태 */
  status: OrderStatus;
};

/** RequestOrderRefundInput 환불입력 정보 */
export type RequestOrderRefundInput = {
  /** 상품정보 */
  items: Array<RequestOrderRefundItemInput>;
};

/** RequestOrderRefundItemInput 환불 상품 정보 */
export type RequestOrderRefundItemInput = {
  /** 주문 상품 코드 */
  orderItemId: Scalars['String'];
};

/** 인증 문자 발송 */
export type RequestUserAuthToSmsInput = {
  email: Scalars['String'];
  phone: Scalars['String'];
};

/** 이메일 찾기 - 문자 발송 */
export type RequestUserEmailToSmsInput = {
  email: Scalars['String'];
  phone: Scalars['String'];
};

/** 비밀번호 찾기 - 문자발송 */
export type RequestUserPasswordToSmsInput = {
  email: Scalars['String'];
  phone: Scalars['String'];
};

export type ResetClassroomStudentTempPasswordInput = {
  userId: Scalars['String'];
};

/** 핀코드 Reset */
export type ResetUserPinCodeInput = {
  id?: InputMaybe<Scalars['String']>;
  identityCode?: InputMaybe<Scalars['String']>;
};

/** ResponseUserContactInput 고객 1:1 응답 */
export type ResponseUserContactInput = {
  /** Contact ID */
  id: Scalars['ID'];
  /** 응답 */
  response: Scalars['String'];
};

/** ResponseUserCsInput 고객 CS 응답 */
export type ResponseUserCsInput = {
  id: Scalars['ID'];
  response: Scalars['String'];
};

export type Review = Node & {
  __typename?: 'Review';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  ownerId: Scalars['String'];
  ownerName: Scalars['String'];
  replies: Array<Maybe<Reply>>;
  serviceId: Scalars['String'];
  serviceType: ReviewServiceType;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ReviewConnection = {
  __typename?: 'ReviewConnection';
  edges: Array<Maybe<ReviewEdge>>;
  nodes: Array<Maybe<Review>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum ReviewConnectionField {
  Id = 'ID'
}

export type ReviewConnectionOrder = {
  field: ReviewConnectionField;
};

export type ReviewConnectionWhere = {
  filter?: InputMaybe<Scalars['String']>;
  serviceId?: InputMaybe<Scalars['String']>;
  serviceType?: InputMaybe<ReviewServiceType>;
};

export type ReviewEdge = {
  __typename?: 'ReviewEdge';
  cursor: Scalars['String'];
  node: Review;
};

export type ReviewQna = Node & {
  __typename?: 'ReviewQna';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  replies: Array<Maybe<Reply>>;
  serviceId: Scalars['String'];
  serviceType: ReviewServiceType;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ReviewQnaConnection = {
  __typename?: 'ReviewQnaConnection';
  edges: Array<Maybe<ReviewQnaEdge>>;
  nodes: Array<Maybe<ReviewQna>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum ReviewQnaConnectionField {
  Id = 'ID'
}

export type ReviewQnaConnectionOrder = {
  field: ReviewQnaConnectionField;
};

export type ReviewQnaConnectionWhere = {
  filter?: InputMaybe<Scalars['String']>;
  serviceId?: InputMaybe<Scalars['String']>;
  serviceType?: InputMaybe<ReviewQnaServiceType>;
};

export type ReviewQnaEdge = {
  __typename?: 'ReviewQnaEdge';
  cursor: Scalars['String'];
  node: ReviewQna;
};

export type ReviewQnaReply = Node & {
  __typename?: 'ReviewQnaReply';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  reviewQnaId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum ReviewQnaServiceType {
  Curriculum = 'CURRICULUM',
  Lesson = 'LESSON'
}

export type ReviewQnaWhere = {
  id: Scalars['ID'];
};

export enum ReviewServiceType {
  Curriculum = 'CURRICULUM',
  Lesson = 'LESSON'
}

export type ReviewWhere = {
  id: Scalars['ID'];
};

export type SaveAiModel = {
  __typename?: 'SaveAIModel';
  /** 모델 ID */
  id: Scalars['ID'];
};

export type SaveAiModelInput = {
  /** 모델 유형 ID */
  aiModelCategoryID: Scalars['ID'];
  /** 배치 사이즈 */
  batchSize: Scalars['Int'];
  /** 에포크 */
  epoch: Scalars['Int'];
  /** 학습률 */
  learningRate: Scalars['Float'];
  /** model.json 파일 경로 */
  modelUrl: Scalars['String'];
  /** 모델명 */
  name: Scalars['String'];
  /** 클래스 목록 인풋 */
  platClassifiers: Array<CreatePlatClassifierInput>;
  /** 프로필 ID */
  profileId: Scalars['ID'];
  /** 검증 데이터 비율 */
  validationDataRate: Scalars['Float'];
};

export enum ScheduleGroupRelateTutorStatusType {
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  Request = 'REQUEST'
}

export enum SearchConnectionDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum SearchConnectionField {
  CreatedAt = 'CREATED_AT',
  Popularity = 'POPULARITY',
  Rating = 'RATING'
}

export type SearchConnectionOrder = {
  direction: SearchConnectionDirection;
  field: SearchConnectionField;
};

export type SearchConnectionWhere = {
  filter?: InputMaybe<Scalars['String']>;
};

export enum SearchIndexType {
  Lesson = 'LESSON',
  LessonBook = 'LESSON_BOOK',
  LessonCurriculum = 'LESSON_CURRICULUM'
}

export type SearchTag = {
  __typename?: 'SearchTag';
  count: Scalars['Int'];
  name: Scalars['String'];
};

export type SearchTagsWhere = {
  indexTypes: Array<SearchIndexType>;
};

export type SendDataToLiveLessonParticipantInput = {
  /** 전송할 데이터 (json 문자열 형태) */
  data: Scalars['String'];
  /** 전송할 참여자의 sid 목록 */
  destinationSids: Array<Scalars['String']>;
  /** 방 이름 */
  roomName: Scalars['String'];
};

export type SendKakaoMessageAttendanceRequestInput = {
  /** 유저 프로필 이름 */
  profileName: Scalars['String'];
  /** 메시지 전송할 고객 전화번호 */
  to: Scalars['String'];
};

export enum ServiceType {
  Allthatcoding = 'ALLTHATCODING',
  Home = 'HOME',
  Letsmodi = 'LETSMODI',
  Lms = 'LMS',
  Makingpack = 'MAKINGPACK',
  Modifactory = 'MODIFACTORY',
  Modiplanet = 'MODIPLANET'
}

/** SingleUploadFileInput 단일 파일 업로드 Input */
export type SingleUploadFileInput = {
  file: Scalars['Upload'];
  functionType: UploadFileType;
  id?: InputMaybe<Scalars['String']>;
};

/** 비디오 업로드 인풋 */
export type SingleUploadVideoInput = {
  file: Scalars['Upload'];
};

/** 비디오 업로드 결과 */
export type SingleUploadVideoOutput = {
  __typename?: 'SingleUploadVideoOutput';
  status: Scalars['Boolean'];
};

/** 소셜 프로필 정보 */
export type SocialUserProfile = {
  __typename?: 'SocialUserProfile';
  /** accessToken */
  accessToken: Scalars['String'];
  /** AgeRange */
  ageRange: Scalars['String'];
  /** AgeRangeNeedsAgreement */
  ageRangeNeedsAgreement: Scalars['Boolean'];
  /** 프로필 이미지 */
  avatar: ImageInfo;
  /** birthday */
  birthday: Scalars['String'];
  /** BirthdayNeedsAgreement */
  birthdayNeedsAgreement: Scalars['Boolean'];
  /** 사용자 이메일 */
  email: Scalars['String'];
  /** emailNeedsAgreement */
  emailNeedsAgreement: Scalars['Boolean'];
  /** gender */
  gender: Scalars['String'];
  /** genderNeedsAgreement */
  genderNeedsAgreement: Scalars['Boolean'];
  /** HasAgeRange */
  hasAgeRange: Scalars['Boolean'];
  /** HasBirthday */
  hasBirthday: Scalars['Boolean'];
  /** hasGender */
  hasGender: Scalars['Boolean'];
  id: Scalars['String'];
  /** IsEmailValid */
  isEmailValid: Scalars['Boolean'];
  /** 이름 */
  name: Scalars['String'];
  /** 사용자 폰번호 */
  phone: Scalars['String'];
  /** refreshToken */
  refreshToken: Scalars['String'];
};

/** SocialUserProfileWhere 프로필 조회 */
export type SocialUserProfileWhere = {
  redirectURL: Scalars['String'];
  socialAuthCode: Scalars['String'];
};

export type StartClassroomLessonStudentInput = {
  classroomId: Scalars['String'];
  lessonId: Scalars['String'];
};

export type StartCourseLessonInput = {
  /** 방 이름 */
  roomName: Scalars['String'];
  /** 스케줄 ID */
  scheduleId: Scalars['String'];
};

/** 레슨 시작 결과 */
export type StartCourseLessonOutput = {
  __typename?: 'StartCourseLessonOutput';
  /** 토큰 */
  token: Scalars['String'];
};

/** 퀴즈 시작 인풋 */
export type StartQuizInput = {
  /** 퀴즈 ID */
  quizId: Scalars['ID'];
};

/** 퀴즈 시작 결과 */
export type StartQuizOutput = {
  __typename?: 'StartQuizOutput';
  /** 응시 번호 */
  quizTakingId: Scalars['ID'];
};

export enum StatBookmarkServiceType {
  Curriculum = 'CURRICULUM',
  Lesson = 'LESSON'
}

export type StatLessnContentSubscribeWhere = {
  token: Scalars['String'];
};

export type StatLessonContent = {
  __typename?: 'StatLessonContent';
  UserHashKey: Scalars['String'];
  doneDate: Scalars['String'];
  isDone: Scalars['Boolean'];
  lessonContentId: Scalars['String'];
  lessonId: Scalars['String'];
};

export enum StatLikeServiceType {
  Curriculum = 'CURRICULUM',
  Lesson = 'LESSON'
}

export enum StatQuestionType {
  Coding = 'CODING',
  Normal = 'NORMAL',
  Pronunciation = 'PRONUNCIATION',
  Sentence = 'SENTENCE'
}

export type StatRate = {
  __typename?: 'StatRate';
  accuracy: Scalars['Int'];
  progress: Scalars['Int'];
  success: Scalars['Int'];
};

export type StatUserCapacity = {
  __typename?: 'StatUserCapacity';
  date: Scalars['String'];
  value: Scalars['Int'];
};

export type StatUserCapacityInfo = {
  __typename?: 'StatUserCapacityInfo';
  describe: Scalars['String'];
  mean: Scalars['Int'];
};

export type StatUserCapacityMean = {
  __typename?: 'StatUserCapacityMean';
  changingSituation: StatUserCapacityInfo;
  concentration: StatUserCapacityInfo;
  language: StatUserCapacityInfo;
  memory: StatUserCapacityInfo;
  thinkingSkill: StatUserCapacityInfo;
};

export type StatUserCapacityWeekly = {
  __typename?: 'StatUserCapacityWeekly';
  changingSituations: Array<StatUserCapacity>;
  concentrations: Array<StatUserCapacity>;
  languages: Array<StatUserCapacity>;
  memories: Array<StatUserCapacity>;
  thinkingSkills: Array<StatUserCapacity>;
};

export type StatUserLessonConnection = {
  __typename?: 'StatUserLessonConnection';
  edges: Array<Maybe<StatUserLessonEdge>>;
  nodes: Array<Scalars['String']>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum StatUserLessonConnectionField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Popularity = 'POPULARITY'
}

export type StatUserLessonConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field: StatUserLessonConnectionField;
};

export type StatUserLessonConnectionWhere = {
  provider?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  userId: Scalars['String'];
};

export type StatUserLessonCount = {
  __typename?: 'StatUserLessonCount';
  lessonDoneCount: Scalars['Int'];
  lessonOwnerCount: Scalars['Int'];
  lessonOwnerStudentCount: Scalars['Int'];
  lessonOwnerStudentMeanCount: Scalars['Int'];
  lessonRegisterCount: Scalars['Int'];
};

export type StatUserLessonEdge = {
  __typename?: 'StatUserLessonEdge';
  cursor: Scalars['String'];
  node: Scalars['String'];
};

export enum StatUserProviderType {
  Classroom = 'CLASSROOM',
  Teacher = 'TEACHER'
}

export type StatUserStudyTime = {
  __typename?: 'StatUserStudyTime';
  coding: Scalars['String'];
  days: Scalars['String'];
  english: Scalars['String'];
  game: Scalars['String'];
  normal: Scalars['String'];
};

export type StatUserSummary = Node & {
  __typename?: 'StatUserSummary';
  capacityMean: StatUserCapacityMean;
  capacityWeekly: StatUserCapacityWeekly;
  id: Scalars['ID'];
  lessonCount: StatUserLessonCount;
  provider: Scalars['String'];
  rate: StatRate;
  studyTime: StatUserStudyTime;
  userId: Scalars['String'];
  userName: Scalars['String'];
};

export type StatUserSummaryConnection = {
  __typename?: 'StatUserSummaryConnection';
  edges: Array<Maybe<StatUserSummaryEdge>>;
  nodes: Array<StatUserSummary>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type StatUserSummaryConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field: StatUserLessonConnectionField;
};

export type StatUserSummaryEdge = {
  __typename?: 'StatUserSummaryEdge';
  cursor: Scalars['String'];
  node: StatUserSummary;
};

export type StatUserSummaryWhere = {
  userId?: InputMaybe<Scalars['String']>;
  userProviderType?: InputMaybe<StatUserProviderType>;
};

export type StatUserView = {
  __typename?: 'StatUserView';
  curriculumID: Scalars['String'];
  lessonId: Scalars['String'];
  user: Scalars['String'];
};

export type StatUserViewWhere = {
  lessonIds?: InputMaybe<Array<Scalars['String']>>;
  userId: Scalars['String'];
};

/** 퀴즈 문제 리포트 제출 */
export type SubmitQuestionReportInput = {
  /** 퀴즈 문제 ID */
  questionId: Scalars['ID'];
  /** 리포트 내용 */
  report: Scalars['String'];
};

/** 퀴즈 문제 리포트 제출 결과 */
export type SubmitQuestionReportOutput = {
  __typename?: 'SubmitQuestionReportOutput';
  success: Scalars['Boolean'];
};

/** 퀴즈 답안 제출 인풋 */
export type SubmitQuizAnswerInput = {
  /** 퀴즈 답안 */
  answer: Array<QuestionAnswer>;
  /** 퀴즈 ID */
  quizId: Scalars['ID'];
  /** 퀴즈 응시 ID */
  quizTakingId: Scalars['ID'];
};

/** 퀴즈 답안 제출 결과 */
export type SubmitQuizAnswerOutput = {
  __typename?: 'SubmitQuizAnswerOutput';
  /** 응시 번호 */
  quizTakingId: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** `currentTime` will return a stream of `Time` objects. */
  currentTime: Time;
  /** 알림 읽음 상태로 변경 */
  notificationAdded: Notification;
  statLessnContentSubscribe: StatLessonContent;
};


export type SubscriptionNotificationAddedArgs = {
  input: AddedNotificationInput;
};


export type SubscriptionStatLessnContentSubscribeArgs = {
  where: StatLessnContentSubscribeWhere;
};

/**
 * `Time` is a simple type only containing the current time as
 * a unix epoch timestamp and a string timestamp.
 */
export type Time = {
  __typename?: 'Time';
  timeStamp: Scalars['String'];
  unixTime: Scalars['Int'];
};

export type ToggleLessonBookmarkInput = {
  serviceId: Scalars['String'];
  serviceType: BookmarkServiceType;
};

export type ToggleLessonLikeInput = {
  serviceId: Scalars['String'];
  serviceType: LikeServiceType;
};

export type ToggleStatLessonBookmarkInput = {
  serviceId: Scalars['String'];
  serviceType: StatBookmarkServiceType;
};

export type ToggleStatLessonLikeInput = {
  serviceId: Scalars['String'];
  serviceType: StatLikeServiceType;
};

export enum TrueFalseType {
  F = 'F',
  T = 'T'
}

export type UnenrollLessonCurriculumInput = {
  curriculumId: Scalars['String'];
};

export type UnreadNotificationInput = {
  /** 알림 아이디 */
  id: Scalars['ID'];
};

export type UpdateAiModel = {
  __typename?: 'UpdateAIModel';
  /** 모델 ID */
  id: Scalars['ID'];
};

export type UpdateAiModelInput = {
  /** 배치 사이즈 */
  batchSize?: InputMaybe<Scalars['Int']>;
  /** 에포크 */
  epoch?: InputMaybe<Scalars['Int']>;
  /** 모델 ID */
  id: Scalars['ID'];
  /** 학습률 */
  learningRate?: InputMaybe<Scalars['Float']>;
  /** model.json 파일 경로 */
  modelUrl?: InputMaybe<Scalars['String']>;
  /** 모델명 */
  name?: InputMaybe<Scalars['String']>;
  /** 클래스 목록 인풋 */
  platClassifiers?: InputMaybe<Array<CreatePlatClassifierInput>>;
  /** 검증 데이터 비율 */
  validationDataRate?: InputMaybe<Scalars['Float']>;
};

export type UpdateActivityInput = {
  /** coding 정보 */
  coding?: InputMaybe<UpdateCourseActivityCodingInput>;
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType?: InputMaybe<CourseActivityDType>;
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 액티비티 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx?: InputMaybe<Scalars['Int']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** pdf 정보 */
  pdf?: InputMaybe<UpdateCourseActivityPdfInput>;
  /** quiz 정보 */
  quiz?: InputMaybe<UpdateCourseQuizInput>;
  /** 공개유무 */
  state?: InputMaybe<Scalars['Boolean']>;
  /** 보조 자료 */
  supplementaryData?: InputMaybe<UpdateCourseSupplementaryDataInput>;
  /** textBook 정보 */
  textBook?: InputMaybe<UpdateCourseActivityTextBookInput>;
  /** vod 정보 */
  vod?: InputMaybe<UpdateCourseActivityVodInput>;
};

export type UpdateActivitySupplementaryDataInput = {
  /** 내용 */
  description?: InputMaybe<Scalars['String']>;
  /** 힌트 내용 */
  hintDescription?: InputMaybe<Scalars['String']>;
  /** 힌트 제목 */
  hintTitle?: InputMaybe<Scalars['String']>;
  /** 액티비티 보조자료 ID */
  id: Scalars['ID'];
  /** 컨텐츠 제공업체 */
  providerType?: InputMaybe<ContentProviderType>;
  /** 제목 */
  title?: InputMaybe<Scalars['String']>;
  /** 비디오 경로 */
  videoUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateActivityVodItemInput = {
  /** 아이템 유형 (퀴즈, 텍스트) */
  dType: CourseVodItemDType;
  /** 액티비티 VOD 아이템 ID */
  id: Scalars['ID'];
  /** 핀 위치 (초 단위) */
  pinPosition?: InputMaybe<Scalars['Int']>;
  /** 퀴즈 유형의 아이템 */
  quiz?: InputMaybe<UpdateCourseQuizInput>;
  /** 부제목 */
  subTitle?: InputMaybe<Scalars['String']>;
  /** textBook 정보 */
  textBook?: InputMaybe<UpdateCourseActivityVodItemTextBookInput>;
  /** 제목 */
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateAppBannerInput = {
  id: Scalars['ID'];
  idx?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<ImageInfoInput>;
  openType?: InputMaybe<OpenType>;
  subTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<AppBannerType>;
};

export type UpdateBoardDataInput = {
  dataByLanguages: Array<BoardDataByLanguageInput>;
  id: Scalars['ID'];
  isView?: InputMaybe<Scalars['Boolean']>;
  serviceType?: InputMaybe<ServiceType>;
};

export type UpdateBoardFaqInput = {
  faqCode?: InputMaybe<Scalars['Int']>;
  id: Scalars['ID'];
  isView?: InputMaybe<Scalars['Boolean']>;
  languages?: InputMaybe<Array<BoardFaqLanguageInput>>;
  serviceType?: InputMaybe<ServiceType>;
};

export type UpdateBoardIsTopInput = {
  id: Scalars['ID'];
};

export type UpdateBoardIsViewInput = {
  id: Scalars['ID'];
};

export type UpdateBoardNoticeInput = {
  contentId?: InputMaybe<Scalars['String']>;
  dataByLanguages: Array<BoardDataByLanguageInput>;
  id: Scalars['ID'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  isTop?: InputMaybe<Scalars['Boolean']>;
  isView?: InputMaybe<Scalars['Boolean']>;
  serviceType?: InputMaybe<ServiceType>;
};

export type UpdateClassroomHomeworkInput = {
  classroomId: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
  expireDate?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lessonId?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateClassroomInput = {
  gradeType?: InputMaybe<ClassroomGradeType>;
  id: Scalars['ID'];
  idx?: InputMaybe<Scalars['Int']>;
  mainImg?: InputMaybe<ImageInfoInput>;
  openType?: InputMaybe<ClassroomOpenType>;
  summary?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateClassroomNoticeInput = {
  classroomId: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateClassroomStudentHomeworkInput = {
  content?: InputMaybe<Scalars['String']>;
  fileBase64?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateClassroomStudentPasswordInput = {
  newPassword: Scalars['String'];
  oldPassword?: InputMaybe<Scalars['String']>;
};

export type UpdateClassroomTokenInput = {
  refreshToken: Scalars['String'];
};

export type UpdateCourseActivityCodingInput = {
  /** 정답 코드 */
  answerCode?: InputMaybe<Scalars['String']>;
  /** 유형 (MODITOR, PTYHON) */
  codingType?: InputMaybe<ActivityCodingType>;
  /** 코딩 ID */
  id: Scalars['ID'];
  /** 초기 코드 */
  initCode?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseActivityPdfInput = {
  /** PDF ID */
  id: Scalars['ID'];
  /** pdf 페이지 총 수 */
  totalCount?: InputMaybe<Scalars['Int']>;
  /** pdf 경로 */
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseActivityTextBookInput = {
  /** 내용 */
  content?: InputMaybe<Scalars['String']>;
  /** 텍스트북 ID */
  id: Scalars['ID'];
};

export type UpdateCourseActivityVodInput = {
  /** 전체 시간 (초 단위) */
  durationInSec?: InputMaybe<Scalars['Int']>;
  /** VOD ID */
  id: Scalars['ID'];
  /** 제공업체 유형 */
  providerType?: InputMaybe<ContentProviderType>;
  /** 경로 */
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseActivityVodItemTextBookInput = {
  /** 내용 */
  content: Scalars['String'];
  /** 텍스트북 ID */
  id: Scalars['ID'];
};

export type UpdateCourseAttendanceResultInput = {
  /** 프로필 ID */
  profileId: Scalars['String'];
  /** 스케줄 ID */
  scheduleId: Scalars['String'];
  /** 출결 상태 */
  status: CourseAttendanceType;
};

export type UpdateCourseChoiceInput = {
  /** 선택지(보기) ID */
  id: Scalars['ID'];
  /** 정답 여부 */
  isCorrect?: InputMaybe<Scalars['Boolean']>;
  /** 보기 내용 */
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseInput = {
  /** 유의사항 */
  caution?: InputMaybe<Scalars['String']>;
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 특징 */
  feature?: InputMaybe<Scalars['String']>;
  /** 코스 ID */
  id: Scalars['ID'];
  /** 이미지 */
  images?: InputMaybe<Array<CourseImageInput>>;
  /** 수강 최대연령 */
  maxAge?: InputMaybe<Scalars['Int']>;
  /** 최대 참여자수 */
  maxParticipant?: InputMaybe<Scalars['Int']>;
  /** 상품 아이디 목록 */
  merchandises?: InputMaybe<Array<CourseMerchandiseInput>>;
  /** 수강 최소연령 */
  minAge?: InputMaybe<Scalars['Int']>;
  /** 최소 참여자수 */
  minParticipant?: InputMaybe<Scalars['Int']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 가격 */
  price?: InputMaybe<Scalars['Int']>;
  /** 모집 종료일 */
  recruitmentEndDateTime?: InputMaybe<Scalars['String']>;
  /** 모집 시작일 */
  recruitmentStartDateTime?: InputMaybe<Scalars['String']>;
  /** 모집 대상 */
  recruitmentTarget?: InputMaybe<Scalars['String']>;
  /** 필수 준비물 */
  requiredPreparation?: InputMaybe<Scalars['String']>;
  /** 상태 */
  state?: InputMaybe<CourseProductStateType>;
  /** 재고 수 */
  stockCount?: InputMaybe<Scalars['Int']>;
  /** 태그 아이디 목록 */
  tags?: InputMaybe<Array<CourseTagInput>>;
  /** 교육 유형 (교육자주도학습, 자기주도학습) */
  type?: InputMaybe<CourseType>;
};

export type UpdateCourseLessonInput = {
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 소요시간 (분 단위) */
  durationTime?: InputMaybe<Scalars['Int']>;
  /** 레슨 ID */
  id: Scalars['ID'];
  /** 라이브 레슨 유무 */
  isLive?: InputMaybe<Scalars['Boolean']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseMerchandiseInput = {
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** ID */
  id: Scalars['ID'];
  /** 이미지 */
  images?: InputMaybe<Array<CourseImageInput>>;
  /** 상품 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 가격 */
  price?: InputMaybe<Scalars['Int']>;
  /** 구매 유형 */
  purchaseType?: InputMaybe<CourseProductPurchaseType>;
  /** 공개 여부 */
  state?: InputMaybe<CourseProductStateType>;
  /** 재고 수 */
  stockCount?: InputMaybe<Scalars['Int']>;
  /** 유형 */
  type?: InputMaybe<CourseMerchandiseType>;
};

export type UpdateCourseParticipantInput = {
  /** 출생년도 */
  birthYear?: InputMaybe<Scalars['Int']>;
  /** 코딩 경험 */
  codingExperiences: Array<CodingType>;
  /** 참여자 ID */
  id: Scalars['ID'];
  /** 학습자 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 학습자 전화번호 */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** 상태 */
  status?: InputMaybe<CourseParticipantStatusType>;
};

export type UpdateCourseProductInput = {
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** ID */
  id: Scalars['ID'];
  /** 이미지 */
  images?: InputMaybe<Array<CourseImageInput>>;
  /** 상품 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 가격 */
  price?: InputMaybe<Scalars['Int']>;
  /** 구매 유형 */
  purchaseType?: InputMaybe<CourseProductPurchaseType>;
  /** 공개 여부 */
  state?: InputMaybe<CourseProductStateType>;
  /** 재고 수 */
  stockCount?: InputMaybe<Scalars['Int']>;
};

export type UpdateCourseQuestionInput = {
  /** 선택지 */
  choices?: InputMaybe<Array<UpdateCourseChoiceInput>>;
  /** 질문 ID */
  id: Scalars['ID'];
  /** 서브 질문 내용 */
  subText?: InputMaybe<Scalars['String']>;
  /** 질문 내용 */
  text?: InputMaybe<Scalars['String']>;
  /** 유형 (객관식, 주관식) */
  type?: InputMaybe<CourseQuestionType>;
};

export type UpdateCourseQuizInput = {
  /** 퀴즈 ID */
  id: Scalars['ID'];
  /** 질문 목록 */
  questions?: InputMaybe<Array<CreateCourseQuestionInput>>;
  /** 제한 시간 */
  time?: InputMaybe<Scalars['Int']>;
  /** 제목 */
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseScheduleGroupInput = {
  /** 스케줄 그룹 ID */
  id: Scalars['String'];
  /** 최대 참여자수 */
  maxParticipant?: InputMaybe<Scalars['Int']>;
  /** 최소 참여자수 */
  minParticipant?: InputMaybe<Scalars['Int']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 개강일 (시간) */
  startDateTime?: InputMaybe<Scalars['String']>;
  /** 상태 */
  status?: InputMaybe<CourseScheduleGroupStatusType>;
  /** 유형 (일반, 보강) */
  type?: InputMaybe<CourseScheduleGroupType>;
};

/** 액티비티 보조 자료 수정 인풋 */
export type UpdateCourseSupplementaryDataInput = {
  /** 액티비티 ID */
  activityId: Scalars['String'];
  /** 내용 */
  description?: InputMaybe<Scalars['String']>;
  /** 힌트 내용 */
  hintDescription?: InputMaybe<Scalars['String']>;
  /** 힌트 제목 */
  hintTitle?: InputMaybe<Scalars['String']>;
  /** 컨텐츠 제공업체 */
  providerType?: InputMaybe<ContentProviderType>;
  /** 제목 */
  title?: InputMaybe<Scalars['String']>;
  /** 비디오 경로 */
  videoUrl?: InputMaybe<Scalars['String']>;
};

/** updateCourseTutor mutation input */
export type UpdateCourseTutorInput = {
  /** 이메일 */
  email?: InputMaybe<Scalars['String']>;
  /** 튜터 ID */
  id: Scalars['String'];
  /** 튜터 닉네임 */
  name?: InputMaybe<Scalars['String']>;
  /** 전화번호 */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** 시간당 가격 */
  price?: InputMaybe<Scalars['Int']>;
  /** 상태 (신청가능, 불가능) */
  state?: InputMaybe<CourseTutorStateType>;
  /** 과목 */
  subject?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseTutorScheduleGroupInput = {
  /** 종료 날짜 */
  endDateTime?: InputMaybe<Scalars['String']>;
  /** 튜터 스케줄그룹 ID */
  id: Scalars['String'];
  /** 반복 유무 */
  loop?: InputMaybe<CourseTutorScheduleGroupLoopType>;
  /** 시작 날짜 */
  startDateTime?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseTutorScheduleInput = {
  /** 스케쥴 종료 시간 */
  endDateTime?: InputMaybe<Scalars['String']>;
  /** 튜터 스케줄 ID */
  id: Scalars['String'];
  /** 스케쥴 시작 시간 */
  startDateTime?: InputMaybe<Scalars['String']>;
};

/** 언어 업데이트 인풋 */
export type UpdateLanguageInput = {
  /** 국가 코드 (KO, JP, DE etc..) */
  code?: InputMaybe<Scalars['String']>;
  /** ISO 숫자 */
  isoNumber?: InputMaybe<Scalars['Int']>;
  /** 언어 ID */
  languageId: Scalars['String'];
  /** 한글명 */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateLessonCurriculumInput = {
  bgImg?: InputMaybe<ImageInfoInput>;
  color?: InputMaybe<Scalars['String']>;
  groupType?: InputMaybe<LessonGroupType>;
  id: Scalars['ID'];
  idx?: InputMaybe<Scalars['Int']>;
  label?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<LessonCurriculumLanguageInput>>;
  levelType?: InputMaybe<LessonLevelType>;
  mainImgs?: InputMaybe<Array<InputMaybe<ImageInfoInput>>>;
  openType?: InputMaybe<OpenType>;
  serviceType?: InputMaybe<LessonServiceType>;
  summary?: InputMaybe<LessonSummaryInput>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  textColor?: InputMaybe<Scalars['String']>;
  viewType?: InputMaybe<LessonViewType>;
};

export type UpdateLessonCurriculumRelateInput = {
  curriculumId: Scalars['String'];
  idx?: InputMaybe<Scalars['Int']>;
  lessonId: Scalars['String'];
  summary?: InputMaybe<Scalars['String']>;
};

export type UpdateLessonHardwareInput = {
  hardwareType?: InputMaybe<LessonHardwareType>;
  id: Scalars['ID'];
  mainImg?: InputMaybe<ImageInfoInput>;
  subTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateLessonInput = {
  answerCode?: InputMaybe<Scalars['String']>;
  bgImg?: InputMaybe<ImageInfoInput>;
  classTime?: InputMaybe<Scalars['Int']>;
  color?: InputMaybe<Scalars['String']>;
  creationType?: InputMaybe<LessonCodingCreationType>;
  epubUrl?: InputMaybe<Scalars['String']>;
  groupType?: InputMaybe<LessonGroupType>;
  id: Scalars['ID'];
  idx?: InputMaybe<Scalars['Int']>;
  languages?: InputMaybe<Array<LessonLanguageInput>>;
  levelType?: InputMaybe<LessonLevelType>;
  lockType?: InputMaybe<TrueFalseType>;
  mainImgs?: InputMaybe<Array<InputMaybe<ImageInfoInput>>>;
  openType?: InputMaybe<OpenType>;
  serviceType?: InputMaybe<LessonServiceType>;
  summary?: InputMaybe<LessonSummaryInput>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  textColor?: InputMaybe<Scalars['String']>;
  videoType?: InputMaybe<Scalars['String']>;
  videoURL?: InputMaybe<Scalars['String']>;
};

export type UpdateLessonPlanContentInput = {
  id: Scalars['ID'];
  lessonId: Scalars['String'];
  lessonPlanId: Scalars['String'];
  templates?: InputMaybe<Array<LessonPlanContentTemplateInput>>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<LessonPlanContentType>;
  viewType?: InputMaybe<LessonPlanContentViewType>;
};

export type UpdateLessonPlanContentsIndexInput = {
  id: Scalars['ID'];
  idx: Scalars['Int'];
  lessonId: Scalars['String'];
  lessonPlanId: Scalars['String'];
};

export type UpdateLessonPlanInput = {
  contents?: InputMaybe<Array<LessonPlanContentInput>>;
  id: Scalars['ID'];
  idx?: InputMaybe<Scalars['Int']>;
  lessonId?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  viewType?: InputMaybe<LessonPlanViewType>;
};

export type UpdateLessonPlansIndexInput = {
  id: Scalars['ID'];
  idx: Scalars['Int'];
  lessonId: Scalars['String'];
};

export type UpdateLiveLessonMetadataInput = {
  /** 방 메타데이터 정보  (json 문자열 형태) */
  metadata: Scalars['String'];
  /** 방 이름 */
  roomName: Scalars['String'];
};

/** 쿠폰 수정 */
export type UpdateMarketingCouponInput = {
  /** 쿠폰 ID */
  couponId: Scalars['String'];
  /** 할인정보 */
  discount?: InputMaybe<DiscountInput>;
  /** 발급 수량 */
  issuerVolume?: InputMaybe<Scalars['Int']>;
  /** 발급 수량 타입 */
  issuerVolumeType?: InputMaybe<MarketingCouponIssuerVolumeType>;
  /** 최대 할인 금액 */
  maxDiscountPrice?: InputMaybe<MoneyInput>;
  /** 최소 주문 금액 */
  minOrderPrice?: InputMaybe<MoneyInput>;
  /** 상태 */
  status?: InputMaybe<MarketingCouponStatus>;
};

/** 프로모션 수정 */
export type UpdateMarketingPromotionInput = {
  /** 할인정보 */
  discount?: InputMaybe<DiscountInput>;
  /** 종료 시간 */
  endTime?: InputMaybe<Scalars['String']>;
  /** 프로모션 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 상품 ID */
  productIds?: InputMaybe<Array<Scalars['String']>>;
  /** 프로모션 ID */
  promotionId: Scalars['String'];
  /** 프로모션 스코프 전체 or 상품 */
  scopeType?: InputMaybe<MarketingPromotionScopeType>;
  /** 시작 시간 */
  startTime?: InputMaybe<Scalars['String']>;
  /** 상태수정 */
  status?: InputMaybe<MarketingPromotionStatus>;
};

export type UpdateNotificationInput = {
  /** 아이콘 URL */
  IconURL?: InputMaybe<Scalars['String']>;
  /** 알림 내용 */
  description: Scalars['String'];
  /** 이벤트 발생 시간 */
  eventDateTime?: InputMaybe<Scalars['String']>;
  /** 뉴스 아이디 */
  id: Scalars['ID'];
  /** live 시간 적용 */
  liveDateTime?: InputMaybe<Scalars['String']>;
  /** 알림 제목 */
  title: Scalars['String'];
  /** 웹 링크 URL */
  webLinkPath?: InputMaybe<Scalars['String']>;
};

/** UpdateOrderInvoiceInput [관리자] 주문 송장번호 등록 */
export type UpdateOrderInvoiceInput = {
  /** 택배사 ID */
  carrierId: Scalars['String'];
  /** 송장번호 등록 */
  invoice: Scalars['String'];
  /** 배송 ID */
  orderDeliveryId: Scalars['String'];
  /** 주문 코드 */
  orderId: Scalars['String'];
};

export type UpdateProjectInput = {
  codeType?: InputMaybe<ProjectCodeType>;
  id: Scalars['ID'];
  jsonData?: InputMaybe<Scalars['String']>;
  thumb?: InputMaybe<ImageInfoInput>;
  title?: InputMaybe<Scalars['String']>;
  userKey: Scalars['String'];
};

export type UpdateQuestionChoiceInput = {
  /** 선택지(보기) ID */
  id: Scalars['ID'];
  /** 정답 여부 */
  isCorrect?: InputMaybe<Scalars['Boolean']>;
  /** 보기 내용 */
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateQuestionInput = {
  /** 선택지 */
  choices?: InputMaybe<Array<UpdateQuestionChoiceInput>>;
  /** 해설 */
  commentary: Scalars['String'];
  /** 난이도 */
  difficulty: QuizQuestionDifficultyType;
  /** 힌트 */
  hint: Scalars['String'];
  /** 질문 ID */
  id: Scalars['ID'];
  /** 서브 질문 내용 */
  subText?: InputMaybe<Scalars['String']>;
  /** 학습 대상 */
  target: QuizQuestionTargetType;
  /** 질문 내용 */
  text?: InputMaybe<Scalars['String']>;
  /** 유형 (객관식, 주관식) */
  type?: InputMaybe<QuizQuestionType>;
};

export type UpdateReviewInput = {
  comment: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateReviewQnaInput = {
  comment: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateReviewReplyInput = {
  comment: Scalars['String'];
  id: Scalars['String'];
};

/** UpdateUserContactInput 고객 1:1 수정 */
export type UpdateUserContactInput = {
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 파일목록 */
  files?: InputMaybe<Array<FileInput>>;
  /** Contact ID */
  id: Scalars['ID'];
  /** 제목 */
  name?: InputMaybe<Scalars['String']>;
  /** 주문 ID */
  orderId?: InputMaybe<Scalars['String']>;
  /** 1:1 타입 */
  type?: InputMaybe<UserContactType>;
};

/** UpdateUserCsInput 고객 CS 수정 */
export type UpdateUserCsInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<UserCsType>;
};

/** UpdateUserInput 회원수정 */
export type UpdateUserInput = {
  accessToken?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  loginType?: InputMaybe<UserLoginType>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<UserState>;
  stateReason?: InputMaybe<Scalars['String']>;
};

/** 비밀번호 업데이트 */
export type UpdateUserPasswordInput = {
  authCode: Scalars['String'];
  password: Scalars['String'];
};

/** 핀코드 수정 */
export type UpdateUserPinCodeInput = {
  /** 핀코드 */
  pinCode: Scalars['String'];
};

/** UpdateUserProfileInput 프로필 수정 */
export type UpdateUserProfileInput = {
  avatar?: InputMaybe<ImageInfoInput>;
  birth?: InputMaybe<Scalars['String']>;
  codingTypes?: InputMaybe<Array<CodingType>>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  profileId: Scalars['ID'];
  val?: InputMaybe<Scalars['Int']>;
};

/** 핀코드 추가 */
export type UpdateUserProfilePinCodeInput = {
  /** 핀코드 */
  pinCode: Scalars['String'];
  /** 프로필 ID */
  profileId: Scalars['String'];
};

/** 비디오 업데이트 인풋 */
export type UpdateVideoInput = {
  /** 재생 시간 */
  durationInSec?: InputMaybe<Scalars['Int']>;
  /** 파일명 */
  name?: InputMaybe<Scalars['String']>;
  /** 제공 업체 */
  providerType?: InputMaybe<ContentProviderType>;
  /** 작업 상태 */
  statusType?: InputMaybe<ContentVideoStatusType>;
  /** 비디오 스트리밍 주소 */
  url?: InputMaybe<Scalars['String']>;
  /** 비디오 ID */
  videoId: Scalars['String'];
};

export type UploadFileInput = {
  file: Scalars['String'];
  functionType: UploadFileType;
  id?: InputMaybe<Scalars['String']>;
};

/** UploadFileType 업로드 파일 유형 */
export enum UploadFileType {
  Course = 'Course',
  Data = 'DATA',
  Etc = 'ETC',
  Faq = 'FAQ',
  Lesson = 'Lesson',
  Notice = 'NOTICE'
}

export type UploadImage = Node & {
  __typename?: 'UploadImage';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  idx: Scalars['Int'];
  image: ImageInfo;
  imageKey: Scalars['String'];
  serviceId: Scalars['String'];
  serviceType: UploadImageServiceType;
  updatedAt: Scalars['String'];
};

export type UploadImageConnection = {
  __typename?: 'UploadImageConnection';
  edges: Array<Maybe<UploadImageEdge>>;
  nodes: Array<Maybe<UploadImage>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum UploadImageConnectionField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Popularity = 'POPULARITY'
}

export type UploadImageConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field: UploadImageConnectionField;
};

export type UploadImageConnectionWhere = {
  serviceIds?: InputMaybe<Array<Scalars['String']>>;
  serviceType?: InputMaybe<UploadImageServiceType>;
};

export type UploadImageEdge = {
  __typename?: 'UploadImageEdge';
  cursor: Scalars['String'];
  node: UploadImage;
};

export enum UploadImageServiceType {
  Classroom = 'CLASSROOM',
  CodingEntry = 'CODING_ENTRY',
  CodingScratch = 'CODING_SCRATCH',
  Curriculum = 'CURRICULUM',
  Hardware = 'HARDWARE',
  Lesson = 'LESSON',
  LessonContent = 'LESSON_CONTENT',
  LessonPlan = 'LESSON_PLAN',
  Review = 'REVIEW'
}

export type User = {
  __typename?: 'User';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 사용자 이메일 */
  email: Scalars['String'];
  /** 이메일 인증여부 */
  emailVerified: Scalars['Boolean'];
  /** 아이디 No */
  id: Scalars['ID'];
  /** 관리자 여부 */
  isAdmin: Scalars['Boolean'];
  /** 핀코드 세팅여부 */
  isPinCode: Scalars['Boolean'];
  /** 튜터 여부 */
  isTutor: Scalars['Boolean'];
  /** 최근 로그인 날짜 */
  lastLoginDate: Scalars['String'];
  /** 가입자 이름 */
  name: Scalars['String'];
  /** 폰넘버 */
  phone: Scalars['String'];
  /** 핸드폰 인증여부 */
  phoneVerified: Scalars['Boolean'];
  /** 프로필 리스트 */
  profiles: Array<UserProfile>;
  /** 유저 상태 */
  state: UserState;
  /** 유저 상태 이유 */
  stateReason: Scalars['String'];
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type UserActivity = {
  __typename?: 'UserActivity';
  cBookmark: Scalars['Int'];
  cLessonMember: Scalars['Int'];
  cLike: Scalars['Int'];
  cReview: Scalars['Int'];
  cView: Scalars['Int'];
  doneDate: Scalars['String'];
  isBookmark: Scalars['Boolean'];
  isEnroll: Scalars['Boolean'];
  isLike: Scalars['Boolean'];
  progress: LessonProgress;
};

/** 본인 인증 조회 정보 */
export type UserAuthIdentity = {
  __typename?: 'UserAuthIdentity';
  /** 생년월일 */
  birth: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
  /** 폰번호 */
  phone: Scalars['String'];
};

/** 본인 인증 조회 */
export type UserAuthIdentityWhere = {
  identityCode: Scalars['String'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  /** 모든 연결노드 리스트 */
  edges: Array<Maybe<UserEdge>>;
  /** 모든 노드 리스트 */
  nodes: Array<User>;
  /** 페이지 정보 */
  pageInfo: PageInfo;
  /** 총수 */
  totalCount: Scalars['Int'];
};

export enum UserConnectionFieldType {
  Id = 'ID'
}

/** UserConnectionOrder 유저 리스트 순서 */
export type UserConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field?: InputMaybe<UserConnectionFieldType>;
};

/** UserConnectionWhere 유저 리스트 조회 */
export type UserConnectionWhere = {
  /** 관리자 권한 */
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  /** 튜터 권한 */
  isTutor?: InputMaybe<Scalars['Boolean']>;
  /** 키워드 (메일, user_id, 생년월일, 폰번호) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 유저 Ids */
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

/** UserContact 회원 1:1문의 등등 */
export type UserContact = {
  __typename?: 'UserContact';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 내용 */
  description: Scalars['String'];
  /** 첨부 파일 리스트 */
  files: Array<FileInfo>;
  /** id */
  id: Scalars['ID'];
  /** 제목 */
  name: Scalars['String'];
  /** 주문 번호 */
  orderId: Scalars['String'];
  /** 작성자 */
  owner: User;
  /** 응답 */
  response: Scalars['String'];
  /** 응답날짜 */
  responseDate: Scalars['String'];
  /** 응답자 */
  responseOwner: User;
  /** 상태 */
  status: UserContactStatus;
  /** 타입 */
  type: UserContactType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type UserContactConnection = {
  __typename?: 'UserContactConnection';
  edges: Array<Maybe<UserContactEdge>>;
  nodes: Array<UserContact>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

/** UserContactConnectionOrder 유저 1:1 리스트 순서 */
export type UserContactConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field?: InputMaybe<UserConnectionFieldType>;
};

/** UserContactConnectionWhere 유저 1:1 조건 */
export type UserContactConnectionWhere = {
  /** 상태 */
  status?: InputMaybe<UserContactStatus>;
  /** 분류 */
  type?: InputMaybe<UserContactType>;
  /** 유저번호 */
  userId?: InputMaybe<Scalars['String']>;
};

/** UserContactEdge 커서 */
export type UserContactEdge = {
  __typename?: 'UserContactEdge';
  /** 페이지네이션 cursor ID */
  cursor: Scalars['String'];
  /** Edge item */
  node: UserContact;
};

/** UserContactStatus 고객 1:1 상태 */
export enum UserContactStatus {
  /** 답변 작성 완료 */
  Complete = 'COMPLETE',
  /** 이슈 종료 */
  Done = 'DONE',
  /** 답변 대기 */
  Pending = 'PENDING'
}

/** UserContactType 고객 1:1 분류 */
export enum UserContactType {
  /** 전체 */
  All = 'ALL',
  /** 교육상품 */
  EduProduct = 'EDU_PRODUCT',
  /** 기타 */
  Etc = 'ETC',
  /** 취소/환불 */
  Order = 'ORDER',
  /** 결제 */
  Payment = 'PAYMENT',
  /** 제품 */
  Product = 'PRODUCT',
  /** 서비스 이용 */
  Service = 'SERVICE'
}

/** UserContactWhere 유저 1:1 조건 */
export type UserContactWhere = {
  id: Scalars['ID'];
};

/** UserCs 회원 CS 정보 */
export type UserCs = {
  __typename?: 'UserCs';
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 내용 */
  description: Scalars['String'];
  /** id */
  id: Scalars['ID'];
  /** 제목 */
  name: Scalars['String'];
  /** 작성자 */
  owner: User;
  /** 응답 */
  response: Scalars['String'];
  /** 응답자 */
  responseOwner: User;
  /** 상태 */
  status: UserCsStatus;
  /** 타입 */
  type: UserCsType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** 유저 */
  user: User;
};

export type UserCsConnection = {
  __typename?: 'UserCsConnection';
  /** 모든 연결노드 리스트 */
  edges: Array<Maybe<UserCsEdge>>;
  /** 모든 노드 리스트 */
  nodes: Array<UserCs>;
  /** 페이지 정보 */
  pageInfo: PageInfo;
  /** 총수 */
  totalCount: Scalars['Int'];
};

/** UserCsConnectionOrder 유저 Cs 리스트 순서 */
export type UserCsConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field?: InputMaybe<UserConnectionFieldType>;
};

/** UserCsConnectionWhere 유저 CS 조건 */
export type UserCsConnectionWhere = {
  /** 상태 */
  status?: InputMaybe<UserCsStatus>;
  /** 분류 */
  type?: InputMaybe<UserCsType>;
  /** 유저번호 */
  userId?: InputMaybe<Scalars['String']>;
};

/** UserCsEdge 커서 */
export type UserCsEdge = {
  __typename?: 'UserCsEdge';
  /** 페이지네이션 cursor ID */
  cursor: Scalars['String'];
  /** Edge item */
  node: UserCs;
};

/** UserCsStatus 고객 CS 시간 상태 */
export enum UserCsStatus {
  /** 답변 작성 완료 */
  Complete = 'COMPLETE',
  /** 이슈 종료 */
  Done = 'DONE',
  /** 답변 대기 */
  Pending = 'PENDING'
}

/** UserCsType 고객 CS 타입 */
export enum UserCsType {
  /** 교육상품 */
  EduProduct = 'EDU_PRODUCT',
  /** 기타 */
  Etc = 'ETC',
  /** 제품 */
  Product = 'PRODUCT',
  /** 서비스 이용 */
  Service = 'SERVICE'
}

/** 유저 대쉬보드 화면 정보 */
export type UserDashboard = {
  __typename?: 'UserDashboard';
  /** 관리자 권한수 */
  adminCount: Scalars['Int'];
  /** 총 유저수 */
  totalCount: Scalars['Int'];
  /** 튜터 권한수 */
  tutorCount: Scalars['Int'];
};

/** UserEdge 커서 */
export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

/** UserLoginType 로그인 타입 */
export enum UserLoginType {
  Email = 'EMAIL',
  Google = 'GOOGLE',
  Kakao = 'KAKAO'
}

/** UserProfile 프로필 */
export type UserProfile = {
  __typename?: 'UserProfile';
  /** 프로필 이미지 */
  avatar?: Maybe<ImageInfo>;
  /** 생년월일 8자리 */
  birth: Scalars['String'];
  /** 코딩 경험 */
  codingTypes: Array<CodingType>;
  /** 프로필 ID */
  id: Scalars['ID'];
  /** 프로필 이름 */
  name: Scalars['String'];
  /** 폰넘버 */
  phone: Scalars['String'];
  /** role */
  role?: Maybe<UserRoleType>;
  /** 유저 ID */
  userId: Scalars['String'];
};

export type UserProfileConnection = {
  __typename?: 'UserProfileConnection';
  /** 모든 연결노드 리스트 */
  edges: Array<Maybe<UserProfileEdge>>;
  /** 모든 노드 리스트 */
  nodes: Array<UserProfile>;
  /** 페이지 정보 */
  pageInfo: PageInfo;
  /** 총수 */
  totalCount: Scalars['Int'];
};

/** UserProfileConnectionOrder 유저 프로필 리스트 순서 */
export type UserProfileConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field?: InputMaybe<UserConnectionFieldType>;
};

/** UserProfileConnectionWhere 유저 프로필 리스트 조회 */
export type UserProfileConnectionWhere = {
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 폰번호 */
  phone?: InputMaybe<Scalars['String']>;
  /** 프로필 Ids */
  profileIds?: InputMaybe<Array<Scalars['String']>>;
  /** roles */
  roles?: InputMaybe<Array<UserRoleType>>;
  /** 유저번호 */
  userId?: InputMaybe<Scalars['String']>;
};

/** UserProfileEdge 커서 */
export type UserProfileEdge = {
  __typename?: 'UserProfileEdge';
  /** 페이지네이션 cursor ID */
  cursor: Scalars['String'];
  /** Edge item */
  node: UserProfile;
};

/** 유저 프로필 토큰 조회 */
export type UserProfileTokenWhere = {
  /** 프로필 핀코드 */
  pinCode?: InputMaybe<Scalars['String']>;
  /** 프로필 ID */
  profileId: Scalars['String'];
};

/** UserRoleType 유저 Role타입 */
export enum UserRoleType {
  /** 관리자 */
  Admin = 'ADMIN',
  /** 자식 */
  Child = 'CHILD',
  /** 부모 */
  Parent = 'PARENT',
  /** 선생 */
  Tutor = 'TUTOR'
}

/** UserState 유저 상태 */
export enum UserState {
  /** 블락리스트 */
  Blocking = 'BLOCKING',
  /** 삭제 */
  Deleted = 'DELETED',
  /** 이용중 */
  Online = 'ONLINE'
}

/** UserWhere 유저 조회 */
export type UserWhere = {
  id: Scalars['ID'];
};

export type VideoDetail = {
  __typename?: 'VideoDetail';
  durationInMs: Scalars['Int'];
  heightInPx: Scalars['Int'];
  url: Scalars['String'];
  videoType: LessonVideoGroupType;
  widthInPx: Scalars['Int'];
};

export type VideoInfo = {
  __typename?: 'VideoInfo';
  status: MediaProgressStatus;
  thumbnails: Array<ImageInfo>;
  videoDetails: Array<VideoDetail>;
};

export enum VideoServiceType {
  Book = 'BOOK',
  Curriculum = 'CURRICULUM',
  Lesson = 'LESSON',
  Plan = 'PLAN',
  Template = 'TEMPLATE'
}

export type CreateLessonAllIndexInput = {
  indexType: LessonIndexType;
};

export type SaveAiModelMutationVariables = Exact<{
  input: SaveAiModelInput;
}>;


export type SaveAiModelMutation = { __typename?: 'Mutation', saveAIModel: { __typename?: 'SaveAIModel', id: string } };

export type DeleteAiModelMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAiModelMutation = { __typename?: 'Mutation', deleteAIModel: { __typename?: 'DeleteAIModel', success: boolean } };

export type UpdateAiModelMutationVariables = Exact<{
  input: UpdateAiModelInput;
}>;


export type UpdateAiModelMutation = { __typename?: 'Mutation', updateAIModel: { __typename?: 'UpdateAIModel', id: string } };

export type AiModelCategoriesQueryVariables = Exact<{
  machineLearningTypes: Array<MachineLearningType> | MachineLearningType;
}>;


export type AiModelCategoriesQuery = { __typename?: 'Query', aiModelCategories: Array<{ __typename?: 'AIModelCategory', id: string, description: string, machineLearningType: MachineLearningType, imageUrl: string, name: string, type: AiModelCategoryType }> };

export type AiModelConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type AiModelConnectionQuery = { __typename?: 'Query', aiModelConnection: { __typename?: 'AIModelConnection', nodes: Array<{ __typename?: 'AIModel', id: string, name: string, aiModelCategory: { __typename?: 'AIModelCategory', type: AiModelCategoryType, id: string, imageUrl: string } }> } };

export type AiModelQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AiModelQuery = { __typename?: 'Query', aiModel: { __typename?: 'AIModel', aiModelCategoryId: string, batchSize: number, epoch: number, id: string, learningRate: number, modelUrl: string, name: string, validationDataRate: number, classifiers: Array<{ __typename: 'PlatClassifier', dataset: Array<string>, label: string }>, aiModelCategory: { __typename?: 'AIModelCategory', type: AiModelCategoryType, id: string } } };

export type BoardDataConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BoardDataConnectionOrder>;
  where?: InputMaybe<BoardDataConnectionWhere>;
  langType?: InputMaybe<LangType>;
}>;


export type BoardDataConnectionQuery = { __typename?: 'Query', boardDataConnection: { __typename?: 'BoardDataConnection', totalCount: number, nodes: Array<{ __typename?: 'BoardData', content: string, createdAt: string, id: string, isNew: boolean, isView: boolean, title: string, files: Array<{ __typename?: 'BoardFile', id: string, url: string, name: string } | null | undefined> } | null | undefined> } };

export type BoardDataQueryVariables = Exact<{
  where: BoardDataWhere;
}>;


export type BoardDataQuery = { __typename?: 'Query', boardData?: { __typename?: 'BoardData', content: string, createdAt: string, id: string, title: string, viewCount: number, files: Array<{ __typename?: 'BoardFile', id: string, url: string, name: string } | null | undefined>, cursorInfo: { __typename?: 'CursorInfo', after?: string | null | undefined, before?: string | null | undefined } } | null | undefined };

export type BoardFaqConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
  langType?: InputMaybe<LangType>;
  where?: InputMaybe<BoardFaqConnectionWhere>;
}>;


export type BoardFaqConnectionQuery = { __typename?: 'Query', boardFaqConnection: { __typename?: 'BoardFaqConnection', totalCount: number, nodes: Array<{ __typename?: 'BoardFaq', id: string, title: string, content: string, isView: boolean, createdAt: string, faqCodeName: string }>, pageInfo: { __typename?: 'PageInfo', startCursor: string, endCursor: string, hasNextPage: boolean, hasBeforePage: boolean } } };

export type BoardNoticeConnectionQueryVariables = Exact<{
  first: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
  langType?: InputMaybe<LangType>;
  where?: InputMaybe<BoardNoticeConnectionWhere>;
  field?: InputMaybe<BoardNoticeConnectionFieldType>;
  direction?: InputMaybe<OrderDirectionType>;
}>;


export type BoardNoticeConnectionQuery = { __typename?: 'Query', boardNoticeConnection: { __typename?: 'BoardNoticeConnection', totalCount: number, nodes: Array<{ __typename?: 'BoardNotice', id: string, title: string, content: string, isTop: boolean, isView: boolean, serviceType: ServiceType, createdAt: string, isNew: boolean }>, pageInfo: { __typename?: 'PageInfo', startCursor: string, endCursor: string, hasNextPage: boolean, hasBeforePage: boolean } } };

export type BoardNoticeQueryVariables = Exact<{
  where: BoardNoticeWhere;
}>;


export type BoardNoticeQuery = { __typename?: 'Query', boardNotice?: { __typename?: 'BoardNotice', id: string, title: string, content: string, isTop: boolean, isView: boolean, serviceType: ServiceType, createdAt: string, viewCount: number, files: Array<{ __typename?: 'BoardFile', url: string, name: string } | null | undefined>, dataByLanguages: Array<{ __typename?: 'BoardDataByLanguage', title: string, content: string, langType: LangType, files: Array<{ __typename?: 'BoardFile', id: string, name: string, type: string, url: string, langType: LangType } | null | undefined> }>, cursorInfo: { __typename?: 'CursorInfo', after?: string | null | undefined, before?: string | null | undefined } } | null | undefined };

export type CourseActivityQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CourseActivityQuery = { __typename?: 'Query', courseActivity: { __typename?: 'CourseActivityCoding', id: string, name: string, dType: CourseActivityDType, state: boolean, idx: number, coding: { __typename?: 'CourseActivityCodingDetail', codingType: ActivityCodingType }, supplementaryData?: { __typename?: 'CourseSupplementaryData', id: string, activityId: string, providerType?: ContentProviderType | null | undefined, videoUrl?: string | null | undefined, title: string, description: string, hintTitle?: string | null | undefined, hintDescription?: string | null | undefined } | null | undefined, activityHistoryItem?: { __typename?: 'ActivityHistoryItem', progressRate: number, isCompleted: boolean } | null | undefined } | { __typename?: 'CourseActivityPdf', id: string, name: string, dType: CourseActivityDType, state: boolean, idx: number, pdf: { __typename?: 'CourseActivityPdfDetail', totalCount: number, url: string, id: string }, supplementaryData?: { __typename?: 'CourseSupplementaryData', id: string, activityId: string, providerType?: ContentProviderType | null | undefined, videoUrl?: string | null | undefined, title: string, description: string, hintTitle?: string | null | undefined, hintDescription?: string | null | undefined } | null | undefined, activityHistoryItem?: { __typename?: 'ActivityHistoryItem', isCompleted: boolean, progressRate: number, detail?: { __typename?: 'ActivityPDFHistory', lastPage: number } | { __typename?: 'ActivityVODHistory' } | null | undefined } | null | undefined } | { __typename?: 'CourseActivityQuiz', id: string, name: string, dType: CourseActivityDType, state: boolean, idx: number, supplementaryData?: { __typename?: 'CourseSupplementaryData', id: string, activityId: string, providerType?: ContentProviderType | null | undefined, videoUrl?: string | null | undefined, title: string, description: string, hintTitle?: string | null | undefined, hintDescription?: string | null | undefined } | null | undefined, quiz: { __typename?: 'CourseQuiz', id: string, title: string, questions: Array<{ __typename?: 'CourseQuestion', id: string, idx: number, subText: string, text: string, type: CourseQuestionType, choices: Array<{ __typename?: 'CourseChoice', id: string, isCorrect: boolean, text: string }> }> }, activityHistoryItem?: { __typename?: 'ActivityHistoryItem', isCompleted: boolean, progressRate: number } | null | undefined } | { __typename?: 'CourseActivityTextBook', id: string, name: string, dType: CourseActivityDType, state: boolean, idx: number, textBook: { __typename?: 'CourseActivityTextBookDetail', content: string, id: string }, supplementaryData?: { __typename?: 'CourseSupplementaryData', id: string, activityId: string, providerType?: ContentProviderType | null | undefined, videoUrl?: string | null | undefined, title: string, description: string, hintTitle?: string | null | undefined, hintDescription?: string | null | undefined } | null | undefined, activityHistoryItem?: { __typename?: 'ActivityHistoryItem', isCompleted: boolean, progressRate: number } | null | undefined } | { __typename?: 'CourseActivityVod', id: string, name: string, dType: CourseActivityDType, state: boolean, idx: number, vod: { __typename?: 'CourseActivityVodDetail', id: string, durationInSec: number, providerType: ContentProviderType, url: string }, supplementaryData?: { __typename?: 'CourseSupplementaryData', id: string, activityId: string, providerType?: ContentProviderType | null | undefined, videoUrl?: string | null | undefined, title: string, description: string, hintTitle?: string | null | undefined, hintDescription?: string | null | undefined } | null | undefined, items: Array<{ __typename?: 'CourseVodItemQuiz', id: string, dType: CourseVodItemDType, title: string, subTitle?: string | null | undefined, pinPosition: number, quiz: { __typename?: 'CourseQuiz', questions: Array<{ __typename?: 'CourseQuestion', type: CourseQuestionType, text: string, subText: string, id: string, choices: Array<{ __typename?: 'CourseChoice', isCorrect: boolean, text: string, id: string }> }> } } | { __typename?: 'CourseVodItemText', id: string, dType: CourseVodItemDType, pinPosition: number, title: string, subTitle?: string | null | undefined, text: { __typename?: 'CourseVodItemTextDetail', content: string, id: string } }>, activityHistoryItem?: { __typename?: 'ActivityHistoryItem', isCompleted: boolean, progressRate: number, detail?: { __typename?: 'ActivityPDFHistory' } | { __typename?: 'ActivityVODHistory', videoPlaybackPosition: number } | null | undefined } | null | undefined } };

export type UpdateCourseAttendanceResultMutationVariables = Exact<{
  input: UpdateCourseAttendanceResultInput;
}>;


export type UpdateCourseAttendanceResultMutation = { __typename?: 'Mutation', updateCourseAttendanceResult: boolean };

export type CourseScheduleGroupConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseScheduleGroupConnectionOrder>;
  where: CourseScheduleGroupConnectionWhere;
}>;


export type CourseScheduleGroupConnectionQuery = { __typename?: 'Query', courseScheduleGroupConnection: { __typename?: 'CourseScheduleGroupConnection', totalCount: number, nodes: Array<{ __typename?: 'CourseScheduleGroup', id: string, createType: CourseScheduleGroupCreateType, code: string, name: string, courseId: string, imageUrl: string, courseType: CourseType, progressRate: number, attendanceRate: number, createdAt: string, deletedAt?: string | null | undefined, startDateTime: string, status: CourseScheduleGroupStatusType, type: CourseScheduleGroupType, updatedAt: string, schedules: Array<{ __typename?: 'CourseSchedule', id: string, isEnterable: boolean, isExistRoom: boolean, isMaterialDownloadable: boolean, scheduleGroupId: string, scheduleGroupName: string, startDateTime: string, createdAt: string }>, participants: Array<{ __typename?: 'CourseParticipant', birthYear: number, codingExperiences: Array<CodingType>, createdAt: string, deletedAt?: string | null | undefined, name: string, id: string, phoneNumber: string, scheduleGroupId: string, profileId: string, status: CourseParticipantStatusType, updatedAt: string, userId: string }>, lessons: Array<{ __typename?: 'CourseLesson', courseId: string, deletedAt?: string | null | undefined, createdAt: string, description?: string | null | undefined, durationTime: number, id: string, idx: number, name: string, isLive: boolean, updatedAt: string, materials: Array<{ __typename?: 'CourseLessonMaterial', deletedAt?: string | null | undefined, createdAt: string, id: string, lessonId: string, name: string, updatedAt: string, url: string }> }> }> } };

export type CourseScheduleGroupQueryVariables = Exact<{
  where: CourseScheduleGroupWhere;
}>;


export type CourseScheduleGroupQuery = { __typename?: 'Query', courseScheduleGroup: { __typename?: 'CourseScheduleGroup', createType: CourseScheduleGroupCreateType, code: string, courseId: string, createdAt: string, deletedAt?: string | null | undefined, id: string, imageUrl: string, name: string, progressRate: number, attendanceRate: number, startDateTime: string, status: CourseScheduleGroupStatusType, type: CourseScheduleGroupType, updatedAt: string, minParticipant?: number | null | undefined, maxParticipant?: number | null | undefined, lessons: Array<{ __typename?: 'CourseLesson', idx: number, courseId: string, createdAt: string, deletedAt?: string | null | undefined, description?: string | null | undefined, name: string, id: string, isLive: boolean, durationTime: number, updatedAt: string, materials: Array<{ __typename?: 'CourseLessonMaterial', deletedAt?: string | null | undefined, createdAt: string, id: string, lessonId: string, name: string, updatedAt: string, url: string }> }>, participants: Array<{ __typename?: 'CourseParticipant', birthYear: number, codingExperiences: Array<CodingType>, createdAt: string, deletedAt?: string | null | undefined, name: string, id: string, phoneNumber: string, scheduleGroupId: string, profileId: string, status: CourseParticipantStatusType, updatedAt: string, userId: string }>, tutor?: { __typename?: 'CourseTutor', name: string } | null | undefined, schedules: Array<{ __typename?: 'CourseSchedule', status: CourseScheduleStatusType, createdAt: string, deletedAt?: string | null | undefined, isExistRoom: boolean, isEnterable: boolean, id: string, scheduleGroupId: string, scheduleGroupName: string, startDateTime: string, updatedAt: string, lesson: { __typename?: 'CourseLesson', courseId: string, createdAt: string, deletedAt?: string | null | undefined, description?: string | null | undefined, durationTime: number, id: string, idx: number, name: string, isLive: boolean, updatedAt: string, materials: Array<{ __typename?: 'CourseLessonMaterial', deletedAt?: string | null | undefined, createdAt: string, id: string, lessonId: string, name: string, updatedAt: string, url: string }>, video?: { __typename?: 'CourseVideo', languageType: string, url: string, name: string, id: string } | null | undefined } }> } };

export type CourseScheduleGroupAndCourseQueryVariables = Exact<{
  where: CourseScheduleGroupWhere;
  courseWhere: CourseWhere;
}>;


export type CourseScheduleGroupAndCourseQuery = { __typename?: 'Query', courseScheduleGroup: { __typename?: 'CourseScheduleGroup', id: string, name: string, courseId: string, tutor?: { __typename?: 'CourseTutor', name: string } | null | undefined, lessons: Array<{ __typename?: 'CourseLesson', idx: number, courseId: string, createdAt: string, description?: string | null | undefined, name: string, id: string, isLive: boolean, durationTime: number, materials: Array<{ __typename?: 'CourseLessonMaterial', createdAt: string, id: string, lessonId: string, name: string, url: string }> }>, participants: Array<{ __typename?: 'CourseParticipant', birthYear: number, codingExperiences: Array<CodingType>, createdAt: string, name: string, id: string, phoneNumber: string, scheduleGroupId: string, profileId: string, status: CourseParticipantStatusType, userId: string }>, schedules: Array<{ __typename?: 'CourseSchedule', isMaterialDownloadable: boolean, isExistRoom: boolean, isEnterable: boolean, createdAt: string, id: string, roomName: string, scheduleGroupId: string, scheduleGroupName: string, startDateTime: string, updatedAt: string, attendance?: { __typename?: 'CourseAttendance', status: CourseAttendanceType, progressRate: number } | null | undefined, lesson: { __typename?: 'CourseLesson', courseId: string, createdAt: string, description?: string | null | undefined, durationTime: number, id: string, idx: number, name: string, isLive: boolean, updatedAt: string, materials: Array<{ __typename?: 'CourseLessonMaterial', deletedAt?: string | null | undefined, createdAt: string, id: string, lessonId: string, name: string, updatedAt: string, url: string }> }, activityHistory?: { __typename?: 'ActivityHistory', lastActivityID: string, progressRate: number } | null | undefined }> }, course: { __typename?: 'Course', id: string, requiredPreparation?: string | null | undefined, caution?: string | null | undefined } };

export type CourseAttendanceResultQueryVariables = Exact<{
  where: CourseAttendanceResultWhere;
}>;


export type CourseAttendanceResultQuery = { __typename?: 'Query', courseAttendanceResult: Array<{ __typename?: 'AttendanceResult', profileId: string, scheduleGroupId: string, attendances: Array<{ __typename?: 'Attendance', idx: number, runningTime: number, scheduleId: string, status: CourseAttendanceType }> }> };

export type CourseAttendanceQueryVariables = Exact<{
  where: CourseAttendanceWhere;
}>;


export type CourseAttendanceQuery = { __typename?: 'Query', courseAttendance: { __typename?: 'Attendance', runningTime: number } };

export type RequestCourseMutationVariables = Exact<{
  input: RequestCourseInput;
}>;


export type RequestCourseMutation = { __typename?: 'Mutation', requestCourse: { __typename?: 'RequestCourseOutput', result: boolean, scheduleGroupId?: string | null | undefined } };

export type RequestCourseApplicationMutationVariables = Exact<{
  input: RequestCourseApplicationInput;
}>;


export type RequestCourseApplicationMutation = { __typename?: 'Mutation', requestCourseApplication: { __typename?: 'CourseApplication', name?: string | null | undefined, raw: string } };

export type CourseConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseConnectionOrder>;
  where?: InputMaybe<CourseConnectionWhere>;
}>;


export type CourseConnectionQuery = { __typename?: 'Query', courseConnection: { __typename?: 'CourseConnection', totalCount: number, nodes: Array<{ __typename?: 'Course', id: string, name: string, description?: string | null | undefined, type: CourseType, isEndRecruitment: boolean, isSale: boolean, isNew: boolean, maxAge: number, minAge: number, maxParticipant: number, minParticipant: number, images: Array<{ __typename?: 'CourseImage', id: string, idx: number, url: string }>, tags: Array<{ __typename?: 'CourseTag', name: string }> }> } };

export type CourseQueryVariables = Exact<{
  where: CourseWhere;
}>;


export type CourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, name: string, type: CourseType, minParticipant: number, maxParticipant: number, minAge: number, maxAge: number, description?: string | null | undefined, price: number, feature?: string | null | undefined, caution?: string | null | undefined, requiredPreparation?: string | null | undefined, recruitmentStartDateTime?: string | null | undefined, recruitmentEndDateTime?: string | null | undefined, recruitmentTarget?: string | null | undefined, isEndRecruitment: boolean, images: Array<{ __typename?: 'CourseImage', id: string, idx: number, url: string }>, lessons: Array<{ __typename?: 'CourseLesson', durationTime: number, name: string, id: string, idx: number, isLive: boolean }>, tags: Array<{ __typename?: 'CourseTag', name: string }>, merchandises: Array<{ __typename?: 'CourseMerchandise', id: string, name: string, purchaseType: CourseProductPurchaseType, stockCount: number, price: number, type: CourseMerchandiseType }> } };

export type GetCourseTypeQueryVariables = Exact<{
  where: CourseWhere;
}>;


export type GetCourseTypeQuery = { __typename?: 'Query', course: { __typename?: 'Course', type: CourseType } };

export type OrderedCourseQueryVariables = Exact<{
  where: CourseWhere;
}>;


export type OrderedCourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, name: string, price: number, images: Array<{ __typename?: 'CourseImage', id: string, idx: number, url: string }>, merchandises: Array<{ __typename?: 'CourseMerchandise', id: string, name: string, purchaseType: CourseProductPurchaseType, price: number, type: CourseMerchandiseType, images: Array<{ __typename?: 'CourseImage', id: string, idx: number, url: string }> }> } };

export type CreateCourseParticipantLessonFeedbackMutationVariables = Exact<{
  input: CreateCourseParticipantLessonFeedbackInput;
}>;


export type CreateCourseParticipantLessonFeedbackMutation = { __typename?: 'Mutation', createCourseParticipantLessonFeedback: boolean };

export type EnterCourseLessonMutationVariables = Exact<{
  input: EnterCourseLessonInput;
}>;


export type EnterCourseLessonMutation = { __typename?: 'Mutation', enterCourseLesson: { __typename?: 'EnterCourseLessonOutput', token: string } };

export type StartCourseLessonMutationVariables = Exact<{
  input: StartCourseLessonInput;
}>;


export type StartCourseLessonMutation = { __typename?: 'Mutation', startCourseLesson: { __typename?: 'StartCourseLessonOutput', token: string } };

export type EndCourseLessonMutationVariables = Exact<{
  input: EndCourseLessonInput;
}>;


export type EndCourseLessonMutation = { __typename?: 'Mutation', endCourseLesson: { __typename?: 'EndCourseLessonOutput', result: boolean } };

export type CourseLessonQueryVariables = Exact<{
  where: CourseLessonWhere;
}>;


export type CourseLessonQuery = { __typename?: 'Query', courseLesson: { __typename?: 'CourseLesson', createdAt: string, id: string, name: string, activities: Array<{ __typename?: 'CourseActivityCoding', createdAt: string, dType: CourseActivityDType, idx: number, name: string, state: boolean, id: string, supplementaryData?: { __typename?: 'CourseSupplementaryData', description: string, title: string, videoUrl?: string | null | undefined, activityId: string } | null | undefined } | { __typename?: 'CourseActivityPdf', createdAt: string, dType: CourseActivityDType, idx: number, name: string, state: boolean, id: string, supplementaryData?: { __typename?: 'CourseSupplementaryData', description: string, title: string, videoUrl?: string | null | undefined, activityId: string } | null | undefined } | { __typename?: 'CourseActivityQuiz', createdAt: string, dType: CourseActivityDType, idx: number, name: string, state: boolean, id: string, supplementaryData?: { __typename?: 'CourseSupplementaryData', description: string, title: string, videoUrl?: string | null | undefined, activityId: string } | null | undefined } | { __typename?: 'CourseActivityTextBook', createdAt: string, dType: CourseActivityDType, idx: number, name: string, state: boolean, id: string, supplementaryData?: { __typename?: 'CourseSupplementaryData', description: string, title: string, videoUrl?: string | null | undefined, activityId: string } | null | undefined } | { __typename?: 'CourseActivityVod', deletedAt?: string | null | undefined, state: boolean, name: string, idx: number, id: string, createdAt: string, dType: CourseActivityDType, vod: { __typename?: 'CourseActivityVodDetail', id: string, durationInSec: number, providerType: ContentProviderType, url: string }, supplementaryData?: { __typename?: 'CourseSupplementaryData', activityId: string, title: string, description: string, videoUrl?: string | null | undefined } | null | undefined }> } };

export type AddDataAnalyzerMutationVariables = Exact<{
  input: Array<AddDataAnalyzerInput> | AddDataAnalyzerInput;
}>;


export type AddDataAnalyzerMutation = { __typename?: 'Mutation', addDataAnalyzer: boolean };

export type CourseScheduleQueryVariables = Exact<{
  where: CourseScheduleWhere;
  groupWhere: CourseScheduleGroupWhere;
}>;


export type CourseScheduleQuery = { __typename?: 'Query', courseSchedule: { __typename?: 'CourseSchedule', id: string, roomName: string, isExistRoom: boolean, scheduleGroupName: string, startDateTime: string, lesson: { __typename?: 'CourseLesson', idx: number, name: string } }, courseScheduleGroup: { __typename?: 'CourseScheduleGroup', imageUrl: string, tutor?: { __typename?: 'CourseTutor', name: string } | null | undefined } };

export type CourseScheduleAndScheduleGroupQueryVariables = Exact<{
  where: CourseScheduleWhere;
  scheduleGroupWhere: CourseScheduleGroupWhere;
}>;


export type CourseScheduleAndScheduleGroupQuery = { __typename?: 'Query', courseSchedule: { __typename?: 'CourseSchedule', id: string, roomName: string, startDateTime: string, scheduleGroupId: string, scheduleGroupName: string, lesson: { __typename?: 'CourseLesson', id: string, idx: number, isLive: boolean, courseId: string, name: string, description?: string | null | undefined, durationTime: number, activities: Array<{ __typename?: 'CourseActivityCoding', id: string, name: string, dType: CourseActivityDType, idx: number, state: boolean } | { __typename?: 'CourseActivityPdf', id: string, name: string, dType: CourseActivityDType, idx: number, state: boolean } | { __typename?: 'CourseActivityQuiz', id: string, name: string, dType: CourseActivityDType, idx: number, state: boolean } | { __typename?: 'CourseActivityTextBook', id: string, name: string, dType: CourseActivityDType, idx: number, state: boolean } | { __typename?: 'CourseActivityVod', id: string, name: string, dType: CourseActivityDType, idx: number, state: boolean }>, materials: Array<{ __typename?: 'CourseLessonMaterial', id: string, name: string, url: string }> }, activityHistory?: { __typename?: 'ActivityHistory', lastActivityID: string } | null | undefined }, courseScheduleGroup: { __typename?: 'CourseScheduleGroup', id: string, participants: Array<{ __typename?: 'CourseParticipant', birthYear: number, codingExperiences: Array<CodingType>, createdAt: string, name: string, id: string, phoneNumber: string, scheduleGroupId: string, profileId: string, status: CourseParticipantStatusType, updatedAt: string, userId: string }>, tutor?: { __typename?: 'CourseTutor', id: string, name: string } | null | undefined } };

export type ScheduleLessonQueryVariables = Exact<{
  where: CourseScheduleWhere;
}>;


export type ScheduleLessonQuery = { __typename?: 'Query', courseSchedule: { __typename?: 'CourseSchedule', id: string, startDateTime: string, lesson: { __typename?: 'CourseLesson', isLive: boolean, id: string, name: string, durationTime: number, activities: Array<{ __typename?: 'CourseActivityCoding', id: string, name: string, dType: CourseActivityDType, supplementaryData?: { __typename?: 'CourseSupplementaryData', id: string } | null | undefined } | { __typename?: 'CourseActivityPdf', id: string, name: string, dType: CourseActivityDType, supplementaryData?: { __typename?: 'CourseSupplementaryData', id: string } | null | undefined } | { __typename?: 'CourseActivityQuiz', id: string, name: string, dType: CourseActivityDType, supplementaryData?: { __typename?: 'CourseSupplementaryData', id: string } | null | undefined } | { __typename?: 'CourseActivityTextBook', id: string, name: string, dType: CourseActivityDType, supplementaryData?: { __typename?: 'CourseSupplementaryData', id: string } | null | undefined } | { __typename?: 'CourseActivityVod', id: string, name: string, dType: CourseActivityDType, supplementaryData?: { __typename?: 'CourseSupplementaryData', id: string } | null | undefined }> }, activityHistory?: { __typename?: 'ActivityHistory', lastActivityID: string } | null | undefined } };

export type CreateCourseTutorScheduleGroupMutationVariables = Exact<{
  input: CreateCourseTutorScheduleGroupInput;
}>;


export type CreateCourseTutorScheduleGroupMutation = { __typename?: 'Mutation', createCourseTutorScheduleGroup: { __typename?: 'CourseTutorScheduleGroup', id: string } };

export type UpdateCourseTutorScheduleMutationVariables = Exact<{
  input: UpdateCourseTutorScheduleInput;
}>;


export type UpdateCourseTutorScheduleMutation = { __typename?: 'Mutation', updateCourseTutorSchedule: boolean };

export type DeleteCourseTutorScheduleGroupMutationVariables = Exact<{
  input: DeleteCourseTutorScheduleGroupInput;
}>;


export type DeleteCourseTutorScheduleGroupMutation = { __typename?: 'Mutation', deleteCourseTutorScheduleGroup: boolean };

export type DeleteCourseTutorScheduleMutationVariables = Exact<{
  input: DeleteCourseTutorScheduleInput;
}>;


export type DeleteCourseTutorScheduleMutation = { __typename?: 'Mutation', deleteCourseTutorSchedule: boolean };

export type CourseTutorScheduleGroupConnectionQueryVariables = Exact<{
  where?: InputMaybe<CourseTutorScheduleGroupConnectionWhere>;
  orderBy?: InputMaybe<CourseTutorScheduleGroupConnectionOrder>;
  offset?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type CourseTutorScheduleGroupConnectionQuery = { __typename?: 'Query', courseTutorScheduleGroupConnection: { __typename?: 'CourseTutorScheduleGroupConnection', nodes: Array<{ __typename?: 'CourseTutorScheduleGroup', id: string, deletedAt?: string | null | undefined, createdAt: string, endDateTime: string, startDateTime: string, loop: CourseTutorScheduleGroupLoopType, tutorId: string, updatedAt: string }> } };

export type CourseTutorScheduleConnectionQueryVariables = Exact<{
  where?: InputMaybe<CourseTutorScheduleConnectionWhere>;
  orderBy?: InputMaybe<CourseTutorScheduleConnectionOrder>;
  offset?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type CourseTutorScheduleConnectionQuery = { __typename?: 'Query', courseTutorScheduleConnection: { __typename?: 'CourseTutorScheduleConnection', nodes: Array<{ __typename?: 'CourseTutorSchedule', id: string, tutorScheduleGroupId: string, updatedAt: string, startDateTime: string, endDateTime: string, deletedAt?: string | null | undefined, createdAt: string }> } };

export type MultiUploadFileMutationVariables = Exact<{
  input: MultiUploadFileInput;
}>;


export type MultiUploadFileMutation = { __typename?: 'Mutation', multiUploadFile: Array<string> };

export type SingleUploadFileMutationVariables = Exact<{
  input: SingleUploadFileInput;
}>;


export type SingleUploadFileMutation = { __typename?: 'Mutation', singleUploadFile: string };

export type PresignedUrlForVideoUploadQueryVariables = Exact<{
  fileName: Scalars['String'];
  fileType: Scalars['String'];
}>;


export type PresignedUrlForVideoUploadQuery = { __typename?: 'Query', presignedUrlForVideoUpload?: { __typename?: 'PresignedUrlForVideoUpload', url: string } | null | undefined };

export type MuteLiveLessonParticipantMutationVariables = Exact<{
  input: MuteLiveLessonParticipantInput;
}>;


export type MuteLiveLessonParticipantMutation = { __typename?: 'Mutation', muteLiveLessonParticipant: boolean };

export type RemoveLiveLessonParticipantMutationVariables = Exact<{
  input: RemoveLiveLessonParticipantInput;
}>;


export type RemoveLiveLessonParticipantMutation = { __typename?: 'Mutation', removeLiveLessonParticipant: boolean };

export type SendAttendanceRequestKakaoMessageMutationVariables = Exact<{
  input: SendKakaoMessageAttendanceRequestInput;
}>;


export type SendAttendanceRequestKakaoMessageMutation = { __typename?: 'Mutation', sendKakaoMessageAttendanceRequest: boolean };

export type UpdateLiveLessonMetadataMutationVariables = Exact<{
  input: UpdateLiveLessonMetadataInput;
}>;


export type UpdateLiveLessonMetadataMutation = { __typename?: 'Mutation', updateLiveLessonMetadata: { __typename?: 'LivekitRoom', sid: string, name: string, empty_timeout: number, creation_time: number, maxParticipants: number, turnPassword: string, metadata: string, numParticipants: number, enableCodecs: Array<{ __typename?: 'LivekitCodec', mime: string, fmtpLine: string }> } };

export type LivekitDeleteRoomMutationVariables = Exact<{
  input: LivekitDeleteRoomInput;
}>;


export type LivekitDeleteRoomMutation = { __typename?: 'Mutation', livekitDeleteRoom: boolean };

export type SendDataToLiveLessonParticipantMutationVariables = Exact<{
  input: SendDataToLiveLessonParticipantInput;
}>;


export type SendDataToLiveLessonParticipantMutation = { __typename?: 'Mutation', sendDataToLiveLessonParticipant: boolean };

export type LivekitUpdateParticipantMutationVariables = Exact<{
  input: LivekitUpdateParticipantInput;
}>;


export type LivekitUpdateParticipantMutation = { __typename?: 'Mutation', livekitUpdateParticipant: { __typename?: 'LivekitUpdateParticipantOutput', participant: { __typename?: 'LivekitParticipant', name: string, identity: string } } };

export type LiveLessonParticipantsQueryVariables = Exact<{
  input: LiveLessonParticipantsInput;
}>;


export type LiveLessonParticipantsQuery = { __typename?: 'Query', liveLessonParticipants: Array<{ __typename?: 'LiveLessonParticipant', sid: string, identity: string, name: string, joinedAt: number, isPublisher: boolean, metadata: string, state: LivekitParticipantStateType, tracks: Array<{ __typename?: 'LivekitTrack', sid: string, type: LivekitTrackType, name: string, muted: boolean, width: number, height: number, simulcast: boolean, disableDtx: boolean, source: LivekitTrackSourceType, mimeType: string, layers: Array<{ __typename?: 'LivekitVideoLayer', quality: LivekitVideoQualityType, width: number, height: number, bitrate: number }> }> }> };

export type LivekitListRoomQueryVariables = Exact<{ [key: string]: never; }>;


export type LivekitListRoomQuery = { __typename?: 'Query', livekitListRoom: Array<{ __typename?: 'LivekitRoom', sid: string, name: string, empty_timeout: number, creation_time: number, maxParticipants: number, turnPassword: string, metadata: string, numParticipants: number, enableCodecs: Array<{ __typename?: 'LivekitCodec', mime: string, fmtpLine: string }> }> };

export type LivekitCreateTokenQueryVariables = Exact<{
  input: LivekitCreateTokenInput;
}>;


export type LivekitCreateTokenQuery = { __typename?: 'Query', livekitCreateToken: string };

export type ReadNotificationMutationVariables = Exact<{
  input: ReadNotificationInput;
}>;


export type ReadNotificationMutation = { __typename?: 'Mutation', readNotification: { __typename?: 'Notification', id: string } };

export type NotificationConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NotificationConnectionOrder>;
  where?: InputMaybe<NotificationConnectionWhere>;
}>;


export type NotificationConnectionQuery = { __typename?: 'Query', notificationConnection: { __typename?: 'NotificationConnection', totalCount: number, nodes: Array<{ __typename?: 'Notification', id: string, IconURL?: string | null | undefined, description: string, eventDateTime?: string | null | undefined, liveDateTime?: string | null | undefined, title: string, webLinkPath?: string | null | undefined, profileId: string, uiType: NotificationUiType, state: NotificationState, createdAt: string }> } };

export type OnNotificationAddedSubscriptionVariables = Exact<{
  input: AddedNotificationInput;
}>;


export type OnNotificationAddedSubscription = { __typename?: 'Subscription', notificationAdded: { __typename?: 'Notification', id: string, IconURL?: string | null | undefined, description: string, eventDateTime?: string | null | undefined, liveDateTime?: string | null | undefined, title: string, webLinkPath?: string | null | undefined, profileId: string, uiType: NotificationUiType, state: NotificationState, createdAt: string } };

export type OnCurrentTimeSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnCurrentTimeSubscription = { __typename?: 'Subscription', currentTime: { __typename?: 'Time', unixTime: number, timeStamp: string } };

export type ApplyMarketingCouponMutationVariables = Exact<{
  input: ApplyMarketingCouponInput;
}>;


export type ApplyMarketingCouponMutation = { __typename?: 'Mutation', applyMarketingCoupon: { __typename?: 'MarketingCouponDownload', couponId: string, name: string, startTime: string, endTime: string, scopeType: MarketingCouponScopeType, discount: { __typename?: 'Discount', type: DiscountType, value: number }, minOrderPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, maxDiscountPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType } } };

export type MarketingCouponDownloadConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MarketingCouponDownloadConnectionOrder>;
  where?: InputMaybe<MarketingCouponDownloadConnectionWhere>;
}>;


export type MarketingCouponDownloadConnectionQuery = { __typename?: 'Query', marketingCouponDownloadConnection: { __typename?: 'MarketingCouponDownloadConnection', nodes: Array<{ __typename?: 'MarketingCouponDownload', couponId: string, name: string, startTime: string, endTime: string, scopeType: MarketingCouponScopeType, discount: { __typename?: 'Discount', type: DiscountType, value: number }, minOrderPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, maxDiscountPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType } }> } };

export type RequestOrderCodeMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestOrderCodeMutation = { __typename?: 'Mutation', requestOrderCode: string };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: string, status: OrderStatus, delivery?: { __typename?: 'OrderDelivery', id: string, updatedAt: string, address: { __typename?: 'OrderAddress', addr: string, id: string, addrDetail: string, zipcode: string }, shippingPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType } } | null | undefined, payments: Array<{ __typename?: 'OrderPayment', payMethod: string, impCode: string, pgProvider: string, paymentPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType } }>, totalPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, userInfo: { __typename?: 'OrderUserInfo', email: string, name: string, phone: string, userId: string } } };

export type CompleteOrderPaymentMutationVariables = Exact<{
  input: CompleteOrderPaymentInput;
}>;


export type CompleteOrderPaymentMutation = { __typename?: 'Mutation', completeOrderPayment: { __typename?: 'Order', id: string } };

export type OrderQueryVariables = Exact<{
  where: OrderWhere;
}>;


export type OrderQuery = { __typename?: 'Query', order: { __typename?: 'Order', id: string, createdAt: string, orderItems: Array<{ __typename?: 'OrderItem', product: { __typename?: 'OrderProduct', id: string, name: string, qty: number, scheduleGroupId: string, originPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, promotionPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType } } }>, orderRefunds: Array<{ __typename?: 'OrderRefund', id: string, orderRefundNo: string, orderId: string, payMethod: OrderPayMethodType, staffUserId: string, reason: string, status: OrderStatus, createdAt: string, processedAt: string, orderItems: Array<{ __typename?: 'OrderItem', id: string, orderItemNo: string, orderId: string, status: OrderStatus, createdAt: string, product: { __typename?: 'OrderProduct', id: string, name: string, purchaseType: OrderProductPurchaseType, scheduleGroupId: string, qty: number, image: { __typename?: 'ImageInfo', url: string }, originPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, promotionPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType } }, couponDiscount?: { __typename?: 'OrderDiscount', code: string, name: string, discountPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, discount: { __typename?: 'Discount', type: DiscountType, value: number } } | null | undefined }>, refundPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, shippingPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, customerChargeFee: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, delivery?: { __typename?: 'OrderDelivery', id: string, deliveryRequest: string, invoice: string, deliveryCarrierId: string, createdAt: string, updatedAt: string, processedAt: string, address: { __typename?: 'OrderAddress', id: string, addr: string, addrDetail: string, zipcode: string, userInfo: { __typename?: 'OrderUserInfo', userId: string, name: string, email: string, phone: string } }, shippingPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, couponDiscount: { __typename?: 'OrderDiscount', code: string, name: string, discountPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType } } } | null | undefined, couponDiscount?: { __typename?: 'OrderDiscount', code: string, name: string, discountPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, discount: { __typename?: 'Discount', type: DiscountType, value: number } } | null | undefined }>, profileInfo: { __typename?: 'OrderProfileInfo', birth: string, email: string, codingTypes: Array<CodingType>, name: string, phone: string }, userInfo: { __typename?: 'OrderUserInfo', name: string, email: string, phone: string }, delivery?: { __typename?: 'OrderDelivery', address: { __typename?: 'OrderAddress', zipcode: string, addr: string, addrDetail: string } } | null | undefined, couponDiscount?: { __typename?: 'OrderDiscount', name: string, discountPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType } } | null | undefined, totalItemsPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, shippingPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, totalDiscountPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, totalPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType }, payments: Array<{ __typename?: 'OrderPayment', pgProvider: string, cardQuota: number }> } };

export type OrderConnectionQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OrderConnectionOrder>;
  where?: InputMaybe<OrderConnectionWhere>;
}>;


export type OrderConnectionQuery = { __typename?: 'Query', orderConnection: { __typename?: 'OrderConnection', nodes: Array<{ __typename?: 'Order', id: string, createdAt: string, status: OrderStatus, orderItems: Array<{ __typename?: 'OrderItem', product: { __typename?: 'OrderProduct', name: string, scheduleGroupId: string } }>, profileInfo: { __typename?: 'OrderProfileInfo', name: string }, totalPrice: { __typename?: 'Money', amount: number, currencyType: CurrencyType } }> } };

export type OrderCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type OrderCardsQuery = { __typename?: 'Query', orderCards: Array<{ __typename?: 'OrderCard', code: string, enabled: boolean, name: string, icon: { __typename?: 'ImageInfo', url: string } }> };

export type OrderLastAddressQueryVariables = Exact<{ [key: string]: never; }>;


export type OrderLastAddressQuery = { __typename?: 'Query', orderLastAddress: { __typename?: 'OrderAddress', addr: string, addrDetail: string, zipcode: string, userInfo: { __typename?: 'OrderUserInfo', name: string, phone: string } } };

export type StartQuizMutationVariables = Exact<{
  input: StartQuizInput;
}>;


export type StartQuizMutation = { __typename?: 'Mutation', startQuiz: { __typename?: 'StartQuizOutput', quizTakingId: string } };

export type SubmitQuestionReportMutationVariables = Exact<{
  input: SubmitQuestionReportInput;
}>;


export type SubmitQuestionReportMutation = { __typename?: 'Mutation', submitQuestionReport: { __typename?: 'SubmitQuestionReportOutput', success: boolean } };

export type SubmitQuizAnswerMutationVariables = Exact<{
  input: SubmitQuizAnswerInput;
}>;


export type SubmitQuizAnswerMutation = { __typename?: 'Mutation', submitQuizAnswer: { __typename?: 'SubmitQuizAnswerOutput', quizTakingId: string } };

export type SubmitQuestionAnswerMutationVariables = Exact<{
  input: QuestionAnswer;
}>;


export type SubmitQuestionAnswerMutation = { __typename?: 'Mutation', submitQuestionAnswer: { __typename?: 'QuestionResultOutput', choiceIds: Array<string>, pass: boolean, question: { __typename?: 'QuizQuestionResult', hint?: string | null | undefined, commentary?: string | null | undefined, subText: string, text: string, choices: Array<{ __typename?: 'QuizChoiceResult', isCorrect: boolean, text: string, id: string }> } } };

export type ChallengeQuizConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<QuizConnectionOrder>;
  where?: InputMaybe<QuizConnectionWhere>;
}>;


export type ChallengeQuizConnectionQuery = { __typename?: 'Query', quizConnection: { __typename?: 'QuizConnection', totalCount: number, nodes: Array<{ __typename?: 'Quiz', id: string, title: string }> } };

export type ChallengeQuizQueryVariables = Exact<{
  where: QuizWhere;
}>;


export type ChallengeQuizQuery = { __typename?: 'Query', quiz: { __typename?: 'Quiz', id: string, title: string, questions: Array<{ __typename?: 'QuizQuestion', difficulty: QuizQuestionDifficultyType, hint?: string | null | undefined, id: string, idx: number, subText: string, text: string, choices: Array<{ __typename?: 'QuizChoice', id: string, text: string }> }> } };

export type RandomQuizQuestionQueryVariables = Exact<{
  where: RandomQuizQuestion;
}>;


export type RandomQuizQuestionQuery = { __typename?: 'Query', randomQuizQuestion: { __typename?: 'QuizQuestion', difficulty: QuizQuestionDifficultyType, hint?: string | null | undefined, id: string, target: QuizQuestionTargetType, subText: string, text: string, type: QuizQuestionType, choices: Array<{ __typename?: 'QuizChoice', id: string, text: string }> } };

export type QuizResultQueryVariables = Exact<{
  where: QuizResultWhere;
}>;


export type QuizResultQuery = { __typename?: 'Query', quizResult: { __typename?: 'QuizResultOutput', correctQuestionNum: number, totalQuestionNum: number, questionResults: Array<{ __typename?: 'QuestionResultOutput', choiceIds: Array<string>, pass: boolean, question: { __typename?: 'QuizQuestionResult', commentary?: string | null | undefined, hint?: string | null | undefined, text: string, subText: string, id: string, choices: Array<{ __typename?: 'QuizChoiceResult', id: string, isCorrect: boolean, text: string }> } }> } };

export type CourseCreateOpenRoomMutationVariables = Exact<{
  input: CourseCreateOpenRoomInput;
}>;


export type CourseCreateOpenRoomMutation = { __typename?: 'Mutation', courseCreateOpenRoom: { __typename?: 'CourseCreateOpenRoomOutput', token: string, room: { __typename?: 'CourseOpenRoom', id: string, roomName: string } } };

export type CourseJoinOpenRoomMutationVariables = Exact<{
  input: CourseJoinOpenRoomInput;
}>;


export type CourseJoinOpenRoomMutation = { __typename?: 'Mutation', courseJoinOpenRoom: { __typename?: 'CourseJoinOpenRoomOutput', token: string } };

export type CourseUploadOpenRoomSharedFileMutationVariables = Exact<{
  input: CourseUploadOpenRoomSharedFileInput;
}>;


export type CourseUploadOpenRoomSharedFileMutation = { __typename?: 'Mutation', courseUploadOpenRoomSharedFile: { __typename?: 'CourseUploadOpenRoomSharedFileOutput', success: boolean } };

export type CourseCompleteOpenRoomMutationVariables = Exact<{
  input: CourseCompleteOpenRoomInput;
}>;


export type CourseCompleteOpenRoomMutation = { __typename?: 'Mutation', courseCompleteOpenRoom: { __typename?: 'CourseCompleteOpenRoomOutput', success: boolean } };

export type CourseOpenRoomConnectionQueryVariables = Exact<{
  where?: InputMaybe<CourseOpenRoomConnectionWhere>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseOpenRoomConnectionOrder>;
}>;


export type CourseOpenRoomConnectionQuery = { __typename?: 'Query', courseOpenRoomConnection: { __typename?: 'CourseOpenRoomConnection', totalCount: number, nodes: Array<{ __typename?: 'CourseOpenRoom', id: string, isPublic: boolean, passwordProtected: boolean, roomName: string, type: CourseOpenRoomType, createdAt: string, creator: string, status: CourseOpenRoomStatusType, creatorName: string, currentParticipants: Array<{ __typename?: 'LiveLessonParticipant', name: string }> }> } };

export type CourseOpenRoomQueryVariables = Exact<{
  where: CourseOpenRoomWhere;
}>;


export type CourseOpenRoomQuery = { __typename?: 'Query', courseOpenRoom: { __typename?: 'CourseOpenRoom', id: string, isPublic: boolean, roomName: string, type: CourseOpenRoomType, creator: string, createdAt: string, inviteLink: { __typename?: 'CourseInviteLink', tutor: string, user: string }, sharedFiles: Array<{ __typename?: 'CourseSharedFile', id: string, type: string, url: string }> } };

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'JWT', accessToken: string, expiresIn: number, refreshToken: string, refreshExpiresIn: number } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: boolean };

export type LoginSocialUserMutationVariables = Exact<{
  input: LoginSocialUserInput;
}>;


export type LoginSocialUserMutation = { __typename?: 'Mutation', loginSocialUser: { __typename?: 'JWT', accessToken: string, expiresIn: number, refreshToken: string, refreshExpiresIn: number } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string } };

export type CreateUserSocialMutationVariables = Exact<{
  input: CreateUserSocialInput;
}>;


export type CreateUserSocialMutation = { __typename?: 'Mutation', createUserSocial: { __typename?: 'User', email: string } };

export type ReTokenUserMutationVariables = Exact<{
  input: ReTokenUserInput;
}>;


export type ReTokenUserMutation = { __typename?: 'Mutation', reTokenUser: { __typename?: 'JWT', accessToken: string, expiresIn: number, refreshToken: string, refreshExpiresIn: number } };

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type UserAuthIdentityQueryVariables = Exact<{
  where: UserAuthIdentityWhere;
}>;


export type UserAuthIdentityQuery = { __typename?: 'Query', userAuthIdentity: { __typename?: 'UserAuthIdentity', name: string, birth: string, phone: string } };

export type AddUserProfileMutationVariables = Exact<{
  input: AddUserProfileInput;
}>;


export type AddUserProfileMutation = { __typename?: 'Mutation', addUserProfile: { __typename?: 'User', profiles: Array<{ __typename?: 'UserProfile', id: string, name: string, birth: string, phone: string, userId: string, codingTypes: Array<CodingType>, avatar?: { __typename?: 'ImageInfo', domain: string, url: string, width: number, height: number, idx: number, key: string } | null | undefined }> } };

export type UpdateUserProfileMutationVariables = Exact<{
  input: UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile: { __typename?: 'User', profiles: Array<{ __typename?: 'UserProfile', id: string, name: string, birth: string, phone: string, codingTypes: Array<CodingType>, avatar?: { __typename?: 'ImageInfo', domain: string } | null | undefined }> } };

export type ResetUserPinCodeMutationVariables = Exact<{
  input: ResetUserPinCodeInput;
}>;


export type ResetUserPinCodeMutation = { __typename?: 'Mutation', resetUserPinCode: boolean };

export type UpdateUserPinCodeMutationVariables = Exact<{
  input: UpdateUserPinCodeInput;
}>;


export type UpdateUserPinCodeMutation = { __typename?: 'Mutation', updateUserPinCode: boolean };

export type UserProfileConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserProfileConnectionOrder>;
  where?: InputMaybe<UserProfileConnectionWhere>;
}>;


export type UserProfileConnectionQuery = { __typename?: 'Query', userProfileConnection: { __typename?: 'UserProfileConnection', nodes: Array<{ __typename?: 'UserProfile', id: string, userId: string, name: string, birth: string, phone: string, role?: UserRoleType | null | undefined, codingTypes: Array<CodingType>, avatar?: { __typename?: 'ImageInfo', url: string } | null | undefined }> } };

export type UserProfileTokenQueryVariables = Exact<{
  where: UserProfileTokenWhere;
}>;


export type UserProfileTokenQuery = { __typename?: 'Query', userProfileToken: { __typename?: 'JWT', accessToken: string, expiresIn: number, refreshToken: string, refreshExpiresIn: number } };

export type CreateUserContactMutationVariables = Exact<{
  input: CreateUserContactInput;
}>;


export type CreateUserContactMutation = { __typename?: 'Mutation', createUserContact: { __typename?: 'UserContact', id: string, type: UserContactType, description: string, status: UserContactStatus, createdAt: string } };

export type UserContactConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserContactConnectionOrder>;
  where?: InputMaybe<UserContactConnectionWhere>;
}>;


export type UserContactConnectionQuery = { __typename?: 'Query', userContactConnection: { __typename?: 'UserContactConnection', totalCount: number, nodes: Array<{ __typename?: 'UserContact', id: string, name: string, description: string, createdAt: string, response: string, responseDate: string, orderId: string, status: UserContactStatus, type: UserContactType, files: Array<{ __typename?: 'FileInfo', name: string, url: string }> }> } };

export type UserContactQueryVariables = Exact<{
  where?: InputMaybe<UserContactWhere>;
}>;


export type UserContactQuery = { __typename?: 'Query', userContact: { __typename?: 'UserContact', createdAt: string, description: string, id: string, name: string, orderId: string, response: string, type: UserContactType, updatedAt: string, owner: { __typename?: 'User', name: string, email: string }, responseOwner: { __typename?: 'User', name: string } } };

export type UserQueryVariables = Exact<{
  where: UserWhere;
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, name: string, phone: string, profiles: Array<{ __typename?: 'UserProfile', birth: string }> } };

export type ProfileConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileConnectionQuery = { __typename?: 'Query', user: { __typename?: 'User', isPinCode: boolean, profiles: Array<{ __typename?: 'UserProfile', id: string, birth: string, userId: string, role?: UserRoleType | null | undefined, name: string, phone: string, avatar?: { __typename?: 'ImageInfo', url: string } | null | undefined }> } };


export const SaveAiModelDocument = gql`
    mutation saveAIModel($input: SaveAIModelInput!) {
  saveAIModel(input: $input) {
    id
  }
}
    `;
export type SaveAiModelMutationFn = Apollo.MutationFunction<SaveAiModelMutation, SaveAiModelMutationVariables>;

/**
 * __useSaveAiModelMutation__
 *
 * To run a mutation, you first call `useSaveAiModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveAiModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveAiModelMutation, { data, loading, error }] = useSaveAiModelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveAiModelMutation(baseOptions?: Apollo.MutationHookOptions<SaveAiModelMutation, SaveAiModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveAiModelMutation, SaveAiModelMutationVariables>(SaveAiModelDocument, options);
      }
export type SaveAiModelMutationHookResult = ReturnType<typeof useSaveAiModelMutation>;
export type SaveAiModelMutationResult = Apollo.MutationResult<SaveAiModelMutation>;
export type SaveAiModelMutationOptions = Apollo.BaseMutationOptions<SaveAiModelMutation, SaveAiModelMutationVariables>;
export const DeleteAiModelDocument = gql`
    mutation deleteAIModel($id: ID!) {
  deleteAIModel(input: {id: $id}) {
    success
  }
}
    `;
export type DeleteAiModelMutationFn = Apollo.MutationFunction<DeleteAiModelMutation, DeleteAiModelMutationVariables>;

/**
 * __useDeleteAiModelMutation__
 *
 * To run a mutation, you first call `useDeleteAiModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAiModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAiModelMutation, { data, loading, error }] = useDeleteAiModelMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAiModelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAiModelMutation, DeleteAiModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAiModelMutation, DeleteAiModelMutationVariables>(DeleteAiModelDocument, options);
      }
export type DeleteAiModelMutationHookResult = ReturnType<typeof useDeleteAiModelMutation>;
export type DeleteAiModelMutationResult = Apollo.MutationResult<DeleteAiModelMutation>;
export type DeleteAiModelMutationOptions = Apollo.BaseMutationOptions<DeleteAiModelMutation, DeleteAiModelMutationVariables>;
export const UpdateAiModelDocument = gql`
    mutation updateAIModel($input: UpdateAIModelInput!) {
  updateAIModel(input: $input) {
    id
  }
}
    `;
export type UpdateAiModelMutationFn = Apollo.MutationFunction<UpdateAiModelMutation, UpdateAiModelMutationVariables>;

/**
 * __useUpdateAiModelMutation__
 *
 * To run a mutation, you first call `useUpdateAiModelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAiModelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAiModelMutation, { data, loading, error }] = useUpdateAiModelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAiModelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAiModelMutation, UpdateAiModelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAiModelMutation, UpdateAiModelMutationVariables>(UpdateAiModelDocument, options);
      }
export type UpdateAiModelMutationHookResult = ReturnType<typeof useUpdateAiModelMutation>;
export type UpdateAiModelMutationResult = Apollo.MutationResult<UpdateAiModelMutation>;
export type UpdateAiModelMutationOptions = Apollo.BaseMutationOptions<UpdateAiModelMutation, UpdateAiModelMutationVariables>;
export const AiModelCategoriesDocument = gql`
    query aiModelCategories($machineLearningTypes: [MachineLearningType!]!) {
  aiModelCategories(where: {machineLearningTypes: $machineLearningTypes}) {
    id
    description
    machineLearningType
    imageUrl
    name
    type
  }
}
    `;

/**
 * __useAiModelCategoriesQuery__
 *
 * To run a query within a React component, call `useAiModelCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAiModelCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAiModelCategoriesQuery({
 *   variables: {
 *      machineLearningTypes: // value for 'machineLearningTypes'
 *   },
 * });
 */
export function useAiModelCategoriesQuery(baseOptions: Apollo.QueryHookOptions<AiModelCategoriesQuery, AiModelCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiModelCategoriesQuery, AiModelCategoriesQueryVariables>(AiModelCategoriesDocument, options);
      }
export function useAiModelCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiModelCategoriesQuery, AiModelCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiModelCategoriesQuery, AiModelCategoriesQueryVariables>(AiModelCategoriesDocument, options);
        }
export type AiModelCategoriesQueryHookResult = ReturnType<typeof useAiModelCategoriesQuery>;
export type AiModelCategoriesLazyQueryHookResult = ReturnType<typeof useAiModelCategoriesLazyQuery>;
export type AiModelCategoriesQueryResult = Apollo.QueryResult<AiModelCategoriesQuery, AiModelCategoriesQueryVariables>;
export const AiModelConnectionDocument = gql`
    query aiModelConnection($first: Int, $offset: Int) {
  aiModelConnection(first: $first, offset: $offset) {
    nodes {
      id
      name
      aiModelCategory {
        type
        id
        imageUrl
      }
    }
  }
}
    `;

/**
 * __useAiModelConnectionQuery__
 *
 * To run a query within a React component, call `useAiModelConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAiModelConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAiModelConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useAiModelConnectionQuery(baseOptions?: Apollo.QueryHookOptions<AiModelConnectionQuery, AiModelConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiModelConnectionQuery, AiModelConnectionQueryVariables>(AiModelConnectionDocument, options);
      }
export function useAiModelConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiModelConnectionQuery, AiModelConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiModelConnectionQuery, AiModelConnectionQueryVariables>(AiModelConnectionDocument, options);
        }
export type AiModelConnectionQueryHookResult = ReturnType<typeof useAiModelConnectionQuery>;
export type AiModelConnectionLazyQueryHookResult = ReturnType<typeof useAiModelConnectionLazyQuery>;
export type AiModelConnectionQueryResult = Apollo.QueryResult<AiModelConnectionQuery, AiModelConnectionQueryVariables>;
export const AiModelDocument = gql`
    query aiModel($id: ID!) {
  aiModel(where: {id: $id}) {
    aiModelCategoryId
    batchSize
    classifiers {
      label
      ... on PlatClassifier {
        __typename
        dataset
        label
      }
    }
    epoch
    id
    learningRate
    modelUrl
    name
    validationDataRate
    aiModelCategory {
      type
      id
    }
  }
}
    `;

/**
 * __useAiModelQuery__
 *
 * To run a query within a React component, call `useAiModelQuery` and pass it any options that fit your needs.
 * When your component renders, `useAiModelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAiModelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAiModelQuery(baseOptions: Apollo.QueryHookOptions<AiModelQuery, AiModelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiModelQuery, AiModelQueryVariables>(AiModelDocument, options);
      }
export function useAiModelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiModelQuery, AiModelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiModelQuery, AiModelQueryVariables>(AiModelDocument, options);
        }
export type AiModelQueryHookResult = ReturnType<typeof useAiModelQuery>;
export type AiModelLazyQueryHookResult = ReturnType<typeof useAiModelLazyQuery>;
export type AiModelQueryResult = Apollo.QueryResult<AiModelQuery, AiModelQueryVariables>;
export const BoardDataConnectionDocument = gql`
    query boardDataConnection($first: Int!, $after: String, $offset: Int, $orderBy: BoardDataConnectionOrder, $where: BoardDataConnectionWhere, $langType: LangType) {
  boardDataConnection(
    first: $first
    after: $after
    langType: $langType
    offset: $offset
    orderBy: $orderBy
    where: $where
  ) {
    nodes {
      content
      createdAt
      id
      isNew
      isView
      title
      files {
        id
        url
        name
      }
    }
    totalCount
  }
}
    `;

/**
 * __useBoardDataConnectionQuery__
 *
 * To run a query within a React component, call `useBoardDataConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardDataConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardDataConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      langType: // value for 'langType'
 *   },
 * });
 */
export function useBoardDataConnectionQuery(baseOptions: Apollo.QueryHookOptions<BoardDataConnectionQuery, BoardDataConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardDataConnectionQuery, BoardDataConnectionQueryVariables>(BoardDataConnectionDocument, options);
      }
export function useBoardDataConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardDataConnectionQuery, BoardDataConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardDataConnectionQuery, BoardDataConnectionQueryVariables>(BoardDataConnectionDocument, options);
        }
export type BoardDataConnectionQueryHookResult = ReturnType<typeof useBoardDataConnectionQuery>;
export type BoardDataConnectionLazyQueryHookResult = ReturnType<typeof useBoardDataConnectionLazyQuery>;
export type BoardDataConnectionQueryResult = Apollo.QueryResult<BoardDataConnectionQuery, BoardDataConnectionQueryVariables>;
export const BoardDataDocument = gql`
    query boardData($where: BoardDataWhere!) {
  boardData(where: $where) {
    content
    createdAt
    id
    title
    viewCount
    files {
      id
      url
      name
    }
    cursorInfo {
      after
      before
    }
  }
}
    `;

/**
 * __useBoardDataQuery__
 *
 * To run a query within a React component, call `useBoardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardDataQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBoardDataQuery(baseOptions: Apollo.QueryHookOptions<BoardDataQuery, BoardDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardDataQuery, BoardDataQueryVariables>(BoardDataDocument, options);
      }
export function useBoardDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardDataQuery, BoardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardDataQuery, BoardDataQueryVariables>(BoardDataDocument, options);
        }
export type BoardDataQueryHookResult = ReturnType<typeof useBoardDataQuery>;
export type BoardDataLazyQueryHookResult = ReturnType<typeof useBoardDataLazyQuery>;
export type BoardDataQueryResult = Apollo.QueryResult<BoardDataQuery, BoardDataQueryVariables>;
export const BoardFaqConnectionDocument = gql`
    query boardFaqConnection($first: Int!, $offset: Int, $langType: LangType, $where: BoardFaqConnectionWhere) {
  boardFaqConnection(
    first: $first
    offset: $offset
    langType: $langType
    where: $where
  ) {
    nodes {
      id
      title
      content
      isView
      createdAt
      faqCodeName
    }
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasBeforePage
    }
  }
}
    `;

/**
 * __useBoardFaqConnectionQuery__
 *
 * To run a query within a React component, call `useBoardFaqConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardFaqConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardFaqConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      langType: // value for 'langType'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBoardFaqConnectionQuery(baseOptions: Apollo.QueryHookOptions<BoardFaqConnectionQuery, BoardFaqConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardFaqConnectionQuery, BoardFaqConnectionQueryVariables>(BoardFaqConnectionDocument, options);
      }
export function useBoardFaqConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardFaqConnectionQuery, BoardFaqConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardFaqConnectionQuery, BoardFaqConnectionQueryVariables>(BoardFaqConnectionDocument, options);
        }
export type BoardFaqConnectionQueryHookResult = ReturnType<typeof useBoardFaqConnectionQuery>;
export type BoardFaqConnectionLazyQueryHookResult = ReturnType<typeof useBoardFaqConnectionLazyQuery>;
export type BoardFaqConnectionQueryResult = Apollo.QueryResult<BoardFaqConnectionQuery, BoardFaqConnectionQueryVariables>;
export const BoardNoticeConnectionDocument = gql`
    query boardNoticeConnection($first: Int!, $offset: Int, $langType: LangType, $where: BoardNoticeConnectionWhere, $field: BoardNoticeConnectionFieldType, $direction: OrderDirectionType) {
  boardNoticeConnection(
    first: $first
    offset: $offset
    langType: $langType
    where: $where
    orderBy: {direction: $direction, field: $field}
  ) {
    nodes {
      id
      title
      content
      isTop
      isView
      serviceType
      createdAt
      isNew
    }
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasBeforePage
    }
  }
}
    `;

/**
 * __useBoardNoticeConnectionQuery__
 *
 * To run a query within a React component, call `useBoardNoticeConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardNoticeConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardNoticeConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      langType: // value for 'langType'
 *      where: // value for 'where'
 *      field: // value for 'field'
 *      direction: // value for 'direction'
 *   },
 * });
 */
export function useBoardNoticeConnectionQuery(baseOptions: Apollo.QueryHookOptions<BoardNoticeConnectionQuery, BoardNoticeConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardNoticeConnectionQuery, BoardNoticeConnectionQueryVariables>(BoardNoticeConnectionDocument, options);
      }
export function useBoardNoticeConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardNoticeConnectionQuery, BoardNoticeConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardNoticeConnectionQuery, BoardNoticeConnectionQueryVariables>(BoardNoticeConnectionDocument, options);
        }
export type BoardNoticeConnectionQueryHookResult = ReturnType<typeof useBoardNoticeConnectionQuery>;
export type BoardNoticeConnectionLazyQueryHookResult = ReturnType<typeof useBoardNoticeConnectionLazyQuery>;
export type BoardNoticeConnectionQueryResult = Apollo.QueryResult<BoardNoticeConnectionQuery, BoardNoticeConnectionQueryVariables>;
export const BoardNoticeDocument = gql`
    query boardNotice($where: BoardNoticeWhere!) {
  boardNotice(where: $where) {
    id
    title
    content
    isTop
    isView
    serviceType
    createdAt
    viewCount
    files {
      url
      name
    }
    dataByLanguages {
      title
      content
      langType
      files {
        id
        name
        type
        url
        langType
      }
    }
    cursorInfo {
      after
      before
    }
  }
}
    `;

/**
 * __useBoardNoticeQuery__
 *
 * To run a query within a React component, call `useBoardNoticeQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardNoticeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardNoticeQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useBoardNoticeQuery(baseOptions: Apollo.QueryHookOptions<BoardNoticeQuery, BoardNoticeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardNoticeQuery, BoardNoticeQueryVariables>(BoardNoticeDocument, options);
      }
export function useBoardNoticeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardNoticeQuery, BoardNoticeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardNoticeQuery, BoardNoticeQueryVariables>(BoardNoticeDocument, options);
        }
export type BoardNoticeQueryHookResult = ReturnType<typeof useBoardNoticeQuery>;
export type BoardNoticeLazyQueryHookResult = ReturnType<typeof useBoardNoticeLazyQuery>;
export type BoardNoticeQueryResult = Apollo.QueryResult<BoardNoticeQuery, BoardNoticeQueryVariables>;
export const CourseActivityDocument = gql`
    query courseActivity($id: ID!) {
  courseActivity(where: {id: $id}) {
    ... on CourseActivityTextBook {
      id
      name
      dType
      state
      idx
      textBook {
        content
        id
      }
      supplementaryData {
        id
        activityId
        providerType
        videoUrl
        title
        description
        hintTitle
        hintDescription
      }
      activityHistoryItem {
        isCompleted
        progressRate
      }
    }
    ... on CourseActivityPdf {
      id
      name
      dType
      state
      idx
      pdf {
        totalCount
        url
        id
      }
      supplementaryData {
        id
        activityId
        providerType
        videoUrl
        title
        description
        hintTitle
        hintDescription
      }
      activityHistoryItem {
        isCompleted
        progressRate
        detail {
          ... on ActivityPDFHistory {
            lastPage
          }
        }
      }
    }
    ... on CourseActivityCoding {
      id
      name
      dType
      state
      idx
      coding {
        codingType
      }
      supplementaryData {
        id
        activityId
        providerType
        videoUrl
        title
        description
        hintTitle
        hintDescription
      }
      activityHistoryItem {
        progressRate
        isCompleted
      }
    }
    ... on CourseActivityQuiz {
      id
      name
      dType
      state
      idx
      supplementaryData {
        id
        activityId
        providerType
        videoUrl
        title
        description
        hintTitle
        hintDescription
      }
      quiz {
        id
        title
        questions {
          id
          idx
          subText
          text
          type
          choices {
            id
            isCorrect
            text
          }
        }
      }
      activityHistoryItem {
        isCompleted
        progressRate
      }
    }
    ... on CourseActivityVod {
      id
      name
      dType
      state
      idx
      vod {
        id
        durationInSec
        providerType
        url
      }
      supplementaryData {
        id
        activityId
        providerType
        videoUrl
        title
        description
        hintTitle
        hintDescription
      }
      items {
        dType
        id
        subTitle
        title
        pinPosition
        ... on CourseVodItemText {
          id
          dType
          text {
            content
            id
          }
          pinPosition
          title
        }
        ... on CourseVodItemQuiz {
          id
          dType
          quiz {
            questions {
              type
              text
              subText
              id
              choices {
                isCorrect
                text
                id
              }
            }
          }
          title
        }
      }
      activityHistoryItem {
        isCompleted
        detail {
          ... on ActivityVODHistory {
            videoPlaybackPosition
          }
        }
        progressRate
      }
    }
  }
}
    `;

/**
 * __useCourseActivityQuery__
 *
 * To run a query within a React component, call `useCourseActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseActivityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseActivityQuery(baseOptions: Apollo.QueryHookOptions<CourseActivityQuery, CourseActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseActivityQuery, CourseActivityQueryVariables>(CourseActivityDocument, options);
      }
export function useCourseActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseActivityQuery, CourseActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseActivityQuery, CourseActivityQueryVariables>(CourseActivityDocument, options);
        }
export type CourseActivityQueryHookResult = ReturnType<typeof useCourseActivityQuery>;
export type CourseActivityLazyQueryHookResult = ReturnType<typeof useCourseActivityLazyQuery>;
export type CourseActivityQueryResult = Apollo.QueryResult<CourseActivityQuery, CourseActivityQueryVariables>;
export const UpdateCourseAttendanceResultDocument = gql`
    mutation updateCourseAttendanceResult($input: UpdateCourseAttendanceResultInput!) {
  updateCourseAttendanceResult(input: $input)
}
    `;
export type UpdateCourseAttendanceResultMutationFn = Apollo.MutationFunction<UpdateCourseAttendanceResultMutation, UpdateCourseAttendanceResultMutationVariables>;

/**
 * __useUpdateCourseAttendanceResultMutation__
 *
 * To run a mutation, you first call `useUpdateCourseAttendanceResultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseAttendanceResultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseAttendanceResultMutation, { data, loading, error }] = useUpdateCourseAttendanceResultMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCourseAttendanceResultMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseAttendanceResultMutation, UpdateCourseAttendanceResultMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseAttendanceResultMutation, UpdateCourseAttendanceResultMutationVariables>(UpdateCourseAttendanceResultDocument, options);
      }
export type UpdateCourseAttendanceResultMutationHookResult = ReturnType<typeof useUpdateCourseAttendanceResultMutation>;
export type UpdateCourseAttendanceResultMutationResult = Apollo.MutationResult<UpdateCourseAttendanceResultMutation>;
export type UpdateCourseAttendanceResultMutationOptions = Apollo.BaseMutationOptions<UpdateCourseAttendanceResultMutation, UpdateCourseAttendanceResultMutationVariables>;
export const CourseScheduleGroupConnectionDocument = gql`
    query courseScheduleGroupConnection($first: Int, $offset: Int, $orderBy: CourseScheduleGroupConnectionOrder, $where: CourseScheduleGroupConnectionWhere!) {
  courseScheduleGroupConnection(
    first: $first
    offset: $offset
    orderBy: $orderBy
    where: $where
  ) {
    totalCount
    nodes {
      id
      createType
      code
      name
      courseId
      imageUrl
      courseType
      schedules {
        id
        isEnterable
        isExistRoom
        isMaterialDownloadable
        scheduleGroupId
        scheduleGroupName
        startDateTime
        createdAt
      }
      participants {
        birthYear
        codingExperiences
        createdAt
        deletedAt
        name
        id
        phoneNumber
        scheduleGroupId
        profileId
        status
        updatedAt
        userId
      }
      lessons {
        courseId
        deletedAt
        createdAt
        description
        durationTime
        id
        idx
        name
        isLive
        updatedAt
        materials {
          deletedAt
          createdAt
          id
          lessonId
          name
          updatedAt
          url
        }
      }
      progressRate
      attendanceRate
      createdAt
      deletedAt
      id
      startDateTime
      status
      type
      updatedAt
    }
  }
}
    `;

/**
 * __useCourseScheduleGroupConnectionQuery__
 *
 * To run a query within a React component, call `useCourseScheduleGroupConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseScheduleGroupConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseScheduleGroupConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCourseScheduleGroupConnectionQuery(baseOptions: Apollo.QueryHookOptions<CourseScheduleGroupConnectionQuery, CourseScheduleGroupConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseScheduleGroupConnectionQuery, CourseScheduleGroupConnectionQueryVariables>(CourseScheduleGroupConnectionDocument, options);
      }
export function useCourseScheduleGroupConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseScheduleGroupConnectionQuery, CourseScheduleGroupConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseScheduleGroupConnectionQuery, CourseScheduleGroupConnectionQueryVariables>(CourseScheduleGroupConnectionDocument, options);
        }
export type CourseScheduleGroupConnectionQueryHookResult = ReturnType<typeof useCourseScheduleGroupConnectionQuery>;
export type CourseScheduleGroupConnectionLazyQueryHookResult = ReturnType<typeof useCourseScheduleGroupConnectionLazyQuery>;
export type CourseScheduleGroupConnectionQueryResult = Apollo.QueryResult<CourseScheduleGroupConnectionQuery, CourseScheduleGroupConnectionQueryVariables>;
export const CourseScheduleGroupDocument = gql`
    query courseScheduleGroup($where: CourseScheduleGroupWhere!) {
  courseScheduleGroup(where: $where) {
    createType
    code
    courseId
    createdAt
    deletedAt
    id
    imageUrl
    lessons {
      idx
      courseId
      createdAt
      deletedAt
      description
      name
      id
      isLive
      durationTime
      updatedAt
      materials {
        deletedAt
        createdAt
        id
        lessonId
        name
        updatedAt
        url
      }
    }
    name
    participants {
      birthYear
      codingExperiences
      createdAt
      deletedAt
      name
      id
      phoneNumber
      scheduleGroupId
      profileId
      status
      updatedAt
      userId
    }
    tutor {
      name
    }
    schedules {
      status
      createdAt
      deletedAt
      isExistRoom
      isEnterable
      id
      lesson {
        courseId
        createdAt
        deletedAt
        description
        durationTime
        id
        idx
        name
        isLive
        updatedAt
        materials {
          deletedAt
          createdAt
          id
          lessonId
          name
          updatedAt
          url
        }
        video {
          languageType
          url
          name
          id
        }
      }
      scheduleGroupId
      scheduleGroupName
      startDateTime
      updatedAt
    }
    progressRate
    attendanceRate
    startDateTime
    status
    type
    updatedAt
    minParticipant
    maxParticipant
  }
}
    `;

/**
 * __useCourseScheduleGroupQuery__
 *
 * To run a query within a React component, call `useCourseScheduleGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseScheduleGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseScheduleGroupQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCourseScheduleGroupQuery(baseOptions: Apollo.QueryHookOptions<CourseScheduleGroupQuery, CourseScheduleGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseScheduleGroupQuery, CourseScheduleGroupQueryVariables>(CourseScheduleGroupDocument, options);
      }
export function useCourseScheduleGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseScheduleGroupQuery, CourseScheduleGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseScheduleGroupQuery, CourseScheduleGroupQueryVariables>(CourseScheduleGroupDocument, options);
        }
export type CourseScheduleGroupQueryHookResult = ReturnType<typeof useCourseScheduleGroupQuery>;
export type CourseScheduleGroupLazyQueryHookResult = ReturnType<typeof useCourseScheduleGroupLazyQuery>;
export type CourseScheduleGroupQueryResult = Apollo.QueryResult<CourseScheduleGroupQuery, CourseScheduleGroupQueryVariables>;
export const CourseScheduleGroupAndCourseDocument = gql`
    query courseScheduleGroupAndCourse($where: CourseScheduleGroupWhere!, $courseWhere: CourseWhere!) {
  courseScheduleGroup(where: $where) {
    id
    name
    courseId
    tutor {
      name
    }
    lessons {
      idx
      courseId
      createdAt
      description
      name
      id
      isLive
      durationTime
      materials {
        createdAt
        id
        lessonId
        name
        url
      }
    }
    participants {
      birthYear
      codingExperiences
      createdAt
      name
      id
      phoneNumber
      scheduleGroupId
      profileId
      status
      userId
    }
    schedules {
      isMaterialDownloadable
      isExistRoom
      isEnterable
      createdAt
      id
      roomName
      attendance {
        status
        progressRate
      }
      lesson {
        courseId
        createdAt
        description
        durationTime
        id
        idx
        name
        isLive
        updatedAt
        materials {
          deletedAt
          createdAt
          id
          lessonId
          name
          updatedAt
          url
        }
      }
      scheduleGroupId
      scheduleGroupName
      startDateTime
      updatedAt
      activityHistory {
        lastActivityID
        progressRate
      }
    }
  }
  course(where: $courseWhere) {
    id
    requiredPreparation
    caution
  }
}
    `;

/**
 * __useCourseScheduleGroupAndCourseQuery__
 *
 * To run a query within a React component, call `useCourseScheduleGroupAndCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseScheduleGroupAndCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseScheduleGroupAndCourseQuery({
 *   variables: {
 *      where: // value for 'where'
 *      courseWhere: // value for 'courseWhere'
 *   },
 * });
 */
export function useCourseScheduleGroupAndCourseQuery(baseOptions: Apollo.QueryHookOptions<CourseScheduleGroupAndCourseQuery, CourseScheduleGroupAndCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseScheduleGroupAndCourseQuery, CourseScheduleGroupAndCourseQueryVariables>(CourseScheduleGroupAndCourseDocument, options);
      }
export function useCourseScheduleGroupAndCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseScheduleGroupAndCourseQuery, CourseScheduleGroupAndCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseScheduleGroupAndCourseQuery, CourseScheduleGroupAndCourseQueryVariables>(CourseScheduleGroupAndCourseDocument, options);
        }
export type CourseScheduleGroupAndCourseQueryHookResult = ReturnType<typeof useCourseScheduleGroupAndCourseQuery>;
export type CourseScheduleGroupAndCourseLazyQueryHookResult = ReturnType<typeof useCourseScheduleGroupAndCourseLazyQuery>;
export type CourseScheduleGroupAndCourseQueryResult = Apollo.QueryResult<CourseScheduleGroupAndCourseQuery, CourseScheduleGroupAndCourseQueryVariables>;
export const CourseAttendanceResultDocument = gql`
    query courseAttendanceResult($where: CourseAttendanceResultWhere!) {
  courseAttendanceResult(where: $where) {
    attendances {
      idx
      runningTime
      scheduleId
      status
    }
    profileId
    scheduleGroupId
  }
}
    `;

/**
 * __useCourseAttendanceResultQuery__
 *
 * To run a query within a React component, call `useCourseAttendanceResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseAttendanceResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseAttendanceResultQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCourseAttendanceResultQuery(baseOptions: Apollo.QueryHookOptions<CourseAttendanceResultQuery, CourseAttendanceResultQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseAttendanceResultQuery, CourseAttendanceResultQueryVariables>(CourseAttendanceResultDocument, options);
      }
export function useCourseAttendanceResultLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseAttendanceResultQuery, CourseAttendanceResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseAttendanceResultQuery, CourseAttendanceResultQueryVariables>(CourseAttendanceResultDocument, options);
        }
export type CourseAttendanceResultQueryHookResult = ReturnType<typeof useCourseAttendanceResultQuery>;
export type CourseAttendanceResultLazyQueryHookResult = ReturnType<typeof useCourseAttendanceResultLazyQuery>;
export type CourseAttendanceResultQueryResult = Apollo.QueryResult<CourseAttendanceResultQuery, CourseAttendanceResultQueryVariables>;
export const CourseAttendanceDocument = gql`
    query courseAttendance($where: CourseAttendanceWhere!) {
  courseAttendance(where: $where) {
    runningTime
  }
}
    `;

/**
 * __useCourseAttendanceQuery__
 *
 * To run a query within a React component, call `useCourseAttendanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseAttendanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseAttendanceQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCourseAttendanceQuery(baseOptions: Apollo.QueryHookOptions<CourseAttendanceQuery, CourseAttendanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseAttendanceQuery, CourseAttendanceQueryVariables>(CourseAttendanceDocument, options);
      }
export function useCourseAttendanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseAttendanceQuery, CourseAttendanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseAttendanceQuery, CourseAttendanceQueryVariables>(CourseAttendanceDocument, options);
        }
export type CourseAttendanceQueryHookResult = ReturnType<typeof useCourseAttendanceQuery>;
export type CourseAttendanceLazyQueryHookResult = ReturnType<typeof useCourseAttendanceLazyQuery>;
export type CourseAttendanceQueryResult = Apollo.QueryResult<CourseAttendanceQuery, CourseAttendanceQueryVariables>;
export const RequestCourseDocument = gql`
    mutation requestCourse($input: RequestCourseInput!) {
  requestCourse(input: $input) {
    result
    scheduleGroupId
  }
}
    `;
export type RequestCourseMutationFn = Apollo.MutationFunction<RequestCourseMutation, RequestCourseMutationVariables>;

/**
 * __useRequestCourseMutation__
 *
 * To run a mutation, you first call `useRequestCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestCourseMutation, { data, loading, error }] = useRequestCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestCourseMutation(baseOptions?: Apollo.MutationHookOptions<RequestCourseMutation, RequestCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestCourseMutation, RequestCourseMutationVariables>(RequestCourseDocument, options);
      }
export type RequestCourseMutationHookResult = ReturnType<typeof useRequestCourseMutation>;
export type RequestCourseMutationResult = Apollo.MutationResult<RequestCourseMutation>;
export type RequestCourseMutationOptions = Apollo.BaseMutationOptions<RequestCourseMutation, RequestCourseMutationVariables>;
export const RequestCourseApplicationDocument = gql`
    mutation requestCourseApplication($input: RequestCourseApplicationInput!) {
  requestCourseApplication(input: $input) {
    name
    raw
  }
}
    `;
export type RequestCourseApplicationMutationFn = Apollo.MutationFunction<RequestCourseApplicationMutation, RequestCourseApplicationMutationVariables>;

/**
 * __useRequestCourseApplicationMutation__
 *
 * To run a mutation, you first call `useRequestCourseApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestCourseApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestCourseApplicationMutation, { data, loading, error }] = useRequestCourseApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRequestCourseApplicationMutation(baseOptions?: Apollo.MutationHookOptions<RequestCourseApplicationMutation, RequestCourseApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestCourseApplicationMutation, RequestCourseApplicationMutationVariables>(RequestCourseApplicationDocument, options);
      }
export type RequestCourseApplicationMutationHookResult = ReturnType<typeof useRequestCourseApplicationMutation>;
export type RequestCourseApplicationMutationResult = Apollo.MutationResult<RequestCourseApplicationMutation>;
export type RequestCourseApplicationMutationOptions = Apollo.BaseMutationOptions<RequestCourseApplicationMutation, RequestCourseApplicationMutationVariables>;
export const CourseConnectionDocument = gql`
    query courseConnection($first: Int, $offset: Int, $orderBy: CourseConnectionOrder, $where: CourseConnectionWhere) {
  courseConnection(
    first: $first
    offset: $offset
    orderBy: $orderBy
    where: $where
  ) {
    totalCount
    nodes {
      id
      name
      description
      type
      images {
        id
        idx
        url
      }
      isEndRecruitment
      isSale
      isNew
      tags {
        name
      }
      maxAge
      minAge
      maxParticipant
      minParticipant
    }
  }
}
    `;

/**
 * __useCourseConnectionQuery__
 *
 * To run a query within a React component, call `useCourseConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCourseConnectionQuery(baseOptions?: Apollo.QueryHookOptions<CourseConnectionQuery, CourseConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseConnectionQuery, CourseConnectionQueryVariables>(CourseConnectionDocument, options);
      }
export function useCourseConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseConnectionQuery, CourseConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseConnectionQuery, CourseConnectionQueryVariables>(CourseConnectionDocument, options);
        }
export type CourseConnectionQueryHookResult = ReturnType<typeof useCourseConnectionQuery>;
export type CourseConnectionLazyQueryHookResult = ReturnType<typeof useCourseConnectionLazyQuery>;
export type CourseConnectionQueryResult = Apollo.QueryResult<CourseConnectionQuery, CourseConnectionQueryVariables>;
export const CourseDocument = gql`
    query course($where: CourseWhere!) {
  course(where: $where) {
    id
    name
    images {
      id
      idx
      url
    }
    type
    minParticipant
    maxParticipant
    minAge
    maxAge
    description
    price
    feature
    caution
    requiredPreparation
    recruitmentStartDateTime
    recruitmentEndDateTime
    recruitmentTarget
    isEndRecruitment
    lessons {
      durationTime
      name
      id
      idx
      isLive
    }
    tags {
      name
    }
    merchandises {
      id
      name
      purchaseType
      stockCount
      price
      type
    }
  }
}
    `;

/**
 * __useCourseQuery__
 *
 * To run a query within a React component, call `useCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCourseQuery(baseOptions: Apollo.QueryHookOptions<CourseQuery, CourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
      }
export function useCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseQuery, CourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
        }
export type CourseQueryHookResult = ReturnType<typeof useCourseQuery>;
export type CourseLazyQueryHookResult = ReturnType<typeof useCourseLazyQuery>;
export type CourseQueryResult = Apollo.QueryResult<CourseQuery, CourseQueryVariables>;
export const GetCourseTypeDocument = gql`
    query getCourseType($where: CourseWhere!) {
  course(where: $where) {
    type
  }
}
    `;

/**
 * __useGetCourseTypeQuery__
 *
 * To run a query within a React component, call `useGetCourseTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseTypeQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCourseTypeQuery(baseOptions: Apollo.QueryHookOptions<GetCourseTypeQuery, GetCourseTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCourseTypeQuery, GetCourseTypeQueryVariables>(GetCourseTypeDocument, options);
      }
export function useGetCourseTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseTypeQuery, GetCourseTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCourseTypeQuery, GetCourseTypeQueryVariables>(GetCourseTypeDocument, options);
        }
export type GetCourseTypeQueryHookResult = ReturnType<typeof useGetCourseTypeQuery>;
export type GetCourseTypeLazyQueryHookResult = ReturnType<typeof useGetCourseTypeLazyQuery>;
export type GetCourseTypeQueryResult = Apollo.QueryResult<GetCourseTypeQuery, GetCourseTypeQueryVariables>;
export const OrderedCourseDocument = gql`
    query orderedCourse($where: CourseWhere!) {
  course(where: $where) {
    id
    name
    images {
      id
      idx
      url
    }
    price
    merchandises {
      images {
        id
        idx
        url
      }
      id
      name
      purchaseType
      price
      type
    }
  }
}
    `;

/**
 * __useOrderedCourseQuery__
 *
 * To run a query within a React component, call `useOrderedCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderedCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderedCourseQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useOrderedCourseQuery(baseOptions: Apollo.QueryHookOptions<OrderedCourseQuery, OrderedCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderedCourseQuery, OrderedCourseQueryVariables>(OrderedCourseDocument, options);
      }
export function useOrderedCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderedCourseQuery, OrderedCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderedCourseQuery, OrderedCourseQueryVariables>(OrderedCourseDocument, options);
        }
export type OrderedCourseQueryHookResult = ReturnType<typeof useOrderedCourseQuery>;
export type OrderedCourseLazyQueryHookResult = ReturnType<typeof useOrderedCourseLazyQuery>;
export type OrderedCourseQueryResult = Apollo.QueryResult<OrderedCourseQuery, OrderedCourseQueryVariables>;
export const CreateCourseParticipantLessonFeedbackDocument = gql`
    mutation createCourseParticipantLessonFeedback($input: CreateCourseParticipantLessonFeedbackInput!) {
  createCourseParticipantLessonFeedback(input: $input)
}
    `;
export type CreateCourseParticipantLessonFeedbackMutationFn = Apollo.MutationFunction<CreateCourseParticipantLessonFeedbackMutation, CreateCourseParticipantLessonFeedbackMutationVariables>;

/**
 * __useCreateCourseParticipantLessonFeedbackMutation__
 *
 * To run a mutation, you first call `useCreateCourseParticipantLessonFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseParticipantLessonFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseParticipantLessonFeedbackMutation, { data, loading, error }] = useCreateCourseParticipantLessonFeedbackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCourseParticipantLessonFeedbackMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseParticipantLessonFeedbackMutation, CreateCourseParticipantLessonFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseParticipantLessonFeedbackMutation, CreateCourseParticipantLessonFeedbackMutationVariables>(CreateCourseParticipantLessonFeedbackDocument, options);
      }
export type CreateCourseParticipantLessonFeedbackMutationHookResult = ReturnType<typeof useCreateCourseParticipantLessonFeedbackMutation>;
export type CreateCourseParticipantLessonFeedbackMutationResult = Apollo.MutationResult<CreateCourseParticipantLessonFeedbackMutation>;
export type CreateCourseParticipantLessonFeedbackMutationOptions = Apollo.BaseMutationOptions<CreateCourseParticipantLessonFeedbackMutation, CreateCourseParticipantLessonFeedbackMutationVariables>;
export const EnterCourseLessonDocument = gql`
    mutation enterCourseLesson($input: EnterCourseLessonInput!) {
  enterCourseLesson(input: $input) {
    token
  }
}
    `;
export type EnterCourseLessonMutationFn = Apollo.MutationFunction<EnterCourseLessonMutation, EnterCourseLessonMutationVariables>;

/**
 * __useEnterCourseLessonMutation__
 *
 * To run a mutation, you first call `useEnterCourseLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnterCourseLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enterCourseLessonMutation, { data, loading, error }] = useEnterCourseLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEnterCourseLessonMutation(baseOptions?: Apollo.MutationHookOptions<EnterCourseLessonMutation, EnterCourseLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnterCourseLessonMutation, EnterCourseLessonMutationVariables>(EnterCourseLessonDocument, options);
      }
export type EnterCourseLessonMutationHookResult = ReturnType<typeof useEnterCourseLessonMutation>;
export type EnterCourseLessonMutationResult = Apollo.MutationResult<EnterCourseLessonMutation>;
export type EnterCourseLessonMutationOptions = Apollo.BaseMutationOptions<EnterCourseLessonMutation, EnterCourseLessonMutationVariables>;
export const StartCourseLessonDocument = gql`
    mutation startCourseLesson($input: StartCourseLessonInput!) {
  startCourseLesson(input: $input) {
    token
  }
}
    `;
export type StartCourseLessonMutationFn = Apollo.MutationFunction<StartCourseLessonMutation, StartCourseLessonMutationVariables>;

/**
 * __useStartCourseLessonMutation__
 *
 * To run a mutation, you first call `useStartCourseLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartCourseLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startCourseLessonMutation, { data, loading, error }] = useStartCourseLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStartCourseLessonMutation(baseOptions?: Apollo.MutationHookOptions<StartCourseLessonMutation, StartCourseLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartCourseLessonMutation, StartCourseLessonMutationVariables>(StartCourseLessonDocument, options);
      }
export type StartCourseLessonMutationHookResult = ReturnType<typeof useStartCourseLessonMutation>;
export type StartCourseLessonMutationResult = Apollo.MutationResult<StartCourseLessonMutation>;
export type StartCourseLessonMutationOptions = Apollo.BaseMutationOptions<StartCourseLessonMutation, StartCourseLessonMutationVariables>;
export const EndCourseLessonDocument = gql`
    mutation endCourseLesson($input: EndCourseLessonInput!) {
  endCourseLesson(input: $input) {
    result
  }
}
    `;
export type EndCourseLessonMutationFn = Apollo.MutationFunction<EndCourseLessonMutation, EndCourseLessonMutationVariables>;

/**
 * __useEndCourseLessonMutation__
 *
 * To run a mutation, you first call `useEndCourseLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEndCourseLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [endCourseLessonMutation, { data, loading, error }] = useEndCourseLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEndCourseLessonMutation(baseOptions?: Apollo.MutationHookOptions<EndCourseLessonMutation, EndCourseLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EndCourseLessonMutation, EndCourseLessonMutationVariables>(EndCourseLessonDocument, options);
      }
export type EndCourseLessonMutationHookResult = ReturnType<typeof useEndCourseLessonMutation>;
export type EndCourseLessonMutationResult = Apollo.MutationResult<EndCourseLessonMutation>;
export type EndCourseLessonMutationOptions = Apollo.BaseMutationOptions<EndCourseLessonMutation, EndCourseLessonMutationVariables>;
export const CourseLessonDocument = gql`
    query courseLesson($where: CourseLessonWhere!) {
  courseLesson(where: $where) {
    createdAt
    id
    name
    activities {
      createdAt
      dType
      idx
      name
      state
      id
      supplementaryData {
        description
        title
        videoUrl
        activityId
      }
      ... on CourseActivityVod {
        deletedAt
        vod {
          id
          durationInSec
          providerType
          url
        }
        state
        name
        idx
        id
        supplementaryData {
          activityId
          title
          description
          videoUrl
        }
      }
    }
  }
}
    `;

/**
 * __useCourseLessonQuery__
 *
 * To run a query within a React component, call `useCourseLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseLessonQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCourseLessonQuery(baseOptions: Apollo.QueryHookOptions<CourseLessonQuery, CourseLessonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseLessonQuery, CourseLessonQueryVariables>(CourseLessonDocument, options);
      }
export function useCourseLessonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseLessonQuery, CourseLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseLessonQuery, CourseLessonQueryVariables>(CourseLessonDocument, options);
        }
export type CourseLessonQueryHookResult = ReturnType<typeof useCourseLessonQuery>;
export type CourseLessonLazyQueryHookResult = ReturnType<typeof useCourseLessonLazyQuery>;
export type CourseLessonQueryResult = Apollo.QueryResult<CourseLessonQuery, CourseLessonQueryVariables>;
export const AddDataAnalyzerDocument = gql`
    mutation addDataAnalyzer($input: [AddDataAnalyzerInput!]!) {
  addDataAnalyzer(input: $input)
}
    `;
export type AddDataAnalyzerMutationFn = Apollo.MutationFunction<AddDataAnalyzerMutation, AddDataAnalyzerMutationVariables>;

/**
 * __useAddDataAnalyzerMutation__
 *
 * To run a mutation, you first call `useAddDataAnalyzerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDataAnalyzerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDataAnalyzerMutation, { data, loading, error }] = useAddDataAnalyzerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddDataAnalyzerMutation(baseOptions?: Apollo.MutationHookOptions<AddDataAnalyzerMutation, AddDataAnalyzerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDataAnalyzerMutation, AddDataAnalyzerMutationVariables>(AddDataAnalyzerDocument, options);
      }
export type AddDataAnalyzerMutationHookResult = ReturnType<typeof useAddDataAnalyzerMutation>;
export type AddDataAnalyzerMutationResult = Apollo.MutationResult<AddDataAnalyzerMutation>;
export type AddDataAnalyzerMutationOptions = Apollo.BaseMutationOptions<AddDataAnalyzerMutation, AddDataAnalyzerMutationVariables>;
export const CourseScheduleDocument = gql`
    query courseSchedule($where: CourseScheduleWhere!, $groupWhere: CourseScheduleGroupWhere!) {
  courseSchedule(where: $where) {
    id
    roomName
    isExistRoom
    scheduleGroupName
    startDateTime
    lesson {
      idx
      name
    }
  }
  courseScheduleGroup(where: $groupWhere) {
    imageUrl
    tutor {
      name
    }
  }
}
    `;

/**
 * __useCourseScheduleQuery__
 *
 * To run a query within a React component, call `useCourseScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseScheduleQuery({
 *   variables: {
 *      where: // value for 'where'
 *      groupWhere: // value for 'groupWhere'
 *   },
 * });
 */
export function useCourseScheduleQuery(baseOptions: Apollo.QueryHookOptions<CourseScheduleQuery, CourseScheduleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseScheduleQuery, CourseScheduleQueryVariables>(CourseScheduleDocument, options);
      }
export function useCourseScheduleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseScheduleQuery, CourseScheduleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseScheduleQuery, CourseScheduleQueryVariables>(CourseScheduleDocument, options);
        }
export type CourseScheduleQueryHookResult = ReturnType<typeof useCourseScheduleQuery>;
export type CourseScheduleLazyQueryHookResult = ReturnType<typeof useCourseScheduleLazyQuery>;
export type CourseScheduleQueryResult = Apollo.QueryResult<CourseScheduleQuery, CourseScheduleQueryVariables>;
export const CourseScheduleAndScheduleGroupDocument = gql`
    query courseScheduleAndScheduleGroup($where: CourseScheduleWhere!, $scheduleGroupWhere: CourseScheduleGroupWhere!) {
  courseSchedule(where: $where) {
    id
    roomName
    startDateTime
    scheduleGroupId
    scheduleGroupName
    lesson {
      id
      idx
      isLive
      courseId
      name
      description
      durationTime
      durationTime
      activities {
        id
        name
        dType
        idx
        state
      }
      materials {
        id
        name
        url
      }
    }
    activityHistory {
      lastActivityID
    }
  }
  courseScheduleGroup(where: $scheduleGroupWhere) {
    id
    participants {
      birthYear
      codingExperiences
      createdAt
      name
      id
      phoneNumber
      scheduleGroupId
      profileId
      status
      updatedAt
      userId
    }
    tutor {
      id
      name
    }
  }
}
    `;

/**
 * __useCourseScheduleAndScheduleGroupQuery__
 *
 * To run a query within a React component, call `useCourseScheduleAndScheduleGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseScheduleAndScheduleGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseScheduleAndScheduleGroupQuery({
 *   variables: {
 *      where: // value for 'where'
 *      scheduleGroupWhere: // value for 'scheduleGroupWhere'
 *   },
 * });
 */
export function useCourseScheduleAndScheduleGroupQuery(baseOptions: Apollo.QueryHookOptions<CourseScheduleAndScheduleGroupQuery, CourseScheduleAndScheduleGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseScheduleAndScheduleGroupQuery, CourseScheduleAndScheduleGroupQueryVariables>(CourseScheduleAndScheduleGroupDocument, options);
      }
export function useCourseScheduleAndScheduleGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseScheduleAndScheduleGroupQuery, CourseScheduleAndScheduleGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseScheduleAndScheduleGroupQuery, CourseScheduleAndScheduleGroupQueryVariables>(CourseScheduleAndScheduleGroupDocument, options);
        }
export type CourseScheduleAndScheduleGroupQueryHookResult = ReturnType<typeof useCourseScheduleAndScheduleGroupQuery>;
export type CourseScheduleAndScheduleGroupLazyQueryHookResult = ReturnType<typeof useCourseScheduleAndScheduleGroupLazyQuery>;
export type CourseScheduleAndScheduleGroupQueryResult = Apollo.QueryResult<CourseScheduleAndScheduleGroupQuery, CourseScheduleAndScheduleGroupQueryVariables>;
export const ScheduleLessonDocument = gql`
    query scheduleLesson($where: CourseScheduleWhere!) {
  courseSchedule(where: $where) {
    id
    startDateTime
    lesson {
      isLive
      id
      name
      durationTime
      activities {
        ... on CourseActivityPdf {
          id
          name
          dType
          supplementaryData {
            id
          }
        }
        ... on CourseActivityCoding {
          id
          name
          dType
          supplementaryData {
            id
          }
        }
        ... on CourseActivityVod {
          id
          name
          dType
          supplementaryData {
            id
          }
        }
        ... on CourseActivityTextBook {
          id
          name
          dType
          supplementaryData {
            id
          }
        }
        ... on CourseActivityQuiz {
          id
          name
          dType
          supplementaryData {
            id
          }
        }
      }
    }
    activityHistory {
      lastActivityID
    }
  }
}
    `;

/**
 * __useScheduleLessonQuery__
 *
 * To run a query within a React component, call `useScheduleLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useScheduleLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScheduleLessonQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useScheduleLessonQuery(baseOptions: Apollo.QueryHookOptions<ScheduleLessonQuery, ScheduleLessonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScheduleLessonQuery, ScheduleLessonQueryVariables>(ScheduleLessonDocument, options);
      }
export function useScheduleLessonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScheduleLessonQuery, ScheduleLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScheduleLessonQuery, ScheduleLessonQueryVariables>(ScheduleLessonDocument, options);
        }
export type ScheduleLessonQueryHookResult = ReturnType<typeof useScheduleLessonQuery>;
export type ScheduleLessonLazyQueryHookResult = ReturnType<typeof useScheduleLessonLazyQuery>;
export type ScheduleLessonQueryResult = Apollo.QueryResult<ScheduleLessonQuery, ScheduleLessonQueryVariables>;
export const CreateCourseTutorScheduleGroupDocument = gql`
    mutation createCourseTutorScheduleGroup($input: CreateCourseTutorScheduleGroupInput!) {
  createCourseTutorScheduleGroup(input: $input) {
    id
  }
}
    `;
export type CreateCourseTutorScheduleGroupMutationFn = Apollo.MutationFunction<CreateCourseTutorScheduleGroupMutation, CreateCourseTutorScheduleGroupMutationVariables>;

/**
 * __useCreateCourseTutorScheduleGroupMutation__
 *
 * To run a mutation, you first call `useCreateCourseTutorScheduleGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseTutorScheduleGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseTutorScheduleGroupMutation, { data, loading, error }] = useCreateCourseTutorScheduleGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCourseTutorScheduleGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseTutorScheduleGroupMutation, CreateCourseTutorScheduleGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseTutorScheduleGroupMutation, CreateCourseTutorScheduleGroupMutationVariables>(CreateCourseTutorScheduleGroupDocument, options);
      }
export type CreateCourseTutorScheduleGroupMutationHookResult = ReturnType<typeof useCreateCourseTutorScheduleGroupMutation>;
export type CreateCourseTutorScheduleGroupMutationResult = Apollo.MutationResult<CreateCourseTutorScheduleGroupMutation>;
export type CreateCourseTutorScheduleGroupMutationOptions = Apollo.BaseMutationOptions<CreateCourseTutorScheduleGroupMutation, CreateCourseTutorScheduleGroupMutationVariables>;
export const UpdateCourseTutorScheduleDocument = gql`
    mutation updateCourseTutorSchedule($input: UpdateCourseTutorScheduleInput!) {
  updateCourseTutorSchedule(input: $input)
}
    `;
export type UpdateCourseTutorScheduleMutationFn = Apollo.MutationFunction<UpdateCourseTutorScheduleMutation, UpdateCourseTutorScheduleMutationVariables>;

/**
 * __useUpdateCourseTutorScheduleMutation__
 *
 * To run a mutation, you first call `useUpdateCourseTutorScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseTutorScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseTutorScheduleMutation, { data, loading, error }] = useUpdateCourseTutorScheduleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCourseTutorScheduleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseTutorScheduleMutation, UpdateCourseTutorScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseTutorScheduleMutation, UpdateCourseTutorScheduleMutationVariables>(UpdateCourseTutorScheduleDocument, options);
      }
export type UpdateCourseTutorScheduleMutationHookResult = ReturnType<typeof useUpdateCourseTutorScheduleMutation>;
export type UpdateCourseTutorScheduleMutationResult = Apollo.MutationResult<UpdateCourseTutorScheduleMutation>;
export type UpdateCourseTutorScheduleMutationOptions = Apollo.BaseMutationOptions<UpdateCourseTutorScheduleMutation, UpdateCourseTutorScheduleMutationVariables>;
export const DeleteCourseTutorScheduleGroupDocument = gql`
    mutation deleteCourseTutorScheduleGroup($input: DeleteCourseTutorScheduleGroupInput!) {
  deleteCourseTutorScheduleGroup(input: $input)
}
    `;
export type DeleteCourseTutorScheduleGroupMutationFn = Apollo.MutationFunction<DeleteCourseTutorScheduleGroupMutation, DeleteCourseTutorScheduleGroupMutationVariables>;

/**
 * __useDeleteCourseTutorScheduleGroupMutation__
 *
 * To run a mutation, you first call `useDeleteCourseTutorScheduleGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseTutorScheduleGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseTutorScheduleGroupMutation, { data, loading, error }] = useDeleteCourseTutorScheduleGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCourseTutorScheduleGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseTutorScheduleGroupMutation, DeleteCourseTutorScheduleGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseTutorScheduleGroupMutation, DeleteCourseTutorScheduleGroupMutationVariables>(DeleteCourseTutorScheduleGroupDocument, options);
      }
export type DeleteCourseTutorScheduleGroupMutationHookResult = ReturnType<typeof useDeleteCourseTutorScheduleGroupMutation>;
export type DeleteCourseTutorScheduleGroupMutationResult = Apollo.MutationResult<DeleteCourseTutorScheduleGroupMutation>;
export type DeleteCourseTutorScheduleGroupMutationOptions = Apollo.BaseMutationOptions<DeleteCourseTutorScheduleGroupMutation, DeleteCourseTutorScheduleGroupMutationVariables>;
export const DeleteCourseTutorScheduleDocument = gql`
    mutation deleteCourseTutorSchedule($input: DeleteCourseTutorScheduleInput!) {
  deleteCourseTutorSchedule(input: $input)
}
    `;
export type DeleteCourseTutorScheduleMutationFn = Apollo.MutationFunction<DeleteCourseTutorScheduleMutation, DeleteCourseTutorScheduleMutationVariables>;

/**
 * __useDeleteCourseTutorScheduleMutation__
 *
 * To run a mutation, you first call `useDeleteCourseTutorScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseTutorScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseTutorScheduleMutation, { data, loading, error }] = useDeleteCourseTutorScheduleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteCourseTutorScheduleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseTutorScheduleMutation, DeleteCourseTutorScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseTutorScheduleMutation, DeleteCourseTutorScheduleMutationVariables>(DeleteCourseTutorScheduleDocument, options);
      }
export type DeleteCourseTutorScheduleMutationHookResult = ReturnType<typeof useDeleteCourseTutorScheduleMutation>;
export type DeleteCourseTutorScheduleMutationResult = Apollo.MutationResult<DeleteCourseTutorScheduleMutation>;
export type DeleteCourseTutorScheduleMutationOptions = Apollo.BaseMutationOptions<DeleteCourseTutorScheduleMutation, DeleteCourseTutorScheduleMutationVariables>;
export const CourseTutorScheduleGroupConnectionDocument = gql`
    query courseTutorScheduleGroupConnection($where: CourseTutorScheduleGroupConnectionWhere, $orderBy: CourseTutorScheduleGroupConnectionOrder, $offset: Int, $first: Int) {
  courseTutorScheduleGroupConnection(
    where: $where
    orderBy: $orderBy
    offset: $offset
    first: $first
  ) {
    nodes {
      id
      deletedAt
      createdAt
      endDateTime
      startDateTime
      loop
      tutorId
      updatedAt
    }
  }
}
    `;

/**
 * __useCourseTutorScheduleGroupConnectionQuery__
 *
 * To run a query within a React component, call `useCourseTutorScheduleGroupConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseTutorScheduleGroupConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseTutorScheduleGroupConnectionQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useCourseTutorScheduleGroupConnectionQuery(baseOptions?: Apollo.QueryHookOptions<CourseTutorScheduleGroupConnectionQuery, CourseTutorScheduleGroupConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseTutorScheduleGroupConnectionQuery, CourseTutorScheduleGroupConnectionQueryVariables>(CourseTutorScheduleGroupConnectionDocument, options);
      }
export function useCourseTutorScheduleGroupConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseTutorScheduleGroupConnectionQuery, CourseTutorScheduleGroupConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseTutorScheduleGroupConnectionQuery, CourseTutorScheduleGroupConnectionQueryVariables>(CourseTutorScheduleGroupConnectionDocument, options);
        }
export type CourseTutorScheduleGroupConnectionQueryHookResult = ReturnType<typeof useCourseTutorScheduleGroupConnectionQuery>;
export type CourseTutorScheduleGroupConnectionLazyQueryHookResult = ReturnType<typeof useCourseTutorScheduleGroupConnectionLazyQuery>;
export type CourseTutorScheduleGroupConnectionQueryResult = Apollo.QueryResult<CourseTutorScheduleGroupConnectionQuery, CourseTutorScheduleGroupConnectionQueryVariables>;
export const CourseTutorScheduleConnectionDocument = gql`
    query courseTutorScheduleConnection($where: CourseTutorScheduleConnectionWhere, $orderBy: CourseTutorScheduleConnectionOrder, $offset: Int, $first: Int) {
  courseTutorScheduleConnection(
    where: $where
    orderBy: $orderBy
    offset: $offset
    first: $first
  ) {
    nodes {
      id
      tutorScheduleGroupId
      updatedAt
      startDateTime
      endDateTime
      deletedAt
      createdAt
    }
  }
}
    `;

/**
 * __useCourseTutorScheduleConnectionQuery__
 *
 * To run a query within a React component, call `useCourseTutorScheduleConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseTutorScheduleConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseTutorScheduleConnectionQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useCourseTutorScheduleConnectionQuery(baseOptions?: Apollo.QueryHookOptions<CourseTutorScheduleConnectionQuery, CourseTutorScheduleConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseTutorScheduleConnectionQuery, CourseTutorScheduleConnectionQueryVariables>(CourseTutorScheduleConnectionDocument, options);
      }
export function useCourseTutorScheduleConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseTutorScheduleConnectionQuery, CourseTutorScheduleConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseTutorScheduleConnectionQuery, CourseTutorScheduleConnectionQueryVariables>(CourseTutorScheduleConnectionDocument, options);
        }
export type CourseTutorScheduleConnectionQueryHookResult = ReturnType<typeof useCourseTutorScheduleConnectionQuery>;
export type CourseTutorScheduleConnectionLazyQueryHookResult = ReturnType<typeof useCourseTutorScheduleConnectionLazyQuery>;
export type CourseTutorScheduleConnectionQueryResult = Apollo.QueryResult<CourseTutorScheduleConnectionQuery, CourseTutorScheduleConnectionQueryVariables>;
export const MultiUploadFileDocument = gql`
    mutation multiUploadFile($input: MultiUploadFileInput!) {
  multiUploadFile(input: $input)
}
    `;
export type MultiUploadFileMutationFn = Apollo.MutationFunction<MultiUploadFileMutation, MultiUploadFileMutationVariables>;

/**
 * __useMultiUploadFileMutation__
 *
 * To run a mutation, you first call `useMultiUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMultiUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [multiUploadFileMutation, { data, loading, error }] = useMultiUploadFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMultiUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<MultiUploadFileMutation, MultiUploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MultiUploadFileMutation, MultiUploadFileMutationVariables>(MultiUploadFileDocument, options);
      }
export type MultiUploadFileMutationHookResult = ReturnType<typeof useMultiUploadFileMutation>;
export type MultiUploadFileMutationResult = Apollo.MutationResult<MultiUploadFileMutation>;
export type MultiUploadFileMutationOptions = Apollo.BaseMutationOptions<MultiUploadFileMutation, MultiUploadFileMutationVariables>;
export const SingleUploadFileDocument = gql`
    mutation singleUploadFile($input: SingleUploadFileInput!) {
  singleUploadFile(input: $input)
}
    `;
export type SingleUploadFileMutationFn = Apollo.MutationFunction<SingleUploadFileMutation, SingleUploadFileMutationVariables>;

/**
 * __useSingleUploadFileMutation__
 *
 * To run a mutation, you first call `useSingleUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSingleUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [singleUploadFileMutation, { data, loading, error }] = useSingleUploadFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSingleUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<SingleUploadFileMutation, SingleUploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SingleUploadFileMutation, SingleUploadFileMutationVariables>(SingleUploadFileDocument, options);
      }
export type SingleUploadFileMutationHookResult = ReturnType<typeof useSingleUploadFileMutation>;
export type SingleUploadFileMutationResult = Apollo.MutationResult<SingleUploadFileMutation>;
export type SingleUploadFileMutationOptions = Apollo.BaseMutationOptions<SingleUploadFileMutation, SingleUploadFileMutationVariables>;
export const PresignedUrlForVideoUploadDocument = gql`
    query presignedUrlForVideoUpload($fileName: String!, $fileType: String!) {
  presignedUrlForVideoUpload(fileName: $fileName, fileType: $fileType) {
    url
  }
}
    `;

/**
 * __usePresignedUrlForVideoUploadQuery__
 *
 * To run a query within a React component, call `usePresignedUrlForVideoUploadQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresignedUrlForVideoUploadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresignedUrlForVideoUploadQuery({
 *   variables: {
 *      fileName: // value for 'fileName'
 *      fileType: // value for 'fileType'
 *   },
 * });
 */
export function usePresignedUrlForVideoUploadQuery(baseOptions: Apollo.QueryHookOptions<PresignedUrlForVideoUploadQuery, PresignedUrlForVideoUploadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PresignedUrlForVideoUploadQuery, PresignedUrlForVideoUploadQueryVariables>(PresignedUrlForVideoUploadDocument, options);
      }
export function usePresignedUrlForVideoUploadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PresignedUrlForVideoUploadQuery, PresignedUrlForVideoUploadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PresignedUrlForVideoUploadQuery, PresignedUrlForVideoUploadQueryVariables>(PresignedUrlForVideoUploadDocument, options);
        }
export type PresignedUrlForVideoUploadQueryHookResult = ReturnType<typeof usePresignedUrlForVideoUploadQuery>;
export type PresignedUrlForVideoUploadLazyQueryHookResult = ReturnType<typeof usePresignedUrlForVideoUploadLazyQuery>;
export type PresignedUrlForVideoUploadQueryResult = Apollo.QueryResult<PresignedUrlForVideoUploadQuery, PresignedUrlForVideoUploadQueryVariables>;
export const MuteLiveLessonParticipantDocument = gql`
    mutation muteLiveLessonParticipant($input: MuteLiveLessonParticipantInput!) {
  muteLiveLessonParticipant(input: $input)
}
    `;
export type MuteLiveLessonParticipantMutationFn = Apollo.MutationFunction<MuteLiveLessonParticipantMutation, MuteLiveLessonParticipantMutationVariables>;

/**
 * __useMuteLiveLessonParticipantMutation__
 *
 * To run a mutation, you first call `useMuteLiveLessonParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMuteLiveLessonParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [muteLiveLessonParticipantMutation, { data, loading, error }] = useMuteLiveLessonParticipantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMuteLiveLessonParticipantMutation(baseOptions?: Apollo.MutationHookOptions<MuteLiveLessonParticipantMutation, MuteLiveLessonParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MuteLiveLessonParticipantMutation, MuteLiveLessonParticipantMutationVariables>(MuteLiveLessonParticipantDocument, options);
      }
export type MuteLiveLessonParticipantMutationHookResult = ReturnType<typeof useMuteLiveLessonParticipantMutation>;
export type MuteLiveLessonParticipantMutationResult = Apollo.MutationResult<MuteLiveLessonParticipantMutation>;
export type MuteLiveLessonParticipantMutationOptions = Apollo.BaseMutationOptions<MuteLiveLessonParticipantMutation, MuteLiveLessonParticipantMutationVariables>;
export const RemoveLiveLessonParticipantDocument = gql`
    mutation removeLiveLessonParticipant($input: RemoveLiveLessonParticipantInput!) {
  removeLiveLessonParticipant(input: $input)
}
    `;
export type RemoveLiveLessonParticipantMutationFn = Apollo.MutationFunction<RemoveLiveLessonParticipantMutation, RemoveLiveLessonParticipantMutationVariables>;

/**
 * __useRemoveLiveLessonParticipantMutation__
 *
 * To run a mutation, you first call `useRemoveLiveLessonParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLiveLessonParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLiveLessonParticipantMutation, { data, loading, error }] = useRemoveLiveLessonParticipantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveLiveLessonParticipantMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLiveLessonParticipantMutation, RemoveLiveLessonParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLiveLessonParticipantMutation, RemoveLiveLessonParticipantMutationVariables>(RemoveLiveLessonParticipantDocument, options);
      }
export type RemoveLiveLessonParticipantMutationHookResult = ReturnType<typeof useRemoveLiveLessonParticipantMutation>;
export type RemoveLiveLessonParticipantMutationResult = Apollo.MutationResult<RemoveLiveLessonParticipantMutation>;
export type RemoveLiveLessonParticipantMutationOptions = Apollo.BaseMutationOptions<RemoveLiveLessonParticipantMutation, RemoveLiveLessonParticipantMutationVariables>;
export const SendAttendanceRequestKakaoMessageDocument = gql`
    mutation sendAttendanceRequestKakaoMessage($input: SendKakaoMessageAttendanceRequestInput!) {
  sendKakaoMessageAttendanceRequest(input: $input)
}
    `;
export type SendAttendanceRequestKakaoMessageMutationFn = Apollo.MutationFunction<SendAttendanceRequestKakaoMessageMutation, SendAttendanceRequestKakaoMessageMutationVariables>;

/**
 * __useSendAttendanceRequestKakaoMessageMutation__
 *
 * To run a mutation, you first call `useSendAttendanceRequestKakaoMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendAttendanceRequestKakaoMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendAttendanceRequestKakaoMessageMutation, { data, loading, error }] = useSendAttendanceRequestKakaoMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendAttendanceRequestKakaoMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendAttendanceRequestKakaoMessageMutation, SendAttendanceRequestKakaoMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendAttendanceRequestKakaoMessageMutation, SendAttendanceRequestKakaoMessageMutationVariables>(SendAttendanceRequestKakaoMessageDocument, options);
      }
export type SendAttendanceRequestKakaoMessageMutationHookResult = ReturnType<typeof useSendAttendanceRequestKakaoMessageMutation>;
export type SendAttendanceRequestKakaoMessageMutationResult = Apollo.MutationResult<SendAttendanceRequestKakaoMessageMutation>;
export type SendAttendanceRequestKakaoMessageMutationOptions = Apollo.BaseMutationOptions<SendAttendanceRequestKakaoMessageMutation, SendAttendanceRequestKakaoMessageMutationVariables>;
export const UpdateLiveLessonMetadataDocument = gql`
    mutation updateLiveLessonMetadata($input: UpdateLiveLessonMetadataInput!) {
  updateLiveLessonMetadata(input: $input) {
    sid
    name
    empty_timeout
    creation_time
    maxParticipants
    turnPassword
    enableCodecs {
      mime
      fmtpLine
    }
    metadata
    numParticipants
  }
}
    `;
export type UpdateLiveLessonMetadataMutationFn = Apollo.MutationFunction<UpdateLiveLessonMetadataMutation, UpdateLiveLessonMetadataMutationVariables>;

/**
 * __useUpdateLiveLessonMetadataMutation__
 *
 * To run a mutation, you first call `useUpdateLiveLessonMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLiveLessonMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLiveLessonMetadataMutation, { data, loading, error }] = useUpdateLiveLessonMetadataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLiveLessonMetadataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLiveLessonMetadataMutation, UpdateLiveLessonMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLiveLessonMetadataMutation, UpdateLiveLessonMetadataMutationVariables>(UpdateLiveLessonMetadataDocument, options);
      }
export type UpdateLiveLessonMetadataMutationHookResult = ReturnType<typeof useUpdateLiveLessonMetadataMutation>;
export type UpdateLiveLessonMetadataMutationResult = Apollo.MutationResult<UpdateLiveLessonMetadataMutation>;
export type UpdateLiveLessonMetadataMutationOptions = Apollo.BaseMutationOptions<UpdateLiveLessonMetadataMutation, UpdateLiveLessonMetadataMutationVariables>;
export const LivekitDeleteRoomDocument = gql`
    mutation livekitDeleteRoom($input: LivekitDeleteRoomInput!) {
  livekitDeleteRoom(input: $input)
}
    `;
export type LivekitDeleteRoomMutationFn = Apollo.MutationFunction<LivekitDeleteRoomMutation, LivekitDeleteRoomMutationVariables>;

/**
 * __useLivekitDeleteRoomMutation__
 *
 * To run a mutation, you first call `useLivekitDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLivekitDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [livekitDeleteRoomMutation, { data, loading, error }] = useLivekitDeleteRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLivekitDeleteRoomMutation(baseOptions?: Apollo.MutationHookOptions<LivekitDeleteRoomMutation, LivekitDeleteRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LivekitDeleteRoomMutation, LivekitDeleteRoomMutationVariables>(LivekitDeleteRoomDocument, options);
      }
export type LivekitDeleteRoomMutationHookResult = ReturnType<typeof useLivekitDeleteRoomMutation>;
export type LivekitDeleteRoomMutationResult = Apollo.MutationResult<LivekitDeleteRoomMutation>;
export type LivekitDeleteRoomMutationOptions = Apollo.BaseMutationOptions<LivekitDeleteRoomMutation, LivekitDeleteRoomMutationVariables>;
export const SendDataToLiveLessonParticipantDocument = gql`
    mutation sendDataToLiveLessonParticipant($input: SendDataToLiveLessonParticipantInput!) {
  sendDataToLiveLessonParticipant(input: $input)
}
    `;
export type SendDataToLiveLessonParticipantMutationFn = Apollo.MutationFunction<SendDataToLiveLessonParticipantMutation, SendDataToLiveLessonParticipantMutationVariables>;

/**
 * __useSendDataToLiveLessonParticipantMutation__
 *
 * To run a mutation, you first call `useSendDataToLiveLessonParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendDataToLiveLessonParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendDataToLiveLessonParticipantMutation, { data, loading, error }] = useSendDataToLiveLessonParticipantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendDataToLiveLessonParticipantMutation(baseOptions?: Apollo.MutationHookOptions<SendDataToLiveLessonParticipantMutation, SendDataToLiveLessonParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendDataToLiveLessonParticipantMutation, SendDataToLiveLessonParticipantMutationVariables>(SendDataToLiveLessonParticipantDocument, options);
      }
export type SendDataToLiveLessonParticipantMutationHookResult = ReturnType<typeof useSendDataToLiveLessonParticipantMutation>;
export type SendDataToLiveLessonParticipantMutationResult = Apollo.MutationResult<SendDataToLiveLessonParticipantMutation>;
export type SendDataToLiveLessonParticipantMutationOptions = Apollo.BaseMutationOptions<SendDataToLiveLessonParticipantMutation, SendDataToLiveLessonParticipantMutationVariables>;
export const LivekitUpdateParticipantDocument = gql`
    mutation livekitUpdateParticipant($input: LivekitUpdateParticipantInput!) {
  livekitUpdateParticipant(input: $input) {
    participant {
      name
      identity
    }
  }
}
    `;
export type LivekitUpdateParticipantMutationFn = Apollo.MutationFunction<LivekitUpdateParticipantMutation, LivekitUpdateParticipantMutationVariables>;

/**
 * __useLivekitUpdateParticipantMutation__
 *
 * To run a mutation, you first call `useLivekitUpdateParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLivekitUpdateParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [livekitUpdateParticipantMutation, { data, loading, error }] = useLivekitUpdateParticipantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLivekitUpdateParticipantMutation(baseOptions?: Apollo.MutationHookOptions<LivekitUpdateParticipantMutation, LivekitUpdateParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LivekitUpdateParticipantMutation, LivekitUpdateParticipantMutationVariables>(LivekitUpdateParticipantDocument, options);
      }
export type LivekitUpdateParticipantMutationHookResult = ReturnType<typeof useLivekitUpdateParticipantMutation>;
export type LivekitUpdateParticipantMutationResult = Apollo.MutationResult<LivekitUpdateParticipantMutation>;
export type LivekitUpdateParticipantMutationOptions = Apollo.BaseMutationOptions<LivekitUpdateParticipantMutation, LivekitUpdateParticipantMutationVariables>;
export const LiveLessonParticipantsDocument = gql`
    query liveLessonParticipants($input: LiveLessonParticipantsInput!) {
  liveLessonParticipants(input: $input) {
    sid
    identity
    name
    joinedAt
    isPublisher
    metadata
    state
    tracks {
      sid
      type
      name
      muted
      width
      height
      simulcast
      disableDtx
      source
      layers {
        quality
        width
        height
        bitrate
      }
      mimeType
    }
  }
}
    `;

/**
 * __useLiveLessonParticipantsQuery__
 *
 * To run a query within a React component, call `useLiveLessonParticipantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLiveLessonParticipantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLiveLessonParticipantsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLiveLessonParticipantsQuery(baseOptions: Apollo.QueryHookOptions<LiveLessonParticipantsQuery, LiveLessonParticipantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LiveLessonParticipantsQuery, LiveLessonParticipantsQueryVariables>(LiveLessonParticipantsDocument, options);
      }
export function useLiveLessonParticipantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LiveLessonParticipantsQuery, LiveLessonParticipantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LiveLessonParticipantsQuery, LiveLessonParticipantsQueryVariables>(LiveLessonParticipantsDocument, options);
        }
export type LiveLessonParticipantsQueryHookResult = ReturnType<typeof useLiveLessonParticipantsQuery>;
export type LiveLessonParticipantsLazyQueryHookResult = ReturnType<typeof useLiveLessonParticipantsLazyQuery>;
export type LiveLessonParticipantsQueryResult = Apollo.QueryResult<LiveLessonParticipantsQuery, LiveLessonParticipantsQueryVariables>;
export const LivekitListRoomDocument = gql`
    query LivekitListRoom {
  livekitListRoom {
    sid
    name
    empty_timeout
    creation_time
    maxParticipants
    turnPassword
    enableCodecs {
      mime
      fmtpLine
    }
    metadata
    numParticipants
  }
}
    `;

/**
 * __useLivekitListRoomQuery__
 *
 * To run a query within a React component, call `useLivekitListRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useLivekitListRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLivekitListRoomQuery({
 *   variables: {
 *   },
 * });
 */
export function useLivekitListRoomQuery(baseOptions?: Apollo.QueryHookOptions<LivekitListRoomQuery, LivekitListRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LivekitListRoomQuery, LivekitListRoomQueryVariables>(LivekitListRoomDocument, options);
      }
export function useLivekitListRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LivekitListRoomQuery, LivekitListRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LivekitListRoomQuery, LivekitListRoomQueryVariables>(LivekitListRoomDocument, options);
        }
export type LivekitListRoomQueryHookResult = ReturnType<typeof useLivekitListRoomQuery>;
export type LivekitListRoomLazyQueryHookResult = ReturnType<typeof useLivekitListRoomLazyQuery>;
export type LivekitListRoomQueryResult = Apollo.QueryResult<LivekitListRoomQuery, LivekitListRoomQueryVariables>;
export const LivekitCreateTokenDocument = gql`
    query livekitCreateToken($input: LivekitCreateTokenInput!) {
  livekitCreateToken(input: $input)
}
    `;

/**
 * __useLivekitCreateTokenQuery__
 *
 * To run a query within a React component, call `useLivekitCreateTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useLivekitCreateTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLivekitCreateTokenQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLivekitCreateTokenQuery(baseOptions: Apollo.QueryHookOptions<LivekitCreateTokenQuery, LivekitCreateTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LivekitCreateTokenQuery, LivekitCreateTokenQueryVariables>(LivekitCreateTokenDocument, options);
      }
export function useLivekitCreateTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LivekitCreateTokenQuery, LivekitCreateTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LivekitCreateTokenQuery, LivekitCreateTokenQueryVariables>(LivekitCreateTokenDocument, options);
        }
export type LivekitCreateTokenQueryHookResult = ReturnType<typeof useLivekitCreateTokenQuery>;
export type LivekitCreateTokenLazyQueryHookResult = ReturnType<typeof useLivekitCreateTokenLazyQuery>;
export type LivekitCreateTokenQueryResult = Apollo.QueryResult<LivekitCreateTokenQuery, LivekitCreateTokenQueryVariables>;
export const ReadNotificationDocument = gql`
    mutation readNotification($input: ReadNotificationInput!) {
  readNotification(input: $input) {
    id
  }
}
    `;
export type ReadNotificationMutationFn = Apollo.MutationFunction<ReadNotificationMutation, ReadNotificationMutationVariables>;

/**
 * __useReadNotificationMutation__
 *
 * To run a mutation, you first call `useReadNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readNotificationMutation, { data, loading, error }] = useReadNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReadNotificationMutation(baseOptions?: Apollo.MutationHookOptions<ReadNotificationMutation, ReadNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReadNotificationMutation, ReadNotificationMutationVariables>(ReadNotificationDocument, options);
      }
export type ReadNotificationMutationHookResult = ReturnType<typeof useReadNotificationMutation>;
export type ReadNotificationMutationResult = Apollo.MutationResult<ReadNotificationMutation>;
export type ReadNotificationMutationOptions = Apollo.BaseMutationOptions<ReadNotificationMutation, ReadNotificationMutationVariables>;
export const NotificationConnectionDocument = gql`
    query notificationConnection($first: Int, $offset: Int, $orderBy: NotificationConnectionOrder, $where: NotificationConnectionWhere) {
  notificationConnection(
    first: $first
    offset: $offset
    orderBy: $orderBy
    where: $where
  ) {
    nodes {
      id
      IconURL
      description
      eventDateTime
      liveDateTime
      title
      webLinkPath
      profileId
      uiType
      state
      createdAt
    }
    totalCount
  }
}
    `;

/**
 * __useNotificationConnectionQuery__
 *
 * To run a query within a React component, call `useNotificationConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useNotificationConnectionQuery(baseOptions?: Apollo.QueryHookOptions<NotificationConnectionQuery, NotificationConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationConnectionQuery, NotificationConnectionQueryVariables>(NotificationConnectionDocument, options);
      }
export function useNotificationConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationConnectionQuery, NotificationConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationConnectionQuery, NotificationConnectionQueryVariables>(NotificationConnectionDocument, options);
        }
export type NotificationConnectionQueryHookResult = ReturnType<typeof useNotificationConnectionQuery>;
export type NotificationConnectionLazyQueryHookResult = ReturnType<typeof useNotificationConnectionLazyQuery>;
export type NotificationConnectionQueryResult = Apollo.QueryResult<NotificationConnectionQuery, NotificationConnectionQueryVariables>;
export const OnNotificationAddedDocument = gql`
    subscription OnNotificationAdded($input: AddedNotificationInput!) {
  notificationAdded(input: $input) {
    id
    IconURL
    description
    eventDateTime
    liveDateTime
    title
    webLinkPath
    profileId
    uiType
    state
    createdAt
  }
}
    `;

/**
 * __useOnNotificationAddedSubscription__
 *
 * To run a query within a React component, call `useOnNotificationAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNotificationAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNotificationAddedSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOnNotificationAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnNotificationAddedSubscription, OnNotificationAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnNotificationAddedSubscription, OnNotificationAddedSubscriptionVariables>(OnNotificationAddedDocument, options);
      }
export type OnNotificationAddedSubscriptionHookResult = ReturnType<typeof useOnNotificationAddedSubscription>;
export type OnNotificationAddedSubscriptionResult = Apollo.SubscriptionResult<OnNotificationAddedSubscription>;
export const OnCurrentTimeDocument = gql`
    subscription OnCurrentTime {
  currentTime {
    unixTime
    timeStamp
  }
}
    `;

/**
 * __useOnCurrentTimeSubscription__
 *
 * To run a query within a React component, call `useOnCurrentTimeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnCurrentTimeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnCurrentTimeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnCurrentTimeSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnCurrentTimeSubscription, OnCurrentTimeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnCurrentTimeSubscription, OnCurrentTimeSubscriptionVariables>(OnCurrentTimeDocument, options);
      }
export type OnCurrentTimeSubscriptionHookResult = ReturnType<typeof useOnCurrentTimeSubscription>;
export type OnCurrentTimeSubscriptionResult = Apollo.SubscriptionResult<OnCurrentTimeSubscription>;
export const ApplyMarketingCouponDocument = gql`
    mutation applyMarketingCoupon($input: ApplyMarketingCouponInput!) {
  applyMarketingCoupon(input: $input) {
    couponId
    discount {
      type
      value
    }
    name
    startTime
    endTime
    minOrderPrice {
      amount
      currencyType
    }
    maxDiscountPrice {
      amount
      currencyType
    }
    scopeType
  }
}
    `;
export type ApplyMarketingCouponMutationFn = Apollo.MutationFunction<ApplyMarketingCouponMutation, ApplyMarketingCouponMutationVariables>;

/**
 * __useApplyMarketingCouponMutation__
 *
 * To run a mutation, you first call `useApplyMarketingCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyMarketingCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyMarketingCouponMutation, { data, loading, error }] = useApplyMarketingCouponMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useApplyMarketingCouponMutation(baseOptions?: Apollo.MutationHookOptions<ApplyMarketingCouponMutation, ApplyMarketingCouponMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApplyMarketingCouponMutation, ApplyMarketingCouponMutationVariables>(ApplyMarketingCouponDocument, options);
      }
export type ApplyMarketingCouponMutationHookResult = ReturnType<typeof useApplyMarketingCouponMutation>;
export type ApplyMarketingCouponMutationResult = Apollo.MutationResult<ApplyMarketingCouponMutation>;
export type ApplyMarketingCouponMutationOptions = Apollo.BaseMutationOptions<ApplyMarketingCouponMutation, ApplyMarketingCouponMutationVariables>;
export const MarketingCouponDownloadConnectionDocument = gql`
    query marketingCouponDownloadConnection($first: Int, $offset: Int, $orderBy: MarketingCouponDownloadConnectionOrder, $where: MarketingCouponDownloadConnectionWhere) {
  marketingCouponDownloadConnection(
    first: $first
    offset: $offset
    orderBy: $orderBy
    where: $where
  ) {
    nodes {
      couponId
      discount {
        type
        value
      }
      name
      startTime
      endTime
      minOrderPrice {
        amount
        currencyType
      }
      maxDiscountPrice {
        amount
        currencyType
      }
      scopeType
    }
  }
}
    `;

/**
 * __useMarketingCouponDownloadConnectionQuery__
 *
 * To run a query within a React component, call `useMarketingCouponDownloadConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketingCouponDownloadConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketingCouponDownloadConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useMarketingCouponDownloadConnectionQuery(baseOptions?: Apollo.QueryHookOptions<MarketingCouponDownloadConnectionQuery, MarketingCouponDownloadConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarketingCouponDownloadConnectionQuery, MarketingCouponDownloadConnectionQueryVariables>(MarketingCouponDownloadConnectionDocument, options);
      }
export function useMarketingCouponDownloadConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketingCouponDownloadConnectionQuery, MarketingCouponDownloadConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarketingCouponDownloadConnectionQuery, MarketingCouponDownloadConnectionQueryVariables>(MarketingCouponDownloadConnectionDocument, options);
        }
export type MarketingCouponDownloadConnectionQueryHookResult = ReturnType<typeof useMarketingCouponDownloadConnectionQuery>;
export type MarketingCouponDownloadConnectionLazyQueryHookResult = ReturnType<typeof useMarketingCouponDownloadConnectionLazyQuery>;
export type MarketingCouponDownloadConnectionQueryResult = Apollo.QueryResult<MarketingCouponDownloadConnectionQuery, MarketingCouponDownloadConnectionQueryVariables>;
export const RequestOrderCodeDocument = gql`
    mutation requestOrderCode {
  requestOrderCode
}
    `;
export type RequestOrderCodeMutationFn = Apollo.MutationFunction<RequestOrderCodeMutation, RequestOrderCodeMutationVariables>;

/**
 * __useRequestOrderCodeMutation__
 *
 * To run a mutation, you first call `useRequestOrderCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestOrderCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestOrderCodeMutation, { data, loading, error }] = useRequestOrderCodeMutation({
 *   variables: {
 *   },
 * });
 */
export function useRequestOrderCodeMutation(baseOptions?: Apollo.MutationHookOptions<RequestOrderCodeMutation, RequestOrderCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestOrderCodeMutation, RequestOrderCodeMutationVariables>(RequestOrderCodeDocument, options);
      }
export type RequestOrderCodeMutationHookResult = ReturnType<typeof useRequestOrderCodeMutation>;
export type RequestOrderCodeMutationResult = Apollo.MutationResult<RequestOrderCodeMutation>;
export type RequestOrderCodeMutationOptions = Apollo.BaseMutationOptions<RequestOrderCodeMutation, RequestOrderCodeMutationVariables>;
export const CreateOrderDocument = gql`
    mutation createOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    status
    delivery {
      address {
        addr
        id
        addrDetail
        zipcode
      }
      id
      shippingPrice {
        amount
        currencyType
      }
      updatedAt
    }
    payments {
      paymentPrice {
        amount
        currencyType
      }
      payMethod
      impCode
      pgProvider
    }
    totalPrice {
      amount
      currencyType
    }
    userInfo {
      email
      name
      phone
      userId
    }
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CompleteOrderPaymentDocument = gql`
    mutation completeOrderPayment($input: CompleteOrderPaymentInput!) {
  completeOrderPayment(input: $input) {
    id
  }
}
    `;
export type CompleteOrderPaymentMutationFn = Apollo.MutationFunction<CompleteOrderPaymentMutation, CompleteOrderPaymentMutationVariables>;

/**
 * __useCompleteOrderPaymentMutation__
 *
 * To run a mutation, you first call `useCompleteOrderPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteOrderPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeOrderPaymentMutation, { data, loading, error }] = useCompleteOrderPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCompleteOrderPaymentMutation(baseOptions?: Apollo.MutationHookOptions<CompleteOrderPaymentMutation, CompleteOrderPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteOrderPaymentMutation, CompleteOrderPaymentMutationVariables>(CompleteOrderPaymentDocument, options);
      }
export type CompleteOrderPaymentMutationHookResult = ReturnType<typeof useCompleteOrderPaymentMutation>;
export type CompleteOrderPaymentMutationResult = Apollo.MutationResult<CompleteOrderPaymentMutation>;
export type CompleteOrderPaymentMutationOptions = Apollo.BaseMutationOptions<CompleteOrderPaymentMutation, CompleteOrderPaymentMutationVariables>;
export const OrderDocument = gql`
    query order($where: OrderWhere!) {
  order(where: $where) {
    id
    createdAt
    orderItems {
      product {
        id
        name
        originPrice {
          amount
          currencyType
        }
        promotionPrice {
          amount
          currencyType
        }
        qty
        scheduleGroupId
      }
    }
    orderRefunds {
      id
      orderRefundNo
      orderId
      orderItems {
        id
        orderItemNo
        orderId
        status
        product {
          id
          name
          image {
            url
          }
          purchaseType
          scheduleGroupId
          originPrice {
            amount
            currencyType
          }
          promotionPrice {
            amount
            currencyType
          }
          qty
        }
        couponDiscount {
          code
          name
          discountPrice {
            amount
            currencyType
          }
          discount {
            type
            value
          }
        }
        createdAt
      }
      refundPrice {
        amount
        currencyType
      }
      shippingPrice {
        amount
        currencyType
      }
      customerChargeFee {
        amount
        currencyType
      }
      payMethod
      staffUserId
      reason
      delivery {
        id
        address {
          id
          userInfo {
            userId
            name
            email
            phone
          }
          addr
          addrDetail
          zipcode
        }
        deliveryRequest
        invoice
        deliveryCarrierId
        shippingPrice {
          amount
          currencyType
        }
        couponDiscount {
          code
          name
          discountPrice {
            amount
            currencyType
          }
        }
        createdAt
        updatedAt
        processedAt
      }
      couponDiscount {
        code
        name
        discountPrice {
          amount
          currencyType
        }
        discount {
          type
          value
        }
      }
      status
      createdAt
      processedAt
    }
    profileInfo {
      birth
      email
      codingTypes
      name
      phone
    }
    userInfo {
      name
      email
      phone
    }
    delivery {
      address {
        zipcode
        addr
        addrDetail
      }
    }
    couponDiscount {
      name
      discountPrice {
        amount
        currencyType
      }
    }
    totalItemsPrice {
      amount
      currencyType
    }
    shippingPrice {
      amount
      currencyType
    }
    totalDiscountPrice {
      amount
      currencyType
    }
    totalPrice {
      amount
      currencyType
    }
    payments {
      pgProvider
      cardQuota
    }
  }
}
    `;

/**
 * __useOrderQuery__
 *
 * To run a query within a React component, call `useOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useOrderQuery(baseOptions: Apollo.QueryHookOptions<OrderQuery, OrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
      }
export function useOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>;
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>;
export type OrderQueryResult = Apollo.QueryResult<OrderQuery, OrderQueryVariables>;
export const OrderConnectionDocument = gql`
    query orderConnection($after: String, $first: Int, $offset: Int, $orderBy: OrderConnectionOrder, $where: OrderConnectionWhere) {
  orderConnection(
    after: $after
    first: $first
    offset: $offset
    orderBy: $orderBy
    where: $where
  ) {
    nodes {
      id
      createdAt
      orderItems {
        product {
          name
          scheduleGroupId
        }
      }
      profileInfo {
        name
      }
      totalPrice {
        amount
        currencyType
      }
      status
    }
  }
}
    `;

/**
 * __useOrderConnectionQuery__
 *
 * To run a query within a React component, call `useOrderConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderConnectionQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useOrderConnectionQuery(baseOptions?: Apollo.QueryHookOptions<OrderConnectionQuery, OrderConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderConnectionQuery, OrderConnectionQueryVariables>(OrderConnectionDocument, options);
      }
export function useOrderConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderConnectionQuery, OrderConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderConnectionQuery, OrderConnectionQueryVariables>(OrderConnectionDocument, options);
        }
export type OrderConnectionQueryHookResult = ReturnType<typeof useOrderConnectionQuery>;
export type OrderConnectionLazyQueryHookResult = ReturnType<typeof useOrderConnectionLazyQuery>;
export type OrderConnectionQueryResult = Apollo.QueryResult<OrderConnectionQuery, OrderConnectionQueryVariables>;
export const OrderCardsDocument = gql`
    query orderCards {
  orderCards {
    code
    enabled
    icon {
      url
    }
    name
  }
}
    `;

/**
 * __useOrderCardsQuery__
 *
 * To run a query within a React component, call `useOrderCardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderCardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderCardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrderCardsQuery(baseOptions?: Apollo.QueryHookOptions<OrderCardsQuery, OrderCardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderCardsQuery, OrderCardsQueryVariables>(OrderCardsDocument, options);
      }
export function useOrderCardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderCardsQuery, OrderCardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderCardsQuery, OrderCardsQueryVariables>(OrderCardsDocument, options);
        }
export type OrderCardsQueryHookResult = ReturnType<typeof useOrderCardsQuery>;
export type OrderCardsLazyQueryHookResult = ReturnType<typeof useOrderCardsLazyQuery>;
export type OrderCardsQueryResult = Apollo.QueryResult<OrderCardsQuery, OrderCardsQueryVariables>;
export const OrderLastAddressDocument = gql`
    query orderLastAddress {
  orderLastAddress {
    addr
    addrDetail
    zipcode
    userInfo {
      name
      phone
    }
  }
}
    `;

/**
 * __useOrderLastAddressQuery__
 *
 * To run a query within a React component, call `useOrderLastAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderLastAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderLastAddressQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrderLastAddressQuery(baseOptions?: Apollo.QueryHookOptions<OrderLastAddressQuery, OrderLastAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderLastAddressQuery, OrderLastAddressQueryVariables>(OrderLastAddressDocument, options);
      }
export function useOrderLastAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderLastAddressQuery, OrderLastAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderLastAddressQuery, OrderLastAddressQueryVariables>(OrderLastAddressDocument, options);
        }
export type OrderLastAddressQueryHookResult = ReturnType<typeof useOrderLastAddressQuery>;
export type OrderLastAddressLazyQueryHookResult = ReturnType<typeof useOrderLastAddressLazyQuery>;
export type OrderLastAddressQueryResult = Apollo.QueryResult<OrderLastAddressQuery, OrderLastAddressQueryVariables>;
export const StartQuizDocument = gql`
    mutation startQuiz($input: StartQuizInput!) {
  startQuiz(input: $input) {
    quizTakingId
  }
}
    `;
export type StartQuizMutationFn = Apollo.MutationFunction<StartQuizMutation, StartQuizMutationVariables>;

/**
 * __useStartQuizMutation__
 *
 * To run a mutation, you first call `useStartQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startQuizMutation, { data, loading, error }] = useStartQuizMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStartQuizMutation(baseOptions?: Apollo.MutationHookOptions<StartQuizMutation, StartQuizMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartQuizMutation, StartQuizMutationVariables>(StartQuizDocument, options);
      }
export type StartQuizMutationHookResult = ReturnType<typeof useStartQuizMutation>;
export type StartQuizMutationResult = Apollo.MutationResult<StartQuizMutation>;
export type StartQuizMutationOptions = Apollo.BaseMutationOptions<StartQuizMutation, StartQuizMutationVariables>;
export const SubmitQuestionReportDocument = gql`
    mutation submitQuestionReport($input: SubmitQuestionReportInput!) {
  submitQuestionReport(input: $input) {
    success
  }
}
    `;
export type SubmitQuestionReportMutationFn = Apollo.MutationFunction<SubmitQuestionReportMutation, SubmitQuestionReportMutationVariables>;

/**
 * __useSubmitQuestionReportMutation__
 *
 * To run a mutation, you first call `useSubmitQuestionReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitQuestionReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitQuestionReportMutation, { data, loading, error }] = useSubmitQuestionReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitQuestionReportMutation(baseOptions?: Apollo.MutationHookOptions<SubmitQuestionReportMutation, SubmitQuestionReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitQuestionReportMutation, SubmitQuestionReportMutationVariables>(SubmitQuestionReportDocument, options);
      }
export type SubmitQuestionReportMutationHookResult = ReturnType<typeof useSubmitQuestionReportMutation>;
export type SubmitQuestionReportMutationResult = Apollo.MutationResult<SubmitQuestionReportMutation>;
export type SubmitQuestionReportMutationOptions = Apollo.BaseMutationOptions<SubmitQuestionReportMutation, SubmitQuestionReportMutationVariables>;
export const SubmitQuizAnswerDocument = gql`
    mutation submitQuizAnswer($input: SubmitQuizAnswerInput!) {
  submitQuizAnswer(input: $input) {
    quizTakingId
  }
}
    `;
export type SubmitQuizAnswerMutationFn = Apollo.MutationFunction<SubmitQuizAnswerMutation, SubmitQuizAnswerMutationVariables>;

/**
 * __useSubmitQuizAnswerMutation__
 *
 * To run a mutation, you first call `useSubmitQuizAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitQuizAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitQuizAnswerMutation, { data, loading, error }] = useSubmitQuizAnswerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitQuizAnswerMutation(baseOptions?: Apollo.MutationHookOptions<SubmitQuizAnswerMutation, SubmitQuizAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitQuizAnswerMutation, SubmitQuizAnswerMutationVariables>(SubmitQuizAnswerDocument, options);
      }
export type SubmitQuizAnswerMutationHookResult = ReturnType<typeof useSubmitQuizAnswerMutation>;
export type SubmitQuizAnswerMutationResult = Apollo.MutationResult<SubmitQuizAnswerMutation>;
export type SubmitQuizAnswerMutationOptions = Apollo.BaseMutationOptions<SubmitQuizAnswerMutation, SubmitQuizAnswerMutationVariables>;
export const SubmitQuestionAnswerDocument = gql`
    mutation submitQuestionAnswer($input: QuestionAnswer!) {
  submitQuestionAnswer(input: $input) {
    choiceIds
    pass
    question {
      hint
      choices {
        isCorrect
        text
        id
      }
      commentary
      subText
      text
    }
  }
}
    `;
export type SubmitQuestionAnswerMutationFn = Apollo.MutationFunction<SubmitQuestionAnswerMutation, SubmitQuestionAnswerMutationVariables>;

/**
 * __useSubmitQuestionAnswerMutation__
 *
 * To run a mutation, you first call `useSubmitQuestionAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitQuestionAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitQuestionAnswerMutation, { data, loading, error }] = useSubmitQuestionAnswerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitQuestionAnswerMutation(baseOptions?: Apollo.MutationHookOptions<SubmitQuestionAnswerMutation, SubmitQuestionAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitQuestionAnswerMutation, SubmitQuestionAnswerMutationVariables>(SubmitQuestionAnswerDocument, options);
      }
export type SubmitQuestionAnswerMutationHookResult = ReturnType<typeof useSubmitQuestionAnswerMutation>;
export type SubmitQuestionAnswerMutationResult = Apollo.MutationResult<SubmitQuestionAnswerMutation>;
export type SubmitQuestionAnswerMutationOptions = Apollo.BaseMutationOptions<SubmitQuestionAnswerMutation, SubmitQuestionAnswerMutationVariables>;
export const ChallengeQuizConnectionDocument = gql`
    query challengeQuizConnection($first: Int, $offset: Int, $orderBy: QuizConnectionOrder, $where: QuizConnectionWhere) {
  quizConnection(first: $first, offset: $offset, orderBy: $orderBy, where: $where) {
    nodes {
      id
      title
    }
    totalCount
  }
}
    `;

/**
 * __useChallengeQuizConnectionQuery__
 *
 * To run a query within a React component, call `useChallengeQuizConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeQuizConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeQuizConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useChallengeQuizConnectionQuery(baseOptions?: Apollo.QueryHookOptions<ChallengeQuizConnectionQuery, ChallengeQuizConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChallengeQuizConnectionQuery, ChallengeQuizConnectionQueryVariables>(ChallengeQuizConnectionDocument, options);
      }
export function useChallengeQuizConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChallengeQuizConnectionQuery, ChallengeQuizConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChallengeQuizConnectionQuery, ChallengeQuizConnectionQueryVariables>(ChallengeQuizConnectionDocument, options);
        }
export type ChallengeQuizConnectionQueryHookResult = ReturnType<typeof useChallengeQuizConnectionQuery>;
export type ChallengeQuizConnectionLazyQueryHookResult = ReturnType<typeof useChallengeQuizConnectionLazyQuery>;
export type ChallengeQuizConnectionQueryResult = Apollo.QueryResult<ChallengeQuizConnectionQuery, ChallengeQuizConnectionQueryVariables>;
export const ChallengeQuizDocument = gql`
    query challengeQuiz($where: QuizWhere!) {
  quiz(where: $where) {
    id
    questions {
      difficulty
      hint
      id
      idx
      subText
      text
      choices {
        id
        text
      }
    }
    title
  }
}
    `;

/**
 * __useChallengeQuizQuery__
 *
 * To run a query within a React component, call `useChallengeQuizQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeQuizQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeQuizQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useChallengeQuizQuery(baseOptions: Apollo.QueryHookOptions<ChallengeQuizQuery, ChallengeQuizQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChallengeQuizQuery, ChallengeQuizQueryVariables>(ChallengeQuizDocument, options);
      }
export function useChallengeQuizLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChallengeQuizQuery, ChallengeQuizQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChallengeQuizQuery, ChallengeQuizQueryVariables>(ChallengeQuizDocument, options);
        }
export type ChallengeQuizQueryHookResult = ReturnType<typeof useChallengeQuizQuery>;
export type ChallengeQuizLazyQueryHookResult = ReturnType<typeof useChallengeQuizLazyQuery>;
export type ChallengeQuizQueryResult = Apollo.QueryResult<ChallengeQuizQuery, ChallengeQuizQueryVariables>;
export const RandomQuizQuestionDocument = gql`
    query randomQuizQuestion($where: RandomQuizQuestion!) {
  randomQuizQuestion(where: $where) {
    choices {
      id
      text
    }
    difficulty
    hint
    id
    target
    subText
    text
    type
  }
}
    `;

/**
 * __useRandomQuizQuestionQuery__
 *
 * To run a query within a React component, call `useRandomQuizQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useRandomQuizQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRandomQuizQuestionQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useRandomQuizQuestionQuery(baseOptions: Apollo.QueryHookOptions<RandomQuizQuestionQuery, RandomQuizQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RandomQuizQuestionQuery, RandomQuizQuestionQueryVariables>(RandomQuizQuestionDocument, options);
      }
export function useRandomQuizQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RandomQuizQuestionQuery, RandomQuizQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RandomQuizQuestionQuery, RandomQuizQuestionQueryVariables>(RandomQuizQuestionDocument, options);
        }
export type RandomQuizQuestionQueryHookResult = ReturnType<typeof useRandomQuizQuestionQuery>;
export type RandomQuizQuestionLazyQueryHookResult = ReturnType<typeof useRandomQuizQuestionLazyQuery>;
export type RandomQuizQuestionQueryResult = Apollo.QueryResult<RandomQuizQuestionQuery, RandomQuizQuestionQueryVariables>;
export const QuizResultDocument = gql`
    query quizResult($where: QuizResultWhere!) {
  quizResult(where: $where) {
    correctQuestionNum
    totalQuestionNum
    questionResults {
      choiceIds
      pass
      question {
        choices {
          id
          isCorrect
          text
        }
        commentary
        hint
        text
        subText
        id
      }
    }
  }
}
    `;

/**
 * __useQuizResultQuery__
 *
 * To run a query within a React component, call `useQuizResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizResultQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useQuizResultQuery(baseOptions: Apollo.QueryHookOptions<QuizResultQuery, QuizResultQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuizResultQuery, QuizResultQueryVariables>(QuizResultDocument, options);
      }
export function useQuizResultLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuizResultQuery, QuizResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuizResultQuery, QuizResultQueryVariables>(QuizResultDocument, options);
        }
export type QuizResultQueryHookResult = ReturnType<typeof useQuizResultQuery>;
export type QuizResultLazyQueryHookResult = ReturnType<typeof useQuizResultLazyQuery>;
export type QuizResultQueryResult = Apollo.QueryResult<QuizResultQuery, QuizResultQueryVariables>;
export const CourseCreateOpenRoomDocument = gql`
    mutation courseCreateOpenRoom($input: CourseCreateOpenRoomInput!) {
  courseCreateOpenRoom(input: $input) {
    room {
      id
      roomName
    }
    token
  }
}
    `;
export type CourseCreateOpenRoomMutationFn = Apollo.MutationFunction<CourseCreateOpenRoomMutation, CourseCreateOpenRoomMutationVariables>;

/**
 * __useCourseCreateOpenRoomMutation__
 *
 * To run a mutation, you first call `useCourseCreateOpenRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCourseCreateOpenRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [courseCreateOpenRoomMutation, { data, loading, error }] = useCourseCreateOpenRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCourseCreateOpenRoomMutation(baseOptions?: Apollo.MutationHookOptions<CourseCreateOpenRoomMutation, CourseCreateOpenRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CourseCreateOpenRoomMutation, CourseCreateOpenRoomMutationVariables>(CourseCreateOpenRoomDocument, options);
      }
export type CourseCreateOpenRoomMutationHookResult = ReturnType<typeof useCourseCreateOpenRoomMutation>;
export type CourseCreateOpenRoomMutationResult = Apollo.MutationResult<CourseCreateOpenRoomMutation>;
export type CourseCreateOpenRoomMutationOptions = Apollo.BaseMutationOptions<CourseCreateOpenRoomMutation, CourseCreateOpenRoomMutationVariables>;
export const CourseJoinOpenRoomDocument = gql`
    mutation courseJoinOpenRoom($input: CourseJoinOpenRoomInput!) {
  courseJoinOpenRoom(input: $input) {
    token
  }
}
    `;
export type CourseJoinOpenRoomMutationFn = Apollo.MutationFunction<CourseJoinOpenRoomMutation, CourseJoinOpenRoomMutationVariables>;

/**
 * __useCourseJoinOpenRoomMutation__
 *
 * To run a mutation, you first call `useCourseJoinOpenRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCourseJoinOpenRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [courseJoinOpenRoomMutation, { data, loading, error }] = useCourseJoinOpenRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCourseJoinOpenRoomMutation(baseOptions?: Apollo.MutationHookOptions<CourseJoinOpenRoomMutation, CourseJoinOpenRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CourseJoinOpenRoomMutation, CourseJoinOpenRoomMutationVariables>(CourseJoinOpenRoomDocument, options);
      }
export type CourseJoinOpenRoomMutationHookResult = ReturnType<typeof useCourseJoinOpenRoomMutation>;
export type CourseJoinOpenRoomMutationResult = Apollo.MutationResult<CourseJoinOpenRoomMutation>;
export type CourseJoinOpenRoomMutationOptions = Apollo.BaseMutationOptions<CourseJoinOpenRoomMutation, CourseJoinOpenRoomMutationVariables>;
export const CourseUploadOpenRoomSharedFileDocument = gql`
    mutation courseUploadOpenRoomSharedFile($input: CourseUploadOpenRoomSharedFileInput!) {
  courseUploadOpenRoomSharedFile(input: $input) {
    success
  }
}
    `;
export type CourseUploadOpenRoomSharedFileMutationFn = Apollo.MutationFunction<CourseUploadOpenRoomSharedFileMutation, CourseUploadOpenRoomSharedFileMutationVariables>;

/**
 * __useCourseUploadOpenRoomSharedFileMutation__
 *
 * To run a mutation, you first call `useCourseUploadOpenRoomSharedFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCourseUploadOpenRoomSharedFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [courseUploadOpenRoomSharedFileMutation, { data, loading, error }] = useCourseUploadOpenRoomSharedFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCourseUploadOpenRoomSharedFileMutation(baseOptions?: Apollo.MutationHookOptions<CourseUploadOpenRoomSharedFileMutation, CourseUploadOpenRoomSharedFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CourseUploadOpenRoomSharedFileMutation, CourseUploadOpenRoomSharedFileMutationVariables>(CourseUploadOpenRoomSharedFileDocument, options);
      }
export type CourseUploadOpenRoomSharedFileMutationHookResult = ReturnType<typeof useCourseUploadOpenRoomSharedFileMutation>;
export type CourseUploadOpenRoomSharedFileMutationResult = Apollo.MutationResult<CourseUploadOpenRoomSharedFileMutation>;
export type CourseUploadOpenRoomSharedFileMutationOptions = Apollo.BaseMutationOptions<CourseUploadOpenRoomSharedFileMutation, CourseUploadOpenRoomSharedFileMutationVariables>;
export const CourseCompleteOpenRoomDocument = gql`
    mutation courseCompleteOpenRoom($input: CourseCompleteOpenRoomInput!) {
  courseCompleteOpenRoom(input: $input) {
    success
  }
}
    `;
export type CourseCompleteOpenRoomMutationFn = Apollo.MutationFunction<CourseCompleteOpenRoomMutation, CourseCompleteOpenRoomMutationVariables>;

/**
 * __useCourseCompleteOpenRoomMutation__
 *
 * To run a mutation, you first call `useCourseCompleteOpenRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCourseCompleteOpenRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [courseCompleteOpenRoomMutation, { data, loading, error }] = useCourseCompleteOpenRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCourseCompleteOpenRoomMutation(baseOptions?: Apollo.MutationHookOptions<CourseCompleteOpenRoomMutation, CourseCompleteOpenRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CourseCompleteOpenRoomMutation, CourseCompleteOpenRoomMutationVariables>(CourseCompleteOpenRoomDocument, options);
      }
export type CourseCompleteOpenRoomMutationHookResult = ReturnType<typeof useCourseCompleteOpenRoomMutation>;
export type CourseCompleteOpenRoomMutationResult = Apollo.MutationResult<CourseCompleteOpenRoomMutation>;
export type CourseCompleteOpenRoomMutationOptions = Apollo.BaseMutationOptions<CourseCompleteOpenRoomMutation, CourseCompleteOpenRoomMutationVariables>;
export const CourseOpenRoomConnectionDocument = gql`
    query courseOpenRoomConnection($where: CourseOpenRoomConnectionWhere, $first: Int, $offset: Int, $orderBy: CourseOpenRoomConnectionOrder) {
  courseOpenRoomConnection(
    where: $where
    first: $first
    offset: $offset
    orderBy: $orderBy
  ) {
    nodes {
      id
      isPublic
      passwordProtected
      roomName
      type
      createdAt
      creator
      status
      currentParticipants {
        name
      }
      creatorName
    }
    totalCount
  }
}
    `;

/**
 * __useCourseOpenRoomConnectionQuery__
 *
 * To run a query within a React component, call `useCourseOpenRoomConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseOpenRoomConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseOpenRoomConnectionQuery({
 *   variables: {
 *      where: // value for 'where'
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useCourseOpenRoomConnectionQuery(baseOptions?: Apollo.QueryHookOptions<CourseOpenRoomConnectionQuery, CourseOpenRoomConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseOpenRoomConnectionQuery, CourseOpenRoomConnectionQueryVariables>(CourseOpenRoomConnectionDocument, options);
      }
export function useCourseOpenRoomConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseOpenRoomConnectionQuery, CourseOpenRoomConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseOpenRoomConnectionQuery, CourseOpenRoomConnectionQueryVariables>(CourseOpenRoomConnectionDocument, options);
        }
export type CourseOpenRoomConnectionQueryHookResult = ReturnType<typeof useCourseOpenRoomConnectionQuery>;
export type CourseOpenRoomConnectionLazyQueryHookResult = ReturnType<typeof useCourseOpenRoomConnectionLazyQuery>;
export type CourseOpenRoomConnectionQueryResult = Apollo.QueryResult<CourseOpenRoomConnectionQuery, CourseOpenRoomConnectionQueryVariables>;
export const CourseOpenRoomDocument = gql`
    query courseOpenRoom($where: CourseOpenRoomWhere!) {
  courseOpenRoom(where: $where) {
    id
    inviteLink {
      tutor
      user
    }
    isPublic
    roomName
    type
    creator
    sharedFiles {
      id
      type
      url
    }
    createdAt
  }
}
    `;

/**
 * __useCourseOpenRoomQuery__
 *
 * To run a query within a React component, call `useCourseOpenRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseOpenRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseOpenRoomQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCourseOpenRoomQuery(baseOptions: Apollo.QueryHookOptions<CourseOpenRoomQuery, CourseOpenRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseOpenRoomQuery, CourseOpenRoomQueryVariables>(CourseOpenRoomDocument, options);
      }
export function useCourseOpenRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseOpenRoomQuery, CourseOpenRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseOpenRoomQuery, CourseOpenRoomQueryVariables>(CourseOpenRoomDocument, options);
        }
export type CourseOpenRoomQueryHookResult = ReturnType<typeof useCourseOpenRoomQuery>;
export type CourseOpenRoomLazyQueryHookResult = ReturnType<typeof useCourseOpenRoomLazyQuery>;
export type CourseOpenRoomQueryResult = Apollo.QueryResult<CourseOpenRoomQuery, CourseOpenRoomQueryVariables>;
export const LoginUserDocument = gql`
    mutation loginUser($input: LoginUserInput!) {
  loginUser(input: $input) {
    accessToken
    expiresIn
    refreshToken
    refreshExpiresIn
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation logoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const LoginSocialUserDocument = gql`
    mutation loginSocialUser($input: LoginSocialUserInput!) {
  loginSocialUser(input: $input) {
    accessToken
    expiresIn
    refreshToken
    refreshExpiresIn
  }
}
    `;
export type LoginSocialUserMutationFn = Apollo.MutationFunction<LoginSocialUserMutation, LoginSocialUserMutationVariables>;

/**
 * __useLoginSocialUserMutation__
 *
 * To run a mutation, you first call `useLoginSocialUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginSocialUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginSocialUserMutation, { data, loading, error }] = useLoginSocialUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginSocialUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginSocialUserMutation, LoginSocialUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginSocialUserMutation, LoginSocialUserMutationVariables>(LoginSocialUserDocument, options);
      }
export type LoginSocialUserMutationHookResult = ReturnType<typeof useLoginSocialUserMutation>;
export type LoginSocialUserMutationResult = Apollo.MutationResult<LoginSocialUserMutation>;
export type LoginSocialUserMutationOptions = Apollo.BaseMutationOptions<LoginSocialUserMutation, LoginSocialUserMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CreateUserSocialDocument = gql`
    mutation createUserSocial($input: CreateUserSocialInput!) {
  createUserSocial(input: $input) {
    email
  }
}
    `;
export type CreateUserSocialMutationFn = Apollo.MutationFunction<CreateUserSocialMutation, CreateUserSocialMutationVariables>;

/**
 * __useCreateUserSocialMutation__
 *
 * To run a mutation, you first call `useCreateUserSocialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserSocialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserSocialMutation, { data, loading, error }] = useCreateUserSocialMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserSocialMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserSocialMutation, CreateUserSocialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserSocialMutation, CreateUserSocialMutationVariables>(CreateUserSocialDocument, options);
      }
export type CreateUserSocialMutationHookResult = ReturnType<typeof useCreateUserSocialMutation>;
export type CreateUserSocialMutationResult = Apollo.MutationResult<CreateUserSocialMutation>;
export type CreateUserSocialMutationOptions = Apollo.BaseMutationOptions<CreateUserSocialMutation, CreateUserSocialMutationVariables>;
export const ReTokenUserDocument = gql`
    mutation reTokenUser($input: ReTokenUserInput!) {
  reTokenUser(input: $input) {
    accessToken
    expiresIn
    refreshToken
    refreshExpiresIn
  }
}
    `;
export type ReTokenUserMutationFn = Apollo.MutationFunction<ReTokenUserMutation, ReTokenUserMutationVariables>;

/**
 * __useReTokenUserMutation__
 *
 * To run a mutation, you first call `useReTokenUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReTokenUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reTokenUserMutation, { data, loading, error }] = useReTokenUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReTokenUserMutation(baseOptions?: Apollo.MutationHookOptions<ReTokenUserMutation, ReTokenUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReTokenUserMutation, ReTokenUserMutationVariables>(ReTokenUserDocument, options);
      }
export type ReTokenUserMutationHookResult = ReturnType<typeof useReTokenUserMutation>;
export type ReTokenUserMutationResult = Apollo.MutationResult<ReTokenUserMutation>;
export type ReTokenUserMutationOptions = Apollo.BaseMutationOptions<ReTokenUserMutation, ReTokenUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UserAuthIdentityDocument = gql`
    query userAuthIdentity($where: UserAuthIdentityWhere!) {
  userAuthIdentity(where: $where) {
    name
    birth
    phone
  }
}
    `;

/**
 * __useUserAuthIdentityQuery__
 *
 * To run a query within a React component, call `useUserAuthIdentityQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAuthIdentityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAuthIdentityQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserAuthIdentityQuery(baseOptions: Apollo.QueryHookOptions<UserAuthIdentityQuery, UserAuthIdentityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserAuthIdentityQuery, UserAuthIdentityQueryVariables>(UserAuthIdentityDocument, options);
      }
export function useUserAuthIdentityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserAuthIdentityQuery, UserAuthIdentityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserAuthIdentityQuery, UserAuthIdentityQueryVariables>(UserAuthIdentityDocument, options);
        }
export type UserAuthIdentityQueryHookResult = ReturnType<typeof useUserAuthIdentityQuery>;
export type UserAuthIdentityLazyQueryHookResult = ReturnType<typeof useUserAuthIdentityLazyQuery>;
export type UserAuthIdentityQueryResult = Apollo.QueryResult<UserAuthIdentityQuery, UserAuthIdentityQueryVariables>;
export const AddUserProfileDocument = gql`
    mutation addUserProfile($input: AddUserProfileInput!) {
  addUserProfile(input: $input) {
    profiles {
      id
      name
      birth
      phone
      userId
      codingTypes
      avatar {
        domain
        url
        width
        height
        idx
        key
      }
    }
  }
}
    `;
export type AddUserProfileMutationFn = Apollo.MutationFunction<AddUserProfileMutation, AddUserProfileMutationVariables>;

/**
 * __useAddUserProfileMutation__
 *
 * To run a mutation, you first call `useAddUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserProfileMutation, { data, loading, error }] = useAddUserProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<AddUserProfileMutation, AddUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserProfileMutation, AddUserProfileMutationVariables>(AddUserProfileDocument, options);
      }
export type AddUserProfileMutationHookResult = ReturnType<typeof useAddUserProfileMutation>;
export type AddUserProfileMutationResult = Apollo.MutationResult<AddUserProfileMutation>;
export type AddUserProfileMutationOptions = Apollo.BaseMutationOptions<AddUserProfileMutation, AddUserProfileMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation updateUserProfile($input: UpdateUserProfileInput!) {
  updateUserProfile(input: $input) {
    profiles {
      id
      name
      birth
      phone
      codingTypes
      avatar {
        domain
      }
    }
  }
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const ResetUserPinCodeDocument = gql`
    mutation resetUserPinCode($input: ResetUserPinCodeInput!) {
  resetUserPinCode(input: $input)
}
    `;
export type ResetUserPinCodeMutationFn = Apollo.MutationFunction<ResetUserPinCodeMutation, ResetUserPinCodeMutationVariables>;

/**
 * __useResetUserPinCodeMutation__
 *
 * To run a mutation, you first call `useResetUserPinCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetUserPinCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetUserPinCodeMutation, { data, loading, error }] = useResetUserPinCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetUserPinCodeMutation(baseOptions?: Apollo.MutationHookOptions<ResetUserPinCodeMutation, ResetUserPinCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetUserPinCodeMutation, ResetUserPinCodeMutationVariables>(ResetUserPinCodeDocument, options);
      }
export type ResetUserPinCodeMutationHookResult = ReturnType<typeof useResetUserPinCodeMutation>;
export type ResetUserPinCodeMutationResult = Apollo.MutationResult<ResetUserPinCodeMutation>;
export type ResetUserPinCodeMutationOptions = Apollo.BaseMutationOptions<ResetUserPinCodeMutation, ResetUserPinCodeMutationVariables>;
export const UpdateUserPinCodeDocument = gql`
    mutation updateUserPinCode($input: UpdateUserPinCodeInput!) {
  updateUserPinCode(input: $input)
}
    `;
export type UpdateUserPinCodeMutationFn = Apollo.MutationFunction<UpdateUserPinCodeMutation, UpdateUserPinCodeMutationVariables>;

/**
 * __useUpdateUserPinCodeMutation__
 *
 * To run a mutation, you first call `useUpdateUserPinCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPinCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPinCodeMutation, { data, loading, error }] = useUpdateUserPinCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserPinCodeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPinCodeMutation, UpdateUserPinCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPinCodeMutation, UpdateUserPinCodeMutationVariables>(UpdateUserPinCodeDocument, options);
      }
export type UpdateUserPinCodeMutationHookResult = ReturnType<typeof useUpdateUserPinCodeMutation>;
export type UpdateUserPinCodeMutationResult = Apollo.MutationResult<UpdateUserPinCodeMutation>;
export type UpdateUserPinCodeMutationOptions = Apollo.BaseMutationOptions<UpdateUserPinCodeMutation, UpdateUserPinCodeMutationVariables>;
export const UserProfileConnectionDocument = gql`
    query userProfileConnection($first: Int, $offset: Int, $orderBy: UserProfileConnectionOrder, $where: UserProfileConnectionWhere) {
  userProfileConnection(
    first: $first
    offset: $offset
    orderBy: $orderBy
    where: $where
  ) {
    nodes {
      id
      userId
      name
      birth
      phone
      role
      codingTypes
      avatar {
        url
      }
    }
  }
}
    `;

/**
 * __useUserProfileConnectionQuery__
 *
 * To run a query within a React component, call `useUserProfileConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserProfileConnectionQuery(baseOptions?: Apollo.QueryHookOptions<UserProfileConnectionQuery, UserProfileConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileConnectionQuery, UserProfileConnectionQueryVariables>(UserProfileConnectionDocument, options);
      }
export function useUserProfileConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileConnectionQuery, UserProfileConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileConnectionQuery, UserProfileConnectionQueryVariables>(UserProfileConnectionDocument, options);
        }
export type UserProfileConnectionQueryHookResult = ReturnType<typeof useUserProfileConnectionQuery>;
export type UserProfileConnectionLazyQueryHookResult = ReturnType<typeof useUserProfileConnectionLazyQuery>;
export type UserProfileConnectionQueryResult = Apollo.QueryResult<UserProfileConnectionQuery, UserProfileConnectionQueryVariables>;
export const UserProfileTokenDocument = gql`
    query userProfileToken($where: UserProfileTokenWhere!) {
  userProfileToken(where: $where) {
    accessToken
    expiresIn
    refreshToken
    refreshExpiresIn
  }
}
    `;

/**
 * __useUserProfileTokenQuery__
 *
 * To run a query within a React component, call `useUserProfileTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileTokenQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserProfileTokenQuery(baseOptions: Apollo.QueryHookOptions<UserProfileTokenQuery, UserProfileTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileTokenQuery, UserProfileTokenQueryVariables>(UserProfileTokenDocument, options);
      }
export function useUserProfileTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileTokenQuery, UserProfileTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileTokenQuery, UserProfileTokenQueryVariables>(UserProfileTokenDocument, options);
        }
export type UserProfileTokenQueryHookResult = ReturnType<typeof useUserProfileTokenQuery>;
export type UserProfileTokenLazyQueryHookResult = ReturnType<typeof useUserProfileTokenLazyQuery>;
export type UserProfileTokenQueryResult = Apollo.QueryResult<UserProfileTokenQuery, UserProfileTokenQueryVariables>;
export const CreateUserContactDocument = gql`
    mutation createUserContact($input: CreateUserContactInput!) {
  createUserContact(input: $input) {
    id
    type
    description
    status
    createdAt
  }
}
    `;
export type CreateUserContactMutationFn = Apollo.MutationFunction<CreateUserContactMutation, CreateUserContactMutationVariables>;

/**
 * __useCreateUserContactMutation__
 *
 * To run a mutation, you first call `useCreateUserContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserContactMutation, { data, loading, error }] = useCreateUserContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserContactMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserContactMutation, CreateUserContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserContactMutation, CreateUserContactMutationVariables>(CreateUserContactDocument, options);
      }
export type CreateUserContactMutationHookResult = ReturnType<typeof useCreateUserContactMutation>;
export type CreateUserContactMutationResult = Apollo.MutationResult<CreateUserContactMutation>;
export type CreateUserContactMutationOptions = Apollo.BaseMutationOptions<CreateUserContactMutation, CreateUserContactMutationVariables>;
export const UserContactConnectionDocument = gql`
    query userContactConnection($first: Int, $offset: Int, $orderBy: UserContactConnectionOrder, $where: UserContactConnectionWhere) {
  userContactConnection(
    first: $first
    offset: $offset
    orderBy: $orderBy
    where: $where
  ) {
    totalCount
    nodes {
      id
      name
      description
      createdAt
      response
      responseDate
      orderId
      status
      type
      files {
        name
        url
      }
    }
  }
}
    `;

/**
 * __useUserContactConnectionQuery__
 *
 * To run a query within a React component, call `useUserContactConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserContactConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserContactConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserContactConnectionQuery(baseOptions?: Apollo.QueryHookOptions<UserContactConnectionQuery, UserContactConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserContactConnectionQuery, UserContactConnectionQueryVariables>(UserContactConnectionDocument, options);
      }
export function useUserContactConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserContactConnectionQuery, UserContactConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserContactConnectionQuery, UserContactConnectionQueryVariables>(UserContactConnectionDocument, options);
        }
export type UserContactConnectionQueryHookResult = ReturnType<typeof useUserContactConnectionQuery>;
export type UserContactConnectionLazyQueryHookResult = ReturnType<typeof useUserContactConnectionLazyQuery>;
export type UserContactConnectionQueryResult = Apollo.QueryResult<UserContactConnectionQuery, UserContactConnectionQueryVariables>;
export const UserContactDocument = gql`
    query userContact($where: UserContactWhere) {
  userContact(where: $where) {
    createdAt
    description
    id
    name
    orderId
    response
    type
    updatedAt
    owner {
      name
      email
    }
    responseOwner {
      name
    }
  }
}
    `;

/**
 * __useUserContactQuery__
 *
 * To run a query within a React component, call `useUserContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserContactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserContactQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserContactQuery(baseOptions?: Apollo.QueryHookOptions<UserContactQuery, UserContactQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserContactQuery, UserContactQueryVariables>(UserContactDocument, options);
      }
export function useUserContactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserContactQuery, UserContactQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserContactQuery, UserContactQueryVariables>(UserContactDocument, options);
        }
export type UserContactQueryHookResult = ReturnType<typeof useUserContactQuery>;
export type UserContactLazyQueryHookResult = ReturnType<typeof useUserContactLazyQuery>;
export type UserContactQueryResult = Apollo.QueryResult<UserContactQuery, UserContactQueryVariables>;
export const UserDocument = gql`
    query user($where: UserWhere!) {
  user(where: $where) {
    id
    email
    name
    phone
    profiles {
      birth
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const ProfileConnectionDocument = gql`
    query profileConnection {
  user {
    profiles {
      avatar {
        url
      }
      id
      birth
      userId
      role
      name
      phone
    }
    isPinCode
  }
}
    `;

/**
 * __useProfileConnectionQuery__
 *
 * To run a query within a React component, call `useProfileConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileConnectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileConnectionQuery(baseOptions?: Apollo.QueryHookOptions<ProfileConnectionQuery, ProfileConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileConnectionQuery, ProfileConnectionQueryVariables>(ProfileConnectionDocument, options);
      }
export function useProfileConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileConnectionQuery, ProfileConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileConnectionQuery, ProfileConnectionQueryVariables>(ProfileConnectionDocument, options);
        }
export type ProfileConnectionQueryHookResult = ReturnType<typeof useProfileConnectionQuery>;
export type ProfileConnectionLazyQueryHookResult = ReturnType<typeof useProfileConnectionLazyQuery>;
export type ProfileConnectionQueryResult = Apollo.QueryResult<ProfileConnectionQuery, ProfileConnectionQueryVariables>;