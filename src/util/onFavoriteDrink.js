function onFavoriteDrink(drinkDetails, setFavorite, favorite) {
  setFavorite(!favorite);

  const {
    idDrink: id,
    strCategory: category,
    strAlcoholic: alcoholicOrNot,
    strDrink: name,
    strDrinkThumb: image,
  } = drinkDetails[0];

  const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const item = { id, type: 'bebida', area: '', category, alcoholicOrNot, name, image };
  if (actualStorage === null) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([item]));
    return;
  }

  if (!favorite) {
    actualStorage.push(item);
    localStorage.setItem('favoriteRecipes', JSON.stringify(actualStorage));
  } else {
    const newStorage = actualStorage.filter(
      (favoriteItem) => favoriteItem.id !== item.id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(newStorage));
  }
}

export default onFavoriteDrink;
