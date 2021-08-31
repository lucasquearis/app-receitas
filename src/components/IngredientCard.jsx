import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function IngredientCard({ thumb, name, index, type }) {
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        className="card-image"
        src={ `https://www.${type}.com/images/ingredients/${thumb}-Small.png` }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <h3 data-testid={ `${index}-card-name` } className="recipe-name">{ name }</h3>
    </div>
  );
}

IngredientCard.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientCard;
