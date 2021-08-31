import React from 'react';
import { Link } from 'react-router-dom';

export default function ingredientsCard() {
  const type = isFood ? 'comidas' : 'bebidas';

  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <Link to={ `explorar/${type}` }>
        <h3 data-testid={ `${index}-card-name` }>{ingredient}</h3>
        <img data-testid={ `${index}-card-img` } src={ image } alt={ ingredient } />
      </Link>
    </div>
  );
}
