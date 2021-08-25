import React from 'react';
import PropTypes from 'prop-types';

const handleClick = ({ idMeal }) => {
  console.log(idMeal);
};

const RecipeCard = ({ recipe, index }) => (
  <div
    role="tab"
    tabIndex={ 0 }
    onClick={ () => handleClick(recipe) }
    onKeyDown={ () => handleClick(recipe) }
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
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
