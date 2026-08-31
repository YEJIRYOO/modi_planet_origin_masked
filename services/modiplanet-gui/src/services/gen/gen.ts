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
  /** 생성일 */
  createdAt: Scalars['String'];
  /** 에포크 */
  epoch: Scalars['Int'];
  /** 모델 ID */
  id: Scalars['ID'];
  /** 학습률 */
  learningRate: Scalars['Float'];
  /** model.json 파일 경로 */
  modelUrl: Scalars['String'];
  /**
   * 모듈 유형 (Button, ToF, IMU 등)
   *
   * 모델 유형이 모디일 경우에만 필수
   */
  moduleType?: Maybe<Scalars['String']>;
  /** 모델명 */
  name: Scalars['String'];
  /** 프로필 ID */
  profileId?: Maybe<Scalars['ID']>;
  /** 유저 ID */
  userId: Scalars['ID'];
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
  AiBlock = 'AI_BLOCK',
  Block = 'BLOCK',
  Python = 'PYTHON'
}

/** 교육자료 학습 내역 (교육자료가 포함된 강의에만 존재) */
export type ActivityHistory = {
  __typename?: 'ActivityHistory';
  /** 학습 내역 목록 */
  activities: Array<ActivityHistoryItem>;
  /** 마지막으로 학습한 단계 ID */
  lastStepID: Scalars['ID'];
  /** 단계 학습 진행률 */
  progressRate: Scalars['Int'];
};

export type ActivityHistoryDetail = ActivityPdfHistory | ActivityVodHistory;

/** 단계 학습 내역 항목 */
export type ActivityHistoryItem = {
  __typename?: 'ActivityHistoryItem';
  /** 상세 정보 */
  detail?: Maybe<ActivityHistoryDetail>;
  /** 학습 완료 여부 */
  isCompleted: Scalars['Boolean'];
  /** 단계 학습 진행률 */
  progressRate: Scalars['Int'];
  /** 학습 상태 (미수강/수강중/수강완료) */
  status: ProgressStatus;
  /** 단계 ID */
  stepID: Scalars['ID'];
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

export type AddCoursesToCourseGroupInput = {
  /** 과정그룹 ID */
  courseGroupId: Scalars['ID'];
  /** 추가할 과정 ID 목록 */
  courseIds: Array<Scalars['ID']>;
};

export type AddLessonsToCourseInput = {
  /** 코스 ID */
  courseId: Scalars['ID'];
  /** 추가할 레슨 ID 목록 */
  lessonIds: Array<Scalars['ID']>;
};

export type AddProjectFavoriteInput = {
  projectId: Scalars['ID'];
  userKey?: InputMaybe<Scalars['String']>;
};

export type AddStepsToLessonInput = {
  /** 레슨 ID */
  lessonId: Scalars['ID'];
  /** 추가할 단계 ID 목록 */
  stepIds: Array<Scalars['ID']>;
};

export type Address = {
  __typename?: 'Address';
  /** 주소 */
  address: Scalars['String'];
  /** 도시 */
  city: Scalars['String'];
  /** 국제전화번호 (ex. +82) */
  countryCallingCode: Scalars['String'];
  /** 국가코드 (ex. KR) */
  countryCode: Scalars['String'];
  /** 상세 주소 */
  detailAddress: Scalars['String'];
  /** 고유번호 */
  id: Scalars['ID'];
  /** 기본배송지 여부 */
  isDefault: Scalars['Boolean'];
  /** 배송지명 */
  name: Scalars['String'];
  /** 핸드폰 번호 (ex. 01012341234) */
  phoneNumber: Scalars['String'];
  /** 우편번호 */
  postalCode: Scalars['String'];
  /** 수령인 */
  receiver: Scalars['String'];
  /** 유저 고유번호 */
  userId: Scalars['String'];
};

export type AddressInput = {
  /** 주소 고유번호 */
  id: Scalars['ID'];
};

export type AdminContactConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ContactConnectionOrderBy>;
  where?: InputMaybe<ContactConnectionWhere>;
};

export type AdminContactInput = {
  /** 문의 고유번호 */
  id: Scalars['ID'];
};

export type AdminContactReply = {
  __typename?: 'AdminContactReply';
  success: Scalars['Boolean'];
};

export type AdminCreateContactReplyInput = {
  /** 문의 고유번호 */
  id: Scalars['ID'];
  /** 답변 내용 */
  responseMessage: Scalars['String'];
};

export type AdminCreateFaq = {
  __typename?: 'AdminCreateFaq';
  id: Scalars['ID'];
};

export type AdminCreateFaqInput = {
  /** 카테고리 */
  category: FaqCategoryType;
  /** 언어별 FAQ 정보 */
  contents: Array<ContentInput>;
  /** 노출 여부 */
  isExposed: Scalars['Boolean'];
  /** 서브 카테고리 */
  subCategory?: InputMaybe<Scalars['String']>;
};

export type AdminCreateLibrary = {
  __typename?: 'AdminCreateLibrary';
  id: Scalars['ID'];
};

export type AdminCreateLibraryInput = {
  /** 언어별 자료 정보 */
  contents: Array<ContentInput>;
  /** 노출 여부 */
  isExposed: Scalars['Boolean'];
};

export type AdminCreateNotice = {
  __typename?: 'AdminCreateNotice';
  id: Scalars['ID'];
};

export type AdminCreateNoticeInput = {
  /** 언어별 공지사항 정보 */
  contents: Array<ContentInput>;
  /** 노출 여부 */
  isExposed: Scalars['Boolean'];
  /** 상위 고정 여부 */
  isTop: Scalars['Boolean'];
};

export type AdminDeleteContactReply = {
  __typename?: 'AdminDeleteContactReply';
  success: Scalars['Boolean'];
};

export type AdminDeleteFaq = {
  __typename?: 'AdminDeleteFaq';
  success: Scalars['Boolean'];
};

export type AdminDeleteFaqInput = {
  /** FAQ 고유번호 */
  id: Scalars['ID'];
};

export type AdminDeleteLibrary = {
  __typename?: 'AdminDeleteLibrary';
  success: Scalars['Boolean'];
};

export type AdminDeleteLibraryInput = {
  /** 자료 고유번호 */
  id: Scalars['ID'];
};

export type AdminDeleteNotice = {
  __typename?: 'AdminDeleteNotice';
  success: Scalars['Boolean'];
};

export type AdminDeleteNoticeInput = {
  /** 공지사항 고유번호 */
  id: Scalars['ID'];
};

export type AdminFaq = {
  __typename?: 'AdminFaq';
  category: FaqCategoryType;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isExposed: Scalars['Boolean'];
  language: LanguageType;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type AdminFaqConnection = {
  __typename?: 'AdminFaqConnection';
  nodes: Array<AdminFaqNode>;
  totalCount: Scalars['Int'];
};

export type AdminFaqConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdminFaqConnectionOrderBy>;
  where: AdminFaqConnectionWhere;
};

export type AdminFaqConnectionOrderBy = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<FaqConnectionOrderByFieldType>;
};

export type AdminFaqConnectionWhere = {
  /** 카테고리 */
  category?: InputMaybe<FaqCategoryType>;
  /** 언어 */
  language?: InputMaybe<LanguageType>;
  /** 제목 */
  title?: InputMaybe<Scalars['String']>;
};

export type AdminFaqInput = {
  /** FAQ 고유번호 */
  id: Scalars['ID'];
  /** 언어 */
  language: LanguageType;
};

export type AdminFaqNode = {
  __typename?: 'AdminFaqNode';
  category: FaqCategoryType;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isExposed: Scalars['Boolean'];
  language: LanguageType;
  languagesIncluded: Array<Scalars['String']>;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type AdminGrant = {
  __typename?: 'AdminGrant';
  /** 계정 타입 (HUMAN / SERVICE) */
  accountType: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['String'];
  /** 만료 시각 (RFC3339). null = 영구. */
  expiresAt?: Maybe<Scalars['String']>;
  /** 부여한 관리자 ID */
  grantedByUserId: Scalars['ID'];
  /** grant 고유 ID */
  id: Scalars['ID'];
  /** 감사 로그용 사유 */
  reason?: Maybe<Scalars['String']>;
  /** 역할 ID (catalog 참조) */
  roleId: Scalars['ID'];
  /** 부여 대상 유저 ID */
  userId: Scalars['ID'];
};

export type AdminLibrary = {
  __typename?: 'AdminLibrary';
  attachments: Array<LibraryContentAttachment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  index: Scalars['Int'];
  isExposed: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  language: LanguageType;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type AdminLibraryConnection = {
  __typename?: 'AdminLibraryConnection';
  nodes: Array<AdminLibraryNode>;
  totalCount: Scalars['Int'];
};

export type AdminLibraryConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdminLibraryConnectionOrderBy>;
  where: AdminLibraryConnectionWhere;
};

export type AdminLibraryConnectionOrderBy = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<LibraryConnectionOrderByFieldType>;
};

export type AdminLibraryConnectionWhere = {
  /** 키워드 (제목 또는 내용) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 언어 */
  language?: InputMaybe<LanguageType>;
};

export type AdminLibraryInput = {
  /** 자료 고유번호 */
  id: Scalars['ID'];
  /** 언어 */
  language: LanguageType;
};

export type AdminLibraryNode = {
  __typename?: 'AdminLibraryNode';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  index: Scalars['Int'];
  isExposed: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  isTop: Scalars['Boolean'];
  language: LanguageType;
  languagesIncluded: Array<Scalars['String']>;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type AdminNotice = {
  __typename?: 'AdminNotice';
  attachments: Array<NoticeContentAttachment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isExposed: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  isTop: Scalars['Boolean'];
  language: LanguageType;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type AdminNoticeConnection = {
  __typename?: 'AdminNoticeConnection';
  nodes: Array<AdminNoticeNode>;
  totalCount: Scalars['Int'];
};

export type AdminNoticeConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdminNoticeConnectionOrderBy>;
  where: AdminNoticeConnectionWhere;
};

export type AdminNoticeConnectionOrderBy = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<NoticeConnectionOrderByFieldType>;
};

export type AdminNoticeConnectionWhere = {
  /** 상위 고정 여부 */
  isTop?: InputMaybe<Scalars['Boolean']>;
  /** 키워드 (제목 또는 내용) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 언어 */
  language?: InputMaybe<LanguageType>;
};

export type AdminNoticeInput = {
  /** 공지사항 고유번호 */
  id: Scalars['ID'];
  /** 언어 */
  language: LanguageType;
};

export type AdminNoticeNode = {
  __typename?: 'AdminNoticeNode';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isExposed: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  isTop: Scalars['Boolean'];
  language: LanguageType;
  languagesIncluded: Array<Scalars['String']>;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

/** 탈퇴 계정 복구 입력 (관리자용) */
export type AdminRestoreAccountInput = {
  /** 이메일 (email 또는 userId 중 하나 필수) */
  email?: InputMaybe<Scalars['String']>;
  /** 사용자 ID (email 또는 userId 중 하나 필수) */
  userId?: InputMaybe<Scalars['ID']>;
};

/** 보호자 이메일 미등록 안내 알림 발송 결과 */
export type AdminSendProtectorNotificationResult = {
  __typename?: 'AdminSendProtectorNotificationResult';
  /** 알림 발송 실패 수 */
  failedCount: Scalars['Int'];
  /** 결과 메시지 */
  message: Scalars['String'];
  /** 알림 발송 스킵 수 (보호자 이메일 이미 등록됨, 16세 이상 등) */
  skippedCount: Scalars['Int'];
  /** 발송 성공 여부 */
  success: Scalars['Boolean'];
  /** 알림 발송 성공 수 */
  successCount: Scalars['Int'];
  /** 처리한 전체 사용자 수 */
  totalProcessed: Scalars['Int'];
};

export type AdminUpdateFaq = {
  __typename?: 'AdminUpdateFaq';
  id: Scalars['ID'];
};

export type AdminUpdateFaqInput = {
  /** 카테고리 */
  category?: InputMaybe<FaqCategoryType>;
  /** 언어별 FAQ 정보 */
  contents: Array<ContentInput>;
  /** FAQ 고유번호 */
  id: Scalars['ID'];
  /** 노출 여부 */
  isExposed?: InputMaybe<Scalars['Boolean']>;
  /** 서브 카테고리 */
  subCategory?: InputMaybe<Scalars['String']>;
};

export type AdminUpdateLibrary = {
  __typename?: 'AdminUpdateLibrary';
  id: Scalars['ID'];
};

export type AdminUpdateLibraryInput = {
  /** 언어별 자료 정보 */
  contents: Array<ContentInput>;
  /** 자료 고유번호 */
  id: Scalars['ID'];
  /** 노출 여부 */
  isExposed?: InputMaybe<Scalars['Boolean']>;
};

export type AdminUpdateNotice = {
  __typename?: 'AdminUpdateNotice';
  id: Scalars['ID'];
};

export type AdminUpdateNoticeInput = {
  /** 언어별 공지사항 정보 */
  contents: Array<ContentInput>;
  /** 공지사항 고유번호 */
  id: Scalars['ID'];
  /** 노출 여부 */
  isExposed?: InputMaybe<Scalars['Boolean']>;
  /** 상위 고정 여부 */
  isTop?: InputMaybe<Scalars['Boolean']>;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  /** 생성일 */
  createdAt: Scalars['String'];
  /** 이메일 */
  email: Scalars['String'];
  /** 이메일 마케팅 정보 수신 동의 (선택) */
  emailMarketingConsent: Scalars['Boolean'];
  /** 고유번호 */
  id: Scalars['ID'];
  /** 이메일 마케팅 정보 수신 동의 업데이트 일시 */
  marketingConsentEmailUpdatedAt?: Maybe<Scalars['String']>;
  /** SMS 마케팅 정보 수신 동의 업데이트 일시 */
  marketingConsentSmsUpdatedAt?: Maybe<Scalars['String']>;
  /**
   * 마케팅 정보 수신 동의 업데이트 일시
   * @deprecated Use marketingConsentEmailUpdatedAt instead
   * @deprecated Use marketingConsentEmailUpdatedAt instead
   */
  marketingConsentUpdatedAt?: Maybe<Scalars['String']>;
  /** 개인정보 제 3자 제공 동의 (선택) */
  personalInfoConsent: Scalars['Boolean'];
  /** 개인정보 이용약관 동의 (필수) */
  privacyPolicyConsent: Scalars['Boolean'];
  /** 역할 */
  roleType: UserRoleType;
  /** 가입 유형 */
  signUpType: SignUpType;
  /** SMS 마케팅 정보 수신 동의 (선택) */
  smsMarketingConsent: Scalars['Boolean'];
  /** 서비스 이용약관 동의 (필수) */
  termsOfServiceConsent: Scalars['Boolean'];
  /** 수정일 */
  updatedAt: Scalars['String'];
  /** UUID */
  uuid: Scalars['String'];
};

export type AdminUserConnection = {
  __typename?: 'AdminUserConnection';
  /** 문의 목록 */
  nodes: Array<AdminUserNode>;
  /** 문의 총 개수 */
  totalCount: Scalars['Int'];
};

export type AdminUserConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdminUserConnectionOrderBy>;
  where?: InputMaybe<AdminUserConnectionWhere>;
};

export type AdminUserConnectionOrderBy = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<AdminUserConnectionOrderFieldType>;
};

/** 유저 목록 정렬 필드 유형 */
export enum AdminUserConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Email = 'EMAIL',
  Id = 'ID',
  Name = 'NAME'
}

export type AdminUserConnectionWhere = {
  /** 유저 고유번호 */
  id?: InputMaybe<Scalars['ID']>;
  /** 키워드 (이름 또는 이메일) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 역할 */
  roleType?: InputMaybe<UserRoleType>;
  /** 가입 유형 */
  signUpType?: InputMaybe<SignUpType>;
  /** 유저 UUID */
  uuid?: InputMaybe<Scalars['ID']>;
};

export type AdminUserInput = {
  /** 유저 ID */
  userId: Scalars['ID'];
};

export type AdminUserNode = {
  __typename?: 'AdminUserNode';
  /** 생성일 */
  createdAt: Scalars['String'];
  /** 이메일 */
  email: Scalars['String'];
  /** 고유번호 */
  id: Scalars['ID'];
  /** 역할 */
  roleType: UserRoleType;
  /** 가입 유형 */
  signUpType: SignUpType;
  /** UUID */
  uuid: Scalars['String'];
};

/** 분석 기간 */
export enum AnalyticsPeriod {
  ThisMonth = 'THIS_MONTH',
  ThisWeek = 'THIS_WEEK',
  ThisYear = 'THIS_YEAR',
  Today = 'TODAY'
}

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

/** approveCoursePublish / rejectCoursePublish / cancelCoursePublishRequest 입력. */
export type ApprovalDecisionInput = {
  reason?: InputMaybe<Scalars['String']>;
  requestId: Scalars['Int'];
};

/** 승인 요청 (ADR-0003). */
export type ApprovalRequest = {
  __typename?: 'ApprovalRequest';
  approverId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  decidedAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
  requestType: ApprovalRequestType;
  requesterId: Scalars['Int'];
  scheduledAt?: Maybe<Scalars['String']>;
  status: ApprovalStatus;
  targetId: Scalars['Int'];
  targetType: ApprovalTargetType;
};

/** 승인 요청의 종류 (ADR-0003 §Target/Request 매트릭스). */
export enum ApprovalRequestType {
  Close = 'CLOSE',
  Delete = 'DELETE',
  Maintenance = 'MAINTENANCE',
  Publish = 'PUBLISH',
  ReleaseMaintenance = 'RELEASE_MAINTENANCE'
}

/** 승인 요청의 처리 상태. REQUESTED 만 open. 나머지는 terminal. */
export enum ApprovalStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

/** 승인 요청의 대상 종류 (ADR-0003 §Target/Request 매트릭스). */
export enum ApprovalTargetType {
  Course = 'COURSE',
  CourseRevision = 'COURSE_REVISION',
  Step = 'STEP'
}

export type AssignAdminRoleInput = {
  /** 계정 타입 (HUMAN / SERVICE). 미지정 시 HUMAN. */
  accountType?: InputMaybe<Scalars['String']>;
  /** 만료 시각 (RFC3339). null = 영구. */
  expiresAt?: InputMaybe<Scalars['String']>;
  /** 감사 로그용 사유. master_admin 부여 시 필수. */
  reason?: InputMaybe<Scalars['String']>;
  /** 부여할 역할 코드 (예: master_admin, general_admin) */
  roleCode: Scalars['String'];
  /** 부여 대상 유저 ID */
  userId: Scalars['ID'];
};

export type Attachment = {
  /** 첨부 파일 고유번호 */
  id: Scalars['ID'];
  /** 파일명 */
  name: Scalars['String'];
  /** 파일 URL */
  url: Scalars['String'];
};

export type AttachmentFile = {
  __typename?: 'AttachmentFile';
  /** 파일명 */
  name: Scalars['String'];
  /** 파일 URL */
  url: Scalars['String'];
};

export type AttachmentFileInput = {
  /** 파일명 */
  name: Scalars['String'];
  /** 파일 URL */
  url: Scalars['String'];
};

export type AttachmentInput = {
  /** 파일명 */
  name: Scalars['String'];
  /** 파일 URL */
  url: Scalars['String'];
};

export type Attendance = {
  __typename?: 'Attendance';
  /** 차시(레슨) ID */
  lessonId: Scalars['ID'];
  /** 누적 학습시간 (분 단위) */
  runningTime: Scalars['Int'];
  /** 출결 상태 */
  status: CourseAttendanceType;
};

/** 출결 정보 */
export type AttendanceResult = {
  __typename?: 'AttendanceResult';
  /** 출결 정보 */
  attendances: Array<Attendance>;
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 유저 정보 (이름, 썸네일) */
  user?: Maybe<CourseUser>;
  /** 유저 ID */
  userId: Scalars['ID'];
};

/** 인증 유형 */
export enum AuthType {
  /** 연락용 이메일 인증 */
  ContactEmail = 'CONTACT_EMAIL',
  /** 보호자 이메일 변경 */
  ProtectorEmailChange = 'PROTECTOR_EMAIL_CHANGE',
  /** 비밀번호 재설정 */
  ResetPassword = 'RESET_PASSWORD',
  /** 회원가입 */
  SignUp = 'SIGN_UP',
  /** 보호자 인증 */
  SignUpProtector = 'SIGN_UP_PROTECTOR'
}

export type ButtonInfo = {
  __typename?: 'ButtonInfo';
  idx: Scalars['Int'];
  image: ImageInfo;
  linkUrl: Scalars['String'];
  title: Scalars['String'];
};

export type ChangePassword = {
  __typename?: 'ChangePassword';
  success: Scalars['Boolean'];
};

export type ChangePasswordInput = {
  /** 현재 비밀번호 */
  currentPassword: Scalars['String'];
  /** 새 비밀번호 */
  newPassword: Scalars['String'];
};

export type CheckAiModelNameDuplicateInput = {
  /** 모델 이름 */
  name: Scalars['String'];
};

export type Classifier = {
  /** 클래스 아이디 */
  id: Scalars['ID'];
  /** 라벨명 */
  label: Scalars['String'];
};

export enum CodingType {
  AppInventor = 'APP_INVENTOR',
  Entry = 'ENTRY',
  Etc = 'ETC',
  None = 'NONE',
  Python = 'PYTHON',
  Scratch = 'SCRATCH'
}

/** Step 학습 완료 입력 */
export type CompleteStepInput = {
  /** 과정그룹 ID (그룹 미소속 시 생략) */
  courseGroupId?: InputMaybe<Scalars['ID']>;
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 차시 ID */
  lessonId: Scalars['ID'];
  /** 점수 (QUIZ용) */
  score?: InputMaybe<Scalars['Float']>;
  /** 단계 ID */
  stepId: Scalars['ID'];
};

/** 연락용 이메일 변경/등록 확인 입력 */
export type ConfirmContactEmailChangeInput = {
  /** 인증코드 */
  authCode: Scalars['String'];
  /** 새로운 연락용 이메일 */
  newEmail: Scalars['String'];
};

/** 학생 레슨 피드백 확인 (관리자용, 처리자는 요청한 관리자로 자동 기록) */
export type ConfirmCourseParticipantLessonFeedbackInput = {
  /** 관리자 메모 */
  adminMemo?: InputMaybe<Scalars['String']>;
  /** 피드백 ID */
  id: Scalars['ID'];
  /** 처리 일시 (ISO datetime) */
  processedAt?: InputMaybe<Scalars['String']>;
  /** 처리상태 */
  processingStatus?: InputMaybe<CourseParticipantLessonFeedbackProcessingStatus>;
};

export type ConfirmCourseStepVodItemInput = {
  stepId: Scalars['ID'];
  stepVodItemId: Scalars['ID'];
};

/** 보호자 이메일 변경/등록 확인 입력 */
export type ConfirmProtectorEmailChangeInput = {
  /** 인증코드 */
  authCode: Scalars['String'];
  /** 새로운 보호자 이메일 */
  newEmail: Scalars['String'];
};

export type Contact = {
  __typename?: 'Contact';
  /** 내용 */
  content: Scalars['String'];
  /** 생성일 */
  createdAt: Scalars['String'];
  /** 첨부 파일 목록 */
  fileList?: Maybe<Array<AttachmentFile>>;
  /** 문의 고유번호 */
  id: Scalars['ID'];
  /** 응답일 */
  respondedAt?: Maybe<Scalars['String']>;
  /** 응답 메시지 */
  responseMessage?: Maybe<Scalars['String']>;
  /** 문의 상태 */
  state: ContactStateType;
  /** 문의 유형 */
  subject: Scalars['String'];
  /** 제목 */
  title: Scalars['String'];
  /** 수정일 */
  updatedAt: Scalars['String'];
  /** 유저 고유번호 */
  userId: Scalars['String'];
  /** 유저 이름 (작성자명) */
  userName?: Maybe<Scalars['String']>;
};

export type ContactConnection = {
  __typename?: 'ContactConnection';
  /** 문의 목록 */
  nodes: Array<Contact>;
  /** 문의 총 개수 */
  totalCount: Scalars['Int'];
};

export type ContactConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ContactConnectionOrderBy>;
  where?: InputMaybe<ContactConnectionWhere>;
};

export type ContactConnectionOrderBy = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<ContactConnectionOrderFieldType>;
};

/** 문의 목록 정렬 필드 유형 */
export enum ContactConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type ContactConnectionWhere = {
  /** 키워드 (제목 또는 작성자) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 조회 기간 (ex. "YYYY-MM-DD") */
  period?: InputMaybe<DatePeriodInput>;
  /** 문의 상태 */
  state?: InputMaybe<ContactStateType>;
};

export type ContactInput = {
  /** 문의 고유번호 */
  id: Scalars['ID'];
};

/** 문의 상태 유형 */
export enum ContactStateType {
  /** 대기중 */
  Pending = 'PENDING',
  /** 완료 */
  Responded = 'RESPONDED'
}

/** 문의 상태별 통계 */
export type ContactStatusStatistics = {
  __typename?: 'ContactStatusStatistics';
  pendingCount: Scalars['Int'];
  respondedCount: Scalars['Int'];
};

/** 컨텐츠 분석 상태 */
export enum ContentAnalysisStatus {
  /** 분석 진행 중 */
  Analyzing = 'ANALYZING',
  /** 분석 완료 */
  Complete = 'COMPLETE',
  /** 분석 실패 */
  Failed = 'FAILED',
  /** 분석 불필요 (TEXT_BOOK, CODING, QUIZ) */
  None = 'NONE',
  /** 분석 대기 */
  Pending = 'PENDING'
}

export type ContentInput = {
  /** 첨부 파일 (Optional) */
  attachments?: InputMaybe<Array<AttachmentInput>>;
  /** 내용 */
  content: Scalars['String'];
  /** 언어 */
  language: LanguageType;
  /** 제목 */
  title: Scalars['String'];
};

/** 컨텐츠 제공 업체 유형 */
export enum ContentProviderType {
  Luxrobo = 'LUXROBO',
  Youtube = 'YOUTUBE'
}

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

/** 코스 정보 */
export type Course = {
  __typename?: 'Course';
  /** 유의사항 */
  caution?: Maybe<Scalars['String']>;
  /** 코드 에디터 타입 (BLOCK, AI_BLOCK, PYTHON) */
  codeEditorType?: Maybe<ActivityCodingType>;
  /** 소속 과정그룹 ID (미소속이면 null) */
  courseGroupId?: Maybe<Scalars['ID']>;
  /** 소속 과정그룹 이름 (미소속이면 null) */
  courseGroupName?: Maybe<Scalars['String']>;
  /** 레슨 목록 (차시, 과정 컨텍스트로 lessonFeedbackCount/lessonFeedbackStatus 포함. where.courseId 생략 시 본 과정 id 자동 적용) */
  courseLessonConnection: CourseLessonConnection;
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 난이도 (초급, 중급, 고급) */
  difficulty?: Maybe<CourseDifficulty>;
  /** 교육지도안 (URL, 용량, 확장자) */
  educationalPlan?: Maybe<FileMetadata>;
  /** 특징 */
  feature?: Maybe<Scalars['String']>;
  /**
   * 로그인·수강 신청자 기준 커리큘럼 첫 Step. 미로그인·미수강이면 null.
   * myProgress.firstLearning 과 동일 값.
   */
  firstLearning?: Maybe<FirstLearning>;
  /** 코스 ID */
  id: Scalars['ID'];
  /** 모집 마감 유무 */
  isEndRecruitment: Scalars['Boolean'];
  /** 새로운 상품 유무 (상품생성일 30일 이전 true, 이후 false */
  isNew: Scalars['Boolean'];
  /** 과정 내 레슨(차시) 개수 */
  lessonCount: Scalars['Int'];
  /** 레슨 목록 (과정 내 차시, CourseLesson으로 노출) */
  lessons: Array<CourseLesson>;
  /** 수강 최대연령 */
  maxAge: Scalars['Int'];
  /** 최대 참여자수 */
  maxParticipant: Scalars['Int'];
  /** 수강 최소연령 */
  minAge: Scalars['Int'];
  /** 최소 참여자수 */
  minParticipant: Scalars['Int'];
  /** 내 참여 정보 */
  myParticipation?: Maybe<MyParticipation>;
  /** 내 진도 요약 */
  myProgress?: Maybe<MyProgressSummary>;
  /** 이름 */
  name: Scalars['String'];
  /**
   * 로그인·수강 신청자 기준 이어하기 지점. 미로그인·미수강이면 null.
   * myProgress.nextLearning 과 동일 값.
   */
  nextLearning?: Maybe<NextLearning>;
  /** 모집 종료일 */
  recruitmentEndDateTime?: Maybe<Scalars['String']>;
  /** 모집 시작일 */
  recruitmentStartDateTime?: Maybe<Scalars['String']>;
  /** 모집 대상 */
  recruitmentTarget?: Maybe<Scalars['String']>;
  /** 필수 준비물 */
  requiredPreparation?: Maybe<Scalars['String']>;
  /** 상태 */
  state: CourseStateType;
  /** 태그 */
  tags: Array<CourseTag>;
  /** 타겟 유형 (일반, 튜터, 모디 교육자 등) */
  targetType: CourseProductTargetType;
  /** 수업자료 (URL, 용량, 확장자) */
  teachingMaterials?: Maybe<FileMetadata>;
  /** 썸네일 이미지 URL */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** 교육 유형 (교육자주도학습, 자기주도학습) */
  type: CourseType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};


/** 코스 정보 */
export type CourseCourseLessonConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseLessonConnectionOrder>;
  where?: InputMaybe<CourseLessonConnectionWhere>;
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
  /** 과정 ID */
  courseId: Scalars['ID'];
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
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 레슨 ID (차시) */
  lessonId: Scalars['ID'];
  /** 사용자 ID (관리자일 경우 userId 입력) */
  userId?: InputMaybe<Scalars['ID']>;
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

/** 코스 목록 */
export type CourseConnection = {
  __typename?: 'CourseConnection';
  /** 코스 리스트 */
  nodes: Array<Course>;
  /** 페이지네이션 정보 */
  pageInfo: PageInfo;
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
  Id = 'ID',
  /** 최근 학습순 (last_accessed_at) */
  LastAccessedAt = 'LAST_ACCESSED_AT',
  /** 이름순 (ㄱ-ㅎ, A-Z) */
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT'
}

export type CourseConnectionWhere = {
  /** 필터 */
  filter?: InputMaybe<CourseFilterType>;
  /** 키워드 (상품명, 상품코드) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 공개여부 */
  state?: InputMaybe<CourseStateType>;
  /** 타겟 유형 */
  target?: InputMaybe<CourseProductTargetType>;
};

/** 과정 난이도 */
export enum CourseDifficulty {
  /** 고급 */
  Advanced = 'ADVANCED',
  /** 초급 */
  Beginner = 'BEGINNER',
  /** 중급 */
  Intermediate = 'INTERMEDIATE'
}

/** 코스 필터 Facet 정보 */
export type CourseFilterFacet = {
  __typename?: 'CourseFilterFacet';
  /** 코딩타입별 코스 수 */
  codingTypes: Array<FilteredValue>;
  /** 난이도별 코스 수 */
  difficulties: Array<FilteredValue>;
};

export enum CourseFilterType {
  /** 모집마감 상품 */
  EndRecruitment = 'END_RECRUITMENT',
  /** 무료 상품 */
  Free = 'FREE',
  /** 새로운 상품 */
  New = 'NEW'
}

