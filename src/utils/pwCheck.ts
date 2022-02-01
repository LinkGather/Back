export const validatePwCheck = (password: string, passwordCheck: string) => {
  if (password !== passwordCheck) return false;
  return true;
};

export const validatePw = (password: string) => {
  const passwordReg =
    /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-zA-Z0-9!@#$%^&*?-]{8,16}$/;
  if (!passwordReg.test(password)) return false;
  return true;
};
