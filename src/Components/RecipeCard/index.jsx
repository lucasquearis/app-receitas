import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ image, name, index, testId }) {
  return (
    <div data-testid={ testId }>
      <img src={ image } alt="Recipe" data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </div>
  );
}

RecipeCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
