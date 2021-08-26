import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Explore() {
  return (
    <>
      <Header title="Explorar" renderSearchIcon={ false } />
      <main className="p-2">
        <Link to="/explorar/comidas">
          <Button
            data-testid="explore-food"
            className="btn-block p-3 mb-2"
          >
            Explorar Comidas
          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button
            data-testid="explore-drinks"
            className="btn-block p-3"
          >
            Explorar Bebidas
          </Button>
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default Explore;
