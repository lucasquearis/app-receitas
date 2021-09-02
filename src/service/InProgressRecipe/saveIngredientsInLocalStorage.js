const saveIngrediensInLocalStorage = (ingredientsDone, id, typeOfRecipe) => {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  inProgress[typeOfRecipe][id] = ingredientsDone;
  return localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
};

export default saveIngrediensInLocalStorage;
