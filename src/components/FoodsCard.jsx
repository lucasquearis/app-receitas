import React from 'react';
import { Link } from 'react-router-dom';

function FoodsCards(food, foodOrDrink, id) {
  return (
    <div key={ food.idMeal } data-testid={ `${id}-recipe-card` }>
      <Link to={ `/${foodOrDrink}/${food.idMeal}` }>
        <img
          src={ food.strMealThumb }
          alt={ food.strMeal }
          data-testid={ `${id}-card-img` }
        />
      </Link>

      <h3 data-testid={ `${id}-card-name` }>{ food.strMeal }</h3>
    </div>
  );
}

export default FoodsCards;
