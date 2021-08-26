import React from 'react';
import { useHistory } from 'react-router-dom';
import FooterMenu from './FooterMenu';
import Header from '../components/Header';
import '../styles/Explorer.css';

function Explorer() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <button
        type="button"
        className="button"
        onClick={ () => history.push('/explorar/comidas') }
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
      <button
        type="button"
        className="button"
        onClick={ () => history.push('/explorar/bebidas') }
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
      <FooterMenu />
    </div>
  );
}

export default Explorer;
