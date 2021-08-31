import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import '../../styles/Header.css';
import Footer from '../../components/Footer';
import '../../styles/Footer.css';
import '../../styles/Explore.css';

function ExploreDrinks() {
  return (
    <div>
      <Header brand="Explorar Bebidas" className="img-search" />
      <div className="div-explore">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            data-testid="explore-surprise"
            type="button"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
