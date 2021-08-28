import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

export default function Card({ id, str, strThumb, idType }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <Link to={ `${pathname}/${idType}` }>
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
    </Link>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  str: PropTypes.string.isRequired,
  strThumb: PropTypes.string.isRequired,
  idType: PropTypes.string.isRequired,
};
