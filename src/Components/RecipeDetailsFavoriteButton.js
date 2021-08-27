import React, { useState } from 'react';
import PropTypes from 'prop-types';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

// const copy = require('clipboard-copy');

function RecipeDetailFavoriteButton({ recipe, type }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // function favoriteAction(recipeObject) {
  //   const favoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   if (favoritesRecipes !== null) {
  //     const favorite = favoritesRecipes
  //       .find((currRecipe) => currRecipe.id === recipeID);
  //     if (favorite) {
  //       setIsFavorite(true);
  //     } else {
  //       setIsFavorite(false);
  //     }
  //   } else {
  //     console.log([recipeObject]);
  //   }
  // }

  return (
    <button
      // onClick={ () => favoriteAction(recipe) }
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
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
  }).isRequired,
};

export default RecipeDetailFavoriteButton;
