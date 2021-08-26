import React from 'react';
import PropTypes from 'prop-types';

function RecomendedCard({ title, img, id, index }) {
  return (
    <div>

      <li
        index={ id }
        name={ title }
        data-testid={ `${index}-recomendation-card` }
      >
        <img
          src={ img }
          alt={ title }
        />
        <p data-testid={ `${index}-recomendation-title` }>{title}</p>
      </li>
    </div>

  );
}

RecomendedCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default RecomendedCard;
