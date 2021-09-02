import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Explore.css';

function Explorar() {
  return (
    <>
      <Header title="Explorar" renderSearch={ false } />
      <div className="d-flex flex-column align-items-center mt-4 w-100">
        <Link
          to="/explorar/comidas"
          className="btn btn-info explore-button mb-3"
          data-testid="explore-food"
        >
          Explorar Comidas
        </Link>
        <Link
          to="/explorar/bebidas"
          className="btn btn-info explore-button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Explorar;
