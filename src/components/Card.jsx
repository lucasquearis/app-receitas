import React from 'react';
import PropTypes from 'prop-types';

export default function Card({
  index,
  cardImg,
  cardName,
}) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ cardImg } alt="" />
      <p data-testid={ `${index}-card-name` }>{ cardName }</p>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  cardImg: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
};
