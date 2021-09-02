import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Explorar() {
  return (
    <>
      <section>
        <Header title="Explorar" searchIcon />
      </section>
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
      <Link to="/explorar/comidas">
        <button type="button">Explorar Comidas</button>
      </Link>
      <Link to="/explorar/comidas/ingredientes">
        <button type="button">ingredientes</button>
      </Link>
    </>
  );
}
