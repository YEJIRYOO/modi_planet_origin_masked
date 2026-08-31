import { storeRecentSignInType } from '@lib/utils/utils';

export enum EStorageKey {
  HISTORY = 'history',
  LANG = 'lang',
  IS_PORTAL = 'isPortal',
  DO_NOT_SHOW_POPUP_V2 = 'doNotShowPopupV2',
  DO_NOT_SHOW_POPUP_V3 = 'doNotShowPopupV3',
  SIGN_UP_SOCIAL_TYPE = 'SIGN_UP_SOCIAL_TYPE',
  SOCIAL_ID = 'SOCIAL_ID',
  RECENT_SIGN_IN_TYPE = 'RECENT_SIGN_IN_TYPE',
  EMAIL = 'EMAIL',
  SAVED_EMAIL = 'savedEmail',
  PROJECT_CREATE_TIMES = 'projectCreateTimes',
}

export enum ELangType {
  KO = 'ko',
  EN = 'en',
  ES = 'es',
  PL = 'pl',
}

export enum EWeekType {
  Monday = '월요일',
  Tuesday = '화요일',
  Wednesday = '수요일',
  Thursday = '목요일',
  Friday = '금요일',
  Saturday = '토요일',
  Sunday = '일요일',
}

export enum EAttendanceType {
  READY = '수업 전',
  ATTENDANCE = '출석',
  ABSENCE = '결석',
  BREAK_AWAY = '이탈',
  LATENESS = '지각',
  PENDING = '처리중',
}

export enum ECodingType {
  NONE = '경험없음',
  SCRATCH = '스크래치',
  ENTRY = '엔트리',
  PYTHON = '파이썬',
  APP_INVENTOR = '앱인벤터',
  ETC = '기타',
}

export enum EOrderStatus {
  CANCEL_COMPETE = '취소 완료',
  CANCEL_REQUEST = '취소 요청',
  DELIVERY_COMPLETE = '배송 완료',
  DELIVERY_PREPARE = '배송 준비',
  DELIVERY_RUN = '배송 시작',
  PAYMENT_COMPLETE = '결제 완료',
  PAYMENT_PREPARE = '결제 준비',
  PRODUCT_RETURN_COMPLETE = '제품 회수 완료',
  PRODUCT_RETURN_REQUEST = '제품 회수 요청',
  REFUND_COMPLETE = '환불 완료',
  REFUND_REQUEST = '환불 요청',
  RETURN_COMPLETE = '반품 완료',
  RETURN_REQUEST = '반품 요청',
}

export enum EDeliveryRequestMsg {
  DIRECT_PICK_UP = '직접 수령하겠습니다.',
  CALL_BEFORE_DELIVERY = '배송 전 연락바랍니다.',
  LEAVE_PACKAGE_IN_OFFICE = '부재 시 경비실에 맡겨주세요.',
  LEAVE_PACKAGE_BY_DOOR = '부재 시 문 앞에 놓아주세요.',
  LEAVE_PACKAGE_IN_MAILBOX = '부재 시 택배함에 넣어주세요.',
  MANUAL_INPUT = '직접 입력',
}

export enum EServiceType {
  LETS_MODI = 'LETS_MODI',
  MODIPLANET = 'MODIPLANET',
  MODI_MALL = 'MODI_MALL',
}

export enum EStoreType {
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
  MODI_MALL = 'MODI_MALL',
}

export enum EClassChartType {
  ATTENDANCE = 'ATTENDANCE',
  PROGRESS = 'PROGRESS',
}

export enum ECardQuota {
  // 일시불일땐 0 으로 params 줘야함

  'ONE' = 0,
  'TWO' = 2,
  'THREE' = 3,
  'FOUR' = 4,
  'FIVE' = 5,
  'SIX' = 6,
  'SEVEN' = 7,
  'EIGHT' = 8,
  'NINE' = 9,
  'TEN' = 10,
}

export enum EMypageMenu {
  COUPON = 'coupon',
  ORDER = 'order',
  CONTACT = 'contact',
  MYPAGE = 'my-page',
  MYPROJECT = 'my-project',
}

export enum EUserContactType {
  ALL = '전체',
  EDU_PRODUCT = '교육상품',
  PRODUCT = '제품',
  ORDER = '취소/환불',
  PAYMENT = '결제',
  SERVICE = '서비스 이용',
  ETC = '기타',
}

export enum EUserContactStatus {
  PENDING = '접수',
  COMPLETE = '해결',
  DONE = '해결',
}

export enum EDiscountUnit {
  PERCENT = '%',
  KRW = '원',
}

export enum ELogDataType {
  CLASS_LOG = 'CLASS_LOG',
}

export enum EScheduleStatus {
  COMPLETE = '완료',
  MISSING = '누락',
  ONGOING = '진행중',
  READY = '대기',
}

export enum ECurrencyType {
  KRW = '원',
}

export enum EPayMethod {
  CARD = '카드',
  KAKAO_PAY = '카카오 페이',
  LPAY = '엘페이',
  PAYCO = '페이코',
  SSGPAY = 'SSG',
  TOSSPAY = '토스',
}

export enum EChallengeQuizType {
  COMMON = 'common',
  RANDOM = 'random',
}

export const ContactStateEnum = {
  PENDING: 'PENDING',
  RESPONDED: 'RESPONDED',
} as const;
export type ContactStateType = keyof typeof ContactStateEnum;
