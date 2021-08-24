import React from 'react';
import PropTypes from 'prop-types';
import './css/Card.css';

const Card = ({ type, index, thumb, name }) => (
  <div
    className="card"
    id={ `${type.toLowerCase()}-card-${index}` }
    data-testid={ `${index}-recipe-card` }
  >
    <img
      className="thumb"
      id={ `${type.toLowerCase()}-thumb-${index}` }
      data-testid={ `${index}-card-img` }
      src={ thumb }
      alt={ `Imagem ilustritiva de ${name}` }
    />
    <span
      className="name"
      id={ `${type.toLowerCase()}-name-${index}` }
      data-testid={ `${index}-card-name` }
    >
      { name }
    </span>
    { console.log(type, index, thumb, name) }
  </div>
);

Card.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
