import React from 'react';
import { useHistory } from 'react-router-dom';

function Explore() {
  const history = useHistory();

  const changeRoute = () => {
    history.push('/explorar/comidas');
  };

  const changeRoute2 = () => {
    history.push('/explorar/bebidas');
  };

  return (
    <div>
      <h1>Explorar</h1>
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => changeRoute() }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => changeRoute2() }
      >
        Explorar Bebidas
      </button>
    </div>
  );
}

export default Explore;
