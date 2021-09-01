export const verifyEmail = (email) => {
  const regex = /(.*)@(.*).com/;
  return regex.test(email);
};

const MIN_LENGTH_PASSWORD = 7;
export const verifyPassword = (password) => (password.length >= MIN_LENGTH_PASSWORD);

export const loginValidator = ({ email, password }) => (
  verifyEmail(email) && verifyPassword(password)
);
export const getRandomId = () => {
  const DUZENTOS = 282;
  const min = Math.ceil(1);
  const max = Math.floor(DUZENTOS);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
