export default function isRecipeFavorite(recipe) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let favorite = false;
  if (favoriteRecipes !== null) {
    const hasFavorite = favoriteRecipes.some(
      (favRecipe) => favRecipe.id === recipe.idMeal,
    );
    if (hasFavorite) {
      favorite = true;
    }
  }

  return favorite;
}
