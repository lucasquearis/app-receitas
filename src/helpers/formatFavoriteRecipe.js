const formatFavoriteRecipe = (recipe) => {
  if (recipe.id) return recipe;
  const emptyStr = '';
  if (recipe.strMeal) {
    const favoriteMeal = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: emptyStr,
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    return favoriteMeal;
  }
  if (recipe.strDrink) {
    const favoriteDrink = {
      id: recipe.idDrink,
      type: 'bebida',
      area: emptyStr,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    return favoriteDrink;
  }
};

export default formatFavoriteRecipe;
