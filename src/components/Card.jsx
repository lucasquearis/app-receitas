import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, thumb, name }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="cardRecipe"
    >
      <img
        data-testid={ `${index}-card-img` }
        className="recipeThumbnail"
        src={ thumb }
        alt={ name }
      />
      <span
        data-testid={ `${index}-card-name` }
      >
        { name }
      </span>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
