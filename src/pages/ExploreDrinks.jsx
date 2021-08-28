import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreDrinks() {
  return (
    <main>
      <Header title="Explorar Bebidas" />

      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="explore-button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-surprise"
          className="explore-button"
        >
          Me Surpreenda!
        </button>
      </Link>

      <Footer />
    </main>
  );
}
