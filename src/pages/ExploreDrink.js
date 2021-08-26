import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function ExploreDrink() {
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link>
        <button data-testid="explore-surprise">
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
}

export default ExploreDrink;
