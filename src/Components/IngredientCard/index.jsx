import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

function IngredientCard({ image, name, index, handleClick }) {
  return (
    <button
      type="button"
      data-testid={ `${index}-ingredient-card` }
      className="ingredient-card"
      onClick={ handleClick }
    >
      <img src={ image } alt="Ingredient" data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </button>
  );
}

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default IngredientCard;
