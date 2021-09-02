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
        <button type="button">
          <h1 data-testid="explore-food">
            Explorar Comidas
          </h1>
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button type="button">
          <h1 data-testid="explore-drinks">
            Explorar Bebidas
          </h1>
        </button>
      </Link>
      <Footer />
    </>
  );
}
