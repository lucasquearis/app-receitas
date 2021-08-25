export const verifyEmail = (email) => {
  const regex = /^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
  return regex.test(email);
};

const MIN_LENGTH_PASSWORD = 6;
export const verifyPassword = (password) => (password.length >= MIN_LENGTH_PASSWORD);

export const loginValidator = ({ email, password }) => (
  verifyEmail(email) && verifyPassword(password)
);
