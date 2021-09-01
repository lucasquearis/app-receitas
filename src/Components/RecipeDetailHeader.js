import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import shareIcon from '../images/shareIcon.svg';
import RecipeDetailFavoriteButton from './RecipeDetailsFavoriteButton';

function RecipeDetailHeader({ recipe, type, recipeID }) {
  const [recipeName, setRecipeName] = useState('');
  const [recipeCategory, setRecipeCategory] = useState('');
  const [displaycopymessage, setDisplayCopyMessage] = useState('none');
  const [recipeType, setRecipeType] = useState('');

  const { pathname } = useLocation();

  useEffect(() => {
    if (type === 'food') {
      setRecipeName(recipe.strMeal);
      setRecipeType('comida');
      setRecipeCategory(recipe.strCategory);
    } else {
      setRecipeName(recipe.strDrink);
      setRecipeType('bebida');
      setRecipeCategory(recipe.strAlcoholic);
    }
  }, [type, recipe.strMeal, recipe.strDrink, recipe.strCategory, recipe.strAlcoholic]);

  function copyPath() {
    copy(`http://localhost:3000${pathname}`);
    setDisplayCopyMessage('block');
  }

  return (
    <div className="headerContainer">
      <div className="nameContainer">
        <h3 data-testid="recipe-title">{recipeName}</h3>
        <h4 data-testid="recipe-category">{recipeCategory}</h4>
      </div>
      <div className="iconsContainer">
        <button
          onClick={ () => copyPath() }
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="Share Recipe" />
        </button>
        <RecipeDetailFavoriteButton
          recipe={ recipe }
          type={ recipeType }
          recipeID={ recipeID }
        />
        <span style={ { display: displaycopymessage } }>Link copiado!</span>
      </div>
    </div>
  );
}

RecipeDetailHeader.propTypes = {
  type: PropTypes.string.isRequired,
  recipeID: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
};

export default RecipeDetailHeader;