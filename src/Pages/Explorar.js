import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

export default function Explorar() {
  return (
    <section className="main-section">
      <section className="header-section">
        <Header title="Explorar" searchIcon />
      </section>
      <section className="profile-button">
        <Link to="/explorar/comidas">
          <button
            className="btn btn-success"
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            className="btn btn-success"
            type="button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </Link>
        <Link to="/explorar/comidas">
          <button className="btn btn-success" type="button">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/comidas/ingredientes">
          <button className="btn btn-success" type="button">ingredientes</button>
        </Link>
      </section>
      <Footer />
    </section>
  );
}
