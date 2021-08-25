import { useCallback, useState } from 'react';

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

// Custom hook taken from an Instagram post of https://linktr.ee/imateus.silva
export const useLocalStorage = (key, initialValue = '') => {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setState(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }, [key]);
  return [state, setValue];
};

export const doesItExist = (key) => {
  if (key) return key;
  return [];
};
