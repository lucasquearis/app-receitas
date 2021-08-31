import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/FoodCard.css'

function FoodCard({ food, index }) {
  return (
    <Link to={ `/comidas/${food.idMeal}` }>
      <div className="foodcard">
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
      </div>
    </Link>
  );
}

FoodCard.propTypes = {
  food: PropTypes.shape(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

export default FoodCard;
