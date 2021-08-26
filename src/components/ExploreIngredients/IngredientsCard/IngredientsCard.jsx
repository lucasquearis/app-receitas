import React from 'react';
import PropTypes from 'prop-types';

function IngredientsCard({ name, i, image }) {
  return (
    <div data-testid={ `${i}-ingredient-card` }>
      <img src={ image } alt={ name } data-testid={ `${i}-card-img` } />
      <h3 data-testid={ `${i}-card-name` }>{ name }</h3>
    </div>
  );
}

IngredientsCard.propTypes = {
  name: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default IngredientsCard;
