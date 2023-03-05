const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const validationError =
  'The password must have Uppercase letters, Lowercase letter, numbers and special characters';

export const RegexHelper = {
  password,
  validationError,
};
