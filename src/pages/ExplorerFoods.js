import React from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from './FooterMenu';
import Header from '../components/Header';
// import '../styles/Explorer.css';

function ExplorerFoods() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <button
        type="button"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explorar/bebidas') }
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explorar/bebidas') }
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <FooterMenu />
    </div>
  );
}

export default ExplorerFoods;
