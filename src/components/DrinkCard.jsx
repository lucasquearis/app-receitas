import React from 'react';
import PropTypes from 'prop-types';
import './RecipeCard.css';

export default function DrinkCard({ drink, index }) {
  console.log(index);
  const { strDrink, strDrinkThumb } = drink;
  return (
    <li
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        alt={ strDrink }
        src={ strDrinkThumb }
        data-testid={ `${index}-card-img` }
      />
      <p
        data-testid={ `${index}-card-name` }
      >
        { strDrink }
      </p>
    </li>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }),
  index: PropTypes.number,
}.isRequired;
