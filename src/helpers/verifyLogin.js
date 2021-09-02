const verifyLogin = (email, password) => {
  const PASSWORD_MINLENGTH = 7;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (password.length >= PASSWORD_MINLENGTH && regex.test(email)) {
    return true;
  }
  return false;
};

export default verifyLogin;
