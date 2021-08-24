import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(key, img, name, foodOrDrink) {
  return (
    <div key={ key }>
      <Link to={ `/${foodOrDrink}/${key}` }>
        <img src={ img } alt={ name } />
      </Link>

      <h3>{ name }</h3>
    </div>
  );
}

export default RecipeCard;
