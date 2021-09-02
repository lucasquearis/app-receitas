const setLocalStorage = (setIngredients, id, typeOfRecipe) => {
  const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!progressRecipes) {
    const inProgress = JSON.stringify({ cocktails: { }, meals: { } });
    return localStorage.setItem('inProgressRecipes', inProgress);
  }

  if (progressRecipes[typeOfRecipe][id] && progressRecipes[typeOfRecipe][id].length > 0) {
    return setIngredients(progressRecipes[typeOfRecipe][id]);
  }
};

export default setLocalStorage;
