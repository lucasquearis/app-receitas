import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe, index }) => (
  <section data-testid={ `${index}-recipe-card` }>
    <img
      style={ { width: '90px' } }
      data-testid={ `${index}-card-img` }
      src={ recipe.strMealThumb || recipe.strDrinkThumb }
      alt="food thumb"
    />
    <h2 data-testid={ `${index}-card-name` }>{recipe.strMeal || recipe.strDrink}</h2>
  </section>
);

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
