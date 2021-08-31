import React from 'react';
import { Link } from 'react-router-dom';

function Explore() {
  return (
    <div>
      <h1>Explorar</h1>
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </Link>
    </div>
  );
}

export default Explore;
