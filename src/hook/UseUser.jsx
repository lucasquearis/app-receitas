import { useState, useEffect } from 'react';

const USER_INITIAL_STATE = {
  email: '',
  password: '',
};

const minLength = 6;

const useUser = () => {
  const [user, setUser] = useState(USER_INITIAL_STATE);
  const [disableBtn, setDisable] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const handleChange = ({ value, name }) => {
    setUser({ ...user, [name]: value });
  };

  const shouldRedirect = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    setRedirect(true);
  };

  useEffect(() => {
    const validateEmail = () => {
      const reg = /^[a-z0-9_.-]+@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/;
      setDisable(!reg.test(user.email));
    };
    validateEmail();
  }, [user.email]);

  return {
    handleChange,
    shouldRedirect,
    user,
    redirect,
    minLength,
    disableBtn,
  };
};

export default useUser;
