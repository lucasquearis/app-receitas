import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Explorer() {
  return (
    <div>
      <Header>Explorar</Header>
      <div className="explore-container">
        <Link to="/explorar/comidas">
          <button
            type="button"
            className="explore-button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            className="explore-button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </Link>
        <Footer />
      </div>
    </div>
  );
}
