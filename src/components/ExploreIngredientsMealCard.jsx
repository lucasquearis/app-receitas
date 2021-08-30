import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';

export default function ExploreIngredientsMealCard({ ingredient, index }) {
  console.log(ingredient, index);
  const { strIngredient } = ingredient;
  return (
    // <Link to={ `/comidas/${idMeal}` }> -> requisito 77
    <li
      className="recipe-card"
      data-testid={ `${index}-ingredient-card` }
    >
      {/* <img -> requisito 76
        alt={ strIngredient }
        src={ strMealThumb }
        data-testid={ `${index}-card-img` }
      /> */}
      <p
        data-testid={ `${index}-card-name` }
      >
        { strIngredient }
      </p>
    </li>
    // </Link>
  );
}

ExploreIngredientsMealCard.propTypes = {
  meal: PropTypes.shape({
    strIngredient: PropTypes.string,
    // strMealThumb: PropTypes.string,
  }),
  index: PropTypes.number,
}.isRequired;
