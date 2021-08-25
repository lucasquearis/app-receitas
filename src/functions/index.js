export const validateEmailPassword = (email, password) => {
  const re = /\w+@\w+.com/.test(email);
  const minimumPasswordLength = 7;
  const validPassword = password.length >= minimumPasswordLength;
  const logicValidation = re && validPassword;
  return logicValidation;
};

export const saveLoginInfoLocalStorage = (userEmail) => {
  const user = {
    email: userEmail,
  };
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};
