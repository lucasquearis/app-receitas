import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function FoodCard({ meal, index }) {
  const { strMealThumb, strMeal, idMeal } = meal;
  return (
    <Link to={ { pathname: `/comidas/${idMeal}`, id: idMeal } }>
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ strMealThumb }
          alt="Prato de Comida"
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
      </div>
    </Link>
  );
}

FoodCard.propTypes = {
  meal: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    idMeal: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FoodCard;
