export const setStorage = (key, value) => (
  localStorage.setItem(key, JSON.stringify(value)));

export const getStorage = (key, value = []) => (
  JSON.parse(localStorage.getItem(key)) || value);

export const dateToday = () => {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
};
