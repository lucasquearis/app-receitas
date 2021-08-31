import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function ExplorarComidas() {
  return (
    <>
      <section>
        <Header title="ExplorarComidas" searchIcon />
      </section>
      <Link to="/explorar/comidas/ingredientes">
        <button type="button">
          <h1 data-testid="explore-by-ingredient">
            Por Ingredientes
          </h1>
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button type="button">
          <h1 data-testid="explore-by-area">
            Por Local de Origem
          </h1>
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button">
          <h1 data-testid="explore-surprise">
            Me Surpreenda!
          </h1>
        </button>
      </Link>
      <Footer />
    </>
  );
}
