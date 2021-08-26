export default function generatingFavoriteObj(recipe) {
  const favRecipe = {
    id: recipe.idMeal ? recipe.idMeal : recipe.idDrink,
    type: recipe.idMeal ? 'comida' : 'bebida',
    area: recipe.strArea,
    category: recipe.idMeal ? recipe.strCategory : '',
    alcoholicOrNot: recipe.idMeal ? '' : recipe.strAlcoholic,
    name: recipe.idMeal ? recipe.strMeal : recipe.strDrink,
    image: recipe.idMeal ? recipe.strMealThumb : recipe.strDrinkThumb,
    doneDate: '',
    tags: recipe.strTags,
  };

  return favRecipe;
}
