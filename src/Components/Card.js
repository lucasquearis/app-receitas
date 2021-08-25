import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, img, name }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ img } alt={ name } />
      <h4 data-testid={ `${index}-card-name` }>{name}</h4>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
