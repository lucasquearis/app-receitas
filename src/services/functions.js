function getFavoriteValue(query, recipe) {
  const mealValue = {
    id: recipe.idMeal,
    type: 'comida',
    area: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
  };
  const drinkValue = {
    id: recipe.idDrink,
    type: 'bebida',
    area: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  };
  const favoriteValue = query === 'meal' ? mealValue : drinkValue;
  return favoriteValue;
}

export default getFavoriteValue;
