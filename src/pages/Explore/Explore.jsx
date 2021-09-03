import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './style.css';

function Explore() {
  const headerProps = {
    title: 'Explorar Comidas',
    renderSearchBar: false,
  };

  return (
    <div>
      <Header { ...headerProps } />
      <Link to="/explorar/comidas">
        <section className="explore-food-father">
          <section className="explore-food">
            <button
              type="button"
              className="explore-food-btn"
              data-testid="explore-food"
            >
              Explorar Comidas
            </button>
          </section>
        </section>
      </Link>
      <Link to="/explorar/bebidas">
        <section className="explore-drink-father">
          <section className="explore-drink">
            <button
              type="button"
              className="explore-food-btn"
              data-testid="explore-drinks"
            >
              Explorar Bebidas
            </button>
          </section>
        </section>
      </Link>
      <Footer />
    </div>
  );
}

export default Explore;
