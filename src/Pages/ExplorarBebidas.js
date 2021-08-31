import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function ExplorarBebidas() {
  return (
    <>
      <section>
        <Header title="ExplorarBebidas" searchIcon />
      </section>
      <h1>Explorar bebidas</h1>
      <Link to="/explorar/bebidas/ingredientes">
        <button type="button">
          <h1 data-testid="explore-by-ingredient">
            Por Ingredientes
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
