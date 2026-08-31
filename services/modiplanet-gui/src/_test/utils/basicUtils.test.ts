import {
  adjustDrawingSize,
  calcVideoHeatmap,
  changeTimeFormat,
  deepCopy,
  formatUTC,
  getAttendanceBadgeColor,
  getDaysDifference,
  getDoNotShowPopupV2Timestamp,
  getDoNotShowPopupV3Timestamp,
  getIsPortal,
  getProjectCreateTimes,
  getSavedEmail,
  getSignUpSocialId,
  getUnitByDiscountType,
  hasData,
  isNumeric,
  makeAnArray1toN,
  removePropsRecursively,
  removeDoNotShowPopupV2Timestamp,
  removeDoNotShowPopupV3Timestamp,
  removeProjectCreateTimes,
  removeSavedEmail,
  removeSignUpSocialId,
  storeDoNotShowPopupV2Timestamp,
  storeDoNotShowPopupV3Timestamp,
  storeIsPortal,
  storeProjectCreateTimes,
  storeSavedEmail,
  storeSignUpSocialId,
  validateFileSize,
} from '@src/lib/utils/utils';
import {
  CourseAttendanceType,
  DiscountType,
} from '@src/services/old/generated/graphql';

const createTimeRanges = (ranges: Array<[number, number]>) => ({
  length: ranges.length,
  start: (index: number) => ranges[index][0],
  end: (index: number) => ranges[index][1],
});

describe('[유틸] 기본 값 변환', () => {
  test('시간을 오전/오후 한국어 표기로 변환한다.', () => {
    expect(changeTimeFormat(9)).toBe('오전 9시');
    expect(changeTimeFormat(12)).toBe('오전 12시');
    expect(changeTimeFormat(13)).toBe('오후 1시');
  });

  test('1부터 N까지의 배열을 만든다.', () => {
    expect(makeAnArray1toN(5)).toEqual([1, 2, 3, 4, 5]);
  });

  test('출석 상태에 맞는 배지 색상을 반환한다.', () => {
    expect(getAttendanceBadgeColor(CourseAttendanceType.Attendance)).toBe(
      'purple',
    );
    expect(getAttendanceBadgeColor(CourseAttendanceType.Lateness)).toBe(
      'amber',
    );
    expect(getAttendanceBadgeColor(CourseAttendanceType.Absence)).toBe('main');
    expect(getAttendanceBadgeColor(CourseAttendanceType.Ready)).toBe('grey');
    expect(getAttendanceBadgeColor(CourseAttendanceType.Pending)).toBe('grey');
  });

  test('할인 타입에 맞는 단위를 반환한다.', () => {
    expect(getUnitByDiscountType(DiscountType.Percent)).toBe('%');
    expect(getUnitByDiscountType(DiscountType.Value)).toBe('원');
  });

  test('숫자 문자열인지 검증한다.', () => {
    expect(isNumeric('123456')).toBe(true);
    expect(isNumeric('123a')).toBe(false);
    expect(isNumeric('')).toBe(false);
  });
});

describe('[유틸] 날짜와 배열 처리', () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(new Date('2026-05-06T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('UTC 날짜를 기본 포맷으로 변환한다.', () => {
    expect(formatUTC('2026-05-06T12:34:56.000Z')).toBe(
      '2026-05-06 12:34:56',
    );
  });

  test('오늘과 입력 날짜의 차이를 일 단위로 반환한다.', () => {
    expect(getDaysDifference(new Date('2026-05-01T00:00:00.000Z'))).toBe(5);
  });

  test('배열에 동일한 데이터가 있는지 확인한다.', () => {
    const target = { id: 1 };

    expect(hasData([target], target)).toBe(true);
    expect(hasData([{ id: 1 }], target)).toBe(false);
    expect(hasData(null as unknown as Array<typeof target>, target)).toBe(
      false,
    );
  });

  test('시청 구간이 다음 구간과 겹치면 하나의 히트맵 구간으로 병합한다.', () => {
    const prev = [
      [0, 4],
      [6, 8],
    ];

    expect(calcVideoHeatmap(createTimeRanges([[3, 7]]), prev)).toEqual([
      [0, 8],
    ]);
  });
});

