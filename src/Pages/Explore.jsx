import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import '../styles/explorePages.css';

function Explore() {
  return (
    <main>
      <Header title="Comidas" loading={ false } />
      <div className="explore-buttons">
        <Link
          to="/explorar/comidas"
        >
          <button
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link
          to="/explorar/bebidas"
        >
          <button
            type="button"
            data-testid="explore-drinks"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
export default Explore;
