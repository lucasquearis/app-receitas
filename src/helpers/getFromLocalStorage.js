const getFromLocalStorage = (itemKey, defaultStructure) => {
  const localData = localStorage.getItem(itemKey);
  return localData ? JSON.parse(localData) : defaultStructure;
};

export default getFromLocalStorage;
