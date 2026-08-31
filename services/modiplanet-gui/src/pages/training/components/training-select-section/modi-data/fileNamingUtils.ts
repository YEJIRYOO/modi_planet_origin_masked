export const renameUtil = (value: string): string => {
  const regex = /\((\d+)\)$/;
  const matches = value.match(regex);
  if (matches !== null) {
    const lastNum = matches[1];
    const num = Number(lastNum) + 1;
    return value.replace(regex, `(${num})`);
  }
  return `${value} (1)`;
};

const getBaseFileName = (functionType: string, locale: string): string => {
  const translations = locale === 'ko' ? koTranslations : defaultTranslations;
  return translations[functionType] || functionType;
};

export const getUniqueFileName = (
  functionType: string,
  locale: string,
  fileNameList: Array<string>,
): string => {
  const baseName = getBaseFileName(functionType, locale) + '_';
  const existingNames = fileNameList.filter(
    (name) =>
      name.startsWith(baseName) && name.match(new RegExp(`${baseName}\\d+$`)),
  );

  const getMaxNumber = (names: string[]): number => {
    const regex = new RegExp(`${baseName}(\\d+)$`);
    let maxNum = 0;
    names.forEach((name) => {
      const match = name.match(regex);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) {
          maxNum = num;
        }
      }
    });
    return maxNum;
  };

  const maxNum = getMaxNumber(existingNames);
  return `${baseName}${maxNum + 1}`;
};

const defaultTranslations = {
  click: 'click',
  doubleClick: 'dbclick',
  press: 'press',
  toggle: 'toggle',
  turn: 'turn',
  angle: 'angle',
  mark: 'mark',
  turnSpeed: 'turnspeed',
  cm: 'dist_cm',
  inch: 'dist_inch',
  xPosition: 'x_pos',
  yPosition: 'y_pos',
  temperatureC: 'temp_c',
  temperatureF: 'temp_f',
  humidity: 'humid',
  illuminance: 'illum',
  volume: 'vol',
  xAngle: 'x_ang',
  yAngle: 'y_ang',
  zAngle: 'z_ang',
  xAcceleration: 'x_acc',
  yAcceleration: 'y_acc',
  zAcceleration: 'z_acc',
  xAngularVelocity: 'x_angvel',
  yAngularVelocity: 'y_angvel',
  zAngularVelocity: 'z_angvel',
  vibration: 'vib',
  red: 'red',
  green: 'green',
  blue: 'blue',
  white: 'white',
  black: 'black',
};

const koTranslations = {
  click: '클릭',
  doubleClick: '더블클릭',
  press: '누른상태',
  toggle: '토글켜짐',
  turn: '위치',
  angle: '각도',
  mark: '칸',
  turnSpeed: '회전속도',
  cm: '거리_cm',
  inch: '거리_inch',
  xPosition: 'x_위치',
  yPosition: 'y_위치',
  temperatureC: '온도_c',
  temperatureF: '온도_f',
  humidity: '습도',
  illuminance: '조도',
  volume: '소리크기',
  xAngle: 'x_각도',
  yAngle: 'y_각도',
  zAngle: 'z_각도',
  xAcceleration: 'x_가속도',
  yAcceleration: 'y_가속도',
  zAcceleration: 'z_가속도',
  xAngularVelocity: 'x_각속도',
  yAngularVelocity: 'y_각속도',
  zAngularVelocity: 'z_각속도',
  vibration: '흔들림',
  red: '빨간빛',
  green: '초록빛',
  blue: '파란빛',
  white: '하양',
  black: '검정',
};
