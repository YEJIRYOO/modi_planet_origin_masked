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

/** 인증 유형 */
export enum AuthType {
  /** 비밀번호 재설정 */
  ResetPassword = 'RESET_PASSWORD',
  /** 회원가입 */
  SignUp = 'SIGN_UP',
  /** 보호자 인증 */
  SignUpProtector = 'SIGN_UP_PROTECTOR'
}

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

export type CreateContactInput = {
  /** 첨부파일 */
  FileList?: InputMaybe<Array<AttachmentFileInput>>;
  /** 내용 */
  content: Scalars['String'];
  /** 문의 유형 */
  subject: Scalars['String'];
  /** 제목 */
  title: Scalars['String'];
};

export type CreatePlatClassifierInput = {
  /** 데이터 (이미지 데이터 주소, 텍스트, 소리 데이터 주소 등) */
  dataset: Array<Scalars['String']>;
  /** 라벨명 */
  label: Scalars['String'];
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

export type DeleteBoardInput = {
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

export enum LangType {
  Cn = 'CN',
  De = 'DE',
  En = 'EN',
  Jp = 'JP',
  Ko = 'KO',
  Pl = 'PL'
}

export type LeaveTeam = {
  __typename?: 'LeaveTeam';
  success: Scalars['Boolean'];
};

export type LeaveTeamInput = {
  /** 팀 고유번호 */
  id: Scalars['ID'];
};

export type LessonProgress = {
  __typename?: 'LessonProgress';
  current: Scalars['Int'];
  progress: Scalars['Int'];
  progressRate: Scalars['Int'];
  total: Scalars['Int'];
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
  /** 비밀번호 변경 */
  changePassword: ChangePassword;
  /** 배송지 생성 */
  createAddress: Address;
  createBoardData: Scalars['ID'];
  createBoardFaq: Scalars['ID'];
  createBoardNotice: Scalars['ID'];
  /** 문의 생성 */
  createContact: Contact;
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
  deleteBoardData: Scalars['ID'];
  deleteBoardFaq: Scalars['ID'];
  deleteBoardNotice: Scalars['ID'];
  /** 문의 삭제 */
  deleteContact: DeleteContact;
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
  multiUploadFile: Array<Scalars['String']>;
  /** 비밀번호 재설정 */
  resetPassword: ResetPassword;
  saveAIModel: SaveAiModel;
  /** 이메일 인증코드 발송 */
  sendEmailVerificationCode: SendEmailVerificationCode;
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
  /** 회원탈퇴 */
  unregister: Unregister;
  updateAIModel: UpdateAiModel;
  /** 배송지 수정 */
  updateAddress: Address;
  updateBoardData: Scalars['ID'];
  updateBoardFaq: Scalars['ID'];
  updateBoardNotice: Scalars['ID'];
  /** 프로필 업데이트 */
  updateProfile: Profile;
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


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
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


export type MutationCreateContactArgs = {
  input: CreateContactInput;
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


export type MutationDeleteBoardDataArgs = {
  input: DeleteBoardInput;
};


export type MutationDeleteBoardFaqArgs = {
  input: DeleteBoardInput;
};


export type MutationDeleteBoardNoticeArgs = {
  input: DeleteBoardInput;
};


export type MutationDeleteContactArgs = {
  input: DeleteContactInput;
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


export type MutationMultiUploadFileArgs = {
  input: MultiUploadFileInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSaveAiModelArgs = {
  input: SaveAiModelInput;
};


export type MutationSendEmailVerificationCodeArgs = {
  input: SendEmailVerificationCodeInput;
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


export type MutationUnregisterArgs = {
  input: UnregisterInput;
};


export type MutationUpdateAiModelArgs = {
  input: UpdateAiModelInput;
};


export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
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


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
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

export type Node = {
  id: Scalars['ID'];
};

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

export type PlatClassifier = Classifier & {
  __typename?: 'PlatClassifier';
  /** 데이터 (이미지 데이터 주소, 텍스트, 소리 데이터 주소 등) */
  dataset: Array<Scalars['String']>;
  /** 클래스 아이디 */
  id: Scalars['ID'];
  /** 라벨명 */
  label: Scalars['String'];
};

export type PresignedMultiUrlsForFileUpload = {
  __typename?: 'PresignedMultiUrlsForFileUpload';
  urls: Array<Scalars['String']>;
};

export type PresignedMultiUrlsForFileUploadInput = {
  params: Array<PresignedUrlForFileUploadParam>;
};

export type PresignedUrlForFileUpload = {
  __typename?: 'PresignedUrlForFileUpload';
  url: Scalars['String'];
};

export type PresignedUrlForFileUploadParam = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
};

export type PresignedUrlForVideoUpload = {
  __typename?: 'PresignedUrlForVideoUpload';
  url: Scalars['String'];
};

/** 프로필 정보 */
export type Profile = {
  __typename?: 'Profile';
  /** 생년월일 */
  birthdate?: Maybe<Scalars['String']>;
  /** 코딩 경험 */
  codingExperienceTypeList?: Maybe<Array<Scalars['String']>>;
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
  /** 썸네일 이미지 */
  thumbnailUrl?: Maybe<Scalars['String']>;
  /** 유저 고유번호 */
  userId: Scalars['String'];
};

export type ProtectorInput = {
  /** 이메일 */
  email?: InputMaybe<Scalars['String']>;
  /** 이름 */
  name?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** 상세주소 조회 */
  address: Address;
  /** 주소 목록 조회 */
  addressList: Array<Address>;
  aiModel: AiModel;
  aiModelCategories: Array<AiModelCategory>;
  aiModelCategory: AiModelCategory;
  aiModelConnection: AiModelConnection;
  boardCodeConnection: BoardCodeConnection;
  boardData?: Maybe<BoardData>;
  boardDataConnection: BoardDataConnection;
  boardFaq?: Maybe<BoardFaq>;
  boardFaqConnection: BoardFaqConnection;
  boardNotice?: Maybe<BoardNotice>;
  boardNoticeConnection: BoardNoticeConnection;
  /** 문의 상세 조회 */
  contact: Contact;
  /** 문의 목록 조회 */
  contactConnection: ContactConnection;
  presignedMultiUrlsForFileUpload?: Maybe<PresignedMultiUrlsForFileUpload>;
  presignedUrlForFileUpload?: Maybe<PresignedUrlForFileUpload>;
  presignedUrlForVideoUpload?: Maybe<PresignedUrlForVideoUpload>;
  /** 프로필 조회 */
  profile: Profile;
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


export type QueryContactArgs = {
  input: ContactInput;
};


export type QueryContactConnectionArgs = {
  input: ContactConnectionInput;
};


export type QueryPresignedMultiUrlsForFileUploadArgs = {
  input: PresignedMultiUrlsForFileUploadInput;
};


export type QueryPresignedUrlForFileUploadArgs = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
};


export type QueryPresignedUrlForVideoUploadArgs = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
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
  /** 검증 데이터 비율 */
  validationDataRate: Scalars['Float'];
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

export enum ServiceType {
  Allthatcoding = 'ALLTHATCODING',
  Home = 'HOME',
  Letsmodi = 'LETSMODI',
  Lms = 'LMS',
  Makingpack = 'MAKINGPACK',
  Modifactory = 'MODIFACTORY',
  Modiplanet = 'MODIPLANET'
}

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
  /** 가입유형 */
  signUpType: SignUpType;
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

export type UpdateProfileInput = {
  /** 생년월일 (ex. 1990-01-01) */
  birthdate?: InputMaybe<Scalars['String']>;
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
  /** 썸네일 이미지 */
  thumbnailUrl?: InputMaybe<Scalars['String']>;
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
  /** 고유번호 */
  id: Scalars['ID'];
  /** 마케팅 정보 수신 동의 업데이트 일시 */
  marketingConsentUpdatedAt: Scalars['String'];
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

export type CreateContactMutationVariables = Exact<{
  input: CreateContactInput;
}>;


export type CreateContactMutation = { __typename?: 'Mutation', createContact: { __typename?: 'Contact', id: string, userId: string, subject: string, title: string, content: string, createdAt: string, updatedAt: string, state: ContactStateType, responseMessage?: string | null | undefined, respondedAt?: string | null | undefined, fileList?: Array<{ __typename?: 'AttachmentFile', name: string, url: string }> | null | undefined } };

export type DeleteContactMutationVariables = Exact<{
  input: DeleteContactInput;
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact: { __typename?: 'DeleteContact', success: boolean } };

export type ContactConnectionQueryVariables = Exact<{
  input: ContactConnectionInput;
}>;


export type ContactConnectionQuery = { __typename?: 'Query', contactConnection: { __typename?: 'ContactConnection', totalCount: number, nodes: Array<{ __typename?: 'Contact', id: string, content: string, state: ContactStateType, responseMessage?: string | null | undefined, respondedAt?: string | null | undefined, subject: string, title: string, createdAt: string, fileList?: Array<{ __typename?: 'AttachmentFile', name: string, url: string }> | null | undefined }> } };

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


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, uuid: string, email: string, signUpType: SignUpType, privacyPolicyConsent: boolean, termsOfServiceConsent: boolean, personalInfoConsent: boolean, emailMarketingConsent: boolean, smsMarketingConsent: boolean, marketingConsentUpdatedAt: string, roleType: UserRoleType, createdAt: string, updatedAt: string } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', id: string, userId: string, birthdate?: string | null | undefined, name?: string | null | undefined, nickname?: string | null | undefined, phoneNumber?: string | null | undefined, countryCallingCode?: string | null | undefined, thumbnailUrl?: string | null | undefined, codingExperienceTypeList?: Array<string> | null | undefined } };

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

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'Profile', id: string, userId: string, birthdate?: string | null | undefined, name?: string | null | undefined, nickname?: string | null | undefined, countryCallingCode?: string | null | undefined, phoneNumber?: string | null | undefined, thumbnailUrl?: string | null | undefined, codingExperienceTypeList?: Array<string> | null | undefined } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, signUpType: SignUpType, emailMarketingConsent: boolean, smsMarketingConsent: boolean, marketingConsentUpdatedAt: string, updatedAt: string } };


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
export const ContactConnectionDocument = gql`
    query ContactConnection($input: ContactConnectionInput!) {
  contactConnection(input: $input) {
    totalCount
    nodes {
      id
      fileList {
        name
        url
      }
      content
      state
      responseMessage
      respondedAt
      subject
      title
      createdAt
    }
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
    marketingConsentUpdatedAt
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
    email
    signUpType
    emailMarketingConsent
    smsMarketingConsent
    marketingConsentUpdatedAt
    updatedAt
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