import React from 'react';
import { useHistory } from 'react-router';
import HeaderSemSearchBar from '../components/Header/HeaderSemSearchBar';
import MenuInferior from '../components/MenuInferior';

export default function Explorar() {
  const history = useHistory();
  return (
    <div>
      <HeaderSemSearchBar>
        Explorar
      </HeaderSemSearchBar>
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
      <MenuInferior />
    </div>
  );
}
