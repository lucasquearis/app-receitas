// Regex source: https://gist.github.com/dreamstarter/9231254
export const validateLogin = (email, password) => {
  const regex = /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;
  const NUMBER_SIX = 6;
  if (email.match(regex) && password.length > NUMBER_SIX) return true;
  return false;
};

export const saveLoginLocalStorage = (email) => {
  const user = { email };

  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
  localStorage.setItem('user', JSON.stringify(user));
};
