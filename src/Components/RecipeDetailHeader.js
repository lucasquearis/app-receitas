import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeDetailHeader({ recipe, type }) {
  const [recipeName, setRecipeName] = useState('');

  useEffect(() => {
    if (type === 'food') {
      setRecipeName(recipe.strMeal);
    } else {
      setRecipeName(recipe.strDrink);
    }
  }, [type, recipe.strMeal, recipe.strDrink]);

  return (
    <div className="headerContainer">
      <div className="nameContainer">
        <h3 data-testid="recipe-title">{recipeName}</h3>
        <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
      </div>
      <div className="iconsContainer">
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="Share Recipe" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="Favorite Recipe Action" />
        </button>
      </div>
    </div>
  );
}

RecipeDetailHeader.propTypes = {
  type: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
  }).isRequired,
};

export default RecipeDetailHeader;
