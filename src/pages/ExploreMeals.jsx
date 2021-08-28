import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreMeals() {
  return (
    <main>
      <Header title="Explorar Comidas" />

      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          className="explore-button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
          className="explore-button"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to="/explorar/comidas/ingredientes">
        { /* verificar pra onde vai */ }
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
