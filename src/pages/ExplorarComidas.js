import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header/Header';
import MenuInferior from '../components/MenuInferior';

export default function ExplorarComidas() {
  const history = useHistory();
  return (
    <div>
      <Header>
        Explorar Comidas
      </Header>
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-by-area"
        type="button"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => history.push('/comidas/52771') }
      >
        Me Surpreenda!
      </button>
      <MenuInferior />
    </div>
  );
}
