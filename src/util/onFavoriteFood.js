function onFavoriteFood(foodDetails, setFavorite, favorite) {
  setFavorite(!favorite);

  const {
    idMeal: id,
    strCategory: category,
    strArea: area,
    strMeal: name,
    strMealThumb: image,
  } = foodDetails[0];

  const actualStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const item = { id, type: 'comida', area, category, alcoholicOrNot: '', name, image };

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

export default onFavoriteFood;
