import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ index, strRecipeThumb, strRecipe }) => (
  <div
    className="recipe-card"
    data-testid={ `${index}-recipe-card` }
  >
    <img
      src={ strRecipeThumb }
      alt="recipe"
      data-testid={ `${index}-card-img` }
    />
    <p data-testid={ `${index}-card-name` }>{ strRecipe }</p>
  </div>
);

RecipeCard.propTypes = {
  strRecipeThumb: PropTypes.string.isRequired,
  strRecipe: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
