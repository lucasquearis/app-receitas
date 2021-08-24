import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';

function Foods() {
  const history = useHistory();

  return (
    <div>
      <Header name="Explorar" search={ false } />
      <button
        data-testid="explore-food"
        type="button"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas

      </button>
      <button
        data-testid="explore-drinks"
        type="button"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas

      </button>
    </div>
  );
}

export default Foods;
