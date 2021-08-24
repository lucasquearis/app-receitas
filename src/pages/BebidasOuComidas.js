import React from 'react';
import { useHistory } from 'react-router';

export default function BebidasOuComidas() {
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
        onClick={ () => history.push('explore/surpresas') }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}
