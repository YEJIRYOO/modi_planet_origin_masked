import {
  getUniqueFileName,
  renameUtil,
} from '@src/pages/training/components/training-select-section/modi-data/fileNamingUtils';

describe('[트레이닝] 모디 데이터 파일명 유틸', () => {
  test('이름 끝에 번호가 없으면 첫 번째 복사본 번호를 붙인다.', () => {
    expect(renameUtil('button_data')).toBe('button_data (1)');
  });

  test('이름 끝에 번호가 있으면 번호를 1 증가시킨다.', () => {
    expect(renameUtil('button_data (1)')).toBe('button_data (2)');
    expect(renameUtil('sensor(9)')).toBe('sensor(10)');
  });

  test('영문 locale에서 동일한 기능 타입 파일명 중 가장 큰 번호 다음 값을 만든다.', () => {
    expect(
      getUniqueFileName('click', 'en', [
        'click_1',
        'click_3',
        'press_10',
        'click_backup',
        'click_2_extra',
      ]),
    ).toBe('click_4');
  });

  test('한국어 locale에서는 번역된 기능 타입을 기준으로 파일명을 만든다.', () => {
    expect(
      getUniqueFileName('temperatureC', 'ko', ['온도_c_1', '온도_c_2']),
    ).toBe('온도_c_3');
  });

  test('등록되지 않은 기능 타입은 입력값을 그대로 사용한다.', () => {
    expect(getUniqueFileName('unknown', 'ko', [])).toBe('unknown_1');
  });
});
