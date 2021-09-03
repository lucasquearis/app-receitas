import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function StartRecipeBtn({ recipe, pathname }) {
  const doneRecipesSTG = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  let inProgressRecipesSTG = {};

  if (localStorage.getItem('inProgressRecipe')) {
    inProgressRecipesSTG = (pathname.includes('comidas'))
      ? JSON.parse(localStorage.getItem('inProgressRecipes')).meals
      : JSON.parse(localStorage.getItem('inProgressRecipes')).drinks;
  }

  return (!doneRecipesSTG
    .some((recipeArr) => recipeArr.id === (recipe.idMeal || recipe.idDrink)))
    ? (
      <Link to={ `${pathname}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          style={ {
            position: 'fixed',
            bottom: '0',
            marginLeft: '45vw',
            marginRight: '45vw',
          } }
        >
          { (Object.keys(inProgressRecipesSTG)
            .some((key) => key !== (recipe.idMeal || recipe.idDrink)))
            ? 'Iniciar Receita' : 'Continuar Receita'}
        </button>
      </Link>) : null;
}

StartRecipeBtn.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  pathname: PropTypes.string.isRequired,
};

export default StartRecipeBtn;
