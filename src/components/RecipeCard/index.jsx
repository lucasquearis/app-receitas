import React from 'react';
import PropTypes from 'prop-types';

const onze = 11;
function RecipeCard({ recipe, index, tag }) {
  if (index > onze) {
    return null;
  }
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe[`str${tag}Thumb`] }
        alt="Recipe"
      />
      <h1 data-testid={ `${index}-card-name` }>{ recipe[`str${tag}`] }</h1>
    </div>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.objectOf(String).isRequired,
  index: PropTypes.number.isRequired,
  tag: PropTypes.string.isRequired,
};
export default RecipeCard;
