import { useState } from 'react';

const useLogin = () => {
  const [redirect, setRedirect] = useState(false);

  const loginHandle = (email) => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    setRedirect(true);
  };
  return {
    loginHandle,
    redirect,
  };
};

export default useLogin;
