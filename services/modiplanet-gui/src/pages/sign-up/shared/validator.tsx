export const Validator = {
  validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  },

  validatePasswordError(password): boolean {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{8,20}$/;
    return regex.test(password);
  },

  validatePasswordConfirm(password, passwordConfirm): boolean {
    if (password !== passwordConfirm) {
      return false;
    }

    return true;
  },

  validateTerms(array: string[]): boolean {
    const childCase =
      array.includes('terms') &&
      array.includes('privacy') &&
      array.includes('agent');
    const adultCase =
      array.includes('terms') &&
      array.includes('privacy') &&
      array.includes('adult');

    return childCase || adultCase;
  },

  validateAuthCode(authCode): boolean {
    const regex = /^\d{6}$/;
    return regex.test(authCode);
  },
};
