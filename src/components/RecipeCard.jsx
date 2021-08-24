import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(key, img, name) {
  return (
    <div key={ key }>
      <Link to="/">
        <img src={ img } alt={ name } />
      </Link>

      <h3>{ name }</h3>
    </div>
  );
}

export default RecipeCard;
