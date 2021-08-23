export const saveAssistent = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getSavedAssistent = (key) => {
  JSON.parse(localStorage.getItem(key));
};
