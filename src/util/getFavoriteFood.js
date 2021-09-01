function getFavoriteFood(foodDetails, setFavorite) {
  const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (actualStorage && foodDetails.length > 0) {
    const isFavorited = actualStorage.some(
      (item) => item.id === foodDetails[0].idMeal,
    );
    setFavorite(isFavorited);
  }
}

export default getFavoriteFood;
