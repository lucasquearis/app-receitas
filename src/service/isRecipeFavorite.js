export default function isRecipeFavorite(recipe, type) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let favorite = false;
  if (favoriteRecipes !== null && type === 'comida') {
    const hasFavorite = favoriteRecipes.some(
      (favRecipe) => (
        favRecipe.id === recipe.idMeal
      ),
    );
    if (hasFavorite) {
      favorite = true;
    }
  } else if (favoriteRecipes !== null && type === 'bebida') {
    const hasFavorite = favoriteRecipes.some(
      (favRecipe) => favRecipe.id === recipe.idDrink,
    );
    if (hasFavorite) {
      favorite = true;
    }
  }

  return favorite;
}
