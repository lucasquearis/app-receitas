import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ index, srtRecipeThumb, srtRecipe }) => (
  <div
    className="recipe-card"
    data-testid={ `${index}-recipe-card` }
  >
    <img
      src={ srtRecipeThumb }
      alt="recipe"
      data-testid={ `${index}-card-img` }
    />
    <p data-testid={ `${index}-card-name` }>{ srtRecipe }</p>
  </div>
);

RecipeCard.propTypes = {
  srtRecipeThumb: PropTypes.string.isRequired,
  srtRecipe: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
