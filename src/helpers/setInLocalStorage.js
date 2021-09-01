const setInLocalStorage = (itemKey, value) => {
  localStorage.setItem(itemKey, JSON.stringify(value));
};

export default setInLocalStorage;
