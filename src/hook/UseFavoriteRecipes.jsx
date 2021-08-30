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

  return { filteredFav, allFilter, mealFilter, drinkFilter };
}

export default UseFavoriteRecipes;