/** 과정 그룹 (과정을 그룹으로 관리) */
export type CourseGroup = {
  __typename?: 'CourseGroup';
  /** 소속 과정 목록 (순서 반영, 조인별 상태 포함) */
  courses: Array<CourseInCourseGroup>;
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 소개 */
  description?: Maybe<Scalars['String']>;
  /** 과정그룹 ID */
  id: Scalars['ID'];
  /** 표시 순서 */
  idx: Scalars['Int'];
  /** 내 그룹 참여 정보 */
  myParticipation?: Maybe<MyGroupParticipation>;
  /** 내 그룹 진도 요약 (nextLearning: 그룹 내 과정 순서상 첫 미완료 차시·Step) */
  myProgress?: Maybe<MyGroupProgressSummary>;
  /** 이름 */
  name: Scalars['String'];
  /** 상태 (공개/비공개) */
  state: CourseStateType;
  /** 소개용 썸네일 이미지 URL */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 과정 그룹 목록 */
export type CourseGroupConnection = {
  __typename?: 'CourseGroupConnection';
  /** 필터 Facet 정보 (검색 결과 내 코딩타입/난이도 분포) */
  filterCourse?: Maybe<CourseFilterFacet>;
  /** 과정 그룹 리스트 */
  nodes: Array<CourseGroup>;
  /** 페이지네이션 정보 */
  pageInfo: PageInfo;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 과정 그룹 정렬 */
export type CourseGroupConnectionOrderBy = {
  /** 정렬 방향 (기본: ASC) */
  direction?: InputMaybe<OrderDirectionType>;
  /** 정렬 필드 (기본: IDX) */
  field?: InputMaybe<CourseGroupOrderFieldType>;
};

/** 과정 그룹 목록 필터. 하위 코스 조건(keyword, type 등)은 그룹에 연결된 코스 중 하나라도 만족하면 해당 그룹 포함. */
export type CourseGroupConnectionWhere = {
  /** 코딩 타입(코스의 코드 에디터 타입) - deprecated: codeEditorTypes 사용 권장 */
  codeEditorType?: InputMaybe<ActivityCodingType>;
  /** 코딩 타입 배열 (OR 조건, 하나라도 일치하면 포함) */
  codeEditorTypes?: InputMaybe<Array<ActivityCodingType>>;
  /** 난이도 배열 (OR 조건, 하나라도 일치하면 포함) */
  difficulties?: InputMaybe<Array<CourseDifficulty>>;
  /** 난이도 - deprecated: difficulties 사용 권장 */
  difficulty?: InputMaybe<CourseDifficulty>;
  /** 목록 필터 (CourseConnection과 동일: 신규/무료/모집종료) */
  filter?: InputMaybe<CourseFilterType>;
  /** 키워드: 코스 ID(정확 일치) 또는 상품명·설명 부분 일치 (하위 코스 기준) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 상태 (공개/비공개) */
  state?: InputMaybe<CourseStateType>;
  /** 상품 타겟 유형 */
  target?: InputMaybe<CourseProductTargetType>;
  /** 배우는 과정 유형 (교육자 주도 / 자기 주도) */
  type?: InputMaybe<CourseType>;
};

/** 과정 그룹 정렬 기준 */
export enum CourseGroupOrderFieldType {
  /** 생성일순 */
  CreatedAt = 'CREATED_AT',
  /** 표시 순서 */
  Idx = 'IDX',
  /** 이름순 */
  Name = 'NAME',
  /** 수정일순 */
  UpdatedAt = 'UPDATED_AT'
}

/** 과정 그룹 참여자 (그룹 단위 참여) */
export type CourseGroupParticipant = {
  __typename?: 'CourseGroupParticipant';
  /** 과정 그룹 ID */
  courseGroupId: Scalars['ID'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 참여자 ID */
  id: Scalars['ID'];
  /** 상태 */
  status: CourseGroupParticipantStatusType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** 유저 정보 (이름, 썸네일) */
  user?: Maybe<CourseUser>;
  /** 유저 ID */
  userId: Scalars['ID'];
};

/** 과정 그룹 참여자 목록 */
export type CourseGroupParticipantConnection = {
  __typename?: 'CourseGroupParticipantConnection';
  /** 참여자 리스트 */
  nodes: Array<CourseGroupParticipant>;
  /** 페이지네이션 정보 */
  pageInfo: PageInfo;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 과정 그룹 참여자 목록 조회 조건 */
export type CourseGroupParticipantConnectionWhere = {
  /** 과정 그룹 ID */
  courseGroupId: Scalars['ID'];
};

/** 과정 그룹 참여 상태 */
export enum CourseGroupParticipantStatusType {
  /** 참여 중 */
  Active = 'ACTIVE',
  /** 참여 해제 */
  Left = 'LEFT'
}

export enum CourseGroupRecommendKind {
  New = 'NEW',
  Trending = 'TRENDING'
}

/** 추천 과정 그룹 (kind별) */
export type CourseGroupRecommendation = {
  __typename?: 'CourseGroupRecommendation';
  courseGroups: Array<CourseGroup>;
  kind: CourseGroupRecommendKind;
};

export type CourseGroupWhere = {
  /** 과정그룹 ID */
  id: Scalars['ID'];
};

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

/** 그룹 내 과정 (조인 정보 + 유효 상태) */
export type CourseInCourseGroup = {
  __typename?: 'CourseInCourseGroup';
  /** 과정 */
  course: Course;
  /** 과정그룹 ID (tracking API 호출 시 전달용) */
  courseGroupId: Scalars['ID'];
  /** 유효 상태 (원본+조인 기반 계산) */
  effectiveStatus: CourseVisibilityStatus;
  /** 표시 순서 */
  idx: Scalars['Int'];
  /** 조인별 상태 (공개/비공개) */
  state: CourseStateType;
};

/** 레슨 (과정-레슨 조인 기준, M:N) */
export type CourseLesson = {
  __typename?: 'CourseLesson';
  /** 과정 ID (과정 레슨 목록 조회 시에만 설정, 피드백 집계용) */
  courseId?: Maybe<Scalars['ID']>;
  /** 과정-레슨 조인 행 ID (과정 레슨 목록 조회 시 내려줌, deleteCourseLesson 입력으로 사용) */
  courseLessonId?: Maybe<Scalars['ID']>;
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 소요시간 (분 단위) */
  durationTime: Scalars['Int'];
  /** 유효 상태 (원본+조인 기반 계산) */
  effectiveStatus: CourseVisibilityStatus;
  /** 레슨 ID */
  id: Scalars['ID'];
  /** 차시 */
  idx: Scalars['Int'];
  /** 해당 차시 피드백 개수 (관리자용, courseId 있을 때만) */
  lessonFeedbackCount: Scalars['Int'];
  /** 해당 차시 피드백 상태 (NONE=표시 생략, NEEDS_ATTENTION=빨간색, COMPLETE=초록색) */
  lessonFeedbackStatus: LessonFeedbackStatus;
  /** 수업자료 */
  materials: Array<CourseLessonMaterial>;
  /** 이름 */
  name: Scalars['String'];
  /** 조인별 상태 (과정 내 해당 차시 공개/비공개) */
  state: CourseStateType;
  /** 레슨 내 단계(Step) 개수 */
  stepCount: Scalars['Int'];
  /** 단계(Step) 목록 (레슨–단계 조인, 순서 보장) */
  steps: Array<StepInLesson>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

/** 레슨 목록 (과정 내 차시) */
export type CourseLessonConnection = {
  __typename?: 'CourseLessonConnection';
  /** 레슨 리스트 */
  nodes: Array<CourseLesson>;
  /** 페이지네이션 정보 */
  pageInfo: PageInfo;
  /** 총 레슨 수 */
  totalCount: Scalars['Int'];
};

export type CourseLessonConnectionOrder = {
  /** 차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<CourseLessonConnectionOrderFieldType>;
};

export enum CourseLessonConnectionOrderFieldType {
  /** 레슨 생성일 */
  CreatedAt = 'CREATED_AT',
  /** 조인 행 ID */
  Id = 'ID',
  /** 차시 순서 */
  Idx = 'IDX',
  /** 레슨 수정일 */
  UpdatedAt = 'UPDATED_AT'
}

export type CourseLessonConnectionWhere = {
  /** 과정 ID (선택, 없으면 전체 레슨. 있으면 해당 과정 차시만) */
  courseId?: InputMaybe<Scalars['ID']>;
  /** 키워드 (레슨 이름, 설명 검색) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 조인별 상태 (과정 내 차시 공개/비공개, courseId 있을 때만 적용) */
  state?: InputMaybe<CourseStateType>;
};

export type CourseLessonListWhere = {
  /** 코스 ID */
  courseId: Scalars['ID'];
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
  lessonId: Scalars['ID'];
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
  /** 과정 ID (선택, 있으면 lessonFeedbackCount/lessonFeedbackStatus 집계에 사용) */
  courseId?: InputMaybe<Scalars['ID']>;
  /** 레슨 ID */
  lessonId: Scalars['ID'];
};

/**
 * 과정 라이프사이클 상태 (ADR-0001 §라이프사이클 상태 머신).
 * 직접 변경 불가 — Mutation 으로만 전이.
 */
export enum CourseLifecycleState {
  Archived = 'ARCHIVED',
  Closed = 'CLOSED',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  PendingApproval = 'PENDING_APPROVAL',
  Published = 'PUBLISHED',
  ReadyToPublish = 'READY_TO_PUBLISH'
}

/** 클래스 참여자 */
export type CourseParticipant = {
  __typename?: 'CourseParticipant';
  /** 출생년도 */
  birthYear: Scalars['Int'];
  /** 코딩 경험 */
  codingExperiences: Array<CodingType>;
  /** 과정 ID */
  courseId: Scalars['ID'];
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
  /** 상태 */
  status: CourseParticipantStatusType;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** 유저 정보 (이름, 썸네일) */
  user?: Maybe<CourseUser>;
  /** 유저 ID */
  userId: Scalars['ID'];
};

/** 학생 레슨 피드백 */
export type CourseParticipantLessonFeedback = {
  __typename?: 'CourseParticipantLessonFeedback';
  /** 관리자 메모 */
  adminMemo?: Maybe<Scalars['String']>;
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 등록일 */
  createdAt: Scalars['String'];
  difficultyLevel: Scalars['Int'];
  feedback: Scalars['String'];
  /** 피드백 유형 */
  feedbackType?: Maybe<CourseParticipantLessonFeedbackType>;
  id: Scalars['ID'];
  interestLevel: Scalars['Int'];
  /** 레슨 ID (차시) */
  lessonId: Scalars['ID'];
  /** 처리 일시 (ISO datetime) */
  processedAt?: Maybe<Scalars['String']>;
  /** 처리한 관리자 userId (업데이트를 수행한 인증된 관리자로 자동 기록) */
  processedBy?: Maybe<Scalars['String']>;
  /** 처리한 관리자 프로필 (이름·썸네일·이메일 등, processedBy 없으면 null) */
  processedByUser?: Maybe<CourseUser>;
  /** 처리상태 (미확인/처리중/완료) */
  processingStatus: CourseParticipantLessonFeedbackProcessingStatus;
  /** 피드백한 사용자 정보 (이름, 썸네일, 이메일) */
  user?: Maybe<CourseUser>;
  /** 피드백한 사용자 userId */
  userId: Scalars['ID'];
};

/** 학생 레슨 피드백 목록 (관리자용) */
export type CourseParticipantLessonFeedbackConnection = {
  __typename?: 'CourseParticipantLessonFeedbackConnection';
  /** 피드백 리스트 */
  nodes: Array<CourseParticipantLessonFeedback>;
  /** 페이지네이션 정보 */
  pageInfo: PageInfo;
  /** 총 개수 */
  totalCount: Scalars['Int'];
};

/** 레슨별 피드백 목록 조회 조건 (관리자용) */
export type CourseParticipantLessonFeedbackConnectionWhere = {
  /** 과정 ID (선택) */
  courseId?: InputMaybe<Scalars['ID']>;
  /** 피드백 유형 (선택, 전체/콘텐츠 오류/서비스오류/기타의견) */
  feedbackType?: InputMaybe<CourseParticipantLessonFeedbackType>;
  /** 레슨 ID (차시, 필수) */
  lessonId: Scalars['ID'];
};

/** 학생 레슨 피드백 처리상태 (관리자 확인용) */
export enum CourseParticipantLessonFeedbackProcessingStatus {
  /** 완료 */
  Complete = 'COMPLETE',
  /** 처리중 */
  InProgress = 'IN_PROGRESS',
  /** 미확인 */
  Unconfirmed = 'UNCONFIRMED'
}

/** 학생 레슨 피드백 유형 */
export enum CourseParticipantLessonFeedbackType {
  /** 콘텐츠 오류 */
  ContentError = 'CONTENT_ERROR',
  /** 기타 의견 */
  OtherOpinion = 'OTHER_OPINION',
  /** 서비스오류(디폴트) */
  ServiceError = 'SERVICE_ERROR'
}

export type CourseParticipantLessonFeedbackWhere = {
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 레슨 ID (차시) */
  lessonId: Scalars['ID'];
  /** 사용자 ID */
  userId: Scalars['ID'];
};

export enum CourseParticipantStatusType {
  Canceled = 'CANCELED',
  Complete = 'COMPLETE',
  Create = 'CREATE',
  Pending = 'PENDING',
  Progress = 'PROGRESS',
  RequestCancel = 'REQUEST_CANCEL'
}

/**
 * 과정의 활성 revision 매핑 (ADR-0001).
 * 하나의 logical course 당 1 row.
 */
export type CoursePointer = {
  __typename?: 'CoursePointer';
  courseId: Scalars['Int'];
  draftRevisionId?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  publishedRevisionId?: Maybe<Scalars['Int']>;
  scheduledRevisionId?: Maybe<Scalars['Int']>;
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

export enum CourseProductTargetType {
  /** 일반 */
  General = 'GENERAL',
  /** 모디 교육자 */
  ModiTrainee = 'MODI_TRAINEE',
  /** 튜터 */
  Tutor = 'TUTOR'
}

/** 관리자용 과정 진도 목록 */
export type CourseProgressConnection = {
  __typename?: 'CourseProgressConnection';
  /** 진도 목록 */
  edges: Array<CourseProgressEntry>;
  /** 페이지네이션 정보 */
  pageInfo: PageInfo;
  /** 총 수 */
  totalCount: Scalars['Int'];
};

/** 관리자용 과정 진도 항목 */
export type CourseProgressEntry = {
  __typename?: 'CourseProgressEntry';
  /** 완료 일시 */
  completedAt?: Maybe<Scalars['String']>;
  /** 완료 차시 수 */
  completedLessons: Scalars['Int'];
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 진도율 */
  progressRate: Scalars['Float'];
  /** 학습 시작 일시 */
  startedAt?: Maybe<Scalars['String']>;
  /** 학습 상태 */
  status: ProgressStatus;
  /** 총 차시 수 */
  totalLessons: Scalars['Int'];
  /** 총 학습 시간 (초) */
  totalTime: Scalars['Int'];
  /** 유저 정보 (이름, 썸네일 등) */
  user?: Maybe<CourseUser>;
  /** 유저 ID */
  userId: Scalars['ID'];
};

/** 과정 진행률 정보 (display/actual 공통 구조체) */
export type CourseProgressInfo = {
  __typename?: 'CourseProgressInfo';
  /** 완료 차시 수 */
  completedLessons: Scalars['Int'];
  /** 진도율 (0.0 ~ 1.0). 분모 0이면 null */
  progressRate?: Maybe<Scalars['Float']>;
  /** 총 차시 수 */
  totalLessons: Scalars['Int'];
};

/** 과정 진도 목록 조회 조건 (관리자) */
export type CourseProgressListWhere = {
  /** 과정그룹 ID (그룹 미소속 시 생략) */
  courseGroupId?: InputMaybe<Scalars['ID']>;
  /** 과정 ID */
  courseId: Scalars['ID'];
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
  /** 페이지네이션 정보 */
  pageInfo: PageInfo;
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

export enum CourseRecommendKind {
  /** 새로 나온 과정 */
  New = 'NEW',
  /** 요즘 뜨는 과정 */
  Trending = 'TRENDING'
}

/** 추천 과정 (kind별) */
export type CourseRecommendation = {
  __typename?: 'CourseRecommendation';
  courses: Array<Course>;
  kind: CourseRecommendKind;
};

/**
 * 과정 콘텐츠의 시점별 스냅샷. (ADR-0001)
 * 학습자는 CoursePointer.publishedRevision 을 통해 본다.
 */
export type CourseRevision = {
  __typename?: 'CourseRevision';
  courseId: Scalars['Int'];
  createdAt: Scalars['String'];
  createdBy: Scalars['Int'];
  decidedAt?: Maybe<Scalars['String']>;
  decidedBy?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  lifecycleState: CourseLifecycleState;
  revisionNo: Scalars['Int'];
  scheduledPublishAt?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

/** 과정/그룹 공개 상태 (여러 타입에서 공통 사용) */
export enum CourseStateType {
  Off = 'OFF',
  On = 'ON'
}

/** 단계 (과정-차시 하위 학습 단위) */
export type CourseStep = {
  /** 분석 실패 사유 (FAILED일 때만 값 존재) */
  analysisFailureReason?: Maybe<Scalars['String']>;
  /** 분석 재시도 횟수 */
  analysisRetryCount: Scalars['Int'];
  /** 컨텐츠 분석 상태 */
  analysisStatus: ContentAnalysisStatus;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseStepDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 단계 고유 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 단계 학습 내역 */
  stepHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseStepCoding = CourseStep & {
  __typename?: 'CourseStepCoding';
  /** 분석 실패 사유 (FAILED일 때만 값 존재) */
  analysisFailureReason?: Maybe<Scalars['String']>;
  /** 분석 재시도 횟수 */
  analysisRetryCount: Scalars['Int'];
  /** 컨텐츠 분석 상태 */
  analysisStatus: ContentAnalysisStatus;
  /** 저자 */
  author: Scalars['String'];
  /** coding 상세정보 */
  coding?: Maybe<CourseStepCodingDetail>;
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseStepDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 단계 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 단계 학습 내역 */
  stepHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseStepCodingDetail = {
  __typename?: 'CourseStepCodingDetail';
  /** 활동 (텍스트 정보) */
  activity?: Maybe<Scalars['String']>;
  /** 정답 코드 */
  answerCode?: Maybe<Scalars['String']>;
  /** 유형 (BLOCK, AI_BLOCK, PYTHON) */
  codingType?: Maybe<ActivityCodingType>;
  /** 단계 Coding ID */
  id: Scalars['ID'];
  /** 초기 코드 */
  initCode?: Maybe<Scalars['String']>;
  /** 학습목표 (텍스트 에디터) */
  learningObjective?: Maybe<Scalars['String']>;
};

/** 액티비티 목록 */
export type CourseStepConnection = {
  __typename?: 'CourseStepConnection';
  /** 단계 리스트 (교육자료) */
  nodes: Array<CourseStep>;
  /** 페이지네이션 정보 */
  pageInfo: PageInfo;
  /** 총 단계 수 */
  totalCount: Scalars['Int'];
};

export type CourseStepConnectionOrder = {
  /** 차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<CourseStepConnectionOrderFieldType>;
};

export enum CourseStepConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  UpdatedAt = 'UPDATED_AT'
}

export type CourseStepConnectionWhere = {
  /** 분석 상태 필터 (COMPLETE, FAILED 등) */
  analysisStatus?: InputMaybe<ContentAnalysisStatus>;
  /** 키워드 (이름, 설명, 저자) */
  keyword?: InputMaybe<Scalars['String']>;
};

/** 단계(Step) 유형 */
export enum CourseStepDType {
  Coding = 'CODING',
  Pdf = 'PDF',
  /** 프레젠테이션 (추후 분석으로 슬라이드 수 반영) */
  Ppt = 'PPT',
  Quiz = 'QUIZ',
  TextBook = 'TEXT_BOOK',
  /** 직접 업로드 영상 (S3/컨버전) */
  Vod = 'VOD',
  /** 유튜브 링크 */
  Youtube = 'YOUTUBE'
}

export type CourseStepPdf = CourseStep & {
  __typename?: 'CourseStepPdf';
  /** 분석 실패 사유 (FAILED일 때만 값 존재) */
  analysisFailureReason?: Maybe<Scalars['String']>;
  /** 분석 재시도 횟수 */
  analysisRetryCount: Scalars['Int'];
  /** 컨텐츠 분석 상태 */
  analysisStatus: ContentAnalysisStatus;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseStepDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 단계 고유 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** pdf 상세정보 */
  pdf?: Maybe<CourseStepPdfDetail>;
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 단계 학습 내역 */
  stepHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseStepPdfDetail = {
  __typename?: 'CourseStepPdfDetail';
  /** 분석 상태 */
  analysisStatus: ContentAnalysisStatus;
  /** 파일 정보 (url, 용량, 확장자 - Course와 동일 FileMetadata) */
  file: FileMetadata;
  /** 단계 PDF 고유 ID */
  id: Scalars['ID'];
  /** pdf 페이지 총 수 (추후 분석 반영) */
  totalCount?: Maybe<Scalars['Int']>;
  /** PPT에서 추출한 영상 오버레이 정보 (위치 + URL) */
  videoOverlays?: Maybe<Array<CourseStepVideoOverlay>>;
};

export type CourseStepPpt = CourseStep & {
  __typename?: 'CourseStepPpt';
  /** 분석 실패 사유 (FAILED일 때만 값 존재) */
  analysisFailureReason?: Maybe<Scalars['String']>;
  /** 분석 재시도 횟수 */
  analysisRetryCount: Scalars['Int'];
  /** 컨텐츠 분석 상태 */
  analysisStatus: ContentAnalysisStatus;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 */
  dType: CourseStepDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 단계 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** ppt 상세정보 */
  ppt?: Maybe<CourseStepPptDetail>;
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 단계 학습 내역 */
  stepHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseStepPptDetail = {
  __typename?: 'CourseStepPptDetail';
  /** 분석 상태 (슬라이드 수 추출·PDF 변환에 따른 상태) */
  analysisStatus: ContentAnalysisStatus;
  /** PPT→PDF 변환 URL (변환 시에만 설정, 없으면 null) */
  convertedPdfUrl?: Maybe<Scalars['String']>;
  /** 파일 정보 (url, 용량, 확장자 - Course와 동일 FileMetadata) */
  file: FileMetadata;
  /** 단계 PPT 고유 ID */
  id: Scalars['ID'];
  /** 슬라이드 수 (추후 분석 반영) */
  slideCount?: Maybe<Scalars['Int']>;
  /** PPT 내장 영상 오버레이 정보 (위치 + URL) */
  videoOverlays?: Maybe<Array<CourseStepVideoOverlay>>;
};

export type CourseStepQuiz = CourseStep & {
  __typename?: 'CourseStepQuiz';
  /** 분석 실패 사유 (FAILED일 때만 값 존재) */
  analysisFailureReason?: Maybe<Scalars['String']>;
  /** 분석 재시도 횟수 */
  analysisRetryCount: Scalars['Int'];
  /** 컨텐츠 분석 상태 */
  analysisStatus: ContentAnalysisStatus;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseStepDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 단계 고유 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** 퀴즈 */
  quiz?: Maybe<CourseQuiz>;
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 단계 학습 내역 */
  stepHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseStepSupplementaryDataWhere = {
  /** 단계 보조자료 ID */
  id: Scalars['ID'];
};

export type CourseStepTextBook = CourseStep & {
  __typename?: 'CourseStepTextBook';
  /** 분석 실패 사유 (FAILED일 때만 값 존재) */
  analysisFailureReason?: Maybe<Scalars['String']>;
  /** 분석 재시도 횟수 */
  analysisRetryCount: Scalars['Int'];
  /** 컨텐츠 분석 상태 */
  analysisStatus: ContentAnalysisStatus;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseStepDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 단계 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 이름 */
  name: Scalars['String'];
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 단계 학습 내역 */
  stepHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** TextBook 상세정보 */
  textBook?: Maybe<CourseStepTextBookDetail>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
};

export type CourseStepTextBookDetail = {
  __typename?: 'CourseStepTextBookDetail';
  /** 내용 */
  content: Scalars['String'];
  /** 단계 TextBook ID */
  id: Scalars['ID'];
};

/** PPT 내부 영상의 슬라이드 위치 정보 */
export type CourseStepVideoOverlay = {
  __typename?: 'CourseStepVideoOverlay';
  /** 높이 비율 (0.0~1.0) */
  height: Scalars['Float'];
  /** 원본 미디어 파일명 */
  mediaFile: Scalars['String'];
  /** 영상이 위치한 페이지 번호 */
  page: Scalars['Int'];
  /** 영상 URL (S3/CDN) */
  videoUrl: Scalars['String'];
  /** 너비 비율 (0.0~1.0) */
  width: Scalars['Float'];
  /** X 좌표 비율 (0.0~1.0, 슬라이드 너비 대비) */
  x: Scalars['Float'];
  /** Y 좌표 비율 (0.0~1.0, 슬라이드 높이 대비) */
  y: Scalars['Float'];
};

export type CourseStepVod = CourseStep & {
  __typename?: 'CourseStepVod';
  /** 분석 실패 사유 (FAILED일 때만 값 존재) */
  analysisFailureReason?: Maybe<Scalars['String']>;
  /** 분석 재시도 횟수 */
  analysisRetryCount: Scalars['Int'];
  /** 컨텐츠 분석 상태 */
  analysisStatus: ContentAnalysisStatus;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseStepDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 단계 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 아이템 목록 */
  items: Array<CourseVodItem>;
  /** 이름 */
  name: Scalars['String'];
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 단계 학습 내역 */
  stepHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** vod 상세정보 */
  vod?: Maybe<CourseStepVodDetail>;
};

export type CourseStepVodDetail = {
  __typename?: 'CourseStepVodDetail';
  /** 분석 상태 */
  analysisStatus: ContentAnalysisStatus;
  /** 전체 시간 (초 단위) */
  durationInSec: Scalars['Int'];
  /** 파일명 (HEAD 메타 조회) */
  fileName?: Maybe<Scalars['String']>;
  /** 파일 크기 (bytes) */
  fileSizeInBytes?: Maybe<Scalars['Int']>;
  /** 단계 VOD ID */
  id: Scalars['ID'];
  /** 제공업체 유형 */
  providerType: ContentProviderType;
  /** 경로 */
  url: Scalars['String'];
};

export type CourseStepWhere = {
  /** 단계 ID */
  id: Scalars['ID'];
};

export type CourseStepYoutube = CourseStep & {
  __typename?: 'CourseStepYoutube';
  /** 분석 실패 사유 (FAILED일 때만 값 존재) */
  analysisFailureReason?: Maybe<Scalars['String']>;
  /** 분석 재시도 횟수 */
  analysisRetryCount: Scalars['Int'];
  /** 컨텐츠 분석 상태 */
  analysisStatus: ContentAnalysisStatus;
  /** 저자 */
  author: Scalars['String'];
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 유형 (VOD, PDF, CODING, TEXT_BOOK) */
  dType: CourseStepDType;
  /** 삭제 날짜 */
  deletedAt?: Maybe<Scalars['String']>;
  /** 설명 */
  description?: Maybe<Scalars['String']>;
  /** 단계 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx: Scalars['Int'];
  /** 아이템 목록 */
  items: Array<CourseVodItem>;
  /** 이름 */
  name: Scalars['String'];
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 단계 학습 내역 */
  stepHistoryItem?: Maybe<ActivityHistoryItem>;
  /** 보조 자료 */
  supplementaryData?: Maybe<CourseSupplementaryData>;
  /** 수정 날짜 */
  updatedAt: Scalars['String'];
  /** youtube 상세정보 */
  youtube?: Maybe<CourseStepYoutubeDetail>;
};

/** 유튜브 링크 단계 상세 */
export type CourseStepYoutubeDetail = {
  __typename?: 'CourseStepYoutubeDetail';
  /** 분석 상태 */
  analysisStatus: ContentAnalysisStatus;
  /** 전체 시간 (초 단위) */
  durationInSec: Scalars['Int'];
  /** 단계 Youtube ID */
  id: Scalars['ID'];
  /** 유튜브 영상 제목 */
  title?: Maybe<Scalars['String']>;
  /** 경로 (유튜브 URL) */
  url: Scalars['String'];
};

/** 단계 보조 자료 */
export type CourseSupplementaryData = {
  __typename?: 'CourseSupplementaryData';
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
  /** 단계 보조 자료 고유 ID */
  id: Scalars['ID'];
  /** 컨텐츠 제공업체 */
  providerType?: Maybe<ContentProviderType>;
  /** 단계 ID */
  stepId: Scalars['ID'];
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

export type CourseTagsWhere = {
  /** 태그 카테고리 ID */
  tagCategoryId: Scalars['ID'];
};

/** 교육 유형 */
export enum CourseType {
  /** 교육자주도학습 */
  Educator = 'EDUCATOR',
  /** 자기주도학습 */
  Self = 'SELF'
}

/** 과정 서비스에서 사용하는 간단한 유저 정보 */
export type CourseUser = {
  __typename?: 'CourseUser';
  /** 가입 이메일 (account User.email, 내부 API) */
  email?: Maybe<Scalars['String']>;
  /** 이름 */
  name?: Maybe<Scalars['String']>;
  /** 썸네일 URL */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** 유저 ID */
  userId: Scalars['ID'];
};

export type CourseVideo = {
  __typename?: 'CourseVideo';
  /** 비디오 ID */
  id: Scalars['ID'];
  /** 언어 */
  languageType: LanguageType;
  /** 이름 */
  name: Scalars['String'];
  /** 컨텐츠 제공업체 */
  providerType: ContentProviderType;
  /** 주소 */
  url: Scalars['String'];
  /** 비디오 재생위치 (초 단위) */
  videoPlaybackPosition: Scalars['Int'];
};

/** 조인 항목 유효 상태 (원본+조인 기반 계산) */
export enum CourseVisibilityStatus {
  /** 비활성 (원본 비공개) */
  Inactive = 'INACTIVE',
  /** 비공개 */
  Private = 'PRIVATE',
  /** 공개 */
  Public = 'PUBLIC'
}

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
  /** 과정그룹 ID (있으면 courseGroupId/courseGroupName 응답에 포함) */
  courseGroupId?: InputMaybe<Scalars['ID']>;
  /** 코스 ID */
  id: Scalars['ID'];
};

export type CreateAddressInput = {
  /** 주소 */
  address: Scalars['String'];
  /** 도시 */
  city: Scalars['String'];
  /** 국제전화번호 */
  countryCallingCode: Scalars['String'];
  /** 국가코드 */
  countryCode: Scalars['String'];
  /** 상세 주소 */
  detailAddress: Scalars['String'];
  /** 기본배송지 여부 */
  isDefault: Scalars['Boolean'];
  /** 배송지명 */
  name: Scalars['String'];
  /** 핸드폰 번호 (ex. 01012341234) */
  phoneNumber: Scalars['String'];
  /** 우편번호 */
  postalCode: Scalars['String'];
  /** 수령인 */
  receiver: Scalars['String'];
};

export type CreateAppBannerInput = {
  idx: Scalars['Int'];
  image?: InputMaybe<ImageInfoInput>;
  openType: OpenType;
  subTitle?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  type: AppBannerType;
};

export type CreateContactInput = {
  /** 내용 */
  content: Scalars['String'];
  /** 첨부파일 */
  fileList?: InputMaybe<Array<AttachmentFileInput>>;
  /** 문의 유형 */
  subject: Scalars['String'];
  /** 제목 */
  title: Scalars['String'];
};

export type CreateCourseAttendanceResultInput = {
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 첫번째 입장한 시간 */
  firstEnteredTimestamp: Scalars['Int'];
  /** 총 참여한 시간 (분 단위) */
  joinedTime: Scalars['Int'];
  /** 레슨 ID (차시) */
  lessonId: Scalars['ID'];
  /** 총 수업시간 (분 단위) */
  lessonTime: Scalars['Int'];
  /** 사용자 ID */
  userId: Scalars['ID'];
};

export type CreateCourseChoiceInput = {
  /** 정답 여부 */
  isCorrect: Scalars['Boolean'];
  /** 보기 내용 */
  text: Scalars['String'];
};

export type CreateCourseGroupInput = {
  /** 하위 과정 ID 목록 (순서대로) */
  courseIds?: InputMaybe<Array<Scalars['ID']>>;
  /** 소개 */
  description?: InputMaybe<Scalars['String']>;
  /** 이름 */
  name: Scalars['String'];
  /** 상태 (공개/비공개) */
  state: CourseStateType;
  /** 소개용 썸네일 이미지 URL */
  thumbnailUrl?: InputMaybe<Scalars['String']>;
};

export type CreateCourseInput = {
  /** 유의사항 */
  caution?: InputMaybe<Scalars['String']>;
  /** 코드 에디터 타입 (BLOCK, AI_BLOCK, PYTHON) */
  codeEditorType?: InputMaybe<ActivityCodingType>;
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 난이도 (초급, 중급, 고급) */
  difficulty?: InputMaybe<CourseDifficulty>;
  /** 교육지도안 파일명 */
  educationalPlanFileName?: InputMaybe<Scalars['String']>;
  /** 교육지도안 S3 URL (내부에서 용량·확장자 조회) */
  educationalPlanUrl?: InputMaybe<Scalars['String']>;
  /** 특징 */
  feature?: InputMaybe<Scalars['String']>;
  /** 하위 레슨 ID 목록 (순서대로) */
  lessonIds?: InputMaybe<Array<Scalars['ID']>>;
  /** 수강 최대연령 */
  maxAge?: InputMaybe<Scalars['Int']>;
  /** 최대 참여자수 */
  maxParticipant?: InputMaybe<Scalars['Int']>;
  /** 수강 최소연령 */
  minAge?: InputMaybe<Scalars['Int']>;
  /** 최소 참여자수 */
  minParticipant?: InputMaybe<Scalars['Int']>;
  /** 이름 */
  name: Scalars['String'];
  /** 모집 종료일 */
  recruitmentEndDateTime?: InputMaybe<Scalars['String']>;
  /** 모집 시작일 */
  recruitmentStartDateTime?: InputMaybe<Scalars['String']>;
  /** 모집 대상 */
  recruitmentTarget?: InputMaybe<Scalars['String']>;
  /** 필수 준비물 */
  requiredPreparation?: InputMaybe<Scalars['String']>;
  /** 상태 (미입력 시 비공개) */
  state?: InputMaybe<CourseStateType>;
  /** 태그 아이디 목록 */
  tags?: InputMaybe<Array<CourseTagInput>>;
  /** 수업자료 파일명 */
  teachingMaterialsFileName?: InputMaybe<Scalars['String']>;
  /** 수업자료 S3 URL (내부에서 용량·확장자 조회) */
  teachingMaterialsUrl?: InputMaybe<Scalars['String']>;
  /** 썸네일 이미지 URL */
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  /** 교육 유형 (미입력 시 자기주도학습) */
  type?: InputMaybe<CourseType>;
};

export type CreateCourseLessonInput = {
  /** 코스 ID (선택, 없으면 레슨만 생성 후 addLessonsToCourse로 연결) */
  courseId?: InputMaybe<Scalars['ID']>;
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 소요시간 (분 단위) */
  durationTime?: InputMaybe<Scalars['Int']>;
  /** 이름 */
  name: Scalars['String'];
  /** 하위 단계 ID 목록 (선택, Lesson 생성과 동시에 Step 연결) */
  stepIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type CreateCourseMaterialInput = {
  materials: Array<MaterialInput>;
};

export type CreateCourseParticipantInput = {
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 사용자 ID (프로필 ID) */
  userId: Scalars['ID'];
};

export type CreateCourseParticipantLessonFeedbackInput = {
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 피드백 */
  feedback: Scalars['String'];
  feedbackType: CourseParticipantLessonFeedbackType;
  /** 레슨 ID (차시) */
  lessonId: Scalars['ID'];
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
  /** 질문 목록 */
  questions: Array<CreateCourseQuestionInput>;
  /** 단계용 퀴즈 생성 */
  stepID?: InputMaybe<Scalars['ID']>;
  /** VOD 단계 아이템용 퀴즈 생성 */
  stepVodItemID?: InputMaybe<Scalars['ID']>;
  /** 제한 시간 */
  time: Scalars['Int'];
  /** 제목 */
  title: Scalars['String'];
};

export type CreateCourseStepCodingInput = {
  /** 활동 (텍스트 정보) */
  activity?: InputMaybe<Scalars['String']>;
  /** 정답 코드 */
  answerCode?: InputMaybe<Scalars['String']>;
  /** 유형 (BLOCK, AI_BLOCK, PYTHON) */
  codingType: ActivityCodingType;
  /** 초기 코드 */
  initCode?: InputMaybe<Scalars['String']>;
  /** 학습목표 (텍스트 에디터) */
  learningObjective?: InputMaybe<Scalars['String']>;
};

export type CreateCourseStepInput = {
  /** coding 정보 */
  coding?: InputMaybe<CreateCourseStepCodingInput>;
  /** 유형 (YOUTUBE, VOD, PDF, PPT, CODING, TEXT_BOOK) */
  dType: CourseStepDType;
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 레슨 ID */
  lessonId?: InputMaybe<Scalars['ID']>;
  /** 이름 */
  name: Scalars['String'];
  /** pdf 정보 */
  pdf?: InputMaybe<CreateCourseStepPdfInput>;
  /** ppt 정보 */
  ppt?: InputMaybe<CreateCourseStepPptInput>;
  /** quiz 정보 */
  quiz?: InputMaybe<CreateCourseQuizInput>;
  /** 공개유무 */
  state: Scalars['Boolean'];
  /** 보조 자료 */
  supplementaryData?: InputMaybe<CreateCourseSupplementaryDataInput>;
  /** true면 콘텐츠 분석(PPT/PDF 등)을 동일 GraphQL 요청 안에서 동기 실행(Redis 큐 없이). false/미지정이면 기존처럼 비동기 큐 */
  syncContentAnalysis?: InputMaybe<Scalars['Boolean']>;
  /** textBook 정보 */
  textBook?: InputMaybe<CreateCourseStepTextBookInput>;
  /** vod 정보 (직접 업로드 영상) */
  vod?: InputMaybe<CreateCourseStepVodInput>;
  /** youtube 정보 (유튜브 링크) */
  youtube?: InputMaybe<CreateCourseStepYoutubeInput>;
};

export type CreateCourseStepPdfInput = {
  /** pdf 경로 (업로드 URL, 추후 분석으로 페이지 수 반영) */
  url: Scalars['String'];
};

export type CreateCourseStepPptInput = {
  /** ppt 경로 (업로드 URL, 추후 분석으로 슬라이드 수 반영) */
  url: Scalars['String'];
};

export type CreateCourseStepSupplementaryDataInput = {
  /** 내용 */
  description: Scalars['String'];
  /** 힌트 내용 */
  hintDescription?: InputMaybe<Scalars['String']>;
  /** 힌트 제목 */
  hintTitle?: InputMaybe<Scalars['String']>;
  /** 컨텐츠 제공업체 */
  providerType?: InputMaybe<ContentProviderType>;
  /** 단계 ID */
  stepId: Scalars['ID'];
  /** 제목 */
  title: Scalars['String'];
  /** 비디오 경로 */
  videoUrl?: InputMaybe<Scalars['String']>;
};

export type CreateCourseStepTextBookInput = {
  /** 내용 */
  content: Scalars['String'];
};

export type CreateCourseStepVodInput = {
  /** Upload 서비스 Presigned 응답의 uploadID (지정 시 변환 완료 후 duration 자동 연동) */
  uploadId?: InputMaybe<Scalars['ID']>;
  /** 경로 (직접 업로드 영상 URL, HLS 지원, uploadId 사용 시 생략) */
  url?: InputMaybe<Scalars['String']>;
};

export type CreateCourseStepVodItemInput = {
  /** 핀 위치 (초 단위) */
  pinPosition: Scalars['Int'];
  /** 퀴즈 유형의 아이템 */
  quiz?: InputMaybe<CreateCourseQuizInput>;
  /** 단계 VOD ID */
  stepVodId: Scalars['ID'];
  /** 부제목 */
  subTitle?: InputMaybe<Scalars['String']>;
  /** textBook 정보 */
  textBook?: InputMaybe<CreateCourseStepVodItemTextBookInput>;
  /** 제목 */
  title: Scalars['String'];
  /** 아이템 유형 (퀴즈, 텍스트) */
  type: CourseVodItemDType;
};

export type CreateCourseStepVodItemTextBookInput = {
  /** 내용 */
  content: Scalars['String'];
};

/** 유튜브 링크 단계 생성 */
export type CreateCourseStepYoutubeInput = {
  /** 경로 (유튜브 URL, 서버에서 duration 자동 조회) */
  url: Scalars['String'];
};

/** 단계 보조 자료 생성 인풋 */
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
  tagCategoryId: Scalars['ID'];
};

export type CreateModiData = {
  __typename?: 'CreateModiData';
  /** MODI 데이터 ID */
  id: Scalars['ID'];
};

export type CreateModiDataInput = {
  /** 모디 데이터 (JSON) */
  data: Scalars['String'];
  /** 기능 유형 (Button: click, double_click, long_click, ToF: distance, IMU: acceleration, gyro, magnetic) */
  functionType: Scalars['String'];
  /** 모듈 유형 (Button, ToF, IMU 등) */
  moduleType: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
};

export type CreateModiDataList = {
  __typename?: 'CreateModiDataList';
  /** MODI 데이터 ID 목록 */
  ids: Array<Scalars['ID']>;
};

export type CreateModiDataListInput = {
  /** 모디 데이터 리스트 */
  modiDataList: Array<CreateModiDataInput>;
};

export type CreateNotificationInput = {
  /** 알림 내용 (언어별 JSON string: {"ko": "내용", "en": "Description"}) */
  description: Scalars['String'];
  /** 타겟 디바이스 타입 (기본값: ALL) */
  deviceType?: InputMaybe<DeviceType>;
  /** 아이콘 URL (선택) */
  iconURL?: InputMaybe<Scalars['String']>;
  /** 대상 그룹 ID (targetType이 USER_GROUP인 경우 필수) */
  targetGroupId?: InputMaybe<Scalars['String']>;
  /** 대상 타입 (ALL_USERS, SPECIFIC_USERS, USER_GROUP) */
  targetType: Scalars['String'];
  /** 대상 사용자 ID 목록 (targetType이 SPECIFIC_USERS인 경우 필수) */
  targetUserIds?: InputMaybe<Array<Scalars['String']>>;
  /** 알림 제목 (언어별 JSON string: {"ko": "제목", "en": "Title"}) */
  title: Scalars['String'];
  /** 알림 타입 */
  type: NotificationType;
  /** 알림 UI 형태 (선택) */
  uiType?: InputMaybe<NotificationUiType>;
  /** 웹 링크 URL (선택) */
  webLinkPath?: InputMaybe<Scalars['String']>;
};

export type CreatePlatClassifierInput = {
  /** 데이터 (이미지 데이터 주소, 텍스트, 소리 데이터 주소 등) */
  dataset: Array<Scalars['String']>;
  /** 라벨명 */
  label: Scalars['String'];
};

export type CreateProjectInput = {
  codeType?: InputMaybe<ProjectCodeType>;
  createType?: InputMaybe<ProjectCreateType>;
  jsonData?: InputMaybe<Scalars['String']>;
  runType?: InputMaybe<ProjectRunType>;
  thumb?: InputMaybe<ImageInfoInput>;
  title: Scalars['String'];
  userKey?: InputMaybe<Scalars['String']>;
};

export type CreateTeamAddressInput = {
  /** 주소 */
  address: Scalars['String'];
  /** 도시 */
  city: Scalars['String'];
  /** 국제전화번호 */
  countryCallingCode: Scalars['String'];
  /** 국가코드 */
  countryCode: Scalars['String'];
  /** 상세 주소 */
  detailAddress: Scalars['String'];
  /** 기본배송지 여부 */
  isDefault: Scalars['Boolean'];
  /** 배송지명 */
  name: Scalars['String'];
  /** 핸드폰 번호 (ex. 01012341234) */
  phoneNumber: Scalars['String'];
  /** 우편번호 */
  postalCode: Scalars['String'];
  /** 수령인 */
  receiver: Scalars['String'];
  /** 팀 고유번호 */
  teamId: Scalars['ID'];
};

export type CreateTeamInput = {
  /** 팀명 */
  name: Scalars['String'];
};

export type CreateUploadImageInput = {
  id: Scalars['String'];
  image: ImageInfoInput;
  serviceType: UploadImageServiceType;
};

/** 국제 통화 타입 */
export enum CurrencyType {
  /** Korea Won */
  Krw = 'KRW'
}

export type CursorInfo = {
  __typename?: 'CursorInfo';
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export enum CusorType {
  After = 'AFTER',
  Before = 'BEFORE'
}

/** 일별 학습 데이터 포인트 */
export type DailyLearningPoint = {
  __typename?: 'DailyLearningPoint';
  activeSeconds: Scalars['Int'];
  date: Scalars['String'];
  sessionCount: Scalars['Int'];
};

export type DatasheetInput = {
  /** matching id */
  datasheetMatchingId: Scalars['Int'];
  /** message */
  message?: InputMaybe<Scalars['String']>;
  /** part name which matching */
  partName: Scalars['String'];
  /** part name which matched */
  partType: Scalars['String'];
  /** project id */
  projectId: Scalars['Int'];
  /** matching status */
  status: Scalars['String'];
};

/** 기간 (ex. "YYYY-MM-DD") */
export type DatePeriodInput = {
  /** 시작일 */
  from: Scalars['String'];
  /** 종료일 */
  to: Scalars['String'];
};

export enum DecorationType {
  BottomPosition = 'BOTTOM_POSITION',
  CenterPosition = 'CENTER_POSITION',
  CompletionKind = 'COMPLETION_KIND',
  TopPosition = 'TOP_POSITION'
}

export type DeleteAiModel = {
  __typename?: 'DeleteAIModel';
  success: Scalars['Boolean'];
};

export type DeleteAiModelInput = {
  /** 모델 ID */
  id: Scalars['ID'];
};

export type DeleteAddress = {
  __typename?: 'DeleteAddress';
  success: Scalars['Boolean'];
};

export type DeleteAddressInput = {
  /** 주소 고유번호 */
  id: Scalars['ID'];
};

export type DeleteAppBannerInput = {
  id: Scalars['ID'];
};

export type DeleteContact = {
  __typename?: 'DeleteContact';
  success: Scalars['Boolean'];
};

export type DeleteContactInput = {
  /** 문의 고유번호 */
  id: Scalars['ID'];
};

export type DeleteCourseGroupInput = {
  /** 과정그룹 ID */
  id: Scalars['ID'];
};

export type DeleteCourseInput = {
  /** 코스 ID */
  id: Scalars['ID'];
};

export type DeleteCourseLessonInput = {
  /** 과정-레슨 조인 행 ID (courseLessonId, 목록 조회 시 내려주는 값) */
  id: Scalars['ID'];
};

export type DeleteCourseMaterialInput = {
  /** 교육자료 ID */
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

export type DeleteCourseStepInput = {
  /** 단계 ID */
  id: Scalars['ID'];
};

export type DeleteCourseStepSupplementaryDataInput = {
  /** 단계 보조자료 ID */
  id: Scalars['ID'];
};

export type DeleteCourseStepVodItemInput = {
  /** 단계 VOD 아이템 ID */
  id: Scalars['ID'];
};

export type DeleteCourseTagCategoryInput = {
  /** 카테고리 ID */
  id: Scalars['ID'];
};

export type DeleteCourseTagInput = {
  /** 태그 ID */
  id: Scalars['ID'];
};

export type DeleteModiData = {
  __typename?: 'DeleteModiData';
  success: Scalars['Boolean'];
};

export type DeleteModiDataInput = {
  /** MODI 데이터 ID */
  id: Scalars['ID'];
};

export type DeleteModiDataList = {
  __typename?: 'DeleteModiDataList';
  success: Scalars['Boolean'];
};

export type DeleteModiDataListInput = {
  /** MODI 데이터 ID 리스트 */
  ids: Array<Scalars['ID']>;
};

export type DeleteProjectInput = {
  id: Scalars['ID'];
  userKey?: InputMaybe<Scalars['String']>;
};

export type DeleteTeam = {
  __typename?: 'DeleteTeam';
  success: Scalars['Boolean'];
};

export type DeleteTeamAddress = {
  __typename?: 'DeleteTeamAddress';
  success: Scalars['Boolean'];
};

export type DeleteTeamAddressInput = {
  /** 팀 주소 고유번호 */
  id: Scalars['ID'];
};

export type DeleteTeamInput = {
  /** 팀 고유번호 */
  id: Scalars['ID'];
  /** 팀명 */
  name: Scalars['String'];
};

export type DeleteTeamMember = {
  __typename?: 'DeleteTeamMember';
  success: Scalars['Boolean'];
};

export type DeleteTeamMemberInput = {
  /** 팀 고유 번호 */
  teamId: Scalars['ID'];
  /** 삭제할 팀 멤버 고유번호 목록 */
  teamMemberIdList: Array<Scalars['String']>;
};

export enum DeviceType {
  /** 전체 */
  All = 'ALL',
  /** 안드로이드 */
  Android = 'ANDROID',
  /** iOS */
  Ios = 'IOS',
  /** 모바일 전체 */
  Mobile = 'MOBILE',
  /** 웹 */
  Web = 'WEB'
}

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

export type EffectivePermissions = {
  __typename?: 'EffectivePermissions';
  /** 가장 빠른 grant 만료 시각 (RFC3339). null = 영구. */
  expiresAt?: Maybe<Scalars['String']>;
  /** 역할 계층 확장 후의 permission 집합 */
  permissions: Array<Scalars['String']>;
  /** 캐시 무효화용 revision 번호 */
  revision: Scalars['Int'];
  /** 직접 부여된 역할 코드들 (flat — hierarchy expansion 없음) */
  roleCodes: Array<Scalars['String']>;
  /** 조회 대상 유저 ID */
  userId: Scalars['ID'];
};

export type EffectivePermissionsInput = {
  /** 조회 대상 유저 ID (admin 본인 또는 권한 보유자가 다른 유저 조회) */
  userId: Scalars['ID'];
};

export type EmailInput = {
  /** 이메일 주소 */
  address: Scalars['String'];
  /** 이메일 내용 */
  content: Scalars['String'];
  /** 이메일 템플릿 id */
  templateId: Scalars['String'];
  /** 이메일 제목 */
  title: Scalars['String'];
};

/** 강의 입장 output */
export type EnterCourseOutput = {
  __typename?: 'EnterCourseOutput';
  /** 토큰 */
  token: Scalars['String'];
};

export enum EventNotificationType {
  /** 파일 업로드 이벤트 */
  FileUploadEvent = 'FileUploadEvent'
}

/** SSE 이벤트 - Notification trigger 메세지 */
export type EventUploadNotificationMessage = {
  __typename?: 'EventUploadNotificationMessage';
  /** bucket 주소 */
  bucket: Scalars['String'];
  /** cdn 주소 */
  cdnUrl: Scalars['String'];
  /** 에러 내용 */
  error: Scalars['String'];
  /** 이벤트 발송 타임 */
  eventTime: Scalars['String'];
  /** 이벤트 타입 */
  eventType: EventNotificationType;
  /** 파일 사이즈 */
  fileSize: Scalars['Int'];
  /** key */
  key: Scalars['String'];
  /** source ip */
  sourceIp: Scalars['String'];
  /** 유저 No */
  userNo: Scalars['Int'];
};

export type Faq = {
  __typename?: 'Faq';
  category: FaqCategoryType;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  language: LanguageType;
  subCategory: Scalars['String'];
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export enum FaqCategoryType {
  Account = 'ACCOUNT',
  Order = 'ORDER',
  Plans = 'PLANS',
  Team = 'TEAM',
  Workspace = 'WORKSPACE'
}

export type FaqConnection = {
  __typename?: 'FaqConnection';
  nodes: Array<FaqNode>;
  totalCount: Scalars['Int'];
};

export type FaqConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FaqConnectionOrderBy>;
  where: FaqConnectionWhere;
};

export type FaqConnectionOrderBy = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<FaqConnectionOrderByFieldType>;
};

export enum FaqConnectionOrderByFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type FaqConnectionWhere = {
  /** 카테고리 */
  category?: InputMaybe<FaqCategoryType>;
  /** 언어 */
  language: LanguageType;
  /** 제목 */
  title?: InputMaybe<Scalars['String']>;
};

export type FaqInput = {
  /** FAQ 고유번호 */
  id: Scalars['ID'];
  /** 언어 */
  language: LanguageType;
};

export type FaqNode = {
  __typename?: 'FaqNode';
  category: FaqCategoryType;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  language: LanguageType;
  subCategory: Scalars['String'];
  title: Scalars['String'];
  viewCount: Scalars['Int'];
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

export type FileMetadata = {
  __typename?: 'FileMetadata';
  /** 파일 확장자 */
  extension?: Maybe<Scalars['String']>;
  /** 원본 파일명 */
  fileName?: Maybe<Scalars['String']>;
  /** 파일 용량 (bytes) */
  fileSizeInBytes?: Maybe<Scalars['Int']>;
  /** 파일 URL */
  url: Scalars['String'];
};

/** 필터 집계 항목 (value + count) */
export type FilteredValue = {
  __typename?: 'FilteredValue';
  /** 해당 값을 가진 코스 수 */
  count: Scalars['Int'];
  /** enum 값 (예: BLOCK, BEGINNER) */
  value: Scalars['String'];
};

/** 커리큘럼 순 첫 Step 진입용 (courseId·lessonId·stepId만 제공) */
export type FirstLearning = {
  __typename?: 'FirstLearning';
  /** 과정그룹 ID (tracking API 호출 시 전달용, 그룹 미소속 시 null) */
  courseGroupId?: Maybe<Scalars['ID']>;
  /** 과정그룹 이름 (그룹 미소속 시 null) */
  courseGroupName?: Maybe<Scalars['String']>;
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 차시 ID */
  lessonId: Scalars['ID'];
  /** Step ID (차시에 Step이 없으면 null) */
  stepId?: Maybe<Scalars['ID']>;
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

/** 비활성 사용자 테스트 모드 (DEV/LOCAL 전용) */
export enum InactivityTestModeType {
  /** 11개월 비활성 (경고 알림 발송 테스트) */
  ElevenMonths = 'ELEVEN_MONTHS',
  /** 12개월 비활성 (데이터 삭제 알림 테스트) */
  TwelveMonths = 'TWELVE_MONTHS'
}

export type InviteTeamMember = {
  __typename?: 'InviteTeamMember';
  success: Scalars['Boolean'];
};

export type InviteTeamMemberInput = {
  /** 팀 고유번호 */
  teamId: Scalars['ID'];
  /** 초대할 유저 고유번호 */
  userIdList: Array<Scalars['String']>;
};

export type Jwt = {
  __typename?: 'JWT';
  accessToken: Scalars['String'];
  expiresIn: Scalars['Int'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
};

export type JobInput = {
  /** Datasheet */
  datasheet?: InputMaybe<DatasheetInput>;
  /** EmailInput */
  email?: InputMaybe<EmailInput>;
  /** 구분용 유일키 */
  key?: InputMaybe<Scalars['String']>;
  /** ModifactoryCircuitArchitectureInput */
  modifactoryCircuitArchitecture?: InputMaybe<ModifactoryCircuitArchitectureInput>;
  /** 부모 작업 id */
  parent?: InputMaybe<Scalars['String']>;
  /** 발송 타입 */
  sendType: SendType;
  /** 서비스명 */
  service: NotifyingServiceType;
  /** DB 저장여부 */
  store: Scalars['Boolean'];
  /** 추적용 trace id */
  traceId?: InputMaybe<Scalars['String']>;
};

export enum LangType {
  Cn = 'CN',
  De = 'DE',
  En = 'EN',
  Jp = 'JP',
  Ko = 'KO',
  Pl = 'PL'
}

/** 언어 유형 */
export enum LanguageType {
  /** 중국어 */
  Cn = 'CN',
  /** 독일어 */
  De = 'DE',
  /** 영어 */
  En = 'EN',
  /** 일본어 */
  Jp = 'JP',
  /** 한국어 */
  Ko = 'KO',
  /** 폴란드어 */
  Pl = 'PL'
}

/** 기간별 학습 통계 */
export type LearningAnalytics = {
  __typename?: 'LearningAnalytics';
  /** 평균 집중도 (0.0~1.0) */
  avgFocusRatio: Scalars['Float'];
  /** 타입별 분류 */
  byType: Array<LearningTimeByType>;
  /** 일별 추이 */
  dailyTrend: Array<DailyLearningPoint>;
  /** 기간 내 총 활성 학습 시간 (초) */
  totalActiveSeconds: Scalars['Int'];
  /** 기간 내 총 세션 수 */
  totalSessions: Scalars['Int'];
};

/** 학습 세션 (attempt 단위) */
export type LearningSessionItem = {
  __typename?: 'LearningSessionItem';
  activeTimeSeconds: Scalars['Int'];
  attemptNumber: Scalars['Int'];
  endedAt?: Maybe<Scalars['String']>;
  focusRatio: Scalars['Float'];
  idleTimeSeconds: Scalars['Int'];
  progressRate: Scalars['Float'];
  score?: Maybe<Scalars['Float']>;
  sessionId: Scalars['ID'];
  startedAt: Scalars['String'];
  status: ProgressStatus;
  stepId: Scalars['ID'];
  stepType: CourseStepDType;
  totalDurationSeconds: Scalars['Int'];
};

/** 학습 현황 요약 */
export type LearningStatus = {
  __typename?: 'LearningStatus';
  /** 완료한 과정(course) 건수 */
  completedCourseCount: Scalars['Int'];
  /** 전체 등록한 과정 개수 */
  enrolledCourseCount: Scalars['Int'];
  /** 진행 중인 과정(course) 건수 */
  inProgressCourseCount: Scalars['Int'];
  /** Step 타입별 학습시간 분류 (LearningSession 기반) */
  learningTimeByType: Array<LearningTimeByType>;
  /** 총 학습 시간 (초). 시/일/월 구간 집계는 추후 확장. */
  totalLearningTimeSeconds: Scalars['Int'];
};

/** Step 타입별 학습시간 집계 */
export type LearningTimeByType = {
  __typename?: 'LearningTimeByType';
  /** 세션 수 */
  sessionCount: Scalars['Int'];
  /** Step 유형 (VOD, CODING, PDF 등) */
  stepType: CourseStepDType;
  /** 총 활성 학습 시간 (초) */
  totalActiveSeconds: Scalars['Int'];
  /** 총 경과 시간 (초) */
  totalDurationSeconds: Scalars['Int'];
};

export type LeaveTeam = {
  __typename?: 'LeaveTeam';
  success: Scalars['Boolean'];
};

export type LeaveTeamInput = {
  /** 팀 고유번호 */
  id: Scalars['ID'];
};

/** 차시 피드백 상태 (클라이언트 표시용: 빨간색=미확인/처리중 1개 이상, 초록색=모두 완료) */
export enum LessonFeedbackStatus {
  /** 모든 피드백 완료(관리자 confirm) (초록색) */
  Complete = 'COMPLETE',
  /** 미확인 또는 처리중인 의견이 1개 이상 (빨간색) */
  NeedsAttention = 'NEEDS_ATTENTION',
  /** 없음 (표시 생략) */
  None = 'NONE'
}

export type LessonProgress = {
  __typename?: 'LessonProgress';
  current: Scalars['Int'];
  progress: Scalars['Int'];
  progressRate: Scalars['Int'];
  total: Scalars['Int'];
};

/** 차시 내 단계 요약 (아이콘·학습 현황 표시용) */
export type LessonStepSummary = {
  __typename?: 'LessonStepSummary';
  /** 표시 순서 */
  idx: Scalars['Int'];
  /** 진도율 */
  progressRate: Scalars['Float'];
  /** 학습 상태 (학습전/학습중/학습완료) */
  status: ProgressStatus;
  /** 단계 소개 */
  stepDescription?: Maybe<Scalars['String']>;
  /** 단계 ID */
  stepId: Scalars['ID'];
  /** 단계 이름 */
  stepName: Scalars['String'];
  /** 단계 유형 (아이콘 표시용) */
  stepType: CourseStepDType;
};

/** 차시 진도 요약 */
export type LessonSummary = {
  __typename?: 'LessonSummary';
  /** 완료 단계 수 */
  completedSteps: Scalars['Int'];
  /** 차시 소개 */
  description?: Maybe<Scalars['String']>;
  /** 이 차시 내 커리큘럼 순 첫 Step (진행도 무관). Step 없으면 null. */
  firstLearning?: Maybe<FirstLearning>;
  /** 차시 순서 (1부터) */
  idx: Scalars['Int'];
  /** 차시 ID */
  lessonId: Scalars['ID'];
  /** 차시 이름 */
  lessonName: Scalars['String'];
  /**
   * 이 차시 기준 이어하기 (해당 차시 내 첫 미완료 Step).
   * 차시 전체 완료·Step 없음이면 null. 과정 맥락은 courseId·courseName·totalLessonsInCourse로 동일.
   */
  nextLearning?: Maybe<NextLearning>;
  /** 진도율 */
  progressRate: Scalars['Float'];
  /** 과정 내 해당 차시 공개 상태 (공개 ON / 비공개 OFF). CourseLesson.is_public 기준. */
  state: CourseStateType;
  /** 학습 상태 */
  status: ProgressStatus;
  /** 단계별 요약 (이름, 소개, 상태, 학습 현황, 타입 아이콘용) */
  steps: Array<LessonStepSummary>;
  /** 총 단계 수 */
  totalSteps: Scalars['Int'];
  /** 총 학습 시간 (초) */
  totalTime: Scalars['Int'];
};

export type Library = {
  __typename?: 'Library';
  attachments: Array<LibraryContentAttachment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  cursorInfo: CursorInfo;
  id: Scalars['ID'];
  isExposed: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  language: LanguageType;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type LibraryConnection = {
  __typename?: 'LibraryConnection';
  nodes: Array<LibraryNode>;
  totalCount: Scalars['Int'];
};

export type LibraryConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LibraryConnectionOrderBy>;
  where: LibraryConnectionWhere;
};

export type LibraryConnectionOrderBy = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<LibraryConnectionOrderByFieldType>;
};

export enum LibraryConnectionOrderByFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type LibraryConnectionWhere = {
  /** 키워드 (제목 또는 내용) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 언어 */
  language: LanguageType;
};

export type LibraryContentAttachment = Attachment & {
  __typename?: 'LibraryContentAttachment';
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type LibraryInput = {
  /** 자료 고유번호 */
  id: Scalars['ID'];
  /** 언어 */
  language: LanguageType;
};

export type LibraryNode = {
  __typename?: 'LibraryNode';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isExposed: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  language: LanguageType;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export enum LivekitPermissionType {
  Admin = 'ADMIN',
  Tutor = 'TUTOR',
  User = 'USER'
}

export enum MachineLearningType {
  /** 강화학습 */
  ReinforcementLearning = 'REINFORCEMENT_LEARNING',
  /** 지도학습 */
  SupervisedLearning = 'SUPERVISED_LEARNING',
  /** 비지도학습 */
  UnsupervisedLearning = 'UNSUPERVISED_LEARNING'
}

export type MarkNotificationAsReadInput = {
  /** 알림 아이디 */
  notificationId: Scalars['ID'];
};

export type MaterialInput = {
  /** 레슨 ID */
  lessonId: Scalars['ID'];
  /** 자료 이름 */
  name: Scalars['String'];
  /** 유형 (TUTOR 또는 PARTICIPANT) */
  type: CourseLessonMaterialType;
  /** 자료 경로 */
  url: Scalars['String'];
};

export type ModiData = {
  __typename?: 'ModiData';
  /** 생성일 */
  createdAt: Scalars['String'];
  /** 모디 데이터 (JSON) */
  data: Scalars['String'];
  /** 기능 유형 (Button: click, double_click, long_click, ToF: distance, IMU: acceleration, gyro, magnetic) */
  functionType: Scalars['String'];
  /** MODI 데이터 ID */
  id: Scalars['ID'];
  /** 모듈 유형 (Button, ToF, IMU 등) */
  moduleType: Scalars['String'];
  /** 이름 */
  name: Scalars['String'];
};

export type ModiDataConnection = {
  __typename?: 'ModiDataConnection';
  nodes: Array<ModiData>;
  totalCount: Scalars['Int'];
};

export type ModiDataConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ModiDataConnectionOrderBy>;
  where?: InputMaybe<ModiDataConnectionWhere>;
};

export type ModiDataConnectionOrderBy = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<ModiDataConnectionOrderByFieldType>;
};

export enum ModiDataConnectionOrderByFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type ModiDataConnectionWhere = {
  /** 기능 유형 (Button: click, double_click, long_click, ToF: distance, IMU: acceleration, gyro, magnetic) */
  functionType?: InputMaybe<Scalars['String']>;
  /** 모듈 유형 (Button, ToF, IMU 등) */
  moduleType?: InputMaybe<Scalars['String']>;
};

export type ModiDataInput = {
  /** MODI 데이터 ID */
  id: Scalars['ID'];
};

export enum ModifactoryCircuitArchitectureCase {
  AutoPlacement = 'AUTO_PLACEMENT',
  Routing = 'ROUTING'
}

export type ModifactoryCircuitArchitectureInput = {
  /** auto placement 전체 작업 쓰레드에 대한 종합적인 상태 */
  bundleStatus?: InputMaybe<Scalars['String']>;
  /** 발생 케이스 */
  case: ModifactoryCircuitArchitectureCase;
  /** 메이저 버전 */
  majorVersion: Scalars['Int'];
  /** 진행률 */
  percent?: InputMaybe<Scalars['Int']>;
  /** 진행 상태 */
  processState: ModifactoryCircuitArchitectureProcessState;
  /** 프로젝트 id */
  projectId: Scalars['String'];
  /** 프로젝트 이름 */
  projectName: Scalars['String'];
  /** 리비전 버전 */
  revisionVersion: Scalars['Int'];
  /** 클라이언트 상태 */
  status?: InputMaybe<Scalars['String']>;
  /** 유저 id */
  userId: Scalars['String'];
};

export enum ModifactoryCircuitArchitectureProcessState {
  Fail = 'FAIL',
  Progress = 'PROGRESS',
  Success = 'SUCCESS'
}

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

export type Mutation = {
  __typename?: 'Mutation';
  /** 과정그룹에 과정 추가 */
  addCoursesToCourseGroup: Scalars['Boolean'];
  /** 과정에 레슨 추가 */
  addLessonsToCourse: Scalars['Boolean'];
  addProjectFavorite: Scalars['Boolean'];
  /** 레슨에 단계 추가 */
  addStepsToLesson: Scalars['Boolean'];
  /** [관리자] 문의 답변 생성 */
  adminCreateContactReply: AdminContactReply;
  /** [관리자] FAQ 등록 */
  adminCreateFaq: AdminCreateFaq;
  /** [관리자] 자료 등록 */
  adminCreateLibrary: AdminCreateLibrary;
  /** [관리자] 공지사항 등록 */
  adminCreateNotice: AdminCreateNotice;
  /** [관리자] FAQ 삭제 */
  adminDeleteFaq: AdminDeleteFaq;
  /** [관리자] 자료 삭제 */
  adminDeleteLibrary: AdminDeleteLibrary;
  /** [관리자] 공지사항 삭제 */
  adminDeleteNotice: AdminDeleteNotice;
  /** [관리자] 탈퇴 계정 복구 (관리자용 - 인증 불필요) */
  adminRestoreAccount: User;
  /**
   * [관리자] 보호자 이메일 미등록 안내 알림 발송
   * 16세 미만 사용자 중 보호자 이메일이 등록되지 않은 사용자에게 알림 발송
   */
  adminSendProtectorNotification: AdminSendProtectorNotificationResult;
  /** [관리자] FAQ 수정 */
  adminUpdateFaq: AdminUpdateFaq;
  /** [관리자] 자료 수정 */
  adminUpdateLibrary: AdminUpdateLibrary;
  /** [관리자] 공지사항 수정 */
  adminUpdateNotice: AdminUpdateNotice;
  /** 마스터 어드민의 승인. approval REQUESTED → APPROVED + revision PENDING_APPROVAL → READY_TO_PUBLISH. */
  approveCoursePublish: ApprovalRequest;
  /**
   * [관리자] 어드민 역할 부여.
   * 호출자는 admin.role.assign 권한이 필요하며 master_admin 부여 시 reason 필수.
   */
  assignAdminRole: AdminGrant;
  /** PUBLISHED 과정에서 새 DRAFT revision 을 fork. pointer.draftRevisionId 로 매핑됨. */
  beginCourseDraft: CourseRevision;
  /** 요청자 본인의 취소. approval REQUESTED → CANCELLED + revision PENDING_APPROVAL → DRAFT. */
  cancelCoursePublishRequest: ApprovalRequest;
  /** 비밀번호 변경 */
  changePassword: ChangePassword;
  /** 완료: Step 학습 완료 (cascade 집계) */
  completeStep: StepProgressItem;
  /** 연락용 이메일 변경/등록 확인 (인증코드 검증 후 변경) */
  confirmContactEmailChange: Profile;
  /** 학생 레슨 피드백 확인 (관리자용) */
  confirmCourseParticipantLessonFeedback: CourseParticipantLessonFeedback;
  /** 단계 VOD 아이템(핀) 확인 */
  confirmCourseStepVodItem: Scalars['Boolean'];
  /** 보호자 이메일 변경/등록 확인 (인증코드 검증 후 변경 또는 신규 등록) */
  confirmProtectorEmailChange: Protector;
  /** 배송지 생성 */
  createAddress: Address;
  createAppBanner: Scalars['Boolean'];
  /** 문의 생성 */
  createContact: Contact;
  /** 코스 생성 */
  createCourse: Course;
  /** 과정그룹 생성 */
  createCourseGroup: CourseGroup;
  /** 레슨 생성 */
  createCourseLesson: CourseLesson;
  /** 교육자료 생성 */
  createCourseMaterial: Array<CourseLessonMaterial>;
  /** 수강생 등록 */
  createCourseParticipant: CourseParticipant;
  /** 학생 레슨(스케줄) 피드백 등록 */
  createCourseParticipantLessonFeedback: Scalars['Boolean'];
  /** 퀴즈 생성 */
  createCourseQuiz: CourseQuiz;
  /** 단계 생성 */
  createCourseStep: CourseStep;
  /** 단계 보조자료 생성 */
  createCourseStepSupplementaryData: CourseSupplementaryData;
  /** 단계 VOD 아이템 생성 */
  createCourseStepVodItem: CourseVodItem;
  /** 태그 생성 */
  createCourseTag: CourseTag;
  /** 태그 유형 생성 */
  createCourseTagCategory: CourseTagCategory;
  /** 모디 데이터 저장 */
  createModiData: CreateModiData;
  /** 모디 데이터 다수 저장 */
  createModiDataList: CreateModiDataList;
  /** 관리자 권한으로 알림 메시지 발송 */
  createNotification: Scalars['Boolean'];
  createProject: Project;
  /** 팀 생성 */
  createTeam: Team;
  /** 팀 배송지 생성 */
  createTeamAddress: TeamAddress;
  /** @deprecated Use `singleUploadFile or multiUploadFile`. */
  createUploadImage: ImageInfo;
  /** @deprecated Use `singleUploadFile or multiUploadFile`. */
  createUploadImages: Array<ImageInfo>;
  deleteAIModel: DeleteAiModel;
  /** 배송지 삭제 */
  deleteAddress: DeleteAddress;
  deleteAppBanner: Scalars['Boolean'];
  /** 문의 삭제 */
  deleteContact: DeleteContact;
  /** 코스 삭제 */
  deleteCourse: Scalars['Boolean'];
  /** 과정그룹 삭제 */
  deleteCourseGroup: Scalars['Boolean'];
  /** 레슨 삭제 */
  deleteCourseLesson: Scalars['Boolean'];
  /** 교육자료 삭제 */
  deleteCourseMaterial: Scalars['Boolean'];
  /** 수강생 삭제 */
  deleteCourseParticipant: Scalars['Boolean'];
  /** 퀴즈 삭제 */
  deleteCourseQuiz: Scalars['Boolean'];
  /** 단계 삭제 (단계 연결 제거) */
  deleteCourseStep: Scalars['Boolean'];
  /** 단계 보조자료 삭제 */
  deleteCourseStepSupplementaryData: Scalars['Boolean'];
  /** 단계 VOD 아이템 삭제 */
  deleteCourseStepVodItem: Scalars['Boolean'];
  /** 태그 삭제 */
  deleteCourseTag: Scalars['Boolean'];
  /** 태그 유형 삭제 */
  deleteCourseTagCategory: Scalars['Boolean'];
  /** 모디 데이터 삭제 */
  deleteModiData: DeleteModiData;
  /** 모디 데이터 다수 삭제 */
  deleteModiDataList: DeleteModiDataList;
  deleteProject: Scalars['Boolean'];
  /** 팀 삭제 */
  deleteTeam: DeleteTeam;
  /** 팀 배송지 삭제 */
  deleteTeamAddress: DeleteTeamAddress;
  /** 팀 멤버 삭제 */
  deleteTeamMember: DeleteTeamMember;
  /** 팀 멤버 초대 */
  inviteTeamMember: InviteTeamMember;
  /** 팀 탈퇴 */
  leaveTeam: LeaveTeam;
  /** 템플릿 기반 알림 읽음 처리 */
  markNotificationAsRead: Scalars['Boolean'];
  multiUploadFile: Array<Scalars['String']>;
  /** READY_TO_PUBLISH 의 즉시 공개. revision PUBLISHED + pointer.publishedRevisionId swap. */
  publishCourseRevision: CourseRevision;
  /** 토큰 갱신 (리프레시 토큰으로 새 토큰 발급) */
  refreshToken: TokenExchange;
  /** 마스터 어드민의 반려. approval REQUESTED → REJECTED + revision PENDING_APPROVAL → DRAFT. reason 필수. */
  rejectCoursePublish: ApprovalRequest;
  /** 과정그룹에서 과정 제거 */
  removeCoursesFromCourseGroup: Scalars['Boolean'];
  /** 과정에서 레슨 제거 */
  removeLessonsFromCourse: Scalars['Boolean'];
  removeProjectFavorite: Scalars['Boolean'];
  /** 레슨에서 단계 제거 */
  removeStepsFromLesson: Scalars['Boolean'];
  /** 과정그룹 순서 변경 */
  reorderCourseGroups: Scalars['Boolean'];
  /** 과정그룹 내 과정 순서 변경 */
  reorderCoursesInCourseGroup: Scalars['Boolean'];
  /** 과정 내 레슨 순서 변경 */
  reorderLessonsInCourse: Scalars['Boolean'];
  /** 레슨 내 단계 순서 변경 */
  reorderStepsInLesson: Scalars['Boolean'];
  /** 과정 수강 신청 (개별 강의) — 신청 즉시 수강 처리 */
  requestCourse: RequestCourseOutput;
  /** 과정 그룹 수강 신청 (강의그룹) — 신청 즉시 수강 처리 */
  requestCourseGroup: RequestCourseGroupOutput;
  /** DRAFT 의 공개 승인 요청. approval_request(REQUESTED) 생성 + revision DRAFT → PENDING_APPROVAL. */
  requestCoursePublish: ApprovalRequest;
  /** 비밀번호 재설정 */
  resetPassword: ResetPassword;
  /** 탈퇴 계정 복구 (사용자용 - 이메일 인증 필요) */
  restoreAccount: User;
  /**
   * [관리자] 어드민 역할 회수.
   * 호출자는 admin.role.revoke 권한이 필요하며 마지막 활성 master_admin 은 회수 불가.
   */
  revokeAdminRole: RevokeAdminRole;
  saveAIModel: SaveAiModel;
  /** DRAFT revision 의 콘텐츠를 부분 갱신. lifecycle_state 는 DRAFT 그대로 유지. 학습자 노출 무영향. */
  saveCourseDraft: CourseRevision;
  /** 이메일 인증코드 발송 */
  sendEmailVerificationCode: SendEmailVerificationCode;
  /** 세션 원타임 코드 생성 (웹 로그인 완료 후 앱으로 전달할 코드 발급) */
  sessionOnetimeCode: SessionOnetimeCode;
  /**
   * [테스트] 비활성 사용자 테스트 설정 (DEV/LOCAL 전용)
   * 사용자의 last_login_at을 과거로 설정하여 비활성 알림/삭제 테스트
   */
  setUserInactivityForTest: SetUserInactivityForTestResult;
  /** 로그인 */
  signIn: User;
  /** 로그아웃 */
  signOut: SignOut;
  /** 회원가입 */
  signUp: User;
  singleUploadFile: Scalars['String'];
  /** 소셜 로그인 */
  socialSignIn: SocialSignIn;
  /** 소셜 회원가입 */
  socialSignUp: User;
  /** 진입: Step 학습 시작 */
  startStep: StepProgressItem;
  syncProject: SyncProjectResult;
  /** 토큰 교환 (원타임 코드로 토큰 발급) */
  tokenExchange: TokenExchange;
  /** 회원탈퇴 */
  unregister: Unregister;
  updateAIModel: UpdateAiModel;
  /** 배송지 수정 */
  updateAddress: Address;
  updateAppBanner: Scalars['Boolean'];
  /** 코스 수정 */
  updateCourse: Scalars['Boolean'];
  /** 과정그룹 수정 */
  updateCourseGroup: Scalars['Boolean'];
  /** 레슨 수정 */
  updateCourseLesson: Scalars['Boolean'];
  /** 수강생 업데이트 */
  updateCourseParticipant: Scalars['Boolean'];
  /** 퀴즈 수정 */
  updateCourseQuiz: Scalars['Boolean'];
  /** 단계 수정 */
  updateCourseStep: Scalars['Boolean'];
  /** 단계 보조자료 수정 */
  updateCourseStepSupplementaryData: Scalars['Boolean'];
  /** 단계 VOD 아이템 수정 */
  updateCourseStepVodItem: Scalars['Boolean'];
  /** 과정그룹 내 과정 공개/비공개 변경 */
  updateCourseVisibilityInCourseGroup: Scalars['Boolean'];
  /** 과정 내 레슨 공개/비공개 변경 */
  updateLessonVisibilityInCourse: Scalars['Boolean'];
  /** 모디 데이터 수정 */
  updateModiData: UpdateModiData;
  /** 프로필 업데이트 */
  updateProfile: Profile;
  updateProject: Project;
  /** 보호자 정보 수정 (이메일 제외) */
  updateProtector: Protector;
  /** 진행: Step 진도 업데이트 (heartbeat) */
  updateStepProgress: StepProgressItem;
  /** 팀 수정 */
  updateTeam: Team;
  /** 팀 배송지 수정 */
  updateTeamAddress: TeamAddress;
  /** 팀 멤버 역할 변경 */
  updateTeamMemberRole: UpdateTeamMemberRole;
  /** 유저 정보 업데이트 */
  updateUser: User;
  /** @deprecated Use `singleUploadFile or multiUploadFile`. */
  uploadFile: Scalars['String'];
  /** 이메일 인증코드 확인 */
  verifyEmailVerificationCode: VerifyEmailVerificationCode;
};


export type MutationAddCoursesToCourseGroupArgs = {
  input: AddCoursesToCourseGroupInput;
};


export type MutationAddLessonsToCourseArgs = {
  input: AddLessonsToCourseInput;
};


export type MutationAddProjectFavoriteArgs = {
  input: AddProjectFavoriteInput;
};


export type MutationAddStepsToLessonArgs = {
  input: AddStepsToLessonInput;
};


export type MutationAdminCreateContactReplyArgs = {
  input: AdminCreateContactReplyInput;
};


export type MutationAdminCreateFaqArgs = {
  input: AdminCreateFaqInput;
};


export type MutationAdminCreateLibraryArgs = {
  input: AdminCreateLibraryInput;
};


export type MutationAdminCreateNoticeArgs = {
  input: AdminCreateNoticeInput;
};


export type MutationAdminDeleteFaqArgs = {
  input: AdminDeleteFaqInput;
};


export type MutationAdminDeleteLibraryArgs = {
  input: AdminDeleteLibraryInput;
};


export type MutationAdminDeleteNoticeArgs = {
  input: AdminDeleteNoticeInput;
};


export type MutationAdminRestoreAccountArgs = {
  input: AdminRestoreAccountInput;
};


export type MutationAdminUpdateFaqArgs = {
  input: AdminUpdateFaqInput;
};


export type MutationAdminUpdateLibraryArgs = {
  input: AdminUpdateLibraryInput;
};


export type MutationAdminUpdateNoticeArgs = {
  input: AdminUpdateNoticeInput;
};


export type MutationApproveCoursePublishArgs = {
  input: ApprovalDecisionInput;
};


export type MutationAssignAdminRoleArgs = {
  input: AssignAdminRoleInput;
};


export type MutationBeginCourseDraftArgs = {
  courseId: Scalars['Int'];
};


export type MutationCancelCoursePublishRequestArgs = {
  input: ApprovalDecisionInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCompleteStepArgs = {
  input: CompleteStepInput;
};


export type MutationConfirmContactEmailChangeArgs = {
  input: ConfirmContactEmailChangeInput;
};


export type MutationConfirmCourseParticipantLessonFeedbackArgs = {
  input: ConfirmCourseParticipantLessonFeedbackInput;
};


export type MutationConfirmCourseStepVodItemArgs = {
  input: ConfirmCourseStepVodItemInput;
};


export type MutationConfirmProtectorEmailChangeArgs = {
  input: ConfirmProtectorEmailChangeInput;
};


export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
};


export type MutationCreateAppBannerArgs = {
  input: CreateAppBannerInput;
};


export type MutationCreateContactArgs = {
  input: CreateContactInput;
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationCreateCourseGroupArgs = {
  input: CreateCourseGroupInput;
};


export type MutationCreateCourseLessonArgs = {
  input: CreateCourseLessonInput;
};


export type MutationCreateCourseMaterialArgs = {
  input: CreateCourseMaterialInput;
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


export type MutationCreateCourseStepArgs = {
  input: CreateCourseStepInput;
};


export type MutationCreateCourseStepSupplementaryDataArgs = {
  input: CreateCourseStepSupplementaryDataInput;
};


export type MutationCreateCourseStepVodItemArgs = {
  input: CreateCourseStepVodItemInput;
};


export type MutationCreateCourseTagArgs = {
  input: CreateCourseTagInput;
};


export type MutationCreateCourseTagCategoryArgs = {
  input: CreateCourseTagCategoryInput;
};


export type MutationCreateModiDataArgs = {
  input: CreateModiDataInput;
};


export type MutationCreateModiDataListArgs = {
  input: CreateModiDataListInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationCreateTeamAddressArgs = {
  input: CreateTeamAddressInput;
};


export type MutationCreateUploadImageArgs = {
  input?: InputMaybe<CreateUploadImageInput>;
};


export type MutationCreateUploadImagesArgs = {
  input: Array<InputMaybe<CreateUploadImageInput>>;
};


export type MutationDeleteAiModelArgs = {
  input: DeleteAiModelInput;
};


export type MutationDeleteAddressArgs = {
  input: DeleteAddressInput;
};


export type MutationDeleteAppBannerArgs = {
  input: DeleteAppBannerInput;
};


export type MutationDeleteContactArgs = {
  input: DeleteContactInput;
};


export type MutationDeleteCourseArgs = {
  input: DeleteCourseInput;
};


export type MutationDeleteCourseGroupArgs = {
  input: DeleteCourseGroupInput;
};


export type MutationDeleteCourseLessonArgs = {
  input: DeleteCourseLessonInput;
};


export type MutationDeleteCourseMaterialArgs = {
  input: DeleteCourseMaterialInput;
};


export type MutationDeleteCourseParticipantArgs = {
  input: DeleteCourseParticipantInput;
};


export type MutationDeleteCourseQuizArgs = {
  input: DeleteCourseQuizInput;
};


export type MutationDeleteCourseStepArgs = {
  input: DeleteCourseStepInput;
};


export type MutationDeleteCourseStepSupplementaryDataArgs = {
  input: DeleteCourseStepSupplementaryDataInput;
};


export type MutationDeleteCourseStepVodItemArgs = {
  input: DeleteCourseStepVodItemInput;
};


export type MutationDeleteCourseTagArgs = {
  input: DeleteCourseTagInput;
};


export type MutationDeleteCourseTagCategoryArgs = {
  input: DeleteCourseTagCategoryInput;
};


export type MutationDeleteModiDataArgs = {
  input: DeleteModiDataInput;
};


export type MutationDeleteModiDataListArgs = {
  input: DeleteModiDataListInput;
};


export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


export type MutationDeleteTeamArgs = {
  input: DeleteTeamInput;
};


export type MutationDeleteTeamAddressArgs = {
  input: DeleteTeamAddressInput;
};


export type MutationDeleteTeamMemberArgs = {
  input: DeleteTeamMemberInput;
};


export type MutationInviteTeamMemberArgs = {
  input: InviteTeamMemberInput;
};


export type MutationLeaveTeamArgs = {
  input: LeaveTeamInput;
};


export type MutationMarkNotificationAsReadArgs = {
  input: MarkNotificationAsReadInput;
};


export type MutationMultiUploadFileArgs = {
  input: MultiUploadFileInput;
};


export type MutationPublishCourseRevisionArgs = {
  revisionId: Scalars['Int'];
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationRejectCoursePublishArgs = {
  input: ApprovalDecisionInput;
};


export type MutationRemoveCoursesFromCourseGroupArgs = {
  input: RemoveCoursesFromCourseGroupInput;
};


export type MutationRemoveLessonsFromCourseArgs = {
  input: RemoveLessonsFromCourseInput;
};


export type MutationRemoveProjectFavoriteArgs = {
  input: RemoveProjectFavoriteInput;
};


export type MutationRemoveStepsFromLessonArgs = {
  input: RemoveStepsFromLessonInput;
};


export type MutationReorderCourseGroupsArgs = {
  input: ReorderCourseGroupsInput;
};


export type MutationReorderCoursesInCourseGroupArgs = {
  input: ReorderCoursesInCourseGroupInput;
};


export type MutationReorderLessonsInCourseArgs = {
  input: ReorderLessonsInCourseInput;
};


export type MutationReorderStepsInLessonArgs = {
  input: ReorderStepsInLessonInput;
};


export type MutationRequestCourseArgs = {
  input: RequestCourseInput;
};


export type MutationRequestCourseGroupArgs = {
  input: RequestCourseGroupInput;
};


export type MutationRequestCoursePublishArgs = {
  input: RequestCoursePublishInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationRestoreAccountArgs = {
  input: RestoreAccountInput;
};


export type MutationRevokeAdminRoleArgs = {
  input: RevokeAdminRoleInput;
};


export type MutationSaveAiModelArgs = {
  input: SaveAiModelInput;
};


export type MutationSaveCourseDraftArgs = {
  input: SaveCourseDraftInput;
};


export type MutationSendEmailVerificationCodeArgs = {
  input: SendEmailVerificationCodeInput;
};


export type MutationSessionOnetimeCodeArgs = {
  input?: InputMaybe<SessionOnetimeCodeInput>;
};


export type MutationSetUserInactivityForTestArgs = {
  input: SetUserInactivityForTestInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationSingleUploadFileArgs = {
  input: SingleUploadFileInput;
};


export type MutationSocialSignInArgs = {
  input: SocialSignInInput;
};


export type MutationSocialSignUpArgs = {
  input: SocialSignUpInput;
};


export type MutationStartStepArgs = {
  input: StartStepInput;
};


export type MutationSyncProjectArgs = {
  input: SyncProjectInput;
};


export type MutationTokenExchangeArgs = {
  input: TokenExchangeInput;
};


export type MutationUnregisterArgs = {
  input: UnregisterInput;
};


export type MutationUpdateAiModelArgs = {
  input: UpdateAiModelInput;
};


export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateAppBannerArgs = {
  input: UpdateAppBannerInput;
};


export type MutationUpdateCourseArgs = {
  input: UpdateCourseInput;
};


export type MutationUpdateCourseGroupArgs = {
  input: UpdateCourseGroupInput;
};


export type MutationUpdateCourseLessonArgs = {
  input: UpdateCourseLessonInput;
};


export type MutationUpdateCourseParticipantArgs = {
  input: UpdateCourseParticipantInput;
};


export type MutationUpdateCourseQuizArgs = {
  input: UpdateCourseQuizInput;
};


export type MutationUpdateCourseStepArgs = {
  input: UpdateCourseStepInput;
};


export type MutationUpdateCourseStepSupplementaryDataArgs = {
  input: UpdateCourseStepSupplementaryDataInput;
};


export type MutationUpdateCourseStepVodItemArgs = {
  input: UpdateCourseStepVodItemInput;
};


export type MutationUpdateCourseVisibilityInCourseGroupArgs = {
  input: UpdateCourseVisibilityInCourseGroupInput;
};


export type MutationUpdateLessonVisibilityInCourseArgs = {
  input: UpdateLessonVisibilityInCourseInput;
};


export type MutationUpdateModiDataArgs = {
  input: UpdateModiDataInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationUpdateProtectorArgs = {
  input: UpdateProtectorInput;
};


export type MutationUpdateStepProgressArgs = {
  input: UpdateStepProgressInput;
};


export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};


export type MutationUpdateTeamAddressArgs = {
  input: UpdateTeamAddressInput;
};


export type MutationUpdateTeamMemberRoleArgs = {
  input: UpdateTeamMemberRoleInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUploadFileArgs = {
  input: UploadFileInput;
};


export type MutationVerifyEmailVerificationCodeArgs = {
  input: VerifyEmailVerificationCodeInput;
};

export type MyCourseConnectionWhere = {
  /** 키워드 검색 (과정명, 설명, 태그명, 태그 카테고리명) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 상태 필터 (기본: 전체) */
  status?: InputMaybe<MyCourseProgressFilterStatus>;
};

/** 학습자 대시보드 진입점 응답 (본인 데이터). 과정 목록·페이지네이션은 Query.myCourseConnection과 같은 쿼리에서 병렬 요청. */
export type MyCourseDashboard = {
  __typename?: 'MyCourseDashboard';
  /** 학습 현황 요약 (항상 존재) */
  learningStatus: LearningStatus;
  /** 가장 마지막 학습 1건 (이력 없으면 null) */
  recentLearning?: Maybe<RecentLearning>;
};

/** 내 과정 상세 진도 (차시 Summary 목록) */
export type MyCourseDetail = {
  __typename?: 'MyCourseDetail';
  /** 실제 이수 기준 진행률 (비공개 포함 전체) */
  actualProgress: CourseProgressInfo;
  /** 수료증 다운로드 (수료 시에만 노출, 미구현 시 null) */
  certificate?: Maybe<FileMetadata>;
  /** 수료증 발급 가능 여부 (actualProgress 100% 기준) */
  certificateEligible: Scalars['Boolean'];
  /** 코드 에디터 타입 (BLOCK, AI_BLOCK, PYTHON) */
  codeEditorType?: Maybe<ActivityCodingType>;
  /** 수강 완료 일시 (미완료 시 null) */
  completedAt?: Maybe<Scalars['String']>;
  /** 완료 차시 수. deprecated: Use displayProgress.completedLessons */
  completedLessons: Scalars['Int'];
  /** 과정그룹 ID (tracking API 호출 시 전달용, 그룹 미소속 시 null) */
  courseGroupId?: Maybe<Scalars['ID']>;
  /** 과정그룹 이름 (그룹 미소속 시 null) */
  courseGroupName?: Maybe<Scalars['String']>;
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 과정 소개 */
  description?: Maybe<Scalars['String']>;
  /** 난이도 (초급, 중급, 고급) */
  difficulty?: Maybe<CourseDifficulty>;
  /** 화면 표시 진행률 (비공개 차시/단계 제외) */
  displayProgress: CourseProgressInfo;
  /** 교육지도안 다운로드 (URL, 용량, 확장자) */
  educationalPlan?: Maybe<FileMetadata>;
  /** 과정 커리큘럼 순 첫 Step (진행도 무관). */
  firstLearning?: Maybe<FirstLearning>;
  /** 차시별 진도 요약 목록 (순서·소개·하위 단계 포함, 비공개 차시 제외) */
  lessons: Array<LessonSummary>;
  /** 과정명 (Product 이름) */
  name: Scalars['String'];
  /**
   * 이어서 학습하기 (과정 내 차시·Step 순 기준 첫 미완료).
   * 전체 완료·차시/Step 없음 등이면 null. MyProgressSummary.nextLearning과 동일 구조.
   */
  nextLearning?: Maybe<NextLearning>;
  /** 진도율. deprecated: Use displayProgress.progressRate */
  progressRate: Scalars['Float'];
  /** 상태 (공개/비공개) */
  state: CourseStateType;
  /** 학습 상태 */
  status: ProgressStatus;
  /** 태그 목록 */
  tags: Array<CourseTag>;
  /** 타겟 유형 (일반, 튜터, 모디 교육자 등) */
  targetType: CourseProductTargetType;
  /** 수업자료 다운로드 (URL, 용량, 확장자) */
  teachingMaterials?: Maybe<FileMetadata>;
  /** 썸네일 이미지 URL */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** 총 차시 수. deprecated: Use displayProgress.totalLessons */
  totalLessons: Scalars['Int'];
  /** 총 학습 시간 (초) */
  totalTime: Scalars['Int'];
  /** 교육 유형 (교육자주도학습, 자기주도학습) */
  type: CourseType;
};

/** 내 과정 상세 조회 조건 */
export type MyCourseDetailWhere = {
  /** 과정그룹 ID (그룹 미소속 시 생략) */
  courseGroupId?: InputMaybe<Scalars['ID']>;
  /** 과정 ID */
  courseId: Scalars['ID'];
};

/** 내 차시 상세 진도 (Step Detail 목록) */
export type MyCourseLessonDetail = {
  __typename?: 'MyCourseLessonDetail';
  /** 완료 단계 수 */
  completedSteps: Scalars['Int'];
  /** 차시 ID */
  lessonId: Scalars['ID'];
  /** 차시 이름 */
  lessonName: Scalars['String'];
  /** 진도율 */
  progressRate: Scalars['Float'];
  /** 학습 상태 */
  status: ProgressStatus;
  /** 단계별 진도 상세 목록 */
  steps: Array<StepProgressItem>;
  /** 총 단계 수 */
  totalSteps: Scalars['Int'];
  /** 총 학습 시간 (초) */
  totalTime: Scalars['Int'];
};

/** 내 차시 상세 조회 조건 */
export type MyCourseLessonDetailWhere = {
  /** 과정그룹 ID (그룹 미소속 시 생략) */
  courseGroupId?: InputMaybe<Scalars['ID']>;
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 차시 ID */
  lessonId: Scalars['ID'];
};

/** 내 과정 목록 학습 상태 필터 (대시보드 learningStatus 집계와 맞춤) */
export enum MyCourseProgressFilterStatus {
  /** 전체 */
  All = 'ALL',
  /** 학습 완료 */
  Completed = 'COMPLETED',
  /** 학습 중 */
  InProgress = 'IN_PROGRESS'
}

/** 내 과정그룹 참여 정보 */
export type MyGroupParticipation = {
  __typename?: 'MyGroupParticipation';
  /** 참여 일시 */
  joinedAt: Scalars['String'];
  /** 참여자 ID */
  participantId: Scalars['ID'];
  /** 참여 상태 */
  status: CourseGroupParticipantStatusType;
};

/** 내 과정그룹 진도 요약 (리스트용) */
export type MyGroupProgressSummary = {
  __typename?: 'MyGroupProgressSummary';
  /** 완료 일시 */
  completedAt?: Maybe<Scalars['String']>;
  /** 완료 과정 수 */
  completedCourses: Scalars['Int'];
  /** 그룹 커리큘럼(idx 순) 첫 과정의 첫 Step. Step 없으면 null. */
  firstLearning?: Maybe<FirstLearning>;
  /** 마지막 접근 일시 */
  lastAccessedAt?: Maybe<Scalars['String']>;
  /**
   * 그룹 순서상 첫 미완료 학습 지점.
   * null: 미참여·그룹에 과정 없음·그룹 내 전 과정 전 Step 완료.
   */
  nextLearning?: Maybe<NextLearning>;
  /** 진도율 (0.0 ~ 1.0) */
  progressRate: Scalars['Float'];
  /** 학습 상태 */
  status: ProgressStatus;
  /** 총 과정 수 */
  totalCourses: Scalars['Int'];
  /** 총 학습 시간 (초) */
  totalTime: Scalars['Int'];
};

/** 내 과정 참여 정보 */
export type MyParticipation = {
  __typename?: 'MyParticipation';
  /** 참여 일시 */
  joinedAt: Scalars['String'];
  /** 참여자 ID */
  participantId: Scalars['ID'];
  /** 참여 상태 */
  status: CourseParticipantStatusType;
};

/** 내 과정 진도 요약 (리스트용) */
export type MyProgressSummary = {
  __typename?: 'MyProgressSummary';
  /** 실제 이수 기준 진행률 (비공개 포함 전체) */
  actualProgress: CourseProgressInfo;
  /** 완료 일시 */
  completedAt?: Maybe<Scalars['String']>;
  /** 완료 차시 수. deprecated: Use displayProgress.completedLessons */
  completedLessons: Scalars['Int'];
  /** 화면 표시 진행률 (비공개 차시/단계 제외) */
  displayProgress: CourseProgressInfo;
  /** 커리큘럼 순 첫 Step (진행도 무관). 차시/Step 없으면 null. */
  firstLearning?: Maybe<FirstLearning>;
  /** 마지막 접근 일시 */
  lastAccessedAt?: Maybe<Scalars['String']>;
  /**
   * 다음 이어하기 학습 지점.
   * null: (1) 미참여·myProgress 자체 없음 (2) 전 Step 완료 (3) 차시/Step 데이터 없음.
   * 서버 내부 진단 상수: no_course_lessons, no_steps_in_lessons, all_steps_completed 등.
   */
  nextLearning?: Maybe<NextLearning>;
  /** 진도율 (0.0 ~ 1.0). deprecated: Use displayProgress.progressRate */
  progressRate: Scalars['Float'];
  /** 학습 상태 */
  status: ProgressStatus;
  /** 총 차시 수. deprecated: Use displayProgress.totalLessons */
  totalLessons: Scalars['Int'];
  /** 총 학습 시간 (초) */
  totalTime: Scalars['Int'];
};

/**
 * 수강 중인 과정(course)의 차시(lesson) 순서를 따라 다음에 이어할 Step.
 * myCourseDetail·차시 목록과 동일한 기준(과정 내 차시 idx 순, 차시 내 Step 순).
 */
export type NextLearning = {
  __typename?: 'NextLearning';
  /** 과정그룹 ID (tracking API 호출 시 전달용, 그룹 미소속 시 null) */
  courseGroupId?: Maybe<Scalars['ID']>;
  /** 과정그룹 이름 (그룹 미소속 시 null) */
  courseGroupName?: Maybe<Scalars['String']>;
  /** 다음 학습이 속한 과정 ID */
  courseId: Scalars['ID'];
  /** 과정명 (Product 이름) */
  courseName: Scalars['String'];
  /** 차시 ID */
  lessonId: Scalars['ID'];
  /** 과정 내 차시 순번 (1부터) */
  lessonIdx: Scalars['Int'];
  /** 차시명 */
  lessonName: Scalars['String'];
  /** 다음 Step ID (차시에 Step이 없으면 null) */
  stepId?: Maybe<Scalars['ID']>;
  /** 차시 내 Step 순번 (표시 순서 기준 1부터, Step 없으면 null) */
  stepIdx?: Maybe<Scalars['Int']>;
  /** 단계명 (차시에 Step이 없으면 null) */
  stepName?: Maybe<Scalars['String']>;
  /** 해당 과정에 매핑된 전체 차시 수 (lessonIdx 맥락, 예: 3/10차시) */
  totalLessonsInCourse: Scalars['Int'];
  /** 해당 차시 전체 Step 수 (Step 없으면 0) */
  totalStepsInLesson: Scalars['Int'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Notice = {
  __typename?: 'Notice';
  attachments: Array<NoticeContentAttachment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  cursorInfo: CursorInfo;
  id: Scalars['ID'];
  isExposed: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  isTop: Scalars['Boolean'];
  language: LanguageType;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type NoticeConnection = {
  __typename?: 'NoticeConnection';
  nodes: Array<NoticeNode>;
  totalCount: Scalars['Int'];
};

export type NoticeConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NoticeConnectionOrderBy>;
  where: NoticeConnectionWhere;
};

export type NoticeConnectionOrderBy = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<NoticeConnectionOrderByFieldType>;
};

export enum NoticeConnectionOrderByFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type NoticeConnectionWhere = {
  /** 상위 고정 여부 */
  isTop?: InputMaybe<Scalars['Boolean']>;
  /** 키워드 (제목 또는 내용) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 언어 */
  language: LanguageType;
};

export type NoticeContentAttachment = Attachment & {
  __typename?: 'NoticeContentAttachment';
  id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type NoticeInput = {
  /** 공지사항 고유번호 */
  id: Scalars['ID'];
  /** 언어 */
  language: LanguageType;
};

export type NoticeNode = {
  __typename?: 'NoticeNode';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isExposed: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  isTop: Scalars['Boolean'];
  language: LanguageType;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type Notification = {
  __typename?: 'Notification';
  /** 앱 링크 ID (webLinkPath에서 마지막 경로 값 추출) */
  appLinkId?: Maybe<Scalars['String']>;
  /** 생성 날짜 */
  createdAt: Scalars['String'];
  /** 알림 내용 */
  description: Scalars['String'];
  /** 디바이스 타입 */
  deviceType: DeviceType;
  /** 아이콘 URL */
  iconUrl?: Maybe<Scalars['String']>;
  /** 알림 ID */
  id: Scalars['ID'];
  /** 유저 프로필 아이디 */
  profileId: Scalars['String'];
  /** 읽음/안읽음 상태 */
  state: NotificationState;
  /** 알림 제목 */
  title: Scalars['String'];
  /** 알림 타입 */
  type: NotificationType;
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
  /** Edge 리스트 (커서 기반 페이지네이션용) */
  edges: Array<NotificationEdge>;
  /** 알림 리스트 (하위 호환성) */
  nodes: Array<Notification>;
  pageInfo: PageInfo;
  /** 알림 수 */
  totalCount: Scalars['Int'];
};

export type NotificationConnectionInput = {
  /** 커서 기반 페이지네이션 - 이 커서 이후의 데이터 조회 */
  after?: InputMaybe<Scalars['String']>;
  /** 페이지 크기 (기본값: 10, 최대: 100) */
  first?: InputMaybe<Scalars['Int']>;
  /** 오프셋 기반 페이지네이션 - 페이지 번호 (0부터 시작) */
  offset?: InputMaybe<Scalars['Int']>;
  /** 정렬 조건 */
  orderBy?: InputMaybe<NotificationConnectionOrder>;
  /** 필터 조건 */
  where?: InputMaybe<NotificationConnectionWhere>;
};

export type NotificationConnectionOrder = {
  /** 정렬 방향 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 정렬 필드 기준 */
  field: NotificationConnectionOrderField;
};

export enum NotificationConnectionOrderField {
  CreatedAt = 'CREATED_AT',
  /** 알림 ID */
  Id = 'ID'
}

export type NotificationConnectionWhere = {
  /** 디바이스 타입 필터 (선택, 멀티선택 가능) */
  deviceTypes?: InputMaybe<Array<DeviceType>>;
  /** 알림 상태 (선택, null이면 전체) */
  state?: InputMaybe<NotificationState>;
  /** UI 타입 필터 (선택) */
  uiType?: InputMaybe<NotificationUiType>;
};

/** 알림 Edge (커서 기반 페이지네이션용) */
export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  /** 커서 (알림 ID 기반) */
  cursor: Scalars['String'];
  /** 알림 노드 */
  node: Notification;
};

export enum NotificationState {
  /** 확인 */
  Read = 'READ',
  /** 미확인 */
  Unread = 'UNREAD'
}

export enum NotificationType {
  /** 공지사항 */
  Announcement = 'ANNOUNCEMENT',
  /** 문의 답변 */
  InquiryReply = 'INQUIRY_REPLY',
  /** 시스템 알림 */
  System = 'SYSTEM'
}

export enum NotificationUiType {
  /** 알림함 알림 */
  Noti = 'NOTI',
  /** 팝업 알림 */
  Popup = 'POPUP'
}

export enum NotifyingServiceType {
  ModifactoryCircuitArchitecture = 'MODIFACTORY_CIRCUIT_ARCHITECTURE'
}

export enum OpenType {
  All = 'ALL',
  Close = 'CLOSE',
  Delete = 'DELETE',
  Open = 'OPEN'
}

export enum OrderDirectionType {
  Asc = 'ASC',
  Desc = 'DESC'
}

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

/** V2 Input for file upload presigned URL */
export type PresignedFileUploadInput = {
  /** File name with extension */
  fileName: Scalars['String'];
  /** File size in bytes */
  fileSize: Scalars['Int'];
  /** MIME type of the file (e.g., image/jpeg) */
  fileType: Scalars['String'];
};

/** V2 Response for file upload presigned URL */
export type PresignedFileUploadV2 = {
  __typename?: 'PresignedFileUploadV2';
  /** CloudFront URL for accessing the uploaded file */
  accessUrl: Scalars['String'];
  /** Expiration time in seconds */
  expiresIn: Scalars['Int'];
  /** Unique upload tracking ID */
  uploadId: Scalars['String'];
  /** Presigned PUT URL for uploading to S3 (private ACL) */
  uploadUrl: Scalars['String'];
};

export type PresignedHeader = {
  __typename?: 'PresignedHeader';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type PresignedMultiUrlsForFileUpload = {
  __typename?: 'PresignedMultiUrlsForFileUpload';
  uploads: Array<PresignedUploadWithHeaders>;
  /** @deprecated Use uploads instead */
  urls: Array<Scalars['String']>;
};

export type PresignedMultiUrlsForFileUploadInput = {
  params: Array<PresignedUrlForFileUploadParam>;
};

export type PresignedUploadWithHeaders = {
  __typename?: 'PresignedUploadWithHeaders';
  requiredHeaders: Array<PresignedHeader>;
  url: Scalars['String'];
};

export type PresignedUrlForFileUpload = {
  __typename?: 'PresignedUrlForFileUpload';
  accessUrl?: Maybe<Scalars['String']>;
  requiredHeaders: Array<PresignedHeader>;
  url: Scalars['String'];
};

export type PresignedUrlForFileUploadParam = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
};

export type PresignedUrlForVideoUpload = {
  __typename?: 'PresignedUrlForVideoUpload';
  requiredHeaders: Array<PresignedHeader>;
  url: Scalars['String'];
};

/** V2 Input for video upload presigned URL */
export type PresignedVideoUploadInput = {
  /** File name with extension */
  fileName: Scalars['String'];
  /** File size in bytes */
  fileSize: Scalars['Int'];
  /** MIME type of the file (e.g., video/mp4) */
  fileType: Scalars['String'];
};

/** V2 Response for video upload presigned URL */
export type PresignedVideoUploadV2 = {
  __typename?: 'PresignedVideoUploadV2';
  /** CloudFront URL for accessing the uploaded file */
  accessUrl: Scalars['String'];
  /** Expiration time in seconds */
  expiresIn: Scalars['Int'];
  /** Unique upload tracking ID */
  uploadId: Scalars['String'];
  /** Presigned PUT URL for uploading to S3 (private ACL) */
  uploadUrl: Scalars['String'];
};

/** 프로필 정보 */
export type Profile = {
  __typename?: 'Profile';
  /** 생년월일 */
  birthdate?: Maybe<Scalars['String']>;
  /** 거주 도시 */
  city?: Maybe<Scalars['String']>;
  /** 코딩 경험 */
  codingExperienceTypeList?: Maybe<Array<Scalars['String']>>;
  /** 연락용 이메일 */
  contactEmail?: Maybe<Scalars['String']>;
  /** 연락용 이메일 인증 여부 */
  contactEmailVerified: Scalars['Boolean'];
  /** 국제전화번호 (ex. +82) */
  countryCallingCode?: Maybe<Scalars['String']>;
  /** 고유번호 */
  id: Scalars['ID'];
  /** 이름 */
  name?: Maybe<Scalars['String']>;
  /** 닉네임 */
  nickname?: Maybe<Scalars['String']>;
  /** 핸드폰 번호 (ex. 01012341234) */
  phoneNumber?: Maybe<Scalars['String']>;
  /** 거주 지역/국가 */
  region?: Maybe<Scalars['String']>;
  /** 썸네일 이미지 */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** 유저 고유번호 */
  userId: Scalars['String'];
};

/** 학습 진도 상태 */
export enum ProgressStatus {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}

export type Project = Node & {
  __typename?: 'Project';
  codeType: ProjectCodeType;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  infoCode: Scalars['Int'];
  infoMessage: Scalars['String'];
  isFavorite: Scalars['Boolean'];
  jsonData: Scalars['String'];
  runType: ProjectRunType;
  thumb: ImageInfo;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
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
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT'
}

export type ProjectConnectionOrder = {
  direction?: InputMaybe<OrderDirectionType>;
  field: ProjectConnectionField;
};

export type ProjectConnectionWhere = {
  filter?: InputMaybe<Scalars['String']>;
  isFavorite?: InputMaybe<Scalars['Boolean']>;
  runType?: InputMaybe<ProjectRunType>;
  userKey?: InputMaybe<Scalars['String']>;
};

export enum ProjectCreateType {
  Copy = 'COPY',
  Normal = 'NORMAL',
  Upload = 'UPLOAD'
}

export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  cursor: Scalars['String'];
  node: Project;
};

export type ProjectNameExistWhere = {
  title: Scalars['String'];
  userKey?: InputMaybe<Scalars['String']>;
};

export enum ProjectRunType {
  Realtime = 'REALTIME',
  Upload = 'UPLOAD'
}

export enum ProjectUpdateType {
  Normal = 'NORMAL',
  Rename = 'RENAME'
}

export type ProjectWhere = {
  id: Scalars['ID'];
  userKey?: InputMaybe<Scalars['String']>;
};

/** 보호자 정보 */
export type Protector = {
  __typename?: 'Protector';
  /** 국제전화번호 */
  countryCallingCode?: Maybe<Scalars['String']>;
  /** 이메일 */
  email?: Maybe<Scalars['String']>;
  /** 이름 */
  name?: Maybe<Scalars['String']>;
  /** 휴대폰 번호 */
  phoneNumber?: Maybe<Scalars['String']>;
  /** 이메일 인증 여부 */
  verified: Scalars['Boolean'];
};

export type ProtectorInput = {
  /** 인증 코드 (보호자 이메일 인증 시 받은 코드) */
  authCode?: InputMaybe<Scalars['String']>;
  /** 국제전화번호 */
  countryCallingCode?: InputMaybe<Scalars['String']>;
  /** 이메일 */
  email?: InputMaybe<Scalars['String']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 휴대폰 번호 (ex. 01012341234) */
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** 상세주소 조회 */
  address: Address;
  /** 주소 목록 조회 */
  addressList: Array<Address>;
  /** [관리자] 문의 상세 조회 */
  adminContact: Contact;
  /** [관리자] 문의 목록 조회 */
  adminContactConnection: ContactConnection;
  /** [관리자] 문의 상태별 통계 조회 */
  adminContactStatusStatistics: ContactStatusStatistics;
  /** [관리자] FAQ 상세조회 */
  adminFaq: AdminFaq;
  /** [관리자] FAQ 목록 조회 */
  adminFaqConnection: AdminFaqConnection;
  /** [관리자] 자료 상세조회 */
  adminLibrary: AdminLibrary;
  /** [관리자] 자료 목록 조회 */
  adminLibraryConnection: AdminLibraryConnection;
  /** [관리자] 공지사항 상세조회 */
  adminNotice: AdminNotice;
  /** [관리자] 공지사항 목록 조회 */
  adminNoticeConnection: AdminNoticeConnection;
  /** [관리자] 유저 상세 조회 */
  adminUser: AdminUser;
  /** [관리자] 유저 목록 조회 */
  adminUserConnection: AdminUserConnection;
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
  /**
   * AI 모델 이름 중복 여부 확인
   * 사용자 계정 + 모델 이름 조합으로 중복 확인
   */
  checkAIModelNameDuplicate: Scalars['Boolean'];
  /** 문의 상세 조회 */
  contact: Contact;
  /** 문의 목록 조회 */
  contactConnection: ContactConnection;
  /** 코스 조회 */
  course: Course;
  /** 참여자 출결 상태 조회 */
  courseAttendance: Attendance;
  /** 과정의 참여자 출결 상태 목록 조회 (Admin) */
  courseAttendanceResult: Array<AttendanceResult>;
  /** 코스 목록 조회 */
  courseConnection: CourseConnection;
  /** 과정그룹 조회 */
  courseGroup: CourseGroup;
  /** 과정그룹 목록 조회 */
  courseGroupConnection: CourseGroupConnection;
  /** 과정 그룹 참여자 목록 조회 */
  courseGroupParticipantConnection: CourseGroupParticipantConnection;
  /** 추천 과정 그룹 (kind별 목록). first 기본 4, 상한 20. */
  courseGroupRecommends: Array<CourseGroupRecommendation>;
  /** 레슨 단건 조회 */
  courseLesson: CourseLesson;
  /** 레슨 목록 조회 (전체 레슨, 과정 등록 시 선택용). where.courseId 있으면 해당 과정 차시만+과정별 피드백 집계, 없으면 전체 레슨+레슨별 전체(모든 과정) 피드백 집계(관리자) */
  courseLessonConnection: CourseLessonConnection;
  /** 학생 레슨(차시) 피드백 조회 (Admin 또는 본인) */
  courseParticipantLessonFeedback: CourseParticipantLessonFeedback;
  /** 학생 레슨(차시) 피드백 목록 (관리자용, lessonId 기준) */
  courseParticipantLessonFeedbackConnection: CourseParticipantLessonFeedbackConnection;
  /** 관리자: 과정별 학습자 진도 목록 */
  courseProgressList: CourseProgressConnection;
  /** 퀴즈 조회 */
  courseQuiz: CourseQuiz;
  /** 퀴즈 목록 조회 */
  courseQuizConnection: CourseQuizConnection;
  /** 추천 과정 (kind별 목록). first 기본 4, 상한 20. */
  courseRecommends: Array<CourseRecommendation>;
  /** 단계 조회 */
  courseStep: CourseStep;
  /** 코스 Step 통계 요약 (타입별 수, 총 재생시간, 페이지/슬라이드 수, 분석 완료율) */
  courseStepAnalyticsSummary: StepAnalyticsSummary;
  /** 단계 목록 조회 */
  courseStepConnection: CourseStepConnection;
  /** 단계 보조자료 조회 */
  courseStepSupplementaryData: CourseSupplementaryData;
  /** 태그 카테고리 목록 조회 */
  courseTagCategories?: Maybe<Array<CourseTagCategory>>;
  /** 태그 목록 조회 */
  courseTags: Array<CourseTag>;
  /**
   * [관리자] 유저의 effective permissions 조회.
   *
   * RBAC_ENABLED=false → 빈 집합 (CR-4 contract).
   * RBAC_ENABLED=true  → 활성 grant 기반 결과.
   */
  effectivePermissions: EffectivePermissions;
  /** FAQ 상세조회 */
  faq: Faq;
  /** FAQ 목록 조회 */
  faqConnection: FaqConnection;
  /** 기간별 학습 통계 (본인). courseId·stepType으로 필터 가능. */
  learningAnalytics: LearningAnalytics;
  /** 타입별 학습시간 집계 (본인) */
  learningTimeByType: Array<LearningTimeByType>;
  /** 레슨 Step 통계 요약 */
  lessonStepAnalyticsSummary: StepAnalyticsSummary;
  /** 자료 상세조회 */
  library: Library;
  /** 자료 목록 조회 */
  libraryConnection: LibraryConnection;
  /** 모디 데이터 상세조회 */
  modiData: ModiData;
  /** 모디 데이터 목록 조회 */
  modiDataConnection: ModiDataConnection;
  /** 내 과정 목록: 수강 신청(Participant, PENDING/CANCELED 제외) + 학습 진도(CourseProgress)가 있는 과정. 대시보드와 병렬 쿼리 시 where.status로 탭 필터. */
  myCourseConnection: CourseConnection;
  /** 학습자 대시보드 (최근 학습 + 학습 현황). 인증 사용자, 1회 호출로 조회. my* = 본인 데이터. */
  myCourseDashboard: MyCourseDashboard;
  /** 내 과정 상세 진도 (차시 Summary 목록). myCourseConnection에서 과정 선택 후, 해당 과정의 다음 할 차시·진도 상세 조회용. */
  myCourseDetail: MyCourseDetail;
  /** 내가 수강 신청한 과정 그룹 목록 조회 (인증 사용자, requestCourseGroup으로 등록한 그룹) */
  myCourseGroupConnection: CourseGroupConnection;
  /** 내 차시 상세 진도 (Step Detail 목록). myCourseDetail의 lessons에서 차시 선택 후, 해당 차시의 다음 할 Step·진도 상세 조회용. */
  myCourseLessonDetail: MyCourseLessonDetail;
  /** 공지사항 상세조회 */
  notice: Notice;
  /** 공지사항 목록 조회 */
  noticeConnection: NoticeConnection;
  /** 템플릿 기반 사용자 알림 목록 조회 (인증 필수, 관리자는 전체 조회) */
  notificationConnection: NotificationConnection;
  /** 읽지 않은 알림 개수 조회 (인증 필수, 본인의 알림만) */
  notificationUnreadCount: Scalars['Int'];
  /** 멀티 업로드 presigned url */
  presignedMultiUrlsForFileUpload?: Maybe<PresignedMultiUrlsForFileUpload>;
  presignedUrlForFileUpload?: Maybe<PresignedUrlForFileUpload>;
  /**
   * V2: Secure presigned URL for file upload with validation
   * Returns private ACL presigned URL with file validation
   */
  presignedUrlForFileUploadV2: PresignedFileUploadV2;
  presignedUrlForVideoUpload?: Maybe<PresignedUrlForVideoUpload>;
  /**
   * V2: Secure presigned URL for video upload with validation
   * Returns private ACL presigned URL with file validation
   */
  presignedUrlForVideoUploadV2: PresignedVideoUploadV2;
  /** 프로필 조회 */
  profile: Profile;
  project: Project;
  projectConnection: ProjectConnection;
  projectNameExist: Scalars['Boolean'];
  /** 특정 Step의 반복 학습 이력 (본인) */
  stepLearningHistory: Array<LearningSessionItem>;
  /** 팀 상세 조회 */
  team: Team;
  /** 팀 상세주소 조회 */
  teamAddress: TeamAddress;
  /** 팀 주소 목록 조회 */
  teamAddressList: Array<TeamAddress>;
  /** 팀 목록 조회 */
  teamList: Array<Team>;
  /** 팀원 목록 조회 */
  teamMemberConnection: TeamMemberConnection;
  /** 팀에 초대할 유저 검색 */
  teamSearchUserConnection: TeamSearchUserConnection;
  /** @deprecated Use `singleUploadFile or multiUploadFile`. */
  uploadImageConnection: UploadImageConnection;
  /** 유저 정보 조회 */
  user: User;
};


export type QueryAddressArgs = {
  input: AddressInput;
};


export type QueryAdminContactArgs = {
  input: AdminContactInput;
};


export type QueryAdminContactConnectionArgs = {
  input: AdminContactConnectionInput;
};


export type QueryAdminFaqArgs = {
  input: AdminFaqInput;
};


export type QueryAdminFaqConnectionArgs = {
  input: AdminFaqConnectionInput;
};


export type QueryAdminLibraryArgs = {
  input: AdminLibraryInput;
};


export type QueryAdminLibraryConnectionArgs = {
  input: AdminLibraryConnectionInput;
};


export type QueryAdminNoticeArgs = {
  input: AdminNoticeInput;
};


export type QueryAdminNoticeConnectionArgs = {
  input: AdminNoticeConnectionInput;
};


export type QueryAdminUserArgs = {
  input: AdminUserInput;
};


export type QueryAdminUserConnectionArgs = {
  input: AdminUserConnectionInput;
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


export type QueryCheckAiModelNameDuplicateArgs = {
  input: CheckAiModelNameDuplicateInput;
};


export type QueryContactArgs = {
  input: ContactInput;
};


export type QueryContactConnectionArgs = {
  input: ContactConnectionInput;
};


export type QueryCourseArgs = {
  where: CourseWhere;
};


export type QueryCourseAttendanceArgs = {
  where: CourseAttendanceWhere;
};


export type QueryCourseAttendanceResultArgs = {
  where: CourseAttendanceResultWhere;
};


export type QueryCourseConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseConnectionOrder>;
  where?: InputMaybe<CourseConnectionWhere>;
};


export type QueryCourseGroupArgs = {
  where: CourseGroupWhere;
};


export type QueryCourseGroupConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseGroupConnectionOrderBy>;
  where?: InputMaybe<CourseGroupConnectionWhere>;
};


export type QueryCourseGroupParticipantConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  where: CourseGroupParticipantConnectionWhere;
};


export type QueryCourseGroupRecommendsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  kinds: Array<CourseGroupRecommendKind>;
};


export type QueryCourseLessonArgs = {
  where: CourseLessonWhere;
};


export type QueryCourseLessonConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseLessonConnectionOrder>;
  where?: InputMaybe<CourseLessonConnectionWhere>;
};


export type QueryCourseParticipantLessonFeedbackArgs = {
  where: CourseParticipantLessonFeedbackWhere;
};


export type QueryCourseParticipantLessonFeedbackConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  where: CourseParticipantLessonFeedbackConnectionWhere;
};


export type QueryCourseProgressListArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  where: CourseProgressListWhere;
};


export type QueryCourseQuizArgs = {
  where: CourseQuizWhere;
};


export type QueryCourseQuizConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseQuizConnectionOrder>;
  where?: InputMaybe<CourseQuizConnectionWhere>;
};


export type QueryCourseRecommendsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  kinds: Array<CourseRecommendKind>;
};


export type QueryCourseStepArgs = {
  where: CourseStepWhere;
};


export type QueryCourseStepAnalyticsSummaryArgs = {
  courseId: Scalars['ID'];
};


export type QueryCourseStepConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseStepConnectionOrder>;
  where?: InputMaybe<CourseStepConnectionWhere>;
};


export type QueryCourseStepSupplementaryDataArgs = {
  where: CourseStepSupplementaryDataWhere;
};


export type QueryCourseTagsArgs = {
  where?: InputMaybe<CourseTagsWhere>;
};


export type QueryEffectivePermissionsArgs = {
  input: EffectivePermissionsInput;
};


export type QueryFaqArgs = {
  input: FaqInput;
};


export type QueryFaqConnectionArgs = {
  input: FaqConnectionInput;
};


export type QueryLearningAnalyticsArgs = {
  courseId?: InputMaybe<Scalars['String']>;
  period: AnalyticsPeriod;
  stepType?: InputMaybe<CourseStepDType>;
};


export type QueryLessonStepAnalyticsSummaryArgs = {
  lessonId: Scalars['ID'];
};


export type QueryLibraryArgs = {
  input: LibraryInput;
};


export type QueryLibraryConnectionArgs = {
  input: LibraryConnectionInput;
};


export type QueryModiDataArgs = {
  input: ModiDataInput;
};


export type QueryModiDataConnectionArgs = {
  input: ModiDataConnectionInput;
};


export type QueryMyCourseConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseConnectionOrder>;
  where?: InputMaybe<MyCourseConnectionWhere>;
};


export type QueryMyCourseDetailArgs = {
  where: MyCourseDetailWhere;
};


export type QueryMyCourseGroupConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryMyCourseLessonDetailArgs = {
  where: MyCourseLessonDetailWhere;
};


export type QueryNoticeArgs = {
  input: NoticeInput;
};


export type QueryNoticeConnectionArgs = {
  input: NoticeConnectionInput;
};


export type QueryNotificationConnectionArgs = {
  input: NotificationConnectionInput;
};


export type QueryNotificationUnreadCountArgs = {
  deviceTypes?: InputMaybe<Array<DeviceType>>;
};


export type QueryPresignedMultiUrlsForFileUploadArgs = {
  input: PresignedMultiUrlsForFileUploadInput;
};


export type QueryPresignedUrlForFileUploadArgs = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
};


export type QueryPresignedUrlForFileUploadV2Args = {
  input: PresignedFileUploadInput;
};


export type QueryPresignedUrlForVideoUploadArgs = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
};


export type QueryPresignedUrlForVideoUploadV2Args = {
  input: PresignedVideoUploadInput;
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


export type QueryStepLearningHistoryArgs = {
  courseId: Scalars['String'];
  lessonId: Scalars['String'];
  stepId: Scalars['String'];
};


export type QueryTeamArgs = {
  input: TeamInput;
};


export type QueryTeamAddressArgs = {
  input: TeamAddressInput;
};


export type QueryTeamAddressListArgs = {
  input: TeamAddressListInput;
};


export type QueryTeamMemberConnectionArgs = {
  input: TeamMemberConnectionInput;
};


export type QueryTeamSearchUserConnectionArgs = {
  input: TeamSearchUserConnectionInput;
};


export type QueryUploadImageConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UploadImageConnectionOrder>;
  where?: InputMaybe<UploadImageConnectionWhere>;
};

/** 최근 학습 1건 */
export type RecentLearning = {
  __typename?: 'RecentLearning';
  /** 과정 정보 (기존 Course 타입) */
  course: Course;
  /** 과정그룹 ID (tracking API 호출 시 전달용, 그룹 미소속 시 null) */
  courseGroupId?: Maybe<Scalars['ID']>;
  /** 진도 요약 (기존 MyProgressSummary) */
  progress: MyProgressSummary;
};

export type RefreshTokenInput = {
  /** 리프레시 토큰 */
  refreshToken: Scalars['String'];
};

export type RemoveCoursesFromCourseGroupInput = {
  /** 과정그룹 ID */
  courseGroupId: Scalars['ID'];
  /** 제거할 과정 ID 목록 */
  courseIds: Array<Scalars['ID']>;
};

export type RemoveLessonsFromCourseInput = {
  /** 코스 ID */
  courseId: Scalars['ID'];
  /** 제거할 레슨 ID 목록 */
  lessonIds: Array<Scalars['ID']>;
};

export type RemoveProjectFavoriteInput = {
  projectId: Scalars['ID'];
  userKey?: InputMaybe<Scalars['String']>;
};

export type RemoveStepsFromLessonInput = {
  /** 레슨 ID */
  lessonId: Scalars['ID'];
  /** 제거할 단계 ID 목록 */
  stepIds: Array<Scalars['ID']>;
};

export type ReorderCourseGroupsInput = {
  /** 새 순서의 과정그룹 ID 목록 */
  courseGroupIds: Array<Scalars['ID']>;
};

export type ReorderCoursesInCourseGroupInput = {
  /** 과정그룹 ID */
  courseGroupId: Scalars['ID'];
  /** 새 순서의 과정 ID 목록 */
  courseIds: Array<Scalars['ID']>;
};

export type ReorderLessonsInCourseInput = {
  /** 코스 ID */
  courseId: Scalars['ID'];
  /** 새 순서의 레슨 ID 목록 */
  lessonIds: Array<Scalars['ID']>;
};

export type ReorderStepsInLessonInput = {
  /** 레슨 ID */
  lessonId: Scalars['ID'];
  /** 새 순서의 단계 ID 목록 */
  stepIds: Array<Scalars['ID']>;
};

export type RequestCourseGroupInput = {
  /** 과정 그룹 ID */
  courseGroupId: Scalars['ID'];
};

/** 그룹 참여 신청 결과 */
export type RequestCourseGroupOutput = {
  __typename?: 'RequestCourseGroupOutput';
  /** 과정 그룹 ID */
  courseGroupId?: Maybe<Scalars['ID']>;
  /** 성공 여부 */
  result: Scalars['Boolean'];
};

export type RequestCourseInput = {
  /** 코스 ID */
  courseId: Scalars['ID'];
  /** 개강일 (교육자주도학습 - Required, 자기주도학습 - Optional) */
  startDateTime?: InputMaybe<Scalars['String']>;
};

/** 코스 신청 결과 */
export type RequestCourseOutput = {
  __typename?: 'RequestCourseOutput';
  /** 과정 ID */
  courseId?: Maybe<Scalars['ID']>;
  /** 결과 */
  result: Scalars['Boolean'];
};

/** requestCoursePublish 입력. scheduledPublishAt 이 있으면 예약 공개, 없으면 즉시 공개 요청. */
export type RequestCoursePublishInput = {
  reason: Scalars['String'];
  revisionId: Scalars['Int'];
  scheduledPublishAt?: InputMaybe<Scalars['String']>;
};

export type ResetPassword = {
  __typename?: 'ResetPassword';
  success: Scalars['Boolean'];
};

export type ResetPasswordInput = {
  /** 비밀번호 재설정 인증 코드 */
  authCode: Scalars['String'];
  /** 이메일 */
  email: Scalars['String'];
  /** 새 비밀번호 */
  newPassword: Scalars['String'];
};

/** 탈퇴 계정 복구 입력 (사용자용) */
export type RestoreAccountInput = {
  /** 인증 코드 */
  authCode: Scalars['String'];
  /** 이메일 */
  email: Scalars['String'];
};

export type RevokeAdminRole = {
  __typename?: 'RevokeAdminRole';
  /** 회수 성공 여부 */
  success: Scalars['Boolean'];
};

export type RevokeAdminRoleInput = {
  /** 회수할 grant ID */
  grantId: Scalars['ID'];
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
  /**
   * 모듈 유형 (Button, ToF, IMU 등)
   *
   * 모델 유형이 모디일 경우에만 필수
   */
  moduleType?: InputMaybe<Scalars['String']>;
  /** 모델명 */
  name: Scalars['String'];
  /** 클래스 목록 인풋 */
  platClassifiers: Array<CreatePlatClassifierInput>;
  /** 검증 데이터 비율 */
  validationDataRate: Scalars['Float'];
};

/**
 * saveCourseDraft 입력. DRAFT 상태의 revision content 를 부분 갱신.
 * 모든 필드는 optional — 명시한 필드만 변경, 나머지는 그대로 유지.
 */
export type SaveCourseDraftInput = {
  caution?: InputMaybe<Scalars['String']>;
  codeEditorType?: InputMaybe<Scalars['String']>;
  difficulty?: InputMaybe<Scalars['String']>;
  educationalPlanExtension?: InputMaybe<Scalars['String']>;
  educationalPlanFileName?: InputMaybe<Scalars['String']>;
  educationalPlanFileSizeInBytes?: InputMaybe<Scalars['Int']>;
  educationalPlanUrl?: InputMaybe<Scalars['String']>;
  feature?: InputMaybe<Scalars['String']>;
  language?: InputMaybe<Scalars['String']>;
  maxAge?: InputMaybe<Scalars['Int']>;
  maxParticipant?: InputMaybe<Scalars['Int']>;
  minAge?: InputMaybe<Scalars['Int']>;
  minParticipant?: InputMaybe<Scalars['Int']>;
  recruitmentTarget?: InputMaybe<Scalars['String']>;
  requiredPreparation?: InputMaybe<Scalars['String']>;
  revisionId: Scalars['Int'];
  teachingMaterialsExtension?: InputMaybe<Scalars['String']>;
  teachingMaterialsFileName?: InputMaybe<Scalars['String']>;
  teachingMaterialsFileSizeInBytes?: InputMaybe<Scalars['Int']>;
  teachingMaterialsUrl?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type SearchUser = {
  __typename?: 'SearchUser';
  /** 이메일 */
  email: Scalars['String'];
  /** 이름 */
  name?: Maybe<Scalars['String']>;
  /** 닉네임 */
  nickname?: Maybe<Scalars['String']>;
  /** 썸네일 이미지 */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** 유저 고유번호 */
  userId: Scalars['ID'];
  /** UUID */
  uuid: Scalars['String'];
};

export type SearchUserInput = {
  /** 검색어 (name 또는 email) */
  keyword: Scalars['String'];
};

export type SendEmailVerificationCode = {
  __typename?: 'SendEmailVerificationCode';
  success: Scalars['Boolean'];
};

export type SendEmailVerificationCodeInput = {
  /** 인증 유형 */
  authType: AuthType;
  /** 이메일 */
  email: Scalars['String'];
};

export enum SendType {
  Email = 'EMAIL',
  Http = 'HTTP',
  Ws = 'WS'
}

export enum ServiceType {
  Allthatcoding = 'ALLTHATCODING',
  Home = 'HOME',
  Letsmodi = 'LETSMODI',
  Lms = 'LMS',
  Makingpack = 'MAKINGPACK',
  Modifactory = 'MODIFACTORY',
  Modiplanet = 'MODIPLANET'
}

export type SessionOnetimeCode = {
  __typename?: 'SessionOnetimeCode';
  /** 원타임 코드 */
  code: Scalars['String'];
};

export type SessionOnetimeCodeInput = {
  /** 사용되지 않는 필드 (GraphQL은 빈 input을 허용하지 않음) */
  _unused?: InputMaybe<Scalars['Boolean']>;
};

/**
 * 비활성 사용자 테스트 설정 입력 (DEV/LOCAL 전용)
 * 사용자의 last_login_at을 과거로 설정하여 비활성 사용자 알림/삭제 테스트
 */
export type SetUserInactivityForTestInput = {
  /**
   * 테스트 모드 (11개월 또는 12개월)
   * - ELEVEN_MONTHS: 335일 전 (경고 알림 테스트)
   * - TWELVE_MONTHS: 365일 전 (데이터 삭제 테스트)
   */
  mode: InactivityTestModeType;
  /**
   * 스케줄러 즉시 실행 여부 (기본값: true)
   * - true: 설정 후 즉시 스케줄러 실행하여 알림 발송
   * - false: last_login_at만 변경하고 스케줄러는 수동 실행
   */
  runSchedulerImmediately?: InputMaybe<Scalars['Boolean']>;
  /**
   * 테스트 대상 사용자 ID (선택)
   * - 없으면: 본인 테스트 (누구나 가능)
   * - 있으면: 지정한 사용자 테스트 (관리자만 가능)
   */
  userId?: InputMaybe<Scalars['ID']>;
};

/** 비활성 사용자 테스트 설정 결과 (DEV/LOCAL 전용) */
export type SetUserInactivityForTestResult = {
  __typename?: 'SetUserInactivityForTestResult';
  /** 설정된 last_login_at (ISO 8601 형식) */
  lastLoginAt: Scalars['String'];
  /** 메시지 */
  message: Scalars['String'];
  /** 테스트 모드 */
  mode: InactivityTestModeType;
  /** 스케줄러 실행 여부 */
  schedulerExecuted: Scalars['Boolean'];
  /** 성공 여부 */
  success: Scalars['Boolean'];
  /** 테스트 대상 사용자 ID */
  userId: Scalars['ID'];
};

export type SignInInput = {
  /** 이메일 */
  email: Scalars['String'];
  /** 비밀번호 */
  password: Scalars['String'];
};

export type SignOut = {
  __typename?: 'SignOut';
  success: Scalars['Boolean'];
};

export type SignUpInput = {
  /** 생년월일 (ex. 1990-01-01) */
  birthdate?: InputMaybe<Scalars['String']>;
  /** 이메일 */
  email: Scalars['String'];
  /** 이메일 마케팅 정보 수신 동의 */
  emailMarketingConsent?: InputMaybe<Scalars['Boolean']>;
  /** 비밀번호 */
  password: Scalars['String'];
  /** 개인정보 수집 및 이용 동의 */
  personalInfoConsent?: InputMaybe<Scalars['Boolean']>;
  /** 개인정보처리방침 동의 */
  privacyPolicyConsent: Scalars['Boolean'];
  /** 보호자 (14세 미만일 경우 법정대리인) */
  protector?: InputMaybe<ProtectorInput>;
  /** 역할 */
  roleType?: InputMaybe<UserRoleType>;
  /** SMS 마케팅 정보 수신 동의 */
  smsMarketingConsent?: InputMaybe<Scalars['Boolean']>;
  /** 서비스 이용약관 동의 */
  termsOfServiceConsent: Scalars['Boolean'];
};

/** 가입 유형 */
export enum SignUpType {
  /** APPLE */
  Apple = 'APPLE',
  /** 이메일 회원가입 */
  Email = 'EMAIL',
  /** 구글 회원가입 */
  Google = 'GOOGLE',
  /** 카카오 */
  Kakao = 'KAKAO'
}

/** SingleUploadFileInput 단일 파일 업로드 Input */
export type SingleUploadFileInput = {
  file: Scalars['Upload'];
  functionType: UploadFileType;
  id?: InputMaybe<Scalars['String']>;
};

export type SocialSignIn = {
  __typename?: 'SocialSignIn';
  /** 소셜 로그인 성공 여부 */
  success: Scalars['Boolean'];
  /**
   * 유저 정보
   * - 가입 된 유저의 경우 전달
   * - 또는 미가입 유저이지만 별도의 추가 정보가 필요 없는 경우 전달 (ex. 소셜 로그인 시 이메일만 필요한 경우)
   */
  user?: Maybe<User>;
  /**
   * 소셜 로그인 유저 정보
   * - 미가입 유저의 경우 전달
   */
  userInfo?: Maybe<SocialUserInfo>;
};

export type SocialSignInInput = {
  /** 인가코드 */
  code: Scalars['String'];
  /** 가입 유형 */
  signUpType: SignUpType;
};

export type SocialSignUpInput = {
  /** 생년월일 (ex. 1990-01-01) */
  birthdate?: InputMaybe<Scalars['String']>;
  /** 이메일 마케팅 정보 수신 동의 */
  emailMarketingConsent?: InputMaybe<Scalars['Boolean']>;
  /** 개인정보 수집 및 이용 동의 */
  personalInfoConsent?: InputMaybe<Scalars['Boolean']>;
  /** 개인정보처리방침 동의 */
  privacyPolicyConsent: Scalars['Boolean'];
  /** 보호자 (14세 미만일 경우 법정대리인) */
  protector?: InputMaybe<ProtectorInput>;
  /** 역할 */
  roleType?: InputMaybe<UserRoleType>;
  /** 회원가입 타입 */
  signUpType: SignUpType;
  /** SMS 마케팅 정보 수신 동의 */
  smsMarketingConsent?: InputMaybe<Scalars['Boolean']>;
  /** 소셜 고유번호 */
  socialId: Scalars['String'];
  /** 이용약관 동의 */
  termsOfServiceConsent: Scalars['Boolean'];
};

/**
 * 소셜 로그인 유저 정보
 * - 미가입 유저의 경우 전달
 */
export type SocialUserInfo = {
  __typename?: 'SocialUserInfo';
  /** 생년월일 */
  birthday?: Maybe<Scalars['String']>;
  /** 이메일 */
  email: Scalars['String'];
  /** 성별 */
  gender?: Maybe<Scalars['String']>;
  /** 이름 */
  name: Scalars['String'];
  /** social id */
  userId: Scalars['ID'];
};

/** Step 학습 시작 입력 */
export type StartStepInput = {
  /** 과정그룹 ID (그룹 미소속 시 생략) */
  courseGroupId?: InputMaybe<Scalars['ID']>;
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 차시 ID */
  lessonId: Scalars['ID'];
  /** 단계 ID */
  stepId: Scalars['ID'];
};

/** Step 통계 요약 (Course/Lesson 단위) */
export type StepAnalyticsSummary = {
  __typename?: 'StepAnalyticsSummary';
  /** 분석 완료 Step 수 (분석 대상 타입 중 COMPLETE) */
  analysisCompleteCount: Scalars['Int'];
  /** 분석 완료율 (0.0 ~ 1.0) */
  analysisCompleteRate: Scalars['Float'];
  /** 분석 대상 Step 수 (VOD/PDF/PPT만) */
  analysisTargetCount: Scalars['Int'];
  /** 타입별 Step 수 */
  stepCountByType: StepCountByType;
  /** 총 VOD 재생시간 (초) */
  totalDurationInSecond: Scalars['Int'];
  /** 총 PDF 페이지 수 */
  totalPdfPages: Scalars['Int'];
  /** 총 PPT 슬라이드 수 */
  totalPptSlides: Scalars['Int'];
  /** 총 Step 수 */
  totalStepCount: Scalars['Int'];
};

/** 타입별 Step 수 */
export type StepCountByType = {
  __typename?: 'StepCountByType';
  /** 코딩 수 */
  coding: Scalars['Int'];
  /** PDF 수 */
  pdf: Scalars['Int'];
  /** PPT 수 */
  ppt: Scalars['Int'];
  /** 퀴즈 수 */
  quiz: Scalars['Int'];
  /** 텍스트북 수 */
  textBook: Scalars['Int'];
  /** VOD 수 */
  vod: Scalars['Int'];
};

/** 레슨 내 단계 (레슨–단계 조인 기준, M:N) */
export type StepInLesson = {
  __typename?: 'StepInLesson';
  /** 유효 상태 (원본 Step 기반) */
  effectiveStatus: CourseVisibilityStatus;
  /** 표시 순서 */
  idx: Scalars['Int'];
  /** 조인/원본 기준 상태 (Step 공개 여부 반영) */
  state: CourseStateType;
  /** 단계(Step) */
  step: CourseStep;
};

/** 단계 진도 항목 */
export type StepProgressItem = {
  __typename?: 'StepProgressItem';
  /** 시도 횟수 */
  attemptCount: Scalars['Int'];
  /** 완료 일시 */
  completedAt?: Maybe<Scalars['String']>;
  /** 유형별 상세 데이터 (JSON 문자열) */
  detail?: Maybe<Scalars['String']>;
  /** 참여 시간 (초) */
  joinedTime: Scalars['Int'];
  /** 마지막 접근 일시 */
  lastAccessedAt?: Maybe<Scalars['String']>;
  /** 진도율 */
  progressRate: Scalars['Float'];
  /** 점수 */
  score?: Maybe<Scalars['Float']>;
  /** 학습 시작 일시 */
  startedAt?: Maybe<Scalars['String']>;
  /** 학습 상태 */
  status: ProgressStatus;
  /** 단계 ID */
  stepId: Scalars['ID'];
  /** 단계 이름 */
  stepName: Scalars['String'];
  /** 단계 유형 */
  stepType: CourseStepDType;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** 새 알림 수신 (인증 필수, 본인의 알림만) */
  notificationAdded: Notification;
};

export type SyncProjectInput = {
  userKey: Scalars['String'];
};

export type SyncProjectResult = {
  __typename?: 'SyncProjectResult';
  isUpdatedProject: Scalars['Boolean'];
  success: Scalars['Boolean'];
  updatedCount: Scalars['Int'];
};

export type Team = {
  __typename?: 'Team';
  /** 생성일 */
  createdAt: Scalars['String'];
  /** 팀 설명 */
  description?: Maybe<Scalars['String']>;
  /** 고유번호 */
  id: Scalars['ID'];
  /** 내 권한 */
  myRoleType: TeamRoleType;
  /** 팀명 */
  name: Scalars['String'];
  /** 팀 썸네일 이미지 */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** 수정일 */
  updatedAt: Scalars['String'];
  /** 팀 UUID */
  uuid: Scalars['String'];
};

export type TeamAddress = {
  __typename?: 'TeamAddress';
  /** 주소 */
  address: Scalars['String'];
  /** 도시 */
  city: Scalars['String'];
  /** 국제전화번호 (ex. +82) */
  countryCallingCode: Scalars['String'];
  /** 국가코드 (ex. KR) */
  countryCode: Scalars['String'];
  /** 상세 주소 */
  detailAddress: Scalars['String'];
  /** 고유번호 */
  id: Scalars['ID'];
  /** 기본배송지 여부 */
  isDefault: Scalars['Boolean'];
  /** 배송지명 */
  name: Scalars['String'];
  /** 핸드폰 번호 (ex. 01012341234) */
  phoneNumber: Scalars['String'];
  /** 우편번호 */
  postalCode: Scalars['String'];
  /** 수령인 */
  receiver: Scalars['String'];
  /** 팀 고유번호 */
  teamId: Scalars['String'];
};

export type TeamAddressInput = {
  /** 팀 주소 고유번호 */
  id: Scalars['ID'];
};

export type TeamAddressListInput = {
  /** 팀 고유번호 */
  teamId: Scalars['ID'];
};

export type TeamInput = {
  /** 팀 고유번호 */
  id: Scalars['ID'];
};

export type TeamMember = {
  __typename?: 'TeamMember';
  /** 생성일 */
  createdAt: Scalars['String'];
  /** 이메일 */
  email: Scalars['String'];
  /** 고유번호 */
  id: Scalars['ID'];
  /** 이름 */
  name?: Maybe<Scalars['String']>;
  /** 닉네임 */
  nickname?: Maybe<Scalars['String']>;
  /** 역할 */
  roleType: TeamRoleType;
  /** 팀 고유번호 */
  teamId: Scalars['String'];
  /** 썸네일 이미지 */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** 수정일 */
  updatedAt: Scalars['String'];
  /** 유저 고유번호 */
  userId: Scalars['String'];
};

export type TeamMemberConnection = {
  __typename?: 'TeamMemberConnection';
  /** 팀 멤버 목록 */
  nodes: Array<TeamMember>;
  /** 팀 멤버 총 개수 */
  totalCount: Scalars['Int'];
};

export type TeamMemberConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TeamMemberConnectionOrderBy>;
  where: TeamMemberConnectionWhere;
};

export type TeamMemberConnectionOrderBy = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<TeamMemberConnectionOrderFieldType>;
};

/** 팀 멤버 목록 정렬 필드 유형 */
export enum TeamMemberConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Email = 'EMAIL',
  Id = 'ID',
  Name = 'NAME',
  TeamMemberRole = 'TEAM_MEMBER_ROLE'
}

export type TeamMemberConnectionWhere = {
  /** 키워드 (이름 또는 이메일) */
  keyword?: InputMaybe<Scalars['String']>;
  /** 팀 고유번호 */
  teamId: Scalars['ID'];
};

export type TeamMemberListInput = {
  /** 팀 고유번호 */
  teamId: Scalars['ID'];
};

/** 팀 역할 유형 */
export enum TeamRoleType {
  /** 관리자 */
  Admin = 'ADMIN',
  /** 소유자 */
  Owner = 'OWNER',
  /** 일반 사용자 */
  User = 'USER'
}

export type TeamSearchUserConnection = {
  __typename?: 'TeamSearchUserConnection';
  /** 유저 목록 */
  nodes: Array<SearchUser>;
  /** 유저 총 수 */
  totalCount: Scalars['Int'];
};

export type TeamSearchUserConnectionInput = {
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TeamSearchUserConnectionOrderBy>;
  where: TeamSearchUserConnectionWhere;
};

export type TeamSearchUserConnectionOrderBy = {
  /** 내림차순 */
  direction?: InputMaybe<OrderDirectionType>;
  /** 기준 */
  field?: InputMaybe<TeamSearchUserConnectionOrderFieldType>;
};

/** 검색 유저 목록 정렬 필드 유형 */
export enum TeamSearchUserConnectionOrderFieldType {
  CreatedAt = 'CREATED_AT',
  Id = 'ID'
}

export type TeamSearchUserConnectionWhere = {
  /** 이메일 검색 */
  email?: InputMaybe<Scalars['String']>;
  /** 유저 이름 또는 이메일 */
  keyword?: InputMaybe<Scalars['String']>;
  /** 유저 이름 검색 */
  name?: InputMaybe<Scalars['String']>;
  /** 팀 고유번호 */
  teamId: Scalars['String'];
};

export type TokenExchange = {
  __typename?: 'TokenExchange';
  /** 액세스 토큰 */
  accessToken: Scalars['String'];
  /** 액세스 토큰 만료 시간 (초) */
  expiresIn: Scalars['Int'];
  /** 리프레시 토큰 만료 시간 (초) */
  refreshExpiresIn: Scalars['Int'];
  /** 리프레시 토큰 */
  refreshToken: Scalars['String'];
};

export type TokenExchangeInput = {
  /** 원타임 코드 */
  code: Scalars['String'];
};

export enum TrueFalseType {
  F = 'F',
  T = 'T'
}

export type Unregister = {
  __typename?: 'Unregister';
  success: Scalars['Boolean'];
};

export type UnregisterInput = {
  /** 비밀번호 */
  password?: InputMaybe<Scalars['String']>;
  /** 탈퇴 사유 */
  reason?: InputMaybe<Array<Scalars['String']>>;
  /** 가입유형 (선택사항: 미입력 시 로그인한 사용자의 가입 타입 사용) */
  signUpType?: InputMaybe<SignUpType>;
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
  /**
   * 모듈 유형 (Button, ToF, IMU 등)
   *
   * 모델 유형이 모디일 경우에만 필수
   */
  moduleType?: InputMaybe<Scalars['String']>;
  /** 모델명 */
  name?: InputMaybe<Scalars['String']>;
  /** 클래스 목록 인풋 */
  platClassifiers?: InputMaybe<Array<CreatePlatClassifierInput>>;
  /** 검증 데이터 비율 */
  validationDataRate?: InputMaybe<Scalars['Float']>;
};

export type UpdateAddressInput = {
  /** 주소 */
  address?: InputMaybe<Scalars['String']>;
  /** 도시 */
  city?: InputMaybe<Scalars['String']>;
  /** 국제전화번호 */
  countryCallingCode?: InputMaybe<Scalars['String']>;
  /** 국가코드 */
  countryCode?: InputMaybe<Scalars['String']>;
  /** 상세 주소 */
  detailAddress?: InputMaybe<Scalars['String']>;
  /** 고유번호 */
  id: Scalars['ID'];
  /** 기본배송지 여부 */
  isDefault?: InputMaybe<Scalars['Boolean']>;
  /** 배송지명 */
  name?: InputMaybe<Scalars['String']>;
  /** 핸드폰 번호 (ex. 01012341234) */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** 우편번호 */
  postalCode?: InputMaybe<Scalars['String']>;
  /** 수령인 */
  receiver?: InputMaybe<Scalars['String']>;
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

export type UpdateCourseChoiceInput = {
  /** 선택지(보기) ID */
  id: Scalars['ID'];
  /** 정답 여부 */
  isCorrect?: InputMaybe<Scalars['Boolean']>;
  /** 보기 내용 */
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseGroupInput = {
  /** 하위 과정 ID 목록 (순서대로, 미포함 ID는 제거, 미전달 시 변경 없음) */
  courseIds?: InputMaybe<Array<Scalars['ID']>>;
  /** 소개 */
  description?: InputMaybe<Scalars['String']>;
  /** 과정그룹 ID */
  id: Scalars['ID'];
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 상태 (공개/비공개) */
  state?: InputMaybe<CourseStateType>;
  /** 소개용 썸네일 이미지 URL */
  thumbnailUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseInput = {
  /** 유의사항 */
  caution?: InputMaybe<Scalars['String']>;
  /** 코드 에디터 타입 */
  codeEditorType?: InputMaybe<ActivityCodingType>;
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 난이도 */
  difficulty?: InputMaybe<CourseDifficulty>;
  /** 교육지도안 파일명 */
  educationalPlanFileName?: InputMaybe<Scalars['String']>;
  /** 교육지도안 S3 URL (내부에서 용량·확장자 조회) */
  educationalPlanUrl?: InputMaybe<Scalars['String']>;
  /** 특징 */
  feature?: InputMaybe<Scalars['String']>;
  /** 코스 ID */
  id: Scalars['ID'];
  /** 하위 레슨 ID 목록 (순서대로, 미포함 ID는 제거, 미전달 시 변경 없음) */
  lessonIds?: InputMaybe<Array<Scalars['ID']>>;
  /** 수강 최대연령 */
  maxAge?: InputMaybe<Scalars['Int']>;
  /** 최대 참여자수 */
  maxParticipant?: InputMaybe<Scalars['Int']>;
  /** 수강 최소연령 */
  minAge?: InputMaybe<Scalars['Int']>;
  /** 최소 참여자수 */
  minParticipant?: InputMaybe<Scalars['Int']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 모집 종료일 */
  recruitmentEndDateTime?: InputMaybe<Scalars['String']>;
  /** 모집 시작일 */
  recruitmentStartDateTime?: InputMaybe<Scalars['String']>;
  /** 모집 대상 */
  recruitmentTarget?: InputMaybe<Scalars['String']>;
  /** 필수 준비물 */
  requiredPreparation?: InputMaybe<Scalars['String']>;
  /** 상태 */
  state?: InputMaybe<CourseStateType>;
  /** 재고 수 */
  stockCount?: InputMaybe<Scalars['Int']>;
  /** 태그 아이디 목록 */
  tags?: InputMaybe<Array<CourseTagInput>>;
  /** 수업자료 파일명 */
  teachingMaterialsFileName?: InputMaybe<Scalars['String']>;
  /** 수업자료 S3 URL (내부에서 용량·확장자 조회) */
  teachingMaterialsUrl?: InputMaybe<Scalars['String']>;
  /** 썸네일 이미지 URL */
  thumbnailUrl?: InputMaybe<Scalars['String']>;
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
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 공개 여부 (ON: 공개, OFF: 비공개) */
  state?: InputMaybe<CourseStateType>;
  /** 하위 단계 ID 목록 (순서대로, 미포함 ID는 제거, 미전달 시 변경 없음) */
  stepIds?: InputMaybe<Array<Scalars['ID']>>;
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

export type UpdateCourseStepCodingInput = {
  /** 활동 (텍스트 정보) */
  activity?: InputMaybe<Scalars['String']>;
  /** 정답 코드 */
  answerCode?: InputMaybe<Scalars['String']>;
  /** 유형 (BLOCK, AI_BLOCK, PYTHON) */
  codingType?: InputMaybe<ActivityCodingType>;
  /** 코딩 ID */
  id: Scalars['ID'];
  /** 초기 코드 */
  initCode?: InputMaybe<Scalars['String']>;
  /** 학습목표 (텍스트 에디터) */
  learningObjective?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseStepInput = {
  /** coding 정보 */
  coding?: InputMaybe<UpdateCourseStepCodingInput>;
  /** 유형 (YOUTUBE, VOD, PDF, PPT, CODING, TEXT_BOOK) */
  dType?: InputMaybe<CourseStepDType>;
  /** 설명 */
  description?: InputMaybe<Scalars['String']>;
  /** 단계 ID */
  id: Scalars['ID'];
  /** 순서 */
  idx?: InputMaybe<Scalars['Int']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** pdf 정보 */
  pdf?: InputMaybe<UpdateCourseStepPdfInput>;
  /** ppt 정보 */
  ppt?: InputMaybe<UpdateCourseStepPptInput>;
  /** quiz 정보 */
  quiz?: InputMaybe<UpdateCourseQuizInput>;
  /** 공개유무 */
  state?: InputMaybe<Scalars['Boolean']>;
  /** 보조 자료 */
  supplementaryData?: InputMaybe<UpdateCourseSupplementaryDataInput>;
  /** textBook 정보 */
  textBook?: InputMaybe<UpdateCourseStepTextBookInput>;
  /** vod 정보 */
  vod?: InputMaybe<UpdateCourseStepVodInput>;
  /** youtube 정보 */
  youtube?: InputMaybe<UpdateCourseStepYoutubeInput>;
};

export type UpdateCourseStepPdfInput = {
  /** PDF ID */
  id: Scalars['ID'];
  /** pdf 페이지 총 수 (추후 분석 반영) */
  totalCount?: InputMaybe<Scalars['Int']>;
  /** pdf 경로 */
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseStepPptInput = {
  /** PPT ID */
  id: Scalars['ID'];
  /** 슬라이드 수 (추후 분석 반영) */
  slideCount?: InputMaybe<Scalars['Int']>;
  /** ppt 경로 */
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseStepSupplementaryDataInput = {
  /** 내용 */
  description?: InputMaybe<Scalars['String']>;
  /** 힌트 내용 */
  hintDescription?: InputMaybe<Scalars['String']>;
  /** 힌트 제목 */
  hintTitle?: InputMaybe<Scalars['String']>;
  /** 단계 보조자료 ID */
  id: Scalars['ID'];
  /** 컨텐츠 제공업체 */
  providerType?: InputMaybe<ContentProviderType>;
  /** 제목 */
  title?: InputMaybe<Scalars['String']>;
  /** 비디오 경로 */
  videoUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseStepTextBookInput = {
  /** 내용 */
  content?: InputMaybe<Scalars['String']>;
  /** 텍스트북 ID */
  id: Scalars['ID'];
};

export type UpdateCourseStepVodInput = {
  /** VOD ID */
  id: Scalars['ID'];
  /** Upload 서비스 Presigned 응답의 uploadID (변환 완료 후 연동용) */
  uploadId?: InputMaybe<Scalars['ID']>;
  /** 경로 (변경 시 서버에서 duration 자동 조회) */
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseStepVodItemInput = {
  /** 아이템 유형 (퀴즈, 텍스트) */
  dType: CourseVodItemDType;
  /** 단계 VOD 아이템 ID */
  id: Scalars['ID'];
  /** 핀 위치 (초 단위) */
  pinPosition?: InputMaybe<Scalars['Int']>;
  /** 퀴즈 유형의 아이템 */
  quiz?: InputMaybe<UpdateCourseQuizInput>;
  /** 부제목 */
  subTitle?: InputMaybe<Scalars['String']>;
  /** textBook 정보 */
  textBook?: InputMaybe<UpdateCourseStepVodItemTextBookInput>;
  /** 제목 */
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseStepVodItemTextBookInput = {
  /** 내용 */
  content: Scalars['String'];
  /** 텍스트북 ID */
  id: Scalars['ID'];
};

/** 유튜브 링크 단계 수정 */
export type UpdateCourseStepYoutubeInput = {
  /** Youtube ID */
  id: Scalars['ID'];
  /** 경로 (유튜브 URL, 변경 시 서버에서 duration 자동 조회) */
  url?: InputMaybe<Scalars['String']>;
};

/** 단계 보조 자료 수정 인풋 */
export type UpdateCourseSupplementaryDataInput = {
  /** 내용 */
  description?: InputMaybe<Scalars['String']>;
  /** 힌트 내용 */
  hintDescription?: InputMaybe<Scalars['String']>;
  /** 힌트 제목 */
  hintTitle?: InputMaybe<Scalars['String']>;
  /** 컨텐츠 제공업체 */
  providerType?: InputMaybe<ContentProviderType>;
  /** 단계 ID */
  stepId: Scalars['ID'];
  /** 제목 */
  title?: InputMaybe<Scalars['String']>;
  /** 비디오 경로 */
  videoUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateCourseVisibilityInCourseGroupInput = {
  /** 과정그룹 ID */
  courseGroupId: Scalars['ID'];
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 상태 (공개/비공개) */
  state: CourseStateType;
};

export type UpdateLessonVisibilityInCourseInput = {
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 레슨 ID */
  lessonId: Scalars['ID'];
  /** 상태 (공개/비공개) */
  state: CourseStateType;
};

export type UpdateModiData = {
  __typename?: 'UpdateModiData';
  /** MODI 데이터 ID */
  id: Scalars['ID'];
};

export type UpdateModiDataInput = {
  /** MODI 데이터 ID */
  id: Scalars['ID'];
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateProfileInput = {
  /** 생년월일 (ex. 1990-01-01) */
  birthdate?: InputMaybe<Scalars['String']>;
  /** 거주 도시 */
  city?: InputMaybe<Scalars['String']>;
  /** 코딩 경험 */
  codingExperienceTypeList?: InputMaybe<Array<Scalars['String']>>;
  /** 국제전화번호 */
  countryCallingCode?: InputMaybe<Scalars['String']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 닉네임 */
  nickname?: InputMaybe<Scalars['String']>;
  /** 핸드폰 번호 (ex. 01012341234) */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** 거주 지역/국가 */
  region?: InputMaybe<Scalars['String']>;
  /** 썸네일 이미지 */
  thumbnailUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  codeType?: InputMaybe<ProjectCodeType>;
  id: Scalars['ID'];
  jsonData?: InputMaybe<Scalars['String']>;
  runType?: InputMaybe<ProjectRunType>;
  thumb?: InputMaybe<ImageInfoInput>;
  title?: InputMaybe<Scalars['String']>;
  updateType?: InputMaybe<ProjectUpdateType>;
  userKey?: InputMaybe<Scalars['String']>;
};

/** 보호자 정보 수정 입력 */
export type UpdateProtectorInput = {
  /** 국제전화번호 */
  countryCallingCode?: InputMaybe<Scalars['String']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
  /** 휴대폰 번호 (ex. 01012341234) */
  phoneNumber?: InputMaybe<Scalars['String']>;
};

/** Step 진도 업데이트 입력 (heartbeat) */
export type UpdateStepProgressInput = {
  /** 과정그룹 ID (그룹 미소속 시 생략) */
  courseGroupId?: InputMaybe<Scalars['ID']>;
  /** 과정 ID */
  courseId: Scalars['ID'];
  /** 유형별 상세 데이터 (JSON 문자열) */
  detail?: InputMaybe<Scalars['String']>;
  /** 강제 DB 반영 (페이지 이탈 시) */
  forceFlush?: InputMaybe<Scalars['Boolean']>;
  /** 참여 시간 증분 (초) - deprecated, totalJoinedTime 우선 사용 */
  joinedTimeDelta?: InputMaybe<Scalars['Int']>;
  /** 차시 ID */
  lessonId: Scalars['ID'];
  /** 진도율 (0.0 ~ 1.0) */
  progressRate: Scalars['Float'];
  /** 단계 ID */
  stepId: Scalars['ID'];
  /** 시작 이후 총 참여 시간 (초) - 우선 적용, max(existing, total) 전략 */
  totalJoinedTime?: InputMaybe<Scalars['Int']>;
};

export type UpdateTeamAddressInput = {
  /** 주소 */
  address?: InputMaybe<Scalars['String']>;
  /** 도시 */
  city?: InputMaybe<Scalars['String']>;
  /** 국제전화번호 */
  countryCallingCode?: InputMaybe<Scalars['String']>;
  /** 국가코드 */
  countryCode?: InputMaybe<Scalars['String']>;
  /** 상세 주소 */
  detailAddress?: InputMaybe<Scalars['String']>;
  /** 팀 주소 고유번호 */
  id: Scalars['ID'];
  /** 기본배송지 여부 */
  isDefault?: InputMaybe<Scalars['Boolean']>;
  /** 배송지명 */
  name?: InputMaybe<Scalars['String']>;
  /** 핸드폰 번호 (ex. 01012341234) */
  phoneNumber?: InputMaybe<Scalars['String']>;
  /** 우편번호 */
  postalCode?: InputMaybe<Scalars['String']>;
  /** 수령인 */
  receiver?: InputMaybe<Scalars['String']>;
};

export type UpdateTeamInput = {
  /** 팀 소개 */
  description?: InputMaybe<Scalars['String']>;
  /** 팀 고유번호 */
  id: Scalars['ID'];
  /** 팀명 */
  name?: InputMaybe<Scalars['String']>;
  /** 팀 썸네일 이미지 */
  thumbnailUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateTeamMemberRole = {
  __typename?: 'UpdateTeamMemberRole';
  success: Scalars['Boolean'];
};

export type UpdateTeamMemberRoleInput = {
  /** 팀 멤버 고유번호 */
  id: Scalars['ID'];
  /** 역할 */
  roleType: TeamRoleType;
};

export type UpdateUserInput = {
  /** 이메일 마케팅 정보 수신 동의 */
  emailMarketingConsent?: InputMaybe<Scalars['Boolean']>;
  /** 개인정보 수집 및 이용 동의 */
  personalInfoConsent?: InputMaybe<Scalars['Boolean']>;
  /** SMS 마케팅 정보 수신 동의 */
  smsMarketingConsent?: InputMaybe<Scalars['Boolean']>;
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

/** 유저 정보 */
export type User = {
  __typename?: 'User';
  /** 생성일 */
  createdAt: Scalars['String'];
  /** 이메일 */
  email: Scalars['String'];
  /** 이메일 마케팅 정보 수신 동의 (선택) */
  emailMarketingConsent: Scalars['Boolean'];
  /** 부모 동의 완료 여부 */
  hasParentalConsent: Scalars['Boolean'];
  /** 고유번호 */
  id: Scalars['ID'];
  /** 만 16세 미만 여부 */
  isMinor: Scalars['Boolean'];
  /** 이메일 마케팅 정보 수신 동의 업데이트 일시 */
  marketingConsentEmailUpdatedAt?: Maybe<Scalars['String']>;
  /** SMS 마케팅 정보 수신 동의 업데이트 일시 */
  marketingConsentSmsUpdatedAt?: Maybe<Scalars['String']>;
  /**
   * 마케팅 정보 수신 동의 업데이트 일시
   * @deprecated Use marketingConsentEmailUpdatedAt instead
   * @deprecated Use marketingConsentEmailUpdatedAt instead
   */
  marketingConsentUpdatedAt?: Maybe<Scalars['String']>;
  /** 개인정보 제 3자 제공 동의 (선택) */
  personalInfoConsent: Scalars['Boolean'];
  /** 개인정보 이용약관 동의 (필수) */
  privacyPolicyConsent: Scalars['Boolean'];
  /** 보호자 정보 */
  protector?: Maybe<Protector>;
  /** 역할 */
  roleType: UserRoleType;
  /** 가입 유형 */
  signUpType: SignUpType;
  /** SMS 마케팅 정보 수신 동의 (선택) */
  smsMarketingConsent: Scalars['Boolean'];
  /** 서비스 이용약관 동의 (필수) */
  termsOfServiceConsent: Scalars['Boolean'];
  /** 수정일 */
  updatedAt: Scalars['String'];
  /** UUID */
  uuid: Scalars['String'];
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

/** 역할 유형 */
export enum UserRoleType {
  /** 관리자 */
  Admin = 'ADMIN',
  /** 게스트 */
  Guest = 'GUEST',
  /** 일반 사용자 */
  User = 'USER'
}

export type VerifyEmailVerificationCode = {
  __typename?: 'VerifyEmailVerificationCode';
  success: Scalars['Boolean'];
};

export type VerifyEmailVerificationCodeInput = {
  /** 인증 코드 */
  authCode: Scalars['String'];
  /** 인증 유형 */
  authType: AuthType;
  /** 이메일 */
  email: Scalars['String'];
};

export type SaveAiModelMutationVariables = Exact<{
  input: SaveAiModelInput;
}>;


export type SaveAiModelMutation = { __typename?: 'Mutation', saveAIModel: { __typename?: 'SaveAIModel', id: string } };

export type AiModelQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AiModelQuery = { __typename?: 'Query', aiModel: { __typename?: 'AIModel', aiModelCategoryId: string, batchSize: number, moduleType?: string | null | undefined, epoch: number, id: string, learningRate: number, modelUrl: string, name: string, validationDataRate: number, classifiers: Array<{ __typename: 'PlatClassifier', dataset: Array<string>, label: string }>, aiModelCategory: { __typename?: 'AIModelCategory', type: AiModelCategoryType, id: string } } };

export type CheckAiModelNameDuplicateQueryVariables = Exact<{
  input: CheckAiModelNameDuplicateInput;
}>;


export type CheckAiModelNameDuplicateQuery = { __typename?: 'Query', checkAIModelNameDuplicate: boolean };

export type CourseQueryVariables = Exact<{
  where: CourseWhere;
}>;


export type CourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, name: string, description?: string | null | undefined, codeEditorType?: ActivityCodingType | null | undefined, difficulty?: CourseDifficulty | null | undefined, lessonCount: number, educationalPlan?: { __typename?: 'FileMetadata', url: string, fileName?: string | null | undefined } | null | undefined, teachingMaterials?: { __typename?: 'FileMetadata', url: string, fileName?: string | null | undefined } | null | undefined, lessons: Array<{ __typename?: 'CourseLesson', id: string, idx: number, name: string, description?: string | null | undefined, state: CourseStateType, steps: Array<{ __typename?: 'StepInLesson', idx: number, step: { __typename?: 'CourseStepCoding', id: string, name: string, description?: string | null | undefined, dType: CourseStepDType } | { __typename?: 'CourseStepPdf', id: string, name: string, description?: string | null | undefined, dType: CourseStepDType } | { __typename?: 'CourseStepPpt', id: string, name: string, description?: string | null | undefined, dType: CourseStepDType } | { __typename?: 'CourseStepQuiz', id: string, name: string, description?: string | null | undefined, dType: CourseStepDType } | { __typename?: 'CourseStepTextBook', id: string, name: string, description?: string | null | undefined, dType: CourseStepDType } | { __typename?: 'CourseStepVod', id: string, name: string, description?: string | null | undefined, dType: CourseStepDType } | { __typename?: 'CourseStepYoutube', id: string, name: string, description?: string | null | undefined, dType: CourseStepDType } }> }> } };

export type MyCourseDashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCourseDashboardQuery = { __typename?: 'Query', myCourseDashboard: { __typename?: 'MyCourseDashboard', recentLearning?: { __typename?: 'RecentLearning', courseGroupId?: string | null | undefined, course: { __typename?: 'Course', id: string, name: string, courseGroupId?: string | null | undefined, courseGroupName?: string | null | undefined, codeEditorType?: ActivityCodingType | null | undefined, difficulty?: CourseDifficulty | null | undefined, firstLearning?: { __typename?: 'FirstLearning', courseGroupId?: string | null | undefined, courseId: string, lessonId: string, stepId?: string | null | undefined } | null | undefined }, progress: { __typename?: 'MyProgressSummary', status: ProgressStatus, totalLessons: number, completedLessons: number, displayProgress: { __typename?: 'CourseProgressInfo', totalLessons: number, completedLessons: number }, nextLearning?: { __typename?: 'NextLearning', courseGroupId?: string | null | undefined, courseId: string, lessonId: string, lessonIdx: number, stepId?: string | null | undefined } | null | undefined } } | null | undefined, learningStatus: { __typename?: 'LearningStatus', enrolledCourseCount: number, completedCourseCount: number, inProgressCourseCount: number, totalLearningTimeSeconds: number, learningTimeByType: Array<{ __typename?: 'LearningTimeByType', stepType: CourseStepDType, totalActiveSeconds: number, totalDurationSeconds: number, sessionCount: number }> } } };

export type CourseRecommendsQueryVariables = Exact<{
  kinds: Array<CourseRecommendKind> | CourseRecommendKind;
  first?: InputMaybe<Scalars['Int']>;
}>;


export type CourseRecommendsQuery = { __typename?: 'Query', courseRecommends: Array<{ __typename?: 'CourseRecommendation', kind: CourseRecommendKind, courses: Array<{ __typename?: 'Course', id: string, name: string, description?: string | null | undefined, courseGroupId?: string | null | undefined, courseGroupName?: string | null | undefined, codeEditorType?: ActivityCodingType | null | undefined, difficulty?: CourseDifficulty | null | undefined, lessonCount: number }> }> };

export type MyCourseConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CourseConnectionOrder>;
  where?: InputMaybe<MyCourseConnectionWhere>;
}>;


export type MyCourseConnectionQuery = { __typename?: 'Query', myCourseConnection: { __typename?: 'CourseConnection', totalCount: number, nodes: Array<{ __typename?: 'Course', id: string, name: string, description?: string | null | undefined, courseGroupId?: string | null | undefined, courseGroupName?: string | null | undefined, codeEditorType?: ActivityCodingType | null | undefined, difficulty?: CourseDifficulty | null | undefined, lessonCount: number, firstLearning?: { __typename?: 'FirstLearning', courseGroupId?: string | null | undefined, courseId: string, lessonId: string, stepId?: string | null | undefined } | null | undefined, nextLearning?: { __typename?: 'NextLearning', courseGroupId?: string | null | undefined, courseId: string, courseName: string, totalLessonsInCourse: number, lessonId: string, lessonName: string, lessonIdx: number, stepId?: string | null | undefined, stepName?: string | null | undefined, stepIdx?: number | null | undefined, totalStepsInLesson: number } | null | undefined, lessons: Array<{ __typename?: 'CourseLesson', id: string }>, myProgress?: { __typename?: 'MyProgressSummary', status: ProgressStatus, displayProgress: { __typename?: 'CourseProgressInfo', totalLessons: number, completedLessons: number } } | null | undefined }> } };

export type MyCourseDetailQueryVariables = Exact<{
  where: MyCourseDetailWhere;
}>;


export type MyCourseDetailQuery = { __typename?: 'Query', myCourseDetail: { __typename?: 'MyCourseDetail', courseId: string, name: string, description?: string | null | undefined, courseGroupName?: string | null | undefined, difficulty?: CourseDifficulty | null | undefined, codeEditorType?: ActivityCodingType | null | undefined, status: ProgressStatus, completedAt?: string | null | undefined, educationalPlan?: { __typename?: 'FileMetadata', url: string, fileName?: string | null | undefined } | null | undefined, teachingMaterials?: { __typename?: 'FileMetadata', url: string, fileName?: string | null | undefined } | null | undefined, firstLearning?: { __typename?: 'FirstLearning', lessonId: string, stepId?: string | null | undefined } | null | undefined, nextLearning?: { __typename?: 'NextLearning', lessonId: string, lessonIdx: number, stepId?: string | null | undefined } | null | undefined, displayProgress: { __typename?: 'CourseProgressInfo', totalLessons: number, completedLessons: number }, actualProgress: { __typename?: 'CourseProgressInfo', totalLessons: number, completedLessons: number }, lessons: Array<{ __typename?: 'LessonSummary', lessonId: string, idx: number, lessonName: string, description?: string | null | undefined, status: ProgressStatus, totalSteps: number, completedSteps: number, steps: Array<{ __typename?: 'LessonStepSummary', stepId: string, idx: number, stepName: string, stepType: CourseStepDType, status: ProgressStatus, progressRate: number }> }> } };

export type CourseGroupConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseGroupConnectionWhere>;
}>;


export type CourseGroupConnectionQuery = { __typename?: 'Query', courseGroupConnection: { __typename?: 'CourseGroupConnection', totalCount: number, nodes: Array<{ __typename?: 'CourseGroup', id: string, name: string, description?: string | null | undefined, courses: Array<{ __typename?: 'CourseInCourseGroup', effectiveStatus: CourseVisibilityStatus, course: { __typename?: 'Course', id: string, name: string, description?: string | null | undefined, codeEditorType?: ActivityCodingType | null | undefined, difficulty?: CourseDifficulty | null | undefined, lessonCount: number, lessons: Array<{ __typename?: 'CourseLesson', id: string }> } }> }>, filterCourse?: { __typename?: 'CourseFilterFacet', codingTypes: Array<{ __typename?: 'FilteredValue', value: string, count: number }>, difficulties: Array<{ __typename?: 'FilteredValue', value: string, count: number }> } | null | undefined, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } };

export type CreateCourseParticipantLessonFeedbackMutationVariables = Exact<{
  input: CreateCourseParticipantLessonFeedbackInput;
}>;


export type CreateCourseParticipantLessonFeedbackMutation = { __typename?: 'Mutation', createCourseParticipantLessonFeedback: boolean };

export type CourseLessonQueryVariables = Exact<{
  where: CourseLessonWhere;
}>;


export type CourseLessonQuery = { __typename?: 'Query', courseLesson: { __typename?: 'CourseLesson', effectiveStatus: CourseVisibilityStatus, steps: Array<{ __typename?: 'StepInLesson', idx: number, effectiveStatus: CourseVisibilityStatus, step: { __typename?: 'CourseStepCoding', id: string, dType: CourseStepDType, coding?: { __typename?: 'CourseStepCodingDetail', codingType?: ActivityCodingType | null | undefined, learningObjective?: string | null | undefined, activity?: string | null | undefined } | null | undefined } | { __typename?: 'CourseStepPdf', id: string, dType: CourseStepDType, pdf?: { __typename?: 'CourseStepPdfDetail', totalCount?: number | null | undefined, file: { __typename?: 'FileMetadata', url: string } } | null | undefined } | { __typename?: 'CourseStepPpt', id: string, dType: CourseStepDType, ppt?: { __typename?: 'CourseStepPptDetail', slideCount?: number | null | undefined, analysisStatus: ContentAnalysisStatus, convertedPdfUrl?: string | null | undefined, file: { __typename?: 'FileMetadata', url: string }, videoOverlays?: Array<{ __typename?: 'CourseStepVideoOverlay', page: number, mediaFile: string, videoUrl: string, x: number, y: number, width: number, height: number }> | null | undefined } | null | undefined } | { __typename?: 'CourseStepQuiz', id: string, dType: CourseStepDType } | { __typename?: 'CourseStepTextBook', id: string, dType: CourseStepDType } | { __typename?: 'CourseStepVod', id: string, dType: CourseStepDType, vod?: { __typename?: 'CourseStepVodDetail', url: string } | null | undefined } | { __typename?: 'CourseStepYoutube', id: string, dType: CourseStepDType, youtube?: { __typename?: 'CourseStepYoutubeDetail', url: string } | null | undefined } }> } };

export type StartStepMutationVariables = Exact<{
  input: StartStepInput;
}>;


export type StartStepMutation = { __typename?: 'Mutation', startStep: { __typename?: 'StepProgressItem', stepId: string, stepName: string, stepType: CourseStepDType, status: ProgressStatus, progressRate: number, joinedTime: number, attemptCount: number, score?: number | null | undefined, detail?: string | null | undefined, startedAt?: string | null | undefined, lastAccessedAt?: string | null | undefined, completedAt?: string | null | undefined } };

export type UpdateCourseStepMutationVariables = Exact<{
  input: UpdateCourseStepInput;
}>;


export type UpdateCourseStepMutation = { __typename?: 'Mutation', updateCourseStep: boolean };

export type UpdateStepProgressMutationVariables = Exact<{
  input: UpdateStepProgressInput;
}>;


export type UpdateStepProgressMutation = { __typename?: 'Mutation', updateStepProgress: { __typename?: 'StepProgressItem', stepId: string, stepName: string, stepType: CourseStepDType, status: ProgressStatus, progressRate: number, joinedTime: number, attemptCount: number, score?: number | null | undefined, detail?: string | null | undefined, startedAt?: string | null | undefined, lastAccessedAt?: string | null | undefined, completedAt?: string | null | undefined } };

export type CompleteStepMutationVariables = Exact<{
  input: CompleteStepInput;
}>;


export type CompleteStepMutation = { __typename?: 'Mutation', completeStep: { __typename?: 'StepProgressItem', stepId: string, stepName: string, stepType: CourseStepDType, status: ProgressStatus, progressRate: number, joinedTime: number, attemptCount: number, score?: number | null | undefined, detail?: string | null | undefined, startedAt?: string | null | undefined, lastAccessedAt?: string | null | undefined, completedAt?: string | null | undefined } };

export type LibraryQueryVariables = Exact<{
  input: LibraryInput;
}>;


export type LibraryQuery = { __typename?: 'Query', library: { __typename?: 'Library', id: string, viewCount: number, language: LanguageType, title: string, content: string, createdAt: string, isNew: boolean, isExposed: boolean, attachments: Array<{ __typename?: 'LibraryContentAttachment', id: string, name: string, url: string }>, cursorInfo: { __typename?: 'CursorInfo', before?: string | null | undefined, after?: string | null | undefined } } };

export type LibraryConnectionQueryVariables = Exact<{
  input: LibraryConnectionInput;
}>;


export type LibraryConnectionQuery = { __typename?: 'Query', libraryConnection: { __typename?: 'LibraryConnection', totalCount: number, nodes: Array<{ __typename?: 'LibraryNode', id: string, viewCount: number, language: LanguageType, title: string, content: string, createdAt: string, isNew: boolean, isExposed: boolean }> } };

export type CreateModiDataMutationVariables = Exact<{
  input: CreateModiDataInput;
}>;


export type CreateModiDataMutation = { __typename?: 'Mutation', createModiData: { __typename?: 'CreateModiData', id: string } };

export type CreateModiDataListMutationVariables = Exact<{
  input: CreateModiDataListInput;
}>;


export type CreateModiDataListMutation = { __typename?: 'Mutation', createModiDataList: { __typename?: 'CreateModiDataList', ids: Array<string> } };

export type DeleteModiDataMutationVariables = Exact<{
  input: DeleteModiDataInput;
}>;


export type DeleteModiDataMutation = { __typename?: 'Mutation', deleteModiData: { __typename?: 'DeleteModiData', success: boolean } };

export type DeleteModiDataListMutationVariables = Exact<{
  input: DeleteModiDataListInput;
}>;


export type DeleteModiDataListMutation = { __typename?: 'Mutation', deleteModiDataList: { __typename?: 'DeleteModiDataList', success: boolean } };

export type UpdateModiDataMutationVariables = Exact<{
  input: UpdateModiDataInput;
}>;


export type UpdateModiDataMutation = { __typename?: 'Mutation', updateModiData: { __typename?: 'UpdateModiData', id: string } };

export type ModiDataQueryVariables = Exact<{
  input: ModiDataInput;
}>;


export type ModiDataQuery = { __typename?: 'Query', modiData: { __typename?: 'ModiData', id: string, name: string, moduleType: string, functionType: string, data: string, createdAt: string } };

export type ModiDataConnectionQueryVariables = Exact<{
  input: ModiDataConnectionInput;
}>;


export type ModiDataConnectionQuery = { __typename?: 'Query', modiDataConnection: { __typename?: 'ModiDataConnection', totalCount: number, nodes: Array<{ __typename?: 'ModiData', id: string, name: string, moduleType: string, functionType: string, data: string, createdAt: string }> } };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, title: string, runType: ProjectRunType, jsonData: string, createdAt: string, updatedAt: string, infoCode: number, infoMessage: string, thumb: { __typename?: 'ImageInfo', domain: string, url: string, width: number, height: number, idx: number, key: string } } };

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, title: string, runType: ProjectRunType, jsonData: string, createdAt: string, updatedAt: string, thumb: { __typename?: 'ImageInfo', domain: string, url: string, width: number, height: number, idx: number, key: string } } };

export type DeleteProjectMutationVariables = Exact<{
  input: DeleteProjectInput;
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type AddProjectFavoriteMutationVariables = Exact<{
  input: AddProjectFavoriteInput;
}>;


export type AddProjectFavoriteMutation = { __typename?: 'Mutation', addProjectFavorite: boolean };

export type RemoveProjectFavoriteMutationVariables = Exact<{
  input: RemoveProjectFavoriteInput;
}>;


export type RemoveProjectFavoriteMutation = { __typename?: 'Mutation', removeProjectFavorite: boolean };

export type ProjectQueryVariables = Exact<{
  where: ProjectWhere;
}>;


export type ProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, title: string, codeType: ProjectCodeType, runType: ProjectRunType, jsonData: string, isFavorite: boolean, infoMessage: string, infoCode: number, createdAt: string, updatedAt: string, thumb: { __typename?: 'ImageInfo', domain: string, url: string, width: number, height: number, idx: number, key: string } } };

export type ProjectConnectionQueryVariables = Exact<{
  where: ProjectConnectionWhere;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProjectConnectionOrder>;
}>;


export type ProjectConnectionQuery = { __typename?: 'Query', projectConnection: { __typename?: 'ProjectConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', startCursor: string, endCursor: string, hasNextPage: boolean, hasBeforePage: boolean }, nodes: Array<{ __typename?: 'Project', id: string, title: string, codeType: ProjectCodeType, runType: ProjectRunType, isFavorite: boolean, jsonData: string, createdAt: string, updatedAt: string, thumb: { __typename?: 'ImageInfo', domain: string, url: string, width: number, height: number, idx: number, key: string } } | null | undefined>, edges: Array<{ __typename?: 'ProjectEdge', cursor: string, node: { __typename?: 'Project', id: string, title: string, codeType: ProjectCodeType, runType: ProjectRunType, jsonData: string, createdAt: string, updatedAt: string, thumb: { __typename?: 'ImageInfo', domain: string, url: string, width: number, height: number, idx: number, key: string } } } | null | undefined> } };

export type ProjectNameExistQueryVariables = Exact<{
  where: ProjectNameExistWhere;
}>;


export type ProjectNameExistQuery = { __typename?: 'Query', projectNameExist: boolean };

export type CreateContactMutationVariables = Exact<{
  input: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', id: string, userId: string, subject: string, title: string, content: string, createdAt: string, updatedAt: string, state: ContactStateType, responseMessage?: string | null | undefined, respondedAt?: string | null | undefined, fileList?: Array<{ __typename?: 'AttachmentFile', name: string, url: string }> | null | undefined } };

export type DeleteContactMutationVariables = Exact<{
  input: DeleteContactInput;
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact: { __typename?: 'DeleteContact', success: boolean } };

export type MarkNotificationAsReadMutationVariables = Exact<{
  input: MarkNotificationAsReadInput;
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: boolean };

export type ContactQueryVariables = Exact<{
  input: ContactInput;
}>;


export type ContactQuery = { __typename?: 'Query', contact: { __typename?: 'Contact', id: string, userId: string, userName?: string | null | undefined, subject: string, title: string, content: string, createdAt: string, updatedAt: string, state: ContactStateType, responseMessage?: string | null | undefined, respondedAt?: string | null | undefined, fileList?: Array<{ __typename?: 'AttachmentFile', name: string, url: string }> | null | undefined } };

export type ContactConnectionQueryVariables = Exact<{
  input: ContactConnectionInput;
}>;


export type ContactConnectionQuery = { __typename?: 'Query', contactConnection: { __typename?: 'ContactConnection', totalCount: number, nodes: Array<{ __typename?: 'Contact', id: string, userId: string, userName?: string | null | undefined, subject: string, title: string, content: string, createdAt: string, updatedAt: string, state: ContactStateType, responseMessage?: string | null | undefined, respondedAt?: string | null | undefined, fileList?: Array<{ __typename?: 'AttachmentFile', name: string, url: string }> | null | undefined }> } };

export type NoticeConnectionQueryVariables = Exact<{
  input: NoticeConnectionInput;
}>;


export type NoticeConnectionQuery = { __typename?: 'Query', noticeConnection: { __typename?: 'NoticeConnection', totalCount: number, nodes: Array<{ __typename?: 'NoticeNode', id: string, isTop: boolean, viewCount: number, language: LanguageType, title: string, content: string, isNew: boolean, createdAt: string }> } };

export type NoticeQueryVariables = Exact<{
  input: NoticeInput;
}>;


export type NoticeQuery = { __typename?: 'Query', notice: { __typename?: 'Notice', id: string, isTop: boolean, viewCount: number, language: LanguageType, title: string, content: string, isNew: boolean, createdAt: string, isExposed: boolean, attachments: Array<{ __typename?: 'NoticeContentAttachment', id: string, name: string, url: string }>, cursorInfo: { __typename?: 'CursorInfo', before?: string | null | undefined, after?: string | null | undefined } } };

export type FaqQueryVariables = Exact<{
  input: FaqInput;
}>;


export type FaqQuery = { __typename?: 'Query', faq: { __typename?: 'Faq', id: string, category: FaqCategoryType, subCategory: string, viewCount: number, language: LanguageType, title: string, content: string, createdAt: string } };

export type FaqConnectionQueryVariables = Exact<{
  input: FaqConnectionInput;
}>;


export type FaqConnectionQuery = { __typename?: 'Query', faqConnection: { __typename?: 'FaqConnection', totalCount: number, nodes: Array<{ __typename?: 'FaqNode', id: string, category: FaqCategoryType, subCategory: string, viewCount: number, language: LanguageType, title: string, content: string, createdAt: string }> } };

export type NotificationConnectionQueryVariables = Exact<{
  input: NotificationConnectionInput;
}>;


export type NotificationConnectionQuery = { __typename?: 'Query', notificationConnection: { __typename?: 'NotificationConnection', totalCount: number, nodes: Array<{ __typename?: 'Notification', id: string, userId?: string | null | undefined, profileId: string, title: string, description: string, webLinkPath?: string | null | undefined, iconUrl?: string | null | undefined, state: NotificationState, uiType: NotificationUiType, type: NotificationType, createdAt: string, updatedAt: string }>, edges: Array<{ __typename?: 'NotificationEdge', cursor: string, node: { __typename?: 'Notification', id: string, userId?: string | null | undefined, profileId: string, title: string, description: string, webLinkPath?: string | null | undefined, iconUrl?: string | null | undefined, state: NotificationState, uiType: NotificationUiType, type: NotificationType, createdAt: string, updatedAt: string } }>, pageInfo: { __typename?: 'PageInfo', startCursor: string, endCursor: string, hasNextPage: boolean, hasBeforePage: boolean } } };

export type NotificationUnreadCountQueryVariables = Exact<{
  deviceTypes?: InputMaybe<Array<DeviceType> | DeviceType>;
}>;


export type NotificationUnreadCountQuery = { __typename?: 'Query', notificationUnreadCount: number };

export type NotificationAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationAddedSubscription = { __typename?: 'Subscription', notificationAdded: { __typename?: 'Notification', id: string, userId?: string | null | undefined, profileId: string, title: string, description: string, webLinkPath?: string | null | undefined, iconUrl?: string | null | undefined, state: NotificationState, uiType: NotificationUiType, type: NotificationType, deviceType: DeviceType, createdAt: string, updatedAt: string } };

export type PresignedMultiUrlsForFileUploadQueryVariables = Exact<{
  input: PresignedMultiUrlsForFileUploadInput;
}>;


export type PresignedMultiUrlsForFileUploadQuery = { __typename?: 'Query', presignedMultiUrlsForFileUpload?: { __typename?: 'PresignedMultiUrlsForFileUpload', urls: Array<string> } | null | undefined };

export type PresignedUrlForFileUploadQueryVariables = Exact<{
  fileName: Scalars['String'];
  fileType: Scalars['String'];
}>;


export type PresignedUrlForFileUploadQuery = { __typename?: 'Query', presignedUrlForFileUpload?: { __typename?: 'PresignedUrlForFileUpload', url: string } | null | undefined };

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'User', id: string } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: { __typename?: 'SignOut', success: boolean } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string } };

export type SessionOnetimeCodeMutationVariables = Exact<{
  input?: InputMaybe<SessionOnetimeCodeInput>;
}>;


export type SessionOnetimeCodeMutation = { __typename?: 'Mutation', sessionOnetimeCode: { __typename?: 'SessionOnetimeCode', code: string } };

export type TokenExchangeMutationVariables = Exact<{
  input: TokenExchangeInput;
}>;


export type TokenExchangeMutation = { __typename?: 'Mutation', tokenExchange: { __typename?: 'TokenExchange', accessToken: string, refreshToken: string, expiresIn: number, refreshExpiresIn: number } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'TokenExchange', accessToken: string, refreshToken: string, expiresIn: number, refreshExpiresIn: number } };

export type SendEmailVerificationCodeMutationVariables = Exact<{
  input: SendEmailVerificationCodeInput;
}>;


export type SendEmailVerificationCodeMutation = { __typename?: 'Mutation', sendEmailVerificationCode: { __typename?: 'SendEmailVerificationCode', success: boolean } };

export type VerifyEmailVerificationCodeMutationVariables = Exact<{
  input: VerifyEmailVerificationCodeInput;
}>;


export type VerifyEmailVerificationCodeMutation = { __typename?: 'Mutation', verifyEmailVerificationCode: { __typename?: 'VerifyEmailVerificationCode', success: boolean } };

export type UnregisterMutationVariables = Exact<{
  input: UnregisterInput;
}>;


export type UnregisterMutation = { __typename?: 'Mutation', unregister: { __typename?: 'Unregister', success: boolean } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, uuid: string, email: string, signUpType: SignUpType, privacyPolicyConsent: boolean, termsOfServiceConsent: boolean, personalInfoConsent: boolean, emailMarketingConsent: boolean, smsMarketingConsent: boolean, marketingConsentEmailUpdatedAt?: string | null | undefined, marketingConsentSmsUpdatedAt?: string | null | undefined, roleType: UserRoleType, createdAt: string, updatedAt: string } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', id: string, userId: string, birthdate?: string | null | undefined, name?: string | null | undefined, nickname?: string | null | undefined, phoneNumber?: string | null | undefined, countryCallingCode?: string | null | undefined, thumbnailUrl?: string | null | undefined, codingExperienceTypeList?: Array<string> | null | undefined, contactEmail?: string | null | undefined } };

export type SocialSignInMutationVariables = Exact<{
  input: SocialSignInInput;
}>;


export type SocialSignInMutation = { __typename?: 'Mutation', socialSignIn: { __typename?: 'SocialSignIn', success: boolean, user?: { __typename?: 'User', id: string, signUpType: SignUpType } | null | undefined, userInfo?: { __typename?: 'SocialUserInfo', name: string, userId: string, email: string } | null | undefined } };

export type SocialSignUpMutationVariables = Exact<{
  input: SocialSignUpInput;
}>;


export type SocialSignUpMutation = { __typename?: 'Mutation', socialSignUp: { __typename?: 'User', id: string, email: string } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ResetPassword', success: boolean } };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePassword', success: boolean } };

export type ConfirmProtectorEmailChangeMutationVariables = Exact<{
  input: ConfirmProtectorEmailChangeInput;
}>;


export type ConfirmProtectorEmailChangeMutation = { __typename?: 'Mutation', confirmProtectorEmailChange: { __typename?: 'Protector', name?: string | null | undefined, email?: string | null | undefined, countryCallingCode?: string | null | undefined, phoneNumber?: string | null | undefined, verified: boolean } };

export type ConfirmContactEmailChangeMutationVariables = Exact<{
  input: ConfirmContactEmailChangeInput;
}>;


export type ConfirmContactEmailChangeMutation = { __typename?: 'Mutation', confirmContactEmailChange: { __typename?: 'Profile', id: string, userId: string, birthdate?: string | null | undefined, name?: string | null | undefined, nickname?: string | null | undefined, phoneNumber?: string | null | undefined, countryCallingCode?: string | null | undefined, thumbnailUrl?: string | null | undefined, codingExperienceTypeList?: Array<string> | null | undefined, city?: string | null | undefined, region?: string | null | undefined, contactEmail?: string | null | undefined, contactEmailVerified: boolean } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'Profile', id: string, userId: string, birthdate?: string | null | undefined, name?: string | null | undefined, nickname?: string | null | undefined, countryCallingCode?: string | null | undefined, phoneNumber?: string | null | undefined, thumbnailUrl?: string | null | undefined, codingExperienceTypeList?: Array<string> | null | undefined, contactEmail?: string | null | undefined } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, uuid: string, email: string, signUpType: SignUpType, privacyPolicyConsent: boolean, termsOfServiceConsent: boolean, personalInfoConsent: boolean, emailMarketingConsent: boolean, smsMarketingConsent: boolean, marketingConsentSmsUpdatedAt?: string | null | undefined, marketingConsentEmailUpdatedAt?: string | null | undefined, roleType: UserRoleType, createdAt: string, updatedAt: string, isMinor: boolean, hasParentalConsent: boolean, protector?: { __typename?: 'Protector', name?: string | null | undefined, email?: string | null | undefined, countryCallingCode?: string | null | undefined, phoneNumber?: string | null | undefined, verified: boolean } | null | undefined } };


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
    moduleType
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
export const CheckAiModelNameDuplicateDocument = gql`
    query CheckAIModelNameDuplicate($input: CheckAIModelNameDuplicateInput!) {
  checkAIModelNameDuplicate(input: $input)
}
    `;

/**
 * __useCheckAiModelNameDuplicateQuery__
 *
 * To run a query within a React component, call `useCheckAiModelNameDuplicateQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckAiModelNameDuplicateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckAiModelNameDuplicateQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckAiModelNameDuplicateQuery(baseOptions: Apollo.QueryHookOptions<CheckAiModelNameDuplicateQuery, CheckAiModelNameDuplicateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckAiModelNameDuplicateQuery, CheckAiModelNameDuplicateQueryVariables>(CheckAiModelNameDuplicateDocument, options);
      }
export function useCheckAiModelNameDuplicateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckAiModelNameDuplicateQuery, CheckAiModelNameDuplicateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckAiModelNameDuplicateQuery, CheckAiModelNameDuplicateQueryVariables>(CheckAiModelNameDuplicateDocument, options);
        }
export type CheckAiModelNameDuplicateQueryHookResult = ReturnType<typeof useCheckAiModelNameDuplicateQuery>;
export type CheckAiModelNameDuplicateLazyQueryHookResult = ReturnType<typeof useCheckAiModelNameDuplicateLazyQuery>;
export type CheckAiModelNameDuplicateQueryResult = Apollo.QueryResult<CheckAiModelNameDuplicateQuery, CheckAiModelNameDuplicateQueryVariables>;
export const CourseDocument = gql`
    query Course($where: CourseWhere!) {
  course(where: $where) {
    id
    name
    description
    codeEditorType
    difficulty
    educationalPlan {
      url
      fileName
    }
    teachingMaterials {
      url
      fileName
    }
    lessonCount
    lessons {
      id
      idx
      name
      description
      state
      steps {
        step {
          id
          name
          description
          dType
        }
        idx
      }
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
export const MyCourseDashboardDocument = gql`
    query MyCourseDashboard {
  myCourseDashboard {
    recentLearning {
      course {
        id
        name
        courseGroupId
        courseGroupName
        codeEditorType
        difficulty
        firstLearning {
          courseGroupId
          courseId
          lessonId
          stepId
        }
      }
      progress {
        status
        displayProgress {
          totalLessons
          completedLessons
        }
        totalLessons
        completedLessons
        nextLearning {
          courseGroupId
          courseId
          lessonId
          lessonIdx
          stepId
        }
      }
      courseGroupId
    }
    learningStatus {
      enrolledCourseCount
      completedCourseCount
      inProgressCourseCount
      totalLearningTimeSeconds
      learningTimeByType {
        stepType
        totalActiveSeconds
        totalDurationSeconds
        sessionCount
      }
    }
  }
}
    `;

/**
 * __useMyCourseDashboardQuery__
 *
 * To run a query within a React component, call `useMyCourseDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCourseDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCourseDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCourseDashboardQuery(baseOptions?: Apollo.QueryHookOptions<MyCourseDashboardQuery, MyCourseDashboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCourseDashboardQuery, MyCourseDashboardQueryVariables>(MyCourseDashboardDocument, options);
      }
export function useMyCourseDashboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCourseDashboardQuery, MyCourseDashboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCourseDashboardQuery, MyCourseDashboardQueryVariables>(MyCourseDashboardDocument, options);
        }
export type MyCourseDashboardQueryHookResult = ReturnType<typeof useMyCourseDashboardQuery>;
export type MyCourseDashboardLazyQueryHookResult = ReturnType<typeof useMyCourseDashboardLazyQuery>;
export type MyCourseDashboardQueryResult = Apollo.QueryResult<MyCourseDashboardQuery, MyCourseDashboardQueryVariables>;
export const CourseRecommendsDocument = gql`
    query CourseRecommends($kinds: [CourseRecommendKind!]!, $first: Int) {
  courseRecommends(kinds: $kinds, first: $first) {
    kind
    courses {
      id
      name
      description
      courseGroupId
      courseGroupName
      codeEditorType
      difficulty
      lessonCount
    }
  }
}
    `;

/**
 * __useCourseRecommendsQuery__
 *
 * To run a query within a React component, call `useCourseRecommendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseRecommendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseRecommendsQuery({
 *   variables: {
 *      kinds: // value for 'kinds'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useCourseRecommendsQuery(baseOptions: Apollo.QueryHookOptions<CourseRecommendsQuery, CourseRecommendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseRecommendsQuery, CourseRecommendsQueryVariables>(CourseRecommendsDocument, options);
      }
export function useCourseRecommendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseRecommendsQuery, CourseRecommendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseRecommendsQuery, CourseRecommendsQueryVariables>(CourseRecommendsDocument, options);
        }
export type CourseRecommendsQueryHookResult = ReturnType<typeof useCourseRecommendsQuery>;
export type CourseRecommendsLazyQueryHookResult = ReturnType<typeof useCourseRecommendsLazyQuery>;
export type CourseRecommendsQueryResult = Apollo.QueryResult<CourseRecommendsQuery, CourseRecommendsQueryVariables>;
export const MyCourseConnectionDocument = gql`
    query MyCourseConnection($first: Int, $offset: Int, $orderBy: CourseConnectionOrder, $where: MyCourseConnectionWhere) {
  myCourseConnection(
    first: $first
    offset: $offset
    orderBy: $orderBy
    where: $where
  ) {
    nodes {
      id
      name
      description
      courseGroupId
      courseGroupName
      firstLearning {
        courseGroupId
        courseId
        lessonId
        stepId
      }
      nextLearning {
        courseGroupId
        courseId
        courseName
        totalLessonsInCourse
        lessonId
        lessonName
        lessonIdx
        stepId
        stepName
        stepIdx
        totalStepsInLesson
      }
      codeEditorType
      difficulty
      lessonCount
      lessons {
        id
      }
      myProgress {
        status
        displayProgress {
          totalLessons
          completedLessons
        }
      }
    }
    totalCount
  }
}
    `;

/**
 * __useMyCourseConnectionQuery__
 *
 * To run a query within a React component, call `useMyCourseConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCourseConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCourseConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useMyCourseConnectionQuery(baseOptions?: Apollo.QueryHookOptions<MyCourseConnectionQuery, MyCourseConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCourseConnectionQuery, MyCourseConnectionQueryVariables>(MyCourseConnectionDocument, options);
      }
export function useMyCourseConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCourseConnectionQuery, MyCourseConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCourseConnectionQuery, MyCourseConnectionQueryVariables>(MyCourseConnectionDocument, options);
        }
export type MyCourseConnectionQueryHookResult = ReturnType<typeof useMyCourseConnectionQuery>;
export type MyCourseConnectionLazyQueryHookResult = ReturnType<typeof useMyCourseConnectionLazyQuery>;
export type MyCourseConnectionQueryResult = Apollo.QueryResult<MyCourseConnectionQuery, MyCourseConnectionQueryVariables>;
export const MyCourseDetailDocument = gql`
    query MyCourseDetail($where: MyCourseDetailWhere!) {
  myCourseDetail(where: $where) {
    courseId
    name
    description
    courseGroupName
    difficulty
    codeEditorType
    educationalPlan {
      url
      fileName
    }
    teachingMaterials {
      url
      fileName
    }
    status
    firstLearning {
      lessonId
      stepId
    }
    nextLearning {
      lessonId
      lessonIdx
      stepId
    }
    displayProgress {
      totalLessons
      completedLessons
    }
    actualProgress {
      totalLessons
      completedLessons
    }
    completedAt
    lessons {
      lessonId
      idx
      lessonName
      description
      status
      totalSteps
      completedSteps
      steps {
        stepId
        idx
        stepName
        stepType
        status
        progressRate
      }
    }
  }
}
    `;

/**
 * __useMyCourseDetailQuery__
 *
 * To run a query within a React component, call `useMyCourseDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCourseDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCourseDetailQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useMyCourseDetailQuery(baseOptions: Apollo.QueryHookOptions<MyCourseDetailQuery, MyCourseDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCourseDetailQuery, MyCourseDetailQueryVariables>(MyCourseDetailDocument, options);
      }
export function useMyCourseDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCourseDetailQuery, MyCourseDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCourseDetailQuery, MyCourseDetailQueryVariables>(MyCourseDetailDocument, options);
        }
export type MyCourseDetailQueryHookResult = ReturnType<typeof useMyCourseDetailQuery>;
export type MyCourseDetailLazyQueryHookResult = ReturnType<typeof useMyCourseDetailLazyQuery>;
export type MyCourseDetailQueryResult = Apollo.QueryResult<MyCourseDetailQuery, MyCourseDetailQueryVariables>;
export const CourseGroupConnectionDocument = gql`
    query CourseGroupConnection($first: Int, $after: String, $offset: Int, $where: CourseGroupConnectionWhere) {
  courseGroupConnection(
    first: $first
    after: $after
    offset: $offset
    where: $where
  ) {
    nodes {
      id
      name
      description
      courses {
        course {
          id
          name
          description
          codeEditorType
          difficulty
          lessonCount
          lessons {
            id
          }
        }
        effectiveStatus
      }
    }
    filterCourse {
      codingTypes {
        value
        count
      }
      difficulties {
        value
        count
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}
    `;

/**
 * __useCourseGroupConnectionQuery__
 *
 * To run a query within a React component, call `useCourseGroupConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseGroupConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseGroupConnectionQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCourseGroupConnectionQuery(baseOptions?: Apollo.QueryHookOptions<CourseGroupConnectionQuery, CourseGroupConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseGroupConnectionQuery, CourseGroupConnectionQueryVariables>(CourseGroupConnectionDocument, options);
      }
export function useCourseGroupConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseGroupConnectionQuery, CourseGroupConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseGroupConnectionQuery, CourseGroupConnectionQueryVariables>(CourseGroupConnectionDocument, options);
        }
export type CourseGroupConnectionQueryHookResult = ReturnType<typeof useCourseGroupConnectionQuery>;
export type CourseGroupConnectionLazyQueryHookResult = ReturnType<typeof useCourseGroupConnectionLazyQuery>;
export type CourseGroupConnectionQueryResult = Apollo.QueryResult<CourseGroupConnectionQuery, CourseGroupConnectionQueryVariables>;
export const CreateCourseParticipantLessonFeedbackDocument = gql`
    mutation CreateCourseParticipantLessonFeedback($input: CreateCourseParticipantLessonFeedbackInput!) {
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
export const CourseLessonDocument = gql`
    query CourseLesson($where: CourseLessonWhere!) {
  courseLesson(where: $where) {
    effectiveStatus
    steps {
      step {
        id
        dType
        ... on CourseStepCoding {
          coding {
            codingType
            learningObjective
            activity
          }
        }
        ... on CourseStepPdf {
          pdf {
            file {
              url
            }
            totalCount
          }
        }
        ... on CourseStepPpt {
          ppt {
            file {
              url
            }
            slideCount
            analysisStatus
            convertedPdfUrl
            videoOverlays {
              page
              mediaFile
              videoUrl
              x
              y
              width
              height
            }
          }
        }
        ... on CourseStepVod {
          vod {
            url
          }
        }
        ... on CourseStepYoutube {
          youtube {
            url
          }
        }
      }
      idx
      effectiveStatus
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
export const StartStepDocument = gql`
    mutation StartStep($input: StartStepInput!) {
  startStep(input: $input) {
    stepId
    stepName
    stepType
    status
    progressRate
    joinedTime
    attemptCount
    score
    detail
    startedAt
    lastAccessedAt
    completedAt
  }
}
    `;
export type StartStepMutationFn = Apollo.MutationFunction<StartStepMutation, StartStepMutationVariables>;

/**
 * __useStartStepMutation__
 *
 * To run a mutation, you first call `useStartStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startStepMutation, { data, loading, error }] = useStartStepMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStartStepMutation(baseOptions?: Apollo.MutationHookOptions<StartStepMutation, StartStepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartStepMutation, StartStepMutationVariables>(StartStepDocument, options);
      }
export type StartStepMutationHookResult = ReturnType<typeof useStartStepMutation>;
export type StartStepMutationResult = Apollo.MutationResult<StartStepMutation>;
export type StartStepMutationOptions = Apollo.BaseMutationOptions<StartStepMutation, StartStepMutationVariables>;
export const UpdateCourseStepDocument = gql`
    mutation UpdateCourseStep($input: UpdateCourseStepInput!) {
  updateCourseStep(input: $input)
}
    `;
export type UpdateCourseStepMutationFn = Apollo.MutationFunction<UpdateCourseStepMutation, UpdateCourseStepMutationVariables>;

/**
 * __useUpdateCourseStepMutation__
 *
 * To run a mutation, you first call `useUpdateCourseStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseStepMutation, { data, loading, error }] = useUpdateCourseStepMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCourseStepMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseStepMutation, UpdateCourseStepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseStepMutation, UpdateCourseStepMutationVariables>(UpdateCourseStepDocument, options);
      }
export type UpdateCourseStepMutationHookResult = ReturnType<typeof useUpdateCourseStepMutation>;
export type UpdateCourseStepMutationResult = Apollo.MutationResult<UpdateCourseStepMutation>;
export type UpdateCourseStepMutationOptions = Apollo.BaseMutationOptions<UpdateCourseStepMutation, UpdateCourseStepMutationVariables>;
export const UpdateStepProgressDocument = gql`
    mutation UpdateStepProgress($input: UpdateStepProgressInput!) {
  updateStepProgress(input: $input) {
    stepId
    stepName
    stepType
    status
    progressRate
    joinedTime
    attemptCount
    score
    detail
    startedAt
    lastAccessedAt
    completedAt
  }
}
    `;
export type UpdateStepProgressMutationFn = Apollo.MutationFunction<UpdateStepProgressMutation, UpdateStepProgressMutationVariables>;

/**
 * __useUpdateStepProgressMutation__
 *
 * To run a mutation, you first call `useUpdateStepProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStepProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStepProgressMutation, { data, loading, error }] = useUpdateStepProgressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStepProgressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStepProgressMutation, UpdateStepProgressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStepProgressMutation, UpdateStepProgressMutationVariables>(UpdateStepProgressDocument, options);
      }
export type UpdateStepProgressMutationHookResult = ReturnType<typeof useUpdateStepProgressMutation>;
export type UpdateStepProgressMutationResult = Apollo.MutationResult<UpdateStepProgressMutation>;
export type UpdateStepProgressMutationOptions = Apollo.BaseMutationOptions<UpdateStepProgressMutation, UpdateStepProgressMutationVariables>;
export const CompleteStepDocument = gql`
    mutation CompleteStep($input: CompleteStepInput!) {
  completeStep(input: $input) {
    stepId
    stepName
    stepType
    status
    progressRate
    joinedTime
    attemptCount
    score
    detail
    startedAt
    lastAccessedAt
    completedAt
  }
}
    `;
export type CompleteStepMutationFn = Apollo.MutationFunction<CompleteStepMutation, CompleteStepMutationVariables>;

/**
 * __useCompleteStepMutation__
 *
 * To run a mutation, you first call `useCompleteStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeStepMutation, { data, loading, error }] = useCompleteStepMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCompleteStepMutation(baseOptions?: Apollo.MutationHookOptions<CompleteStepMutation, CompleteStepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteStepMutation, CompleteStepMutationVariables>(CompleteStepDocument, options);
      }
export type CompleteStepMutationHookResult = ReturnType<typeof useCompleteStepMutation>;
export type CompleteStepMutationResult = Apollo.MutationResult<CompleteStepMutation>;
export type CompleteStepMutationOptions = Apollo.BaseMutationOptions<CompleteStepMutation, CompleteStepMutationVariables>;
export const LibraryDocument = gql`
    query Library($input: LibraryInput!) {
  library(input: $input) {
    id
    viewCount
    language
    title
    content
    attachments {
      id
      name
      url
    }
    createdAt
    isNew
    isExposed
    cursorInfo {
      before
      after
    }
  }
}
    `;

/**
 * __useLibraryQuery__
 *
 * To run a query within a React component, call `useLibraryQuery` and pass it any options that fit your needs.
 * When your component renders, `useLibraryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLibraryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLibraryQuery(baseOptions: Apollo.QueryHookOptions<LibraryQuery, LibraryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LibraryQuery, LibraryQueryVariables>(LibraryDocument, options);
      }
export function useLibraryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LibraryQuery, LibraryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LibraryQuery, LibraryQueryVariables>(LibraryDocument, options);
        }
export type LibraryQueryHookResult = ReturnType<typeof useLibraryQuery>;
export type LibraryLazyQueryHookResult = ReturnType<typeof useLibraryLazyQuery>;
export type LibraryQueryResult = Apollo.QueryResult<LibraryQuery, LibraryQueryVariables>;
export const LibraryConnectionDocument = gql`
    query LibraryConnection($input: LibraryConnectionInput!) {
  libraryConnection(input: $input) {
    nodes {
      id
      viewCount
      language
      title
      content
      createdAt
      isNew
      isExposed
    }
    totalCount
  }
}
    `;

/**
 * __useLibraryConnectionQuery__
 *
 * To run a query within a React component, call `useLibraryConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useLibraryConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLibraryConnectionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLibraryConnectionQuery(baseOptions: Apollo.QueryHookOptions<LibraryConnectionQuery, LibraryConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LibraryConnectionQuery, LibraryConnectionQueryVariables>(LibraryConnectionDocument, options);
      }
export function useLibraryConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LibraryConnectionQuery, LibraryConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LibraryConnectionQuery, LibraryConnectionQueryVariables>(LibraryConnectionDocument, options);
        }
export type LibraryConnectionQueryHookResult = ReturnType<typeof useLibraryConnectionQuery>;
export type LibraryConnectionLazyQueryHookResult = ReturnType<typeof useLibraryConnectionLazyQuery>;
export type LibraryConnectionQueryResult = Apollo.QueryResult<LibraryConnectionQuery, LibraryConnectionQueryVariables>;
export const CreateModiDataDocument = gql`
    mutation CreateModiData($input: CreateModiDataInput!) {
  createModiData(input: $input) {
    id
  }
}
    `;
export type CreateModiDataMutationFn = Apollo.MutationFunction<CreateModiDataMutation, CreateModiDataMutationVariables>;

/**
 * __useCreateModiDataMutation__
 *
 * To run a mutation, you first call `useCreateModiDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateModiDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createModiDataMutation, { data, loading, error }] = useCreateModiDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateModiDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateModiDataMutation, CreateModiDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateModiDataMutation, CreateModiDataMutationVariables>(CreateModiDataDocument, options);
      }
export type CreateModiDataMutationHookResult = ReturnType<typeof useCreateModiDataMutation>;
export type CreateModiDataMutationResult = Apollo.MutationResult<CreateModiDataMutation>;
export type CreateModiDataMutationOptions = Apollo.BaseMutationOptions<CreateModiDataMutation, CreateModiDataMutationVariables>;
export const CreateModiDataListDocument = gql`
    mutation CreateModiDataList($input: CreateModiDataListInput!) {
  createModiDataList(input: $input) {
    ids
  }
}
    `;
export type CreateModiDataListMutationFn = Apollo.MutationFunction<CreateModiDataListMutation, CreateModiDataListMutationVariables>;

/**
 * __useCreateModiDataListMutation__
 *
 * To run a mutation, you first call `useCreateModiDataListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateModiDataListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createModiDataListMutation, { data, loading, error }] = useCreateModiDataListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateModiDataListMutation(baseOptions?: Apollo.MutationHookOptions<CreateModiDataListMutation, CreateModiDataListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateModiDataListMutation, CreateModiDataListMutationVariables>(CreateModiDataListDocument, options);
      }
export type CreateModiDataListMutationHookResult = ReturnType<typeof useCreateModiDataListMutation>;
export type CreateModiDataListMutationResult = Apollo.MutationResult<CreateModiDataListMutation>;
export type CreateModiDataListMutationOptions = Apollo.BaseMutationOptions<CreateModiDataListMutation, CreateModiDataListMutationVariables>;
export const DeleteModiDataDocument = gql`
    mutation DeleteModiData($input: DeleteModiDataInput!) {
  deleteModiData(input: $input) {
    success
  }
}
    `;
export type DeleteModiDataMutationFn = Apollo.MutationFunction<DeleteModiDataMutation, DeleteModiDataMutationVariables>;

/**
 * __useDeleteModiDataMutation__
 *
 * To run a mutation, you first call `useDeleteModiDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteModiDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteModiDataMutation, { data, loading, error }] = useDeleteModiDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteModiDataMutation(baseOptions?: Apollo.MutationHookOptions<DeleteModiDataMutation, DeleteModiDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteModiDataMutation, DeleteModiDataMutationVariables>(DeleteModiDataDocument, options);
      }
export type DeleteModiDataMutationHookResult = ReturnType<typeof useDeleteModiDataMutation>;
export type DeleteModiDataMutationResult = Apollo.MutationResult<DeleteModiDataMutation>;
export type DeleteModiDataMutationOptions = Apollo.BaseMutationOptions<DeleteModiDataMutation, DeleteModiDataMutationVariables>;
export const DeleteModiDataListDocument = gql`
    mutation DeleteModiDataList($input: DeleteModiDataListInput!) {
  deleteModiDataList(input: $input) {
    success
  }
}
    `;
export type DeleteModiDataListMutationFn = Apollo.MutationFunction<DeleteModiDataListMutation, DeleteModiDataListMutationVariables>;

/**
 * __useDeleteModiDataListMutation__
 *
 * To run a mutation, you first call `useDeleteModiDataListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteModiDataListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteModiDataListMutation, { data, loading, error }] = useDeleteModiDataListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteModiDataListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteModiDataListMutation, DeleteModiDataListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteModiDataListMutation, DeleteModiDataListMutationVariables>(DeleteModiDataListDocument, options);
      }
export type DeleteModiDataListMutationHookResult = ReturnType<typeof useDeleteModiDataListMutation>;
export type DeleteModiDataListMutationResult = Apollo.MutationResult<DeleteModiDataListMutation>;
export type DeleteModiDataListMutationOptions = Apollo.BaseMutationOptions<DeleteModiDataListMutation, DeleteModiDataListMutationVariables>;
export const UpdateModiDataDocument = gql`
    mutation UpdateModiData($input: UpdateModiDataInput!) {
  updateModiData(input: $input) {
    id
  }
}
    `;
export type UpdateModiDataMutationFn = Apollo.MutationFunction<UpdateModiDataMutation, UpdateModiDataMutationVariables>;

/**
 * __useUpdateModiDataMutation__
 *
 * To run a mutation, you first call `useUpdateModiDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModiDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModiDataMutation, { data, loading, error }] = useUpdateModiDataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateModiDataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateModiDataMutation, UpdateModiDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateModiDataMutation, UpdateModiDataMutationVariables>(UpdateModiDataDocument, options);
      }
export type UpdateModiDataMutationHookResult = ReturnType<typeof useUpdateModiDataMutation>;
export type UpdateModiDataMutationResult = Apollo.MutationResult<UpdateModiDataMutation>;
export type UpdateModiDataMutationOptions = Apollo.BaseMutationOptions<UpdateModiDataMutation, UpdateModiDataMutationVariables>;
export const ModiDataDocument = gql`
    query ModiData($input: ModiDataInput!) {
  modiData(input: $input) {
    id
    name
    moduleType
    functionType
    data
    createdAt
  }
}
    `;

/**
 * __useModiDataQuery__
 *
 * To run a query within a React component, call `useModiDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useModiDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModiDataQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useModiDataQuery(baseOptions: Apollo.QueryHookOptions<ModiDataQuery, ModiDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModiDataQuery, ModiDataQueryVariables>(ModiDataDocument, options);
      }
export function useModiDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModiDataQuery, ModiDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModiDataQuery, ModiDataQueryVariables>(ModiDataDocument, options);
        }
export type ModiDataQueryHookResult = ReturnType<typeof useModiDataQuery>;
export type ModiDataLazyQueryHookResult = ReturnType<typeof useModiDataLazyQuery>;
export type ModiDataQueryResult = Apollo.QueryResult<ModiDataQuery, ModiDataQueryVariables>;
export const ModiDataConnectionDocument = gql`
    query ModiDataConnection($input: ModiDataConnectionInput!) {
  modiDataConnection(input: $input) {
    nodes {
      id
      name
      moduleType
      functionType
      data
      createdAt
    }
    totalCount
  }
}
    `;

/**
 * __useModiDataConnectionQuery__
 *
 * To run a query within a React component, call `useModiDataConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useModiDataConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModiDataConnectionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useModiDataConnectionQuery(baseOptions: Apollo.QueryHookOptions<ModiDataConnectionQuery, ModiDataConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModiDataConnectionQuery, ModiDataConnectionQueryVariables>(ModiDataConnectionDocument, options);
      }
export function useModiDataConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModiDataConnectionQuery, ModiDataConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModiDataConnectionQuery, ModiDataConnectionQueryVariables>(ModiDataConnectionDocument, options);
        }
export type ModiDataConnectionQueryHookResult = ReturnType<typeof useModiDataConnectionQuery>;
export type ModiDataConnectionLazyQueryHookResult = ReturnType<typeof useModiDataConnectionLazyQuery>;
export type ModiDataConnectionQueryResult = Apollo.QueryResult<ModiDataConnectionQuery, ModiDataConnectionQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    title
    runType
    jsonData
    thumb {
      domain
      url
      width
      height
      idx
      key
    }
    createdAt
    updatedAt
    infoCode
    infoMessage
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($input: UpdateProjectInput!) {
  updateProject(input: $input) {
    id
    title
    runType
    jsonData
    thumb {
      domain
      url
      width
      height
      idx
      key
    }
    createdAt
    updatedAt
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($input: DeleteProjectInput!) {
  deleteProject(input: $input)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const AddProjectFavoriteDocument = gql`
    mutation AddProjectFavorite($input: AddProjectFavoriteInput!) {
  addProjectFavorite(input: $input)
}
    `;
export type AddProjectFavoriteMutationFn = Apollo.MutationFunction<AddProjectFavoriteMutation, AddProjectFavoriteMutationVariables>;

/**
 * __useAddProjectFavoriteMutation__
 *
 * To run a mutation, you first call `useAddProjectFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectFavoriteMutation, { data, loading, error }] = useAddProjectFavoriteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProjectFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectFavoriteMutation, AddProjectFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectFavoriteMutation, AddProjectFavoriteMutationVariables>(AddProjectFavoriteDocument, options);
      }
export type AddProjectFavoriteMutationHookResult = ReturnType<typeof useAddProjectFavoriteMutation>;
export type AddProjectFavoriteMutationResult = Apollo.MutationResult<AddProjectFavoriteMutation>;
export type AddProjectFavoriteMutationOptions = Apollo.BaseMutationOptions<AddProjectFavoriteMutation, AddProjectFavoriteMutationVariables>;
export const RemoveProjectFavoriteDocument = gql`
    mutation RemoveProjectFavorite($input: RemoveProjectFavoriteInput!) {
  removeProjectFavorite(input: $input)
}
    `;
export type RemoveProjectFavoriteMutationFn = Apollo.MutationFunction<RemoveProjectFavoriteMutation, RemoveProjectFavoriteMutationVariables>;

/**
 * __useRemoveProjectFavoriteMutation__
 *
 * To run a mutation, you first call `useRemoveProjectFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectFavoriteMutation, { data, loading, error }] = useRemoveProjectFavoriteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveProjectFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProjectFavoriteMutation, RemoveProjectFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProjectFavoriteMutation, RemoveProjectFavoriteMutationVariables>(RemoveProjectFavoriteDocument, options);
      }
export type RemoveProjectFavoriteMutationHookResult = ReturnType<typeof useRemoveProjectFavoriteMutation>;
export type RemoveProjectFavoriteMutationResult = Apollo.MutationResult<RemoveProjectFavoriteMutation>;
export type RemoveProjectFavoriteMutationOptions = Apollo.BaseMutationOptions<RemoveProjectFavoriteMutation, RemoveProjectFavoriteMutationVariables>;
export const ProjectDocument = gql`
    query Project($where: ProjectWhere!) {
  project(where: $where) {
    id
    title
    codeType
    runType
    jsonData
    isFavorite
    thumb {
      domain
      url
      width
      height
      idx
      key
    }
    infoMessage
    infoCode
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectConnectionDocument = gql`
    query ProjectConnection($where: ProjectConnectionWhere!, $first: Int, $after: String, $offset: Int, $orderBy: ProjectConnectionOrder) {
  projectConnection(
    where: $where
    first: $first
    after: $after
    offset: $offset
    orderBy: $orderBy
  ) {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasBeforePage
    }
    nodes {
      id
      title
      codeType
      runType
      isFavorite
      jsonData
      thumb {
        domain
        url
        width
        height
        idx
        key
      }
      createdAt
      updatedAt
    }
    edges {
      cursor
      node {
        id
        title
        codeType
        runType
        jsonData
        thumb {
          domain
          url
          width
          height
          idx
          key
        }
        createdAt
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useProjectConnectionQuery__
 *
 * To run a query within a React component, call `useProjectConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectConnectionQuery({
 *   variables: {
 *      where: // value for 'where'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useProjectConnectionQuery(baseOptions: Apollo.QueryHookOptions<ProjectConnectionQuery, ProjectConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectConnectionQuery, ProjectConnectionQueryVariables>(ProjectConnectionDocument, options);
      }
export function useProjectConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectConnectionQuery, ProjectConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectConnectionQuery, ProjectConnectionQueryVariables>(ProjectConnectionDocument, options);
        }
export type ProjectConnectionQueryHookResult = ReturnType<typeof useProjectConnectionQuery>;
export type ProjectConnectionLazyQueryHookResult = ReturnType<typeof useProjectConnectionLazyQuery>;
export type ProjectConnectionQueryResult = Apollo.QueryResult<ProjectConnectionQuery, ProjectConnectionQueryVariables>;
export const ProjectNameExistDocument = gql`
    query projectNameExist($where: ProjectNameExistWhere!) {
  projectNameExist(where: $where)
}
    `;

/**
 * __useProjectNameExistQuery__
 *
 * To run a query within a React component, call `useProjectNameExistQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectNameExistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectNameExistQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProjectNameExistQuery(baseOptions: Apollo.QueryHookOptions<ProjectNameExistQuery, ProjectNameExistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectNameExistQuery, ProjectNameExistQueryVariables>(ProjectNameExistDocument, options);
      }
export function useProjectNameExistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectNameExistQuery, ProjectNameExistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectNameExistQuery, ProjectNameExistQueryVariables>(ProjectNameExistDocument, options);
        }
export type ProjectNameExistQueryHookResult = ReturnType<typeof useProjectNameExistQuery>;
export type ProjectNameExistLazyQueryHookResult = ReturnType<typeof useProjectNameExistLazyQuery>;
export type ProjectNameExistQueryResult = Apollo.QueryResult<ProjectNameExistQuery, ProjectNameExistQueryVariables>;
export const CreateContactDocument = gql`
    mutation CreateContact($input: CreateContactInput!) {
  createContact(input: $input) {
    id
    userId
    subject
    title
    content
    fileList {
      name
      url
    }
    createdAt
    updatedAt
    state
    responseMessage
    respondedAt
  }
}
    `;
export type CreateContactMutationFn = Apollo.MutationFunction<CreateContactMutation, CreateContactMutationVariables>;

/**
 * __useCreateContactMutation__
 *
 * To run a mutation, you first call `useCreateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContactMutation(baseOptions?: Apollo.MutationHookOptions<CreateContactMutation, CreateContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContactMutation, CreateContactMutationVariables>(CreateContactDocument, options);
      }
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>;
export type CreateContactMutationResult = Apollo.MutationResult<CreateContactMutation>;
export type CreateContactMutationOptions = Apollo.BaseMutationOptions<CreateContactMutation, CreateContactMutationVariables>;
export const DeleteContactDocument = gql`
    mutation DeleteContact($input: DeleteContactInput!) {
  deleteContact(input: $input) {
    success
  }
}
    `;
export type DeleteContactMutationFn = Apollo.MutationFunction<DeleteContactMutation, DeleteContactMutationVariables>;

/**
 * __useDeleteContactMutation__
 *
 * To run a mutation, you first call `useDeleteContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContactMutation, { data, loading, error }] = useDeleteContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteContactMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContactMutation, DeleteContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContactMutation, DeleteContactMutationVariables>(DeleteContactDocument, options);
      }
export type DeleteContactMutationHookResult = ReturnType<typeof useDeleteContactMutation>;
export type DeleteContactMutationResult = Apollo.MutationResult<DeleteContactMutation>;
export type DeleteContactMutationOptions = Apollo.BaseMutationOptions<DeleteContactMutation, DeleteContactMutationVariables>;
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($input: MarkNotificationAsReadInput!) {
  markNotificationAsRead(input: $input)
}
    `;
export type MarkNotificationAsReadMutationFn = Apollo.MutationFunction<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;

/**
 * __useMarkNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationAsReadMutation, { data, loading, error }] = useMarkNotificationAsReadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkNotificationAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, options);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = Apollo.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const ContactDocument = gql`
    query Contact($input: ContactInput!) {
  contact(input: $input) {
    id
    userId
    userName
    subject
    title
    content
    fileList {
      name
      url
    }
    createdAt
    updatedAt
    state
    responseMessage
    respondedAt
  }
}
    `;

/**
 * __useContactQuery__
 *
 * To run a query within a React component, call `useContactQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useContactQuery(baseOptions: Apollo.QueryHookOptions<ContactQuery, ContactQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactQuery, ContactQueryVariables>(ContactDocument, options);
      }
export function useContactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactQuery, ContactQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactQuery, ContactQueryVariables>(ContactDocument, options);
        }
export type ContactQueryHookResult = ReturnType<typeof useContactQuery>;
export type ContactLazyQueryHookResult = ReturnType<typeof useContactLazyQuery>;
export type ContactQueryResult = Apollo.QueryResult<ContactQuery, ContactQueryVariables>;
export const ContactConnectionDocument = gql`
    query ContactConnection($input: ContactConnectionInput!) {
  contactConnection(input: $input) {
    nodes {
      id
      userId
      userName
      subject
      title
      content
      fileList {
        name
        url
      }
      createdAt
      updatedAt
      state
      responseMessage
      respondedAt
    }
    totalCount
  }
}
    `;

/**
 * __useContactConnectionQuery__
 *
 * To run a query within a React component, call `useContactConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactConnectionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useContactConnectionQuery(baseOptions: Apollo.QueryHookOptions<ContactConnectionQuery, ContactConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactConnectionQuery, ContactConnectionQueryVariables>(ContactConnectionDocument, options);
      }
export function useContactConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactConnectionQuery, ContactConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactConnectionQuery, ContactConnectionQueryVariables>(ContactConnectionDocument, options);
        }
export type ContactConnectionQueryHookResult = ReturnType<typeof useContactConnectionQuery>;
export type ContactConnectionLazyQueryHookResult = ReturnType<typeof useContactConnectionLazyQuery>;
export type ContactConnectionQueryResult = Apollo.QueryResult<ContactConnectionQuery, ContactConnectionQueryVariables>;
export const NoticeConnectionDocument = gql`
    query NoticeConnection($input: NoticeConnectionInput!) {
  noticeConnection(input: $input) {
    nodes {
      id
      isTop
      viewCount
      language
      title
      content
      isNew
      createdAt
    }
    totalCount
  }
}
    `;

/**
 * __useNoticeConnectionQuery__
 *
 * To run a query within a React component, call `useNoticeConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoticeConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoticeConnectionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNoticeConnectionQuery(baseOptions: Apollo.QueryHookOptions<NoticeConnectionQuery, NoticeConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NoticeConnectionQuery, NoticeConnectionQueryVariables>(NoticeConnectionDocument, options);
      }
export function useNoticeConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NoticeConnectionQuery, NoticeConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NoticeConnectionQuery, NoticeConnectionQueryVariables>(NoticeConnectionDocument, options);
        }
export type NoticeConnectionQueryHookResult = ReturnType<typeof useNoticeConnectionQuery>;
export type NoticeConnectionLazyQueryHookResult = ReturnType<typeof useNoticeConnectionLazyQuery>;
export type NoticeConnectionQueryResult = Apollo.QueryResult<NoticeConnectionQuery, NoticeConnectionQueryVariables>;
export const NoticeDocument = gql`
    query Notice($input: NoticeInput!) {
  notice(input: $input) {
    id
    isTop
    viewCount
    language
    title
    content
    attachments {
      id
      name
      url
    }
    isNew
    createdAt
    isExposed
    cursorInfo {
      before
      after
    }
  }
}
    `;

/**
 * __useNoticeQuery__
 *
 * To run a query within a React component, call `useNoticeQuery` and pass it any options that fit your needs.
 * When your component renders, `useNoticeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNoticeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNoticeQuery(baseOptions: Apollo.QueryHookOptions<NoticeQuery, NoticeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NoticeQuery, NoticeQueryVariables>(NoticeDocument, options);
      }
export function useNoticeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NoticeQuery, NoticeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NoticeQuery, NoticeQueryVariables>(NoticeDocument, options);
        }
export type NoticeQueryHookResult = ReturnType<typeof useNoticeQuery>;
export type NoticeLazyQueryHookResult = ReturnType<typeof useNoticeLazyQuery>;
export type NoticeQueryResult = Apollo.QueryResult<NoticeQuery, NoticeQueryVariables>;
export const FaqDocument = gql`
    query Faq($input: FaqInput!) {
  faq(input: $input) {
    id
    category
    subCategory
    viewCount
    language
    title
    content
    createdAt
  }
}
    `;

/**
 * __useFaqQuery__
 *
 * To run a query within a React component, call `useFaqQuery` and pass it any options that fit your needs.
 * When your component renders, `useFaqQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFaqQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFaqQuery(baseOptions: Apollo.QueryHookOptions<FaqQuery, FaqQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FaqQuery, FaqQueryVariables>(FaqDocument, options);
      }
export function useFaqLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FaqQuery, FaqQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FaqQuery, FaqQueryVariables>(FaqDocument, options);
        }
export type FaqQueryHookResult = ReturnType<typeof useFaqQuery>;
export type FaqLazyQueryHookResult = ReturnType<typeof useFaqLazyQuery>;
export type FaqQueryResult = Apollo.QueryResult<FaqQuery, FaqQueryVariables>;
export const FaqConnectionDocument = gql`
    query FaqConnection($input: FaqConnectionInput!) {
  faqConnection(input: $input) {
    nodes {
      id
      category
      subCategory
      viewCount
      language
      title
      content
      createdAt
    }
    totalCount
  }
}
    `;

/**
 * __useFaqConnectionQuery__
 *
 * To run a query within a React component, call `useFaqConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFaqConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFaqConnectionQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFaqConnectionQuery(baseOptions: Apollo.QueryHookOptions<FaqConnectionQuery, FaqConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FaqConnectionQuery, FaqConnectionQueryVariables>(FaqConnectionDocument, options);
      }
export function useFaqConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FaqConnectionQuery, FaqConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FaqConnectionQuery, FaqConnectionQueryVariables>(FaqConnectionDocument, options);
        }
export type FaqConnectionQueryHookResult = ReturnType<typeof useFaqConnectionQuery>;
export type FaqConnectionLazyQueryHookResult = ReturnType<typeof useFaqConnectionLazyQuery>;
export type FaqConnectionQueryResult = Apollo.QueryResult<FaqConnectionQuery, FaqConnectionQueryVariables>;
export const NotificationConnectionDocument = gql`
    query NotificationConnection($input: NotificationConnectionInput!) {
  notificationConnection(input: $input) {
    nodes {
      id
      userId
      profileId
      title
      description
      webLinkPath
      iconUrl
      state
      uiType
      type
      createdAt
      updatedAt
    }
    totalCount
    edges {
      cursor
      node {
        id
        userId
        profileId
        title
        description
        webLinkPath
        iconUrl
        state
        uiType
        type
        createdAt
        updatedAt
      }
    }
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
 *      input: // value for 'input'
 *   },
 * });
 */
export function useNotificationConnectionQuery(baseOptions: Apollo.QueryHookOptions<NotificationConnectionQuery, NotificationConnectionQueryVariables>) {
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
export const NotificationUnreadCountDocument = gql`
    query NotificationUnreadCount($deviceTypes: [DeviceType!]) {
  notificationUnreadCount(deviceTypes: $deviceTypes)
}
    `;

/**
 * __useNotificationUnreadCountQuery__
 *
 * To run a query within a React component, call `useNotificationUnreadCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationUnreadCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationUnreadCountQuery({
 *   variables: {
 *      deviceTypes: // value for 'deviceTypes'
 *   },
 * });
 */
export function useNotificationUnreadCountQuery(baseOptions?: Apollo.QueryHookOptions<NotificationUnreadCountQuery, NotificationUnreadCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationUnreadCountQuery, NotificationUnreadCountQueryVariables>(NotificationUnreadCountDocument, options);
      }
export function useNotificationUnreadCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationUnreadCountQuery, NotificationUnreadCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationUnreadCountQuery, NotificationUnreadCountQueryVariables>(NotificationUnreadCountDocument, options);
        }
export type NotificationUnreadCountQueryHookResult = ReturnType<typeof useNotificationUnreadCountQuery>;
export type NotificationUnreadCountLazyQueryHookResult = ReturnType<typeof useNotificationUnreadCountLazyQuery>;
export type NotificationUnreadCountQueryResult = Apollo.QueryResult<NotificationUnreadCountQuery, NotificationUnreadCountQueryVariables>;
export const NotificationAddedDocument = gql`
    subscription NotificationAdded {
  notificationAdded {
    id
    userId
    profileId
    title
    description
    webLinkPath
    iconUrl
    state
    uiType
    type
    deviceType
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useNotificationAddedSubscription__
 *
 * To run a query within a React component, call `useNotificationAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNotificationAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NotificationAddedSubscription, NotificationAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationAddedSubscription, NotificationAddedSubscriptionVariables>(NotificationAddedDocument, options);
      }
export type NotificationAddedSubscriptionHookResult = ReturnType<typeof useNotificationAddedSubscription>;
export type NotificationAddedSubscriptionResult = Apollo.SubscriptionResult<NotificationAddedSubscription>;
export const PresignedMultiUrlsForFileUploadDocument = gql`
    query PresignedMultiUrlsForFileUpload($input: PresignedMultiUrlsForFileUploadInput!) {
  presignedMultiUrlsForFileUpload(input: $input) {
    urls
  }
}
    `;

/**
 * __usePresignedMultiUrlsForFileUploadQuery__
 *
 * To run a query within a React component, call `usePresignedMultiUrlsForFileUploadQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresignedMultiUrlsForFileUploadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresignedMultiUrlsForFileUploadQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePresignedMultiUrlsForFileUploadQuery(baseOptions: Apollo.QueryHookOptions<PresignedMultiUrlsForFileUploadQuery, PresignedMultiUrlsForFileUploadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PresignedMultiUrlsForFileUploadQuery, PresignedMultiUrlsForFileUploadQueryVariables>(PresignedMultiUrlsForFileUploadDocument, options);
      }
export function usePresignedMultiUrlsForFileUploadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PresignedMultiUrlsForFileUploadQuery, PresignedMultiUrlsForFileUploadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PresignedMultiUrlsForFileUploadQuery, PresignedMultiUrlsForFileUploadQueryVariables>(PresignedMultiUrlsForFileUploadDocument, options);
        }
export type PresignedMultiUrlsForFileUploadQueryHookResult = ReturnType<typeof usePresignedMultiUrlsForFileUploadQuery>;
export type PresignedMultiUrlsForFileUploadLazyQueryHookResult = ReturnType<typeof usePresignedMultiUrlsForFileUploadLazyQuery>;
export type PresignedMultiUrlsForFileUploadQueryResult = Apollo.QueryResult<PresignedMultiUrlsForFileUploadQuery, PresignedMultiUrlsForFileUploadQueryVariables>;
export const PresignedUrlForFileUploadDocument = gql`
    query PresignedUrlForFileUpload($fileName: String!, $fileType: String!) {
  presignedUrlForFileUpload(fileName: $fileName, fileType: $fileType) {
    url
  }
}
    `;

/**
 * __usePresignedUrlForFileUploadQuery__
 *
 * To run a query within a React component, call `usePresignedUrlForFileUploadQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresignedUrlForFileUploadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresignedUrlForFileUploadQuery({
 *   variables: {
 *      fileName: // value for 'fileName'
 *      fileType: // value for 'fileType'
 *   },
 * });
 */
export function usePresignedUrlForFileUploadQuery(baseOptions: Apollo.QueryHookOptions<PresignedUrlForFileUploadQuery, PresignedUrlForFileUploadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PresignedUrlForFileUploadQuery, PresignedUrlForFileUploadQueryVariables>(PresignedUrlForFileUploadDocument, options);
      }
export function usePresignedUrlForFileUploadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PresignedUrlForFileUploadQuery, PresignedUrlForFileUploadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PresignedUrlForFileUploadQuery, PresignedUrlForFileUploadQueryVariables>(PresignedUrlForFileUploadDocument, options);
        }
export type PresignedUrlForFileUploadQueryHookResult = ReturnType<typeof usePresignedUrlForFileUploadQuery>;
export type PresignedUrlForFileUploadLazyQueryHookResult = ReturnType<typeof usePresignedUrlForFileUploadLazyQuery>;
export type PresignedUrlForFileUploadQueryResult = Apollo.QueryResult<PresignedUrlForFileUploadQuery, PresignedUrlForFileUploadQueryVariables>;
export const SignInDocument = gql`
    mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    id
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut {
    success
  }
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    id
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SessionOnetimeCodeDocument = gql`
    mutation SessionOnetimeCode($input: SessionOnetimeCodeInput) {
  sessionOnetimeCode(input: $input) {
    code
  }
}
    `;
export type SessionOnetimeCodeMutationFn = Apollo.MutationFunction<SessionOnetimeCodeMutation, SessionOnetimeCodeMutationVariables>;

/**
 * __useSessionOnetimeCodeMutation__
 *
 * To run a mutation, you first call `useSessionOnetimeCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSessionOnetimeCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sessionOnetimeCodeMutation, { data, loading, error }] = useSessionOnetimeCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSessionOnetimeCodeMutation(baseOptions?: Apollo.MutationHookOptions<SessionOnetimeCodeMutation, SessionOnetimeCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SessionOnetimeCodeMutation, SessionOnetimeCodeMutationVariables>(SessionOnetimeCodeDocument, options);
      }
export type SessionOnetimeCodeMutationHookResult = ReturnType<typeof useSessionOnetimeCodeMutation>;
export type SessionOnetimeCodeMutationResult = Apollo.MutationResult<SessionOnetimeCodeMutation>;
export type SessionOnetimeCodeMutationOptions = Apollo.BaseMutationOptions<SessionOnetimeCodeMutation, SessionOnetimeCodeMutationVariables>;
export const TokenExchangeDocument = gql`
    mutation TokenExchange($input: TokenExchangeInput!) {
  tokenExchange(input: $input) {
    accessToken
    refreshToken
    expiresIn
    refreshExpiresIn
  }
}
    `;
export type TokenExchangeMutationFn = Apollo.MutationFunction<TokenExchangeMutation, TokenExchangeMutationVariables>;

/**
 * __useTokenExchangeMutation__
 *
 * To run a mutation, you first call `useTokenExchangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenExchangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenExchangeMutation, { data, loading, error }] = useTokenExchangeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTokenExchangeMutation(baseOptions?: Apollo.MutationHookOptions<TokenExchangeMutation, TokenExchangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TokenExchangeMutation, TokenExchangeMutationVariables>(TokenExchangeDocument, options);
      }
export type TokenExchangeMutationHookResult = ReturnType<typeof useTokenExchangeMutation>;
export type TokenExchangeMutationResult = Apollo.MutationResult<TokenExchangeMutation>;
export type TokenExchangeMutationOptions = Apollo.BaseMutationOptions<TokenExchangeMutation, TokenExchangeMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($input: RefreshTokenInput!) {
  refreshToken(input: $input) {
    accessToken
    refreshToken
    expiresIn
    refreshExpiresIn
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const SendEmailVerificationCodeDocument = gql`
    mutation SendEmailVerificationCode($input: SendEmailVerificationCodeInput!) {
  sendEmailVerificationCode(input: $input) {
    success
  }
}
    `;
export type SendEmailVerificationCodeMutationFn = Apollo.MutationFunction<SendEmailVerificationCodeMutation, SendEmailVerificationCodeMutationVariables>;

/**
 * __useSendEmailVerificationCodeMutation__
 *
 * To run a mutation, you first call `useSendEmailVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEmailVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEmailVerificationCodeMutation, { data, loading, error }] = useSendEmailVerificationCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendEmailVerificationCodeMutation(baseOptions?: Apollo.MutationHookOptions<SendEmailVerificationCodeMutation, SendEmailVerificationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendEmailVerificationCodeMutation, SendEmailVerificationCodeMutationVariables>(SendEmailVerificationCodeDocument, options);
      }
export type SendEmailVerificationCodeMutationHookResult = ReturnType<typeof useSendEmailVerificationCodeMutation>;
export type SendEmailVerificationCodeMutationResult = Apollo.MutationResult<SendEmailVerificationCodeMutation>;
export type SendEmailVerificationCodeMutationOptions = Apollo.BaseMutationOptions<SendEmailVerificationCodeMutation, SendEmailVerificationCodeMutationVariables>;
export const VerifyEmailVerificationCodeDocument = gql`
    mutation VerifyEmailVerificationCode($input: VerifyEmailVerificationCodeInput!) {
  verifyEmailVerificationCode(input: $input) {
    success
  }
}
    `;
export type VerifyEmailVerificationCodeMutationFn = Apollo.MutationFunction<VerifyEmailVerificationCodeMutation, VerifyEmailVerificationCodeMutationVariables>;

/**
 * __useVerifyEmailVerificationCodeMutation__
 *
 * To run a mutation, you first call `useVerifyEmailVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailVerificationCodeMutation, { data, loading, error }] = useVerifyEmailVerificationCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEmailVerificationCodeMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailVerificationCodeMutation, VerifyEmailVerificationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailVerificationCodeMutation, VerifyEmailVerificationCodeMutationVariables>(VerifyEmailVerificationCodeDocument, options);
      }
export type VerifyEmailVerificationCodeMutationHookResult = ReturnType<typeof useVerifyEmailVerificationCodeMutation>;
export type VerifyEmailVerificationCodeMutationResult = Apollo.MutationResult<VerifyEmailVerificationCodeMutation>;
export type VerifyEmailVerificationCodeMutationOptions = Apollo.BaseMutationOptions<VerifyEmailVerificationCodeMutation, VerifyEmailVerificationCodeMutationVariables>;
export const UnregisterDocument = gql`
    mutation Unregister($input: UnregisterInput!) {
  unregister(input: $input) {
    success
  }
}
    `;
export type UnregisterMutationFn = Apollo.MutationFunction<UnregisterMutation, UnregisterMutationVariables>;

/**
 * __useUnregisterMutation__
 *
 * To run a mutation, you first call `useUnregisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnregisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unregisterMutation, { data, loading, error }] = useUnregisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnregisterMutation(baseOptions?: Apollo.MutationHookOptions<UnregisterMutation, UnregisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnregisterMutation, UnregisterMutationVariables>(UnregisterDocument, options);
      }
export type UnregisterMutationHookResult = ReturnType<typeof useUnregisterMutation>;
export type UnregisterMutationResult = Apollo.MutationResult<UnregisterMutation>;
export type UnregisterMutationOptions = Apollo.BaseMutationOptions<UnregisterMutation, UnregisterMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    uuid
    email
    signUpType
    privacyPolicyConsent
    termsOfServiceConsent
    personalInfoConsent
    emailMarketingConsent
    smsMarketingConsent
    marketingConsentEmailUpdatedAt
    marketingConsentSmsUpdatedAt
    roleType
    createdAt
    updatedAt
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    userId
    birthdate
    name
    nickname
    phoneNumber
    countryCallingCode
    thumbnailUrl
    codingExperienceTypeList
    contactEmail
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const SocialSignInDocument = gql`
    mutation SocialSignIn($input: SocialSignInInput!) {
  socialSignIn(input: $input) {
    success
    user {
      id
      signUpType
    }
    userInfo {
      name
      userId
      email
    }
  }
}
    `;
export type SocialSignInMutationFn = Apollo.MutationFunction<SocialSignInMutation, SocialSignInMutationVariables>;

/**
 * __useSocialSignInMutation__
 *
 * To run a mutation, you first call `useSocialSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSocialSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [socialSignInMutation, { data, loading, error }] = useSocialSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSocialSignInMutation(baseOptions?: Apollo.MutationHookOptions<SocialSignInMutation, SocialSignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SocialSignInMutation, SocialSignInMutationVariables>(SocialSignInDocument, options);
      }
export type SocialSignInMutationHookResult = ReturnType<typeof useSocialSignInMutation>;
export type SocialSignInMutationResult = Apollo.MutationResult<SocialSignInMutation>;
export type SocialSignInMutationOptions = Apollo.BaseMutationOptions<SocialSignInMutation, SocialSignInMutationVariables>;
export const SocialSignUpDocument = gql`
    mutation SocialSignUp($input: SocialSignUpInput!) {
  socialSignUp(input: $input) {
    id
    email
  }
}
    `;
export type SocialSignUpMutationFn = Apollo.MutationFunction<SocialSignUpMutation, SocialSignUpMutationVariables>;

/**
 * __useSocialSignUpMutation__
 *
 * To run a mutation, you first call `useSocialSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSocialSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [socialSignUpMutation, { data, loading, error }] = useSocialSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSocialSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SocialSignUpMutation, SocialSignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SocialSignUpMutation, SocialSignUpMutationVariables>(SocialSignUpDocument, options);
      }
export type SocialSignUpMutationHookResult = ReturnType<typeof useSocialSignUpMutation>;
export type SocialSignUpMutationResult = Apollo.MutationResult<SocialSignUpMutation>;
export type SocialSignUpMutationOptions = Apollo.BaseMutationOptions<SocialSignUpMutation, SocialSignUpMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    success
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    success
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmProtectorEmailChangeDocument = gql`
    mutation ConfirmProtectorEmailChange($input: ConfirmProtectorEmailChangeInput!) {
  confirmProtectorEmailChange(input: $input) {
    name
    email
    countryCallingCode
    phoneNumber
    verified
  }
}
    `;
export type ConfirmProtectorEmailChangeMutationFn = Apollo.MutationFunction<ConfirmProtectorEmailChangeMutation, ConfirmProtectorEmailChangeMutationVariables>;

/**
 * __useConfirmProtectorEmailChangeMutation__
 *
 * To run a mutation, you first call `useConfirmProtectorEmailChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmProtectorEmailChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmProtectorEmailChangeMutation, { data, loading, error }] = useConfirmProtectorEmailChangeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmProtectorEmailChangeMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmProtectorEmailChangeMutation, ConfirmProtectorEmailChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmProtectorEmailChangeMutation, ConfirmProtectorEmailChangeMutationVariables>(ConfirmProtectorEmailChangeDocument, options);
      }
export type ConfirmProtectorEmailChangeMutationHookResult = ReturnType<typeof useConfirmProtectorEmailChangeMutation>;
export type ConfirmProtectorEmailChangeMutationResult = Apollo.MutationResult<ConfirmProtectorEmailChangeMutation>;
export type ConfirmProtectorEmailChangeMutationOptions = Apollo.BaseMutationOptions<ConfirmProtectorEmailChangeMutation, ConfirmProtectorEmailChangeMutationVariables>;
export const ConfirmContactEmailChangeDocument = gql`
    mutation ConfirmContactEmailChange($input: ConfirmContactEmailChangeInput!) {
  confirmContactEmailChange(input: $input) {
    id
    userId
    birthdate
    name
    nickname
    phoneNumber
    countryCallingCode
    thumbnailUrl
    codingExperienceTypeList
    city
    region
    contactEmail
    contactEmailVerified
  }
}
    `;
export type ConfirmContactEmailChangeMutationFn = Apollo.MutationFunction<ConfirmContactEmailChangeMutation, ConfirmContactEmailChangeMutationVariables>;

/**
 * __useConfirmContactEmailChangeMutation__
 *
 * To run a mutation, you first call `useConfirmContactEmailChangeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmContactEmailChangeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmContactEmailChangeMutation, { data, loading, error }] = useConfirmContactEmailChangeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmContactEmailChangeMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmContactEmailChangeMutation, ConfirmContactEmailChangeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmContactEmailChangeMutation, ConfirmContactEmailChangeMutationVariables>(ConfirmContactEmailChangeDocument, options);
      }
export type ConfirmContactEmailChangeMutationHookResult = ReturnType<typeof useConfirmContactEmailChangeMutation>;
export type ConfirmContactEmailChangeMutationResult = Apollo.MutationResult<ConfirmContactEmailChangeMutation>;
export type ConfirmContactEmailChangeMutationOptions = Apollo.BaseMutationOptions<ConfirmContactEmailChangeMutation, ConfirmContactEmailChangeMutationVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    id
    userId
    birthdate
    name
    nickname
    countryCallingCode
    phoneNumber
    thumbnailUrl
    codingExperienceTypeList
    contactEmail
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    id
    uuid
    email
    signUpType
    privacyPolicyConsent
    termsOfServiceConsent
    personalInfoConsent
    emailMarketingConsent
    smsMarketingConsent
    marketingConsentSmsUpdatedAt
    marketingConsentEmailUpdatedAt
    roleType
    createdAt
    updatedAt
    isMinor
    hasParentalConsent
    protector {
      name
      email
      countryCallingCode
      phoneNumber
      verified
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
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
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