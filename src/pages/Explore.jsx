import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';

function Explore() {
  return (
    <div>
      <Header title="Explorar" />
      <Link data-testid="explore-food" to="/explorar/comidas">Explorar Comidas</Link>
      <Link data-testid="explore-drinks" to="/explorar/bebidas">Explorar Bebidas</Link>
      <Footer />
    </div>
  );
}

export default Explore;
