import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Explore.css';

export default function Explore() {
  return (
    <main>
      <Header title="Explorar" />
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
          className="explore-button"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          data-testid="explore-drinks"
          className="explore-button"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </main>
  );
}
