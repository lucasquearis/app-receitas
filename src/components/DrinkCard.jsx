import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

export default function DrinkCard({ drink, index }) {
  const { strDrink, strDrinkThumb, idDrink } = drink;
  return (
    <Link to={ `/bebidas/${idDrink}` }>
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
    </Link>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }),
  index: PropTypes.number,
}.isRequired;
