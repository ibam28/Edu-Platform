// SEC-006: minimum password length raised from 6 to 10.
export const MIN_PASSWORD_LENGTH = 10;

export interface RegistrationValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegistrationErrors = Partial<Record<keyof RegistrationValues, string>>;

export interface RegistrationErrorCopy {
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMinLength: string;
  confirmPasswordRequired: string;
  passwordsMustMatch: string;
}

export function validateRegistration(
  values: RegistrationValues,
  copy: RegistrationErrorCopy,
): RegistrationErrors {
  const errors: RegistrationErrors = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = copy.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = copy.emailInvalid;
  }

  if (!values.password) {
    errors.password = copy.passwordRequired;
  } else if (values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = copy.passwordMinLength;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = copy.confirmPasswordRequired;
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = copy.passwordsMustMatch;
  }

  return errors;
}

export interface LoginValues {
  email: string;
  password: string;
}

export type LoginErrors = Partial<Record<keyof LoginValues, string>>;

export interface LoginErrorCopy {
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
}

export function validateLogin(
  values: LoginValues,
  copy: LoginErrorCopy,
): LoginErrors {
  const errors: LoginErrors = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = copy.emailRequired;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = copy.emailInvalid;
  }

  if (!values.password) {
    errors.password = copy.passwordRequired;
  }

  return errors;
}
