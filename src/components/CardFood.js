import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipesList.css';

function CardFood(props) {
  const { meal, i } = props;
  return (
    <div data-testid={ `${i}-recipe-card` }>
      <img
        src={ meal.strMealThumb }
        alt="Imagem da Receita"
        data-testid={ `${i}-card-img` }
        className="meal-img"
      />
      <h4 data-testid={ `${i}-card-name` }>{meal.strMeal}</h4>
    </div>
  );
}

CardFood.propTypes = {
  meal: PropTypes.objectOf(PropTypes.string).isRequired,
  i: PropTypes.number.isRequired,
};

export default CardFood;
