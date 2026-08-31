import { maskUserInfo } from '@src/pages/my-page/MyPageComponent/UserInfoComponent/maskUserInfo';

describe('[마이페이지] 사용자 정보 마스킹', () => {
  test('이름은 첫 글자만 남기고 나머지를 마스킹한다.', () => {
    // When
    const maskedName = maskUserInfo.maskName('김모디');

    // Then
    expect(maskedName).toBe('김**');
  });

  test('휴대폰 번호가 11자리이면 앞 3자리와 뒤 4자리를 마스킹한다.', () => {
    // When
    const maskedPhoneNumber = maskUserInfo.maskPhoneNumber('01012345678');

    // Then
    expect(maskedPhoneNumber).toBe('***1234****');
  });

  test('휴대폰 번호가 4자리 미만이면 그대로 표시한다.', () => {
    // When
    const maskedPhoneNumber = maskUserInfo.maskPhoneNumber('123');

    // Then
    expect(maskedPhoneNumber).toBe('123');
  });

  test('휴대폰 번호가 10자리 이하이면 앞 3자리만 마스킹한다.', () => {
    // When
    const maskedPhoneNumber = maskUserInfo.maskPhoneNumber('1234567890');

    // Then
    expect(maskedPhoneNumber).toBe('***4567890');
  });

  test('이메일은 아이디 앞 두 글자만 남기고 마스킹한다.', () => {
    // When
    const maskedEmail = maskUserInfo.maskEmail('tester@example.com');

    // Then
    expect(maskedEmail).toBe('te****@example.com');
  });
});
