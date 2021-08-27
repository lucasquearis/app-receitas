import React from 'react';
import { Link } from 'react-router-dom';
import MenuInferior from '../../components/MenuInferior';
import Header from '../../components/Header';

function Explorar() {
  return (
    <>
      <Header
        pageTitle="Explorar"
        showSearchBtn={ false }
      />
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
      <MenuInferior />
    </>
  );
}

export default Explorar;
