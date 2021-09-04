import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import CardTitleBg from '../images/card_title_bg.png';

export default function Card({ id, str, strThumb, idType }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <Link to={ `${pathname}/${idType}` }>
      <div
        className="card__recipe-card"
        data-testid={ `${id}-recipe-card` }
      >
        <img
          data-testid={ `${id}-card-img` }
          className="card__recipe-thumb"
          src={ strThumb }
          alt={ str }
        />
        <img src={ CardTitleBg } className="card__title-bg" alt="Card Title Bg" />
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
