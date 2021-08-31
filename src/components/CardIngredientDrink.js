import React from 'react';
import { Link } from 'react-router-dom';

function CardIngredientDrink() {
  return (
    <div>
      <Link to="/explorar/bebidas">
        <p>Card</p>
        <h1 data-testid={ `${index}-card-name` }>Nome</h1>
        <h2 data-testid={ `${index}-ingredient-card` }>Ingrediente</h2>
        <img data-testid={ `${index}-card-img` } src="" alt="receita" />
      </Link>
    </div>
  );
}
export default CardIngredientDrink;
