import React from 'react';
import { useHistory } from 'react-router';

import MenuInferior from '../components/MenuInferior';

export default function ExplorarComidas() {
  const history = useHistory();
  return (
    <div>
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
