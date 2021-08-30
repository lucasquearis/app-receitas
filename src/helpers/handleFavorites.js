export default function handleFavorites(recipe, isFood) {
  const favoriteRecipe = {
    id: recipe[isFood ? 'idMeal' : 'idDrink'],
    type: isFood ? 'comida' : 'bebida',
    area: isFood ? recipe.strArea : '',
    category: recipe.strCategory,
    alcoholicOrNot: !isFood ? recipe.strAlcoholic : '',
    name: isFood ? recipe.strMeal : recipe.strDrink,
    image: isFood ? recipe.strMealThumb : recipe.strDrinkThumb,
  };
  const recipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

  const containRecipe = recipes
    .some((item) => (favoriteRecipe.id === item.id && favoriteRecipe.type === item.type));

  const handleFavorite = containRecipe
    ? recipes
      .filter((item) => (favoriteRecipe.id !== item.id
        && favoriteRecipe.type !== item.type))
    : recipes.concat(favoriteRecipe);

  localStorage.setItem('favoriteRecipes', JSON.stringify(handleFavorite));
}
