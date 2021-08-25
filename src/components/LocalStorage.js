export const setLocalStorage = (key, value) => {
  localStorage[key] = JSON.stringify(value);
};

export const getLocalStorage = (key) => JSON.parse(localStorage[key]);
