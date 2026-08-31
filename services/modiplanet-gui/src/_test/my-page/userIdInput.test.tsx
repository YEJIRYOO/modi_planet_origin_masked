import { render, screen } from '@testing-library/react';

import UserIdInput from '@src/pages/my-page/MyPageComponent/UserInfoComponent/inputs/UserIdInput';

describe('[마이페이지] 사용자 아이디 입력', () => {
  test('이메일 아이디를 마스킹해서 표시한다.', () => {
    // Given
    render(<UserIdInput id="tester@example.com" signupType="EMAIL" />);

    // Then
    expect(screen.getByText('ID')).toBeVisible();
    expect(screen.getByText('te****@example.com')).toBeVisible();
  });

  test('소셜 가입자는 가입 타입 아이콘과 아이디를 함께 표시한다.', () => {
    // Given
    render(<UserIdInput id="google-user@example.com" signupType="GOOGLE" />);

    // Then
    expect(screen.getByAltText('Google')).toBeVisible();
    expect(screen.getByText('go*********@example.com')).toBeVisible();
  });

  test('카카오 가입자는 카카오 아이콘을 표시한다.', () => {
    // Given
    render(<UserIdInput id="kakao-user@example.com" signupType="KAKAO" />);

    // Then
    expect(screen.getByAltText('Kakao')).toBeVisible();
    expect(screen.getByText('ka********@example.com')).toBeVisible();
  });

  test('애플 가입자는 애플 아이콘을 표시한다.', () => {
    // Given
    render(<UserIdInput id="apple-user@example.com" signupType="APPLE" />);

    // Then
    expect(screen.getByAltText('Apple')).toBeVisible();
    expect(screen.getByText('ap********@example.com')).toBeVisible();
  });

  test('이메일 가입자는 소셜 아이콘을 표시하지 않는다.', () => {
    // Given
    render(<UserIdInput id="email-user@example.com" signupType="EMAIL" />);

    // Then
    expect(screen.getByText('em********@example.com')).toBeVisible();
    expect(screen.queryByAltText('Google')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Kakao')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Apple')).not.toBeInTheDocument();
  });
});
