import { render, screen } from '@testing-library/react';

import UserSignupType from '@src/pages/my-page/MyPageComponent/UserInfoComponent/inputs/UserSignupType';

describe('[마이페이지] 가입 유형', () => {
  test('이메일 가입자는 일반 회원 문구를 표시한다.', () => {
    // Given
    render(<UserSignupType signupType="EMAIL" />);

    // Then
    expect(screen.getByText('SIGN_UP2')).toBeVisible();
    expect(screen.getByText('REGULAR_MEMBER')).toBeVisible();
  });

  test('구글 가입자는 구글 아이콘을 표시한다.', () => {
    // Given
    render(<UserSignupType signupType="GOOGLE" />);

    // Then
    expect(screen.getByAltText('Google')).toBeVisible();
  });

  test('카카오 가입자는 카카오 아이콘을 표시한다.', () => {
    // Given
    render(<UserSignupType signupType="KAKAO" />);

    // Then
    expect(screen.getByAltText('Kakao')).toBeVisible();
  });

  test('애플 가입자는 애플 아이콘을 표시한다.', () => {
    // Given
    render(<UserSignupType signupType="APPLE" />);

    // Then
    expect(screen.getByAltText('Apple')).toBeVisible();
  });
});
