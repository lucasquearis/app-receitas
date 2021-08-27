import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default function MealCard({ meal, index }) {
  const { strMeal, strMealThumb, idMeal } = meal;
  return (
    <Link to={ `/comidas/${idMeal}` }>
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
    </Link>
  );
}

MealCard.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
  index: PropTypes.number,
}.isRequired;
