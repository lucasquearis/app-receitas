import React from 'react';
import { useHistory } from 'react-router';
import HeaderSemSearchBar from '../components/Header/HeaderSemSearchBar';

import MenuInferior from '../components/MenuInferior';

export default function ExplorarBebidas() {
  const history = useHistory();
  return (
    <div>
      <HeaderSemSearchBar>
        <h4>
          Explorar Bebidas
        </h4>
      </HeaderSemSearchBar>

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
        onClick={ () => history.push('explorar/comidas') }
      >
        Por Local de Origem
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => history.push('explore/surpresas') } // Este path aponta para qual componente? Requisito 70.
      >
        Me Surpreenda!
      </button>
      <MenuInferior />
    </div>
  );
}
