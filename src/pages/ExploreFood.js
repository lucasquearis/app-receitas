import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function ExploreFood() {
  return (
    <div>
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button data-testid="explore-by-ingredient">
          Por Ingredientes
        </button>
      </Link>
      <Link>
        <button data-testid="explore-by-area">
          Por Local de Origem
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

export default ExploreFood;
