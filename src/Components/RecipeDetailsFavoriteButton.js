import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FavoriteButtonIcon from './FavoriteButtonIcon';

function RecipeDetailFavoriteButton({ recipe, type, recipeID }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function verifyFavorite(favorite) {
    if (favorite) {
      setIsFavorite(true);
    }
  }

  useEffect(() => {
    const verifyIsFavorite = () => {
      const favoritesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoritesStorage !== null) {
        const favorite = favoritesStorage.find((food) => food.id === recipeID);
        verifyFavorite(favorite);
      }
    };
    verifyIsFavorite();
  });

  const newFavorite = () => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteData = {
      id: recipeID,
      type,
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      area: recipe.strArea || '',
      name: recipe.strDrink || recipe.strMeal,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };

    let newFavorites = [];

    if (favoritesRecipes !== null) {
      newFavorites = [...favoritesRecipes, favoriteData];
    } else {
      newFavorites = [favoriteData];
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setIsFavorite(true);
  };

  const removeFavorite = () => {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favoritesRecipes.filter(({ id }) => id !== recipeID);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setIsFavorite(false);
  };

  return (
    <FavoriteButtonIcon
      isFavorite={ isFavorite }
      removeFavorite={ removeFavorite }
      newFavorite={ newFavorite }
    />
  );
}

RecipeDetailFavoriteButton.propTypes = {
  type: PropTypes.string.isRequired,
  recipeID: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strCategory: PropTypes.string,
  }).isRequired,
};

export default RecipeDetailFavoriteButton;
