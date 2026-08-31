import {
  getHistory,
  removeHistory,
  storeHistory,
} from '@src/lib/utils/user';

describe('[유틸] 사용자 세션', () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  test('히스토리를 세션 스토리지에 저장하고 삭제한다.', () => {
    // When
    storeHistory('/learning-space');

    // Then
    expect(getHistory()).toBe('/learning-space');

    // When
    removeHistory();

    // Then
    expect(getHistory()).toBeNull();
  });

  test('히스토리를 다시 저장하면 마지막 값으로 덮어쓴다.', () => {
    // When
    storeHistory('/signin');
    storeHistory('/learning-space');

    // Then
    expect(getHistory()).toBe('/learning-space');
  });
});
