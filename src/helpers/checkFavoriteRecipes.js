const checkFavoriteRecipes = (id) => {
  if (localStorage.getItem('favoriteRecipes')) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favoriteRecipes.some((element) => element.id === id);
  }
};

export default checkFavoriteRecipes;
