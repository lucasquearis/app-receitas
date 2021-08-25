import React from 'react';
import PropTypes from 'prop-types';
import './RecipeCard.css';

export default function MealCard({ meal, index }) {
  // console.log(index);
  const { strMeal, strMealThumb } = meal;
  return (
    <li
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        alt={ strMeal }
        src={ strMealThumb }
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { strMeal }
      </p>
    </li>
  );
}

MealCard.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
  index: PropTypes.number,
}.isRequired;
