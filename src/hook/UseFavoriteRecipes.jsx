import { useState } from 'react';

function UseFavoriteRecipes() {
  const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filteredFav, setFilteredFav] = useState(favRecipes);

  const allFilter = () => {
    if (favRecipes) {
      setFilteredFav(favRecipes);
    }
  };

  const mealFilter = () => {
    if (favRecipes) {
      const meals = favRecipes.filter(({ type }) => type === 'comida');
      setFilteredFav(meals);
    }
  };

  const drinkFilter = () => {
    if (favRecipes) {
      const drinks = favRecipes.filter(({ type }) => type === 'bebida');
      setFilteredFav(drinks);
    }
  };

  const removeFavFromLocal = (id) => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filter = local.filter((e) => e.id !== id);
    setFilteredFav(filter);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filter));
  };

  return { filteredFav, allFilter, mealFilter, drinkFilter, removeFavFromLocal };
}

export default UseFavoriteRecipes;
