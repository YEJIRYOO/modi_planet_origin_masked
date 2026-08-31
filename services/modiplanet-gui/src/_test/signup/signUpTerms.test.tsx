import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SignUpTerms from '@src/pages/sign-up/shared/SignUpTerms';

const renderAdultSignUpTerms = (onSubmit = vi.fn()) => {
  render(
    <SignUpTerms
      ageType="adult"
      onSubmit={onSubmit}
      notAllowedEmail="user@example.com"
    />,
  );

  return { onSubmit };
};

const getSignUpButton = () => screen.getByRole('button', { name: 'SIGN_UP' });
const getCheckbox = (name: string) => screen.getByRole('checkbox', { name });

beforeEach(() => {
  vi.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('[회원가입 페이지] 약관 동의', () => {
  test('필수 약관에 동의하지 않으면 회원가입 버튼은 비활성화 상태이다.', () => {
    // Given
    renderAdultSignUpTerms();

    // Then
    expect(getSignUpButton()).toBeDisabled();
  });

  test('성인 회원가입 필수 약관에 모두 동의하면 회원가입 버튼이 활성화된다.', () => {
    // Given
    renderAdultSignUpTerms();

    // When
    userEvent.click(getCheckbox('TERMS_AGREEMENT'));
    userEvent.click(getCheckbox('PRIVACY_AGREEMENT'));
    userEvent.click(getCheckbox('OVER_14_AGE'));

    // Then
    expect(getSignUpButton()).toBeEnabled();
  });

  test('전체 동의 체크박스를 클릭하면 모든 약관이 선택된다.', () => {
    // Given
    renderAdultSignUpTerms();

    // When
    userEvent.click(getCheckbox('ALL_AGREE'));

    // Then
    expect(getCheckbox('TERMS_AGREEMENT')).toBeChecked();
    expect(getCheckbox('PRIVACY_AGREEMENT')).toBeChecked();
    expect(getCheckbox('PRIVARY_USE_AGREEMENT')).toBeChecked();
    expect(getCheckbox('MARKETING_AGREEMENT')).toBeChecked();
    expect(getCheckbox('OVER_14_AGE')).toBeChecked();
    expect(getSignUpButton()).toBeEnabled();
  });

  test('전체 동의 체크박스를 다시 클릭하면 모든 약관이 해제된다.', () => {
    // Given
    renderAdultSignUpTerms();

    // When
    userEvent.click(getCheckbox('ALL_AGREE'));
    userEvent.click(getCheckbox('ALL_AGREE'));

    // Then
    expect(getCheckbox('TERMS_AGREEMENT')).not.toBeChecked();
    expect(getCheckbox('PRIVACY_AGREEMENT')).not.toBeChecked();
    expect(getCheckbox('PRIVARY_USE_AGREEMENT')).not.toBeChecked();
    expect(getCheckbox('MARKETING_AGREEMENT')).not.toBeChecked();
    expect(getCheckbox('OVER_14_AGE')).not.toBeChecked();
    expect(getSignUpButton()).toBeDisabled();
  });

  test('전체 동의 후 필수 약관을 하나 해제하면 회원가입 버튼이 비활성화된다.', () => {
    // Given
    renderAdultSignUpTerms();

    // When
    userEvent.click(getCheckbox('ALL_AGREE'));
    userEvent.click(getCheckbox('TERMS_AGREEMENT'));

    // Then
    expect(getCheckbox('TERMS_AGREEMENT')).not.toBeChecked();
    expect(getSignUpButton()).toBeDisabled();
  });

  test('전체 동의 상태에서 제출하면 모든 동의 값으로 회원가입을 요청한다.', async () => {
    // Given
    const { onSubmit } = renderAdultSignUpTerms();

    // When
    userEvent.click(getCheckbox('ALL_AGREE'));
    userEvent.click(getSignUpButton());

    // Then
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          termsOfServiceConsent: true,
          privacyPolicyConsent: true,
          personalInfoConsent: true,
          emailMarketingConsent: true,
        }),
      );
    });
  });

  test('선택 약관에 동의하지 않고 제출하면 미동의 값으로 회원가입을 요청한다.', async () => {
    // Given
    const { onSubmit } = renderAdultSignUpTerms();

    userEvent.click(getCheckbox('TERMS_AGREEMENT'));
    userEvent.click(getCheckbox('PRIVACY_AGREEMENT'));
    userEvent.click(getCheckbox('OVER_14_AGE'));

    // When
    userEvent.click(getSignUpButton());
    expect(await screen.findByText('OPTION_PRIVACY_AGREEMENT')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'DISAGREE' }));
    expect(await screen.findByText('OPTION_MARKETING_AGREEMENT')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'DISAGREE' }));

    // Then
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          termsOfServiceConsent: true,
          privacyPolicyConsent: true,
          personalInfoConsent: false,
          emailMarketingConsent: false,
        }),
      );
    });
  });

  test('선택 약관 모달에서 동의하면 동의 값으로 회원가입을 요청한다.', async () => {
    // Given
    const { onSubmit } = renderAdultSignUpTerms();

    userEvent.click(getCheckbox('TERMS_AGREEMENT'));
    userEvent.click(getCheckbox('PRIVACY_AGREEMENT'));
    userEvent.click(getCheckbox('OVER_14_AGE'));

    // When
    userEvent.click(getSignUpButton());
    expect(await screen.findByText('OPTION_PRIVACY_AGREEMENT')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'AGREE' }));
    expect(await screen.findByText('OPTION_MARKETING_AGREEMENT')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'AGREE' }));

    // Then
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          termsOfServiceConsent: true,
          privacyPolicyConsent: true,
          personalInfoConsent: true,
          emailMarketingConsent: true,
        }),
      );
    });
  });
});
