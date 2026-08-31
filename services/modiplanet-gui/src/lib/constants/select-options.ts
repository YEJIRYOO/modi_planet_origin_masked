import {
  CodingType,
  CourseAttendanceType,
  CourseTutorScheduleGroupLoopType,
  OrderCardQuotaType,
  UserContactType,
} from '@services/old/generated/graphql';
import { ECodingType, EDeliveryRequestMsg } from '@src/lib/constants/enums';
import { MAX_YEAR } from './etc';
import i18n from 'i18next';

/**
 * Select options
 */
export interface ISelectOption {
  value: string | number;
  label: string;
}

export const OPTIONS_WEEKDAY: Array<ISelectOption> = [
  { value: 'SUNDAY', label: '일요일' },
  { value: 'MONDAY', label: '월요일' },
  { value: 'TUESDAY', label: '화요일' },
  { value: 'WEDNESDAY', label: '수요일' },
  { value: 'THURSDAY', label: '목요일' },
  { value: 'FRIDAY', label: '금요일' },
  { value: 'SATURDAY', label: '토요일' },
];
export const OPTIONS_TIME: Array<ISelectOption> = [
  { value: 10, label: '10시' },
  { value: 11, label: '11시' },
  { value: 12, label: '12시' },
  { value: 13, label: '13시' },
  { value: 14, label: '14시' },
  { value: 15, label: '15시' },
  { value: 16, label: '16시' },
  { value: 17, label: '17시' },
  { value: 18, label: '18시' },
  { value: 19, label: '19시' },
  { value: 20, label: '20시' },
];
export const OPTIONS_YEAR: Array<ISelectOption> = Array.from(
  { length: 80 },
  (_, i) => i,
).map((_, index) => {
  return {
    value: String(MAX_YEAR - index),
    label: String(MAX_YEAR - index),
  };
});
export const OPTIONS_ATTENDANCE_TYPE: Array<ISelectOption> = [
  { value: CourseAttendanceType.Attendance, label: '출석' },
  { value: CourseAttendanceType.Lateness, label: '지각' },
  { value: CourseAttendanceType.BreakAway, label: '이탈' },
  { value: CourseAttendanceType.Absence, label: '결석' },
];
export const OPTIONS_LOOP_TYPE: Array<ISelectOption> = [
  { value: CourseTutorScheduleGroupLoopType.None, label: '안함' },
  { value: CourseTutorScheduleGroupLoopType.EveryDay, label: '매일' },
  { value: CourseTutorScheduleGroupLoopType.EveryWeek, label: '매주' },
];

export const getOptionsInquiryCategory = (): Array<ISelectOption> => {
  return [
    { value: UserContactType.EduProduct, label: i18n.t('INQUIRY_EDU_PRODUCT') },
    { value: UserContactType.Product, label: i18n.t('INQUIRY_PRODUCT') },
    { value: UserContactType.Service, label: i18n.t('INQUIRY_SERVICE') },
    { value: UserContactType.Etc, label: i18n.t('ETC') },
  ];
};

export const OPTIONS_DELIVERY_REQUEST: Array<ISelectOption> = [
  {
    value: EDeliveryRequestMsg.DIRECT_PICK_UP,
    label: EDeliveryRequestMsg.DIRECT_PICK_UP,
  },
  {
    value: EDeliveryRequestMsg.CALL_BEFORE_DELIVERY,
    label: EDeliveryRequestMsg.CALL_BEFORE_DELIVERY,
  },
  {
    value: EDeliveryRequestMsg.LEAVE_PACKAGE_IN_OFFICE,
    label: EDeliveryRequestMsg.LEAVE_PACKAGE_IN_OFFICE,
  },
  {
    value: EDeliveryRequestMsg.LEAVE_PACKAGE_BY_DOOR,
    label: EDeliveryRequestMsg.LEAVE_PACKAGE_BY_DOOR,
  },
  {
    value: EDeliveryRequestMsg.LEAVE_PACKAGE_IN_MAILBOX,
    label: EDeliveryRequestMsg.LEAVE_PACKAGE_IN_MAILBOX,
  },
  {
    value: '',
    label: EDeliveryRequestMsg.MANUAL_INPUT,
  },
];
export type TCardQuotaType = { value: OrderCardQuotaType; label: string };
export const OPTIONS_CARD_QUOTA_TYPE: Array<TCardQuotaType> = [
  { value: OrderCardQuotaType.One, label: '일시불' },
  { value: OrderCardQuotaType.Two, label: '2개월' },
  { value: OrderCardQuotaType.Three, label: '3개월' },
  { value: OrderCardQuotaType.Four, label: '4개월' },
  { value: OrderCardQuotaType.Five, label: '5개월' },
  { value: OrderCardQuotaType.Six, label: '6개월' },
  { value: OrderCardQuotaType.Seven, label: '7개월' },
  { value: OrderCardQuotaType.Eight, label: '8개월' },
  { value: OrderCardQuotaType.Nine, label: '9개월' },
  { value: OrderCardQuotaType.Ten, label: '10개월' },
];
type TCodingTypes = { value: CodingType; label: ECodingType };
export const OPTIONS_CODING_TYPE: Array<TCodingTypes> = [
  { value: CodingType.None, label: ECodingType.NONE },
  { value: CodingType.Scratch, label: ECodingType.SCRATCH },
  { value: CodingType.Entry, label: ECodingType.ENTRY },
  {
    value: CodingType.Python,
    label: ECodingType.PYTHON,
  },
  {
    value: CodingType.AppInventor,
    label: ECodingType.APP_INVENTOR,
  },
  {
    value: CodingType.Etc,
    label: ECodingType.ETC,
  },
];

