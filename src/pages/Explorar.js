import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <div>
      <Header title="Explorar" renderSearch={ false } />
      <Link to="/explorar/comidas">
        <div className="card">
          <div className="card-body" data-testid="explore-food">
            Explorar Comidas
          </div>
        </div>
      </Link>
      <Link to="/explorar/bebidas">
        <div className="card">
          <div className="card-body" data-testid="explore-drinks">
            Explorar Bebidas
          </div>
        </div>
      </Link>
      <Footer />
    </div>
  );
}

export default Explorar;
