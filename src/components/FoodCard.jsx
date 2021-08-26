import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FoodCard({ food, index }) {
  return (
    <Link to={ `/comidas/${food.idMeal}` }>
      <li
        index={ food.idMeal }
        name={ food.strMeal }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ food.strMealThumb }
          alt={ food.strMeal }
        />
        <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
      </li>
    </Link>
  );
}

FoodCard.propTypes = {
  food: PropTypes.shape(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

export default FoodCard;