export const OPTIONS_RATING_INTEREST: Array<ISelectOption> = [
  { value: 1, label: '너무 재미없어요' },
  { value: 2, label: '재미없어요' },
  { value: 3, label: '그냥 그래요' },
  { value: 4, label: '재미있어요' },
  { value: 5, label: '너무 재미있어요' },
];

export const OPTIONS_RATING_DIFFICULTY: Array<ISelectOption> = [
  { value: 1, label: '너무 어려워요' },
  { value: 2, label: '어려워요' },
  { value: 3, label: '그냥 그래요' },
  { value: 4, label: '쉬웠어요' },
  { value: 5, label: '너무 쉬웠어요' },
];

export const moduleOptions = [
  { value: 'BUTTON', label: 'BUTTON' },
  { value: 'IMU', label: 'IMU' },
  { value: 'JOYSTICK', label: 'JOYSTICK' },
  { value: 'DIAL', label: 'DIAL' },
  { value: 'TOF', label: 'TOF' },
  { value: 'ENVIRONMENT', label: 'ENVIRONMENT' },
] as const;

// 데이터 카드 표시용 (언어 무관하게 적용)
export const functionOptions = {
  BUTTON: [
    { value: 'click', label: 'CLICK' },
    { value: 'doubleClick', label: 'DOUBLE_CLICK' },
    { value: 'press', label: 'PRESSED' },
    { value: 'toggle', label: 'TOGGLE' },
  ],
  DIAL: [
    { value: 'turn', label: 'TURN' },
    { value: 'angle', label: 'ANGLE' },
    { value: 'mark', label: 'MARK' },
    { value: 'turnSpeed', label: 'TURNSPEED' },
  ],
  TOF: [
    { value: 'cm', label: 'DISTANCE_CM' },
    { value: 'inch', label: 'DISTANCE_INCH' },
  ],
  JOYSTICK: [
    { value: 'xPosition', label: 'X_POSITION' },
    { value: 'yPosition', label: 'Y_POSITION' },
  ],
  ENVIRONMENT: [
    { value: 'temperatureC', label: 'TEMP_C' },
    { value: 'temperatureF', label: 'TEMP_F' },
    { value: 'humidity', label: 'HUMIDITY' },
    { value: 'illuminance', label: 'ILLUMINANCE' },
    { value: 'volume', label: 'VOLUME' },
    { value: 'red', label: 'RED_LIGHT' },
    { value: 'green', label: 'GREEN_LIGHT' },
    { value: 'blue', label: 'BLUE_LIGHT' },
    { value: 'white', label: 'WHITE_LIGHT' },
    { value: 'black', label: 'BLACK_LIGHT' },
  ],
  IMU: [
    { value: 'xAngle', label: 'X_ANGLE' },
    { value: 'yAngle', label: 'Y_ANGLE' },
    { value: 'zAngle', label: 'Z_ANGLE' },
    { value: 'xAcceleration', label: 'X_ACC' },
    { value: 'yAcceleration', label: 'Y_ACC' },
    { value: 'zAcceleration', label: 'Z_ACC' },
    { value: 'xAngularVelocity', label: 'X_ANGULAR_V' },
    { value: 'yAngularVelocity', label: 'Y_ANGULAR_V' },
    { value: 'zAngularVelocity', label: 'Z_ANGULAR_V' },
    { value: 'vibration', label: 'VIBRATION' },
  ],
} as const;

// 드롭다운 선택용 - 폴란드어일 때만 색상 드롭다운 표출
export const getSelectableFunctionOptions = () => {
  const isPolish = i18n.language === 'pl';

  return {
    BUTTON: functionOptions.BUTTON,
    DIAL: functionOptions.DIAL,
    TOF: functionOptions.TOF,
    JOYSTICK: functionOptions.JOYSTICK,
    ENVIRONMENT: isPolish
      ? functionOptions.ENVIRONMENT
      : functionOptions.ENVIRONMENT.filter(
          (opt) =>
            !['red', 'green', 'blue', 'white', 'black'].includes(opt.value),
        ),
    IMU: functionOptions.IMU,
  };
};
