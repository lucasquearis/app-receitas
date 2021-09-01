import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeCard.css'

function RecomendedCard({ title, img, id, index, visible }) {
  const imgStyle = {
    width: '100%',
  };
  return (
    <li
      className="recipecard"
      index={ id }
      name={ title }
      data-testid={ `${index}-recomendation-card` }
      hidden={ visible }
    >
      <img
        src={ img }
        alt={ title }
        style={ imgStyle }
      />
      <p data-testid={ `${index}-recomendation-title` }>{title}</p>
    </li>
  );
}

RecomendedCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default RecomendedCard;
