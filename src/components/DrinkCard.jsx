import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkCard({ drink, index }) {
  return (
    <Link to={ `/bebidas/${drink.idDrink}` }>
      <li
        index={ drink.idDrink }
        name={ drink.strDrink }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
        />
        <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
      </li>
    </Link>
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
