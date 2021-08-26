import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <div className="explore-container">
        <Link
          to="/explorar/comidas"
          data-testid="explore-food"
          className="explore-btn"
        >
          Explorar Comidas
        </Link>
        <Link
          to="/explorar/bebidas"
          data-testid="explore-drinks"
          className="explore-btn"
        >
          Explorar Bebidas
        </Link>
      </div>
      <Footer />
    </div>
  );
}
