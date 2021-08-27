import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function FoodCard({ meal, index }) {
  const { history: push } = useHistory();
  const { strMealThumb, strMeal, idMeal } = meal;
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      aria-hidden="true"
      onClick={ () => push(`/comidas/${idMeal}`) }
    >
      <img
        src={ strMealThumb }
        alt="Imagem da Comida"
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
    </div>
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
