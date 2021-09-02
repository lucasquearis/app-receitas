import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './explore.css';

export default function Explore() {
  return (
    <section className="explore-container">
      <Header title="Explorar" />
      <section className="btn-container">
        <Link to="/explorar/comidas" className="explore-btn">
          <button
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas" className="explore-btn">
          <button
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas
          </button>
        </Link>
      </section>
      <Footer />
    </section>
  );
}
