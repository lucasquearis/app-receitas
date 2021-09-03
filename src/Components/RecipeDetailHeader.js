import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import shareIcon from '../images/shareIcon.svg';
import RecipeDetailFavoriteButton from './RecipeDetailsFavoriteButton';

function RecipeDetailHeader({ recipe, type, recipeID }) {
  const [recipeName, setRecipeName] = useState('');
  const [recipeCategory, setRecipeCategory] = useState('');
  const [displaycopymessage, setDisplayCopyMessage] = useState('none');
  const [recipeType, setRecipeType] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (type === 'food') {
      setRecipeName(recipe.strMeal);
      setRecipeType('comida');
      setUrl('http://localhost:3000/comidas/');
      setRecipeCategory(recipe.strCategory);
    } else {
      setRecipeName(recipe.strDrink);
      setRecipeType('bebida');
      setUrl('http://localhost:3000/bebidas/');
      setRecipeCategory(recipe.strAlcoholic);
    }
  }, [type, recipe.strMeal, recipe.strDrink, recipe.strCategory, recipe.strAlcoholic]);

  function copyPath() {
    copy(`${url}${recipeID}`);
    setDisplayCopyMessage('block');
  }

  return (
    <div className="headerContainer">
      <div className="nameContainer">
        <h2 data-testid="recipe-title">{recipeName}</h2>
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
        <span style={ { display: displaycopymessage } }>Link copiado!</span>
        <RecipeDetailFavoriteButton
          recipe={ recipe }
          type={ recipeType }
          recipeID={ recipeID }
        />
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
