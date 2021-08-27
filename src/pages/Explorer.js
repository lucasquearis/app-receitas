import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import FooterMenu from '../components/FooterMenu';
import Header from '../components/Header';
import '../styles/Explorer.css';

function Explorer() {
  const history = useHistory();
  return (
    <div>
      <Header />
      <Link to="/explorar/comidas">
        <button
          type="button"
          className="button"
          onClick={ () => history.push('/explorar/comidas') }
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          className="button"
          onClick={ () => history.push('/explorar/bebidas') }
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </Link>
      <FooterMenu />
    </div>
  );
}

export default Explorer;
