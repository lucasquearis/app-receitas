const getFavorite = (ID) => {
  const obj = localStorage.getItem('favoriteRecipes');
  const objjson = JSON.parse(obj);
  if (objjson === null || objjson === undefined) return false;
  const workingObj = objjson.find((n) => n.id === ID);
  if (workingObj === null || workingObj === undefined) return false;
  return true;
};

export default getFavorite;
