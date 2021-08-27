import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
        setIsFavorite(false);
      }
    };
    verifyIsFavorite();
  });

  function favoriteAction() {
    const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favorite = favoritesRecipes.find((currRecipe) => currRecipe.id === recipeID);
    if (favorite === undefined) {
      const favoriteData = {
        id: recipeID,
        type,
        area: recipe.strArea || '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipe.strDrink || recipe.strMeal,
        image: recipe.strMealThumb || recipe.strDrinkThumb,
      };
      const newFavorites = [...favoritesRecipes, favoriteData];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsFavorite(true);
    } else {
      const newFavorites = favoritesRecipes.filter(({ id }) => id !== recipeID);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      setIsFavorite(false);
    }
  }

  return (
    <button
      onClick={ () => favoriteAction() }
      type="button"
      data-testid="favorite-btn"
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite Recipe Action"
      />
    </button>
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
