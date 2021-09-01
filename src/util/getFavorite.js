function getFavorite(drinkDetails, setFavorite) {
  const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (actualStorage && drinkDetails.length > 0) {
    const isFavorited = actualStorage.some(
      (item) => item.id === drinkDetails[0].idDrink,
    );
    setFavorite(isFavorited);
  }
}

export default getFavorite;
