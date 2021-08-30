import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';

export default function ExploreIngredientsDrinkCard({ ingredient, index }) {
  const { strIngredient1 } = ingredient;
  const imgUrl = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
  console.log(ingredient);

  return (
    // <Link to={ `/comidas/${idMeal}` }> -> requisito 77
    <li
      className="recipe-card"
      data-testid={ `${index}-ingredient-card` }
    >
      <img
        alt={ strIngredient1 }
        src={ imgUrl }
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { strIngredient1 }
      </p>
    </li>
    // </Link>
  );
}

ExploreIngredientsDrinkCard.propTypes = {
  meal: PropTypes.shape({
    strIngredient: PropTypes.string,
  }),
  index: PropTypes.number,
}.isRequired;
