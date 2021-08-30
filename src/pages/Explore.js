import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Header from '../components/Header';
=======
import Header from '../components/Header';

import { Link } from 'react-router-dom';
>>>>>>> 2729d5f85e620986b905c793f7bf49cc7d96412a
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
