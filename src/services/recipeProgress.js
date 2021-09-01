export const getProgressRecipe = (Type) => {
  const typeRecipe = Type === 'comidas' ? 'meals' : 'cocktails';
  const obj = localStorage.getItem('inProgressRecipes');
  const objjson = JSON.parse(obj);
  if (objjson === null || objjson === undefined) return null;
  return objjson[typeRecipe];
};

const ProgressValidation = (Id, Type) => {
  const obj = getProgressRecipe(Type);
  if (obj === undefined || obj === null) return false;
  const objval = Object.keys(obj).find((n) => n === Id);
  if (objval === undefined) return false;
  return true;
};

export default ProgressValidation;
