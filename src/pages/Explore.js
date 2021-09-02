import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <div className="categories">
        <Link to="/explorar/comidas">
          <button className="btn btn-success" type="button" data-testid="explore-food">
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button className="btn btn-success" type="button" data-testid="explore-drinks">
            Explorar Bebidas
          </button>
        </Link>
        <Footer />
      </div>
    </div>
  );
}

export default Explore;
