import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './style.css';

const MealCard = ({ meal, index }) => {
  const { strMealThumb, strMeal, idMeal } = meal;
  const history = useHistory();

  return (
    <div
      className="meal-card"
      aria-hidden="true"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`/comidas/${idMeal}`) }
    >
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
    idMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
export default MealCard;
