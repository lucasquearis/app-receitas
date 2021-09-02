import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, thumb, name, onClick, apiType }) {
  return (
    <button
      type="button"
      data-testid={ (apiType) ? `${index}-ingredient-card` : `${index}-recipe-card` }
      name={ name }
      className="cardRecipe"
      onClick={ onClick }
    >
      <img
        data-testid={ `${index}-card-img` }
        className="recipeThumbnail"
        name={ name }
        src={ thumb }
        alt={ name }
      />
      <span
        data-testid={ `${index}-card-name` }
        name={ name }
      >
        { name }
      </span>
    </button>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  apiType: PropTypes.string.isRequired,
};

export default Card;
