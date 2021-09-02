import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesDrinks({ recipe, index }) {
  return (
    <div key={ index }>
      <Link to={ `/bebidas/${recipe.id}` }>
        <img
          data-testid={ `${index}-horizontal-image` }
          alt="recipe"
          src={ recipe.image }
          width="100px"
          height="100px"
        />
      </Link>
      <div>
        <h4 data-testid={ `${index}-horizontal-top-text` }>
          { `${recipe.alcoholicOrNot}` }
        </h4>
        <Link to={ `/bebidas/${recipe.id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h2>
        </Link>
        <h3 data-testid={ `${index}-horizontal-done-date` }>
          {`Feita em: ${recipe.doneDate}`}
        </h3>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
        >
          <img alt="shareBtn" src={ shareIcon } />
        </button>
      </div>
    </div>
  );
}

DoneRecipesDrinks.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

export default DoneRecipesDrinks;
