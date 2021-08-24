import React from 'react';
import PropTypes from 'prop-types';

export default function Card({
  index,

}) {
  return (
    <div data-testid={ `${index}-recipe-card` } />
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
};
