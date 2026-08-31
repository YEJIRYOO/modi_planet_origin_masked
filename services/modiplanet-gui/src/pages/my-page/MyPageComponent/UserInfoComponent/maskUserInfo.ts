export const maskUserInfo = {
  maskName(name: string): string {
    return name[0] + '*'.repeat(name.length - 1);
  },

  maskPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.length < 4) {
      return phoneNumber;
    }

    if (phoneNumber.length > 10) {
      return '*'.repeat(3) + phoneNumber.slice(3, -4) + '*'.repeat(4);
    }

    return '*'.repeat(3) + phoneNumber.slice(-(phoneNumber.length - 3));
  },

  maskEmail(email: string): string {
    const atIndex = email.indexOf('@');
    return email.slice(0, 2) + '*'.repeat(atIndex - 2) + email.slice(atIndex);
  },
};
