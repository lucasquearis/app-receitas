export const initialProgressStore = () => {
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    meals: {},
    drinks: {},
  }));
};

export const updateProgressRecipe = (id, ing, type) => {
  const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipes = getStorage[type];
  localStorage.setItem('inProgressRecipes', JSON.stringify({
    ...getStorage,
    [type]: { ...recipes, [id]: ing },
  }));
};
