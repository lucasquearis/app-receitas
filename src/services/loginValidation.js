export const emailValidator = (email) => {
  const regex = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
  return regex.test(email); // retorna true ou false.
};

const MIN_LENGTH_PASSWORD = 7;
export const passwordValidator = (password) => (password.length >= MIN_LENGTH_PASSWORD); // retorna true ou false.

const loginValidation = ({ email, password }) => (
  emailValidator(email) && passwordValidator(password)
);

export default loginValidation;
