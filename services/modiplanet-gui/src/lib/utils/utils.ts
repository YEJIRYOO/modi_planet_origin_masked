import { useEffect, useRef } from 'react';
import moment, { MomentInput } from 'moment';

import { TBadgeColor } from '@components/ui_old/badge/badge';
import { v4 as uuidv4 } from 'uuid';

import { TTimeFormat } from '@src/lib/types';
import {
  EDiscountUnit,
  ELangType,
  EStorageKey,
} from '@src/lib/constants/enums';
import {
  CourseAttendanceType,
  DiscountType,
} from '@services/old/generated/graphql';
import _ from 'lodash';
import { SignUpType } from '@services/gen/gen';

export const changeTimeFormat = (time: number) => {
  if (time > 12) {
    return `오후 ${time - 12}시`;
  }
  return `오전 ${time}시`;
};

export const getLangType = () => {
  return localStorage.getItem(EStorageKey.LANG);
};

export const storeLangType = (value) => {
  localStorage.setItem(EStorageKey.LANG, value);
};

export function useInterval(callback: () => void, delay: number) {
  const savedCallback: React.MutableRefObject<Function | undefined> = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const callbackFn = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (delay) {
      const id = setInterval(callbackFn, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const makeAnArray1toN = (length: number) => {
  return Array.from({ length }, (num, i) => i + 1);
};

export const getAttendanceBadgeColor = (
  status: CourseAttendanceType,
): TBadgeColor => {
  switch (status) {
    case CourseAttendanceType.Attendance:
      return 'purple';
    case CourseAttendanceType.BreakAway:
    case CourseAttendanceType.Lateness:
      return 'amber';
    case CourseAttendanceType.Absence:
      return 'main';
    case CourseAttendanceType.Ready:
    default:
      return 'grey';
  }
};

export const hasData = <T>(nodes: Array<T>, data: T) => {
  if (!nodes) return false;

  const index = nodes.findIndex((node) => {
    return node === data;
  });

  return index !== -1;
};

export const getDaysDifference = (date: Date) => {
  const today = moment();
  const dateToCalculate = moment(date);

  const difference = today.diff(dateToCalculate, 'days');

  return Math.abs(difference);
};

export const getUnitByDiscountType = (discountType: DiscountType) => {
  switch (discountType) {
    case DiscountType.Percent:
      return EDiscountUnit.PERCENT;
    case DiscountType.Value:
      // TODO: 추후 currencyType에 따라 분기
      return EDiscountUnit.KRW;
  }
};

export const DEFAULT_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

window.moment = moment;

export const localizeUTC = (
  date: MomentInput,
  get?: TTimeFormat,
  padding = true,
) => {
  const getLocalTime = (format: string) => {
    return moment.utc(date).local().format(format);
  };

  switch (get) {
    case 'date': {
      return getLocalTime(padding ? 'YYYY-MM-DD' : 'YYYY-M-D');
    }
    case 'year': {
      return getLocalTime('YYYY');
    }
    case 'month': {
      return getLocalTime(padding ? 'MM' : 'M');
    }
    case 'day': {
      return getLocalTime(padding ? 'DD' : 'D');
    }
    case 'time': {
      return getLocalTime('HH:mm:ss');
    }
    case '12hour': {
      return getLocalTime(padding ? 'A hh' : 'A h');
    }
    case '24hour': {
      return getLocalTime(padding ? 'HH' : 'H');
    }
    case 'minute': {
      return getLocalTime(padding ? 'mm' : 'm');
    }
    case 'seconds': {
      return getLocalTime(padding ? 'ss' : 's');
    }
    case 'dayOfWeek': {
      return getLocalTime('dddd');
    }
    case 'datehm': {
      return getLocalTime('YYYY-MM-DD A hh:mm');
    }
    case 'dateTime':
    default: {
      return getLocalTime(
        get ? get : padding ? DEFAULT_TIME_FORMAT : 'YYYY-M-D h:m:s',
      );
    }
  }
};

export const formatUTC = (date: string | Date) => {
  return moment.utc(new Date(date)).format(DEFAULT_TIME_FORMAT);
};

export const isNumeric = (value: string) => /^\d+$/.test(value);

export function calcVideoHeatmap(timeRanges, prev?) {
  const prevRange: Array<any> = prev || [];

  for (let i = 0; i < timeRanges.length; i++) {
    const currentStart = timeRanges.start(i);
    const currentEnd = timeRanges.end(i);

    let isContain = false;
    let targetIndex: number = 0;
    let injectIndex: number = prevRange.length;

    // currentStart 값이 기존 데이터 안에 포함될 수 있는지 체크
    for (let j = 0; j < prevRange.length; j++) {
      const data = prevRange[j];
      let prevStart = data[0];
      let prevEnd = data[1];

      if (currentStart >= prevStart && currentStart < prevEnd) {
        targetIndex = j;
        isContain = true;
      }

      if (currentStart < prevStart) {
        injectIndex = Math.min(j, injectIndex);
      }
    }

    if (isContain) {
      if (
        prevRange[targetIndex + 1] &&
        currentEnd > prevRange[targetIndex + 1][0]
      ) {
        prevRange[targetIndex][1] = Math.max(
          prevRange[targetIndex + 1][1],
          prevRange[targetIndex][1],
          currentEnd,
        );

        prevRange.splice(targetIndex + 1, 1);
      } else {
        prevRange[targetIndex][1] = Math.max(
          currentEnd,
          prevRange[targetIndex][1],
        );
      }
    } else {
      prevRange.splice(injectIndex, 0, [currentStart, currentEnd]);
    }
  }

  return prevRange;
}

export const getUuid = () => {
  return uuidv4();
};

export const adjustDrawingSize = (
  contentWidth: number,
  contentHeight: number,
) => {
  let sx: number, sy: number, sWidth: number, sHeight: number;

  if (contentWidth > contentHeight) {
    sx = (contentWidth - contentHeight) / 2;
    sy = 0;
    sHeight = contentHeight;
    sWidth = contentHeight;
  } else if (contentHeight > contentWidth) {
    sx = 0;
    sy = (contentHeight - contentWidth) / 2;
    sWidth = contentWidth;
    sHeight = contentWidth;
  } else {
    sx = 0;
    sy = 0;
    sWidth = contentWidth;
    sHeight = contentWidth;
  }

  return {
    sx,
    sy,
    sWidth,
    sHeight,
  };
};

export function removePropsRecursively(obj: any, propNames: string[]) {
  const result = obj;
  function removeProp(obj: any) {
    for (const prop in obj) {
      if (propNames.includes(prop)) {
        delete obj[prop];
      } else if (typeof obj[prop] === 'object') {
        removeProp(obj[prop]);
      }
    }
  }

  removeProp(result);

  return result;
}

export const deepCopy = <T>(value: T): T => {
  return _.cloneDeep(value);
};

export const isDevelopmentEnv = process.env.REACT_APP_ENV === 'development';

export const isProductionEnv = process.env.REACT_APP_ENV === 'production';

export const getIsPortal = () => {
  return sessionStorage.getItem(EStorageKey.IS_PORTAL);
};

export const storeIsPortal = (value) => {
  sessionStorage.setItem(EStorageKey.IS_PORTAL, value);
};

export function validateFileSize(
  files: FileList | Array<File>,
  maxSize: number,
) {
  return Array.from(files).every((file) => {
    if (file.size > maxSize) {
      throw '파일 용량을 초과 했습니다.';
    }
  });
}

export const storeDoNotShowPopupV2Timestamp = (date: string) => {
  localStorage.setItem(EStorageKey.DO_NOT_SHOW_POPUP_V2, date);
};

export const getDoNotShowPopupV2Timestamp = () => {
  return localStorage.getItem(EStorageKey.DO_NOT_SHOW_POPUP_V2);
};

export const removeDoNotShowPopupV2Timestamp = () => {
  return localStorage.removeItem(EStorageKey.DO_NOT_SHOW_POPUP_V2);
};

export const storeDoNotShowPopupV3Timestamp = (date: string) => {
  localStorage.setItem(EStorageKey.DO_NOT_SHOW_POPUP_V3, date);
};

export const getDoNotShowPopupV3Timestamp = () => {
  return localStorage.getItem(EStorageKey.DO_NOT_SHOW_POPUP_V3);
};

export const removeDoNotShowPopupV3Timestamp = () => {
  return localStorage.removeItem(EStorageKey.DO_NOT_SHOW_POPUP_V3);
};

export const getSignUpSocialType = () => {
  return sessionStorage.getItem(EStorageKey.SIGN_UP_SOCIAL_TYPE);
};

export const storeSignUpSocialType = (socialType: any) => {
  sessionStorage.setItem(EStorageKey.SIGN_UP_SOCIAL_TYPE, socialType);
};

export const removeSignUpSocialType = () => {
  sessionStorage.removeItem(EStorageKey.SIGN_UP_SOCIAL_TYPE);
};

export const getSignUpSocialId = () => {
  return sessionStorage.getItem(EStorageKey.SOCIAL_ID);
};

export const storeSignUpSocialId = (id: any) => {
  sessionStorage.setItem(EStorageKey.SOCIAL_ID, id);
};
export const removeSignUpSocialId = () => {
  sessionStorage.removeItem(EStorageKey.SOCIAL_ID);
};

export const storeRecentSignInType = (type: SignUpType) => {
  localStorage.setItem(EStorageKey.RECENT_SIGN_IN_TYPE, type);
};

export const getRecentSignInType = () => {
  return localStorage.getItem(EStorageKey.RECENT_SIGN_IN_TYPE) as
    | SignUpType
    | undefined;
};

export const getSignUpEmail = () => {
  return sessionStorage.getItem(EStorageKey.EMAIL);
};

export const storeSignUpEmail = (email: any) => {
  sessionStorage.setItem(EStorageKey.EMAIL, email);
};
export const removeSignUpEmail = () => {
  sessionStorage.removeItem(EStorageKey.EMAIL);
};

export const storeSavedEmail = (email: string) => {
  localStorage.setItem(EStorageKey.SAVED_EMAIL, email);
};

export const getSavedEmail = () => {
  return localStorage.getItem(EStorageKey.SAVED_EMAIL);
};

export const removeSavedEmail = () => {
  localStorage.removeItem(EStorageKey.SAVED_EMAIL);
};

export const isModiApp = () => {
  const userAgent = navigator.userAgent;
  return (
    userAgent.includes('letsModiApp (AOS)') ||
    userAgent.includes('letsModiApp (IOS)')
  );
};

export const redirectToAppScheme = (appScheme: string) => {
  window.location.href = appScheme;
};

export const storeProjectCreateTimes = (times: number[]) => {
  localStorage.setItem(EStorageKey.PROJECT_CREATE_TIMES, JSON.stringify(times));
};

export const getProjectCreateTimes = (): number[] => {
  const saved = localStorage.getItem(EStorageKey.PROJECT_CREATE_TIMES);
  return saved ? JSON.parse(saved) : [];
};

export const removeProjectCreateTimes = () => {
  localStorage.removeItem(EStorageKey.PROJECT_CREATE_TIMES);
};
