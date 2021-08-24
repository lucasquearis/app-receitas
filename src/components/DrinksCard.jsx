import React from 'react';
import { Link } from 'react-router-dom';

function DrinksCards(drink, foodOrDrink, id) {
  return (
    <div key={ drink.idDrink } data-testid={ `${id}-recipe-card` }>
      <Link to={ `/${foodOrDrink}/${drink.idDrink}` }>
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          data-testid={ `${id}-card-img` }
        />
      </Link>

      <h3 data-testid={ `${id}-card-name` }>{ drink.strDrink }</h3>
    </div>
  );
}

export default DrinksCards;
