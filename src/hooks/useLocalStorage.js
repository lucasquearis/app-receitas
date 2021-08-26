import { useState } from 'react';

// Custom hook taken from an Instagram post of https://linktr.ee/imateus.silva
const useLocalStorage = (key, initialValue = '') => {
  // const [state, setState] = useState(() => {
  //   try {
  //     const storedValue = localStorage.getItem(key);
  //     return storedValue ? JSON.parse(storedValue) : initialValue;
  //   } catch (error) {
  //     return initialValue;
  //   }
  // });

  // const setValue = useCallback((value) => {
  //   try {
  //     setState(value);
  //     localStorage.setItem(key, JSON.stringify(value));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [key]);

  // return [state, setValue];

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
