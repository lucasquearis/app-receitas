import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <div>
      <Header name="Explorar" />
      <Link to="/explorar/comidas">
        <Button data-testid="explore-food">
          Explorar Comidas
        </Button>
      </Link>
      <Link to="/explorar/bebidas">
        <Button data-testid="explore-drinks">
          Explorar Bebidas
        </Button>
      </Link>
      <Footer />
    </div>
  );
}

export default Explore;
