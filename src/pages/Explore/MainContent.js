import React from 'react';
import { Link } from 'react-router-dom';

function MainContent() {
  return (
    <>
      <Link
        key="explore-food"
        to="/explorar/comidas"
      >
        <button
          data-testid="explore-food"
          type="button"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link
        key="explore-drinks"
        to="/explorar/bebidas"
      >
        <button
          data-testid="explore-drinks"
          type="button"
        >
          Explorar Bebidas
        </button>
      </Link>
    </>
  );
}

export default MainContent;
