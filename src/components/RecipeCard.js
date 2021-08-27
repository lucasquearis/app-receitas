import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe, index }) => (
  <div
    className="recipe-card"
    data-testid={ `${index}-recipe-card` }
  >
    <img
      src={ recipe.strMealThumb }
      alt="recipe"
      data-testid={ `${index}-card-img` }
    />
    <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
  </div>
);

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
