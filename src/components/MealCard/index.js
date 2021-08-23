import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const MealCard = ({ meal, index }) => {
  const { strMealThumb, strMeal } = meal;
  return (
    <div className="meal-card" data-testid={ `${index}-recipe-card` }>
      <img
        src={ strMealThumb }
        alt="Imagem da Comida"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
    </div>
  );
};

MealCard.propTypes = {
  meal: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default MealCard;