describe('[유틸] 객체와 파일 처리', () => {
  test('가로로 긴 캔버스는 중앙 정사각형 영역을 계산한다.', () => {
    expect(adjustDrawingSize(300, 100)).toEqual({
      sx: 100,
      sy: 0,
      sWidth: 100,
      sHeight: 100,
    });
  });

  test('세로로 긴 캔버스는 중앙 정사각형 영역을 계산한다.', () => {
    expect(adjustDrawingSize(100, 300)).toEqual({
      sx: 0,
      sy: 100,
      sWidth: 100,
      sHeight: 100,
    });
  });

  test('지정한 속성을 중첩 객체에서 제거한다.', () => {
    const data = {
      id: 'root',
      __typename: 'Root',
      child: {
        id: 'child',
        __typename: 'Child',
      },
    };

    expect(removePropsRecursively(data, ['__typename'])).toEqual({
      id: 'root',
      child: {
        id: 'child',
      },
    });
  });

  test('깊은 복사는 원본 객체와 분리된 값을 만든다.', () => {
    const original = { user: { name: 'modi' } };
    const copied = deepCopy(original);

    copied.user.name = 'planet';

    expect(original.user.name).toBe('modi');
    expect(copied.user.name).toBe('planet');
  });

  test('파일이 최대 용량보다 작으면 예외를 던지지 않는다.', () => {
    const file = new File(['modi'], 'modi.txt');

    expect(() => validateFileSize([file], file.size)).not.toThrow();
  });

  test('파일이 최대 용량보다 크면 용량 초과 예외를 던진다.', () => {
    expect.assertions(1);

    const file = new File(['modi'], 'modi.txt');

    try {
      validateFileSize([file], file.size - 1);
    } catch (error) {
      expect(error).toBe('파일 용량을 초과 했습니다.');
    }
  });
});

describe('[유틸] 브라우저 저장소', () => {
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('포털 여부를 세션 스토리지에 저장하고 조회한다.', () => {
    storeIsPortal('true');

    expect(getIsPortal()).toBe('true');
  });

  test('소셜 회원가입 id를 세션 스토리지에 저장하고 삭제한다.', () => {
    storeSignUpSocialId('social-id');

    expect(getSignUpSocialId()).toBe('social-id');

    removeSignUpSocialId();

    expect(getSignUpSocialId()).toBeNull();
  });

  test('저장된 이메일을 로컬 스토리지에 저장하고 삭제한다.', () => {
    storeSavedEmail('student@example.com');

    expect(getSavedEmail()).toBe('student@example.com');

    removeSavedEmail();

    expect(getSavedEmail()).toBeNull();
  });

  test('프로젝트 생성 시간을 배열로 저장하고 조회한다.', () => {
    storeProjectCreateTimes([1, 2, 3]);

    expect(getProjectCreateTimes()).toEqual([1, 2, 3]);

    removeProjectCreateTimes();

    expect(getProjectCreateTimes()).toEqual([]);
  });

  test('메인 popup v2 숨김 시간을 로컬 스토리지에 저장하고 삭제한다.', () => {
    storeDoNotShowPopupV2Timestamp('2026-05-12T00:00:00Z');

    expect(getDoNotShowPopupV2Timestamp()).toBe('2026-05-12T00:00:00Z');

    removeDoNotShowPopupV2Timestamp();

    expect(getDoNotShowPopupV2Timestamp()).toBeNull();
  });

  test('메인 popup v3 숨김 시간을 로컬 스토리지에 저장하고 삭제한다.', () => {
    storeDoNotShowPopupV3Timestamp('2026-05-13T00:00:00Z');

    expect(getDoNotShowPopupV3Timestamp()).toBe('2026-05-13T00:00:00Z');

    removeDoNotShowPopupV3Timestamp();

    expect(getDoNotShowPopupV3Timestamp()).toBeNull();
  });
});
