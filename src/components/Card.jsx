import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ id, str, strThumb }) {
  return (
    <div
      data-testid={ `${id}-recipe-card` }
    >
      <img
        data-testid={ `${id}-card-img` }
        src={ strThumb }
        alt={ str }
      />
      <h2
        data-testid={ `${id}-card-name` }
      >
        {str}
      </h2>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  str: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
};
