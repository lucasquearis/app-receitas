import React from 'react';
import Header from '../components/Header';

import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Explore() {
  return (
    <div>
      <Header title="Explorar" hideSearch />
      <p>Explore</p>
      <h1>Explore:</h1>
      <Link to="/explorar/comidas">
        <button type="button" data-testid="explore-food">Explorar Comidas</button>
      </Link>
      <Link to="/explorar/bebidas">
        <button type="button" data-testid="explore-drinks">Explorar Bebidas</button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explore;
